import Container from "../components/Container";

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

export default function AboutPage() {
  return (
    <div className="bg-[rgb(var(--bg))]">
      <Container className="py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
            About
          </div>

          <h1 className="display-tight mt-4 text-4xl md:text-5xl leading-[0.95] text-slate-900">
            Built for modern apparel sourcing
          </h1>

          <p className="mt-6 text-sm leading-relaxed text-slate-600">
            BC Apparel curates premium blanks and supplier-ready goods for teams,
            events, and organizations. This experience is designed as a series of
            landing pages and browse flows with direct supplier links and a focused
            quote request path.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card className="p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              How it works
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Browse curated categories, open supplier detail pages, and submit a
              request for a tailored quote. No checkout, no cart, just a clean
              path to sourcing.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Why this model
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              It keeps the focus on comparison and decision-making while leaving
              pricing, decoration, and fulfillment to the quote workflow.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Built to scale
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Supplier APIs and real-time availability can be layered in when
              needed, without redesigning the browsing experience.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Brand-first design
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              High-end layouts, editorial typography, and plenty of whitespace
              keep the focus on the product story and request flow.
            </p>
          </Card>
        </div>
      </Container>
    </div>
  );
}
