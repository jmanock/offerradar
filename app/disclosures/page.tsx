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
    <div>
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#dffcf4_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
            Transparency
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Disclosures
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Clear disclosure language is part of the product, not a footer
            afterthought.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <DisclosureBlock />
      <div className="mt-8 grid gap-6 text-slate-600">
        <section>
          <div className="premium-card rounded-3xl p-6">
          <h2 className="text-xl font-black text-slate-950">
            Referral and affiliate links
          </h2>
          <p className="mt-3 leading-7">
            Some links may be referral or affiliate links, and OfferRadar may
            earn compensation if a user signs up, applies, opens an account, or
            completes eligible activity through those links. Referral or
            affiliate compensation does not mean an offer is best for a user or
            that a user will qualify.
          </p>
          </div>
        </section>
        <section>
          <div className="premium-card rounded-3xl p-6">
          <h2 className="text-xl font-black text-slate-950">
            Offers can change
          </h2>
          <p className="mt-3 leading-7">
            Listed offers are examples for comparison. Providers may change
            eligibility, values, deadlines, fees, and payout rules after a page
            is last checked.
          </p>
          </div>
        </section>
        <section>
          <div className="premium-card rounded-3xl p-6">
          <h2 className="text-xl font-black text-slate-950">
            Verify with providers
          </h2>
          <p className="mt-3 leading-7">
            Always review the live provider terms before opening an account,
            applying, transferring money, or completing activity for a bonus.
          </p>
          </div>
        </section>
        <section>
          <div className="premium-card rounded-3xl p-6">
          <h2 className="text-xl font-black text-slate-950">
            No financial advice
          </h2>
          <p className="mt-3 leading-7">
            OfferRadar is informational and built for comparison. It does not
            recommend accounts, investments, cards, or financial decisions.
          </p>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}
