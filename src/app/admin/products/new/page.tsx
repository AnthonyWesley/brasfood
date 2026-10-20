import type { Metadata } from "next";
import { Suspense } from "react";
import { getCategories } from "@/lib/api";
import { requireAdmin } from "@/lib/session";
import { ProductForm } from "../product-form";

export const metadata: Metadata = { title: "New product" };

export default function NewProductPage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold">New product</h1>
      <Suspense fallback={<div className="card mt-6 h-[36rem] animate-pulse" />}>
        <NewProduct />
      </Suspense>
    </>
  );
}

async function NewProduct() {
  await requireAdmin();
  return <ProductForm product={null} categories={await getCategories()} />;
}
