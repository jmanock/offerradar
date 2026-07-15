import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "offerradar_ops_session";
function digest(value: string) { return createHash("sha256").update(value).digest("hex"); }
function safeEqual(a: string, b: string) { const left = Buffer.from(a); const right = Buffer.from(b); return left.length === right.length && timingSafeEqual(left, right); }

export function opsConfigured() { return Boolean(process.env.OPS_ACCESS_KEY); }
export function validateOpsKey(value: string) { const configured = process.env.OPS_ACCESS_KEY || ""; return Boolean(configured) && safeEqual(digest(value), digest(configured)); }
export async function hasOpsSession() { const value = (await cookies()).get(cookieName)?.value || ""; const configured = process.env.OPS_ACCESS_KEY || ""; return Boolean(configured) && safeEqual(value, digest(configured)); }
export async function setOpsSession() { const configured = process.env.OPS_ACCESS_KEY || ""; (await cookies()).set(cookieName, digest(configured), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 }); }
