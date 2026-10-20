import { ArrowLeft, Globe, Mail, Package, Ruler, Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductBadgeTag, StorageTag } from "@/components/badges";
import { ProductVisual } from "@/components/product-visual";
import { getCatalogueProduct, getCategories, getRelatedProducts, showPrices } from "@/lib/api";
import { requireCustomer } from "@/lib/session";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Product" };

export default function ProductPage(props: PageProps<"/catalogue/[slug]">) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <Link href="/catalogue" className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-muted hover:text-brand">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to catalogue
      </Link>
      <Suspense fallback={<div className="card mt-4 h-[28rem] animate-pulse" />}>
        <ProductDetails params={props.params} />
      </Suspense>
    </div>
  );
}

async function ProductDetails({ params }: { params: PageProps<"/catalogue/[slug]">["params"] }) {
  const { slug } = await params;
  const user = await requireCustomer(`/catalogue/${slug}`);
  const product = await getCatalogueProduct(user, slug);
  if (!product) notFound();

  const [categories, related] = await Promise.all([getCategories(), getRelatedProducts(product)]);
  const category = categories.find((c) => c.id === product.categoryId);
  const icon = category?.icon ?? "grocery";

  const specs = [
    { icon: Tag, label: "Product code", value: product.code },
    { icon: Ruler, label: "Unit", value: product.unit },
    { icon: Package, label: "Packaging", value: product.packaging },
    { icon: Globe, label: "Origin", value: product.origin },
  ];
  const orderMail = `mailto:${site.email}?subject=${encodeURIComponent(`Order: ${product.code} ${product.name}`)}`;

  return (
    <>
      <article className="mt-4 grid gap-4 md:grid-cols-[1fr_1.1fr]">
        <div className="card relative overflow-hidden p-3">
          <ProductVisual image={product.image} name={product.name} icon={icon} className="aspect-square rounded-[1.25rem]" sizes="(min-width: 768px) 45vw, 100vw" />
          {product.badge && (
            <span className="absolute top-6 right-6">
              <ProductBadgeTag badge={product.badge} />
            </span>
          )}
        </div>
        <div className="card flex flex-col p-6 md:p-10">
          <p className="text-sm font-medium text-muted">
            {category?.name} · {product.brand}
          </p>
          <h1 className="mt-2 text-3xl leading-tight font-extrabold md:text-4xl">{product.name}</h1>
          <div className="mt-4">
            <StorageTag storage={product.storage} />
          </div>
          <p className="mt-6 leading-relaxed text-ink-soft">{product.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-3">
            {specs.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl bg-bg p-4">
                <dt className="flex items-center gap-2 text-xs text-muted">
                  <Icon className="size-3.5" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-1 font-semibold">{value}</dd>
              </div>
            ))}
          </dl>

          {showPrices && product.casePrice !== null && (
            <p className="mt-6 text-2xl font-extrabold">
              {new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(product.casePrice)}
              <span className="ml-2 text-sm font-medium text-muted">per case, ex. VAT</span>
            </p>
          )}

          <div className="mt-auto pt-8">
            {product.badge === "out-of-stock" || product.badge === "coming-soon" ? (
              <p className="rounded-2xl bg-surface-2 p-4 text-sm text-ink-soft">
                {product.badge === "out-of-stock" ? "Currently out of stock." : "Arriving soon."} Email{" "}
                <a href={orderMail} className="font-semibold text-brand hover:underline">
                  {site.email}
                </a>{" "}
                to reserve.
              </p>
            ) : (
              <a href={orderMail} className="btn-primary w-full sm:w-auto">
                <Mail className="size-4" aria-hidden="true" />
                Order this product
              </a>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-12" aria-labelledby="related">
          <h2 id="related" className="text-xl font-extrabold">
            More in {category?.name}
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {related.map((item) => (
              <li key={item.id} className="card relative overflow-hidden rounded-2xl">
                <ProductVisual image={item.image} name={item.name} icon={icon} className="m-2 aspect-square rounded-xl" />
                <div className="px-4 pb-4">
                  <p className="text-xs font-semibold text-brand">{item.code}</p>
                  <Link href={`/catalogue/${item.slug}`} className="mt-1 block text-sm font-semibold after:absolute after:inset-0">
                    {item.name}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
