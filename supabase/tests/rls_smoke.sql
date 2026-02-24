-- Run after local db start with: supabase db query < supabase/tests/rls_smoke.sql
-- Basic smoke checks for RLS and protected writes.

begin;

-- Ensure RLS is enabled on key private tables.
select relname as table_name, relrowsecurity as rls_enabled
from pg_class
where relname in ('users_profile', 'addresses', 'wishlists', 'wishlist_items', 'carts', 'cart_items', 'orders', 'order_items')
order by relname;

-- Public can read active products.
select count(*) as active_products from public.products where is_active = true;

-- This should fail under anon/authenticated client due missing columns/permissions in normal app flows.
-- Run manually in a restricted session for negative tests.

rollback;
