import { NextResponse } from "next/server";
import { getApprovedChanges, getChangeQueue, reviewChange } from "@/lib/changeQueue";
import { hasOpsSession, opsConfigured } from "@/lib/opsAuth";

export async function GET() { if (!opsConfigured()) return NextResponse.json({ configured: false }, { status: 503 }); if (!await hasOpsSession()) return NextResponse.json({ configured: true, authenticated: false }, { status: 401 }); return NextResponse.json({ configured: true, authenticated: true, queue: await getChangeQueue(), approved: await getApprovedChanges() }); }
export async function POST(request: Request) { if (!await hasOpsSession()) return NextResponse.json({ error: "Unauthorized." }, { status: 401 }); const body = await request.json().catch(() => null) as { id?: string; action?: "approve" | "reject" | "research"; note?: string } | null; if (!body?.id || !body.action || !["approve", "reject", "research"].includes(body.action)) return NextResponse.json({ error: "Invalid review action." }, { status: 400 }); const result = await reviewChange(body.id, body.action, body.note?.slice(0, 500)); return NextResponse.json(result, { status: result.ok ? 200 : result.status }); }
