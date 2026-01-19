import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Container from "../components/Container";
import Input from "../components/Input";
import Select from "../components/Select";
import Pagination from "../components/Pagination";
import { categories, products, suppliers } from "../data/products";

type SortOption = "featured" | "price-asc" | "price-desc";

const PAGE_SIZE = 24;

function parsePriceLabel(label: string): number {
  const match = label.match(/(\d+(?:\.\d+)?)/);
  if (!match) return Number.POSITIVE_INFINITY;
  return Number(match[1]);
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
        "rounded-[28px] bg-white ring-1 ring-slate-200",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";
  const initialCategory = searchParams.get("category") ?? "";
  const initialSupplier = searchParams.get("supplier") ?? "";
  const initialSort = (searchParams.get("sort") as SortOption) ?? "featured";
  const initialPage = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [supplier, setSupplier] = useState(initialSupplier);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);
    return () => window.clearTimeout(handle);
  }, [query]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, category, supplier, sort]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category) params.set("category", category);
    if (supplier) params.set("supplier", supplier);
    if (sort !== "featured") params.set("sort", sort);
    if (page > 1) params.set("page", String(page));
    setSearchParams(params, { replace: true });
  }, [query, category, supplier, sort, page, setSearchParams]);

  const filtered = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    return products.filter((product) => {
      const matchesQuery =
        !q ||
        product.title.toLowerCase().includes(q) ||
        product.supplier.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);
      const matchesCategory = !category || product.category === category;
      const matchesSupplier = !supplier || product.supplier === supplier;
      return matchesQuery && matchesCategory && matchesSupplier;
    });
  }, [debouncedQuery, category, supplier]);

  const sorted = useMemo(() => {
    if (sort === "featured") return filtered;
    const next = [...filtered];
    next.sort((a, b) => {
      const aPrice = parsePriceLabel(a.priceLabel);
      const bPrice = parsePriceLabel(b.priceLabel);
      if (sort === "price-asc") return aPrice - bPrice;
      return bPrice - aPrice;
    });
    return next;
  }, [filtered, sort]);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    if (page !== safePage) setPage(safePage);
  }, [page, safePage]);

  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pageItems = useMemo(
    () => sorted.slice(startIndex, startIndex + PAGE_SIZE),
    [sorted, startIndex]
  );

  return (
    <div className="bg-[rgb(var(--bg))]">
      <Container className="py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
            Product showcase
          </div>
          <h1 className="display-tight mt-4 text-4xl md:text-5xl leading-[0.95] text-slate-900">
            Explore Products & Capabilities
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-slate-600">
            Decoration-ready blanks and branded merch options. Click any item to
            view the supplier reference, or request a quote and we'll guide you.
          </p>
        </div>

        <Card className="mt-10 p-5 md:p-6">
          <div className="grid gap-4 md:grid-cols-[1.3fr_0.9fr_0.9fr_0.7fr]">
            <div>
              <div className="mb-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Search
              </div>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, styles, suppliers..."
                className="rounded-[14px]"
              />
            </div>

            <div>
              <div className="mb-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Category
              </div>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-[14px]"
              >
                <option value="">All categories</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <div className="mb-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Supplier
              </div>
              <Select
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="rounded-[14px]"
              >
                <option value="">All suppliers</option>
                {suppliers.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <div className="mb-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Sort
              </div>
              <Select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-[14px]"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
            <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
              1) Browse options
            </span>
            <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
              2) Request a quote
            </span>
            <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
              3) We confirm details & pricing
            </span>
          </div>
        </Card>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
          <div>
            Matching {total} {total === 1 ? "option" : "options"}
          </div>
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
            {category || "All categories"}
          </div>
        </div>

        {total === 0 ? (
          <div className="mt-10 rounded-[24px] bg-white p-8 text-sm text-slate-600 ring-1 ring-slate-200">
            No results found. Try adjusting your search or filters.
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {pageItems.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-[22px] bg-white ring-1 ring-slate-200 shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
              >
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <div className="relative bg-[rgb(var(--bg))]">
                    {product.badge ? (
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-700 ring-1 ring-slate-200">
                        {product.badge}
                      </span>
                    ) : null}

                    <div className="absolute right-4 top-4 text-[11px] uppercase tracking-[0.18em] text-slate-600">
                      {product.colorsCount} Colors
                    </div>

                    <div className="flex h-[190px] items-center justify-center p-5">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="max-h-full w-auto max-w-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="text-sm font-semibold text-slate-900 line-clamp-2">
                      {product.title}
                    </div>
                    <div className="mt-2 text-base font-semibold text-slate-900">
                      {product.priceLabel}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {product.supplier}
                    </div>
                  </div>
                </a>

                <div className="px-4 pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/request?product=${encodeURIComponent(product.id)}`}
                      className="inline-flex h-9 items-center justify-center rounded-full border border-slate-200 px-4 text-[11px] uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                    >
                      Request Quote
                    </Link>
                    <a
                      href={product.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 items-center justify-center rounded-full bg-white px-4 text-[11px] uppercase tracking-[0.18em] text-slate-600 ring-1 ring-slate-200 transition hover:ring-slate-300"
                    >
                      View Reference
                    </a>
                  </div>
                  <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    Reference pricing
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Pagination
            page={safePage}
            pageSize={PAGE_SIZE}
            total={total}
            onPageChange={setPage}
          />
        </div>
      </Container>
    </div>
  );
}
