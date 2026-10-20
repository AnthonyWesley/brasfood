import type { Metadata } from "next";
import { PortalHeader } from "@/components/portal-header";
import { AdminNav } from "./admin-nav";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Brasfood admin" },
  robots: { index: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <>
      <PortalHeader area="admin" />
      <div className="mx-auto grid w-full max-w-[90rem] flex-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[14rem_1fr]">
        <aside className="lg:sticky lg:top-22 lg:self-start">
          <div className="card p-3">
            <AdminNav />
          </div>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </>
  );
}
