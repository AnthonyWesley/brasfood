import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";
import type { Category } from "@/lib/types";

export function SiteFooter({ categories }: { categories: Pick<Category, "slug" | "name">[] }) {
  const columns = [
    {
      title: "Company",
      links: [
        { href: "/about", label: "About us" },
        { href: "/contact", label: "Contact" },
        { href: "/privacy", label: "Privacy policy" },
      ],
    },
    {
      title: "Products",
      links: categories.map((c) => ({ href: `/products?category=${c.slug}`, label: c.name })),
    },
    {
      title: "Customers",
      links: [
        { href: "/become-a-customer", label: "Open an account" },
        { href: "/login", label: "Customer portal" },
        { href: "/products", label: "Product range" },
      ],
    },
  ];

  return (
    <footer className="mt-20 bg-charcoal text-white">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
        <div>
          <p className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-accent">
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <path d="M12 3 21 12 12 21 3 12Z" fill="var(--charcoal)" />
                <circle cx="12" cy="12" r="4.2" fill="var(--accent)" />
              </svg>
            </span>
            <span className="text-lg font-extrabold tracking-[0.08em]">BRASFOOD</span>
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{site.description}</p>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-sm font-semibold">{column.title}</h2>
            <ul className="mt-4 grid gap-2.5 text-sm text-white/65">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="text-sm font-semibold">Contact</h2>
          <ul className="mt-4 grid gap-3 text-sm text-white/65">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                {site.address.join(", ")}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={site.phoneHref} className="hover:text-accent">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="hover:text-accent">
                {site.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              {site.hours}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-site py-5 text-xs text-white/50">
          © 2026 {site.legalName}. Registered in England and Wales.
        </p>
      </div>
    </footer>
  );
}
