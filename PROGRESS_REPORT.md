# Progress Reports

## 2026-01-20 — Web v2 (incomplete)
- Summary: Refactor toward a more visual, asset-rich storefront with updated layout and simplified data flow.
- Scope: Home page overhaul, layout refresh, product data migration, routing updates.
- Key changes:
  - Added brand/vendor/hero imagery and a web logo.
  - Reworked layout and home page visuals.
  - Simplified routes and pages (added Products page; removed Catalog/Cart/Checkout/Product pages).
  - Updated product display components to match new data.
- Assets/Content:
  - Added hero, brand, and vendor images in `src/assets/hero/*`.
  - Added logo in `src/assets/webLogo/*`.
- Data/Backend:
  - Shifted from Supabase/API-driven catalog to local static data in `src/data/products.ts`.
  - Removed Supabase client and API helpers.
- Known gaps / TODO:
  - v2 is marked incomplete; remaining tasks not yet documented.
- Next steps:
  - Identify missing v2 sections and complete layout/content polish.
  - Revisit data strategy if dynamic catalog is required.
- Links/Refs:
  - Commit: 34f1ddf

---

## 2026-01-17 — Cleanup
- Summary: Small cleanup pass.
- Scope: App entry.
- Key changes:
  - Removed an unused import in `src/App.tsx`.
- Assets/Content:
  - None.
- Data/Backend:
  - None.
- Known gaps / TODO:
  - None.
- Next steps:
  - Continue feature work.
- Links/Refs:
  - Commit: 3342ec3

---

## 2026-01-17 — Sample demo website v1
- Summary: Initial full demo website with full page set, UI system, and Supabase-backed catalog.
- Scope: Project bootstrap, UI components, pages, data layer, assets, and configuration.
- Key changes:
  - Bootstrapped React + TypeScript + Vite with ESLint and TS configs.
  - Built shared UI components and layout scaffolding.
  - Implemented pages: home, catalog, product, cart, checkout, about, contact, request, 404.
  - Added catalog types, utilities, and placeholder assets.
- Assets/Content:
  - Added placeholder product imagery in `public/placeholders/*`.
- Data/Backend:
  - Added Supabase client and API helpers.
  - Added DB schema and seed scripts in `supabase/`.
- Known gaps / TODO:
  - None listed; baseline established.
- Next steps:
  - Iterate on visuals and feature depth.
- Links/Refs:
  - Commit: e935c6e
