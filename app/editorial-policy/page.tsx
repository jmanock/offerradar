import type { Metadata } from "next";
import Link from "next/link";
import { DisclosureBlock } from "@/components/DisclosureBlock";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How OfferRadar selects, verifies, discloses, and presents tracked offers without providing financial advice.",
  alternates: { canonical: "/editorial-policy" },
};

const policySections = [
  {
    title: "How offers are selected",
    body: "Offers are selected to represent categories users commonly compare: bank bonuses, brokerage bonuses, referral offers, high-yield savings, business banking, credit cards, and cash back apps. Each listing is written with cautious language and reminders to verify provider terms.",
  },
  {
    title: "How offers are verified",
    body: "Each listing includes a last reviewed date and verification status. The status describes the editorial review state, not a promise that the offer is still available, that a user is eligible, or that a payout will occur.",
  },
  {
    title: "How often data is intended to be checked",
    body: "The platform is structured for future daily tracking, change detection, and daily reporting. Until those systems are active, pages rely on reviewed records and visible verification dates.",
  },
  {
    title: "Outbound links and compensation",
    body: "Some outbound links may result in compensation to OfferRadar. Editorial pages remain focused on requirements, fees, verification dates, source review, and terms users should check directly with providers.",
  },
  {
    title: "Why users should verify terms directly",
    body: "Providers can change offer values, eligibility, deadlines, fees, state availability, and payout requirements. Users should rely on the provider terms shown at the time of signup or application.",
  },
  {
    title: "No financial advice",
    body: "OfferRadar is informational. It does not provide financial, investment, tax, credit, or legal advice, and it does not recommend any specific account, card, app, provider, or financial action.",
  },
];

export default function EditorialPolicyPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#e0f7ff_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
            Trust and process
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Editorial policy
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            OfferRadar is built to organize offers for comparison. Listings are
            not recommendations, and users should verify every term directly
            with the provider before opening an account, applying, or making a
            purchase.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6">
          {policySections.map((section) => (
            <section key={section.title} className="premium-card rounded-3xl p-6">
              <h2 className="text-xl font-black text-slate-950">
                {section.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/offers"
            className="rounded-full border border-slate-300 bg-white px-5 py-3 text-center text-sm font-extrabold text-slate-900 hover:border-blue-300 hover:text-blue-800"
          >
            Browse offers
          </Link>
          <Link
            href="/disclosures"
            className="rounded-full bg-blue-700 px-5 py-3 text-center text-sm font-extrabold text-white hover:bg-blue-800"
          >
            View disclosures
          </Link>
        </div>

        <div className="mt-10">
          <DisclosureBlock />
        </div>
      </div>
    </div>
  );
}
