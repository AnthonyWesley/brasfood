import { Check, Inbox, X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { StatusTag } from "@/components/badges";
import { approveRegistration, rejectRegistration } from "@/lib/actions/admin";
import { getRegistrations } from "@/lib/api";
import { requireAdmin } from "@/lib/session";
import type { RegistrationStatus } from "@/lib/types";

export const metadata: Metadata = { title: "Registrations" };

const tabs: { status: RegistrationStatus; label: string }[] = [
  { status: "pending", label: "Pending" },
  { status: "approved", label: "Approved" },
  { status: "rejected", label: "Rejected" },
];

export default function RegistrationsPage(props: PageProps<"/admin/registrations">) {
  return (
    <>
      <h1 className="text-3xl font-extrabold">Registrations</h1>
      <p className="mt-1 text-muted">Approve a request to create the customer&apos;s login. They get an email either way.</p>
      <Suspense fallback={<div className="card mt-6 h-96 animate-pulse" />}>
        <RegistrationList searchParams={props.searchParams} />
      </Suspense>
    </>
  );
}

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

async function RegistrationList({ searchParams }: { searchParams: PageProps<"/admin/registrations">["searchParams"] }) {
  await requireAdmin();
  const requested = (await searchParams).status;
  const status = tabs.find((t) => t.status === requested)?.status ?? "pending";
  const list = await getRegistrations(status);

  return (
    <>
      <nav aria-label="Filter by status" className="mt-6 flex gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.status}
            href={`/admin/registrations?status=${tab.status}`}
            aria-current={tab.status === status ? "page" : undefined}
            className="inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium ring-1 ring-line hover:bg-surface aria-[current=page]:bg-ink aria-[current=page]:text-white aria-[current=page]:ring-ink"
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      {list.length === 0 ? (
        <div className="card mt-4 grid place-items-center rounded-2xl p-12 text-center">
          <Inbox className="size-10 text-muted" aria-hidden="true" />
          <p className="mt-3 font-semibold">Nothing here</p>
          <p className="text-sm text-muted">No {status} requests right now.</p>
        </div>
      ) : (
        <ul className="mt-4 grid gap-3">
          {list.map((r) => (
            <li key={r.id} className="card rounded-2xl p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">{r.companyName}</h2>
                  <p className="text-sm text-muted">
                    {r.businessType} · requested {dateFormat.format(new Date(r.createdAt))}
                  </p>
                </div>
                <StatusTag status={r.status} />
              </div>

              <dl className="mt-5 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Contact", r.contactName],
                  ["Email", r.email],
                  ["Phone", r.phone],
                  ["Address", `${r.address}, ${r.city} ${r.postcode}`],
                  ["Company number", r.companyNumber ?? "Not provided"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs text-muted">{label}</dt>
                    <dd className="mt-0.5 font-medium break-words">{value}</dd>
                  </div>
                ))}
                {r.companyNumber && (
                  <div>
                    <dt className="text-xs text-muted">Check</dt>
                    <dd className="mt-0.5">
                      <a
                        href={`https://find-and-update.company-information.service.gov.uk/company/${r.companyNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-brand hover:underline"
                      >
                        Companies House ↗
                      </a>
                    </dd>
                  </div>
                )}
              </dl>

              {r.status === "rejected" && r.rejectionReason && (
                <p className="mt-4 rounded-xl bg-danger-soft p-3 text-sm text-danger">Reason: {r.rejectionReason}</p>
              )}

              {r.status === "pending" && (
                <div className="mt-6 flex flex-wrap items-start gap-3 border-t border-line pt-5">
                  <form action={approveRegistration}>
                    <input type="hidden" name="id" value={r.id} />
                    <button type="submit" className="btn-primary">
                      <Check className="size-4" aria-hidden="true" />
                      Approve
                    </button>
                  </form>
                  {/* recusar pede o motivo, que vai no e-mail ao cliente */}
                  <details className="group">
                    <summary className="btn-light cursor-pointer list-none">
                      <X className="size-4" aria-hidden="true" />
                      Reject…
                    </summary>
                    <form action={rejectRegistration} className="mt-3 flex flex-col gap-2 sm:flex-row">
                      <input type="hidden" name="id" value={r.id} />
                      <label className="sr-only" htmlFor={`reason-${r.id}`}>
                        Reason (sent to the customer)
                      </label>
                      <input
                        id={`reason-${r.id}`}
                        name="reason"
                        placeholder="Reason, sent to the customer (optional)"
                        className="field sm:w-80"
                      />
                      <button type="submit" className="btn bg-danger text-white hover:brightness-95">
                        Confirm rejection
                      </button>
                    </form>
                  </details>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
