import { ArrowRight, Check, Handshake, RefreshCw, Shuffle, Truck, Warehouse, Globe } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FeatureList, PageHero, PartnersStrip, PromoBanner, TeamGrid } from "@/components/storefront";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: `${site.legalName}: importer and wholesale distributor of Brazilian and Portuguese food in the UK.`,
};

// Textos do site atual (brasfood.co.uk: "Who we are", "Our services", valores e diferenciais),
// revisados. Ano de fundação e números de capacidade ainda não existem lá — entram quando a
// Brasfood confirmar.

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Wholesale, <span className="text-accent">made simple</span>
          </>
        }
        text="A leading importer and distributor of quality Brazilian and Portuguese frozen and chilled food for the British grocery market."
        image="/images/banners/cargo-ship.webp"
        imageAlt="Container ship carrying imported goods"
      >
        <Link href="/become-a-customer" className="btn-accent">
          Open a trade account
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </PageHero>

      {/* ---------- quem somos ---------- */}
      <section className="container-site mt-16" aria-labelledby="who">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Who we are</p>
            <h2 id="who" className="mt-3 text-3xl font-bold md:text-4xl">
              Specialist food, with authenticity and provenance
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-ink-soft">
              <p>
                Brasfood is a UK importer and distributor of speciality foods for the retail, wholesale and foodservice
                sectors. As experts in importing Brazilian products, we bring the brands our customers know — and the
                quality they expect.
              </p>
              <p>
                With a wide range of well-known branded items, our products are on the shelves of most Brazilian and
                Portuguese stores in the UK. Our industry knowledge and forecasting take away the risk of forward buying,
                and our secure supply chain keeps deliveries coming.
              </p>
            </div>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Single supplier for all your needs",
                "Wide range of products",
                "No minimum order quantity",
                "In-house delivery",
                "Large and small quantities",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 font-medium">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] ring-1 ring-line">
            <Image
              src="/images/banners/import-story.webp"
              alt="Brasfood import story: container ship and Brazilian food"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ---------- valores ---------- */}
      <section className="container-site mt-16" aria-labelledby="values">
        <h2 id="values" className="text-center text-2xl font-bold md:text-3xl">
          How we work
        </h2>
        <div className="mt-8">
          <FeatureList
            columns="md:grid-cols-3"
            items={[
              { icon: Handshake, title: "Customer focused", text: "A long-term strategy that builds loyalty and trust with every customer." },
              { icon: RefreshCw, title: "Continuous improvement", text: "Efficient import and distribution processes, improved with technology." },
              { icon: Shuffle, title: "Flexibility", text: "We do our best for customers who need regular but smaller quantities." },
            ]}
          />
        </div>
      </section>

      {/* ---------- infraestrutura ---------- */}
      <section className="container-site mt-16 grid gap-4 lg:grid-cols-3" aria-label="Infrastructure">
        {[
          { icon: Warehouse, title: "London warehouse", text: `Frozen and chilled storage at ${site.address[0]}, NW10.` },
          { icon: Truck, title: "Delivery across the UK", text: "In-house London deliveries, plus nationwide delivery quoted with your invoice." },
          { icon: Globe, title: "Direct imports", text: "Products shipped from Brazil and Portugal, with the paperwork and traceability handled." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="card rounded-2xl p-7">
            <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
          </div>
        ))}
      </section>

      <TeamGrid />
      <PartnersStrip className="mt-0 border-t-0" />

      <section className="container-site mt-16" aria-label="Open an account">
        <PromoBanner
          tone="plum"
          title={<>Let&apos;s grow your sales together</>}
          text="Opening a trade account is simple and free. We review every request, usually within one working day."
          href="/become-a-customer"
          cta="Become a customer"
          image="/images/banners/category-k.webp"
          imageAlt="Brazilian charcuterie"
        />
      </section>
    </>
  );
}
