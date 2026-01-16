import { cn } from "../utils/cn";

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        // Full-bleed layout like luxury commerce sites:
        // - no max-width
        // - light gutters that scale with screen
        "w-full px-4 sm:px-6 lg:px-10 2xl:px-14",
        className
      )}
    >
      {children}
    </div>
  );
}
