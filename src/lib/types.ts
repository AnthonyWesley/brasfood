// Formatos que o backend (Node + PostgreSQL) vai devolver. Enquanto ele não existe,
// src/lib/sample-data.ts preenche estes mesmos tipos.

export type Storage = "frozen" | "chilled" | "ambient";

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** nome do ícone em src/components/category-icon.tsx */
  icon: CategoryIcon;
};

export type CategoryIcon =
  | "cheese"
  | "meal"
  | "corn"
  | "root"
  | "fruit"
  | "meat"
  | "bakery"
  | "snack"
  | "drink"
  | "grocery";

export type ProductBadge = "new" | "out-of-stock" | "coming-soon";

export type Product = {
  id: string;
  slug: string;
  /** código interno da Brasfood, o que o cliente usa no pedido */
  code: string;
  name: string;
  brand: string;
  categoryId: string;
  storage: Storage;
  /** unidade de venda: "1 kg", "500 g", "12 x 400 g" */
  unit: string;
  /** embalagem do atacado: "Case of 12" */
  packaging: string;
  origin: "Brazil" | "Portugal" | "UK";
  description: string;
  /** caminho em /public ou URL do storage S3; null mostra o ícone da categoria */
  image: string | null;
  badge: ProductBadge | null;
  /** aparece na prévia pública (sem nada comercial) */
  featured: boolean;
  /** escondido do catálogo sem apagar */
  visible: boolean;
  /** preço por caixa em libras; só aparece no portal se PORTAL_SHOW_PRICES=true */
  casePrice: number | null;
};

/** O que a página pública pode ver de um produto: nada de código, embalagem ou preço. */
export type PublicProduct = Pick<Product, "id" | "name" | "brand" | "categoryId" | "storage" | "image">;

export const businessTypes = [
  "Supermarket",
  "Restaurant",
  "Grocery / convenience store",
  "Café / bakery",
  "Butcher",
  "Distributor / wholesaler",
  "Online store",
  "Other",
] as const;
export type BusinessType = (typeof businessTypes)[number];

export type RegistrationStatus = "pending" | "approved" | "rejected";

export type Registration = {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  businessType: BusinessType;
  /** Companies House; opcional (sole traders não têm) */
  companyNumber: string | null;
  status: RegistrationStatus;
  /** ISO 8601 */
  createdAt: string;
  reviewedAt: string | null;
  rejectionReason: string | null;
};

export type Role = "admin" | "customer";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  /** cliente: o cadastro que originou a conta */
  registrationId: string | null;
};

/** O que vai dentro do JWT e chega aos componentes. Nada sensível. */
export type SessionUser = Pick<User, "id" | "name" | "email" | "role">;
