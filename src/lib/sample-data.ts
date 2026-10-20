import type { Category, Product, Registration, User } from "./types";

// DADOS DE EXEMPLO. Categorias e tipos de produto seguem o que o brasfood.co.uk vende hoje
// (queijos, refeições prontas, milho, mandioca, polpas, carnes); marcas, códigos, embalagens
// e preços são fictícios e saem quando o backend entrar.

export const categories: Category[] = [
  { id: "c1", slug: "cheese-dairy", name: "Cheese & dairy", description: "Queijo minas, coalho, requeijão and more.", icon: "cheese" },
  { id: "c2", slug: "ready-meals", name: "Ready meals", description: "Feijoada kits, escondidinho and family classics.", icon: "meal" },
  { id: "c3", slug: "corn", name: "Corn products", description: "Pamonha, curau and sweet corn favourites.", icon: "corn" },
  { id: "c4", slug: "cassava", name: "Cassava", description: "Peeled, cut and pre-cooked mandioca.", icon: "root" },
  { id: "c5", slug: "fruit-pulp", name: "Fruit pulp", description: "Frozen pulps for juices, smoothies and desserts.", icon: "fruit" },
  { id: "c6", slug: "meat", name: "Meat & charcuterie", description: "Linguiça, charque and Brazilian cuts.", icon: "meat" },
  { id: "c7", slug: "bakery", name: "Bakery", description: "Pão de queijo, breads and cakes, ready to bake.", icon: "bakery" },
  { id: "c8", slug: "savouries", name: "Savouries", description: "Coxinha, pastel, kibe and party snacks.", icon: "snack" },
  { id: "c9", slug: "drinks", name: "Drinks", description: "Guaraná, sodas and Portuguese classics.", icon: "drink" },
  { id: "c10", slug: "grocery", name: "Grocery", description: "Farofa, beans, seasonings and pantry staples.", icon: "grocery" },
];

type Seed = Omit<Product, "id" | "slug" | "visible" | "image"> & { visible?: boolean };

const seeds: Seed[] = [
  { code: "QJ001", name: "Queijo Minas Frescal", brand: "Sabor da Fazenda", categoryId: "c1", storage: "chilled", unit: "500 g", packaging: "Case of 10", origin: "Brazil", description: "Fresh, mild white cheese from Minas Gerais. Best served sliced for breakfast or with guava paste.", badge: null, featured: true, casePrice: 42.5 },
  { code: "QJ002", name: "Queijo Coalho (skewers)", brand: "Sabor da Fazenda", categoryId: "c1", storage: "frozen", unit: "7 skewers, 350 g", packaging: "Case of 20", origin: "Brazil", description: "Grilling cheese on skewers, the beach-barbecue classic. Holds its shape on the grill.", badge: null, featured: true, casePrice: 61 },
  { code: "QJ003", name: "Requeijão Cremoso", brand: "Mineirinho", categoryId: "c1", storage: "chilled", unit: "200 g", packaging: "Case of 24", origin: "Brazil", description: "Creamy spreadable cheese in a glass jar.", badge: "new", featured: false, casePrice: 38.4 },
  { code: "QJ004", name: "Queijo Prato", brand: "Mineirinho", categoryId: "c1", storage: "chilled", unit: "1 kg block", packaging: "Case of 6", origin: "Brazil", description: "Semi-hard sliceable cheese, ideal for sandwiches and misto quente.", badge: null, featured: false, casePrice: 57 },
  { code: "RM001", name: "Kit Feijoada", brand: "Brasfood Selection", categoryId: "c2", storage: "frozen", unit: "1 kg", packaging: "Case of 10", origin: "Brazil", description: "Black beans with pork cuts and sausage, ready to heat. Serves four.", badge: null, featured: true, casePrice: 69 },
  { code: "RM002", name: "Escondidinho de Carne Seca", brand: "Brasfood Selection", categoryId: "c2", storage: "frozen", unit: "600 g", packaging: "Case of 12", origin: "UK", description: "Cassava mash layered with shredded dried beef.", badge: "new", featured: false, casePrice: 54 },
  { code: "RM003", name: "Bacalhau à Brás", brand: "Casa Lusitana", categoryId: "c2", storage: "frozen", unit: "450 g", packaging: "Case of 12", origin: "Portugal", description: "Shredded salt cod with straw potatoes and egg, the Lisbon favourite.", badge: null, featured: true, casePrice: 72 },
  { code: "MI001", name: "Pamonha Doce", brand: "Do Sertão", categoryId: "c3", storage: "frozen", unit: "6 units", packaging: "Case of 12", origin: "Brazil", description: "Sweet fresh-corn parcels steamed in the husk.", badge: null, featured: true, casePrice: 48 },
  { code: "MI002", name: "Curau de Milho", brand: "Do Sertão", categoryId: "c3", storage: "frozen", unit: "400 g", packaging: "Case of 12", origin: "Brazil", description: "Creamy sweet-corn pudding finished with cinnamon.", badge: "coming-soon", featured: false, casePrice: null },
  { code: "MI003", name: "Milho Verde (cobs)", brand: "Do Sertão", categoryId: "c3", storage: "frozen", unit: "4 cobs", packaging: "Case of 15", origin: "Brazil", description: "Whole sweet-corn cobs, blanched and frozen.", badge: null, featured: false, casePrice: 33 },
  { code: "MD001", name: "Mandioca Descascada", brand: "Brasfood Selection", categoryId: "c4", storage: "frozen", unit: "1 kg", packaging: "Case of 10", origin: "Brazil", description: "Peeled cassava chunks, ready to boil or fry.", badge: null, featured: true, casePrice: 29.5 },
  { code: "MD002", name: "Mandioca Pré-cozida", brand: "Brasfood Selection", categoryId: "c4", storage: "frozen", unit: "1 kg", packaging: "Case of 10", origin: "Brazil", description: "Pre-cooked cassava, straight to the fryer for crispy mandioca frita.", badge: null, featured: false, casePrice: 34 },
  { code: "MD003", name: "Polvilho Azedo", brand: "Mineirinho", categoryId: "c4", storage: "ambient", unit: "500 g", packaging: "Case of 20", origin: "Brazil", description: "Sour cassava starch for homemade pão de queijo and biscoito.", badge: null, featured: false, casePrice: 36 },
  { code: "PP001", name: "Polpa de Maracujá", brand: "Tropical Polpas", categoryId: "c5", storage: "frozen", unit: "10 x 100 g", packaging: "Case of 12", origin: "Brazil", description: "Passion fruit pulp in single-serve sachets.", badge: null, featured: true, casePrice: 39 },
  { code: "PP002", name: "Polpa de Açaí", brand: "Tropical Polpas", categoryId: "c5", storage: "frozen", unit: "1 kg", packaging: "Case of 10", origin: "Brazil", description: "Unsweetened açaí pulp for bowls and smoothies.", badge: "new", featured: true, casePrice: 85 },
  { code: "PP003", name: "Polpa de Cupuaçu", brand: "Tropical Polpas", categoryId: "c5", storage: "frozen", unit: "10 x 100 g", packaging: "Case of 12", origin: "Brazil", description: "Creamy Amazonian fruit pulp, tangy and aromatic.", badge: "out-of-stock", featured: false, casePrice: 44 },
  { code: "PP004", name: "Polpa de Goiaba", brand: "Tropical Polpas", categoryId: "c5", storage: "frozen", unit: "10 x 100 g", packaging: "Case of 12", origin: "Brazil", description: "Guava pulp for juices and desserts.", badge: null, featured: false, casePrice: 37 },
  { code: "CN001", name: "Linguiça Toscana", brand: "Sabor da Fazenda", categoryId: "c6", storage: "frozen", unit: "1 kg", packaging: "Case of 10", origin: "UK", description: "Coarse pork sausage seasoned the Brazilian way, made in the UK.", badge: null, featured: true, casePrice: 58 },
  { code: "CN002", name: "Charque", brand: "Do Sertão", categoryId: "c6", storage: "ambient", unit: "500 g", packaging: "Case of 20", origin: "Brazil", description: "Salted dried beef for feijoada and arroz carreteiro.", badge: null, featured: false, casePrice: 110 },
  { code: "CN003", name: "Chouriço de Carne", brand: "Casa Lusitana", categoryId: "c6", storage: "chilled", unit: "250 g", packaging: "Case of 20", origin: "Portugal", description: "Smoked Portuguese sausage with paprika and garlic.", badge: null, featured: false, casePrice: 64 },
  { code: "PD001", name: "Pão de Queijo Tradicional", brand: "Mineirinho", categoryId: "c7", storage: "frozen", unit: "1 kg (approx. 40)", packaging: "Case of 8", origin: "Brazil", description: "Cheese bread balls, bake from frozen in 20 minutes.", badge: null, featured: true, casePrice: 52 },
  { code: "PD002", name: "Pão de Queijo Coquetel", brand: "Mineirinho", categoryId: "c7", storage: "frozen", unit: "1 kg (approx. 80)", packaging: "Case of 8", origin: "Brazil", description: "Mini cheese breads for cafés and parties.", badge: null, featured: false, casePrice: 54 },
  { code: "PD003", name: "Bolo de Fubá", brand: "Brasfood Selection", categoryId: "c7", storage: "frozen", unit: "600 g", packaging: "Case of 6", origin: "UK", description: "Cornmeal cake, sliced and ready to thaw.", badge: "new", featured: false, casePrice: 27 },
  { code: "PD004", name: "Pastel de Nata", brand: "Casa Lusitana", categoryId: "c7", storage: "frozen", unit: "12 units", packaging: "Case of 6", origin: "Portugal", description: "Custard tarts, bake from frozen for a crisp, blistered top.", badge: null, featured: true, casePrice: 46 },
  { code: "SG001", name: "Coxinha de Frango", brand: "Brasfood Selection", categoryId: "c8", storage: "frozen", unit: "25 x 45 g", packaging: "Case of 6", origin: "UK", description: "Chicken croquettes, fry or air-fry from frozen.", badge: null, featured: true, casePrice: 49 },
  { code: "SG002", name: "Pastel de Carne", brand: "Brasfood Selection", categoryId: "c8", storage: "frozen", unit: "20 units", packaging: "Case of 6", origin: "UK", description: "Crispy fried pastry filled with seasoned beef.", badge: null, featured: false, casePrice: 47 },
  { code: "SG003", name: "Kibe", brand: "Brasfood Selection", categoryId: "c8", storage: "frozen", unit: "25 units", packaging: "Case of 6", origin: "UK", description: "Bulgur and beef croquettes with mint.", badge: "coming-soon", featured: false, casePrice: null },
  { code: "SG004", name: "Bolinho de Bacalhau", brand: "Casa Lusitana", categoryId: "c8", storage: "frozen", unit: "500 g", packaging: "Case of 10", origin: "Portugal", description: "Salt cod fritters, the Portuguese petisco.", badge: null, featured: false, casePrice: 66 },
  { code: "BB001", name: "Guaraná Antarctica", brand: "Antarctica", categoryId: "c9", storage: "ambient", unit: "350 ml can", packaging: "Case of 24", origin: "Brazil", description: "Brazil's favourite guaraná soda.", badge: null, featured: false, casePrice: 17.5 },
  { code: "BB002", name: "Guaraná (2 L)", brand: "Antarctica", categoryId: "c9", storage: "ambient", unit: "2 L bottle", packaging: "Case of 6", origin: "Brazil", description: "Family-size guaraná soda.", badge: "out-of-stock", featured: false, casePrice: 14 },
  { code: "BB003", name: "Sumol Laranja", brand: "Sumol", categoryId: "c9", storage: "ambient", unit: "330 ml can", packaging: "Case of 24", origin: "Portugal", description: "Portuguese orange soda with real fruit juice.", badge: null, featured: false, casePrice: 16 },
  { code: "MC001", name: "Farofa Pronta", brand: "Do Sertão", categoryId: "c10", storage: "ambient", unit: "500 g", packaging: "Case of 20", origin: "Brazil", description: "Seasoned toasted cassava flour, ready to serve.", badge: null, featured: false, casePrice: 31 },
  { code: "MC002", name: "Feijão Carioca", brand: "Do Sertão", categoryId: "c10", storage: "ambient", unit: "1 kg", packaging: "Case of 10", origin: "Brazil", description: "Pinto beans, the everyday Brazilian staple.", badge: null, featured: false, casePrice: 24 },
  { code: "MC003", name: "Goiabada Cascão", brand: "Mineirinho", categoryId: "c10", storage: "ambient", unit: "600 g", packaging: "Case of 12", origin: "Brazil", description: "Rustic guava paste, perfect with queijo minas.", badge: null, featured: false, casePrice: 33 },
  { code: "MC004", name: "Azeite Extra Virgem", brand: "Casa Lusitana", categoryId: "c10", storage: "ambient", unit: "750 ml", packaging: "Case of 6", origin: "Portugal", description: "Portuguese extra virgin olive oil.", badge: null, featured: false, casePrice: 48 },
];

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const products: Product[] = seeds.map((seed, index) => ({
  ...seed,
  id: `p${index + 1}`,
  slug: `${slugify(seed.name)}-${seed.code.toLowerCase()}`,
  image: null,
  visible: seed.visible ?? true,
}));

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
