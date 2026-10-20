import { Mail, PackageSearch, Search } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProductBadgeTag, StorageTag } from "@/components/badges";
import { CategoryIconBadge, ProductVisual } from "@/components/product-visual";
import { getCatalogue, getCategories, showPrices, type CatalogueFilters } from "@/lib/api";
import { requireCustomer } from "@/lib/session";
import { site, storageLabels } from "@/lib/site";
import type { Storage } from "@/lib/types";

export const metadata: Metadata = { title: "Catalogue" };

const formatPrice = (value: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);

export default function CataloguePage(props: PageProps<"/catalogue">) {
  return (
    <Suspense fallback={<CatalogueSkeleton />}>
      <Catalogue searchParams={props.searchParams} />
    </Suspense>
  );
}

const one = (value: string | string[] | undefined) => (typeof value === "string" && value ? value : undefined);

async function Catalogue({ searchParams }: { searchParams: PageProps<"/catalogue">["searchParams"] }) {
  const user = await requireCustomer("/catalogue");
  const params = await searchParams;
  const storage = one(params.storage);
  const filters: CatalogueFilters = {
    q: one(params.q),
    category: one(params.category),
    brand: one(params.brand),
    storage: storage && storage in storageLabels ? (storage as Storage) : undefined,
  };
  const [{ items, brands, category }, categories] = await Promise.all([getCatalogue(user, filters), getCategories()]);
  const iconOf = new Map(categories.map((c) => [c.id, c.icon]));

  /** Monta o link trocando um filtro e mantendo os outros. */
  const hrefWith = (change: Partial<Record<keyof CatalogueFilters, string | undefined>>) => {
    const next = new URLSearchParams();
    const merged = { ...filters, ...change };
    for (const [key, value] of Object.entries(merged)) if (value) next.set(key, value);
    const query = next.toString();
    return query ? `/catalogue?${query}` : "/catalogue";
  };
  const hasFilters = Boolean(filters.q || filters.category || filters.brand || filters.storage);

  return (
    <div className="mx-auto grid max-w-[90rem] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[16rem_1fr]">
      {/* ---------- filtros ---------- */}
      <aside className="lg:sticky lg:top-22 lg:self-start">
        <nav aria-label="Categories" className="card p-3">
          <p className="px-3 pt-2 pb-3 text-xs font-semibold tracking-[0.15em] text-muted uppercase">Categories</p>
          <ul className="flex gap-1 overflow-x-auto lg:grid lg:overflow-visible">
            <li>
              <Link
                href={hrefWith({ category: undefined })}
                aria-current={!filters.category ? "page" : undefined}
                className="flex min-h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium whitespace-nowrap text-ink-soft hover:bg-surface-2 aria-[current=page]:bg-brand-soft aria-[current=page]:text-brand-strong"
              >
                All products
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={hrefWith({ category: c.slug })}
                  aria-current={filters.category === c.slug ? "page" : undefined}
                  className="flex min-h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium whitespace-nowrap text-ink-soft hover:bg-surface-2 aria-[current=page]:bg-brand-soft aria-[current=page]:text-brand-strong"
                >
                  <CategoryIconBadge icon={c.icon} className="hidden size-7 rounded-lg lg:grid" />
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <section aria-labelledby="catalogue-title">
        {/* GET: a busca funciona até sem JavaScript e o resultado fica no link */}
        <form action="/catalogue" className="card flex flex-col gap-3 p-3 md:flex-row md:items-center">
          {filters.category && <input type="hidden" name="category" value={filters.category} />}
          <label className="relative flex-1">
            <span className="sr-only">Search products</span>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="search"
              name="q"
              defaultValue={filters.q}
              placeholder="Search by name, brand or code"
              className="field border-transparent bg-bg pl-10"
            />
          </label>
          <label className="md:w-44">
            <span className="sr-only">Brand</span>
            <select name="brand" defaultValue={filters.brand ?? ""} className="field border-transparent bg-bg">
              <option value="">All brands</option>
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>
          <label className="md:w-40">
            <span className="sr-only">Storage</span>
            <select name="storage" defaultValue={filters.storage ?? ""} className="field border-transparent bg-bg">
              <option value="">Any storage</option>
              {Object.entries(storageLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn-primary">
            Search
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2">
          <h1 id="catalogue-title" className="text-2xl font-extrabold">
            {category?.name ?? "All products"}
          </h1>
          <p className="text-sm text-muted" aria-live="polite">
            {items.length} {items.length === 1 ? "product" : "products"}
            {hasFilters && (
              <>
                {" · "}
                <Link href="/catalogue" className="font-semibold text-brand hover:underline">
                  Clear filters
                </Link>
              </>
            )}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="card mt-4 grid place-items-center p-12 text-center">
            <PackageSearch className="size-10 text-muted" aria-hidden="true" />
            <p className="mt-4 text-lg font-bold">No products match your search</p>
            <p className="mt-1 max-w-sm text-sm text-muted">
              Try another word or remove a filter. Can&apos;t find something? Email {site.email} and we&apos;ll check.
            </p>
          </div>
        ) : (
          <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {items.map((product) => {
              const unavailable = product.badge === "out-of-stock" || product.badge === "coming-soon";
              return (
                <li key={product.id} className="card group relative flex flex-col overflow-hidden rounded-2xl ring-1 ring-line/70 transition-shadow hover:shadow-lg">
                  <div className="relative">
                    <ProductVisual
                      image={product.image}
                      name={product.name}
                      icon={iconOf.get(product.categoryId) ?? "grocery"}
                      className={`m-2 aspect-[4/3] rounded-xl ${unavailable ? "opacity-60" : ""}`}
                    />
                    {product.badge && (
                      <span className="absolute top-3.5 right-3.5">
                        <ProductBadgeTag badge={product.badge} />
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col px-4 pt-1 pb-4">
                    <p className="text-xs font-semibold text-brand">{product.code}</p>
                    <h2 className="mt-1 text-sm leading-snug font-semibold">
                      {/* o link cobre o card inteiro */}
                      <Link href={`/catalogue/${product.slug}`} className="after:absolute after:inset-0">
                        {product.name}
                      </Link>
                    </h2>
                    <p className="mt-1 text-xs text-muted">
                      {product.brand} · {product.unit}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
                      <StorageTag storage={product.storage} />
                      {showPrices && product.casePrice !== null && (
                        <span className="text-sm font-bold">{formatPrice(product.casePrice)}</span>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-brand-soft p-5 sm:flex-row sm:items-center">
          <p className="text-sm text-brand-strong">
            Ready to order? Send your product codes and quantities to our sales team.
          </p>
          <a href={`mailto:${site.email}?subject=Order%20request`} className="btn-primary">
            <Mail className="size-4" aria-hidden="true" />
            Email an order
          </a>
        </div>
      </section>
    </div>
  );
}

function CatalogueSkeleton() {
  return (
    <div className="mx-auto grid max-w-[90rem] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[16rem_1fr]" aria-busy="true">
      <div className="card hidden h-[32rem] animate-pulse lg:block" />
      <div>
        <div className="card h-16 animate-pulse" />
        <ul className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: 10 }, (_, i) => (
            <li key={i} className="card aspect-[3/4] animate-pulse rounded-2xl" />
          ))}
        </ul>
      </div>
    </div>
  );
}
