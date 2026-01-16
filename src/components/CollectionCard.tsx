import { cn } from "../utils/cn";

export default function CollectionCard({
  eyebrow = "Collection",
  title,
  description,
  onClick,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group text-left bg-white p-7 transition",
        "hover:shadow-[0_30px_80px_rgba(0,0,0,0.08)]"
      )}
    >
      <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
        {eyebrow}
      </div>

      <h3 className="mt-3 text-2xl leading-[1.05] text-slate-900">{title}</h3>

      <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>

      <div className="mt-7 text-xs uppercase tracking-[0.18em] text-slate-700 group-hover:text-slate-900">
        Shop →
      </div>
    </button>
  );
}
