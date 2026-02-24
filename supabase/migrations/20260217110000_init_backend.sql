-- Supabase backend foundation for Eluxee (phase 1)
create extension if not exists "pgcrypto";

create type public.product_status as enum ('draft', 'active', 'archived');
create type public.order_status as enum ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');
create type public.payment_status as enum ('pending_manual', 'paid', 'failed', 'refunded');
create type public.chat_role as enum ('user', 'assistant', 'system');

create table if not exists public.users_profile (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  default_currency text not null default 'USD',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text,
  line1 text not null,
  line2 text,
  city text not null,
  state text,
  postal_code text not null,
  country text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  hero_image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique,
  slug text not null unique,
  name text not null,
  short_description text,
  description text,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'USD',
  status public.product_status not null default 'active',
  is_active boolean not null default true,
  category_id uuid references public.categories(id) on delete set null,
  collection_id uuid references public.collections(id) on delete set null,
  metal text,
  gemstone text,
  style_tags text[] not null default '{}',
  occasion_tags text[] not null default '{}',
  color_tags text[] not null default '{}',
  tone_tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  alt text,
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text not null unique,
  size text,
  material text,
  price_cents integer not null check (price_cents >= 0),
  stock_qty integer not null default 0 check (stock_qty >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wishlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wishlist_items (
  id uuid primary key default gen_random_uuid(),
  wishlist_id uuid not null references public.wishlists(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (wishlist_id, product_id)
);

create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  variant_id uuid references public.product_variants(id) on delete set null,
  quantity integer not null default 1 check (quantity > 0),
  unit_price_cents integer not null check (unit_price_cents >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique nulls not distinct (cart_id, product_id, variant_id)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  status public.order_status not null default 'pending',
  subtotal_cents integer not null default 0,
  shipping_cents integer not null default 0,
  tax_cents integer not null default 0,
  total_cents integer not null default 0,
  currency text not null default 'USD',
  payment_status public.payment_status not null default 'pending_manual',
  shipping_address_snapshot jsonb not null,
  billing_address_snapshot jsonb not null,
  notes text,
  idempotency_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, idempotency_key)
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  variant_id uuid references public.product_variants(id) on delete set null,
  name_snapshot text not null,
  sku_snapshot text,
  price_cents integer not null,
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now()
);

create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  locale text default 'en',
  created_at timestamptz not null default now()
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  role public.chat_role not null,
  content text not null,
  intent text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.chat_rate_limits (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_addresses_user_id on public.addresses(user_id);
create index if not exists idx_products_category_id on public.products(category_id);
create index if not exists idx_products_collection_id on public.products(collection_id);
create index if not exists idx_product_images_product_id on public.product_images(product_id);
create index if not exists idx_product_variants_product_id on public.product_variants(product_id);
create index if not exists idx_wishlist_items_wishlist_id on public.wishlist_items(wishlist_id);
create index if not exists idx_wishlist_items_product_id on public.wishlist_items(product_id);
create index if not exists idx_carts_user_id on public.carts(user_id);
create index if not exists idx_cart_items_cart_id on public.cart_items(cart_id);
create index if not exists idx_cart_items_product_id on public.cart_items(product_id);
create index if not exists idx_cart_items_variant_id on public.cart_items(variant_id);
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_order_items_product_id on public.order_items(product_id);
create index if not exists idx_chat_sessions_user_id on public.chat_sessions(user_id);
create index if not exists idx_chat_messages_session_id on public.chat_messages(session_id);
create index if not exists idx_products_active_partial on public.products(is_active) where is_active = true;
create index if not exists idx_products_style_tags_gin on public.products using gin(style_tags);
create index if not exists idx_products_occasion_tags_gin on public.products using gin(occasion_tags);
create index if not exists idx_products_color_tags_gin on public.products using gin(color_tags);
create index if not exists idx_products_tone_tags_gin on public.products using gin(tone_tags);
create index if not exists idx_chat_rate_limits_session_ip_created on public.chat_rate_limits(session_id, ip_hash, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users_profile (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;

  insert into public.wishlists (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  insert into public.carts (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

do $$
declare
  t text;
begin
  foreach t in array array[
    'users_profile', 'addresses', 'categories', 'collections', 'products',
    'product_images', 'product_variants', 'wishlists', 'wishlist_items',
    'carts', 'cart_items', 'orders'
  ] loop
    execute format('drop trigger if exists trg_%s_updated_at on public.%s;', t, t);
    execute format('create trigger trg_%s_updated_at before update on public.%s for each row execute procedure public.set_updated_at();', t, t);
  end loop;
end $$;

create or replace function public.generate_order_number()
returns text
language plpgsql
as $$
declare
  generated text;
begin
  generated := 'ELX-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8));
  return generated;
end;
$$;

create or replace function public.recommend_products(input jsonb)
returns setof public.products
language sql
stable
as $$
  with normalized as (
    select array_remove(array[
      lower(coalesce(input ->> 'occasion', '')),
      lower(coalesce(input ->> 'style', '')),
      lower(coalesce(input ->> 'color', '')),
      lower(coalesce(input ->> 'skin_tone', '')),
      lower(coalesce(input ->> 'dress', '')),
      lower(coalesce(input ->> 'query', ''))
    ], '') as raw_tokens
  ), tokens as (
    select array_agg(distinct t) as tokens
    from normalized,
    unnest(raw_tokens) as raw,
    lateral regexp_split_to_table(raw, '\\s+') as t
    where t <> ''
  ), scored as (
    select
      p.id,
      p.public_id,
      p.slug,
      p.name,
      p.short_description,
      p.description,
      p.price_cents,
      p.currency,
      p.status,
      p.is_active,
      p.category_id,
      p.collection_id,
      p.metal,
      p.gemstone,
      p.style_tags,
      p.occasion_tags,
      p.color_tags,
      p.tone_tags,
      p.created_at,
      p.updated_at,
      (
        select coalesce(count(*), 0)
        from unnest(coalesce((select tokens from tokens), '{}'::text[])) tok
        where tok = any(p.occasion_tags)
           or tok = any(p.style_tags)
           or tok = any(p.color_tags)
           or tok = any(p.tone_tags)
           or tok = lower(coalesce(p.metal, ''))
           or tok = lower(coalesce(p.gemstone, ''))
      ) as score
    from public.products p
    where p.is_active = true
      and p.status = 'active'
  )
  select
    s.id,
    s.public_id,
    s.slug,
    s.name,
    s.short_description,
    s.description,
    s.price_cents,
    s.currency,
    s.status,
    s.is_active,
    s.category_id,
    s.collection_id,
    s.metal,
    s.gemstone,
    s.style_tags,
    s.occasion_tags,
    s.color_tags,
    s.tone_tags,
    s.created_at,
    s.updated_at
  from scored s
  order by score desc, s.created_at desc
  limit coalesce(nullif((input ->> 'limit')::int, 0), 6);
$$;

create or replace function public.create_order_from_cart(input jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_cart_id uuid;
  v_order_id uuid;
  v_order_number text;
  v_subtotal integer := 0;
  v_shipping integer := coalesce((input ->> 'shipping_cents')::integer, 0);
  v_tax integer := coalesce((input ->> 'tax_cents')::integer, 0);
  v_currency text := coalesce(input ->> 'currency', 'USD');
  v_shipping_snapshot jsonb := coalesce(input -> 'shipping_address', '{}'::jsonb);
  v_billing_snapshot jsonb := coalesce(input -> 'billing_address', '{}'::jsonb);
  v_notes text := input ->> 'notes';
  v_idempotency_key text := nullif(input ->> 'idempotency_key', '');
  rec record;
  existing_order_id uuid;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  if v_idempotency_key is not null then
    select id into existing_order_id
    from public.orders
    where user_id = v_user_id and idempotency_key = v_idempotency_key
    limit 1;

    if existing_order_id is not null then
      return jsonb_build_object(
        'order_id', existing_order_id,
        'order_number', (select order_number from public.orders where id = existing_order_id),
        'already_exists', true
      );
    end if;
  end if;

  select id into v_cart_id
  from public.carts
  where user_id = v_user_id
  limit 1;

  if v_cart_id is null then
    raise exception 'Cart not found';
  end if;

  for rec in
    select
      ci.id as cart_item_id,
      ci.product_id,
      ci.variant_id,
      ci.quantity,
      ci.unit_price_cents,
      p.name as product_name,
      pv.sku,
      pv.stock_qty
    from public.cart_items ci
    join public.products p on p.id = ci.product_id
    left join public.product_variants pv on pv.id = ci.variant_id
    where ci.cart_id = v_cart_id
    for update of ci
  loop
    if rec.variant_id is not null then
      if rec.stock_qty is null then
        raise exception 'Variant not found for cart item %', rec.cart_item_id;
      end if;
      if rec.stock_qty < rec.quantity then
        raise exception 'Insufficient stock for variant %', rec.variant_id;
      end if;
    end if;

    v_subtotal := v_subtotal + (rec.unit_price_cents * rec.quantity);
  end loop;

  if v_subtotal = 0 then
    raise exception 'Cart is empty';
  end if;

  v_order_number := public.generate_order_number();

  insert into public.orders (
    order_number,
    user_id,
    status,
    subtotal_cents,
    shipping_cents,
    tax_cents,
    total_cents,
    currency,
    payment_status,
    shipping_address_snapshot,
    billing_address_snapshot,
    notes,
    idempotency_key
  ) values (
    v_order_number,
    v_user_id,
    'pending',
    v_subtotal,
    v_shipping,
    v_tax,
    v_subtotal + v_shipping + v_tax,
    v_currency,
    'pending_manual',
    v_shipping_snapshot,
    v_billing_snapshot,
    v_notes,
    v_idempotency_key
  ) returning id into v_order_id;

  insert into public.order_items (
    order_id,
    product_id,
    variant_id,
    name_snapshot,
    sku_snapshot,
    price_cents,
    quantity
  )
  select
    v_order_id,
    ci.product_id,
    ci.variant_id,
    p.name,
    pv.sku,
    ci.unit_price_cents,
    ci.quantity
  from public.cart_items ci
  join public.products p on p.id = ci.product_id
  left join public.product_variants pv on pv.id = ci.variant_id
  where ci.cart_id = v_cart_id;

  update public.product_variants pv
  set stock_qty = pv.stock_qty - ci.quantity
  from public.cart_items ci
  where ci.variant_id = pv.id
    and ci.cart_id = v_cart_id;

  delete from public.cart_items where cart_id = v_cart_id;

  return jsonb_build_object(
    'order_id', v_order_id,
    'order_number', v_order_number,
    'already_exists', false
  );
end;
$$;

grant execute on function public.recommend_products(jsonb) to anon, authenticated;
grant execute on function public.create_order_from_cart(jsonb) to authenticated;

alter table public.users_profile enable row level security;
alter table public.addresses enable row level security;
alter table public.categories enable row level security;
alter table public.collections enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.wishlists enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;
alter table public.chat_rate_limits enable row level security;

create policy "public read categories" on public.categories
for select using (is_active = true);

create policy "public read collections" on public.collections
for select using (is_active = true);

create policy "public read products" on public.products
for select using (is_active = true and status = 'active');

create policy "public read product images" on public.product_images
for select using (
  exists (
    select 1 from public.products p
    where p.id = product_images.product_id
      and p.is_active = true
      and p.status = 'active'
  )
);

create policy "public read active variants" on public.product_variants
for select using (
  is_active = true and exists (
    select 1 from public.products p
    where p.id = product_variants.product_id
      and p.is_active = true
      and p.status = 'active'
  )
);

create policy "users select own profile" on public.users_profile
for select to authenticated using (auth.uid() = id);

create policy "users update own profile" on public.users_profile
for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "users insert own addresses" on public.addresses
for insert to authenticated with check (auth.uid() = user_id);
create policy "users read own addresses" on public.addresses
for select to authenticated using (auth.uid() = user_id);
create policy "users update own addresses" on public.addresses
for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users delete own addresses" on public.addresses
for delete to authenticated using (auth.uid() = user_id);

create policy "users read own wishlist" on public.wishlists
for select to authenticated using (auth.uid() = user_id);
create policy "users insert own wishlist" on public.wishlists
for insert to authenticated with check (auth.uid() = user_id);
create policy "users update own wishlist" on public.wishlists
for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users read own wishlist items" on public.wishlist_items
for select to authenticated using (
  exists (
    select 1 from public.wishlists w
    where w.id = wishlist_items.wishlist_id and w.user_id = auth.uid()
  )
);
create policy "users write own wishlist items" on public.wishlist_items
for insert to authenticated with check (
  exists (
    select 1 from public.wishlists w
    where w.id = wishlist_items.wishlist_id and w.user_id = auth.uid()
  )
);
create policy "users delete own wishlist items" on public.wishlist_items
for delete to authenticated using (
  exists (
    select 1 from public.wishlists w
    where w.id = wishlist_items.wishlist_id and w.user_id = auth.uid()
  )
);

create policy "users read own cart" on public.carts
for select to authenticated using (auth.uid() = user_id);
create policy "users insert own cart" on public.carts
for insert to authenticated with check (auth.uid() = user_id);
create policy "users update own cart" on public.carts
for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users read own cart items" on public.cart_items
for select to authenticated using (
  exists (
    select 1 from public.carts c
    where c.id = cart_items.cart_id and c.user_id = auth.uid()
  )
);
create policy "users insert own cart items" on public.cart_items
for insert to authenticated with check (
  exists (
    select 1 from public.carts c
    where c.id = cart_items.cart_id and c.user_id = auth.uid()
  )
);
create policy "users update own cart items" on public.cart_items
for update to authenticated using (
  exists (
    select 1 from public.carts c
    where c.id = cart_items.cart_id and c.user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from public.carts c
    where c.id = cart_items.cart_id and c.user_id = auth.uid()
  )
);
create policy "users delete own cart items" on public.cart_items
for delete to authenticated using (
  exists (
    select 1 from public.carts c
    where c.id = cart_items.cart_id and c.user_id = auth.uid()
  )
);

create policy "users read own orders" on public.orders
for select to authenticated using (auth.uid() = user_id);

create policy "users read own order items" on public.order_items
for select to authenticated using (
  exists (
    select 1 from public.orders o
    where o.id = order_items.order_id and o.user_id = auth.uid()
  )
);

create policy "users read own chat sessions" on public.chat_sessions
for select to authenticated using (auth.uid() = user_id);
create policy "users write own chat sessions" on public.chat_sessions
for insert to authenticated with check (auth.uid() = user_id);

create policy "users read own chat messages" on public.chat_messages
for select to authenticated using (
  exists (
    select 1 from public.chat_sessions s
    where s.id = chat_messages.session_id and s.user_id = auth.uid()
  )
);

create policy "service role full chat rate limit" on public.chat_rate_limits
for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
