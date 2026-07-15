import { NextResponse } from "next/server";
import { setOpsSession, validateOpsKey } from "@/lib/opsAuth";
export async function POST(request: Request) { const body = await request.json().catch(() => null) as { key?: string } | null; if (!body?.key || !validateOpsKey(body.key)) return NextResponse.json({ error: "Access key not accepted." }, { status: 401 }); await setOpsSession(); return NextResponse.json({ ok: true }); }
