import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../data/products";

export default function ProductCard({ product }: { product: Product }) {
  const badge = product.badge || null;

  return (
    <div className="group rounded-[22px] bg-white ring-1 ring-slate-200 shadow-[0_12px_30px_rgba(15,23,42,0.08)] overflow-hidden">
      <a
        href={product.externalUrl}
        target="_blank"
        rel="noreferrer"
        className="block"
      >
        <div className="relative bg-[rgb(var(--bg))]">
          {badge ? (
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-700 ring-1 ring-slate-200">
              {badge}
            </span>
          ) : null}

          <div className="absolute right-4 top-4 text-[11px] uppercase tracking-[0.18em] text-slate-600">
            {product.colorsCount} Colors
          </div>

          <div className="flex h-[190px] items-center justify-center p-5">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="max-h-full w-auto max-w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="p-4">
          <div className="text-sm font-semibold text-slate-900 line-clamp-2">
            {product.title}
          </div>
          <div className="mt-2 text-base font-semibold text-slate-900">
            {product.priceLabel}
          </div>
          <div className="mt-1 text-xs text-slate-500">{product.supplier}</div>
        </div>
      </a>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between gap-2">
          <Link
            to={`/request?product=${encodeURIComponent(product.id)}`}
            className="inline-flex h-9 items-center justify-center rounded-full border border-slate-200 px-4 text-[11px] uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
          >
            Request Quote
          </Link>
          <a
            href={product.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-slate-200 transition hover:ring-slate-300"
            aria-label="Open supplier page"
          >
            <ExternalLink size={16} className="text-slate-700" />
          </a>
        </div>
      </div>
    </div>
  );
}
