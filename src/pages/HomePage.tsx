import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/Skeleton";
import { fetchFeaturedProducts, type HomeFeaturedProduct } from "../lib/homeApi";

const HERO_IMAGE = "https://picsum.photos/seed/bcapparel-hero/2200/1100";

const COLLECTIONS: Array<{
  tag?: string;
  title: string;
  category: string;
  imageUrl: string;
}> = [
  { tag: "Best Seller", title: "Jackets", category: "Jackets", imageUrl: "https://picsum.photos/seed/bcapparel-jackets/1400/900" },
  { tag: "Premium", title: "Hoodies", category: "Hoodies", imageUrl: "https://picsum.photos/seed/bcapparel-hoodies/1400/900" },
  { tag: "New", title: "Caps", category: "Caps", imageUrl: "https://picsum.photos/seed/bcapparel-caps/1400/900" },
  { title: "Polos", category: "Polos", imageUrl: "https://picsum.photos/seed/bcapparel-polos/1400/900" },
  { title: "T-Shirts", category: "T-Shirts", imageUrl: "https://picsum.photos/seed/bcapparel-tshirts/1400/900" },
];

type PriceBand = "all" | "0-25" | "25-50" | "50-100" | "100+";

function priceBandToParams(band: PriceBand): { min?: string; max?: string } {
  if (band === "0-25") return { min: "0", max: "25" };
  if (band === "25-50") return { min: "25", max: "50" };
  if (band === "50-100") return { min: "50", max: "100" };
  if (band === "100+") return { min: "100" };
  return {};
}

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

function SectionHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{eyebrow}</div>
        {/* UPDATED: use display font like LETS TALK */}
        <h2 className="display mt-3 text-3xl leading-[1.05] text-slate-800 font-bold">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

type RoomKey = "Teams" | "Events" | "Corporate" | "School" | "Outdoor";
const ROOMS: Array<{ key: RoomKey; title: string; subtitle: string }> = [
  { key: "Teams", title: "Teams", subtitle: "Uniforms, staff, clubs" },
  { key: "Events", title: "Events", subtitle: "Giveaways, activations" },
  { key: "Corporate", title: "Corporate", subtitle: "Polos, jackets, kits" },
  { key: "School", title: "School", subtitle: "Org shirts, merch" },
  { key: "Outdoor", title: "Outdoor", subtitle: "Caps, outerwear" },
];

function ServiceIcons() {
  const items = [
    { title: "Made to Order", desc: "Decoration-ready workflows." },
    { title: "Fast Turnaround", desc: "Built for quick quoting." },
    { title: "Easy Exchange", desc: "Simple sizing adjustments." },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {items.map((i) => (
        <Card key={i.title} className="p-7">
          <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{i.title}</div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{i.desc}</p>
        </Card>
      ))}
    </div>
  );
}

function TestimonialRow() {
  const items = [
    { name: "Jordan M.", role: "Operations", quote: "Fast browsing and clean filtering. Feels premium and practical." },
    { name: "Carmen R.", role: "Marketing", quote: "The new layout makes products easier to compare and request." },
    { name: "Dylan S.", role: "Purchasing", quote: "Cart → request flow is clear. No clutter." },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {items.map((t) => (
        <Card key={t.name} className="p-7">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-slate-200" aria-hidden="true" />
            <div>
              <div className="text-sm font-semibold text-slate-800">{t.name}</div>
              <div className="text-xs text-slate-600">{t.role}</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">“{t.quote}”</p>
        </Card>
      ))}
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  // Hero search (A)
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [priceBand, setPriceBand] = useState<PriceBand>("all");

  const catalogQuery = useMemo(() => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (category) params.set("category", category);

    const { min, max } = priceBandToParams(priceBand);
    if (min) params.set("min", min);
    if (max) params.set("max", max);

    const s = params.toString();
    return s ? `/catalog?${s}` : "/catalog";
  }, [q, category, priceBand]);

  function goSearch() {
    navigate(catalogQuery);
  }

  function goCollection(cat: string) {
    const params = new URLSearchParams();
    params.set("category", cat);
    navigate(`/catalog?${params.toString()}`);
  }

  // Featured products
  const [featured, setFeatured] = useState<HomeFeaturedProduct[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoadingFeatured(true);
      try {
        const items = await fetchFeaturedProducts(9);
        if (!alive) return;
        setFeatured(items);
      } catch {
        if (!alive) return;
        setFeatured([]);
      } finally {
        if (alive) setLoadingFeatured(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const [openRoom, setOpenRoom] = useState<RoomKey>("Teams");

  return (
    <div>
      {/* HERO */}
      <section className="bg-[rgb(var(--bg))]">
        <Container className="py-8">
          <Card className="bg-slate-100">
            <div className="relative">
              <img
                src={HERO_IMAGE}
                alt=""
                className="h-[520px] w-full object-cover md:h-[620px]"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/15" />

              <div className="absolute left-6 top-10 md:left-10 md:top-12">
                <h1 className="display-tight text-white text-5xl md:text-7xl leading-[0.9] font-bold">
                  APPAREL FOR TEAMS
                </h1>
              </div>

              <div className="absolute left-4 right-4 bottom-5 md:left-10 md:right-10 md:bottom-8">
                <div className="rounded-[22px] bg-white p-4 md:p-5 ring-1 ring-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.14)]">
                  <div className="grid gap-3 md:grid-cols-[1.2fr_0.9fr_0.8fr_auto] md:gap-4">
                    <div>
                      <div className="mb-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        Search
                      </div>
                      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." />
                    </div>

                    <div>
                      <div className="mb-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        Category
                      </div>
                      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All</option>
                        <option value="T-Shirts">T-Shirts</option>
                        <option value="Hoodies">Hoodies</option>
                        <option value="Caps">Caps</option>
                        <option value="Polos">Polos</option>
                        <option value="Jackets">Jackets</option>
                      </Select>
                    </div>

                    <div>
                      <div className="mb-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        Price
                      </div>
                      <Select value={priceBand} onChange={(e) => setPriceBand(e.target.value as PriceBand)}>
                        <option value="all">All</option>
                        <option value="0-25">$0 – $25</option>
                        <option value="25-50">$25 – $50</option>
                        <option value="50-100">$50 – $100</option>
                        <option value="100+">$100+</option>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <Button onClick={goSearch} className="h-11 w-full px-8 text-xs uppercase tracking-[0.18em] rounded-md">
                        Search
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-slate-500">
                    Demo note: sample catalog (no supplier APIs yet).
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* COLLECTIONS */}
      <section className="bg-[rgb(var(--bg))]">
        <Container className="py-14">
          <div className="flex items-start justify-between gap-6">
            <div>
              {/* UPDATED: display font like LETS TALK */}
              <h2 className="display text-4xl leading-[1.0] text-slate-800 font-semibold">
                OUR COLLECTIONS
              </h2>
              <div className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-600">
                Shop by category
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={() => navigate("/catalog")}
              className="mt-1 rounded-full px-6 py-3 text-xs uppercase tracking-[0.18em]"
            >
              View all
            </Button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {COLLECTIONS.slice(0, 3).map((c) => (
              <CategoryCard
                key={c.title}
                tag={c.tag}
                title={c.title}
                imageUrl={c.imageUrl}
                onClick={() => goCollection(c.category)}
              />
            ))}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {COLLECTIONS.slice(3, 5).map((c) => (
              <CategoryCard
                key={c.title}
                tag={c.tag}
                title={c.title}
                imageUrl={c.imageUrl}
                onClick={() => goCollection(c.category)}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* QUALITY */}
      <section className="bg-[rgb(var(--bg))]">
        <Container className="py-16">
          <SectionHeader eyebrow="Quality" title="Built for decoration and durability." />

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <Card className="p-8 bg-white">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Quality</div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Minimal copy, strong visuals. This rebuild stays focused on browsing speed and clean selection.
              </p>
              <div className="mt-6">
                <Button
                  onClick={() => navigate("/catalog")}
                  className="rounded-full px-6 py-3 text-xs uppercase tracking-[0.18em]"
                >
                  Browse catalog
                </Button>
              </div>
            </Card>

            <Card className="bg-slate-100">
              <div className="relative h-full">
                <img
                  src="https://picsum.photos/seed/bcapparel-quality/1600/1000"
                  alt=""
                  className="h-[320px] w-full object-cover md:h-full"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 ring-1 ring-slate-200"
                    aria-label="Play"
                  >
                    <span className="ml-1 inline-block border-y-8 border-l-12 border-y-transparent border-l-slate-900" />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* SHOP OUR BEST */}
      <section className="bg-[rgb(var(--bg))]">
        <Container className="py-16">
          <SectionHeader
            eyebrow="Shop our best"
            title="Featured picks from the demo catalog."
            action={
              <Button
                variant="secondary"
                onClick={() => navigate("/catalog")}
                className="rounded-full px-6 py-3 text-xs uppercase tracking-[0.18em]"
              >
                View all
              </Button>
            }
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loadingFeatured ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <Skeleton className="aspect-[4/3] w-full" />
                  <div className="p-6">
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="mt-3 h-7 w-4/5" />
                    <Skeleton className="mt-4 h-4 w-1/3" />
                  </div>
                </Card>
              ))
            ) : (
              featured.slice(0, 6).map((p) => (
                <Card key={p.id} className="overflow-hidden">
                  <div className="h-full">
                    <ProductCard product={p as any} />
                  </div>
                </Card>
              ))
            )}
          </div>
        </Container>
      </section>

      {/* RECOMMENDED */}
      <section className="bg-[rgb(var(--bg))]">
        <Container className="py-16">
          <SectionHeader eyebrow="Recommended" title="Curated for you." />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {[
              { title: "Corporate Kits", img: "https://picsum.photos/seed/bcapparel-rec1/1600/1000" },
              { title: "Event Essentials", img: "https://picsum.photos/seed/bcapparel-rec2/1600/1000" },
            ].map((t) => (
              <Card key={t.title} className="bg-slate-100">
                <div className="relative">
                  <img src={t.img} alt="" className="h-[340px] w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6">
                    <div className="text-white">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-white/85">Collection</div>
                      <div className="display mt-2 text-2xl leading-[1.05]">{t.title}</div>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => navigate("/catalog")}
                      className="rounded-full px-6 py-3 text-xs uppercase tracking-[0.18em]"
                    >
                      Shop
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* SHOP BY USE */}
      <section className="bg-[rgb(var(--bg))]">
        <Container className="py-16">
          <SectionHeader eyebrow="Shop by use" title="Shop by scenario." />

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <Card>
              <div className="divide-y divide-slate-200">
                {ROOMS.map((r, idx) => {
                  const isOpen = r.key === openRoom;
                  return (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setOpenRoom(r.key)}
                      className="w-full p-6 text-left"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-baseline gap-3">
                          <div className="text-xs text-slate-400">{String(idx + 1).padStart(2, "0")}</div>
                          <div>
                            <div className="text-sm font-semibold text-slate-800">{r.title}</div>
                            <div className="text-xs text-slate-600">{r.subtitle}</div>
                          </div>
                        </div>
                        <span className="text-slate-500">{isOpen ? "—" : "+"}</span>
                      </div>

                      {isOpen ? (
                        <div className="mt-4 text-sm text-slate-600">
                          Curated items for {r.title.toLowerCase()} workflows.
                          <div className="mt-4">
                            <Button
                              onClick={() => navigate("/catalog")}
                              className="rounded-full px-6 py-3 text-xs uppercase tracking-[0.18em]"
                            >
                              Browse
                            </Button>
                          </div>
                        </div>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card className="bg-slate-100">
              <div className="relative h-full">
                <img
                  src="https://picsum.photos/seed/bcapparel-room/1600/1000"
                  alt=""
                  className="h-[420px] w-full object-cover md:h-full"
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-6 rounded-full bg-white/90 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-slate-800 ring-1 ring-slate-200">
                  {openRoom}
                </div>
              </div>
            </Card>
          </div>

          {/* KEPT: Service icons section (previously under Let's Talk) */}
          <div className="mt-10">
            <ServiceIcons />
          </div>
        </Container>
      </section>

      {/* CUSTOMERS */}
      <section className="bg-[rgb(var(--bg))]">
        <Container className="py-16">
          <SectionHeader eyebrow="Customers" title="What buyers say." />
          <div className="mt-10">
            <TestimonialRow />
          </div>
        </Container>
      </section>
    </div>
  );
}
