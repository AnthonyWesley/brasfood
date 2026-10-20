import { Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHero } from "@/components/storefront";
import { getCategories, getPublicProducts } from "@/lib/api";
import { ProductPreview } from "./product-preview";

export const metadata: Metadata = {
  title: "Our products",
  description: "Brazilian and Portuguese frozen, chilled and ambient products for UK retailers and foodservice.",
};

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([getCategories(), getPublicProducts()]);

  return (
    <>
      <PageHero
        eyebrow="Our products"
        title={
          <>
            A preview of <span className="text-accent">our range</span>
          </>
        }
        text="Linguiças, queijos, charcutaria, congelados, polpas, mandioca and açaí. Trade customers see the full catalogue with prices, product codes and pack sizes."
        image="/images/banners/catalogue-cover.webp"
        imageAlt="Brasfood catalogue cover: açaí tubs on a beach table"
      >
        <Link href="/login" className="btn-accent">
          <Lock className="size-4" aria-hidden="true" />
          Customer sign in
        </Link>
        <Link href="/become-a-customer" className="btn bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20">
          Open an account
        </Link>
      </PageHero>

      <div className="container-site">
        {/* useSearchParams no filtro: precisa de Suspense para o resto da página ir no HTML estático */}
        <Suspense fallback={<div className="mt-10 h-96 animate-pulse rounded-[var(--radius-card)] bg-surface" />}>
          <ProductPreview categories={categories} products={products} />
        </Suspense>
      </div>
    </>
  );
}
