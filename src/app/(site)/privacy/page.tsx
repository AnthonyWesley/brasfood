import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy" };

// RASCUNHO para revisão jurídica (UK GDPR). Prazos de retenção, base legal e
// fornecedores (hospedagem, e-mail) precisam ser confirmados pela Brasfood.

export default function PrivacyPage() {
  return (
    <article className="container-site max-w-3xl pt-10">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-3 text-4xl font-extrabold">Privacy policy</h1>
      <p className="mt-3 rounded-2xl bg-accent-soft p-4 text-sm text-[#7a5a00]">
        Draft — to be reviewed before launch.
      </p>

      <div className="mt-10 space-y-8 leading-relaxed text-ink-soft [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink">
        <section>
          <h2>Who we are</h2>
          <p className="mt-3">
            {site.legalName}, {site.address.join(", ")}, is the controller of the personal data you give us through
            this website. Contact us at {site.email} about anything in this policy.
          </p>
        </section>
        <section>
          <h2>What we collect</h2>
          <p className="mt-3">
            When you apply for a trade account: your company name, company number, business type and address, and the
            name, email and phone number of the contact person. When you contact us: your name, email, phone and
            message.
          </p>
        </section>
        <section>
          <h2>Why we use it</h2>
          <p className="mt-3">
            To review your application, run your trade account, give you access to the customer portal and reply to
            your enquiries. Our lawful basis is taking steps to enter into a contract with you and our legitimate
            interest in running our wholesale business.
          </p>
        </section>
        <section>
          <h2>How long we keep it</h2>
          <p className="mt-3">
            For as long as your account is active, and afterwards only as long as the law requires us to keep business
            records.
          </p>
        </section>
        <section>
          <h2>Your rights</h2>
          <p className="mt-3">
            You can ask to see, correct or delete your data, or object to how we use it, by emailing {site.email}. You
            can also complain to the Information Commissioner&apos;s Office (ico.org.uk).
          </p>
        </section>
      </div>
    </article>
  );
}
