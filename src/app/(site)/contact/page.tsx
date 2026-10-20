import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { PageHero } from "@/components/storefront";
import { site } from "@/lib/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the Brasfood sales team about wholesale supply of Brazilian and Portuguese food.",
};

export default function ContactPage() {
  const details = [
    { icon: Phone, label: "Call us", value: site.phone, href: site.phoneHref },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Warehouse", value: site.address.join(", "), href: site.mapsUrl },
    { icon: Clock, label: "Opening hours", value: site.hours, href: null },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to our sales team"
        text="Questions about our range, delivery or opening an account? Send us a message and we'll get back to you within one working day."
        image="/images/banners/logistics.webp"
        imageAlt="Ship, train and lorries moving freight"
      />

      <section className="container-site mt-8" aria-label="Contact details">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {details.map(({ icon: Icon, label, value, href }) => (
            <li key={label} className="flex gap-4 rounded-2xl p-5 ring-2 ring-accent">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-brand">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-muted">{label}</p>
                {href ? (
                  <a
                    href={href}
                    className="font-semibold break-words hover:text-brand"
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {value}
                  </a>
                ) : (
                  <p className="font-semibold">{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-site mt-8 grid gap-4 lg:grid-cols-[1.3fr_1fr]" aria-label="Message and map">
        <ContactForm />
        <div className="card min-h-80 overflow-hidden rounded-[var(--radius-card)]">
          <iframe
            title="Brasfood warehouse on the map"
            src="https://www.google.com/maps?q=Sapcote+Trading+Centre,+High+Road,+London+NW10+2DH&output=embed"
            className="size-full min-h-80 border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
