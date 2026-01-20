import { cn } from "../utils/cn";

export default function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-none bg-white px-3 text-sm ring-1 ring-slate-300 " +
          "placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-[rgb(var(--navy-800))]",
        className
      )}
      {...props}
    />
  );
}
