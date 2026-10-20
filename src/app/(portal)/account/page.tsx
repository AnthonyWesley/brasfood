import { Building2, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { StatusTag } from "@/components/badges";
import { getAccount } from "@/lib/api";
import { requireCustomer } from "@/lib/session";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "My account" };

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-extrabold">My account</h1>
      <Suspense fallback={<div className="card mt-6 h-80 animate-pulse" />}>
        <AccountDetails />
      </Suspense>
    </div>
  );
}

async function AccountDetails() {
  const user = await requireCustomer("/account");
  const { registration } = await getAccount(user);

  return (
    <div className="mt-6 grid gap-4">
      <section className="card p-6 md:p-8" aria-labelledby="profile">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 id="profile" className="text-xl font-bold">
              {registration?.companyName ?? user.name}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {registration?.businessType ?? (user.role === "admin" ? "Brasfood staff" : "Customer")}
              {registration?.companyNumber && ` · Company no. ${registration.companyNumber}`}
            </p>
          </div>
          {registration && <StatusTag status={registration.status} />}
        </div>

        <dl className="mt-8 grid gap-5 sm:grid-cols-2">
          {[
            { icon: Building2, label: "Contact", value: registration?.contactName ?? user.name },
            { icon: Mail, label: "Email", value: user.email },
            { icon: Phone, label: "Phone", value: registration?.phone ?? "—" },
            {
              icon: MapPin,
              label: "Address",
              value: registration ? `${registration.address}, ${registration.city} ${registration.postcode}` : "—",
            },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-3">
              <Icon className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
              <div>
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="mt-0.5 font-medium">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <p className="rounded-2xl bg-brand-soft p-5 text-sm text-brand-strong">
        Need to change your details or add another user? Email{" "}
        <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-4">
          {site.email}
        </a>{" "}
        or call {site.phone}.
      </p>
    </div>
  );
}
