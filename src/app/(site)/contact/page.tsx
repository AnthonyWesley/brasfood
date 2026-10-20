import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the Brasfood sales team about wholesale supply of Brazilian and Portuguese food.",
};

export default function ContactPage() {
  const details = [
    { icon: Phone, label: "Phone", value: site.phone, href: site.phoneHref },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Warehouse", value: site.address.join(", "), href: site.mapsUrl },
    { icon: Clock, label: "Opening hours", value: site.hours, href: null },
  ];

  return (
    <div className="container-site pt-10">
      <header className="max-w-2xl">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">Talk to our sales team</h1>
        <p className="mt-4 leading-relaxed text-muted">
          Questions about our range, delivery or opening an account? Send us a message and we&apos;ll get back to you.
        </p>
      </header>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <div className="grid gap-4">
          <ul className="card grid gap-6 p-7">
            {details.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-muted">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="font-semibold hover:text-brand"
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
          <div className="overflow-hidden rounded-[var(--radius-card)] bg-surface">
            <iframe
              title="Brasfood warehouse on the map"
              src="https://www.google.com/maps?q=Sapcote+Trading+Centre,+High+Road,+London+NW10+2DH&output=embed"
              className="aspect-[4/3] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
