import { FALLBACK_PRODUCTS } from './mockData';
import { formatMoney } from './format';
import type { WishlistItemView } from './types';
import { hasSupabaseEnv, requireSupabase } from '../lib/supabaseClient';
import { getCurrentUser } from './auth';
import { ApiError } from './errors';

const LOCAL_WISHLIST_KEY = 'jewellery_local_wishlist';
const isValidProductId = (value: string) => /^[a-z0-9-]{2,}$/i.test(value);

const fallbackFromIds = (ids: string[]): WishlistItemView[] =>
  ids
    .map((id) => FALLBACK_PRODUCTS.find((product) => product.id === id || product.slug === id))
    .filter((item): item is (typeof FALLBACK_PRODUCTS)[number] => Boolean(item))
    .map((product) => ({
      id: `local-${product.id}`,
      productId: product.id,
      name: product.name,
      priceLabel: product.priceLabel,
      image: product.image,
    }));

const loadLocalWishlist = (): string[] => {
  const raw = window.localStorage.getItem(LOCAL_WISHLIST_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
};

const saveLocalWishlist = (ids: string[]) => {
  window.localStorage.setItem(LOCAL_WISHLIST_KEY, JSON.stringify([...new Set(ids)]));
};

export const getWishlistItems = async (): Promise<WishlistItemView[]> => {
  if (!hasSupabaseEnv) return fallbackFromIds(loadLocalWishlist());

  const user = await getCurrentUser();
  if (!user) return fallbackFromIds(loadLocalWishlist());

  const supabase = requireSupabase();
  const { data: wishlist, error: wishlistError } = await supabase.from('wishlists').select('id').eq('user_id', user.id).single();
  if (wishlistError) throw wishlistError;

  const { data, error } = await supabase
    .from('wishlist_items')
    .select('id,product_id,products(public_id,name,price_cents,currency,product_images(url,is_primary,sort_order))')
    .eq('wishlist_id', wishlist.id)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row: any) => {
    const images = [...(row.products?.product_images ?? [])].sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || a.sort_order - b.sort_order);
    return {
      id: row.id,
      productId: row.products?.public_id ?? row.product_id,
      name: row.products?.name ?? 'Product',
      priceLabel: formatMoney(row.products?.price_cents ?? 0, row.products?.currency ?? 'USD'),
      image: images[0]?.url ?? FALLBACK_PRODUCTS[0].image,
    };
  });
};

export const addWishlistItem = async (productId: string) => {
  if (!isValidProductId(productId)) {
    throw new ApiError('Invalid product identifier.', 'VALIDATION_FAILED', { status: 400 });
  }
  if (!hasSupabaseEnv) {
    saveLocalWishlist([...loadLocalWishlist(), productId]);
    return;
  }

  const user = await getCurrentUser();
  if (!user) {
    saveLocalWishlist([...loadLocalWishlist(), productId]);
    return;
  }

  const supabase = requireSupabase();
  const { data: wishlist, error: wishlistError } = await supabase.from('wishlists').select('id').eq('user_id', user.id).single();
  if (wishlistError) throw wishlistError;

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('id')
    .or(`public_id.eq.${productId},slug.eq.${productId}`)
    .single();

  if (productError) throw productError;

  const { error } = await supabase
    .from('wishlist_items')
    .insert({ wishlist_id: wishlist.id, product_id: product.id })
    .select()
    .maybeSingle();

  if (error && error.code !== '23505') throw error;
};

export const removeWishlistItem = async (wishlistItemIdOrProductId: string) => {
  if (wishlistItemIdOrProductId.startsWith('local-') || !hasSupabaseEnv) {
    const productId = wishlistItemIdOrProductId.replace('local-', '');
    saveLocalWishlist(loadLocalWishlist().filter((id) => id !== productId));
    return;
  }

  const supabase = requireSupabase();
  const { error } = await supabase.from('wishlist_items').delete().eq('id', wishlistItemIdOrProductId);
  if (error) throw error;
};
