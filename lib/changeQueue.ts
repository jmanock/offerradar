import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { dispatchImmediateChange } from "@/lib/alertStore";
import type { ApprovedChange, ChangeCandidate, ChangeType } from "@/types/change";

const queuePath = join(process.cwd(), "automation", "queue", "pending-changes.json");
const approvedPath = join(process.cwd(), "data", "approvedChanges.json");

async function readJson<T>(path: string, fallback: T): Promise<T> { try { return JSON.parse(await readFile(path, "utf8")) as T; } catch { return fallback; } }
async function writeJson(path: string, value: unknown) { await writeFile(path, `${JSON.stringify(value, null, 2)}\n`); }

export async function getChangeQueue() { return readJson<ChangeCandidate[]>(queuePath, []); }
export async function getApprovedChanges() { return readJson<ApprovedChange[]>(approvedPath, []); }

export function validateChangeForPublication(candidate: ChangeCandidate) {
  const errors: string[] = [];
  if (!candidate.provider.trim()) errors.push("Provider is required.");
  if (!candidate.sourceUrl.trim()) errors.push("Source URL is required.");
  else { try { const url = new URL(candidate.sourceUrl); if (!/^https?:$/.test(url.protocol)) errors.push("Source URL must use HTTP or HTTPS."); } catch { errors.push("Source URL is invalid."); } }
  if (!Number.isFinite(Date.parse(candidate.detectedAt))) errors.push("Detection date is invalid.");
  if (candidate.changeType !== "expired" && !isStructuredValue(candidate.currentObservedValue)) errors.push("Current observed value is malformed.");
  if (candidate.changeType === "expired" && (!candidate.previousObservedValue || !isStructuredValue(candidate.previousObservedValue))) errors.push("Expiration requires a valid prior observation.");
  if (["increased", "decreased"].includes(candidate.changeType) && (!candidate.previousObservedValue || !isStructuredValue(candidate.previousObservedValue))) errors.push("Increase/decrease requires a valid prior observation.");
  if (["increased", "decreased"].includes(candidate.changeType) && candidate.previousObservedValue === candidate.currentObservedValue) errors.push("Increase/decrease values must differ.");
  if (candidate.changeType === "expired" && candidate.proposedStatus && candidate.proposedStatus !== "expired") errors.push("Expired change conflicts with proposed status.");
  if (candidate.changeType === "reactivated" && candidate.proposedStatus === "expired") errors.push("Reactivated change conflicts with expired status.");
  return errors;
}

export async function reviewChange(id: string, action: "approve" | "reject" | "research", note = "") {
  const queue = await getChangeQueue();
  const candidate = queue.find((item) => item.id === id);
  if (!candidate) return { ok: false as const, status: 404, errors: ["Change candidate not found."] };
  if (candidate.status !== "pending" && candidate.status !== "research") return { ok: false as const, status: 409, errors: ["This candidate has already been reviewed."] };

  if (action === "approve") {
    const errors = validateChangeForPublication(candidate);
    if (errors.length) return { ok: false as const, status: 422, errors };
    const approved: ApprovedChange = { ...candidate, status: "approved", approvedAt: new Date().toISOString(), reviewedAt: new Date().toISOString(), reviewerNote: note };
    const existing = await getApprovedChanges();
    await writeJson(approvedPath, [...existing.filter((item) => item.id !== id), approved]);
    candidate.status = "approved";
    candidate.reviewedAt = approved.reviewedAt;
    candidate.reviewerNote = note;
    await writeJson(queuePath, queue);
    const delivery = await dispatchImmediateChange(approved);
    return { ok: true as const, candidate, delivery };
  }

  candidate.status = action === "reject" ? "rejected" : "research";
  candidate.reviewedAt = new Date().toISOString();
  candidate.reviewerNote = note;
  await writeJson(queuePath, queue);
  return { ok: true as const, candidate, delivery: { sent: 0, skipped: true } };
}

export function changeLabel(type: ChangeType) { return type.replace("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()); }
function isStructuredValue(value: string) { return /(?:\$\s?\d|\d[\d,]*(?:\.\d+)?\s?(?:%|points?|miles?|credit|bonus|apy)?)/i.test(value.trim()); }
