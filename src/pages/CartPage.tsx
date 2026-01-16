import { Link } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Input from "../components/Input";
import { calcSubtotal, useCart } from "../store/cart";
import { formatMoney } from "../utils/format";

export default function CartPage() {
  const { items, removeItem, setQty } = useCart();
  const subtotal = calcSubtotal(items);
  const shipping = items.length ? 9.99 : 0;
  const total = subtotal + shipping;

  return (
    <Container className="py-8 md:py-10">
      <div className="flex flex-col gap-8">
        <header className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Cart</h1>
            <p className="mt-2 text-sm text-slate-600">
              Update quantities, remove items, then proceed to demo checkout.
            </p>
          </div>
          <Badge>Demo</Badge>
        </header>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 md:p-8 ring-1 ring-slate-200">
            <h2 className="text-base font-semibold text-slate-900">Your cart is empty</h2>
            <p className="mt-2 text-sm text-slate-600">Browse the catalog and add a few items.</p>
            <div className="mt-4">
              <Link to="/catalog" className="text-sm font-semibold text-slate-900 underline">
                Go to catalog
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <section className="lg:col-span-2">
              <div className="rounded-2xl bg-white ring-1 ring-slate-200">
                <ul className="divide-y divide-slate-200">
                  {items.map((x) => (
                    <li key={x.variantId} className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={x.imageUrl}
                          alt={x.title}
                          className="h-24 w-24 rounded-2xl object-cover ring-1 ring-slate-200"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold text-slate-900">
                                {x.title}
                              </div>
                              <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-600">
                                <span>{x.supplierName}</span>
                                <span>•</span>
                                <span>{x.category}</span>
                                <span>•</span>
                                <span>
                                  {x.color} / {x.size}
                                </span>
                              </div>
                              <div className="mt-2 text-sm font-bold text-slate-900">
                                {formatMoney(x.unitPrice)}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <label className="sr-only" htmlFor={`qty-${x.variantId}`}>
                                Quantity
                              </label>
                              <Input
                                id={`qty-${x.variantId}`}
                                className="w-20"
                                inputMode="numeric"
                                value={String(x.qty)}
                                onChange={(e) => setQty(x.variantId, Number(e.target.value || 1))}
                              />
                              <Button variant="ghost" onClick={() => removeItem(x.variantId)}>
                                Remove
                              </Button>
                            </div>
                          </div>

                          <div className="mt-2 text-xs text-slate-500">SKU: {x.sku}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <Link to="/catalog" className="text-sm font-semibold text-slate-700 hover:underline">
                  ← Continue shopping
                </Link>
              </div>
            </section>

            <aside className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <h2 className="text-base font-bold text-slate-900">Order summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatMoney(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Estimated shipping</span>
                  <span className="font-semibold text-slate-900">{formatMoney(shipping)}</span>
                </div>
                <div className="my-3 h-px bg-slate-200" />
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Total</span>
                  <span className="text-lg font-extrabold text-slate-900">
                    {formatMoney(total)}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link to="/checkout">
                  <Button className="w-full">Proceed to checkout</Button>
                </Link>
                <p className="mt-3 text-xs text-slate-600">
                  Demo checkout only. No real payments or order fulfillment.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </Container>
  );
}
