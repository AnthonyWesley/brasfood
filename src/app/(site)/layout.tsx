import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories } from "@/lib/api";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const categories = (await getCategories()).map(({ slug, name }) => ({ slug, name }));
  return (
    <>
      <SiteHeader categories={categories} />
      <main className="flex-1">{children}</main>
      <SiteFooter categories={categories} />
    </>
  );
}
