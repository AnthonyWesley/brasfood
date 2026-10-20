import { ArrowRight, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Category, PublicProduct } from "@/lib/types";
import { StorageTag } from "./badges";
import { ProductVisual } from "./product-visual";

/** Card da vitrine pública. O botão leva à ficha no portal (login antes, se precisar). */
export function ProductCard({ product, category }: { product: PublicProduct; category: Category | undefined }) {
  return (
    <article className="card group relative flex h-full flex-col overflow-hidden rounded-2xl transition-shadow hover:shadow-lg">
      <div className="absolute top-3 left-3 z-10">
        <StorageTag storage={product.storage} />
      </div>
      <ProductVisual
        image={product.image}
        name={product.name}
        icon={category?.icon ?? "grocery"}
        className="aspect-square transition-transform duration-300 group-hover:scale-[1.03]"
        sizes="(min-width: 1280px) 16vw, (min-width: 768px) 25vw, 50vw"
      />
      <div className="flex flex-1 flex-col px-4 pt-1 pb-4">
        <p className="text-xs text-muted">{product.unit !== "—" ? product.unit : category?.name}</p>
        <h3 className="mt-1 line-clamp-2 text-sm leading-snug font-semibold">{product.name}</h3>
        <p className="mt-1 text-xs text-muted">{product.brand ?? category?.namePt}</p>
        <Link
          href={`/login?next=${encodeURIComponent(`/catalogue/${product.slug}`)}`}
          className="mt-auto flex min-h-10 items-center justify-center gap-2 rounded-lg bg-brand text-xs font-semibold text-white transition-colors hover:bg-brand-strong"
          aria-label={`Trade price for ${product.name} — sign in`}
        >
          <Lock className="size-3.5" aria-hidden="true" />
          Trade price
        </Link>
      </div>
    </article>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  action,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && <p className="mb-2 inline-flex rounded-md bg-danger-soft px-2 py-0.5 text-xs font-semibold text-danger">{eyebrow}</p>}
        <h2 id={id} className="text-2xl font-bold md:text-3xl">
          {title}
        </h2>
      </div>
      {action && (
        <Link href={action.href} className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold ring-1 ring-line hover:bg-surface-2">
          {action.label}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

/** Banner promocional com texto à esquerda e foto à direita (os pares coloridos do Freshora). */
export function PromoBanner({
  tone,
  title,
  text,
  href,
  cta,
  image,
  imageAlt,
}: {
  tone: "lime" | "red" | "green" | "plum";
  title: ReactNode;
  text: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
}) {
  const tones = {
    lime: "bg-accent text-ink",
    red: "bg-[#c8332f] text-white",
    green: "bg-brand text-white",
    plum: "bg-[#5b1f4f] text-white",
  };
  const button = tone === "lime" ? "bg-brand text-white hover:bg-brand-strong" : "bg-white text-ink hover:bg-white/90";
  return (
    <div className={`relative grid min-h-64 overflow-hidden rounded-[var(--radius-card)] sm:grid-cols-[1.1fr_1fr] ${tones[tone]}`}>
      <div className="relative z-10 flex flex-col justify-center p-7 md:p-9">
        <h3 className="text-2xl leading-tight font-extrabold md:text-3xl">{title}</h3>
        <p className="mt-3 max-w-xs text-sm opacity-85">{text}</p>
        <Link href={href} className={`btn mt-6 self-start ${button}`}>
          {cta}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="relative min-h-48">
        <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover object-[50%_85%]" />
      </div>
    </div>
  );
}
