import type { Metadata } from "next";
import { PortalHeader } from "@/components/portal-header";

export const metadata: Metadata = { robots: { index: false } };

export default function PortalLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <PortalHeader area="portal" />
      <main className="flex-1">{children}</main>
    </>
  );
}
