import { createHash, randomBytes, randomUUID } from "node:crypto";
import { sendEmail, emailDeliveryStatus } from "@/lib/email";
import { readRuntimeJson, writeRuntimeJson } from "@/lib/runtimeStore";
import type { AlertChangeType, AlertFrequency, AlertScopeType, AlertSubscription } from "@/types/alerts";
import type { ApprovedChange } from "@/types/change";
import type { WeeklyDigest } from "@/types/weekly";

const filename = "alert-subscriptions.json";

export function alertsAvailable() {
  return process.env.ALERTS_ENABLED === "true" && emailDeliveryStatus().configured;
}

export async function createAlertSubscription(input: { email: string; scopeType: AlertScopeType; scopeId: string; scopeLabel: string; targetAmount?: number; frequency: AlertFrequency; changeTypes: AlertChangeType[] }) {
  if (!alertsAvailable()) throw new Error("Alert delivery is not configured.");
  const token = randomBytes(32).toString("base64url");
  const subscription: AlertSubscription = { id: randomUUID(), ...input, email: input.email.trim().toLowerCase(), status: "pending", createdAt: new Date().toISOString(), tokenHash: hashToken(token) };
  const subscriptions = await readRuntimeJson<AlertSubscription[]>(filename, []);
  subscriptions.push(subscription);
  await writeRuntimeJson(filename, subscriptions);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const confirmUrl = `${baseUrl}/api/alerts/confirm?token=${encodeURIComponent(token)}`;
  try {
    await sendEmail({ to: subscription.email, subject: `Confirm your ${subscription.scopeLabel} alert`, html: `<p>Confirm your OfferRadar alert for <strong>${escapeHtml(subscription.scopeLabel)}</strong>.</p><p><a href="${confirmUrl}">Confirm and manage this alert</a></p><p>If you did not request this, ignore this email.</p>` });
  } catch (error) {
    await writeRuntimeJson(filename, subscriptions.filter((item) => item.id !== subscription.id));
    throw error;
  }
  return subscription.id;
}

export async function confirmAlert(token: string) {
  const subscriptions = await readRuntimeJson<AlertSubscription[]>(filename, []);
  const subscription = subscriptions.find((item) => item.tokenHash === hashToken(token));
  if (!subscription || subscription.status === "unsubscribed") return false;
  subscription.status = "active";
  subscription.confirmedAt = new Date().toISOString();
  await writeRuntimeJson(filename, subscriptions);
  return true;
}

export async function manageAlert(token: string, action: "pause" | "resume" | "unsubscribe") {
  const subscriptions = await readRuntimeJson<AlertSubscription[]>(filename, []);
  const subscription = subscriptions.find((item) => item.tokenHash === hashToken(token));
  if (!subscription) return null;
  subscription.status = action === "pause" ? "paused" : action === "resume" ? "active" : "unsubscribed";
  await writeRuntimeJson(filename, subscriptions);
  return { scopeLabel: subscription.scopeLabel, status: subscription.status };
}

export async function dispatchImmediateChange(change: ApprovedChange) {
  if (!alertsAvailable()) return { sent: 0, skipped: true };
  const subscriptions = await readRuntimeJson<AlertSubscription[]>(filename, []);
  const relevant = subscriptions.filter((subscription) => subscription.status === "active" && subscription.frequency === "immediate" && subscription.changeTypes.includes(change.changeType as AlertChangeType) && ((subscription.scopeType === "offer" && subscription.scopeId === change.offerId) || (subscription.scopeType === "provider" && ["all-offers", slugify(change.provider)].includes(subscription.scopeId))) && (!subscription.targetAmount || numericValue(change.currentObservedValue) >= subscription.targetAmount));
  let sent = 0;
  for (const subscription of relevant) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    await sendEmail({ to: subscription.email, subject: `${change.provider}: ${change.changeType.replace("-", " ")}`, html: `<p>${escapeHtml(change.title)}</p><p>Previous: ${escapeHtml(change.previousObservedValue || "Not recorded")}<br>Current: ${escapeHtml(change.currentObservedValue)}</p><p><a href="${baseUrl}/offer/${change.offerId}">Review the tracked offer</a></p>` });
    sent += 1;
  }
  return { sent, skipped: false };
}

export async function getAlertCounts() {
  const subscriptions = await readRuntimeJson<AlertSubscription[]>(filename, []);
  return { total: subscriptions.length, active: subscriptions.filter((item) => item.status === "active").length, providers: countScopes(subscriptions.filter((item) => item.status === "active" && item.scopeType === "provider")) };
}

export async function dispatchWeeklyDigest(digest: WeeklyDigest) {
  if (!alertsAvailable()) return { sent: 0, skipped: true };
  const subscriptions = await readRuntimeJson<AlertSubscription[]>(filename, []);
  const deliveries = await readRuntimeJson<string[]>("weekly-alert-deliveries.json", []);
  let sent = 0;
  for (const subscription of subscriptions.filter((item) => item.status === "active" && item.frequency === "weekly")) {
    const deliveryKey = `${digest.date}:${subscription.id}`;
    if (deliveries.includes(deliveryKey)) continue;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    await sendEmail({ to: subscription.email, subject: `Weekly OfferRadar — ${digest.date}`, html: `<p>Your reviewed weekly OfferRadar digest is ready.</p><ul><li>${digest.largestIncreases.length} approved increases</li><li>${digest.newOffers.length} newly approved offers</li><li>${digest.expiringOffers.length} expiring records</li><li>${digest.needsVerification.length} needing verification</li></ul><p><a href="${baseUrl}/weekly/${digest.date}">Read the weekly digest</a></p>` });
    deliveries.push(deliveryKey); sent += 1;
  }
  await writeRuntimeJson("weekly-alert-deliveries.json", deliveries.slice(-10000));
  return { sent, skipped: false };
}

function countScopes(subscriptions: AlertSubscription[]) {
  const values: Record<string, number> = {};
  for (const item of subscriptions) values[item.scopeLabel] = (values[item.scopeLabel] || 0) + 1;
  return Object.entries(values).sort((a, b) => b[1] - a[1]).slice(0, 10);
}
function hashToken(token: string) { return createHash("sha256").update(token).digest("hex"); }
function numericValue(value: string) { const match = value.replaceAll(",", "").match(/\d+(?:\.\d+)?/); return match ? Number(match[0]) : 0; }
function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
function escapeHtml(value: string) { return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] || character); }
