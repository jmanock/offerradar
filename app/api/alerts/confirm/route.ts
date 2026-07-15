import { NextResponse } from "next/server";
import { confirmAlert } from "@/lib/alertStore";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") || "";
  const confirmed = token && await confirmAlert(token);
  const destination = new URL("/alerts/manage", request.url);
  if (token) destination.searchParams.set("token", token);
  destination.searchParams.set("confirmed", confirmed ? "1" : "0");
  return NextResponse.redirect(destination);
}
