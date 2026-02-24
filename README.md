# Jewellery Storefront

React + Vite frontend with Supabase local-first backend (Postgres, Auth, RLS, Edge Functions).

## Prerequisites

- Node.js 20+
- Supabase CLI
- Docker Desktop (for local Supabase stack)

## Frontend

1. Install deps:
   - `npm install`
2. Copy env template:
   - `cp .env.example .env.local`
3. Set frontend env values in `.env.local`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Start app:
   - `npm run dev`

## Local Backend (Supabase)

1. Start local services:
   - `npm run db:start`
2. Apply migrations + seed:
   - `npm run db:reset`
3. Deploy edge functions locally:
   - `supabase functions serve --env-file .env.local`

## Key Scripts

- `npm run db:start`
- `npm run db:stop`
- `npm run db:reset`
- `npm run db:migrate`
- `npm run test`
- `npm run test:api`
- `npm run test:ui`
- `npm run build`
- `npm run check`
- `npm run smoke:prod`

## Backend Validation Checklist

Run these before deployment:

1. `npm run test`
2. `npm run build`
3. `npm run db:start`
4. `npm run db:reset`
5. `supabase db query < supabase/tests/rls_smoke.sql`
6. `supabase functions serve --env-file .env.local`

## Production Smoke Test

Use this after deployment:

1. Set required env vars:
   - `PROD_SUPABASE_URL`
   - `PROD_SUPABASE_PUBLISHABLE_KEY`
2. Optional for authenticated checkout path:
   - `PROD_TEST_USER_EMAIL`
   - `PROD_TEST_USER_PASSWORD`
3. Run:
   - `npm run smoke:prod`

Detailed deploy runbook:
- `docs/deploy-today-checklist.md`

Edge-case behavior now enforced:

- Typed API errors for validation/auth/backend failures (`ApiError`).
- No silent chat fallback when Supabase is configured but edge function fails.
- Order lookup requires signed-in user when Supabase is configured.
- Additional DB constraints for currency format, address snapshot type, and cart quantity bounds.

## Implemented Backend Scope

- Auth + profile bootstrap trigger
- Catalog schema (collections/categories/products/images/variants)
- Wishlist + cart persistence
- Checkout order creation via edge function + transaction RPC
- Confirmation lookup by order number
- Chat recommendation endpoint (rules-first + optional LLM enhancement)
- RLS policies for private customer data

## Programmatic SEO (Pakistan Locations)

- Location hub: `/pakistan`
- City pages: `/pakistan/:citySlug`
- XML sitemap: `public/pakistan-sitemap.xml` (replace `https://example.com` with your domain)
- Regenerate sitemap: `npm run seo:pk-sitemap` (set `SITE_URL` env for production domain)
