-- BC Apparel Demo Storefront Seed
-- Inserts 5 suppliers, 25 products (5 each), plus variants (4–6) and gallery images (3) per product.

-- Suppliers
insert into public.suppliers (name, slug) values
  ('SanMar', 'sanmar'),
  ('S&S Activewear', 'ss-activewear'),
  ('Badger Sport', 'badger-sport'),
  ('Richardson', 'richardson'),
  ('Outdoor Cap', 'outdoor-cap')
on conflict (slug) do nothing;

-- Seed products (25 total)
with seed_products as (
  select * from (values
    -- SanMar (5)
    ('sanmar','Essential Cotton Tee','Soft, reliable everyday tee built for print and comfort.','T-Shirts', 8.50),
    ('sanmar','Midweight Fleece Hoodie','Clean fleece hoodie with premium hand-feel.','Hoodies', 28.00),
    ('sanmar','Performance Polo','Moisture-wicking polo for teams and staff.','Polos', 22.00),
    ('sanmar','Lightweight Wind Jacket','Packable jacket with clean silhouette.','Jackets', 35.00),
    ('sanmar','Classic Dad Cap','Low-profile cap for casual wear.','Caps', 14.00),

    -- S&S Activewear (5)
    ('ss-activewear','Heavyweight Street Tee','Structured heavyweight tee with modern fit.','T-Shirts', 12.00),
    ('ss-activewear','Premium Pullover Hoodie','Premium hoodie with elevated finish.','Hoodies', 34.00),
    ('ss-activewear','Pique Polo','Classic pique polo with durable collar.','Polos', 20.00),
    ('ss-activewear','Softshell Jacket','Clean softshell with light stretch.','Jackets', 48.00),
    ('ss-activewear','Five-Panel Cap','Modern five-panel cap for branding.','Caps', 16.00),

    -- Badger Sport (5)
    ('badger-sport','Training Tech Tee','Lightweight performance tee for training.','T-Shirts', 11.50),
    ('badger-sport','Athletic Hoodie','Sport-ready hoodie for warm-ups.','Hoodies', 29.00),
    ('badger-sport','Team Polo','Breathable polo for staff and teams.','Polos', 23.00),
    ('badger-sport','Warmup Jacket','Layer-friendly jacket for active wear.','Jackets', 42.00),
    ('badger-sport','Mesh Back Cap','Breathable cap with sporty feel.','Caps', 15.00),

    -- Richardson (5)
    ('richardson','Premium Cotton Tee','Smooth cotton tee designed for decoration.','T-Shirts', 10.00),
    ('richardson','Weekend Hoodie','Everyday hoodie with clean details.','Hoodies', 32.00),
    ('richardson','Office Polo','Sharp polo built for uniforms.','Polos', 24.00),
    ('richardson','Coach Jacket','Classic coach jacket silhouette.','Jackets', 45.00),
    ('richardson','Snapback Cap','Structured snapback with premium profile.','Caps', 18.00),

    -- Outdoor Cap (5)
    ('outdoor-cap','Everyday Tee','Comfort-forward tee ready for print.','T-Shirts', 9.50),
    ('outdoor-cap','Cozy Fleece Hoodie','Warm fleece hoodie with premium finish.','Hoodies', 30.00),
    ('outdoor-cap','Tech Polo','Modern polo for teams and events.','Polos', 21.00),
    ('outdoor-cap','Light Bomber Jacket','Light bomber jacket with clean lines.','Jackets', 50.00),
    ('outdoor-cap','Trucker Cap','Classic trucker cap with mesh back.','Caps', 14.50)
  ) as t(supplier_slug, title, description, category, base_price)
),
supplier_map as (
  select id, slug from public.suppliers
),
inserted_products as (
  insert into public.products (
    supplier_id, title, description, category, tags, image_url_primary, price_min, price_max, is_active
  )
  select
    sm.id as supplier_id,
    sp.title,
    sp.description,
    sp.category,
    array['demo','bcapparel', lower(replace(sp.category,' ','-'))]::text[] as tags,
    -- placeholder primary image
    ('https://picsum.photos/seed/' || sm.slug || '-' || regexp_replace(lower(sp.title), '\s+', '-', 'g') || '/900/700') as image_url_primary,
    -- price range derived
    round(sp.base_price::numeric, 2) as price_min,
    round((sp.base_price + case when sp.category = 'Jackets' then 18 else 8 end)::numeric, 2) as price_max,
    true as is_active
  from seed_products sp
  join supplier_map sm on sm.slug = sp.supplier_slug
  returning id, supplier_id, title, category
)
-- Gallery images: 3 per product
insert into public.product_images (product_id, url, sort_order)
select
  p.id,
  ('https://picsum.photos/seed/' || regexp_replace(lower(p.title), '\s+', '-', 'g') || '-g' || gs.i || '/1200/900') as url,
  gs.i as sort_order
from inserted_products p
cross join generate_series(1,3) as gs(i);

-- Variants: Caps => 4 (OSFA), else 6 (S–2XL)
with prod as (
  select id, title, category from public.products
  where tags @> array['demo']::text[]
),
variant_series as (
  select
    p.id as product_id,
    p.title,
    p.category,
    case when p.category = 'Caps' then 4 else 6 end as variant_count
  from prod p
),
colors as (
  select
    vs.product_id,
    vs.title,
    vs.category,
    vs.variant_count,
    case
      when vs.category = 'Caps' then array['Black','Navy','Charcoal','Camo']
      when vs.category = 'T-Shirts' then array['Black','White','Heather Gray','Navy']
      when vs.category = 'Hoodies' then array['Black','Heather Gray','Navy','Sand']
      when vs.category = 'Polos' then array['Black','Navy','White','Steel']
      else array['Black','Navy','Olive','Stone']
    end as color_list,
    case
      when vs.category = 'Caps' then array['OSFA']
      else array['S','M','L','XL','2XL']
    end as size_list
  from variant_series vs
),
base_price as (
  select
    p.id as product_id,
    (p.price_min::numeric) as base_price
  from public.products p
  where p.tags @> array['demo']::text[]
)
insert into public.product_variants (product_id, sku, color, size, price, is_active)
select
  c.product_id,
  ('DEMO-' || upper(substr(regexp_replace(c.title,'[^a-zA-Z0-9]+','','g'),1,8)) || '-' || lpad(gs.i::text, 2, '0')) as sku,
  c.color_list[((gs.i - 1) % array_length(c.color_list,1)) + 1] as color,
  c.size_list[((gs.i - 1) % array_length(c.size_list,1)) + 1] as size,
  round((bp.base_price + (gs.i - 1) * case when c.category = 'Caps' then 0.75 else 1.50 end)::numeric, 2) as price,
  true
from colors c
join base_price bp on bp.product_id = c.product_id
cross join lateral generate_series(1, c.variant_count) as gs(i);
