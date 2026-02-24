# Deploy-Today Checklist

## 1) Pre-Deploy (Local)

1. `npm ci`
2. `npm run check`
3. `npm run db:start`
4. `npm run db:reset`
5. `Get-Content supabase/tests/rls_smoke.sql | docker exec -i supabase_db_jewellery-local psql -U postgres -d postgres`

## 2) Deploy Database + Functions

1. `npx supabase login`
2. `npx supabase link --project-ref <project-ref>`
3. `npx supabase db push --yes`
4. `npx supabase functions deploy checkout-create-order --project-ref <project-ref>`
5. `npx supabase functions deploy chat-recommend --project-ref <project-ref>`

## 3) Post-Deploy Smoke

Set env vars:

- `PROD_SUPABASE_URL` (example: `https://<project-ref>.supabase.co`)
- `PROD_SUPABASE_PUBLISHABLE_KEY` (publishable key)
- Optional for authenticated checkout test:
  - `PROD_TEST_USER_EMAIL`
  - `PROD_TEST_USER_PASSWORD`

Run:

1. `npm run smoke:prod`

Expected:

- chat `GET` -> `405`
- chat invalid payload -> `400`
- chat valid payload -> `200`
- checkout no bearer -> `401`
- checkout anon bearer -> `401`
- if test user provided:
  - checkout first call -> `200`
  - checkout second call with same idempotency key -> `200` and idempotent

## 4) Rollback

If post-deploy smoke fails:

1. Stop rollout traffic (if applicable).
2. Redeploy previously known-good function versions from CI artifact/git tag.
3. If a migration introduced a breaking change, apply a forward fix migration (do not mutate history).
4. Re-run `npm run smoke:prod` before re-opening traffic.
