import { CircleCheck, Eye, EyeOff, Pencil, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProductBadgeTag, StorageTag } from "@/components/badges";
import { toggleProductVisibility } from "@/lib/actions/admin";
import { getAdminProducts, getCategories } from "@/lib/api";
import { requireAdmin } from "@/lib/session";

export const metadata: Metadata = { title: "Products" };

export default function AdminProductsPage(props: PageProps<"/admin/products">) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold">Products</h1>
        <Link href="/admin/products/new" className="btn-primary">
          <Plus className="size-4" aria-hidden="true" />
          New product
        </Link>
      </div>
      <Suspense fallback={<div className="card mt-6 h-96 animate-pulse" />}>
        <ProductTable searchParams={props.searchParams} />
      </Suspense>
    </>
  );
}

async function ProductTable({ searchParams }: { searchParams: PageProps<"/admin/products">["searchParams"] }) {
  await requireAdmin();
  const [{ saved }, products, categories] = await Promise.all([searchParams, getAdminProducts(), getCategories()]);
  const categoryName = new Map(categories.map((c) => [c.id, c.name]));

  return (
    <>
      {saved && (
        <p role="status" className="mt-4 flex items-center gap-2 rounded-2xl bg-brand-soft p-4 text-sm text-brand-strong">
          <CircleCheck className="size-4" aria-hidden="true" />
          Product saved.
        </p>
      )}
      <div className="card mt-6 overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[48rem] text-left text-sm">
          <thead className="border-b border-line text-xs text-muted">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">Code</th>
              <th scope="col" className="px-5 py-3 font-medium">Product</th>
              <th scope="col" className="px-5 py-3 font-medium">Category</th>
              <th scope="col" className="px-5 py-3 font-medium">Storage</th>
              <th scope="col" className="px-5 py-3 font-medium">Status</th>
              <th scope="col" className="px-5 py-3 font-medium">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((p) => (
              <tr key={p.id} className={p.visible ? "" : "bg-bg/60 text-muted"}>
                <td className="px-5 py-3 font-semibold text-brand">{p.code}</td>
                <td className="px-5 py-3">
                  <p className="font-semibold text-ink">{p.name}</p>
                  <p className="text-xs text-muted">
                    {p.brand} · {p.unit} · {p.packaging}
                  </p>
                </td>
                <td className="px-5 py-3">{categoryName.get(p.categoryId) ?? "—"}</td>
                <td className="px-5 py-3">
                  <StorageTag storage={p.storage} />
                </td>
                <td className="px-5 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {!p.visible && <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-semibold text-ink-soft">Hidden</span>}
                    {p.badge && <ProductBadgeTag badge={p.badge} />}
                    {p.featured && <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-[#7a5a00]">Featured</span>}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <form action={toggleProductVisibility}>
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="visible" value={String(!p.visible)} />
                      <button
                        type="submit"
                        className="grid size-10 place-items-center rounded-full text-ink-soft hover:bg-surface-2"
                        title={p.visible ? "Hide from catalogue" : "Show in catalogue"}
                      >
                        {p.visible ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
                        <span className="sr-only">
                          {p.visible ? "Hide" : "Show"} {p.name}
                        </span>
                      </button>
                    </form>
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="grid size-10 place-items-center rounded-full text-ink-soft hover:bg-surface-2"
                      title="Edit"
                    >
                      <Pencil className="size-4" aria-hidden="true" />
                      <span className="sr-only">Edit {p.name}</span>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
