import { FALLBACK_PRODUCT_DETAILS, FALLBACK_PRODUCTS } from './mockData';
import { compactProductDetails, formatMoney } from './format';
import { requireSupabase, hasSupabaseEnv } from '../lib/supabaseClient';
import type { ProductCard, ProductDetail } from './types';

type ProductListQuery = {
  search?: string;
  limit?: number;
};

type RecommendationInput = {
  query?: string;
  occasion?: string;
  style?: string;
  color?: string;
  skinTone?: string;
  limit?: number;
};

const mapCard = (row: any): ProductCard => ({
  id: row.public_id,
  slug: row.slug,
  name: row.name,
  collection: row.collections?.name ?? 'Collection',
  priceLabel: formatMoney(row.price_cents, row.currency),
  details: compactProductDetails(row.metal, row.gemstone),
  image: row.product_images?.[0]?.url ?? FALLBACK_PRODUCTS[0].image,
  shortDescription: row.short_description ?? '',
});

const sanitizeIlike = (value: string) => value.replace(/[%_]/g, '\\$&').trim();

export const listProducts = async (query: ProductListQuery = {}): Promise<ProductCard[]> => {
  if (!hasSupabaseEnv) {
    const search = query.search?.toLowerCase().trim();
    if (!search) return FALLBACK_PRODUCTS.slice(0, query.limit ?? FALLBACK_PRODUCTS.length);

    return FALLBACK_PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(search) ||
        product.collection.toLowerCase().includes(search) ||
        product.shortDescription.toLowerCase().includes(search),
    ).slice(0, query.limit ?? FALLBACK_PRODUCTS.length);
  }

  const supabase = requireSupabase();
  let dbQuery = supabase
    .from('products')
    .select(
      'id,public_id,slug,name,short_description,price_cents,currency,metal,gemstone,collections(name),product_images(url,is_primary,sort_order)',
    )
    .eq('is_active', true)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(query.limit ?? 24);

  if (query.search?.trim()) {
    const sanitized = sanitizeIlike(query.search);
    dbQuery = dbQuery.or(`name.ilike.%${sanitized}%,short_description.ilike.%${sanitized}%`);
  }

  const { data, error } = await dbQuery;
  if (error) throw error;

  return (data ?? []).map((row) => {
    const sortedImages = [...(row.product_images ?? [])].sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || a.sort_order - b.sort_order);
    return mapCard({ ...row, product_images: sortedImages });
  });
};

export const getProductByPublicIdOrSlug = async (value: string): Promise<ProductDetail | null> => {
  const key = value.trim();
  if (!key) return null;

  if (!hasSupabaseEnv) {
    if (FALLBACK_PRODUCT_DETAILS[key]) return FALLBACK_PRODUCT_DETAILS[key];
    const fromCard = FALLBACK_PRODUCTS.find((product) => product.id === key || product.slug === key);
    if (!fromCard) return null;

    return {
      id: fromCard.id,
      slug: fromCard.slug,
      name: fromCard.name,
      collection: fromCard.collection,
      priceLabel: fromCard.priceLabel,
      description: fromCard.shortDescription,
      metal: fromCard.details.split(' - ')[0] ?? '18k Gold',
      gemstone: fromCard.details.split(' - ')[1] ?? 'Gemstone',
      images: [{ url: fromCard.image, alt: fromCard.name }],
      variants: [],
    };
  }

  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from('products')
    .select(
      'id,public_id,slug,name,description,price_cents,currency,metal,gemstone,collections(name),product_images(url,alt,sort_order,is_primary),product_variants(id,product_id,sku,size,material,price_cents,stock_qty,is_active)',
    )
    .or(`public_id.eq.${key},slug.eq.${key}`)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  const sortedImages = [...(data.product_images ?? [])].sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || a.sort_order - b.sort_order);

  return {
    id: data.public_id,
    slug: data.slug,
    name: data.name,
    collection: data.collections?.name ?? 'Collection',
    priceLabel: formatMoney(data.price_cents, data.currency),
    description: data.description ?? '',
    metal: data.metal ?? 'N/A',
    gemstone: data.gemstone ?? 'N/A',
    images: sortedImages.map((image) => ({ url: image.url, alt: image.alt ?? data.name })),
    variants: data.product_variants ?? [],
  };
};

export const recommendProducts = async (input: RecommendationInput): Promise<ProductCard[]> => {
  if (!hasSupabaseEnv) {
    return listProducts({ search: input.query, limit: input.limit ?? 3 });
  }

  const supabase = requireSupabase();
  const { data, error } = await supabase.rpc('recommend_products', {
    input: {
      query: input.query,
      occasion: input.occasion,
      style: input.style,
      color: input.color,
      skin_tone: input.skinTone,
      limit: input.limit ?? 3,
    },
  });

  if (error) throw error;

  const products = (data ?? []) as any[];
  if (products.length === 0) return [];

  const ids = products.map((p) => p.id);
  const { data: images } = await supabase
    .from('product_images')
    .select('product_id,url,sort_order,is_primary')
    .in('product_id', ids);
  const { data: collections } = await supabase
    .from('collections')
    .select('id,name')
    .in(
      'id',
      products
        .map((product) => product.collection_id)
        .filter(Boolean),
    );

  const imageByProduct = new Map<string, string>();
  (images ?? [])
    .sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || a.sort_order - b.sort_order)
    .forEach((image) => {
      if (!imageByProduct.has(image.product_id)) imageByProduct.set(image.product_id, image.url);
    });

  const collectionById = new Map((collections ?? []).map((collection) => [collection.id, collection.name]));

  return products.map((product) => ({
    id: product.public_id,
    slug: product.slug,
    name: product.name,
    collection: collectionById.get(product.collection_id) ?? 'Collection',
    priceLabel: formatMoney(product.price_cents, product.currency),
    details: compactProductDetails(product.metal, product.gemstone),
    image: imageByProduct.get(product.id) ?? FALLBACK_PRODUCTS[0].image,
    shortDescription: product.short_description ?? '',
  }));
};
