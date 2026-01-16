import Input from "./Input";

export default function PriceRange({
  min,
  max,
  onMinChange,
  onMaxChange,
}: {
  min: string;
  max: string;
  onMinChange: (v: string) => void;
  onMaxChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="sr-only" htmlFor="priceMin">
          Min price
        </label>
        <Input
          id="priceMin"
          inputMode="decimal"
          placeholder="Min"
          value={min}
          onChange={(e) => onMinChange(e.target.value)}
        />
      </div>
      <div>
        <label className="sr-only" htmlFor="priceMax">
          Max price
        </label>
        <Input
          id="priceMax"
          inputMode="decimal"
          placeholder="Max"
          value={max}
          onChange={(e) => onMaxChange(e.target.value)}
        />
      </div>
    </div>
  );
}
