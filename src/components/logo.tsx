import Link from "next/link";

/** Marca provisória (folha + losango da bandeira) até o logo oficial em SVG chegar. */
export function Logo({ href = "/", subtitle }: { href?: string; subtitle?: string }) {
  return (
    <Link href={href} className="group flex items-center gap-2.5" aria-label="Brasfood home">
      <span className="grid size-9 place-items-center rounded-xl bg-brand text-white transition-colors group-hover:bg-brand-strong">
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path d="M12 3 21 12 12 21 3 12Z" fill="var(--accent)" />
          <circle cx="12" cy="12" r="4.2" fill="currentColor" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block text-lg font-extrabold tracking-[0.08em] text-ink">BRASFOOD</span>
        {subtitle && <span className="mt-1 block text-[11px] font-medium tracking-wide text-muted">{subtitle}</span>}
      </span>
    </Link>
  );
}
