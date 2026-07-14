import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { WatchlistClient } from "@/components/WatchlistClient";
import { getAllOffers } from "@/lib/offers";

export const metadata: Metadata = {
  title: "My Offer Watchlist",
  description: "Save and organize OfferRadar offers locally on your device, with optional target values and private notes.",
  alternates: { canonical: "/watchlist" },
};

export default function WatchlistPage() {
  const offers = getAllOffers();
  return (
    <div>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "OfferRadar Watchlist", applicationCategory: "FinanceApplication", operatingSystem: "Web", url: "https://offerradar.io/watchlist" }} />
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#dffcf4_0,#f8fbff_36%,#f6f8fb_75%)]">
        <div className="radar-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-bold text-slate-500"><Link href="/">Home</Link> / Watchlist</nav>
          <p className="mt-6 text-xs font-extrabold uppercase tracking-wide text-teal-700">Private, account-free tracking</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Your offer watchlist</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">Save offers, add a target value, and keep private notes. Your watchlist is stored only in this browser on this device. It does not sync and email alerts are not active.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><WatchlistClient offers={offers} /></section>
      <section className="border-y border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        {[['Stored locally','Saved IDs, target values, and notes stay in your browser local storage.'],['Verify before acting','Offer terms can change after the recorded review date. Check the provider source.'],['Coming next','The data model supports future change and target alerts, but no alert delivery is claimed today.']].map(([title,body]) => <div key={title} className="rounded-2xl bg-slate-50 p-5"><h2 className="font-black text-slate-950">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></div>)}
      </div></section>
    </div>
  );
}
