-- BC Apparel Demo Storefront Schema
-- Run in Supabase SQL Editor.

create extension if not exists pgcrypto;

-- Suppliers
create table if not exists public.suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique
);

-- Products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete restrict,
  title text not null,
  description text not null,
  category text not null,
  tags text[] null,
  image_url_primary text not null,
  price_min numeric(10,2) not null,
  price_max numeric(10,2) not null,
  is_active boolean not null default true
);

-- Product images
create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  sort_order int not null default 0
);

-- Product variants
create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text not null,
  color text not null,
  size text not null,
  price numeric(10,2) not null,
  is_active boolean not null default true
);

-- Indexes (performance)
create index if not exists idx_products_supplier_id on public.products(supplier_id);
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_is_active on public.products(is_active);
create index if not exists idx_variants_product_id on public.product_variants(product_id);
create index if not exists idx_images_product_id on public.product_images(product_id);

-- Optional: basic full-text index for title search
alter table public.products
  add column if not exists title_tsv tsvector
  generated always as (to_tsvector('english', coalesce(title,''))) stored;

create index if not exists idx_products_title_tsv on public.products using gin (title_tsv);

-- RLS (demo-friendly, public read-only)
alter table public.suppliers enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;

drop policy if exists "public read suppliers" on public.suppliers;
create policy "public read suppliers"
on public.suppliers
for select
to anon, authenticated
using (true);

drop policy if exists "public read products" on public.products;
create policy "public read products"
on public.products
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "public read product_images" on public.product_images;
create policy "public read product_images"
on public.product_images
for select
to anon, authenticated
using (true);

drop policy if exists "public read product_variants" on public.product_variants;
create policy "public read product_variants"
on public.product_variants
for select
to anon, authenticated
using (is_active = true);
