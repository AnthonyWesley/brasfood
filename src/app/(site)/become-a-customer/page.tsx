import { CircleCheck, Clock, Lock, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Become a customer",
  description: "Open a free Brasfood trade account for your supermarket, restaurant, shop or distribution business.",
};

export default function BecomeACustomerPage() {
  return (
    <div className="container-site pt-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] lg:items-start">
        <aside className="grid gap-4 lg:sticky lg:top-28">
          <div className="rounded-[var(--radius-card)] bg-charcoal p-8 text-white">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">Trade account</p>
            <h1 className="mt-4 text-4xl leading-tight font-extrabold">Become a Brasfood customer</h1>
            <p className="mt-4 leading-relaxed text-white/75">
              Opening an account is free. Once we approve it, you can browse our full wholesale catalogue.
            </p>
          </div>
          <ul className="card grid gap-5 p-7">
            {[
              { icon: CircleCheck, title: "Free to join", text: "No fees or minimum commitment to open an account." },
              { icon: Clock, title: "Quick review", text: "We check every request, usually within one working day." },
              { icon: Mail, title: "Email confirmation", text: "You'll hear from us as soon as your account is approved." },
              { icon: Lock, title: "Your data is safe", text: "Used only to manage your trade account, under UK GDPR." },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <Icon className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <p className="font-semibold">{title}</p>
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

        <RegisterForm />
      </div>
    </div>
  );
}
