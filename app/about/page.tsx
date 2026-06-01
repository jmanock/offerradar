import type { Metadata } from "next";
import Link from "next/link";
import { DisclosureBlock } from "@/components/DisclosureBlock";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how OfferRadar organizes bonuses, offers, referrals, and promotions for comparison and verification.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#dffcf4_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
            About OfferRadar
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Built for clearer offer comparison
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            OfferRadar organizes bonuses, referrals, promotions, fees,
            verification dates, and source links so users can compare terms
            before opening an account or applying.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6">
          {[
            [
              "Requirements-first tracking",
              "We surface offer amount, provider, category, requirements, fees to check, status, and last reviewed dates together.",
            ],
            [
              "Disclosure-first presentation",
              "Referral or affiliate relationships are disclosed, and provider terms remain the source of truth.",
            ],
            [
              "No financial advice",
              "OfferRadar is informational. Use it as a research starting point, then verify details directly with the provider.",
            ],
          ].map(([title, body]) => (
            <section key={title} className="premium-card rounded-3xl p-6">
              <h2 className="text-xl font-black text-slate-950">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{body}</p>
            </section>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/offers"
            className="inline-flex justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-800"
          >
            Browse offers
          </Link>
          <Link
            href="/disclosures"
            className="inline-flex justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:border-blue-300"
          >
            Read disclosures
          </Link>
          <Link
            href="/editorial-policy"
            className="inline-flex justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:border-blue-300"
          >
            Editorial policy
          </Link>
        </div>
        <div className="mt-10">
          <DisclosureBlock />
        </div>
      </div>
    </div>
  );
}
