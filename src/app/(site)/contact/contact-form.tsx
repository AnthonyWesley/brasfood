"use client";

import { CircleCheck } from "lucide-react";
import { useActionState } from "react";
import { FormField } from "@/components/form-field";
import { sendContact, type ContactState } from "@/lib/actions/contact";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, {});
  const errors = state.fieldErrors ?? {};
  const v = state.values ?? {};

  if (state.sent) {
    return (
      <div className="card grid place-items-center p-10 text-center" role="status">
        <div>
          <CircleCheck className="mx-auto size-12 text-success" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-extrabold">Message sent</h2>
          <p className="mt-2 text-muted">Thanks for getting in touch. We&apos;ll reply within one working day.</p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="card grid gap-5 p-6 sm:grid-cols-2 md:p-10">
      <h2 className="text-xl font-bold sm:col-span-2">Send us a message</h2>
      <FormField name="name" label="Your name" error={errors.name}>
        {(p) => <input {...p} name="name" defaultValue={v.name} autoComplete="name" required className="field" />}
      </FormField>
      <FormField name="company" label={<>Company <span className="font-normal text-muted">(optional)</span></>}>
        {(p) => <input {...p} name="company" defaultValue={v.company} autoComplete="organization" className="field" />}
      </FormField>
      <FormField name="email" label="Email" error={errors.email}>
        {(p) => <input {...p} type="email" name="email" defaultValue={v.email} autoComplete="email" required className="field" />}
      </FormField>
      <FormField name="phone" label={<>Phone <span className="font-normal text-muted">(optional)</span></>}>
        {(p) => <input {...p} type="tel" name="phone" defaultValue={v.phone} autoComplete="tel" className="field" />}
      </FormField>
      <FormField name="message" label="How can we help?" error={errors.message} className="sm:col-span-2">
        {(p) => <textarea {...p} name="message" defaultValue={v.message} rows={6} required className="field py-3" />}
      </FormField>
      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
