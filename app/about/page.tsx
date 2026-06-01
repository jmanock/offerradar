import type { Metadata } from "next";
import Link from "next/link";
import { DisclosureBlock } from "@/components/DisclosureBlock";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how OfferRadar organizes example bonuses, offers, referrals, and promotions for comparison and verification.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-slate-950">
        About OfferRadar
      </h1>
      <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600">
        <p>
          OfferRadar is a data-first static platform for tracking bonuses, offers,
          referrals, and promotions in one organized place.
        </p>
        <p>
          The goal is comparison clarity: offer amount, provider, category,
          requirements, fees to check, status, and last checked dates. Listings
          use cautious language because provider terms can change, expire, or
          vary by user.
        </p>
        <p>
          OfferRadar does not provide financial advice. Use the pages as a
          research starting point, then verify every detail directly with the
          provider before opening an account or applying.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/offers"
          className="inline-flex justify-center rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Browse offers
        </Link>
        <Link
          href="/disclosures"
          className="inline-flex justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:border-blue-300"
        >
          Read disclosures
        </Link>
        <Link
          href="/editorial-policy"
          className="inline-flex justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:border-blue-300"
        >
          Editorial policy
        </Link>
      </div>
      <div className="mt-10">
        <DisclosureBlock />
      </div>
    </div>
  );
}
