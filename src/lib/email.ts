import "server-only";
import type { Registration } from "./types";

// E-mails transacionais. Por enquanto só registram no log do servidor; quando o serviço
// SMTP/transacional for escolhido, o envio entra aqui (ou no backend, que é o ideal).

async function send(to: string, subject: string, text: string) {
  console.info(`[email] to=${to} subject="${subject}"\n${text}`);
}

export async function notifyRegistrationReceived(registration: Registration) {
  await send(
    registration.email,
    "We received your Brasfood trade account request",
    `Hi ${registration.contactName},\n\nThanks for registering ${registration.companyName}. Our team reviews every request, usually within one working day, and we will email you as soon as it is approved.\n\nBrasfood`,
  );
  const team = process.env.ADMIN_NOTIFY_EMAIL;
  if (team) await send(team, `New trade account request: ${registration.companyName}`, `Review it at /admin/registrations`);
}

export async function notifyRegistrationReviewed(registration: Registration) {
  const approved = registration.status === "approved";
  await send(
    registration.email,
    approved ? "Your Brasfood trade account is approved" : "About your Brasfood trade account request",
    approved
      ? `Hi ${registration.contactName},\n\nGood news: ${registration.companyName} now has access to the Brasfood wholesale catalogue. Sign in with the email and password you registered with.\n\nBrasfood`
      : `Hi ${registration.contactName},\n\nWe can't open a trade account for ${registration.companyName} at the moment.${registration.rejectionReason ? `\n\nReason: ${registration.rejectionReason}` : ""}\n\nReply to this email if you have any questions.\n\nBrasfood`,
  );
}
