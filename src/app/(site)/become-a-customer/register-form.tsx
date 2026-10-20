"use client";

import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { FormField } from "@/components/form-field";
import { register, type FormState } from "@/lib/actions/auth";
import { businessTypes } from "@/lib/types";

export function RegisterForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(register, {});
  const errors = state.fieldErrors ?? {};
  const v = state.values ?? {};

  return (
    <form action={action} noValidate className="card p-6 md:p-10">
      {state.error && (
        <p role="alert" className="mb-8 flex items-start gap-3 rounded-2xl bg-danger-soft p-4 text-sm text-danger">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {state.error}
        </p>
      )}

      <fieldset>
        <legend className="text-lg font-bold">Your business</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <FormField name="companyName" label="Company name" error={errors.companyName} className="sm:col-span-2">
            {(p) => <input {...p} name="companyName" defaultValue={v.companyName} autoComplete="organization" required className="field" />}
          </FormField>
          <FormField name="businessType" label="Type of business" error={errors.businessType}>
            {(p) => (
              <select {...p} name="businessType" defaultValue={v.businessType ?? ""} required className="field">
                <option value="" disabled>
                  Choose one
                </option>
                {businessTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            )}
          </FormField>
          <FormField
            name="companyNumber"
            label={
              <>
                Company number <span className="font-normal text-muted">(optional)</span>
              </>
            }
            error={errors.companyNumber}
            hint="Your Companies House number, if you're a limited company."
          >
            {(p) => <input {...p} name="companyNumber" defaultValue={v.companyNumber} inputMode="text" className="field" />}
          </FormField>
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="text-lg font-bold">Contact person</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <FormField name="contactName" label="Full name" error={errors.contactName} className="sm:col-span-2">
            {(p) => <input {...p} name="contactName" defaultValue={v.contactName} autoComplete="name" required className="field" />}
          </FormField>
          <FormField name="email" label="Email" error={errors.email}>
            {(p) => <input {...p} type="email" name="email" defaultValue={v.email} autoComplete="email" required className="field" />}
          </FormField>
          <FormField name="phone" label="Phone" error={errors.phone}>
            {(p) => <input {...p} type="tel" name="phone" defaultValue={v.phone} autoComplete="tel" required className="field" />}
          </FormField>
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="text-lg font-bold">Business address</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-[2fr_1fr]">
          <FormField name="address" label="Address" error={errors.address} className="sm:col-span-2">
            {(p) => <input {...p} name="address" defaultValue={v.address} autoComplete="street-address" required className="field" />}
          </FormField>
          <FormField name="city" label="Town or city" error={errors.city}>
            {(p) => <input {...p} name="city" defaultValue={v.city} autoComplete="address-level2" required className="field" />}
          </FormField>
          <FormField name="postcode" label="Postcode" error={errors.postcode}>
            {(p) => <input {...p} name="postcode" defaultValue={v.postcode} autoComplete="postal-code" required className="field uppercase" />}
          </FormField>
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="text-lg font-bold">Your login</legend>
        <p className="mt-1 text-sm text-muted">You&apos;ll use these to sign in once your account is approved.</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <FormField name="password" label="Password" error={errors.password} hint="At least 10 characters.">
            {(p) => <input {...p} type="password" name="password" autoComplete="new-password" required minLength={10} className="field" />}
          </FormField>
          <FormField name="confirmPassword" label="Confirm password" error={errors.confirmPassword}>
            {(p) => <input {...p} type="password" name="confirmPassword" autoComplete="new-password" required className="field" />}
          </FormField>
        </div>
      </fieldset>

      <div className="mt-8">
        <label className="flex items-start gap-3 text-sm text-ink-soft">
          <input
            type="checkbox"
            name="consent"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 size-5 shrink-0 accent-[var(--brand)]"
          />
          <span>
            I agree that Brasfood may use these details to review and manage my trade account, as described in the{" "}
            <Link href="/privacy" className="font-semibold text-brand hover:underline" target="_blank">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-1.5 text-sm text-danger">
            {errors.consent}
          </p>
        )}
      </div>

      <button type="submit" disabled={pending} className="btn-primary mt-8 w-full sm:w-auto">
        {pending ? "Sending…" : "Request trade account"}
      </button>
    </form>
  );
}
