import { supabase } from "./supabaseClient";
import type {
  CatalogFilters,
  CatalogPageResult,
  Product,
  ProductImage,
  ProductVariant,
  Supplier,
} from "../types/catalog";

const SUPPLIERS_CACHE_KEY = "bc_demo_suppliers_v1";

export async function fetchSuppliersCached(): Promise<Supplier[]> {
  // tiny cache to reduce repetitive calls; safe for demo
  const cached = sessionStorage.getItem(SUPPLIERS_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached) as Supplier[];
    } catch {
      // ignore
    }
  }

  const { data, error } = await supabase
    .from("suppliers")
    .select("id,name,slug")
    .order("name", { ascending: true });

  if (error) throw error;
  const suppliers = (data ?? []) as Supplier[];
  sessionStorage.setItem(SUPPLIERS_CACHE_KEY, JSON.stringify(suppliers));
  return suppliers;
}

export async function fetchCategories(): Promise<string[]> {
  // Derived from products; small + cached by the browser automatically.
  const { data, error } = await supabase
    .from("products")
    .select("category")
    .eq("is_active", true);

  if (error) throw error;

  const set = new Set<string>();
  for (const row of data ?? []) {
    if (row.category) set.add(row.category);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export async function fetchCatalogPage(filters: CatalogFilters): Promise<CatalogPageResult> {
  const { q, category, supplierSlug, priceMin, priceMax, sort, page, pageSize } = filters;

  // We fetch supplier list once and map slug -> id locally for fast filtering
  const suppliers = await fetchSuppliersCached();
  const supplierId =
    supplierSlug ? suppliers.find((s) => s.slug === supplierSlug)?.id ?? null : null;

  let query = supabase
    .from("products")
    .select("id,supplier_id,title,description,category,tags,image_url_primary,price_min,price_max,is_active", {
      count: "exact",
    })
    .eq("is_active", true);

  if (q.trim()) query = query.ilike("title", `%${q.trim()}%`);
  if (category) query = query.eq("category", category);
  if (supplierId) query = query.eq("supplier_id", supplierId);
  if (typeof priceMin === "number") query = query.gte("price_max", priceMin);
  if (typeof priceMax === "number") query = query.lte("price_min", priceMax);

  // Sorting
  if (sort === "price_asc") query = query.order("price_min", { ascending: true });
  else if (sort === "price_desc") query = query.order("price_min", { ascending: false });
  else query = query.order("title", { ascending: true }); // “Featured” demo default

  // Pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) throw error;

  const items = (data ?? []) as Product[];
  const supplierById = new Map(suppliers.map((s) => [s.id, s] as const));
  const enriched = items.map((p) => ({ ...p, supplier: supplierById.get(p.supplier_id) }));

  return { items: enriched, total: count ?? 0 };
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("id,supplier_id,title,description,category,tags,image_url_primary,price_min,price_max,is_active")
    .eq("id", id)
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw error;
  return (data ?? null) as Product | null;
}

export async function fetchProductImages(productId: string): Promise<ProductImage[]> {
  const { data, error } = await supabase
    .from("product_images")
    .select("id,product_id,url,sort_order")
    .eq("product_id", productId)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data ?? []) as ProductImage[];
}

export async function fetchProductVariants(productId: string): Promise<ProductVariant[]> {
  const { data, error } = await supabase
    .from("product_variants")
    .select("id,product_id,sku,color,size,price,is_active")
    .eq("product_id", productId)
    .eq("is_active", true)
    .order("price", { ascending: true });

  if (error) throw error;
  return (data ?? []) as ProductVariant[];
}

export async function fetchSupplierById(id: string): Promise<Supplier | null> {
  const { data, error } = await supabase
    .from("suppliers")
    .select("id,name,slug")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return (data ?? null) as Supplier | null;
}
