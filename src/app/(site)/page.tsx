import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Globe,
  Lock,
  Snowflake,
  Store,
  Truck,
  UtensilsCrossed,
  Warehouse,
} from "lucide-react";
import Link from "next/link";
import { StorageTag } from "@/components/badges";
import { CategoryIconBadge, ProductVisual } from "@/components/product-visual";
import { getCategories, getPublicProducts } from "@/lib/api";
import { site } from "@/lib/site";
import { businessTypes } from "@/lib/types";

export default async function HomePage() {
  const [categories, featured] = await Promise.all([getCategories(), getPublicProducts({ featuredOnly: true })]);
  const iconOf = new Map(categories.map((c) => [c.id, c.icon]));

  return (
    <>
      {/* ---------- hero (bento) ---------- */}
      <section className="container-site pt-6">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          <div className="grid gap-4">
            <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-charcoal p-8 text-white md:p-12">
              <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">Wholesale · London · UK-wide</p>
              <h1 className="mt-5 text-4xl leading-[1.05] font-extrabold md:text-6xl">
                Brazilian &amp; Portuguese food for UK trade.
              </h1>
              <p className="mt-6 max-w-lg leading-relaxed text-white/75">
                {site.legalName} imports and distributes frozen and chilled favourites to supermarkets, restaurants and
                independent retailers. Open a free trade account to browse the full catalogue.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/become-a-customer" className="btn-accent">
                  Open a trade account
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link href="/products" className="btn bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15">
                  See our products
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card relative p-7">
                <Link
                  href="/about"
                  aria-label="About Brasfood"
                  className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-strong"
                >
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </Link>
                <Globe className="size-7 text-brand" aria-hidden="true" />
                <p className="mt-8 text-2xl font-bold">Brazil &amp; Portugal</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Imported direct and stored in our London warehouse, ready for your next order.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-brand p-7 text-white">
                <Snowflake className="size-7 text-accent" aria-hidden="true" />
                <p className="mt-8 text-2xl font-bold">Frozen &amp; chilled</p>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  Cold-chain handling from our warehouse to your door.
                </p>
              </div>
            </div>
          </div>

          {/* parede de categorias: faz o papel da foto grande enquanto as fotos não chegam */}
          <div className="card relative flex flex-col overflow-hidden p-8 md:p-10">
            <h2 className="text-center text-3xl font-extrabold md:text-4xl">A taste of home, by the case</h2>
            <p className="mx-auto mt-3 max-w-sm text-center text-sm text-muted">
              Cheese, ready meals, cassava, fruit pulps, savouries and more — everything your customers ask for.
            </p>
            <ul className="mt-8 grid flex-1 content-center grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
              {categories.slice(0, 8).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="group flex h-full flex-col items-center gap-2 rounded-2xl p-2 text-center transition-colors hover:bg-surface-2"
                  >
                    <CategoryIconBadge icon={category.icon} className="aspect-square w-full" />
                    <span className="text-xs font-medium text-ink-soft group-hover:text-brand">{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-bg px-4 py-2 text-sm font-medium">
                <BadgeCheck className="size-4 text-brand" aria-hidden="true" />
                Trusted importer
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-bg px-4 py-2 text-sm font-medium">
                <Truck className="size-4 text-brand" aria-hidden="true" />
                UK-wide delivery
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- diferenciais ---------- */}
      <section className="container-site mt-24" aria-labelledby="why">
        <div className="max-w-2xl">
          <p className="eyebrow">Why Brasfood</p>
          <h2 id="why" className="mt-3 text-3xl font-extrabold md:text-4xl">
            A specialist distributor, not a generalist.
          </h2>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Globe, title: "Direct imports", text: "Products sourced from Brazil and Portugal, with the brands Brazilian and Portuguese customers already know." },
            { icon: Warehouse, title: "London warehouse", text: "Frozen, chilled and ambient stock held in NW10, so orders go out quickly." },
            { icon: Truck, title: "Delivery across the UK", text: "Regular London routes, plus nationwide delivery quoted with your invoice." },
            { icon: Lock, title: "Trade-only catalogue", text: "Codes, pack sizes and availability are reserved for approved business customers." },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="card p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- destaques ---------- */}
      <section className="container-site mt-24" aria-labelledby="featured">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">Featured products</p>
            <h2 id="featured" className="mt-3 text-3xl font-extrabold md:text-4xl">
              Best sellers across our range
            </h2>
          </div>
          <Link href="/products" className="btn-light">
            View all products
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.slice(0, 8).map((product) => (
            <li key={product.id} className="card overflow-hidden">
              <ProductVisual
                image={product.image}
                name={product.name}
                icon={iconOf.get(product.categoryId) ?? "grocery"}
                className="m-2 aspect-square rounded-[1.25rem]"
              />
              <div className="px-5 pt-2 pb-5">
                <p className="text-xs font-medium text-muted">{product.brand}</p>
                <h3 className="mt-1 leading-snug font-semibold">{product.name}</h3>
                <div className="mt-3">
                  <StorageTag storage={product.storage} />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-center gap-2 text-sm text-muted">
          <Lock className="size-4 text-brand" aria-hidden="true" />
          Product codes, pack sizes and availability are in the{" "}
          <Link href="/login" className="font-semibold text-brand underline-offset-4 hover:underline">
            customer portal
          </Link>
          .
        </p>
      </section>

      {/* ---------- como funciona ---------- */}
      <section className="container-site mt-24" aria-labelledby="how">
        <div className="rounded-[var(--radius-card)] bg-brand p-8 text-white md:p-14">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">How it works</p>
          <h2 id="how" className="mt-3 max-w-2xl text-3xl font-extrabold md:text-4xl">
            From sign-up to your first order
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              { title: "Register your business", text: "Tell us about your company — it takes about two minutes." },
              { title: "We review it", text: "Our team checks every request, usually within one working day." },
              { title: "Get catalogue access", text: "You'll get an email as soon as your account is approved." },
              { title: "Place your orders", text: "Order online, by email or with your account manager." },
            ].map((step, index) => (
              <li key={step.title} className="rounded-3xl bg-white/8 p-6 ring-1 ring-white/15">
                <span className="text-sm font-bold text-accent">0{index + 1}</span>
                <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- para quem ---------- */}
      <section className="container-site mt-24" aria-labelledby="who">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow">Who we supply</p>
            <h2 id="who" className="mt-3 text-3xl font-extrabold md:text-4xl">
              Built for businesses that feed the community.
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-muted">
              From corner shops to restaurant groups, we supply businesses of every size. If you sell or serve food,
              you can apply.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/become-a-customer" className="btn-primary">
                Become a customer
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-light">
                Talk to sales
              </Link>
            </div>
          </div>
          <ul className="flex flex-wrap gap-3">
            {businessTypes
              .filter((type) => type !== "Other")
              .map((type, index) => (
                <li
                  key={type}
                  className="card inline-flex items-center gap-3 rounded-full px-5 py-3.5 text-sm font-semibold"
                >
                  {index % 2 === 0 ? (
                    <Store className="size-4 text-brand" aria-hidden="true" />
                  ) : (
                    <UtensilsCrossed className="size-4 text-brand" aria-hidden="true" />
                  )}
                  {type}
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
