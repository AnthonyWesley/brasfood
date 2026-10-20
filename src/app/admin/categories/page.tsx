import type { Metadata } from "next";
import { Suspense } from "react";
import { CategoryIconBadge } from "@/components/product-visual";
import { countProductsByCategory, getCategories } from "@/lib/api";
import { requireAdmin } from "@/lib/session";
import { CategoryForm } from "./category-form";

export const metadata: Metadata = { title: "Categories" };

export default function CategoriesPage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold">Categories</h1>
      <Suspense fallback={<div className="card mt-6 h-96 animate-pulse" />}>
        <Categories />
      </Suspense>
    </>
  );
}

async function Categories() {
  await requireAdmin();
  const [categories, counts] = await Promise.all([getCategories(), countProductsByCategory()]);

  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_22rem] xl:items-start">
      <ul className="card divide-y divide-line rounded-2xl">
        {categories.map((c) => (
          <li key={c.id} className="flex items-center gap-4 p-4">
            <CategoryIconBadge icon={c.icon} className="size-11 shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{c.name}</p>
              <p className="truncate text-sm text-muted">{c.description}</p>
            </div>
            <span className="text-sm text-muted tabular-nums">{counts.get(c.id) ?? 0} products</span>
          </li>
        ))}
      </ul>
      <CategoryForm />
    </div>
  );
}
