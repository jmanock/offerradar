"use client";

import { useEffect, useState } from "react";
import { event } from "@/lib/analytics";
import type { AlertChangeType, AlertScopeType } from "@/types/alerts";

const choices: Array<{ value: AlertChangeType; label: string }> = [
  { value: "new", label: "New offer" }, { value: "increased", label: "Value increases" }, { value: "decreased", label: "Value decreases" }, { value: "terms", label: "Terms change" }, { value: "expired", label: "Offer expires" }, { value: "reactivated", label: "Offer returns" }, { value: "needs-review", label: "Needs verification" },
];

export function AlertSubscribeForm({ scopeType, scopeId, scopeLabel, compact = false }: { scopeType: AlertScopeType; scopeId: string; scopeLabel: string; compact?: boolean }) {
  const [available, setAvailable] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState<"immediate" | "weekly">("weekly");
  const [targetAmount, setTargetAmount] = useState("");
  const [changeTypes, setChangeTypes] = useState<AlertChangeType[]>(["new", "increased", "terms", "expired"]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/alerts/subscribe").then((response) => response.json()).then((data) => { if (active) setAvailable(Boolean(data.available)); }).catch(() => { if (active) setAvailable(false); });
    return () => { active = false; };
  }, []);

  if (available === false) return <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4"><p className="font-extrabold text-amber-900">Email alerts are not active yet</p><p className="mt-1 text-sm leading-6 text-amber-800">The reviewed alert workflow is installed, but delivery remains unavailable until production email and privacy settings are configured. Nothing is collected here.</p></div>;
  if (available === null) return <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">Checking alert availability…</div>;

  async function submit(eventObject: React.FormEvent<HTMLFormElement>) {
    eventObject.preventDefault(); setSubmitting(true); setMessage("");
    const response = await fetch("/api/alerts/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, scopeType, scopeId, scopeLabel, targetAmount, frequency, changeTypes }) });
    const result = await response.json(); setSubmitting(false); setMessage(result.message || result.error);
    if (response.ok) { event("alert_subscription", { scope_type: scopeType, scope_id: scopeId, frequency }); setEmail(""); }
  }

  return <form onSubmit={submit} className="grid gap-4">
    <div><p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">Follow {scopeType}</p><h2 className={`${compact ? "text-lg" : "text-2xl"} mt-2 font-black text-slate-950`}>Get reviewed change alerts for {scopeLabel}</h2><p className="mt-2 text-sm leading-6 text-slate-600">Confirm by email. Pause or unsubscribe from the same private magic link—no password or profile.</p></div>
    <label className="grid gap-1 text-sm font-bold text-slate-700">Email<input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-950" /></label>
    {scopeType === "offer" ? <label className="grid gap-1 text-sm font-bold text-slate-700">Optional target amount<input inputMode="decimal" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} placeholder="500" className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-950" /></label> : null}
    <fieldset><legend className="text-sm font-bold text-slate-700">Alert me when</legend><div className="mt-2 grid gap-2 sm:grid-cols-2">{choices.map((choice) => <label key={choice.value} className="flex items-center gap-2 rounded-xl bg-slate-50 p-2 text-sm font-semibold text-slate-700"><input type="checkbox" checked={changeTypes.includes(choice.value)} onChange={() => setChangeTypes((current) => current.includes(choice.value) ? current.filter((value) => value !== choice.value) : [...current, choice.value])} />{choice.label}</label>)}</div></fieldset>
    <label className="grid gap-1 text-sm font-bold text-slate-700">Delivery<select value={frequency} onChange={(e) => setFrequency(e.target.value as "immediate" | "weekly")} className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-950"><option value="weekly">Weekly digest</option><option value="immediate">After an approved change</option></select></label>
    <button disabled={submitting || !changeTypes.length} className="rounded-full bg-blue-700 px-5 py-3 text-sm font-extrabold text-white disabled:opacity-50">{submitting ? "Sending confirmation…" : "Email me a magic link"}</button>
    {message ? <p role="status" className="rounded-xl bg-slate-100 p-3 text-sm font-semibold text-slate-700">{message}</p> : null}
  </form>;
}
