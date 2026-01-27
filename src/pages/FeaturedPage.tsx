import { useEffect } from "react";
import Container from "../components/Container";
import { FEATURED_CATEGORIES, FEATURED_PRODUCTS } from "../data/featuredProducts";
import type { TrendingCategory, TrendingProduct } from "../data/featuredProducts";

const CURATED_LIMIT = 8;

const CATEGORY_ANCHORS: Record<TrendingCategory, string> = {
  Apparels: "apparels",
  Bags: "bags",
  "Tech Products": "tech-products",
  Drinkware: "drinkware",
  "Writing Instruments": "writing-instruments",
};

const CATALOG_LINKS: Record<TrendingCategory, string> = {
  Apparels: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=apparel",
  Bags: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=bags",
  "Writing Instruments":
    "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=writing+instruments",
  "Tech Products": "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=tech",
  Drinkware: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=drinkware",
};

const getAnchorId = (category: TrendingCategory) => CATEGORY_ANCHORS[category];

const getCuratedItems = (category: TrendingCategory): TrendingProduct[] =>
  FEATURED_PRODUCTS.filter((product) => product.category === category).slice(0, CURATED_LIMIT);

export default function FeaturedPage() {
  useEffect(() => {
    const pageTitle = "Featured Picks | BC Apparel";
    const pageDescription =
      "Quick inspiration from our most-requested items for teams, schools, and events.";
    const pageUrl = `${window.location.origin}/featured`;
    const imageUrl = `${window.location.origin}/favicon.png`;

    const previousTitle = document.title;

    const ensureMeta = (selector: string, createAttrs: Record<string, string>) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      let created = false;
      if (!element) {
        element = document.createElement("meta");
        Object.entries(createAttrs).forEach(([key, value]) => {
          element?.setAttribute(key, value);
        });
        document.head.appendChild(element);
        created = true;
      }
      return { element, created };
    };

    const ensureLink = (selector: string, relValue: string) => {
      let element = document.head.querySelector<HTMLLinkElement>(selector);
      let created = false;
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", relValue);
        document.head.appendChild(element);
        created = true;
      }
      return { element, created };
    };

    const updates: Array<{
      selector: string;
      attrs: Record<string, string>;
      previous: string | null;
      created: boolean;
    }> = [];

    const applyMeta = (selector: string, createAttrs: Record<string, string>, content: string) => {
      const { element, created } = ensureMeta(selector, createAttrs);
      const previous = element?.getAttribute("content");
      element?.setAttribute("content", content);
      updates.push({ selector, attrs: createAttrs, previous, created });
    };

    document.title = pageTitle;

    applyMeta('meta[name="description"]', { name: "description" }, pageDescription);
    applyMeta('meta[property="og:title"]', { property: "og:title" }, pageTitle);
    applyMeta('meta[property="og:description"]', { property: "og:description" }, pageDescription);
    applyMeta('meta[property="og:url"]', { property: "og:url" }, pageUrl);
    applyMeta('meta[property="og:image"]', { property: "og:image" }, imageUrl);
    applyMeta('meta[name="twitter:title"]', { name: "twitter:title" }, pageTitle);
    applyMeta('meta[name="twitter:description"]', { name: "twitter:description" }, pageDescription);
    applyMeta('meta[name="twitter:image"]', { name: "twitter:image" }, imageUrl);

    const { element: canonical, created: canonicalCreated } = ensureLink(
      'link[rel="canonical"]',
      "canonical"
    );
    const previousCanonical = canonical?.getAttribute("href");
    canonical?.setAttribute("href", pageUrl);

    return () => {
      document.title = previousTitle;
      updates.forEach((update) => {
        const element = document.head.querySelector<HTMLMetaElement>(update.selector);
        if (!element) return;
        if (update.created) {
          element.remove();
        } else if (update.previous !== null) {
          element.setAttribute("content", update.previous);
        }
      });

      if (canonical) {
        if (canonicalCreated) {
          canonical.remove();
        } else if (previousCanonical) {
          canonical.setAttribute("href", previousCanonical);
        }
      }
    };
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Picks",
    itemListElement: FEATURED_PRODUCTS.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `#${getAnchorId(product.category)}`,
      image: product.imageUrl,
    })),
  };

  return (
    <section className="bg-white">
      <Container className="py-24">
        <script
          type="application/ld+json"
          // JSON-LD for featured picks
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div id="top">
          <h1 className="display-tight text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-slate-900 font-medium text-center">
            Featured Picks
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-slate-600 text-center">
            Quick inspiration from our most-requested items for teams, schools, and events.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {FEATURED_CATEGORIES.map((category) => (
            <a
              key={category}
              href={`#${getAnchorId(category)}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
            >
              {category}
            </a>
          ))}
        </div>

        <div className="mt-14">
          {FEATURED_CATEGORIES.map((category) => {
            const items = getCuratedItems(category);

            return (
              <section
                key={category}
                id={getAnchorId(category)}
                className="mt-16 scroll-mt-24"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                      {category}
                    </h2>
                  </div>
                  <a
                    href={CATALOG_LINKS[category]}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-slate-700 hover:text-slate-900 underline underline-offset-4"
                  >
                    View full catalog →
                  </a>
                </div>

                <div className="mt-8 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {items.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className="group rounded-[22px] bg-white ring-1 ring-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_18px_50px_rgba(2,6,23,0.08)]"
                    >
                      <div className="h-[180px] md:h-[220px] grid place-items-center bg-white">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="max-h-[140px] md:max-h-[170px] object-contain"
                          loading="lazy"
                          decoding="async"
                          width={320}
                          height={320}
                          fetchPriority={itemIndex === 0 ? "high" : "low"}
                        />
                      </div>
                      <div className="p-4 text-sm font-semibold text-slate-900 text-center">
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <a
          href="#top"
          className="mt-16 flex justify-center text-sm font-medium text-slate-700 hover:text-slate-900 underline underline-offset-4"
        >
          Back to top
        </a>
      </Container>
    </section>
  );
}
