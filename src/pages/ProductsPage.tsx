import Container from "../components/Container";
import { useReveal } from "../motion";
import catalogApparel from "../assets/hero/collection/apparel.jpg";
import catalogBags from "../assets/hero/collection/bags.jpg";
import catalogDrinkware from "../assets/hero/collection/drinkWares.jpg";
import catalogTech from "../assets/hero/collection/techProducts.jpg";
import catalogWriting from "../assets/hero/collection/writingInstruments.jpg";

const PRODUCTS: Array<{ title: string; href: string; imageUrl: string }> = [
  {
    title: "Apparel",
    href: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=apparel",
    imageUrl: catalogApparel,
  },
  {
    title: "Bags",
    href: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=bags",
    imageUrl: catalogBags,
  },
  {
    title: "Writing instruments",
    href: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=writing+instruments",
    imageUrl: catalogWriting,
  },
  {
    title: "Tech Products",
    href: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=tech",
    imageUrl: catalogTech,
  },
  {
    title: "Drinkware",
    href: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=drinkware",
    imageUrl: catalogDrinkware,
  },
];

export default function ProductsPage() {
  // Scroll reveal for catalog cards
  useReveal({
    elements: ".product-card",
    stagger: 0.1,
    start: "top 85%",
  });

  return (
    <div className="bg-white">
      <section className="bg-white">
        <Container className="py-24">
          <div className="text-center">
            <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
              Products
            </div>
            <h1 className="display-tight mt-4 text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-slate-900 font-medium">
              Explore Our Products
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-slate-600">
              Browse curated product categories from trusted suppliers. Click a product
              group to view the full collection and request a quote.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PRODUCTS.slice(0, 3).map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="product-card group relative overflow-hidden rounded-[26px] bg-slate-100 text-left"
              >
                <img
                  src={item.imageUrl}
                  alt=""
                  className="h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:h-[320px]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div className="text-white">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/80">
                      Products
                    </div>
                    <div className="display mt-2 text-2xl leading-[1.05]">
                      {item.title}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Click to view
                    </span>
                    <span className="rounded-full bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-900 ring-1 ring-white/70">
                      View
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {PRODUCTS.slice(3).map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="product-card group relative overflow-hidden rounded-[26px] bg-slate-100 text-left"
              >
                <img
                  src={item.imageUrl}
                  alt=""
                  className="h-[300px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:h-[360px]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div className="text-white">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/80">
                      Products
                    </div>
                    <div className="display mt-2 text-2xl leading-[1.05]">
                      {item.title}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Click to view
                    </span>
                    <span className="rounded-full bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-900 ring-1 ring-white/70">
                      View
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
