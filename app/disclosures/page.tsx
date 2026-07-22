import type { Metadata } from "next";
import { DisclosureBlock } from "@/components/DisclosureBlock";

export const metadata: Metadata = {
  title: "Disclosures",
  description:
    "OfferRadar disclosure information about outbound links, changing terms, and provider verification.",
  alternates: { canonical: "/disclosures" },
};

const disclosureSections = [
  {
    title: "Outbound links and compensation",
    body: "Some outbound links may result in compensation to OfferRadar, while many providers do not compensate us. Compensation does not automatically determine rankings or change our research standards, and it never indicates that a user will qualify.",
  },
  { title: "Official sources and partner links", body: "OfferRadar may link separately to a provider's official source or to a tracked affiliate resource. Partner links are labeled and use the same requirements-first verification standard as other outbound resources." },
  {
    title: "Offers can change",
    body: "Listed promotions are provided for comparison. Providers may change eligibility, values, deadlines, fees, and payout rules after a page is last reviewed.",
  },
  {
    title: "Verify with providers",
    body: "Always review live provider terms before opening an account, applying, transferring money, or completing activity for a bonus.",
  },
  {
    title: "No financial advice",
    body: "OfferRadar is informational and built for comparison. It does not recommend accounts, investments, cards, or financial decisions.",
  },
];

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
          {disclosureSections.map((section) => (
            <section key={section.title} className="premium-card rounded-3xl p-6">
              <h2 className="text-xl font-black text-slate-950">
                {section.title}
              </h2>
              <p className="mt-3 leading-7">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
