import Button from "./Button";
import { clampInt } from "../utils/format";

export default function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = clampInt(page, 1, totalPages);

  const canPrev = safePage > 1;
  const canNext = safePage < totalPages;

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-sm text-slate-600">
        Page <span className="font-semibold text-slate-900">{safePage}</span> of{" "}
        <span className="font-semibold text-slate-900">{totalPages}</span> •{" "}
        <span className="font-semibold text-slate-900">{total}</span> items
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" disabled={!canPrev} onClick={() => onPageChange(safePage - 1)}>
          Prev
        </Button>
        <Button variant="secondary" disabled={!canNext} onClick={() => onPageChange(safePage + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
