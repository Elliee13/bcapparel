import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";
import Skeleton from "../components/Skeleton";
import Select from "../components/Select";
import { formatMoney } from "../utils/format";
import { useCart } from "../store/cart";
import {
  fetchProductById,
  fetchProductImages,
  fetchProductVariants,
  fetchSupplierById,
} from "../lib/catalogApi";
import type { Product, ProductImage, ProductVariant, Supplier } from "../types/catalog";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [activeImage, setActiveImage] = useState<string>("");

  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");

  const [added, setAdded] = useState(false);

  const cart = useCart();

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setAdded(false);
      try {
        if (!id) return;

        const p = await fetchProductById(id);
        if (!alive) return;

        setProduct(p);
        if (!p) {
          setSupplier(null);
          setImages([]);
          setVariants([]);
          return;
        }

        const [imgs, vars, sup] = await Promise.all([
          fetchProductImages(p.id),
          fetchProductVariants(p.id),
          fetchSupplierById(p.supplier_id),
        ]);

        if (!alive) return;

        setImages(imgs);
        setVariants(vars);
        setSupplier(sup);

        const firstImg = imgs[0]?.url || p.image_url_primary;
        setActiveImage(firstImg);

        // defaults
        const first = vars[0];
        if (first) {
          setColor(first.color);
          setSize(first.size);
        } else {
          setColor("");
          setSize("");
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [id]);

  const colors = useMemo(() => Array.from(new Set(variants.map((v) => v.color))), [variants]);

  const sizesForColor = useMemo(() => {
    if (!color) return [];
    return Array.from(new Set(variants.filter((v) => v.color === color).map((v) => v.size)));
  }, [variants, color]);

  const selectedVariant = useMemo(() => {
    return variants.find((v) => v.color === color && v.size === size) ?? null;
  }, [variants, color, size]);

  function addToCart() {
    if (!product || !supplier || !selectedVariant) return;

    cart.addItem(
      {
        productId: product.id,
        title: product.title,
        imageUrl: product.image_url_primary,
        supplierName: supplier.name,
        category: product.category,
        variantId: selectedVariant.id,
        sku: selectedVariant.sku,
        color: selectedVariant.color,
        size: selectedVariant.size,
        unitPrice: selectedVariant.price,
      },
      1
    );

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  if (loading) {
    return (
      <Container className="py-8 md:py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="bg-white">
            <Skeleton className="aspect-square w-full" />
          </div>
          <div className="bg-white p-6 md:p-8">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="mt-4 h-10 w-2/3" />
            <Skeleton className="mt-5 h-4 w-4/5" />
            <Skeleton className="mt-8 h-11 w-full" />
            <Skeleton className="mt-3 h-11 w-full" />
            <Skeleton className="mt-8 h-12 w-full" />
          </div>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-8 md:py-12">
        <div className="bg-white p-6 md:p-8">
          <h1 className="text-xl text-slate-900">Product not found</h1>
          <p className="mt-2 text-sm text-slate-600">
            This demo item may have been removed or is inactive.
          </p>
          <div className="mt-4">
            <Link className="text-sm font-semibold text-slate-900 underline" to="/catalog">
              Back to catalog
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 md:py-12">
      <div className="mb-8">
        <Link to="/catalog" className="text-xs uppercase tracking-[0.18em] text-slate-600 hover:text-slate-900">
          ← Back to catalog
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left: Images (quiet, editorial) */}
        <section className="bg-white">
          <div className="overflow-hidden bg-slate-100">
            <img
              src={activeImage || product.image_url_primary}
              alt={product.title}
              decoding="async"
              width={1200}
              height={1200}
              className="aspect-square w-full object-cover"
            />
          </div>

          {images.length > 0 ? (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {images.map((img) => {
                const isActive = img.url === activeImage;
                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setActiveImage(img.url)}
                    className={[
                      "shrink-0 overflow-hidden bg-slate-100 transition focus-visible:outline-none",
                      isActive ? "ring-2 ring-slate-900" : "ring-1 ring-slate-200 hover:ring-slate-300",
                    ].join(" ")}
                    aria-label="Select image"
                  >
                    <img src={img.url} alt="" className="h-20 w-20 object-cover" />
                  </button>
                );
              })}
            </div>
          ) : null}
        </section>

        {/* Right: Purchase panel (narrower, luxury rhythm) */}
        <section className="bg-white p-6 md:p-8">
          <div className="max-w-md">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              {product.category} • {supplier?.name ?? "Supplier"}
            </div>

            <h1 className="mt-3 text-3xl md:text-4xl leading-[1.05] text-slate-900">
              {product.title}
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">{product.description}</p>

            <div className="mt-6">
              <div className="text-lg font-semibold text-slate-900">
                {formatMoney(product.price_min)}–{formatMoney(product.price_max)}
              </div>
              {selectedVariant ? (
                <div className="mt-1 text-sm text-slate-600">
                  Selected: {formatMoney(selectedVariant.price)}
                </div>
              ) : null}
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Color
                </div>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setColor(c);
                        const nextSizes = Array.from(
                          new Set(variants.filter((v) => v.color === c).map((v) => v.size))
                        );
                        setSize(nextSizes[0] ?? "");
                      }}
                      className={[
                        "h-11 px-4 text-xs uppercase tracking-[0.18em] transition focus-visible:outline-none",
                        "ring-1",
                        c === color
                          ? "bg-slate-900 text-white ring-slate-900"
                          : "bg-white text-slate-800 ring-slate-300 hover:bg-slate-50",
                      ].join(" ")}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-slate-500" htmlFor="size">
                  Size
                </label>
                <Select
                  id="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  disabled={!color || sizesForColor.length === 0}
                >
                  {sizesForColor.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="my-6 h-px w-full bg-slate-200" />

              <div>
                <Button
                  onClick={addToCart}
                  disabled={!selectedVariant || !supplier}
                  className="w-full py-3 text-sm uppercase tracking-[0.12em]"
                >
                  {added ? "Added" : "Add to cart"}
                </Button>
                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Demo note: cart is stored locally (browser).
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
