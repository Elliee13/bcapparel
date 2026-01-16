import { useEffect, useMemo, useRef, useState } from "react";
import Container from "../components/Container";
import Input from "../components/Input";
import Select from "../components/Select";
import Skeleton from "../components/Skeleton";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import PriceRange from "../components/PriceRange";
import EmptyState from "../components/EmptyState";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import type { CatalogFilters, CatalogSort, Supplier } from "../types/catalog";
import { fetchCatalogPage, fetchCategories, fetchSuppliersCached } from "../lib/catalogApi";

const PAGE_SIZE = 24;

const CATALOG_HERO =
  "https://picsum.photos/seed/bcapparel-catalog-hero/2200/900";

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

export default function CatalogPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingMeta, setLoadingMeta] = useState(true);

  const [q, setQ] = useState("");
  const qDebounced = useDebouncedValue(q, 320);

  const [supplierSlug, setSupplierSlug] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<CatalogSort>("featured");

  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const reqIdRef = useRef(0);

  const filters: CatalogFilters = useMemo(() => {
    const min = priceMin.trim() ? Number(priceMin) : undefined;
    const max = priceMax.trim() ? Number(priceMax) : undefined;

    return {
      q: qDebounced,
      supplierSlug,
      category,
      sort,
      page,
      pageSize: PAGE_SIZE,
      priceMin: Number.isFinite(min) ? min : undefined,
      priceMax: Number.isFinite(max) ? max : undefined,
    };
  }, [qDebounced, supplierSlug, category, sort, page, priceMin, priceMax]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoadingMeta(true);
      try {
        const [s, c] = await Promise.all([fetchSuppliersCached(), fetchCategories()]);
        if (!alive) return;
        setSuppliers(s);
        setCategories(c);
      } catch {
        // non-fatal for demo
      } finally {
        if (alive) setLoadingMeta(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qDebounced, supplierSlug, category, sort, priceMin, priceMax]);

  useEffect(() => {
    const reqId = ++reqIdRef.current;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await fetchCatalogPage(filters);
        if (reqId !== reqIdRef.current) return;
        setItems(res.items);
        setTotal(res.total);
      } catch (e: any) {
        if (reqId !== reqIdRef.current) return;
        setError(e?.message ?? "Failed to load catalog");
        setItems([]);
        setTotal(0);
      } finally {
        if (reqId === reqIdRef.current) setLoading(false);
      }
    })();
  }, [filters]);

  function clearFilters() {
    setQ("");
    setSupplierSlug("");
    setCategory("");
    setSort("featured");
    setPriceMin("");
    setPriceMax("");
    setPage(1);
  }

  return (
    <div>
      {/* HEADER: image-led “catalog hero” like Home */}
      <section className="bg-[rgb(var(--bg))]">
        <Container className="py-10">
          <Card className="bg-slate-100">
            <div className="relative">
              <img
                src={CATALOG_HERO}
                alt=""
                className="h-[320px] w-full object-cover md:h-[360px]"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/20" />

              <div className="absolute left-6 top-8 md:left-10 md:top-10">
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/85">
                  BC Apparel Demo • Catalog
                </div>
                <h1 className="display-tight mt-3 text-4xl md:text-5xl leading-[0.95] text-white">
                  Catalog
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85">
                  Fast demo storefront: browse → cart → demo checkout. Built to prove speed and
                  premium UX, with a clean data layer for future supplier integrations.
                </p>
              </div>

              {/* Filters panel (same pattern as Home hero search) */}
              <div className="absolute left-4 right-4 bottom-5 md:left-10 md:right-10 md:bottom-8">
                <div className="rounded-[22px] bg-white p-4 md:p-5 ring-1 ring-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.14)]">
                  <div className="grid gap-4 md:grid-cols-12">
                    <div className="md:col-span-4">
                      <label className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        Search
                      </label>
                      <Input
                        placeholder="Search products…"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        Supplier
                      </label>
                      <Select
                        value={supplierSlug}
                        onChange={(e) => setSupplierSlug(e.target.value)}
                        disabled={loadingMeta}
                      >
                        <option value="">All</option>
                        {suppliers.map((s) => (
                          <option key={s.id} value={s.slug}>
                            {s.name}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        Category
                      </label>
                      <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        disabled={loadingMeta}
                      >
                        <option value="">All</option>
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        Price
                      </label>
                      <PriceRange
                        min={priceMin}
                        max={priceMax}
                        onMinChange={setPriceMin}
                        onMaxChange={setPriceMax}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-1 block text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        Sort
                      </label>
                      <Select value={sort} onChange={(e) => setSort(e.target.value as CatalogSort)}>
                        <option value="featured">Featured</option>
                        <option value="price_asc">Price: low → high</option>
                        <option value="price_desc">Price: high → low</option>
                      </Select>
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

      {/* GRID */}
      <section className="bg-[rgb(var(--bg))]">
        <Container className="pb-16">
          {error ? (
            <Card className="ring-1 ring-rose-200">
              <div className="p-6">
                <p className="text-sm font-semibold text-rose-700">{error}</p>
              </div>
            </Card>
          ) : null}

          {loading ? (
            <section className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-[28px] bg-transparent ring-1 ring-slate-200"
                >
                  <Skeleton className="h-[260px] w-full" />
                  <div className="p-6">
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="mt-3 h-7 w-4/5" />
                    <Skeleton className="mt-4 h-4 w-1/3" />
                  </div>
                </div>
              ))}
            </section>
          ) : items.length === 0 ? (
            <div className="mt-10">
              <Card>
                <div className="p-6">
                  <EmptyState
                    title="No products found"
                    description="Try adjusting your search or filters. This is demo data from Supabase."
                    onClear={clearFilters}
                  />
                </div>
              </Card>
            </div>
          ) : (
            <>
              <section className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </section>

              <div className="mt-10 border-t border-slate-200 pt-6">
                <Pagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />
              </div>
            </>
          )}
        </Container>
      </section>
    </div>
  );
}
