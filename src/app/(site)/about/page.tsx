import { ArrowRight, Handshake, ShieldCheck, Truck, Warehouse } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: `${site.legalName}: importer and wholesale distributor of Brazilian and Portuguese food in the UK.`,
};

// Texto-base a partir do site atual; história, datas e números de capacidade entram
// quando a Brasfood confirmar (ver marcações "A CONFIRMAR" abaixo).

export default function AboutPage() {
  return (
    <>
      <section className="container-site pt-10">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-[var(--radius-card)] bg-charcoal p-8 text-white md:p-14">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">About us</p>
            <h1 className="mt-5 text-4xl leading-[1.05] font-extrabold md:text-5xl">
              Bringing the flavours of Brazil and Portugal to UK businesses.
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-white/75">
              {site.legalName} is a London-based importer and wholesale distributor of frozen and chilled Brazilian and
              Portuguese food. We supply retail, wholesale and foodservice customers who want authentic products, a
              reliable supply and a team that understands their customers.
            </p>
          </div>
          <div className="card flex flex-col justify-between p-8 md:p-10">
            <Warehouse className="size-9 text-brand" aria-hidden="true" />
            <div>
              <p className="mt-10 text-2xl font-bold">Our base</p>
              <address className="mt-3 text-sm leading-relaxed text-muted not-italic">
                {site.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-light mt-6">
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container-site mt-20" aria-labelledby="story">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 id="story" className="mt-3 text-3xl font-extrabold">
              Started by importers, built around our customers.
            </h2>
          </div>
          <div className="space-y-5 leading-relaxed text-ink-soft">
            {/* A CONFIRMAR com a Brasfood: ano de fundação, fundadores e marcos. */}
            <p>
              Brasfood began with a simple goal: make it easy for UK shops and restaurants to stock the Brazilian and
              Portuguese products their communities love. Today we import directly, hold stock in our London warehouse
              and deliver across the country.
            </p>
            <p>
              We work with established producers and brands, and we keep our range focused on the categories our
              customers sell most — cheeses, ready meals, cassava, corn products, fruit pulps, savouries and more.
            </p>
          </div>
        </div>
      </section>

      <section className="container-site mt-20" aria-labelledby="infrastructure">
        <p className="eyebrow">Infrastructure</p>
        <h2 id="infrastructure" className="mt-3 max-w-2xl text-3xl font-extrabold">
          The capacity to supply you reliably
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Warehouse,
              title: "Temperature-controlled storage",
              text: "Frozen, chilled and ambient areas in our NW10 warehouse keep every product at the right temperature.",
            },
            {
              icon: Truck,
              title: "Distribution",
              text: "London delivery routes plus UK-wide delivery. Orders outside London get a delivery quote with the invoice.",
            },
            {
              icon: ShieldCheck,
              title: "Compliance",
              text: "Imports handled with the right documentation and traceability, from the port to your shelf.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="card p-7">
              <Icon className="size-8 text-brand" aria-hidden="true" />
              <h3 className="mt-6 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-site mt-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] bg-brand p-8 text-white md:flex-row md:items-center md:p-12">
          <div className="flex items-start gap-4">
            <Handshake className="mt-1 size-9 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <h2 className="text-2xl font-extrabold">Let&apos;s work together</h2>
              <p className="mt-2 text-white/80">Open a trade account and get access to our full wholesale catalogue.</p>
            </div>
          </div>
          <Link href="/become-a-customer" className="btn-accent">
            Become a customer
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
