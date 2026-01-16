export type UUID = string;

export type Supplier = {
  id: UUID;
  name: string;
  slug: string;
};

export type Product = {
  id: UUID;
  supplier_id: UUID;
  title: string;
  description: string;
  category: string;
  tags: string[] | null;
  image_url_primary: string;
  price_min: number;
  price_max: number;
  is_active: boolean;
};

export type ProductImage = {
  id: UUID;
  product_id: UUID;
  url: string;
  sort_order: number;
};

export type ProductVariant = {
  id: UUID;
  product_id: UUID;
  sku: string;
  color: string;
  size: string;
  price: number;
  is_active: boolean;
};

export type CatalogSort = "featured" | "price_asc" | "price_desc";

export type CatalogFilters = {
  q: string;
  supplierSlug: string; // "" means all
  category: string; // "" means all
  priceMin?: number;
  priceMax?: number;
  sort: CatalogSort;
  page: number; // 1-based
  pageSize: number;
};

export type CatalogPageResult = {
  items: Array<Product & { supplier?: Supplier }>;
  total: number;
};
