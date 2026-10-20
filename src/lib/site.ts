// Dados da empresa (de brasfood.co.uk) usados no cabeçalho, rodapé, contato e metadados.

export const site = {
  name: "Brasfood",
  legalName: "Brasfood Limited",
  tagline: "Brazilian & Portuguese food wholesale",
  description:
    "London-based importer and wholesale distributor of frozen, chilled and ambient Brazilian and Portuguese food for supermarkets, restaurants and independent retailers across the UK.",
  phone: "020 8451 1188",
  phoneHref: "tel:+442084511188",
  mobile: "075 4584 5411",
  email: "info@brasfood.co.uk",
  address: ["Unit 26 Sapcote Trading Centre", "High Road", "London NW10 2DH"],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Unit+26+Sapcote+Trading+Centre+High+Road+London+NW10+2DH",
  hours: "Mon–Fri 8am–5pm",
};

export const publicNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/products", label: "Our products" },
  { href: "/become-a-customer", label: "Become a customer" },
  { href: "/contact", label: "Contact" },
] as const;

export const storageLabels = {
  frozen: "Frozen",
  chilled: "Chilled",
  ambient: "Ambient",
} as const;

// ---------- conteúdo da v2 (do site atual, brasfood.co.uk) ----------

export const announcement = "Trade accounts only · Free to join · Delivering from London NW10 across the UK";

/** Clientes/parceiros que o site atual mostra em "Our partners". */
export const partners = [
  { name: "Novilho de Ouro", logo: "novilho-de-ouro" },
  { name: "Andrade — The Brazilian Butcher", logo: "andrade" },
  { name: "Mercadão da Carne", logo: "mercadao-da-carne" },
  { name: "Xodó Brazil", logo: "xodo-brazil" },
  { name: "Carlos' Farm Butchery", logo: "carlos-farm" },
  { name: "A Brasileira", logo: "a-brasileira" },
  { name: "Brazilian Shop", logo: "brazilian-shop" },
  { name: "Brazilian Beef", logo: "brazilian-beef" },
  { name: "Empório Brasil", logo: "emporio-brasil" },
  { name: "iBrazil Foods", logo: "ibrazil-foods" },
  { name: "Brazilian Centre", logo: "brazilian-centre" },
  { name: "Mercadin", logo: "mercadin" },
  { name: "Brazilian Point", logo: "brazilian-point" },
  { name: "Butchery & Groceries", logo: "butchery-groceries" },
].map((p) => ({ ...p, logo: `/images/partners/${p.logo}.webp` }));

/** "Our team" do site atual. */
export const team = [
  { name: "Mirene Chiappero", role: "Owner & CEO", photo: "/images/team/mirene-chiappero.webp" },
  { name: "Paulo Souza", role: "Sales Executive", photo: "/images/team/paulo-souza.webp" },
  { name: "Marcio Alexandre", role: "Executive Assistant", photo: "/images/team/marcio-alexandre.webp" },
  { name: "Regina Maria", role: "Finance & Accounts Manager", photo: "/images/team/regina-maria.webp" },
];

/** Perguntas a partir do "our working process" do site atual (pedido, pagamento, entrega). */
export const faqs = [
  {
    q: "Who can open a Brasfood account?",
    a: "Any UK business that sells or serves food: supermarkets, grocery stores, butchers, restaurants, cafés and distributors. Registration is free; we review every request and reply by email.",
  },
  {
    q: "How do I place an order?",
    a: "Once approved, you can order online through the customer portal, by email, or with the help of your sales contact at Brasfood.",
  },
  {
    q: "When do I pay?",
    a: "Invoices are due by the invoice date. We work on a one-in, one-out basis: a new order is released once the previous invoice is settled, and repeated unpaid invoices may lead to the account being suspended.",
  },
  {
    q: "Do you deliver outside London?",
    a: "Yes. For customers outside London we send a delivery quote together with the invoice. Allow at least 10 working days; imported lines can occasionally be held up at customs.",
  },
  {
    q: "Can I see prices before registering?",
    a: "Trade prices, product codes and pack sizes are only shown to approved customers in the portal. Open an account, or contact our sales team for a quote.",
  },
];
