import { NextResponse } from "next/server";
import { dispatchWeeklyDigest } from "@/lib/alertStore";
import digestsJson from "@/data/weeklyDigests.json";
import type { WeeklyDigest } from "@/types/weekly";
export async function POST(request:Request){const secret=process.env.CRON_SECRET;if(!secret||request.headers.get("authorization")!==`Bearer ${secret}`)return NextResponse.json({error:"Unauthorized."},{status:401});const digest=(digestsJson as WeeklyDigest[])[0];if(!digest)return NextResponse.json({error:"No generated digest."},{status:409});return NextResponse.json(await dispatchWeeklyDigest(digest));}
