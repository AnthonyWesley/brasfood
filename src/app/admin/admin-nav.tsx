"use client";

import { ClipboardList, LayoutGrid, Package, Tags, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

const items = [
  { href: "/admin", label: "Overview", icon: LayoutGrid },
  { href: "/admin/registrations", label: "Registrations", icon: ClipboardList },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/customers", label: "Customers", icon: Users },
];

/**
 * O caminho atual só existe na requisição (em /admin/products/[id] ele é dinâmico), então
 * o menu sai no HTML estático sem destaque e ganha o item atual quando a URL chega.
 */
export function AdminNav() {
  return (
    <Suspense fallback={<NavList pathname={null} />}>
      <CurrentNav />
    </Suspense>
  );
}

function CurrentNav() {
  return <NavList pathname={usePathname()} />;
}

function NavList({ pathname }: { pathname: string | null }) {
  return (
    <nav aria-label="Admin">
      <ul className="flex gap-1 overflow-x-auto lg:grid lg:overflow-visible">
        {items.map(({ href, label, icon: Icon }) => {
          const current = pathname !== null && (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={current ? "page" : undefined}
                className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium whitespace-nowrap text-ink-soft hover:bg-surface-2 aria-[current=page]:bg-brand aria-[current=page]:text-white"
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
