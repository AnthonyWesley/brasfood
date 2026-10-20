"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { StorageTag } from "@/components/badges";
import { ProductVisual } from "@/components/product-visual";
import type { Category, PublicProduct } from "@/lib/types";

export function ProductPreview({ categories, products }: { categories: Category[]; products: PublicProduct[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const selected = useSearchParams().get("category");
  const current = categories.find((c) => c.slug === selected) ?? null;
  const iconOf = new Map(categories.map((c) => [c.id, c.icon]));
  const shown = current ? products.filter((p) => p.categoryId === current.id) : products;

  const select = (slug: string | null) =>
    router.replace(slug ? `${pathname}?category=${slug}` : pathname, { scroll: false });

  return (
    <>
      <nav aria-label="Categories" className="mt-10 -mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 sm:flex-wrap">
          {[{ slug: null, name: "All products" }, ...categories].map((category) => {
            const active = (current?.slug ?? null) === category.slug;
            return (
              <li key={category.slug ?? "all"}>
                <button
                  type="button"
                  onClick={() => select(category.slug)}
                  aria-pressed={active}
                  className="min-h-11 rounded-full px-4 text-sm font-medium whitespace-nowrap ring-1 ring-line transition-colors hover:bg-surface aria-pressed:bg-ink aria-pressed:text-white aria-pressed:ring-ink"
                >
                  {category.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {current && <p className="mt-6 text-muted">{current.description}</p>}

      <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {shown.map((product) => (
          <li key={product.id} className="card overflow-hidden">
            <ProductVisual
              image={product.image}
              name={product.name}
              icon={iconOf.get(product.categoryId) ?? "grocery"}
              className="m-2 aspect-square rounded-[1.25rem]"
            />
            <div className="px-5 pt-2 pb-5">
              <p className="text-xs font-medium text-muted">{product.brand}</p>
              <h2 className="mt-1 leading-snug font-semibold">{product.name}</h2>
              <div className="mt-3">
                <StorageTag storage={product.storage} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] bg-charcoal p-8 text-white md:flex-row md:items-center md:p-10">
        <div>
          <h2 className="text-2xl font-extrabold">Want the full catalogue?</h2>
          <p className="mt-2 max-w-xl text-white/75">
            Register your business to see codes, pack sizes and availability for every product.
          </p>
        </div>
        <Link href="/become-a-customer" className="btn-accent">
          Become a customer
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}
