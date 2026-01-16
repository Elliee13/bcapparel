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
          {/* Eyebrow */}
          <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
            About
          </div>

          {/* Headline — aligned with Home */}
          <h1 className="display-tight mt-4 text-4xl md:text-5xl leading-[0.95] text-slate-900">
            BC Apparel
          </h1>

          {/* Intro copy */}
          <p className="mt-6 text-sm leading-relaxed text-slate-600">
            BC Apparel provides promotional apparel and branded merchandise for teams,
            events, and organizations. This demo rebuild focuses on speed, clarity, and a
            clean architecture—so supplier APIs can be integrated later without rewriting
            the storefront UI.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card className="p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Why rebuild
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              The goal is a modern experience that loads fast, searches smoothly, and
              remains maintainable. This demo establishes a strong baseline before
              connecting live supplier catalogs.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              What’s next
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Supplier API integrations, richer product data, quote workflows, and
              account-based purchasing—only added if and when the business requires it.
            </p>
          </Card>
        </div>
      </Container>
    </div>
  );
}
