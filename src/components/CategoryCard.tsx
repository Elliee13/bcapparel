import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  tag?: string;
  onClick?: () => void;
}

export default function CategoryCard({
  title,
  imageUrl,
  tag,
  onClick,
}: CategoryCardProps) {
  return (
    <button type="button" onClick={onClick} className="group w-full text-left">
      <div className="relative overflow-hidden rounded-[28px] ring-1 ring-slate-200 bg-slate-100">
        {/* Image */}
        <img
          src={imageUrl}
          alt={title}
          className="h-[260px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />

        {/* Subtle gradient for readability (like Recommended) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        </div>

        {/* Top-left tag */}
        {tag ? (
          <div className="absolute left-6 top-6 text-[11px] uppercase tracking-[0.18em] text-white/90">
            {tag}
          </div>
        ) : null}

        {/* Bottom content (title + shop) */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="flex items-end justify-between gap-6">
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/85">
                Collection
              </div>
              <div className="display mt-2 text-2xl leading-[1.05] text-white">
                {title}
              </div>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs uppercase tracking-[0.18em] text-slate-900 ring-1 ring-white/30 transition-transform duration-300 group-hover:-translate-y-0.5">
              Shop
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white ring-1 ring-slate-200">
                <ArrowRight size={14} />
              </span>
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
