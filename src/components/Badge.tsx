import { cn } from "../utils/cn";

export default function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent";
  className?: string;
}) {
  const base = "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium";
  const styles =
    tone === "accent"
      ? "bg-[rgb(var(--navy-950))] text-white"
      : "bg-white/70 text-slate-700 ring-1 ring-slate-200";
  return <span className={cn(base, styles, className)}>{children}</span>;
}
