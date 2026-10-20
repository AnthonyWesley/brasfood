import { catalogProducts } from "./catalog-data";
import type { Category, Product, Registration, User } from "./types";

// Categorias e produtos são os REAIS da loja atual (src/lib/catalog-data.ts, gerado da API
// do brasfood.co.uk). Cadastros e contas de teste abaixo continuam fictícios.

const banner = (n: string) => `/images/banners/category-${n}.webp`;
const photo = (n: string) => `/images/products/${n}.webp`;

export const categories: Category[] = [
  { id: "sausages", slug: "sausages", name: "Sausages", namePt: "Linguiças", description: "Artisan linguiças: Toscana, chicken, pork, beef, with cheese or pequi.", icon: "meat", banner: banner("j"), image: photo("toscana-1") },
  { id: "cheese", slug: "cheese", name: "Cheese", namePt: "Queijos", description: "Queijo minas padrão and frescal, and coalho for the barbecue.", icon: "cheese", banner: banner("g"), image: photo("queijo-minas-padrao") },
  { id: "charcuterie", slug: "charcuterie", name: "Charcuterie", namePt: "Charcutaria", description: "Calabresa, carne seca, bacon, mortadela and the feijoada kit.", icon: "meat", banner: banner("k"), image: photo("chouricao") },
  { id: "frozen", slug: "frozen", name: "Frozen savouries", namePt: "Congelados", description: "Coxinha, rissoles, pamonha, pastel dough, okra and pequi.", icon: "snack", banner: banner("n"), image: photo("coxinha") },
  { id: "fruit-pulp", slug: "fruit-pulp", name: "Fruit pulp", namePt: "Polpas", description: "Mais Fruta pulps in ten flavours, 5 x 400 g.", icon: "fruit", banner: banner("e"), image: photo("maracuja-1") },
  { id: "cassava", slug: "cassava", name: "Cassava", namePt: "Mandioca", description: "Okka cassava: chunks, sticks and slices, 12 x 1 kg.", icon: "root", banner: banner("f"), image: photo("1sq-trozo") },
  { id: "acai", slug: "acai", name: "Açaí & creams", namePt: "Cremes de açaí", description: "Açaí with guaraná and cupuaçu cream, from 200 ml to 3.6 kg.", icon: "dessert", banner: banner("d"), image: photo("3600-1") },
];

export const products: Product[] = catalogProducts;

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const daysAgo = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString();

export const registrations: Registration[] = [
  { id: "r1", companyName: "Sabiá Market Ltd", contactName: "Paula Ramos", email: "buying@sabiamarket.example", phone: "020 7946 0101", address: "12 Harrow Road", city: "London", postcode: "W2 1XA", businessType: "Supermarket", companyNumber: "12345678", status: "pending", createdAt: daysAgo(1), reviewedAt: null, rejectionReason: null },
  { id: "r2", companyName: "Cantinho Mineiro", contactName: "José Almeida", email: "jose@cantinhomineiro.example", phone: "07700 900321", address: "4 Station Parade", city: "Swindon", postcode: "SN1 1BD", businessType: "Restaurant", companyNumber: null, status: "pending", createdAt: daysAgo(2), reviewedAt: null, rejectionReason: null },
  { id: "r3", companyName: "Lusitânia Deli", contactName: "Ana Costa", email: "ana@lusitaniadeli.example", phone: "0117 496 0555", address: "88 Gloucester Road", city: "Bristol", postcode: "BS7 8BN", businessType: "Grocery / convenience store", companyNumber: "09876543", status: "pending", createdAt: daysAgo(4), reviewedAt: null, rejectionReason: null },
  { id: "r4", companyName: "Café Brasileirinho", contactName: "Marcos Lima", email: "customer@brasfood.test", phone: "07700 900456", address: "21 Kilburn High Road", city: "London", postcode: "NW6 5SB", businessType: "Café / bakery", companyNumber: "11223344", status: "approved", createdAt: daysAgo(20), reviewedAt: daysAgo(19), rejectionReason: null },
  { id: "r5", companyName: "Quick Mart Express", contactName: "Sam Patel", email: "sam@quickmart.example", phone: "07700 900789", address: "5 High Street", city: "Reading", postcode: "RG1 2AB", businessType: "Other", companyNumber: null, status: "rejected", createdAt: daysAgo(12), reviewedAt: daysAgo(11), rejectionReason: "Outside our delivery area for now." },
];

/**
 * Contas de teste. Senhas em texto só aqui, no mock: o backend guarda hash (argon2/bcrypt)
 * e quem confere a senha é ele.
 */
export const users: (User & { password: string })[] = [
  { id: "u1", email: "admin@brasfood.test", name: "Brasfood Admin", role: "admin", registrationId: null, password: "admin-demo-2026" },
  { id: "u2", email: "customer@brasfood.test", name: "Marcos Lima", role: "customer", registrationId: "r4", password: "customer-demo-2026" },
];
