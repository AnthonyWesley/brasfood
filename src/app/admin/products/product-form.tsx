"use client";

import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { FormField } from "@/components/form-field";
import { submitProduct } from "@/lib/actions/admin";
import type { FormState } from "@/lib/actions/auth";
import type { Category, Product } from "@/lib/types";

export function ProductForm({ product, categories }: { product: Product | null; categories: Category[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitProduct, {});
  const errors = state.fieldErrors ?? {};
  // depois de um erro, vale o que foi digitado; antes, o produto salvo
  const value = (key: keyof Product) => state.values?.[key] ?? (product?.[key] == null ? "" : String(product[key]));

  return (
    <form action={action} noValidate className="card mt-6 rounded-2xl p-6 md:p-8">
      {state.error && (
        <p role="alert" className="mb-6 flex items-start gap-3 rounded-2xl bg-danger-soft p-4 text-sm text-danger">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {state.error}
        </p>
      )}
      <input type="hidden" name="id" value={product?.id ?? ""} />

      <div className="grid gap-5 md:grid-cols-3">
        <FormField name="code" label="Code" error={errors.code}>
          {(p) => <input {...p} name="code" defaultValue={value("code")} className="field uppercase" />}
        </FormField>
        <FormField name="name" label="Name" error={errors.name} className="md:col-span-2">
          {(p) => <input {...p} name="name" defaultValue={value("name")} className="field" />}
        </FormField>
        <FormField name="brand" label="Brand" error={errors.brand}>
          {(p) => <input {...p} name="brand" defaultValue={value("brand")} className="field" />}
        </FormField>
        <FormField name="categoryId" label="Category" error={errors.categoryId}>
          {(p) => (
            <select {...p} name="categoryId" defaultValue={value("categoryId")} className="field">
              <option value="">Choose one</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
        </FormField>
        <FormField name="storage" label="Storage" error={errors.storage}>
          {(p) => (
            <select {...p} name="storage" defaultValue={value("storage")} className="field">
              <option value="">Choose one</option>
              <option value="frozen">Frozen</option>
              <option value="chilled">Chilled</option>
              <option value="ambient">Ambient</option>
            </select>
          )}
        </FormField>
        <FormField name="unit" label="Unit" error={errors.unit} hint="e.g. 1 kg, 12 x 400 g">
          {(p) => <input {...p} name="unit" defaultValue={value("unit")} className="field" />}
        </FormField>
        <FormField name="packaging" label="Packaging" error={errors.packaging} hint="e.g. Case of 12">
          {(p) => <input {...p} name="packaging" defaultValue={value("packaging")} className="field" />}
        </FormField>
        <FormField name="origin" label="Origin">
          {(p) => (
            <select {...p} name="origin" defaultValue={value("origin") || "Brazil"} className="field">
              <option>Brazil</option>
              <option>Portugal</option>
              <option>UK</option>
            </select>
          )}
        </FormField>
        <FormField name="description" label="Description" className="md:col-span-3">
          {(p) => <textarea {...p} name="description" defaultValue={value("description")} rows={3} className="field py-3" />}
        </FormField>
        <FormField
          name="image"
          label={<>Image <span className="font-normal text-muted">(optional)</span></>}
          error={errors.image}
          hint="Path or link for now. Upload to storage comes with the backend."
          className="md:col-span-2"
        >
          {(p) => <input {...p} name="image" defaultValue={value("image")} placeholder="/products/pao-de-queijo.jpg" className="field" />}
        </FormField>
        <FormField
          name="casePrice"
          label={<>Case price, £ <span className="font-normal text-muted">(optional)</span></>}
          error={errors.casePrice}
        >
          {(p) => <input {...p} name="casePrice" defaultValue={value("casePrice")} inputMode="decimal" className="field" />}
        </FormField>
        <FormField name="badge" label="Label">
          {(p) => (
            <select {...p} name="badge" defaultValue={value("badge")} className="field">
              <option value="">None</option>
              <option value="new">New</option>
              <option value="out-of-stock">Out of stock</option>
              <option value="coming-soon">Coming soon</option>
            </select>
          )}
        </FormField>
      </div>

      <fieldset className="mt-6 flex flex-wrap gap-6">
        <legend className="sr-only">Visibility</legend>
        <label className="flex items-center gap-2.5 text-sm font-medium">
          <input type="checkbox" name="visible" defaultChecked={product?.visible ?? true} className="size-5 accent-[var(--brand)]" />
          Visible in the catalogue
        </label>
        <label className="flex items-center gap-2.5 text-sm font-medium">
          <input type="checkbox" name="featured" defaultChecked={product?.featured ?? false} className="size-5 accent-[var(--brand)]" />
          Featured on the public site
        </label>
      </fieldset>

      <div className="mt-8 flex gap-3 border-t border-line pt-6">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "Saving…" : product ? "Save changes" : "Create product"}
        </button>
        <Link href="/admin/products" className="btn-light">
          Cancel
        </Link>
      </div>
    </form>
  );
}
