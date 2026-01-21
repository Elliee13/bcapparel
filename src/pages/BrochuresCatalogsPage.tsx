import Container from "../components/Container";
import { useReveal } from "../motion";
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
    <div className="reveal-on-scroll group relative overflow-hidden rounded-[28px] bg-slate-100 ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(2,6,23,0.14)]">
      <div className="relative h-[260px] w-full bg-slate-100 sm:h-[300px] lg:h-[360px] aspect-[4/3]">
        <picture className="block h-full w-full">
          <source
            type="image/avif"
            srcSet={`${avif400} 400w, ${avif800} 800w`}
            sizes="(max-width: 640px) 100vw, 25vw"
          />
          <source
            type="image/webp"
            srcSet={`${webp400} 400w, ${webp800} 800w`}
            sizes="(max-width: 640px) 100vw, 25vw"
          />
          <img
            src={imageUrl}
            alt={title}
            width={800}
            height={600}
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

export default function BrochuresCatalogsPage() {
  useReveal({
    elements: ".reveal-on-scroll",
    y: 12,
    duration: 0.5,
    stagger: 0.08,
    start: "top 80%",
  });

  return (
    <div className="bg-white">
      <section className="bg-white">
        <Container className="py-24">
          <div className="reveal-on-scroll text-center">
            <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
              Brochures / Catalogs
            </div>

            <h1 className="display-tight mt-4 text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-slate-900 font-medium">
              Browse Our Catalog
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-slate-600">
              Explore seasonal brochures and brand catalogs for apparel and
              promotional options.
            </p>
          </div>

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
    </div>
  );
}
