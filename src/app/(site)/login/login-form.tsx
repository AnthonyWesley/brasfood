"use client";

import { CircleAlert } from "lucide-react";
import { useActionState } from "react";
import { FormField } from "@/components/form-field";
import { login, type FormState } from "@/lib/actions/auth";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(login, {});

  return (
    <form action={action} className="card flex flex-col gap-5 p-6 md:p-10">
      <h2 className="text-2xl font-extrabold">Sign in</h2>
      {state.error && (
        <p role="alert" className="flex items-start gap-3 rounded-2xl bg-danger-soft p-4 text-sm text-danger">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {state.error}
        </p>
      )}
      <input type="hidden" name="next" value={next} />
      <FormField name="email" label="Email">
        {(p) => (
          <input {...p} type="email" name="email" defaultValue={state.values?.email} autoComplete="email" required className="field" />
        )}
      </FormField>
      <FormField name="password" label="Password">
        {(p) => <input {...p} type="password" name="password" autoComplete="current-password" required className="field" />}
      </FormField>
      <button type="submit" disabled={pending} className="btn-primary mt-2">
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <p className="text-sm text-muted">
        Forgotten your password? Email{" "}
        <a href="mailto:info@brasfood.co.uk" className="font-semibold text-brand hover:underline">
          info@brasfood.co.uk
        </a>{" "}
        and we&apos;ll reset it.
      </p>
    </form>
  );
}
