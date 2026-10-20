import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Customer portal sign in", robots: { index: false } };

export default function LoginPage(props: PageProps<"/login">) {
  return (
    <div className="container-site pt-6">
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-[1fr_1.1fr]">
        <div className="relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] bg-brand p-8 text-white md:p-12">
          {/* a colagem de produtos ao fundo, bem apagada, dá cor sem competir com o texto */}
          <Image src="/images/banners/hero-collage.webp" alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover opacity-15 mix-blend-luminosity" />
          <div className="relative">
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent ring-1 ring-white/15">Wholesale portal</p>
            <h1 className="mt-4 text-4xl leading-tight font-extrabold">Welcome back</h1>
            <p className="mt-4 leading-relaxed text-white/80">
              Sign in to browse the full Brasfood catalogue: product codes, pack sizes and availability.
            </p>
          </div>
          <p className="relative mt-10 text-sm text-white/80">
            Not a customer yet?{" "}
            <Link href="/become-a-customer" className="font-semibold text-white underline underline-offset-4">
              Open a trade account
            </Link>
          </p>
        </div>

        <Suspense fallback={<div className="card min-h-96 animate-pulse" />}>
          <LoginFormWithNext searchParams={props.searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function LoginFormWithNext({ searchParams }: { searchParams: PageProps<"/login">["searchParams"] }) {
  const next = (await searchParams).next;
  return <LoginForm next={typeof next === "string" ? next : ""} />;
}
