-- Minimal catalog seed for checkout and recommendation smoke tests.

insert into public.categories (slug, name, description, is_active)
values ('rings', 'Rings', 'Fine rings for all occasions', true)
on conflict (slug) do update
set name = excluded.name,
    description = excluded.description,
    is_active = excluded.is_active,
    updated_at = now();

insert into public.collections (slug, name, description, hero_image_url, is_active)
values (
  'bridal-collection',
  'Bridal Collection',
  'Elegant bridal jewelry in timeless cuts.',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1600&auto=format&fit=crop',
  true
)
on conflict (slug) do update
set name = excluded.name,
    description = excluded.description,
    hero_image_url = excluded.hero_image_url,
    is_active = excluded.is_active,
    updated_at = now();

insert into public.products (
  public_id,
  slug,
  name,
  short_description,
  description,
  price_cents,
  currency,
  status,
  is_active,
  category_id,
  collection_id,
  metal,
  gemstone,
  style_tags,
  occasion_tags,
  color_tags,
  tone_tags
)
select
  'c1',
  'eternal-diamond-solitaire',
  'Eternal Diamond Solitaire',
  'Bridal icon in 18k gold.',
  'An elegant solitaire ring crafted in 18k yellow gold with high-clarity diamond.',
  245000,
  'USD',
  'active'::public.product_status,
  true,
  c.id,
  col.id,
  '18k Yellow Gold',
  'Diamond',
  array['classic','statement','bridal']::text[],
  array['wedding','engagement','formal']::text[],
  array['white','black','gold']::text[],
  array['cool','neutral']::text[]
from public.categories c
join public.collections col on col.slug = 'bridal-collection'
where c.slug = 'rings'
on conflict (public_id) do update
set slug = excluded.slug,
    name = excluded.name,
    short_description = excluded.short_description,
    description = excluded.description,
    price_cents = excluded.price_cents,
    currency = excluded.currency,
    status = excluded.status,
    is_active = excluded.is_active,
    category_id = excluded.category_id,
    collection_id = excluded.collection_id,
    metal = excluded.metal,
    gemstone = excluded.gemstone,
    style_tags = excluded.style_tags,
    occasion_tags = excluded.occasion_tags,
    color_tags = excluded.color_tags,
    tone_tags = excluded.tone_tags,
    updated_at = now();

insert into public.product_images (product_id, url, alt, sort_order, is_primary)
select
  p.id,
  'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=900&auto=format&fit=crop',
  'Eternal Diamond Solitaire',
  0,
  true
from public.products p
where p.public_id = 'c1'
on conflict do nothing;
