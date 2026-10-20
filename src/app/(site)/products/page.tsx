import { Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getCategories, getPublicProducts } from "@/lib/api";
import { ProductPreview } from "./product-preview";

export const metadata: Metadata = {
  title: "Our products",
  description: "Brazilian and Portuguese frozen, chilled and ambient products for UK retailers and foodservice.",
};

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([getCategories(), getPublicProducts()]);

  return (
    <div className="container-site pt-10">
      <header className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <p className="eyebrow">Our products</p>
          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">A preview of our range</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Browse the categories we supply. Trade customers see the full catalogue with product codes, pack sizes,
            availability and new arrivals.
          </p>
        </div>
        <div className="card flex items-center gap-4 p-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
            <Lock className="size-5" aria-hidden="true" />
          </span>
          <p className="text-sm text-muted">
            Already a customer?{" "}
            <Link href="/login" className="font-semibold text-brand hover:underline">
              Sign in
            </Link>{" "}
            for the full catalogue.
          </p>
        </div>
      </header>

      {/* useSearchParams no filtro: precisa de Suspense para o resto da página ir no HTML estático */}
      <Suspense fallback={<div className="mt-10 h-96 animate-pulse rounded-[var(--radius-card)] bg-surface" />}>
        <ProductPreview categories={categories} products={products} />
      </Suspense>
    </div>
  );
}
