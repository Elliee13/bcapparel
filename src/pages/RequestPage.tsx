import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../components/Container";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import { categories, products } from "../data/products";
import { useReveal } from "../motion";

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
  useReveal({
    elements: ".reveal-on-scroll",
    y: 12,
    duration: 0.5,
    stagger: 0.08,
    start: "top 80%",
  });

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

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [botcheck, setBotcheck] = useState(false);

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

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || status === "sending") return;
    if (botcheck) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
    if (!accessKey) {
      setError("Missing form configuration. Please try again later.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "BC Apparel - Quote Request",
          from_name: "BC Apparel Website",
          name: form.name,
          email: form.email,
          phone: form.phone,
          organization: form.organization,
          category: form.category,
          product: form.product,
          quantity: form.quantity,
          notes: form.notes,
          botcheck,
        }),
      });

      const result: { success?: boolean; message?: string } | null = await response
        .json()
        .catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Unable to submit request.");
      }

      setStatus("success");
      resetForm();
      window.setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit request.");
      setStatus("error");
    }
  }

  return (
    <div className="bg-[rgb(var(--bg))]">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="reveal-on-scroll max-w-xl">
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

          <Card className="reveal-on-scroll p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Request details
            </div>

            <form className="mt-6 space-y-4" onSubmit={submit}>
              <input
                type="checkbox"
                name="botcheck"
                checked={botcheck}
                onChange={(e) => setBotcheck(e.target.checked)}
                className="hidden"
                tabIndex={-1}
              />
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
                disabled={!isValid || status === "sending"}
              >
                {status === "sending"
                  ? "Submitting..."
                  : status === "success"
                  ? "Request received"
                  : "Submit request"}
              </Button>

              {status === "error" ? (
                <p className="text-xs text-rose-700" role="status">
                  {error}
                </p>
              ) : (
                <p className="text-xs text-slate-600">
                  We respond within 1-2 business days.
                </p>
              )}
            </form>
          </Card>
        </div>
      </Container>
    </div>
  );
}
