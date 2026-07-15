"use client";
import { useState } from "react";

export function AlertManageClient({ token, confirmed }: { token: string; confirmed: boolean }) {
  const [status, setStatus] = useState(confirmed ? "Alert confirmed and active." : "Use a valid magic link from your email.");
  async function act(action: "pause" | "resume" | "unsubscribe") {
    const response = await fetch("/api/alerts/manage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, action }) });
    const result = await response.json(); setStatus(response.ok ? `Alert is now ${result.status}.` : result.error);
  }
  return <div className="premium-card rounded-3xl p-6"><p role="status" className="font-bold text-slate-800">{status}</p><div className="mt-5 flex flex-wrap gap-2"><button onClick={() => act("pause")} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-extrabold">Pause</button><button onClick={() => act("resume")} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-extrabold">Resume</button><button onClick={() => act("unsubscribe")} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-extrabold text-white">Unsubscribe</button></div></div>;
}
