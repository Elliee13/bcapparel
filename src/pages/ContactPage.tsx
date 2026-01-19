import { useState } from "react";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";

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

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 1500);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="bg-[rgb(var(--bg))]">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Contact
            </div>

            <h1 className="display-tight mt-4 text-4xl md:text-5xl leading-[0.95] text-slate-900">
              Let us know what you need
            </h1>

            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              Share your timeline, quantities, and branding goals. We will follow
              up with supplier options and a tailored quote.
            </p>

            <Card className="mt-10 p-6 md:p-8">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Office
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Email: sales@bcapparel.com <span className="text-slate-400">(demo)</span>
                <br />
                Phone: (000) 000-0000 <span className="text-slate-400">(demo)</span>
              </p>
            </Card>
          </div>

          <Card className="p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Message
            </div>

            <form className="mt-6 space-y-5" onSubmit={submit}>
              <div>
                <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Name
                </div>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="rounded-[14px]"
                />
              </div>

              <div>
                <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Email
                </div>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  className="rounded-[14px]"
                />
              </div>

              <div>
                <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Message
                </div>
                <textarea
                  className="min-h-32 w-full rounded-[14px] bg-white px-3 py-2 text-sm ring-1 ring-slate-300 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <Button
                className="w-full rounded-full py-3 text-xs uppercase tracking-[0.18em]"
                type="submit"
              >
                {sent ? "Sent" : "Send message"}
              </Button>

              <p className="text-xs text-slate-600">
                Demo note: This form is not connected to email yet.
              </p>
            </form>
          </Card>
        </div>
      </Container>
    </div>
  );
}
