import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { DisclosureBlock } from "@/components/DisclosureBlock";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How OfferRadar selects, verifies, discloses, and presents example offers without providing financial advice.",
  alternates: { canonical: "/editorial-policy" },
};

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
        <PolicySection title="How offers are selected">
          Offers are selected to represent categories users commonly compare:
          bank bonuses, brokerage bonuses, referral offers, high-yield savings,
          business banking, credit cards, and cash back apps. The site uses
          local placeholder data with cautious language and no claim that a
          specific real-world offer is available.
        </PolicySection>
        <PolicySection title="How offers are verified">
          Each listing includes a last checked date and verification status.
          The status describes the local review state, not a promise that the
          offer is still available, that a user is eligible, or that a payout
          will occur.
        </PolicySection>
        <PolicySection title="How often data is intended to be checked">
          The platform is structured for future daily tracking, change
          detection, and daily reporting. Those systems are not implemented in
          this static version; current data remains manually seeded.
        </PolicySection>
        <PolicySection title="Referral and affiliate compensation">
          OfferRadar may earn compensation through referral or affiliate links.
          Compensation may influence which offers are tracked or how links are
          presented, but the site should still make requirements, fees, and
          verification reminders easy to find.
        </PolicySection>
        <PolicySection title="Why users should verify terms directly">
          Providers can change offer values, eligibility, deadlines, fees,
          state availability, and payout requirements. Users should rely on the
          provider terms shown at the time of signup or application.
        </PolicySection>
        <PolicySection title="No financial advice">
          OfferRadar is informational. It does not provide financial,
          investment, tax, credit, or legal advice, and it does not recommend
          any specific account, card, app, provider, or financial action.
        </PolicySection>
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

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="premium-card rounded-3xl p-6">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600">{children}</p>
    </section>
  );
}
