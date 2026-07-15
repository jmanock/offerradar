import type { Metadata } from "next";
import Link from "next/link";
import { OpsChangesClient } from "@/components/OpsChangesClient";
export const metadata: Metadata = { title: "Editorial Change Queue | OfferRadar Ops", robots: { index: false, follow: false } };
export default function OpsChangesPage() { return <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8"><Link href="/ops" className="text-sm font-extrabold text-blue-700">Ops dashboard</Link><p className="mt-5 text-xs font-extrabold uppercase tracking-wide text-teal-700">Private editorial workflow</p><h1 className="mt-3 text-4xl font-black text-slate-950">Offer change review queue</h1><p className="mt-3 mb-8 max-w-3xl leading-7 text-slate-600">Detected differences remain private until a reviewer approves the supporting observations, source, status, and public summary.</p><OpsChangesClient /></main>; }
