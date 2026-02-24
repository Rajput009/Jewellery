-- Backend hardening: additional data constraints and indexes.

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'orders_currency_code_check'
  ) then
    alter table public.orders
      add constraint orders_currency_code_check
      check (currency ~ '^[A-Z]{3}$');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'products_currency_code_check'
  ) then
    alter table public.products
      add constraint products_currency_code_check
      check (currency ~ '^[A-Z]{3}$');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'orders_snapshots_object_check'
  ) then
    alter table public.orders
      add constraint orders_snapshots_object_check
      check (
        jsonb_typeof(shipping_address_snapshot) = 'object'
        and jsonb_typeof(billing_address_snapshot) = 'object'
      );
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'cart_items_quantity_reasonable_check'
  ) then
    alter table public.cart_items
      add constraint cart_items_quantity_reasonable_check
      check (quantity <= 50);
  end if;
end $$;

create index if not exists idx_orders_user_id_created_at_desc
  on public.orders(user_id, created_at desc);
