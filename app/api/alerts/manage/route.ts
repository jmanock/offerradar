import { NextResponse } from "next/server";
import { manageAlert } from "@/lib/alertStore";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { token?: string; action?: "pause" | "resume" | "unsubscribe" } | null;
  if (!body?.token || !body.action || !["pause", "resume", "unsubscribe"].includes(body.action)) return NextResponse.json({ error: "Invalid management request." }, { status: 400 });
  const result = await manageAlert(body.token, body.action);
  if (!result) return NextResponse.json({ error: "This management link is invalid." }, { status: 404 });
  return NextResponse.json({ ok: true, ...result });
}
