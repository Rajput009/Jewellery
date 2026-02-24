-- Seed catalog data for local development

insert into public.categories (slug, name, description, is_active)
values
  ('rings', 'Rings', 'Fine rings for all occasions', true),
  ('earrings', 'Earrings', 'Statement and classic earrings', true),
  ('necklaces', 'Necklaces', 'Pendant and chain necklaces', true),
  ('bracelets', 'Bracelets', 'Bracelets and bangles', true)
on conflict (slug) do update
set name = excluded.name,
    description = excluded.description,
    is_active = excluded.is_active,
    updated_at = now();

insert into public.collections (slug, name, description, hero_image_url, is_active)
values
  ('bridal-collection', 'Bridal Collection', 'Elegant bridal jewelry in timeless cuts.', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1600&auto=format&fit=crop', true),
  ('modern-muse', 'Modern Muse', 'Contemporary silhouettes with premium materials.', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1600&auto=format&fit=crop', true),
  ('heritage', 'Heritage', 'Vintage-inspired heirloom pieces.', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1600&auto=format&fit=crop', true)
on conflict (slug) do update
set name = excluded.name,
    description = excluded.description,
    hero_image_url = excluded.hero_image_url,
    is_active = excluded.is_active,
    updated_at = now();

with refs as (
  select
    (select id from public.categories where slug = 'rings') as rings_id,
    (select id from public.collections where slug = 'bridal-collection') as bridal_id,
    (select id from public.collections where slug = 'modern-muse') as modern_id,
    (select id from public.collections where slug = 'heritage') as heritage_id
)
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
select * from (
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
    refs.rings_id,
    refs.bridal_id,
    '18k Yellow Gold',
    'Diamond',
    array['classic','statement','bridal']::text[],
    array['wedding','engagement','formal']::text[],
    array['white','black','gold']::text[],
    array['cool','neutral']::text[]
  from refs
  union all
  select
    'c2',
    'sapphire-halo-orbit',
    'Sapphire Halo Orbit',
    'Modern sapphire halo ring.',
    'Platinum setting with blue sapphire and halo-cut details for contemporary elegance.',
    189000,
    'USD',
    'active'::public.product_status,
    true,
    refs.rings_id,
    refs.modern_id,
    'Platinum',
    'Blue Sapphire',
    array['modern','statement']::text[],
    array['party','formal']::text[],
    array['blue','black','silver']::text[],
    array['cool','neutral']::text[]
  from refs
  union all
  select
    'c3',
    'dainty-pave-stack-band',
    'Dainty pave stack Band',
    'Minimal everyday stack band.',
    'A light and versatile pave stack band in rose gold for daily luxury.',
    120000,
    'USD',
    'active'::public.product_status,
    true,
    refs.rings_id,
    refs.modern_id,
    '18k Rose Gold',
    'Diamond',
    array['minimal','daily']::text[],
    array['daily','office','casual']::text[],
    array['pastel','white','gold']::text[],
    array['warm','neutral']::text[]
  from refs
  union all
  select
    'c4',
    'vintage-emerald-cut',
    'Vintage Emerald Cut',
    'Heritage emerald statement ring.',
    'A 2.5ct emerald cut centerpiece with sculpted gold finish inspired by vintage ateliers.',
    315000,
    'USD',
    'active'::public.product_status,
    true,
    refs.rings_id,
    refs.heritage_id,
    '18k Yellow Gold',
    'Emerald',
    array['vintage','statement']::text[],
    array['wedding','anniversary','formal']::text[],
    array['green','gold','red']::text[],
    array['warm','neutral']::text[]
  from refs
  union all
  select
    'c5',
    'grand-gatsby-signet',
    'Grand Gatsby Signet',
    'Art deco inspired signet ring.',
    'Custom intaglio signet with bold geometry for evening wear.',
    278000,
    'USD',
    'active'::public.product_status,
    true,
    refs.rings_id,
    refs.heritage_id,
    '18k White Gold',
    'Diamond',
    array['art deco','statement','vintage']::text[],
    array['party','formal']::text[],
    array['black','gold']::text[],
    array['warm','cool']::text[]
  from refs
  union all
  select
    'c6',
    'infinity-vine-band',
    'Infinity Vine Band',
    'Soft vine motif ring.',
    'Delicate vine-inspired ring for gifting and daily wear.',
    95000,
    'USD',
    'active'::public.product_status,
    true,
    refs.rings_id,
    refs.modern_id,
    '14k Yellow Gold',
    'Diamond',
    array['minimal','gift']::text[],
    array['daily','casual','gift']::text[],
    array['gold','white','pastel']::text[],
    array['warm','neutral']::text[]
  from refs
) values_to_insert
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

with product_rows as (
  select id, public_id, name
  from public.products
  where public_id in ('c1','c2','c3','c4','c5','c6')
)
insert into public.product_images (product_id, url, alt, sort_order, is_primary)
select p.id, d.url, d.alt, d.sort_order, d.is_primary
from product_rows p
join (
  values
    ('c1','https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=900&auto=format&fit=crop','Eternal Diamond Solitaire',0,true),
    ('c2','https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=900&auto=format&fit=crop','Sapphire Halo Orbit',0,true),
    ('c3','https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=900&auto=format&fit=crop','Dainty pave stack Band',0,true),
    ('c4','https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=900&auto=format&fit=crop','Vintage Emerald Cut',0,true),
    ('c4','https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=900&auto=format&fit=crop','Vintage Emerald lifestyle',1,false),
    ('c4','https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=900&auto=format&fit=crop','Vintage Emerald closeup',2,false),
    ('c5','https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=900&auto=format&fit=crop','Grand Gatsby Signet',0,true),
    ('c6','https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=900&auto=format&fit=crop','Infinity Vine Band',0,true)
) as d(public_id, url, alt, sort_order, is_primary)
on p.public_id = d.public_id
on conflict do nothing;

with product_rows as (
  select id, public_id, metal, price_cents
  from public.products
  where public_id in ('c1','c2','c3','c4','c5','c6')
)
insert into public.product_variants (product_id, sku, size, material, price_cents, stock_qty, is_active)
select p.id, 'SKU-' || upper(p.public_id) || '-6', '6', p.metal, p.price_cents, 20, true
from product_rows p
on conflict (sku) do update
set price_cents = excluded.price_cents,
    stock_qty = excluded.stock_qty,
    is_active = excluded.is_active,
    updated_at = now();

