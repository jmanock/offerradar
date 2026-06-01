import type { Metadata } from "next";
import { DisclosureBlock } from "@/components/DisclosureBlock";

export const metadata: Metadata = {
  title: "Disclosures",
  description:
    "OfferRadar disclosure information about referral or affiliate compensation, changing terms, and provider verification.",
  alternates: { canonical: "/disclosures" },
};

export default function DisclosuresPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-slate-950">
        Disclosures
      </h1>
      <div className="mt-8">
        <DisclosureBlock />
      </div>
      <div className="mt-8 space-y-6 rounded-xl border border-slate-200 bg-white p-6 text-slate-600">
        <section>
          <h2 className="text-xl font-bold text-slate-950">
            Offers can change
          </h2>
          <p className="mt-3 leading-7">
            Listed offers are examples for comparison. Providers may change
            eligibility, values, deadlines, fees, and payout rules after a page
            is last checked.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">
            Verify with providers
          </h2>
          <p className="mt-3 leading-7">
            Always review the live provider terms before opening an account,
            applying, transferring money, or completing activity for a bonus.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">
            No financial advice
          </h2>
          <p className="mt-3 leading-7">
            OfferRadar is informational and built for comparison. It does not
            recommend accounts, investments, cards, or financial decisions.
          </p>
        </section>
      </div>
    </div>
  );
}
