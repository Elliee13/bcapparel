import Container from "../components/Container";
import bcCarhartt from "../assets/brochures&catalogs/bcCarhartt.jpg";
import bcGiftguide from "../assets/brochures&catalogs/bcGiftguide.jpg";
import bcNorthface from "../assets/brochures&catalogs/bcNorthface.jpg";
import bcWinterstyle from "../assets/brochures&catalogs/bcWinterstyle.jpg";

const BROCHURES = [
  { title: "BC Carhartt Catalog", imageUrl: bcCarhartt },
  { title: "BC Northface Winter 2022", imageUrl: bcNorthface },
  { title: "Gift Guide 2021", imageUrl: bcGiftguide },
  { title: "BC Winter Style Guide 2022", imageUrl: bcWinterstyle },
];

function BrochureCard({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] bg-slate-100 ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(2,6,23,0.14)]">
      <img
        src={imageUrl}
        alt={title}
        className="h-[260px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:h-[300px] lg:h-[360px]"
        loading="lazy"
        decoding="async"
      />

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
  return (
    <div className="bg-white">
      <section className="bg-white">
        <Container className="py-24">
          <div className="text-center">
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
              {BROCHURES.map((item) => (
                <BrochureCard
                  key={item.title}
                  title={item.title}
                  imageUrl={item.imageUrl}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
