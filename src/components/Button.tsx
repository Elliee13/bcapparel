import { cn } from "../utils/cn";

export default function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}) {
  const base =
    "inline-flex items-center justify-center rounded-none px-4 py-2 text-sm font-semibold tracking-wide transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--navy-800))] focus-visible:ring-offset-2 " +
    "disabled:cursor-not-allowed disabled:opacity-50";

  const styles =
    variant === "primary"
      ? "bg-[rgb(var(--navy-950))] text-white hover:bg-[rgb(var(--navy-800))] hover:-translate-y-[1px] hover:shadow-[var(--shadow)]"
      : variant === "secondary"
      ? "bg-white text-slate-900 ring-1 ring-slate-300 hover:-translate-y-[1px] hover:shadow-[var(--shadow)]"
      : variant === "danger"
      ? "bg-rose-600 text-white hover:bg-rose-500 hover:-translate-y-[1px] hover:shadow-[var(--shadow)]"
      : "bg-transparent text-slate-700 hover:text-slate-900 hover:underline underline-offset-4";

  return <button className={cn(base, styles, className)} {...props} />;
}
