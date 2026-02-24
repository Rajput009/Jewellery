export type ProductRecord = {
  id: string;
  public_id: string;
  slug: string;
  name: string;
  short_description: string | null;
  description: string | null;
  price_cents: number;
  currency: string;
  metal: string | null;
  gemstone: string | null;
  style_tags: string[];
  occasion_tags: string[];
  color_tags: string[];
  tone_tags: string[];
  collection_id: string | null;
  category_id: string | null;
};

export type ProductImageRecord = {
  id: string;
  product_id: string;
  url: string;
  alt: string | null;
  sort_order: number;
  is_primary: boolean;
};

export type ProductVariantRecord = {
  id: string;
  product_id: string;
  sku: string;
  size: string | null;
  material: string | null;
  price_cents: number;
  stock_qty: number;
  is_active: boolean;
};

export type CollectionRecord = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  hero_image_url: string | null;
};

export type CategoryRecord = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
};

export type ProductCard = {
  id: string;
  slug: string;
  name: string;
  collection: string;
  priceLabel: string;
  details: string;
  image: string;
  shortDescription: string;
};

export type ProductDetail = {
  id: string;
  slug: string;
  name: string;
  collection: string;
  priceLabel: string;
  description: string;
  metal: string;
  gemstone: string;
  images: { url: string; alt: string }[];
  variants: ProductVariantRecord[];
};

export type CartItemView = {
  id: string;
  productId: string;
  variantId: string | null;
  name: string;
  details: string;
  quantity: number;
  unitPriceCents: number;
  totalPriceCents: number;
  image: string;
};

export type WishlistItemView = {
  id: string;
  productId: string;
  name: string;
  priceLabel: string;
  image: string;
};
