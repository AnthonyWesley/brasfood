import { ArrowRight, BadgeCheck, Globe, ShieldCheck, Snowflake, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard, PromoBanner, SectionHeader } from "@/components/storefront";
import { getCategories, getPublicProducts } from "@/lib/api";
import { faqs, partners, site, team } from "@/lib/site";
import type { Category, PublicProduct } from "@/lib/types";
import { RangeTabs } from "./range-tabs";

export default async function HomePage() {
  const [categories, products] = await Promise.all([getCategories(), getPublicProducts()]);
  const categoryOf = new Map(categories.map((c) => [c.id, c]));
  const featured = products.filter((p) => p.featured);
  const inCategory = (...ids: string[]) => products.filter((p) => ids.includes(p.categoryId));

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="container-site pt-6">
        <div className="relative grid overflow-hidden rounded-[var(--radius-card)] bg-brand text-white lg:grid-cols-[1fr_1.05fr]">
          <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 lg:py-16">
            <p className="inline-flex self-start rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent ring-1 ring-white/15">
              Brazilian &amp; Portuguese food wholesale
            </p>
            <h1 className="mt-5 text-4xl leading-[1.05] font-extrabold md:text-5xl xl:text-6xl">
              The taste of Brazil, <span className="text-accent">delivered to your business</span>
            </h1>
            <p className="mt-5 max-w-lg leading-relaxed text-white/75">
              Linguiças, queijos, açaí, polpas, mandioca and more — imported and distributed from London to shops,
              butchers and restaurants across the UK.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/become-a-customer" className="btn-accent">
                Open a trade account
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/products" className="btn bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20">
                Browse products
              </Link>
            </div>
          </div>
          <div className="relative min-h-72 lg:min-h-[28rem]">
            <Image
              src="/images/banners/hero-collage.webp"
              alt="Brazilian food: açaí, fruit, pamonha, linguiça and cheese bread"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            {/* emenda o verde do texto com a foto */}
            <div className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-brand to-transparent lg:block" />
          </div>
        </div>
      </section>

      {/* ---------- categorias em círculo ---------- */}
      <section className="container-site mt-10" aria-label="Categories">
        <ul className="flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-7 lg:overflow-visible">
          {categories.map((c) => (
            <li key={c.id} className="shrink-0">
              <Link href={`/products?category=${c.slug}`} className="group flex w-28 flex-col items-center gap-3 text-center lg:w-auto">
                <span className="relative size-24 overflow-hidden rounded-full bg-surface-2 ring-1 ring-line transition-shadow group-hover:ring-2 group-hover:ring-brand md:size-28">
                  {c.image && <Image src={c.image} alt="" fill sizes="112px" className="object-contain p-3" />}
                </span>
                <span className="text-sm font-semibold group-hover:text-brand">{c.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- destaques ---------- */}
      <section className="container-site mt-16" aria-labelledby="featured">
        <SectionHeader id="featured" eyebrow="Best sellers" title="Customer favourites" action={{ href: "/products", label: "View all" }} />
        <ProductRow products={featured} categoryOf={categoryOf} />
      </section>

      {/* ---------- par de banners ---------- */}
      <section className="container-site mt-16 grid gap-4 lg:grid-cols-2" aria-label="Promotions">
        <PromoBanner
          tone="lime"
          title={<>Açaí all year round</>}
          text="Mais Fruta and Tastecraft açaí with guaraná, from 200 ml cups to 3.6 kg tubs."
          href="/products?category=acai"
          cta="See açaí & creams"
          image="/images/banners/category-d.webp"
          imageAlt="Açaí cream tubs in several sizes"
        />
        <PromoBanner
          tone="red"
          title={<>Ten tropical fruit pulps</>}
          text="Maracujá, açaí, cupuaçu, manga, caju, graviola and more — 5 x 400 g packs."
          href="/products?category=fruit-pulp"
          cta="See fruit pulps"
          image="/images/banners/category-e.webp"
          imageAlt="Mais Fruta frozen fruit pulp packs"
        />
      </section>

      {/* ---------- vitrine por categoria ---------- */}
      <section className="container-site mt-16" aria-labelledby="range">
        <SectionHeader id="range" title="Explore our range" action={{ href: "/products", label: "View all" }} />
        <RangeTabs categories={categories} products={products} />
      </section>

      {/* ---------- parceiros ---------- */}
      <section className="mt-16 bg-surface-2 py-12" aria-labelledby="partners">
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

      {/* ---------- destaque: açougue ---------- */}
      <section className="container-site mt-16" aria-labelledby="butcher">
        <div className="grid gap-4 lg:grid-cols-[1fr_2.4fr]">
          <div className="relative flex min-h-80 flex-col overflow-hidden rounded-[var(--radius-card)] bg-accent p-7">
            <h2 id="butcher" className="relative z-10 text-3xl leading-tight font-extrabold">
              Stock your butcher counter
            </h2>
            <p className="relative z-10 mt-3 max-w-xs text-sm text-ink-soft">
              Artisan linguiças, carne seca, bacon and the feijoada kit your customers ask for every week.
            </p>
            <Link href="/products?category=sausages" className="btn-primary relative z-10 mt-5 self-start">
              Shop sausages
            </Link>
            <div className="relative mt-6 -mr-7 -mb-7 min-h-44 flex-1">
              <Image src="/images/banners/category-j.webp" alt="Brazilian artisan sausages" fill sizes="(min-width: 1024px) 25vw, 100vw" className="rounded-tl-2xl object-cover" />
            </div>
          </div>
          <ProductRow products={inCategory("sausages", "charcuterie").slice(0, 4)} categoryOf={categoryOf} columns="sm:grid-cols-2 xl:grid-cols-4" bare />
        </div>
      </section>

      {/* ---------- diferenciais ---------- */}
      <section className="container-site mt-16" aria-label="Why Brasfood">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Snowflake, title: "Cold-chain delivery", text: "Frozen and chilled goods kept at temperature from our warehouse to yours." },
            { icon: ShieldCheck, title: "Trade-only pricing", text: "Prices and pack sizes for approved business customers." },
            { icon: Globe, title: "Imported direct", text: "The brands Brazilian and Portuguese customers already know." },
            { icon: Truck, title: "London & UK-wide", text: "London routes, plus nationwide delivery quoted with your invoice." },
          ].map(({ icon: Icon, title, text }) => (
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
      </section>

      {/* ---------- congelados e mandioca ---------- */}
      <section className="container-site mt-16" aria-labelledby="frozen">
        <SectionHeader id="frozen" eyebrow="From the freezer" title="Savouries, pamonha & cassava" action={{ href: "/products?category=frozen", label: "View all" }} />
        <ProductRow products={inCategory("frozen", "cassava")} categoryOf={categoryOf} />
      </section>

      {/* ---------- equipe (no lugar dos depoimentos) ---------- */}
      <section className="mt-16 bg-surface-2 py-14" aria-labelledby="team">
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
                <div className="relative aspect-[4/5] bg-surface-2">
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

      {/* ---------- banner largo ---------- */}
      <section className="container-site mt-16 grid gap-4 lg:grid-cols-[1.6fr_1fr]" aria-label="Open an account">
        <PromoBanner
          tone="plum"
          title={<>Open a trade account — it&apos;s free</>}
          text="Register your business in two minutes. We review every request, usually within one working day."
          href="/become-a-customer"
          cta="Become a customer"
          image="/images/banners/category-g.webp"
          imageAlt="Queijo minas and coalho cheeses"
        />
        <div className="relative min-h-64 overflow-hidden rounded-[var(--radius-card)] bg-charcoal text-white">
          <Image src="/images/banners/cargo-ship.webp" alt="Container ship at sea" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover opacity-55" />
          <div className="relative flex h-full flex-col justify-end p-7">
            <BadgeCheck className="size-8 text-accent" aria-hidden="true" />
            <p className="mt-3 text-2xl font-extrabold">Imported direct from Brazil</p>
            <Link href="/about" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
              About Brasfood
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- cremes e polpas ---------- */}
      <section className="container-site mt-16" aria-labelledby="acai">
        <SectionHeader id="acai" eyebrow="Summer best sellers" title="Açaí, creams & fruit pulps" action={{ href: "/products?category=acai", label: "View all" }} />
        <ProductRow products={inCategory("acai", "fruit-pulp").filter((_, i) => i % 2 === 0)} categoryOf={categoryOf} />
      </section>

      {/* ---------- perguntas ---------- */}
      <section className="container-site mt-16 max-w-4xl" aria-labelledby="faq">
        <h2 id="faq" className="text-center text-2xl font-bold md:text-3xl">
          Answers to common questions
        </h2>
        <div className="mt-8 grid gap-3">
          {faqs.map((item, index) => (
            <details key={item.q} className="group card rounded-2xl" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold">
                {item.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 text-lg transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          Still have questions?{" "}
          <Link href="/contact" className="font-semibold text-brand hover:underline">
            Contact our sales team
          </Link>{" "}
          or call {site.phone}.
        </p>
      </section>

      {/* ---------- chamada final ---------- */}
      <section className="container-site mt-16" aria-labelledby="cta">
        <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-accent-soft px-6 py-14 text-center">
          <div className="pointer-events-none absolute inset-y-0 -left-10 hidden w-72 md:block">
            <Image src="/images/products/maracuja-1.webp" alt="" fill sizes="288px" className="object-contain mix-blend-multiply" />
          </div>
          <div className="pointer-events-none absolute inset-y-0 -right-10 hidden w-72 md:block">
            <Image src="/images/products/queijo-minas-padrao.webp" alt="" fill sizes="288px" className="object-contain mix-blend-multiply" />
          </div>
          <h2 id="cta" className="relative text-3xl font-extrabold md:text-4xl">
            Get the full <span className="text-brand">Brasfood catalogue</span>
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-muted">
            Trade prices, product codes and pack sizes for every line, in one place.
          </p>
          <Link href="/become-a-customer" className="btn-primary relative mt-7">
            Open a free account
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

function ProductRow({
  products,
  categoryOf,
  columns = "sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
  bare = false,
}: {
  products: PublicProduct[];
  categoryOf: Map<string, Category>;
  columns?: string;
  bare?: boolean;
}) {
  return (
    // no celular vira carrossel com rolagem lateral, no desktop uma grade
    <ul className={`${bare ? "" : "mt-6 "}-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 ${columns}`}>
      {products.slice(0, 6).map((p) => (
        <li key={p.id} className="w-44 shrink-0 snap-start sm:w-auto">
          <ProductCard product={p} category={categoryOf.get(p.categoryId)} />
        </li>
      ))}
    </ul>
  );
}
