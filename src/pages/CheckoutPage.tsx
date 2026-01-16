import { useMemo, useState } from "react";
import Container from "../components/Container";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Input from "../components/Input";
import { calcSubtotal, useCart } from "../store/cart";
import { formatMoney } from "../utils/format";

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
};

export default function CheckoutPage() {
  const cart = useCart();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const subtotal = useMemo(() => calcSubtotal(cart.items), [cart.items]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Demo-level validation: minimal but clear
    if (!form.name.trim() || !form.email.trim() || !form.address.trim()) return;

    setDone(true);
    cart.clear();
  }

  if (done) {
    return (
      <Container className="py-8 md:py-10">
        <div className="rounded-2xl bg-white p-6 md:p-8 ring-1 ring-slate-200">
          <div className="flex items-center gap-2">
            <Badge tone="accent">Demo Checkout</Badge>
            <Badge>Success</Badge>
          </div>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">
            Demo order created
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            This confirms the end-to-end flow for the rebuild. No real payments were processed.
          </p>
          <div className="mt-6">
            <a href="/catalog">
              <Button variant="secondary">Back to catalog</Button>
            </a>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 md:py-10">
      <div className="flex flex-col gap-8">
        <header className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Checkout</h1>
            <p className="mt-2 text-sm text-slate-600">
              This is a <span className="font-semibold">Demo Checkout</span>. No production payments.
            </p>
          </div>
          <Badge tone="accent">Demo Checkout</Badge>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 md:p-8 ring-1 ring-slate-200 lg:col-span-2">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Name *</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Email *</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Phone</label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-semibold text-slate-700">Address *</label>
                <Input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-semibold text-slate-700">Notes</label>
                <Input
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-600">
                Required fields: name, email, address. This is demo-only.
              </p>
              <Button type="submit" disabled={cart.items.length === 0}>
                Submit demo order
              </Button>
            </div>
          </form>

          <aside className="rounded-2xl bg-white p-6 md:p-8 ring-1 ring-slate-200">
            <h2 className="text-base font-bold text-slate-900">Summary</h2>
            <p className="mt-2 text-sm text-slate-600">
              Items: <span className="font-semibold text-slate-900">{cart.items.length}</span>
            </p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-semibold text-slate-900">{formatMoney(subtotal)}</span>
            </div>
            <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 ring-1 ring-slate-200">
              <div className="font-semibold text-slate-900">Demo Checkout Notice</div>
              <div className="mt-1">
                No payment gateway is connected. This page exists to validate UX and speed for Mike.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Container>
  );
}
