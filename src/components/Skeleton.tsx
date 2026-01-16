import { cn } from "../utils/cn";

export default function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-slate-200/60", className)} />;
}
