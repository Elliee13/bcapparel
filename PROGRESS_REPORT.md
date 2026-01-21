# Progress Reports
## 2026-01-21 - Web v3 (visual refresh + page rebuilds)
- Summary: Major visual refresh aligned to new Figma direction, new brochure section/page, and content rewrites.
- Scope: Home, About, Products, Contact, Layout, styles, assets, routing.
- Key changes:
  - Home page rebuilt with new hero, vendors, What We Do, Popular Products, brochures mosaic, How It Works, and Trusted Brands marquee.
  - About page redesigned to match Figma and added GSAP + ScrollTrigger animations with scroll-driven line reveals.
  - Products page repurposed into a product landing with catalog-style cards.
  - Added Brochures/Catalogs page and routing; updated nav to include it.
  - Contact page redesigned to match Figma (image + dark form) and added business enquiries cards.
  - Navbar/footer refreshed, logo wired, and CTA switched to Contact.
  - Unified dark palette using new navy tokens in `src/styles.css`.
- Assets/Content:
  - Added brochure covers in `src/assets/brochures&catalogs/*`.
  - Added contact hero image in `src/assets/contact/contact.png`.
  - Added brand/vendor/collection imagery and logo in `src/assets/*`.
- Data/Backend:
  - No backend changes; static content/images only.
- Known gaps / TODO:
  - None noted.
- Next steps:
  - Optional: wire brochure cards to real PDF/links.
  - Optional: fine-tune animation timings if needed.

---

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

