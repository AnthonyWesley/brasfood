import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getAdminProduct, getCategories } from "@/lib/api";
import { requireAdmin } from "@/lib/session";
import { ProductForm } from "../product-form";

export const metadata: Metadata = { title: "Edit product" };

export default function EditProductPage(props: PageProps<"/admin/products/[id]">) {
  return (
    <>
      <h1 className="text-3xl font-extrabold">Edit product</h1>
      <Suspense fallback={<div className="card mt-6 h-[36rem] animate-pulse" />}>
        <EditProduct params={props.params} />
      </Suspense>
    </>
  );
}

async function EditProduct({ params }: { params: PageProps<"/admin/products/[id]">["params"] }) {
  await requireAdmin();
  const { id } = await params;
  const [product, categories] = await Promise.all([getAdminProduct(id), getCategories()]);
  if (!product) notFound();
  return <ProductForm product={product} categories={categories} />;
}
