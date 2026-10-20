"use server";

import type { FormState } from "./auth";

export type ContactState = FormState & { sent?: boolean };

const text = (formData: FormData, name: string) => String(formData.get(name) ?? "").trim();

/** POST /contact — por enquanto só registra no log; o envio entra com o serviço de e-mail. */
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: text(formData, "name"),
    company: text(formData, "company"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    message: text(formData, "message"),
  };
  const errors: Record<string, string> = {};
  if (!values.name) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (values.message.length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  if (Object.keys(errors).length > 0) return { fieldErrors: errors, values };

  console.info("[contact]", JSON.stringify(values));
  return { sent: true };
}
