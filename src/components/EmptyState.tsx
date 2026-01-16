import Button from "./Button";

export default function EmptyState({
  title,
  description,
  onClear,
}: {
  title: string;
  description: string;
  onClear: () => void;
}) {
  return (
    <div className="rounded-2xl bg-white p-8 ring-1 ring-slate-200">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
      <div className="mt-4">
        <Button variant="secondary" onClick={onClear}>
          Clear filters
        </Button>
      </div>
    </div>
  );
}
