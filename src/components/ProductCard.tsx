import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

type ProductLike = {
  id: string;
  title: string;

  category?: string | null;

  supplier_name?: string | null;
  supplierName?: string | null;

  image_url_primary?: string | null;
  imageUrlPrimary?: string | null;

  price_min?: number | null;
  price_max?: number | null;
  priceMin?: number | null;
  priceMax?: number | null;

  // optional if you have it later
  variant_count?: number | null;
  variantCount?: number | null;
};

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

function getPrice(p: ProductLike) {
  const min = p.price_min ?? p.priceMin ?? 0;
  const max = p.price_max ?? p.priceMax ?? min;
  // Keep ecommerce simple: show “from” if range, else exact
  return max !== min ? `From ${money(min)}` : money(min);
}

const CATEGORY_PLACEHOLDERS: Array<{ match: RegExp; src: string }> = [
  { match: /hoodie|sweat/i, src: "/placeholders/hoodie.svg" },
  { match: /tee|t-?shirt/i, src: "/placeholders/tshirt.svg" },
  { match: /jacket|outer/i, src: "/placeholders/jacket.svg" },
  { match: /polo/i, src: "/placeholders/polo.svg" },
  { match: /cap|hat/i, src: "/placeholders/cap.svg" },
];

function getPlaceholder(category?: string | null) {
  const label = category ?? "";
  const found = CATEGORY_PLACEHOLDERS.find((c) => c.match.test(label));
  return found?.src ?? "/placeholders/apparel.svg";
}

function getImg(p: ProductLike) {
  const placeholder = getPlaceholder(p.category ?? undefined);
  return placeholder ?? p.image_url_primary ?? p.imageUrlPrimary ?? "/placeholders/apparel.svg";
}

export default function ProductCard({ product }: { product: ProductLike }) {
  const supplier = product.supplier_name ?? product.supplierName ?? "BC Apparel";
  const img = getImg(product);
  const price = getPrice(product);

  // If you don’t have variant counts, we’ll derive a safe placeholder:
  const colorsCount =
    product.variant_count ?? product.variantCount ?? null;

  // Badge logic: demo-friendly (you can map to real merch rules later)
  const badge =
    product.category?.toLowerCase().includes("cap") ? "Best Sale" : "Best Price";

  return (
    <div className="rounded-[26px] bg-transparent ring-1 ring-slate-200 overflow-hidden">
      {/* Clickable area */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative bg-transparent">
          {/* Top meta row */}
          <div className="absolute left-4 top-4 z-10">
            <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] text-slate-700 ring-1 ring-slate-200">
              {badge}
            </span>
          </div>

          <div className="absolute right-4 top-4 z-10 text-[12px] text-slate-500">
            {colorsCount ? `${Math.max(1, colorsCount)} Colors` : supplier}
          </div>

          {/* Image */}
          <div className="flex h-[230px] items-end justify-center p-6">
            <img
              src={img}
              alt={product.title}
              className="max-h-full w-auto max-w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Bottom details */}
        <div className="p-5">
          <div className="text-sm text-slate-900 line-clamp-2">
            {product.title}
          </div>
          <div className="mt-2 text-base font-semibold text-slate-900">
            {price}
          </div>
        </div>
      </Link>

      {/* Bottom-right icon button (optional “quick add” UI) */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-end">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-slate-200 transition hover:ring-slate-300"
            aria-label="Quick add (demo)"
            onClick={(e) => {
              e.preventDefault();
              // demo-only: you can hook this to add-to-cart later
            }}
          >
            <ShoppingBag size={18} className="text-slate-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
