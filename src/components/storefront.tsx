import { ArrowRight, Lock, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { partners, team } from "@/lib/site";
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
  tone: "yellow" | "brasil" | "brand" | "plum";
  title: ReactNode;
  text: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
}) {
  const tones = {
    yellow: "bg-accent text-ink",
    brasil: "bg-[#17803d] text-white",
    brand: "bg-brand text-white",
    plum: "bg-[#5b1f4f] text-white",
  };
  const button = tone === "yellow" ? "bg-brand text-white hover:bg-brand-strong" : "bg-white text-ink hover:bg-white/90";
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

/** Topo das páginas internas: faixa vermelha com texto e, se houver, foto à direita. */
export function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt = "",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="container-site pt-6">
      <div className={`grid overflow-hidden rounded-[var(--radius-card)] bg-brand text-white ${image ? "md:grid-cols-[1.15fr_1fr]" : ""}`}>
        <div className="flex flex-col justify-center p-8 md:p-12">
          <p className="inline-flex self-start rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent ring-1 ring-white/15">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-3xl leading-[1.08] font-extrabold md:text-5xl">{title}</h1>
          {text && <p className="mt-4 max-w-xl leading-relaxed text-white/80">{text}</p>}
          {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
        </div>
        {image && (
          <div className="relative min-h-56">
            <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
            <div className="absolute inset-y-0 left-0 hidden w-20 bg-gradient-to-r from-brand to-transparent md:block" />
          </div>
        )}
      </div>
    </section>
  );
}

/** Cartões de diferencial com borda amarela (a faixa de "features" do Freshora). */
export function FeatureList({ items, columns = "sm:grid-cols-2 lg:grid-cols-4" }: { items: { icon: LucideIcon; title: string; text: string }[]; columns?: string }) {
  return (
    <ul className={`grid gap-4 ${columns}`}>
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex gap-4 rounded-2xl p-5 ring-2 ring-accent">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-brand">
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-bold">{title}</h3>
            <p className="mt-1 text-sm text-muted">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function PartnersStrip({ className = "mt-16" }: { className?: string }) {
  return (
    <section className={`${className} border-y border-line py-12`} aria-labelledby="partners">
      <div className="container-site">
        <h2 id="partners" className="text-center text-2xl font-bold">
          Trusted by Brazilian butchers and grocers across the UK
        </h2>
        <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-7">
          {partners.map((p) => (
            <li key={p.name} className="grid h-28 place-items-center rounded-2xl bg-white p-4 ring-1 ring-line">
              <Image src={p.logo} alt={p.name} width={160} height={96} className="max-h-20 w-auto object-contain opacity-90 grayscale transition hover:opacity-100 hover:grayscale-0" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function TeamGrid({ className = "mt-16" }: { className?: string }) {
  return (
    <section className={`${className} border-y border-line py-14`} aria-labelledby="team">
      <div className="container-site">
        <h2 id="team" className="text-center text-2xl font-bold md:text-3xl">
          The people behind your orders
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted">
          A small London team that knows the products — and knows your customers.
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {team.map((person) => (
            <li key={person.name} className="card overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/5] bg-white">
                <Image src={person.photo} alt={person.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover object-top" />
              </div>
              <div className="p-4">
                <p className="font-bold">{person.name}</p>
                <p className="text-sm text-muted">{person.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
