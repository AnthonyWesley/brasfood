import "server-only";
import { notifyRegistrationReceived, notifyRegistrationReviewed } from "./email";
import * as sample from "./sample-data";
import type {
  Category,
  Product,
  PublicProduct,
  Registration,
  RegistrationStatus,
  SessionUser,
  Storage,
  User,
} from "./types";

// Camada de acesso a dados. Cada função corresponde a um endpoint do backend Node; hoje
// elas leem/escrevem em memória (src/lib/sample-data.ts). Para ligar no backend, troque o
// corpo de cada uma por um fetch para `${process.env.API_URL}/...` com o JWT da sessão.
//
// Memória do processo: some ao reiniciar e não é dividida entre instâncias — serve para
// demonstrar o fluxo, não para produção.

const db = {
  categories: [...sample.categories],
  products: [...sample.products],
  registrations: [...sample.registrations],
  users: [...sample.users],
  /** senha escolhida no cadastro, guardada até a aprovação criar a conta */
  pendingPasswords: new Map<string, string>(),
};

const delay = () => new Promise((r) => setTimeout(r, 120));

/** PORTAL_SHOW_PRICES=true mostra preço por caixa no portal. Ainda a definir com a Brasfood. */
export const showPrices = process.env.PORTAL_SHOW_PRICES === "true";

// ---------- público (sem login) ----------

export async function getCategories(): Promise<Category[]> {
  return db.categories;
}

const toPublic = ({ id, name, brand, categoryId, storage, image }: Product): PublicProduct => ({
  id,
  name,
  brand,
  categoryId,
  storage,
  image,
});

/** GET /public/products — só nome, marca, categoria e foto. */
export async function getPublicProducts(options: { featuredOnly?: boolean } = {}): Promise<PublicProduct[]> {
  return db.products.filter((p) => p.visible && (!options.featuredOnly || p.featured)).map(toPublic);
}

export async function getCatalogueStats() {
  const visible = db.products.filter((p) => p.visible);
  return {
    products: visible.length,
    brands: new Set(visible.map((p) => p.brand)).size,
    categories: db.categories.length,
  };
}

// ---------- portal (cliente aprovado) ----------

export type CatalogueFilters = { q?: string; category?: string; brand?: string; storage?: Storage };

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

/** GET /catalogue — exige sessão; quem chama já passou por requireCustomer(). */
export async function getCatalogue(_user: SessionUser, filters: CatalogueFilters) {
  await delay();
  const needle = normalize(filters.q?.trim() ?? "");
  const category = db.categories.find((c) => c.slug === filters.category);
  const items = db.products.filter(
    (p) =>
      p.visible &&
      (!category || p.categoryId === category.id) &&
      (!filters.brand || p.brand === filters.brand) &&
      (!filters.storage || p.storage === filters.storage) &&
      (!needle || normalize(`${p.name} ${p.brand} ${p.code}`).includes(needle)),
  );
  const brands = [...new Set(db.products.filter((p) => p.visible).map((p) => p.brand))].sort();
  return { items, brands, category: category ?? null };
}

/** GET /catalogue/:slug */
export async function getCatalogueProduct(_user: SessionUser, slug: string): Promise<Product | null> {
  await delay();
  return db.products.find((p) => p.slug === slug && p.visible) ?? null;
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return db.products.filter((p) => p.visible && p.categoryId === product.categoryId && p.id !== product.id).slice(0, limit);
}

export async function getAccount(user: SessionUser) {
  const record = db.users.find((u) => u.id === user.id);
  const registration = record?.registrationId
    ? (db.registrations.find((r) => r.id === record.registrationId) ?? null)
    : null;
  return { user, registration };
}

// ---------- cadastro e login ----------

export type NewRegistration = Omit<Registration, "id" | "status" | "createdAt" | "reviewedAt" | "rejectionReason"> & {
  password: string;
};

/** POST /registrations */
export async function createRegistration(input: NewRegistration): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const email = input.email.toLowerCase();
  const taken =
    db.users.some((u) => u.email === email) ||
    db.registrations.some((r) => r.email === email && r.status !== "rejected");
  if (taken) return { ok: false, error: "There is already an account or request for this email." };

  const { password, ...data } = input;
  const registration: Registration = {
    ...data,
    email,
    id: `r${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
    reviewedAt: null,
    rejectionReason: null,
  };
  db.registrations.unshift(registration);
  db.pendingPasswords.set(registration.id, password);
  await notifyRegistrationReceived(registration);
  return { ok: true };
}

export type LoginResult =
  | { ok: true; user: SessionUser }
  | { ok: false; reason: "invalid" | "pending" | "rejected"; message?: string };

/** POST /auth/login — o backend devolve o JWT; aqui o front assina o seu. */
export async function authenticate(email: string, password: string): Promise<LoginResult> {
  await delay();
  const normalized = email.trim().toLowerCase();
  const user = db.users.find((u) => u.email === normalized);
  if (user) {
    if (user.password !== password) return { ok: false, reason: "invalid" };
    return { ok: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  }
  // sem conta ainda: diz em que pé está o cadastro, em vez de um "senha errada" genérico
  const registration = db.registrations.find(
    (r) => r.email === normalized && db.pendingPasswords.get(r.id) === password,
  );
  if (registration?.status === "pending") return { ok: false, reason: "pending" };
  if (registration?.status === "rejected")
    return { ok: false, reason: "rejected", message: registration.rejectionReason ?? undefined };
  return { ok: false, reason: "invalid" };
}

// ---------- admin ----------

export async function getRegistrations(status?: RegistrationStatus): Promise<Registration[]> {
  await delay();
  return db.registrations.filter((r) => !status || r.status === status);
}

export async function getAdminOverview() {
  return {
    pending: db.registrations.filter((r) => r.status === "pending").length,
    customers: db.users.filter((u) => u.role === "customer").length,
    products: db.products.length,
    hidden: db.products.filter((p) => !p.visible).length,
    latest: db.registrations.filter((r) => r.status === "pending").slice(0, 5),
  };
}

/** POST /admin/registrations/:id/review — aprovar cria a conta do cliente. */
export async function reviewRegistration(
  id: string,
  decision: "approved" | "rejected",
  reason: string | null,
): Promise<{ ok: boolean; error?: string }> {
  await delay();
  const registration = db.registrations.find((r) => r.id === id);
  if (!registration) return { ok: false, error: "Request not found." };
  if (registration.status !== "pending") return { ok: false, error: "This request was already reviewed." };

  registration.status = decision;
  registration.reviewedAt = new Date().toISOString();
  registration.rejectionReason = decision === "rejected" ? reason : null;

  if (decision === "approved") {
    const user: User & { password: string } = {
      id: `u${Date.now()}`,
      email: registration.email,
      name: registration.contactName,
      role: "customer",
      registrationId: registration.id,
      password: db.pendingPasswords.get(registration.id) ?? "",
    };
    db.users.push(user);
    db.pendingPasswords.delete(registration.id);
  }
  await notifyRegistrationReviewed(registration);
  return { ok: true };
}

export async function getCustomers() {
  return db.users
    .filter((u) => u.role === "customer")
    // campo a campo, para a senha do mock nunca sair daqui
    .map(({ id, email, name, role, registrationId }) => ({
      id,
      email,
      name,
      role,
      registrationId,
      registration: db.registrations.find((r) => r.id === registrationId) ?? null,
    }));
}

export async function getAdminProducts(): Promise<Product[]> {
  await delay();
  return db.products;
}

export async function getAdminProduct(id: string): Promise<Product | null> {
  return db.products.find((p) => p.id === id) ?? null;
}

export type ProductInput = Omit<Product, "id" | "slug" | "image"> & { image: string | null };

/** POST /admin/products ou PUT /admin/products/:id */
export async function saveProduct(id: string | null, input: ProductInput): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  await delay();
  const duplicate = db.products.find((p) => p.code.toLowerCase() === input.code.toLowerCase() && p.id !== id);
  if (duplicate) return { ok: false, error: `Code ${input.code} is already used by "${duplicate.name}".` };

  const slug = `${sample.slugify(input.name)}-${input.code.toLowerCase()}`;
  if (id) {
    const index = db.products.findIndex((p) => p.id === id);
    if (index === -1) return { ok: false, error: "Product not found." };
    db.products[index] = { ...db.products[index], ...input, slug };
    return { ok: true, id };
  }
  const created: Product = { ...input, id: `p${Date.now()}`, slug };
  db.products.unshift(created);
  return { ok: true, id: created.id };
}

export async function setProductVisibility(id: string, visible: boolean) {
  const product = db.products.find((p) => p.id === id);
  if (product) product.visible = visible;
}

/** POST /admin/categories */
export async function createCategory(name: string, description: string): Promise<{ ok: boolean; error?: string }> {
  const slug = sample.slugify(name);
  if (!slug) return { ok: false, error: "Enter a name." };
  if (db.categories.some((c) => c.slug === slug)) return { ok: false, error: "This category already exists." };
  db.categories.push({ id: `c${Date.now()}`, slug, name, description, icon: "grocery" });
  return { ok: true };
}

export async function countProductsByCategory() {
  const counts = new Map<string, number>();
  for (const p of db.products) counts.set(p.categoryId, (counts.get(p.categoryId) ?? 0) + 1);
  return counts;
}
