"use client";

import { ArrowRight, PackageSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/storefront";
import type { Category, PublicProduct } from "@/lib/types";

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

export function ProductPreview({ categories, products }: { categories: Category[]; products: PublicProduct[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const current = categories.find((c) => c.slug === params.get("category")) ?? null;
  const query = params.get("q")?.trim() ?? "";
  const needle = normalize(query);
  const categoryOf = new Map(categories.map((c) => [c.id, c]));
  const shown = products.filter(
    (p) =>
      (!current || p.categoryId === current.id) &&
      (!needle || normalize(`${p.name} ${p.brand ?? ""} ${categoryOf.get(p.categoryId)?.namePt ?? ""}`).includes(needle)),
  );

  const select = (slug: string | null) => {
    const next = new URLSearchParams(params);
    if (slug) next.set("category", slug);
    else next.delete("category");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <>
      {current?.banner && (
        <div className="relative mt-8 grid overflow-hidden rounded-[var(--radius-card)] bg-brand text-white sm:grid-cols-[1fr_1.2fr]">
          <div className="p-7 md:p-9">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">{current.namePt}</p>
            <h2 className="mt-2 text-3xl font-extrabold">{current.name}</h2>
            <p className="mt-3 max-w-sm text-white/75">{current.description}</p>
          </div>
          <div className="relative min-h-48">
            <Image src={current.banner} alt={`${current.name} range`} fill sizes="(min-width: 640px) 55vw, 100vw" className="object-cover object-[50%_85%]" />
          </div>
        </div>
      )}

      <nav aria-label="Categories" className="-mx-4 mt-8 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 sm:flex-wrap">
          {[{ slug: null, name: "All products" }, ...categories].map((category) => {
            const active = (current?.slug ?? null) === category.slug;
            return (
              <li key={category.slug ?? "all"}>
                <button
                  type="button"
                  onClick={() => select(category.slug)}
                  aria-pressed={active}
                  className="min-h-10 rounded-full px-4 text-sm font-medium whitespace-nowrap ring-1 ring-line transition-colors hover:bg-surface-2 aria-pressed:bg-brand aria-pressed:text-white aria-pressed:ring-brand"
                >
                  {category.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {shown.length} {shown.length === 1 ? "product" : "products"}
        {query && (
          <>
            {" "}
            for “{query}” ·{" "}
            <Link href={current ? `/products?category=${current.slug}` : "/products"} className="font-semibold text-brand hover:underline">
              clear search
            </Link>
          </>
        )}
      </p>

      {shown.length === 0 ? (
        <div className="card mt-4 grid place-items-center rounded-2xl p-12 text-center">
          <PackageSearch className="size-10 text-muted" aria-hidden="true" />
          <p className="mt-3 font-semibold">Nothing found for “{query}”</p>
          <p className="mt-1 text-sm text-muted">Try another word, or ask our sales team — we may have it in stock.</p>
        </div>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {shown.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} category={categoryOf.get(product.categoryId)} />
            </li>
          ))}
        </ul>
      )}

      <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] bg-charcoal p-8 text-white md:flex-row md:items-center md:p-10">
        <div>
          <h2 className="text-2xl font-extrabold">Want trade prices?</h2>
          <p className="mt-2 max-w-xl text-white/75">Register your business to see prices, codes and pack sizes for every product.</p>
        </div>
        <Link href="/become-a-customer" className="btn-accent">
          Become a customer
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}
