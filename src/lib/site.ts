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
