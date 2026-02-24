import { formatMoney } from './format';
import { FALLBACK_PRODUCTS } from './mockData';
import type { CartItemView } from './types';
import { hasSupabaseEnv, requireSupabase } from '../lib/supabaseClient';
import { getCurrentUser } from './auth';
import { ApiError, toApiError } from './errors';

const LOCAL_CART_KEY = 'jewellery_local_cart';

type LocalCartItem = {
  productId: string;
  quantity: number;
};

const getFallbackProduct = (productId: string) => FALLBACK_PRODUCTS.find((product) => product.id === productId || product.slug === productId);
const isValidProductId = (value: string) => /^[a-z0-9-]{2,}$/i.test(value);

const loadLocalCart = (): LocalCartItem[] => {
  const raw = window.localStorage.getItem(LOCAL_CART_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as LocalCartItem[];
  } catch {
    return [];
  }
};

const saveLocalCart = (items: LocalCartItem[]) => {
  window.localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items));
};

const buildLocalCartView = (): CartItemView[] => {
  return loadLocalCart()
    .map((entry) => {
      const product = getFallbackProduct(entry.productId);
      if (!product) return null;
      const unitPrice = Number(product.priceLabel.replace(/[^0-9]/g, '')) * 100;
      return {
        id: `local-${entry.productId}`,
        productId: product.id,
        variantId: null,
        name: product.name,
        details: product.details,
        quantity: entry.quantity,
        unitPriceCents: unitPrice,
        totalPriceCents: unitPrice * entry.quantity,
        image: product.image,
      };
    })
    .filter((item): item is CartItemView => Boolean(item));
};

export const getCartItems = async (): Promise<CartItemView[]> => {
  if (!hasSupabaseEnv) return buildLocalCartView();

  const user = await getCurrentUser();
  if (!user) return buildLocalCartView();

  const supabase = requireSupabase();
  const { data: cart, error: cartError } = await supabase.from('carts').select('id').eq('user_id', user.id).single();
  if (cartError) throw cartError;

  const { data, error } = await supabase
    .from('cart_items')
    .select(
      'id,product_id,variant_id,quantity,unit_price_cents,products(public_id,name,metal,gemstone,product_images(url,is_primary,sort_order))',
    )
    .eq('cart_id', cart.id);

  if (error) throw error;

  type CartRow = {
    id: string;
    product_id: string;
    variant_id: string | null;
    quantity: number;
    unit_price_cents: number;
    products?: {
      public_id?: string;
      name?: string;
      metal?: string | null;
      gemstone?: string | null;
      product_images?: {
        url: string;
        is_primary: boolean;
        sort_order: number;
      }[];
    };
  };

  return (data ?? []).map((row: CartRow) => {
    const images = [...(row.products?.product_images ?? [])].sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || a.sort_order - b.sort_order);

    return {
      id: row.id,
      productId: row.products?.public_id ?? row.product_id,
      variantId: row.variant_id,
      name: row.products?.name ?? 'Product',
      details: [row.products?.metal, row.products?.gemstone].filter(Boolean).join(' - '),
      quantity: row.quantity,
      unitPriceCents: row.unit_price_cents,
      totalPriceCents: row.unit_price_cents * row.quantity,
      image: images[0]?.url ?? FALLBACK_PRODUCTS[0].image,
    };
  });
};

export const addCartItem = async (productId: string, quantity = 1) => {
  if (!isValidProductId(productId)) {
    throw new ApiError('Invalid product identifier.', 'VALIDATION_FAILED', { status: 400 });
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new ApiError('Quantity must be a positive integer.', 'VALIDATION_FAILED', { status: 400 });
  }
  if (!hasSupabaseEnv) {
    const local = loadLocalCart();
    const existing = local.find((item) => item.productId === productId);
    if (existing) existing.quantity += quantity;
    else local.push({ productId, quantity });
    saveLocalCart(local);
    return;
  }

  const user = await getCurrentUser();
  if (!user) {
    const local = loadLocalCart();
    const existing = local.find((item) => item.productId === productId);
    if (existing) existing.quantity += quantity;
    else local.push({ productId, quantity });
    saveLocalCart(local);
    return;
  }

  const supabase = requireSupabase();
  const { data: cart, error: cartError } = await supabase.from('carts').select('id').eq('user_id', user.id).single();
  if (cartError) throw cartError;

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('id,public_id,price_cents')
    .or(`public_id.eq.${productId},slug.eq.${productId}`)
    .single();
  if (productError) throw productError;

  const { data: existing, error: existingError } = await supabase
    .from('cart_items')
    .select('id,quantity')
    .eq('cart_id', cart.id)
    .eq('product_id', product.id)
    .is('variant_id', null)
    .maybeSingle();

  if (existingError) throw existingError;

  if (existing) {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id);
    if (error) throw error;
    return;
  }

  const { error } = await supabase.from('cart_items').insert({
    cart_id: cart.id,
    product_id: product.id,
    quantity,
    unit_price_cents: product.price_cents,
  });

  if (error) throw error;
};

export const updateCartItemQuantity = async (itemId: string, quantity: number) => {
  if (!Number.isInteger(quantity)) {
    throw new ApiError('Quantity must be an integer.', 'VALIDATION_FAILED', { status: 400 });
  }
  if (quantity <= 0) return removeCartItem(itemId);

  if (itemId.startsWith('local-') || !hasSupabaseEnv) {
    const productId = itemId.replace('local-', '');
    const local = loadLocalCart().map((item) => (item.productId === productId ? { ...item, quantity } : item));
    saveLocalCart(local);
    return;
  }

  const supabase = requireSupabase();
  const { error } = await supabase.from('cart_items').update({ quantity }).eq('id', itemId);
  if (error) throw error;
};

export const removeCartItem = async (itemId: string) => {
  if (itemId.startsWith('local-') || !hasSupabaseEnv) {
    const productId = itemId.replace('local-', '');
    const local = loadLocalCart().filter((item) => item.productId !== productId);
    saveLocalCart(local);
    return;
  }

  const supabase = requireSupabase();
  const { error } = await supabase.from('cart_items').delete().eq('id', itemId);
  if (error) throw error;
};

export const clearLocalCart = () => {
  window.localStorage.removeItem(LOCAL_CART_KEY);
};

export const cartTotals = (items: CartItemView[]) => {
  const subtotalCents = items.reduce((sum, item) => sum + item.totalPriceCents, 0);
  const shippingCents = 0;
  const defaultTaxRate = 0.08;
  const envRate = Number(import.meta.env.VITE_TAX_RATE);
  const taxRate = Number.isFinite(envRate) ? envRate : defaultTaxRate;
  const taxCents = Math.round(subtotalCents * taxRate);
  const totalCents = subtotalCents + shippingCents + taxCents;

  return {
    subtotalCents,
    shippingCents,
    taxCents,
    totalCents,
    subtotalLabel: formatMoney(subtotalCents),
    shippingLabel: shippingCents === 0 ? 'Complimentary' : formatMoney(shippingCents),
    taxLabel: formatMoney(taxCents),
    totalLabel: formatMoney(totalCents),
  };
};

export const safeGetCartItems = async (): Promise<CartItemView[]> => {
  try {
    return await getCartItems();
  } catch (error) {
    throw toApiError(error, 'Unable to load cart.', 'BACKEND_UNAVAILABLE');
  }
};
