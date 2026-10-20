"use client";

import { Lock, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { publicNav } from "@/lib/site";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  // guarda em qual página o menu foi aberto: ao trocar de página ele fecha sozinho,
  // sem efeito (com Activity a árvore anterior continua montada)
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = (toggle: (v: boolean) => boolean) => setOpenedOn(toggle(open) ? pathname : null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 pt-3">
      <div className="container-site">
        <div className="flex h-16 items-center justify-between gap-4 rounded-full bg-surface/90 pr-2 pl-4 shadow-[0_1px_0_var(--line),0_8px_24px_-16px_rgb(0_0_0/0.25)] backdrop-blur">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {publicNav.slice(1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink aria-[current=page]:bg-brand-soft aria-[current=page]:text-brand-strong"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/login" className="btn-dark hidden sm:inline-flex">
              <Lock className="size-4" aria-hidden="true" />
              Customer portal
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full text-ink hover:bg-surface-2 lg:hidden"
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-menu" aria-label="Main" className="card mt-2 p-3 shadow-lg lg:hidden">
            <ul className="grid gap-1">
              {publicNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="block rounded-2xl px-4 py-3 font-medium text-ink-soft hover:bg-surface-2 aria-[current=page]:bg-brand-soft aria-[current=page]:text-brand-strong"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-1">
                <Link href="/login" className="btn-dark w-full">
                  <Lock className="size-4" aria-hidden="true" />
                  Customer portal
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
