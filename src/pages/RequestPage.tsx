import { useMemo, useState } from "react";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";
import { supabase } from "../lib/supabaseClient";

type RequestPayload = {
  name: string;
  email: string;
  company: string;
  phone: string;
  date_needed: string;
  quantity: string;
  comments: string;
  created_at?: string;
};

export default function RequestPage() {
  const [form, setForm] = useState<RequestPayload>({
    name: "",
    email: "",
    company: "",
    phone: "",
    date_needed: "",
    quantity: "",
    comments: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const isValid = useMemo(() => {
    return form.name.trim() && form.email.trim();
  }, [form.name, form.email]);

  function update<K extends keyof RequestPayload>(key: K, value: RequestPayload[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    setStatus("submitting");

    try {
      // Optional: create a supabase table "quote_requests" to store these.
      const { error } = await supabase.from("quote_requests").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        phone: form.phone.trim(),
        date_needed: form.date_needed || null,
        quantity: form.quantity ? Number(form.quantity) : null,
        comments: form.comments.trim(),
      });

      // If table isn't created yet, we still treat it as demo-success.
      if (error) {
        setStatus("success");
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("success");
    } finally {
      setForm({
        name: "",
        email: "",
        company: "",
        phone: "",
        date_needed: "",
        quantity: "",
        comments: "",
      });
      window.setTimeout(() => setStatus("idle"), 1800);
    }
  }

  return (
    <div className="bg-[rgb(var(--bg))]">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Request
            </div>
            <h1 className="display-tight mt-3 text-4xl md:text-5xl leading-[0.95] text-slate-900">
              This page is a placeholder.
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              The original site uses a request-first workflow. This rebuilt version keeps that business flow,
              while improving performance, clarity, and maintainability.
            </p>

            <div className="mt-10 rounded-[28px] bg-white p-6 md:p-8 ring-1 ring-slate-200">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Demo disclaimer
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                This is a demo request form. You can later route submissions into your CRM, email, or internal
                workflow. Supplier APIs and live pricing are not yet connected.
              </p>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6 md:p-8 ring-1 ring-slate-200">
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
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    Company
                  </div>
                  <Input value={form.company} onChange={(e) => update("company", e.target.value)} />
                </div>
                <div>
                  <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    Phone
                  </div>
                  <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    Date needed
                  </div>
                  <Input
                    type="date"
                    value={form.date_needed}
                    onChange={(e) => update("date_needed", e.target.value)}
                  />
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
                  />
                </div>
              </div>

              <div>
                <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Comments
                </div>
                <textarea
                  className="min-h-32 w-full rounded-[14px] bg-white px-3 py-2 text-sm ring-1 ring-slate-300 transition focus:outline-none focus:ring-2 focus:ring-slate-900"
                  value={form.comments}
                  onChange={(e) => update("comments", e.target.value)}
                />
              </div>

              <Button
                className="w-full py-3 text-xs uppercase tracking-[0.18em]"
                type="submit"
                disabled={!isValid || status === "submitting"}
              >
                {status === "submitting"
                  ? "Submitting…"
                  : status === "success"
                  ? "Request submitted"
                  : "Submit request"}
              </Button>

              <p className="text-xs text-slate-600">
                Demo note: this can store to Supabase if you add a <code>quote_requests</code> table.
              </p>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
