import { useRef } from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import { useHeroIntro, useReveal, useGsapScope } from "../motion";
import { useLcpInstrumentation } from "../hooks/useLcpInstrumentation";
import heroImage from "../assets/hero/hero.jpeg";
import heroAvif800 from "../assets/optimized/hero/hero-800.avif";
import heroAvif1200 from "../assets/optimized/hero/hero-1200.avif";
import heroAvif1600 from "../assets/optimized/hero/hero-1600.avif";
import heroWebp800 from "../assets/optimized/hero/hero-800.webp";
import heroWebp1200 from "../assets/optimized/hero/hero-1200.webp";
import heroWebp1600 from "../assets/optimized/hero/hero-1600.webp";
import vendorBadger from "../assets/hero/vendor/badger.png";
import vendorOutdoor from "../assets/hero/vendor/outdoor.png";
import vendorRicha from "../assets/hero/vendor/richa.png";
import vendorSS from "../assets/hero/vendor/s&s.png";
import vendorSanmar from "../assets/hero/vendor/sanmar.png";
import vendorStaton from "../assets/hero/vendor/staton.png";
import catalogApparel from "../assets/hero/collection/apparelProduct.png";
import catalogBags from "../assets/hero/collection/bagsProduct.png";
import catalogDrinkware from "../assets/hero/collection/drinkwareProd.png";
import catalogTech from "../assets/hero/collection/techPro.png";
import catalogWriting from "../assets/hero/collection/writingsProd.png";
import apparelAvif400 from "../assets/optimized/collection/apparel-400.avif";
import apparelAvif800 from "../assets/optimized/collection/apparel-800.avif";
import apparelWebp400 from "../assets/optimized/collection/apparel-400.webp";
import apparelWebp800 from "../assets/optimized/collection/apparel-800.webp";
import bagsAvif400 from "../assets/optimized/collection/bags-400.avif";
import bagsAvif800 from "../assets/optimized/collection/bags-800.avif";
import bagsWebp400 from "../assets/optimized/collection/bags-400.webp";
import bagsWebp800 from "../assets/optimized/collection/bags-800.webp";
import drinkwareAvif400 from "../assets/optimized/collection/drinkWares-400.avif";
import drinkwareAvif800 from "../assets/optimized/collection/drinkWares-800.avif";
import drinkwareWebp400 from "../assets/optimized/collection/drinkWares-400.webp";
import drinkwareWebp800 from "../assets/optimized/collection/drinkWares-800.webp";
import techAvif400 from "../assets/optimized/collection/techProducts-400.avif";
import techAvif800 from "../assets/optimized/collection/techProducts-800.avif";
import techWebp400 from "../assets/optimized/collection/techProducts-400.webp";
import techWebp800 from "../assets/optimized/collection/techProducts-800.webp";
import writingAvif400 from "../assets/optimized/collection/writingInstruments-400.avif";
import writingAvif800 from "../assets/optimized/collection/writingInstruments-800.avif";
import writingWebp400 from "../assets/optimized/collection/writingInstruments-400.webp";
import writingWebp800 from "../assets/optimized/collection/writingInstruments-800.webp";
import bcCarhartt from "../assets/brochures&catalogs/bcCarhartt.jpg";
import bcGiftguide from "../assets/brochures&catalogs/bcGiftguide.jpg";
import bcNorthface from "../assets/brochures&catalogs/bcNorthface.jpg";
import bcWinterstyle from "../assets/brochures&catalogs/bcWinterstyle.jpg";
import bcCarharttAvif400 from "../assets/optimized/brochures/bcCarhartt-400.avif";
import bcCarharttAvif800 from "../assets/optimized/brochures/bcCarhartt-800.avif";
import bcCarharttWebp400 from "../assets/optimized/brochures/bcCarhartt-400.webp";
import bcCarharttWebp800 from "../assets/optimized/brochures/bcCarhartt-800.webp";
import bcGiftguideAvif400 from "../assets/optimized/brochures/bcGiftguide-400.avif";
import bcGiftguideAvif800 from "../assets/optimized/brochures/bcGiftguide-800.avif";
import bcGiftguideWebp400 from "../assets/optimized/brochures/bcGiftguide-400.webp";
import bcGiftguideWebp800 from "../assets/optimized/brochures/bcGiftguide-800.webp";
import bcNorthfaceAvif400 from "../assets/optimized/brochures/bcNorthface-400.avif";
import bcNorthfaceAvif800 from "../assets/optimized/brochures/bcNorthface-800.avif";
import bcNorthfaceWebp400 from "../assets/optimized/brochures/bcNorthface-400.webp";
import bcNorthfaceWebp800 from "../assets/optimized/brochures/bcNorthface-800.webp";
import bcWinterstyleAvif400 from "../assets/optimized/brochures/bcWinterstyle-400.avif";
import bcWinterstyleAvif800 from "../assets/optimized/brochures/bcWinterstyle-800.avif";
import bcWinterstyleWebp400 from "../assets/optimized/brochures/bcWinterstyle-400.webp";
import bcWinterstyleWebp800 from "../assets/optimized/brochures/bcWinterstyle-800.webp";
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

import { Brush, Gift, Shirt, Sticker } from "lucide-react";

const HERO_IMAGE = heroImage;

const CATALOGS: Array<{
  title: string;
  imageUrl: string;
  href: string;
  objectPosition?: string;
  alt: string;
  avif400: string;
  avif800: string;
  webp400: string;
  webp800: string;
}> = [
  {
    title: "Apparel",
    imageUrl: catalogApparel,
    href: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=apparel",
    objectPosition: "50% 20%",
    alt: "Man wearing a black polo shirt outdoors",
    avif400: apparelAvif400,
    avif800: apparelAvif800,
    webp400: apparelWebp400,
    webp800: apparelWebp800,
  },
  {
    title: "Bags",
    imageUrl: catalogBags,
    href: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=bags",
    alt: "Black tote bag with custom logo",
    avif400: bagsAvif400,
    avif800: bagsAvif800,
    webp400: bagsWebp400,
    webp800: bagsWebp800,
  },
  {
    title: "Writing instruments",
    imageUrl: catalogWriting,
    href: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=writing+instruments",
    alt: "Branded pen on a notebook",
    avif400: writingAvif400,
    avif800: writingAvif800,
    webp400: writingWebp400,
    webp800: writingWebp800,
  },
  {
    title: "Tech Products",
    imageUrl: catalogTech,
    href: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=tech",
    alt: "Phone charging on a wooden wireless charger",
    avif400: techAvif400,
    avif800: techAvif800,
    webp400: techWebp400,
    webp800: techWebp800,
  },
  {
    title: "Drinkware",
    imageUrl: catalogDrinkware,
    href: "https://bcapparel.espwebsite.com/ProductResults/?SearchTerms=drinkware",
    alt: "Person holding a branded tumbler",
    avif400: drinkwareAvif400,
    avif800: drinkwareAvif800,
    webp400: drinkwareWebp400,
    webp800: drinkwareWebp800,
  },
];

const VENDORS = [
  { name: "Staton", src: vendorStaton, widthClass: "w-28 md:w-32", width: 300, height: 93 },
  { name: "SanMar", src: vendorSanmar, widthClass: "w-28 md:w-32", width: 289, height: 70 },
  { name: "Badger Sport", src: vendorBadger, widthClass: "w-28 md:w-32", width: 400, height: 178 },
  { name: "Outdoor Cap", src: vendorOutdoor, widthClass: "w-32 md:w-36", width: 863, height: 165 },
  { name: "Richardson", src: vendorRicha, widthClass: "w-28 md:w-32", width: 442, height: 120 },
  { name: "S&S Activewear", src: vendorSS, widthClass: "w-32 md:w-36", width: 192, height: 29 },
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
};

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Browse products or services",
    description: "Artwork support to make sure your logo looks sharp in print.",
  },
  {
    step: "02",
    title: "Start your project",
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

const WHY_CHOOSE_US = [
  {
    title: "Dedicated support",
    description: "A single point of contact to keep your project clear and on track.",
  },
  {
    title: "Artwork & proofing",
    description: "We refine your logo and send proofs before production begins.",
  },
  {
    title: "Reliable delivery",
    description: "Consistent production timelines and nationwide shipping.",
  },
  {
    title: "Quality partners",
    description: "Trusted suppliers and vetted materials across every category.",
  },
];

const BRAND_LOGOS = [
  { name: "Hilton", src: brandHilton, width: 400, height: 180 },
  { name: "Team 365", src: brandTeam365, width: 228, height: 110 },
  { name: "Tie-Dye", src: brandTieDye, width: 228, height: 110 },
  { name: "Under Armour", src: brandUnderArmor, width: 228, height: 110 },
  { name: "Yupoong", src: brandYupoong, width: 228, height: 110 },
  { name: "Core 365", src: brandCore, width: 228, height: 110 },
  { name: "Chef Designs", src: brandChef, width: 400, height: 180 },
  { name: "Liberty", src: brandLiberty, width: 228, height: 110 },
  { name: "Igloo", src: brandIgloo, width: 228, height: 110 },
  { name: "Fruit of the Loom", src: brandFruit, width: 228, height: 110 },
  { name: "Socco", src: brandSocco, width: 400, height: 180 },
  { name: "Dickies", src: brandDickies, width: 228, height: 110 },
  { name: "Rawlings", src: brandRawlings, width: 400, height: 180 },
  { name: "Quickflips", src: brandQuickflips, width: 400, height: 180 },
  { name: "Jerzees", src: brandJerzees, width: 461, height: 122 },
  { name: "MV Sport", src: brandMvSport, width: 400, height: 180 },
  { name: "Columbia", src: brandColumbia, width: 228, height: 110 },
  { name: "Berne", src: brandBerne, width: 228, height: 110 },
  { name: "Lee", src: brandLee, width: 400, height: 180 },
  { name: "Bayside", src: brandBayside, width: 228, height: 110 },
  { name: "Adams", src: brandAdams, width: 228, height: 110 },
  { name: "Team", src: brandTeam, width: 228, height: 110 },
  { name: "Faribault", src: brandFaribault, width: 400, height: 180 },
  { name: "Red Kap", src: brandRedKap, width: 391, height: 247 },
  { name: "Nike", src: brandNike, width: 751, height: 751 },
  { name: "Hanes", src: brandHanes, width: 751, height: 751 },
  { name: "District", src: brandDistrict, width: 750, height: 751 },
  { name: "Carhartt", src: brandCarhartt, width: 751, height: 751 },
];

const BROCHURES = [
  {
    title: "BC Carhartt Catalog",
    imageUrl: bcCarhartt,
    avif400: bcCarharttAvif400,
    avif800: bcCarharttAvif800,
    webp400: bcCarharttWebp400,
    webp800: bcCarharttWebp800,
  },
  {
    title: "BC Northface Winter 2022",
    imageUrl: bcNorthface,
    avif400: bcNorthfaceAvif400,
    avif800: bcNorthfaceAvif800,
    webp400: bcNorthfaceWebp400,
    webp800: bcNorthfaceWebp800,
  },
  {
    title: "Gift Guide 2021",
    imageUrl: bcGiftguide,
    avif400: bcGiftguideAvif400,
    avif800: bcGiftguideAvif800,
    webp400: bcGiftguideWebp400,
    webp800: bcGiftguideWebp800,
  },
  {
    title: "BC Winter Style Guide 2022",
    imageUrl: bcWinterstyle,
    avif400: bcWinterstyleAvif400,
    avif800: bcWinterstyleAvif800,
    webp400: bcWinterstyleWebp400,
    webp800: bcWinterstyleWebp800,
  },
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

function BrochureCard({
  title,
  imageUrl,
  avif400,
  avif800,
  webp400,
  webp800,
  priority = false,
}: {
  title: string;
  imageUrl: string;
  avif400: string;
  avif800: string;
  webp400: string;
  webp800: string;
  priority?: boolean;
}) {
  return (
    <div className="reveal-on-scroll-fast group relative overflow-hidden rounded-[28px] bg-slate-100 ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(2,6,23,0.14)]">
      <div className="relative h-[260px] w-full bg-slate-100 sm:h-[300px] lg:h-[360px] aspect-[4/3]">
        <picture className="block h-full w-full">
          <source
            type="image/avif"
            srcSet={`${avif400} 400w, ${avif800} 800w`}
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          <source
            type="image/webp"
            srcSet={`${webp400} 400w, ${webp800} 800w`}
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          <img
            src={imageUrl}
            alt={title}
            width={800}
            height={600}
            style={{ aspectRatio: "800 / 600" }}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
          />
        </picture>
      </div>
      <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />

      <div className="absolute bottom-6 left-6 right-6">
        <div className="mt-2 text-lg font-semibold leading-[1.1] text-white md:text-xl">
          {title}
        </div>
      </div>
    </div>
  );
}


export default function HomePage() {
  // LCP instrumentation (dev-only)
  useLcpInstrumentation();

  const heroScopeRef = useGsapScope<HTMLDivElement>();
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  // Hero intro timeline - delayed until after first paint
  useHeroIntro({
    elements: [
      { ref: heroImageRef, delay: 0, y: 10, opacity: 0 },
      { ref: overlayRef, delay: 0, opacity: 0 },
      { ref: eyebrowRef, delay: 0, y: 10, opacity: 0 },
      { ref: headlineRef, delay: 0, y: 24, opacity: 0 },
      { ref: paragraphRef, delay: 0, y: 16, opacity: 0 },
      { ref: ctaRef, delay: 0, y: 12, opacity: 0 },
    ],
  });

  // Scroll reveals for catalog cards
  useReveal({
    elements: ".reveal-on-scroll-fast",
    y: 8,
    duration: 0.22,
    stagger: 0.04,
    start: "top 90%",
  });

  return (
    <div ref={heroScopeRef}>
      {/* HERO (adapted to match your design) */}
      <section className="bg-white">
        <Container className="py-16">
          <Card className="bg-slate-100">
            <div ref={heroImageRef} className="relative">
              <div className="relative h-[520px] w-full bg-slate-100 md:h-[620px] aspect-[2/1]">
                <picture className="block h-full w-full">
                  <source
                    type="image/avif"
                    srcSet={`${heroAvif800} 800w, ${heroAvif1200} 1200w, ${heroAvif1600} 1600w`}
                    sizes="(max-width: 768px) 100vw, 1600px"
                  />
                  <source
                    type="image/webp"
                    srcSet={`${heroWebp800} 800w, ${heroWebp1200} 1200w, ${heroWebp1600} 1600w`}
                    sizes="(max-width: 768px) 100vw, 1600px"
                  />
                  <img
                    src={HERO_IMAGE}
                    alt=""
                    width={2200}
                    height={1100}
                    className="h-full w-full object-cover"
                    style={{ aspectRatio: "2200 / 1100" }}
                    decoding="async"
                    fetchPriority="high"
                    loading="eager"
                  />
                </picture>
              </div>

              {/* Image legibility overlay (top heavier, like your screenshot) */}
              <div ref={overlayRef} className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-transparent" />
              </div>

              {/* Centered content */}
              <div className="absolute inset-0 flex items-start justify-center px-6">
                <div className="mt-14 md:mt-16 w-full max-w-3xl text-center">
                  {/* Subtle eyebrow */}
                  <div ref={eyebrowRef} className="text-[10px] uppercase tracking-[0.24em] text-white/70 mb-2">
                    Custom Branding Solutions
                  </div>

                  <h1 ref={headlineRef} className="display-tight text-white text-5xl md:text-7xl leading-[0.9] font-medium">
                    Custom Apparel & Branded Products
                  </h1>

                  <p ref={paragraphRef} className="mx-auto mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-white/90">
                    High-quality custom apparel and promotional products for teams and businesses—fast turnaround, reliable services.
                  </p>

                  <div ref={ctaRef} className="mt-7 flex items-center justify-center">
                    {/* Pill CTA like the design */}
                    <Button
                      onClick={() => {
                        const section = document.getElementById("what-we-do");
                        section?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="h-11 rounded-full bg-white px-8 text-xs uppercase tracking-[0.18em] text-slate-900 ring-1 ring-white/70 hover:bg-white/95"
                    >
                      <span className="flex items-center gap-3">
                        Browse
                        <span
                          aria-hidden="true"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[rgb(var(--navy-950))] text-white ring-1 ring-[rgb(var(--navy-950))]/20"
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
      <section className="bg-white" id="what-we-do">
        <Container className="py-20">
          <div className="reveal-on-scroll-fast relative overflow-hidden rounded-[28px] bg-white px-6 py-12 md:px-12 md:py-14">
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {VENDORS.map((vendor) => (
                <img
                  key={vendor.name}
                  src={vendor.src}
                  alt={vendor.name}
                  className={`${vendor.widthClass} h-auto object-contain`}
                  loading="lazy"
                  decoding="async"
                  width={vendor.width}
                  height={vendor.height}
                  style={{ aspectRatio: "auto" }}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

    {/* WHAT WE DO */}
    <section className="bg-white">
      <Container className="py-20">
        {/* Header */}
        <div className="reveal-on-scroll-fast text-center">
          <h2 className="text-3xl md:text-4xl tracking-[-0.01em] text-slate-900 font-medium">
            What We Do
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-600">
            We help businesses, teams, and organizations bring their brand to life.
          </p>
        </div>

        {/* Cards (true-centered last row on desktop) */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {(
            [
              { key: "screenPrinting", step: "01", icon: <Sticker className="h-5 w-5" /> },
              { key: "embroidery", step: "02", icon: <Shirt className="h-5 w-5" /> },
              { key: "customApparel", step: "03", icon: <Shirt className="h-5 w-5" /> },
              { key: "brandingDesign", step: "04", icon: <Brush className="h-5 w-5" /> },
              { key: "promoDark", step: "05", icon: <Gift className="h-5 w-5" /> },
            ] as const
          ).map(({ key, step, icon }, index) => {
            const item = SERVICES[key];

            // Desktop grid is 6 columns; each card spans 2 columns:
            // Row 1: [1-2] [3-4] [5-6]
            // Row 2 (2 items) centered: start at 2 and 4 -> equal whitespace left/right
            const centerPair =
              index === 3 ? "lg:col-start-2" : index === 4 ? "lg:col-start-4" : "";

            return (
              <div
                key={key}
                className={[
                  "reveal-on-scroll-fast",
                  "lg:col-span-2",
                  centerPair,
                  "group relative overflow-hidden",
                  "rounded-[18px] border border-slate-200 bg-white",
                  "p-7 md:p-8",
                  "text-center",
                  "transition-all duration-300",
                  "hover:-translate-y-[2px] hover:shadow-[0_18px_50px_rgba(2,6,23,0.08)]",
                ].join(" ")}
              >
                {/* top area */}
                <div className="relative flex flex-col items-center">
                  {/* icon chip */}
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] bg-slate-50 ring-1 ring-slate-200 text-slate-700">
                    {icon}
                  </div>

                  {/* huge faint number */}
                  <div className="pointer-events-none absolute right-0 top-0 select-none text-6xl font-semibold leading-none text-slate-900/[0.05]">
                    {step}
                  </div>
                </div>

                {/* content */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold tracking-[-0.01em] text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mx-auto mt-3 max-w-[36ch] text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>



      {/* COLLECTIONS */}
      <section className="bg-white">
        <Container className="py-24">
          <div className="reveal-on-scroll-fast text-center">
            <h2 className="text-3xl md:text-5xl font-semibold text-slate-800">
              Our Popular Products
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
                className="reveal-on-scroll-fast catalog-card group relative overflow-hidden rounded-[26px] bg-slate-100 text-left"
              >
                <div className="relative h-[260px] w-full bg-slate-100 md:h-[320px] aspect-[4/3]">
                <picture className="block h-full w-full">
                  <source
                    type="image/avif"
                    srcSet={`${item.avif400} 400w, ${item.avif800} 800w`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <source
                    type="image/webp"
                    srcSet={`${item.webp400} 400w, ${item.webp800} 800w`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <img
                    src={item.imageUrl}
                    alt={item.alt}
                    width={800}
                    height={600}
                    style={{
                      aspectRatio: "800 / 600",
                      objectPosition: item.objectPosition,
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                </div>
                <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div className="text-white">
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
                className="reveal-on-scroll-fast catalog-card group relative overflow-hidden rounded-[26px] bg-slate-100 text-left"
              >
                <div className="relative h-[300px] w-full bg-slate-100 md:h-[360px] aspect-[4/3]">
                <picture className="block h-full w-full">
                  <source
                    type="image/avif"
                    srcSet={`${item.avif400} 400w, ${item.avif800} 800w`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <source
                    type="image/webp"
                    srcSet={`${item.webp400} 400w, ${item.webp800} 800w`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <img
                    src={item.imageUrl}
                    alt={item.alt}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                </div>
                <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div className="text-white">
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

      {/* BROCHURES / CATALOGS */}
      <section className="bg-white">
        <Container className="py-24">
          <div className="reveal-on-scroll-fast text-center">
            <h2 className="display-tight mt-4 text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-slate-900 font-medium">
              Browse Our Catalog
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-slate-600">
              Explore seasonal brochures and brand catalogs for apparel and promotional options.
            </p>
          </div>

          {/* IMPORTANT: match your catalogs page sizing */}
          <div className="mt-14 mx-auto w-full max-w-[1500px]">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {BROCHURES.map((item, index) => (
                  <BrochureCard
                    key={item.title}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  avif400={item.avif400}
                  avif800={item.avif800}
                  webp400={item.webp400}
                  webp800={item.webp800}
                  priority={index === 0}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>


      {/* HOW IT WORKS */}
      <section className="bg-white">
        <Container className="py-24">
          <div className="reveal-on-scroll-fast text-center">
            <h2 className="text-3xl md:text-5xl font-semibold text-slate-800">
              How It Works
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item, index) => (
              <div
                key={item.step}
                className={[
                  "reveal-on-scroll-fast",
                  "group rounded-[22px] border border-slate-300 bg-white px-6 py-6 text-slate-900 transition-colors duration-300 hover:border-[rgb(var(--navy-950))] hover:bg-[rgb(var(--navy-950))] hover:text-white md:px-7 md:py-7",
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

      {/* WHY CHOOSE US */}
      <section className="bg-white">
        <Container className="py-24">
          <div className="reveal-on-scroll-fast text-center">
            <h2 className="text-3xl md:text-5xl font-semibold text-slate-800">
              Why Teams Choose Us
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base text-slate-600">
              A clear process, dependable partners, and a focus on brand consistency.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE_US.map((item) => (
              <div
                key={item.title}
                className="reveal-on-scroll-fast rounded-[22px] border border-slate-200 bg-white p-6 text-slate-900 transition-shadow duration-300 hover:shadow-[0_18px_50px_rgba(2,6,23,0.08)]"
              >
                <div className="text-base font-semibold">{item.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TRUSTED BRANDS */}
      <section className="bg-white">
        <Container className="py-24">
          <div className="reveal-on-scroll-fast text-center">
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
              <div key={row[0]?.name ?? index} className="marquee reveal-on-scroll-fast">
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
                        style={{ aspectRatio: "auto" }}
                        width={brand.width}
                        height={brand.height}
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
