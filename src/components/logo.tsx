import Image from "next/image";
import Link from "next/link";

/** O "B" vermelho da Brasfood (do favicon do site atual) + o nome. Troca pelo SVG oficial quando chegar. */
export function BrandMark({ className = "size-9" }: { className?: string }) {
  return (
    <Image src="/images/brand/brasfood-mark.webp" alt="" width={64} height={64} className={`rounded-xl ${className}`} />
  );
}

export function Logo({ href = "/", subtitle }: { href?: string; subtitle?: string }) {
  return (
    <Link href={href} className="group flex items-center gap-2.5" aria-label="Brasfood home">
      <BrandMark />
      <span className="leading-none">
        <span className="block text-lg font-extrabold tracking-[0.08em] text-ink">BRASFOOD</span>
        {subtitle && <span className="mt-1 block text-[11px] font-medium tracking-wide text-muted">{subtitle}</span>}
      </span>
    </Link>
  );
}
