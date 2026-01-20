import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../components/Container";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import { categories, products } from "../data/products";

type RequestForm = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  category: string;
  product: string;
  quantity: string;
  notes: string;
};

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-[28px] bg-white ring-1 ring-slate-200",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function RequestPage() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product") ?? "";
  const matchedProduct = products.find((product) => product.id === productId);
  const prefilledProduct = matchedProduct ? matchedProduct.title : productId;

  const [form, setForm] = useState<RequestForm>(() => ({
    name: "",
    email: "",
    phone: "",
    organization: "",
    category: "",
    product: prefilledProduct,
    quantity: "",
    notes: "",
  }));

  const [status, setStatus] = useState<"idle" | "success">("idle");

  useEffect(() => {
    if (!productId || form.product) return;
    const nextProduct = matchedProduct ? matchedProduct.title : productId;
    setForm((prev) => ({ ...prev, product: nextProduct }));
  }, [productId, matchedProduct, form.product]);

  const isValid = useMemo(() => {
    return form.name.trim().length > 0 && form.email.trim().length > 0;
  }, [form.name, form.email]);

  function update<K extends keyof RequestForm>(key: K, value: RequestForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function resetForm() {
    setForm({
      name: "",
      email: "",
      phone: "",
      organization: "",
      category: "",
      product: prefilledProduct,
      quantity: "",
      notes: "",
    });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    setStatus("success");
    resetForm();
    window.setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <div className="bg-[rgb(var(--bg))]">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Request Quote
            </div>
            <h1 className="display-tight mt-3 text-4xl md:text-5xl leading-[0.95] text-slate-900">
              Tell us what you need
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              Share your quantity, category, and timeline. We will respond with
              supplier options and a tailored quote.
            </p>

            <Card className="mt-10 p-6 md:p-8">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                What happens next
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                This is a demo request form. Submissions are not stored, but the
                workflow mirrors a real quote intake experience.
              </p>
            </Card>
          </div>

          <Card className="p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Request details
            </div>

            <form className="mt-6 space-y-4" onSubmit={submit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    Name *
                  </div>
                  <Input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                    className="rounded-[14px]"
                  />
                </div>
                <div>
                  <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    Email *
                  </div>
                  <Input
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                    type="email"
                    className="rounded-[14px]"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    Phone
                  </div>
                  <Input
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="rounded-[14px]"
                  />
                </div>
                <div>
                  <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    Organization
                  </div>
                  <Input
                    value={form.organization}
                    onChange={(e) => update("organization", e.target.value)}
                    className="rounded-[14px]"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    Category
                  </div>
                  <Select
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                    className="rounded-[14px]"
                  >
                    <option value="">Optional</option>
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    Product
                  </div>
                  <Input
                    value={form.product}
                    onChange={(e) => update("product", e.target.value)}
                    placeholder="Optional product name or ID"
                    className="rounded-[14px]"
                  />
                </div>
              </div>

              <div>
                <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Quantity
                </div>
                <Input
                  inputMode="numeric"
                  placeholder="e.g., 100"
                  value={form.quantity}
                  onChange={(e) => update("quantity", e.target.value)}
                  className="rounded-[14px]"
                />
              </div>

              <div>
                <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Notes
                </div>
                <textarea
                  className="min-h-32 w-full rounded-[14px] bg-white px-3 py-2 text-sm ring-1 ring-slate-300 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--navy-800))]"
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </div>

              <Button
                className="w-full py-3 text-xs uppercase tracking-[0.18em]"
                type="submit"
                disabled={!isValid}
              >
                {status === "success" ? "Request received (demo)" : "Submit request"}
              </Button>

              <p className="text-xs text-slate-600">
                Demo note: no data is stored or sent from this form.
              </p>
            </form>
          </Card>
        </div>
      </Container>
    </div>
  );
}
