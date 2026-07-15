import { appendRuntimeEvent } from "@/lib/runtimeStore";
type EmailMessage = { to: string; subject: string; html: string };

export function emailDeliveryStatus() {
  const mode = process.env.ALERT_EMAIL_MODE;
  const configured = mode === "log" || Boolean(process.env.RESEND_API_KEY && process.env.ALERT_FROM_EMAIL);
  return { configured, mode: mode === "log" ? "log" : configured ? "resend" : "disabled" } as const;
}

export async function sendEmail(message: EmailMessage) {
  const status = emailDeliveryStatus();
  if (!status.configured) throw new Error("Email delivery is not configured.");

  if (status.mode === "log") {
    console.info("[OfferRadar email test]", { to: redact(message.to), subject: message.subject });
    await appendRuntimeEvent("email-test-outbox.json", { ...message, createdAt: new Date().toISOString() });
    return { id: `log-${crypto.randomUUID()}` };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.ALERT_FROM_EMAIL, ...message }),
  });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}.`);
  return response.json() as Promise<{ id: string }>;
}

function redact(email: string) {
  const [name, domain] = email.split("@");
  return `${name.slice(0, 2)}***@${domain}`;
}
