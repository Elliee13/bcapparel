import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";
import CategoryCard from "../components/CategoryCard";
import heroImage from "../assets/hero/hero.jpeg";
import vendorBadger from "../assets/hero/vendor/badger.png";
import vendorOutdoor from "../assets/hero/vendor/outdoor.png";
import vendorRicha from "../assets/hero/vendor/richa.png";
import vendorSS from "../assets/hero/vendor/s&s.png";
import vendorSanmar from "../assets/hero/vendor/sanmar.png";
import vendorStaton from "../assets/hero/vendor/staton.png";
import catalogApparel from "../assets/hero/collection/apparel.jpg";
import catalogBags from "../assets/hero/collection/bags.jpg";
import catalogDrinkware from "../assets/hero/collection/drinkWares.jpg";
import catalogTech from "../assets/hero/collection/techProducts.jpg";
import catalogWriting from "../assets/hero/collection/writingInstruments.jpg";
import brandAdams from "../assets/hero/brands/adams.png";
import brandBayside from "../assets/hero/brands/bayside.png";
import brandBerne from "../assets/hero/brands/berne.png";
import brandCarhartt from "../assets/hero/brands/carhartt.jpg";
import brandChef from "../assets/hero/brands/chef.png";
import brandColumbia from "../assets/hero/brands/columbia.png";
import brandCore from "../assets/hero/brands/core.png";
import brandDickies from "../assets/hero/brands/dickies.png";
import brandDistrict from "../assets/hero/brands/district.jpg";
import brandFaribault from "../assets/hero/brands/faribault.png";
import brandFruit from "../assets/hero/brands/fruit.png";
import brandHanes from "../assets/hero/brands/hanes.jpg";
import brandHilton from "../assets/hero/brands/hilton.png";
import brandIgloo from "../assets/hero/brands/igloo.png";
import brandJerzees from "../assets/hero/brands/jerzees.png";
import brandLee from "../assets/hero/brands/lee.png";
import brandLiberty from "../assets/hero/brands/liberty.png";
import brandMvSport from "../assets/hero/brands/mvsport.png";
import brandNike from "../assets/hero/brands/nike.jpg";
import brandQuickflips from "../assets/hero/brands/quickflips.png";
import brandRawlings from "../assets/hero/brands/rawlings.png";
import brandRedKap from "../assets/hero/brands/redkap.png";
import brandSocco from "../assets/hero/brands/socco.png";
import brandTeam from "../assets/hero/brands/team.png";
import brandTeam365 from "../assets/hero/brands/team365.png";
import brandTieDye from "../assets/hero/brands/Tie-Dye.png";
import brandUnderArmor from "../assets/hero/brands/underArmor.png";
import brandYupoong from "../assets/hero/brands/yupoong.png";

const HERO_IMAGE = heroImage;

const CATALOGS: Array<{ title: string; imageUrl: string; href: string }> = [
  {
    title: "Apparel",
    imageUrl: catalogApparel,
    href: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=apparel",
  },
  {
    title: "Bags",
    imageUrl: catalogBags,
    href: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=bags",
  },
  {
    title: "Writing instruments",
    imageUrl: catalogWriting,
    href: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=writing+instruments",
  },
  {
    title: "Tech Products",
    imageUrl: catalogTech,
    href: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=tech",
  },
  {
    title: "Drinkware",
    imageUrl: catalogDrinkware,
    href: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=drinkware",
  },
];

const VENDORS = [
  { name: "Staton", src: vendorStaton, widthClass: "w-28 md:w-32" },
  { name: "SanMar", src: vendorSanmar, widthClass: "w-28 md:w-32" },
  { name: "Badger Sport", src: vendorBadger, widthClass: "w-28 md:w-32" },
  { name: "Outdoor Cap", src: vendorOutdoor, widthClass: "w-32 md:w-36" },
  { name: "Richardson", src: vendorRicha, widthClass: "w-28 md:w-32" },
  { name: "S&S Activewear", src: vendorSS, widthClass: "w-32 md:w-36" },
];

const SERVICES = {
  screenPrinting: {
    title: "Screen Printing",
    description: "Bold, durable prints for large runs with consistent color and coverage.",
    tone: "light",
  },
  customApparel: {
    title: "Custom Apparel",
    description: "Bold, durable prints for large runs with consistent color and coverage.",
    tone: "dark",
  },
  embroidery: {
    title: "Embroidery",
    description: "Premium stitched logos that elevate polos, hats, and outerwear.",
    tone: "dark",
  },
  brandingDesign: {
    title: "Branding & Design",
    description: "Artwork support to make sure your logo looks sharp in print.",
    tone: "light",
  },
  promoDark: {
    title: "Promotional Products",
    description: "Branded giveaways and event items tailored to your audience.",
    tone: "dark",
  },
  promoLight: {
    title: "Promotional Products",
    description: "Branded giveaways and event items tailored to your audience.",
    tone: "light",
  },
};

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Browse products or services",
    description: "Artwork support to make sure your logo looks sharp in print.",
  },
  {
    step: "02",
    title: "Request a quote",
    description: "Share sizes, quantities, and timelines.",
  },
  {
    step: "03",
    title: "We confirm details and pricing",
    description: "Artwork support to make sure your logo looks sharp in print.",
  },
  {
    step: "04",
    title: "Production & delivery",
    description: "Reliable production and on-time delivery.",
  },
];

const BRAND_LOGOS = [
  { name: "Hilton", src: brandHilton },
  { name: "Team 365", src: brandTeam365 },
  { name: "Tie-Dye", src: brandTieDye },
  { name: "Under Armour", src: brandUnderArmor },
  { name: "Yupoong", src: brandYupoong },
  { name: "Core 365", src: brandCore },
  { name: "Chef Designs", src: brandChef },
  { name: "Liberty", src: brandLiberty },
  { name: "Igloo", src: brandIgloo },
  { name: "Fruit of the Loom", src: brandFruit },
  { name: "Socco", src: brandSocco },
  { name: "Dickies", src: brandDickies },
  { name: "Rawlings", src: brandRawlings },
  { name: "Quickflips", src: brandQuickflips },
  { name: "Jerzees", src: brandJerzees },
  { name: "MV Sport", src: brandMvSport },
  { name: "Columbia", src: brandColumbia },
  { name: "Berne", src: brandBerne },
  { name: "Lee", src: brandLee },
  { name: "Bayside", src: brandBayside },
  { name: "Adams", src: brandAdams },
  { name: "Team", src: brandTeam },
  { name: "Faribault", src: brandFaribault },
  { name: "Red Kap", src: brandRedKap },
  { name: "Nike", src: brandNike },
  { name: "Hanes", src: brandHanes },
  { name: "District", src: brandDistrict },
  { name: "Carhartt", src: brandCarhartt },
];
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
        "rounded-[28px] bg-white ring-1 ring-slate-200 overflow-hidden",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}


export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO (adapted to match your design) */}
      <section className="bg-white">
        <Container className="py-12">
          <Card className="bg-slate-100">
            <div className="relative">
              <img
                src={HERO_IMAGE}
                alt=""
                className="h-[520px] w-full object-cover md:h-[620px]"
                decoding="async"
              />

              {/* Image legibility overlay (top heavier, like your screenshot) */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-transparent" />
              </div>

              {/* Centered content */}
              <div className="absolute inset-0 flex items-start justify-center px-6">
                <div className="mt-14 md:mt-16 w-full max-w-3xl text-center">
                  <h1 className="display-tight text-white text-5xl md:text-7xl leading-[0.9] font-medium">
                    Custom Apparel & Branded Products
                  </h1>

                  <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-white/90">
                    High-quality custom apparel and promotional products for teams and businesses—fast turnaround, reliable services.
                  </p>

                  <div className="mt-7 flex items-center justify-center">
                    {/* Pill CTA like the design */}
                    <Button
                      onClick={() => navigate("/products")}
                      className="h-11 rounded-full bg-white px-8 text-xs uppercase tracking-[0.18em] text-slate-900 ring-1 ring-white/70 hover:bg-white/95"
                    >
                      <span className="flex items-center gap-3">
                        Browse
                        <span
                          aria-hidden="true"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white ring-1 ring-slate-900/20"
                        >
                          →
                        </span>
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* subtle bottom fade to mimic the screenshot’s clean edge */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </Card>
        </Container>
      </section>

      {/* VENDORS */}
      <section className="bg-white">
        <Container className="py-16">
          <div className="relative overflow-hidden rounded-[28px] bg-white px-6 py-12 md:px-12 md:py-14">
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {VENDORS.map((vendor) => (
                <img
                  key={vendor.name}
                  src={vendor.src}
                  alt={vendor.name}
                  className={`${vendor.widthClass} h-auto object-contain`}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* WHAT WE DO */}
      <section className="bg-white">
        <Container className="py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.6fr_1fr] lg:items-start">
            <div className="grid gap-6">
              {[SERVICES.screenPrinting, SERVICES.customApparel, SERVICES.brandingDesign].map(
                (item) => (
                  <div
                    key={item.title}
                    className="group rounded-[22px] border border-slate-300 bg-white px-6 py-6 text-slate-900 transition-colors duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white md:px-7 md:py-7"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg md:text-xl font-semibold">{item.title}</h3>
                      <span
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-400 text-sm text-slate-900 transition-colors duration-300 group-hover:border-white/70 group-hover:text-white"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                    <p
                      className="mt-4 text-sm leading-relaxed text-slate-700 transition-colors duration-300 group-hover:text-white/85"
                    >
                      {item.description}
                    </p>
                  </div>
                )
              )}
            </div>

            <div className="text-center lg:pt-4">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-800">
                What We Do
              </h2>
              <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
                We help businesses, teams, and organizations bring their brand to life.
              </p>
            </div>

            <div className="grid gap-6">
              {[SERVICES.embroidery, SERVICES.promoDark, SERVICES.promoLight].map((item) => (
                <div
                  key={`${item.title}-${item.tone}`}
                  className="group rounded-[22px] border border-slate-300 bg-white px-6 py-6 text-slate-900 transition-colors duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white md:px-7 md:py-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg md:text-xl font-semibold">{item.title}</h3>
                    <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-400 text-sm text-slate-900 transition-colors duration-300 group-hover:border-white/70 group-hover:text-white"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                  <p
                  className="mt-4 text-sm leading-relaxed text-slate-700 transition-colors duration-300 group-hover:text-white/85"
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* COLLECTIONS */}
      <section className="bg-white">
        <Container className="py-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-semibold text-slate-800">
              Our Popular Catalogs
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-slate-600">
              Explore some of the most requested apparel and product options our customers
              love.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {CATALOGS.slice(0, 3).map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-[26px] bg-slate-100 text-left"
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
                      Catalog
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
            {CATALOGS.slice(3).map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-[26px] bg-slate-100 text-left"
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
                      Catalog
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

      {/* HOW IT WORKS */}
      <section className="bg-white">
        <Container className="py-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-semibold text-slate-800">
              How It Works
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item, index) => (
              <div
                key={item.step}
                className={[
                  "group rounded-[22px] border border-slate-300 bg-white px-6 py-6 text-slate-900 transition-colors duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white md:px-7 md:py-7",
                  index % 2 === 1 ? "lg:translate-y-6" : "lg:translate-y-0",
                ].join(" ")}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-semibold">{item.step}</div>
                  <div>
                    <h3 className="text-base font-semibold leading-snug">{item.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-700 transition-colors duration-300 group-hover:text-white/85">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TRUSTED BRANDS */}
      <section className="bg-white">
        <Container className="py-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-semibold text-slate-800">
              Trusted by our brands
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base text-slate-600">
              Brands trust BC Apparel for consistent quality and dependable service.
            </p>
          </div>

          <div className="mt-10 grid gap-8">
            {[
              BRAND_LOGOS.slice(0, Math.ceil(BRAND_LOGOS.length / 2)),
              BRAND_LOGOS.slice(Math.ceil(BRAND_LOGOS.length / 2)),
            ].map((row, index) => (
              <div key={row[0]?.name ?? index} className="marquee">
                <div className="marquee-fade marquee-fade-left" aria-hidden="true" />
                <div className="marquee-fade marquee-fade-right" aria-hidden="true" />
                <div
                  className={[
                    "marquee-track",
                    index % 2 === 1 ? "marquee-track-right" : "",
                  ].join(" ")}
                >
                  {[...row, ...row].map((brand, itemIndex) => (
                    <div
                      key={`${brand.name}-${itemIndex}`}
                      className="flex items-center justify-center"
                    >
                      <img
                        src={brand.src}
                        alt={brand.name}
                        className="h-10 md:h-12 w-auto object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

    </div>
  );
}
