import { CircleCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Request received", robots: { index: false } };

export default function ThankYouPage() {
  return (
    <div className="container-site pt-10">
      <div className="card mx-auto max-w-2xl p-8 text-center md:p-14">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand-soft text-brand">
          <CircleCheck className="size-8" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold">Thanks — we&apos;ve got your request</h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
          Our team will review your details, usually within one working day. We&apos;ll email you as soon as your
          account is approved, and then you can sign in to the customer portal.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/products" className="btn-light">
            Browse our products
          </Link>
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
