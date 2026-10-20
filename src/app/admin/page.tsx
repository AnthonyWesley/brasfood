import { ArrowRight, ClipboardList, EyeOff, Package, Users } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { getAdminOverview } from "@/lib/api";
import { requireAdmin } from "@/lib/session";

export default function AdminOverviewPage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold">Overview</h1>
      <Suspense fallback={<div className="card mt-6 h-64 animate-pulse" />}>
        <Overview />
      </Suspense>
    </>
  );
}

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

async function Overview() {
  await requireAdmin();
  const data = await getAdminOverview();
  const stats = [
    { label: "Pending requests", value: data.pending, icon: ClipboardList, href: "/admin/registrations", highlight: data.pending > 0 },
    { label: "Customers", value: data.customers, icon: Users, href: "/admin/customers", highlight: false },
    { label: "Products", value: data.products, icon: Package, href: "/admin/products", highlight: false },
    { label: "Hidden products", value: data.hidden, icon: EyeOff, href: "/admin/products", highlight: false },
  ];

  return (
    <div className="mt-6 grid gap-6">
      <ul className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href, highlight }) => (
          <li key={label}>
            <Link
              href={href}
              className={`card flex h-full flex-col gap-6 rounded-2xl p-5 transition-shadow hover:shadow-md ${highlight ? "bg-accent-soft" : ""}`}
            >
              <Icon className="size-5 text-brand" aria-hidden="true" />
              <span>
                <span className="block text-3xl font-extrabold tabular-nums">{value}</span>
                <span className="text-sm text-muted">{label}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="card rounded-2xl p-6" aria-labelledby="latest">
        <div className="flex items-center justify-between gap-3">
          <h2 id="latest" className="text-lg font-bold">
            Waiting for review
          </h2>
          <Link href="/admin/registrations" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
            Review all
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        {data.latest.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No requests waiting. Nice.</p>
        ) : (
          <ul className="mt-4 divide-y divide-line">
            {data.latest.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div>
                  <p className="font-semibold">{r.companyName}</p>
                  <p className="text-sm text-muted">
                    {r.businessType} · {r.city}
                  </p>
                </div>
                <time dateTime={r.createdAt} className="text-sm text-muted">
                  {dateFormat.format(new Date(r.createdAt))}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
