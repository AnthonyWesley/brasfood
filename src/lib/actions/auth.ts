"use server";

import { redirect } from "next/navigation";
import { authenticate, createRegistration } from "@/lib/api";
import { createSession, deleteSession } from "@/lib/session";
import { businessTypes, type BusinessType } from "@/lib/types";

export type FormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  /** devolve o que foi digitado para o formulário não se apagar num erro */
  values?: Record<string, string>;
};

const text = (formData: FormData, name: string) => String(formData.get(name) ?? "").trim();

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// formato oficial simplificado (inclui GIR 0AA); a validação forte é a do backend
const UK_POSTCODE = /^(GIR ?0AA|[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i;
const UK_PHONE = /^(\+44\s?|0)[\d\s]{9,13}$/;
const COMPANY_NUMBER = /^([A-Z]{2}\d{6}|\d{8})$/i;

export async function register(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = {
    companyName: text(formData, "companyName"),
    contactName: text(formData, "contactName"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    address: text(formData, "address"),
    city: text(formData, "city"),
    postcode: text(formData, "postcode").toUpperCase(),
    businessType: text(formData, "businessType"),
    companyNumber: text(formData, "companyNumber").toUpperCase(),
  };
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");

  const errors: Record<string, string> = {};
  if (!values.companyName) errors.companyName = "Enter your company name.";
  if (!values.contactName) errors.contactName = "Enter the name of the person responsible.";
  if (!EMAIL.test(values.email)) errors.email = "Enter a valid email address.";
  if (!UK_PHONE.test(values.phone)) errors.phone = "Enter a UK phone number, e.g. 020 8451 1188.";
  if (!values.address) errors.address = "Enter the business address.";
  if (!values.city) errors.city = "Enter the town or city.";
  if (!UK_POSTCODE.test(values.postcode)) errors.postcode = "Enter a valid UK postcode.";
  if (!businessTypes.includes(values.businessType as BusinessType)) errors.businessType = "Choose your type of business.";
  if (values.companyNumber && !COMPANY_NUMBER.test(values.companyNumber))
    errors.companyNumber = "Company numbers have 8 characters, e.g. 01234567 or SC123456.";
  if (password.length < 10) errors.password = "Use at least 10 characters.";
  if (confirm !== password) errors.confirmPassword = "The passwords don't match.";
  if (formData.get("consent") !== "on") errors.consent = "Please accept the privacy policy to continue.";

  if (Object.keys(errors).length > 0) {
    return { fieldErrors: errors, error: "Please check the highlighted fields.", values };
  }

  const result = await createRegistration({
    ...values,
    businessType: values.businessType as BusinessType,
    companyNumber: values.companyNumber || null,
    password,
  });
  if (!result.ok) return { error: result.error, fieldErrors: { email: result.error }, values };

  redirect("/become-a-customer/thank-you");
}

/** Só caminhos internos: um ?next=https://outro-site não pode virar redirect aberto. */
const safeNext = (value: string) => (value.startsWith("/") && !value.startsWith("//") ? value : "");

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = text(formData, "email");
  const password = String(formData.get("password") ?? "");
  const next = safeNext(text(formData, "next"));

  if (!email || !password) return { error: "Enter your email and password.", values: { email } };

  const result = await authenticate(email, password);
  if (!result.ok) {
    const error =
      result.reason === "pending"
        ? "Your account request is still being reviewed. We'll email you as soon as it's approved."
        : result.reason === "rejected"
          ? `We couldn't approve this account.${result.message ? ` ${result.message}` : ""} Contact us if you have questions.`
          : "Email or password is incorrect.";
    return { error, values: { email } };
  }

  await createSession(result.user);
  const home = result.user.role === "admin" ? "/admin" : "/catalogue";
  // cliente não vai para /admin mesmo que o link peça
  redirect(next && !(next.startsWith("/admin") && result.user.role !== "admin") ? next : home);
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
