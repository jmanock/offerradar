import { NextResponse } from "next/server";
import { alertsAvailable, createAlertSubscription } from "@/lib/alertStore";
import type { AlertChangeType, AlertFrequency, AlertScopeType } from "@/types/alerts";
import { createHash } from "node:crypto";
import { readRuntimeJson, writeRuntimeJson } from "@/lib/runtimeStore";

const allowedChangeTypes: AlertChangeType[] = ["new", "increased", "decreased", "terms", "expired", "reactivated", "needs-review"];

export async function GET() {
  return NextResponse.json({ available: alertsAvailable(), requiresConfirmation: true });
}

export async function POST(request: Request) {
  if (!alertsAvailable()) return NextResponse.json({ error: "Email alerts are not configured yet." }, { status: 503 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const email = String(body.email || "").trim();
  const scopeType = body.scopeType as AlertScopeType;
  const scopeId = String(body.scopeId || "").trim();
  const scopeLabel = String(body.scopeLabel || "").trim();
  const frequency = body.frequency as AlertFrequency;
  const changeTypes = Array.isArray(body.changeTypes) ? body.changeTypes.filter((value): value is AlertChangeType => allowedChangeTypes.includes(value as AlertChangeType)) : [];
  const targetAmount = body.targetAmount === "" || body.targetAmount == null ? undefined : Number(body.targetAmount);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !["offer", "provider"].includes(scopeType) || !scopeId || !scopeLabel || !["immediate", "weekly"].includes(frequency) || !changeTypes.length || (targetAmount !== undefined && (!Number.isFinite(targetAmount) || targetAmount < 0))) {
    return NextResponse.json({ error: "Check the email, alert scope, frequency, change types, and target value." }, { status: 422 });
  }
  if (!await withinRateLimit(email, request.headers.get("x-forwarded-for") || "local")) return NextResponse.json({ error: "Too many confirmation requests. Try again later." }, { status: 429 });

  try {
    const id = await createAlertSubscription({ email, scopeType, scopeId, scopeLabel, frequency, changeTypes, targetAmount });
    return NextResponse.json({ ok: true, id, message: "Check your email to confirm and manage this alert." }, { status: 201 });
  } catch (error) {
    console.error("Alert subscription failed", error);
    return NextResponse.json({ error: "The confirmation email could not be sent. No subscription was retained." }, { status: 502 });
  }
}

async function withinRateLimit(email:string,address:string){const key=createHash("sha256").update(`${email.toLowerCase()}:${address.split(",")[0]}`).digest("hex");const now=Date.now();const entries=await readRuntimeJson<Array<{key:string;at:number}>>("alert-rate-limit.json",[]);const recent=entries.filter((item)=>now-item.at<3600000);if(recent.filter((item)=>item.key===key).length>=5)return false;recent.push({key,at:now});await writeRuntimeJson("alert-rate-limit.json",recent.slice(-5000));return true;}
