import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { publicNav, site } from "@/lib/site";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 pb-6">
      <div className="container-site">
        <div className="card grid gap-10 p-8 md:grid-cols-[1.4fr_1fr_1fr] md:p-12">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold text-ink">Explore</h2>
            <ul className="mt-4 grid gap-2.5 text-sm text-muted">
              {publicNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/login" className="hover:text-brand">
                  Customer portal
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-ink">Get in touch</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                  {site.address.join(", ")}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                <a href={site.phoneHref} className="hover:text-brand">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="hover:text-brand">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                {site.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 px-2 text-xs text-muted sm:flex-row sm:justify-between">
          <p>© 2026 {site.legalName}. Registered in England and Wales.</p>
          <Link href="/privacy" className="hover:text-brand">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
