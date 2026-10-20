import { CircleCheck, Clock, Lock, Mail, PackageOpen } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/storefront";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Become a customer",
  description: "Open a free Brasfood trade account for your supermarket, restaurant, shop or distribution business.",
};

export default function BecomeACustomerPage() {
  return (
    <>
      <PageHero
        eyebrow="Trade account"
        title={
          <>
            Become a <span className="text-accent">Brasfood customer</span>
          </>
        }
        text="Opening an account is simple and free. Once we approve it, you can browse our full wholesale catalogue with trade prices, codes and pack sizes."
        image="/images/banners/category-n.webp"
        imageAlt="Brazilian savouries: coxinha, rissoles and pastel"
      />

      <div className="container-site mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <RegisterForm />

        <aside className="grid gap-4 lg:sticky lg:top-40">
          <ul className="grid gap-4">
            {[
              { icon: CircleCheck, title: "Free to join", text: "No fees or commitment to open an account." },
              { icon: PackageOpen, title: "No minimum order", text: "We deal in large and small quantities." },
              { icon: Clock, title: "Quick review", text: "We check every request, usually within one working day." },
              { icon: Mail, title: "Email confirmation", text: "You'll hear from us as soon as your account is approved." },
              { icon: Lock, title: "Your data is safe", text: "Used only to manage your trade account, under UK GDPR." },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4 rounded-2xl p-5 ring-2 ring-accent">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-brand">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-bold">{title}</p>
                  <p className="mt-0.5 text-sm text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="px-2 text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-brand hover:underline">
              Sign in
            </Link>
          </p>
        </aside>
      </div>
    </>
  );
}
