import type { Metadata } from "next";
import { Suspense } from "react";
import { getCustomers } from "@/lib/api";
import { requireAdmin } from "@/lib/session";

export const metadata: Metadata = { title: "Customers" };

export default function CustomersPage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold">Customers</h1>
      <p className="mt-1 text-muted">Accounts with access to the wholesale catalogue.</p>
      <Suspense fallback={<div className="card mt-6 h-64 animate-pulse" />}>
        <Customers />
      </Suspense>
    </>
  );
}

async function Customers() {
  await requireAdmin();
  const customers = await getCustomers();

  return (
    <div className="card mt-6 overflow-x-auto rounded-2xl">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead className="border-b border-line text-xs text-muted">
          <tr>
            <th scope="col" className="px-5 py-3 font-medium">Company</th>
            <th scope="col" className="px-5 py-3 font-medium">Contact</th>
            <th scope="col" className="px-5 py-3 font-medium">Business type</th>
            <th scope="col" className="px-5 py-3 font-medium">Location</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {customers.map((c) => (
            <tr key={c.id}>
              <td className="px-5 py-3 font-semibold">{c.registration?.companyName ?? "—"}</td>
              <td className="px-5 py-3">
                <p>{c.name}</p>
                <p className="text-xs text-muted">{c.email}</p>
              </td>
              <td className="px-5 py-3">{c.registration?.businessType ?? "—"}</td>
              <td className="px-5 py-3">
                {c.registration ? `${c.registration.city} ${c.registration.postcode}` : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
