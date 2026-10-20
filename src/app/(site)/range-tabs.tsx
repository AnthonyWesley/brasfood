"use client";

import { useState } from "react";
import { ProductCard } from "@/components/storefront";
import type { Category, PublicProduct } from "@/lib/types";

/** Abas de categoria da seção "Explore our range" (o "Best Deals For You" do Freshora). */
export function RangeTabs({ categories, products }: { categories: Category[]; products: PublicProduct[] }) {
  const [active, setActive] = useState<string | null>(null);
  const categoryOf = new Map(categories.map((c) => [c.id, c]));
  // "All": dois de cada categoria, alternando — senão a aba abre só com linguiças
  const shown = active
    ? products.filter((p) => p.categoryId === active).slice(0, 12)
    : categories.flatMap((c) => products.filter((p) => p.categoryId === c.id).slice(0, 2)).slice(0, 12);

  return (
    <>
      <div role="tablist" aria-label="Filter by category" className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {[{ id: null, name: "All products" }, ...categories].map((c) => (
          <button
            key={c.id ?? "all"}
            type="button"
            role="tab"
            aria-selected={active === c.id}
            onClick={() => setActive(c.id)}
            className="min-h-10 shrink-0 rounded-full px-4 text-sm font-medium ring-1 ring-line hover:bg-surface-2 aria-selected:bg-brand aria-selected:text-white aria-selected:ring-brand"
          >
            {c.name}
          </button>
        ))}
      </div>
      <ul role="tabpanel" className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {shown.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} category={categoryOf.get(p.categoryId)} />
          </li>
        ))}
      </ul>
    </>
  );
}
