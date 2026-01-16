import { supabase } from "./supabaseClient";
import type { Product, Supplier } from "../types/catalog";

export type HomeFeaturedProduct = Product & { supplier?: Supplier };

export async function fetchFeaturedProducts(limit = 8): Promise<HomeFeaturedProduct[]> {
  // Simple + fast: active products, most recently created first (or title fallback)
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id, supplier_id, title, description, category, tags, image_url_primary, price_min, price_max, is_active,
      suppliers:supplier_id ( id, name, slug )
    `
    )
    .eq("is_active", true)
    .order("title", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return (data ?? []).map((p: any) => ({ ...p, supplier: p.suppliers ?? undefined }));
}
