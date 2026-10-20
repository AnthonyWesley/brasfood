"use server";

import { refresh, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createCategory, reviewRegistration, saveProduct, setProductVisibility, type ProductInput } from "@/lib/api";
import { requireAdmin } from "@/lib/session";
import type { ProductBadge, Storage } from "@/lib/types";
import type { FormState } from "./auth";

// Toda action confere a sessão de novo: o proxy e o layout só escondem a tela, quem
// chama a action pode ser qualquer um com o ID dela.

const text = (formData: FormData, name: string) => String(formData.get(name) ?? "").trim();

export async function approveRegistration(formData: FormData) {
  await requireAdmin();
  await reviewRegistration(text(formData, "id"), "approved", null);
  refresh();
}

export async function rejectRegistration(formData: FormData) {
  await requireAdmin();
  await reviewRegistration(text(formData, "id"), "rejected", text(formData, "reason") || null);
  refresh();
}

export async function toggleProductVisibility(formData: FormData) {
  await requireAdmin();
  await setProductVisibility(text(formData, "id"), formData.get("visible") === "true");
  // as páginas públicas também mostram produtos
  revalidatePath("/", "layout");
  refresh();
}

const storages: Storage[] = ["frozen", "chilled", "ambient"];
const badges: ProductBadge[] = ["new", "out-of-stock", "coming-soon"];
const origins = ["Brazil", "Portugal", "UK"] as const;

export async function submitProduct(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const id = text(formData, "id") || null;
  const values = Object.fromEntries(
    ["code", "name", "brand", "categoryId", "storage", "unit", "packaging", "origin", "description", "badge", "casePrice", "image"].map(
      (k) => [k, text(formData, k)],
    ),
  );

  const errors: Record<string, string> = {};
  if (!values.code) errors.code = "Enter the product code.";
  if (!values.name) errors.name = "Enter the product name.";
  if (!values.brand) errors.brand = "Enter the brand.";
  if (!values.categoryId) errors.categoryId = "Choose a category.";
  if (!storages.includes(values.storage as Storage)) errors.storage = "Choose how it's stored.";
  if (!values.unit) errors.unit = "Enter the unit, e.g. 1 kg.";
  if (!values.packaging) errors.packaging = "Enter the packaging, e.g. Case of 12.";
  const price = values.casePrice ? Number(values.casePrice.replace(",", ".")) : null;
  if (price !== null && !(price >= 0)) errors.casePrice = "Enter a price like 42.50, or leave it empty.";
  if (values.image && !/^(\/|https:\/\/)/.test(values.image)) errors.image = "Use a path starting with / or an https:// link.";
  if (Object.keys(errors).length > 0) return { fieldErrors: errors, error: "Please check the highlighted fields.", values };

  const input: ProductInput = {
    code: values.code.toUpperCase(),
    name: values.name,
    brand: values.brand,
    categoryId: values.categoryId,
    storage: values.storage as Storage,
    unit: values.unit,
    packaging: values.packaging,
    origin: origins.find((o) => o === values.origin) ?? "Brazil",
    description: values.description,
    badge: badges.find((b) => b === values.badge) ?? null,
    featured: formData.get("featured") === "on",
    visible: formData.get("visible") === "on",
    casePrice: price,
    image: values.image || null,
  };
  const result = await saveProduct(id, input);
  if (!result.ok) return { error: result.error, fieldErrors: { code: result.error }, values };

  revalidatePath("/", "layout");
  redirect("/admin/products?saved=1");
}

export async function addCategory(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const name = text(formData, "name");
  const description = text(formData, "description");
  const result = await createCategory(name, description);
  if (!result.ok) return { error: result.error, values: { name, description } };
  revalidatePath("/", "layout");
  return {};
}
