import { cn } from "../utils/cn";

export default function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-none bg-white px-3 text-sm ring-1 ring-slate-300 transition " +
          "focus:outline-none focus:ring-2 focus:ring-slate-900",
        className
      )}
      {...props}
    />
  );
}
