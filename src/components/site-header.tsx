"use client";

import { ChevronDown, LayoutGrid, Lock, MapPin, Menu, Phone, Search, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { announcement, publicNav, site } from "@/lib/site";
import type { Category } from "@/lib/types";
import { Logo } from "./logo";

export function SiteHeader({ categories }: { categories: Pick<Category, "slug" | "name">[] }) {
  const pathname = usePathname();
  // guarda em qual página o menu foi aberto: ao trocar de página ele fecha sozinho,
  // sem efeito (com Activity a árvore anterior continua montada)
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 bg-surface shadow-[0_1px_0_var(--line)]">
      <p className="bg-brand px-4 py-2 text-center text-xs font-medium text-white">{announcement}</p>

      <div className="container-site flex items-center gap-4 py-3 lg:gap-8">
        <Logo />

        {/* busca na prévia pública; GET, então funciona sem JavaScript */}
        <form action="/products" role="search" className="relative hidden flex-1 md:block">
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <input
            id="site-search"
            type="search"
            name="q"
            placeholder="Search for products, e.g. açaí, linguiça, queijo"
            className="field rounded-full bg-white pr-12 pl-5"
          />
          <button type="submit" className="absolute top-1/2 right-1.5 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-brand text-white hover:bg-brand-strong">
            <Search className="size-4" aria-hidden="true" />
            <span className="sr-only">Search</span>
          </button>
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <span className="hidden items-center gap-2 text-sm xl:flex">
            <MapPin className="size-4 text-brand" aria-hidden="true" />
            <span className="leading-tight">
              <span className="block text-xs text-muted">Delivering from</span>
              <span className="font-semibold">London, UK-wide</span>
            </span>
          </span>
          <Link href="/login" className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold hover:bg-surface-2">
            <User className="size-5" aria-hidden="true" />
            <span className="hidden sm:inline">Sign in</span>
          </Link>
          <Link href="/become-a-customer" className="btn-primary hidden sm:inline-flex">
            Open an account
          </Link>
          <button
            type="button"
            onClick={() => setOpenedOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-11 place-items-center rounded-full hover:bg-surface-2 lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {/* segunda linha: categorias + navegação + telefone (desktop) */}
      <div className="hidden border-t border-line lg:block">
        <div className="container-site flex h-12 items-center gap-6 text-sm">
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold text-brand">
              <LayoutGrid className="size-4" aria-hidden="true" />
              All categories
              <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <ul className="card absolute top-full left-0 z-50 mt-3 grid w-64 gap-0.5 p-2 shadow-xl">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/products?category=${c.slug}`} className="block rounded-lg px-3 py-2 hover:bg-surface-2">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <nav aria-label="Main">
            <ul className="flex items-center gap-1">
              {publicNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="rounded-full px-3 py-1.5 font-medium text-ink-soft hover:text-brand aria-[current=page]:text-brand aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a href={site.phoneHref} className="ml-auto inline-flex items-center gap-2 font-semibold hover:text-brand">
            <Phone className="size-4 text-brand" aria-hidden="true" />
            {site.phone}
          </a>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-line bg-surface lg:hidden">
          <div className="container-site grid gap-1 py-3">
            <form action="/products" role="search" className="relative mb-2 md:hidden">
              <label htmlFor="mobile-search" className="sr-only">
                Search products
              </label>
              <input id="mobile-search" type="search" name="q" placeholder="Search products" className="field rounded-full bg-white pl-5" />
            </form>
            {publicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="rounded-xl px-4 py-3 font-medium text-ink-soft hover:bg-surface-2 aria-[current=page]:bg-brand-soft aria-[current=page]:text-brand-strong"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/become-a-customer" className="btn-primary mt-2">
              <Lock className="size-4" aria-hidden="true" />
              Open an account
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
