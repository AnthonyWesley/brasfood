"use client";

import { useActionState } from "react";
import { FormField } from "@/components/form-field";
import { addCategory } from "@/lib/actions/admin";
import type { FormState } from "@/lib/actions/auth";

export function CategoryForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(addCategory, {});
  return (
    <form action={action} className="card grid gap-4 rounded-2xl p-6">
      <h2 className="text-lg font-bold">Add a category</h2>
      <FormField name="name" label="Name" error={state.error}>
        {(p) => <input {...p} name="name" defaultValue={state.values?.name} required className="field" />}
      </FormField>
      <FormField name="description" label="Short description">
        {(p) => <input {...p} name="description" defaultValue={state.values?.description} className="field" />}
      </FormField>
      <button type="submit" disabled={pending} className="btn-primary">
        {pending ? "Adding…" : "Add category"}
      </button>
    </form>
  );
}
