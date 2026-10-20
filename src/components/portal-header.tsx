import { LayoutGrid, LogOut, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { logout } from "@/lib/actions/auth";
import { getSessionUser } from "@/lib/session";
import { Logo } from "./logo";

/** Cabeçalho do portal e do admin. A parte que lê a sessão entra por streaming. */
export function PortalHeader({ area }: { area: "portal" | "admin" }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-6">
        <Logo href={area === "admin" ? "/admin" : "/catalogue"} subtitle={area === "admin" ? "Admin" : "Wholesale portal"} />
        <Suspense fallback={<div className="h-10 w-48 animate-pulse rounded-full bg-surface-2" />}>
          <UserMenu area={area} />
        </Suspense>
      </div>
    </header>
  );
}

async function UserMenu({ area }: { area: "portal" | "admin" }) {
  const user = await getSessionUser();
  if (!user) return null;

  const links = [
    { href: "/catalogue", label: "Catalogue", icon: LayoutGrid },
    { href: "/account", label: "My account", icon: User },
    ...(user.role === "admin" ? [{ href: "/admin", label: "Admin", icon: ShieldCheck }] : []),
  ];

  return (
    <nav aria-label="Portal" className="flex items-center gap-1">
      {links.map(({ href, label, icon: Icon }) => {
        const current = area === "admin" ? href === "/admin" : false;
        return (
          <Link
            key={href}
            href={href}
            aria-current={current ? "page" : undefined}
            className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-ink-soft hover:bg-surface-2 hover:text-ink aria-[current=page]:bg-brand-soft aria-[current=page]:text-brand-strong"
          >
            <Icon className="size-4" aria-hidden="true" />
            <span className="hidden md:inline">{label}</span>
          </Link>
        );
      })}
      <span className="mx-2 hidden h-6 w-px bg-line md:block" aria-hidden="true" />
      <span className="hidden text-sm text-muted lg:inline">{user.name}</span>
      <form action={logout}>
        <button
          type="submit"
          className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-ink-soft hover:bg-surface-2 hover:text-ink"
        >
          <LogOut className="size-4" aria-hidden="true" />
          <span className="hidden md:inline">Sign out</span>
        </button>
      </form>
    </nav>
  );
}
