import type { Metadata } from "next";
import Link from "next/link";
import { BankingFinderClient } from "@/components/BankingFinderClient";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { HowOfferRadarWorks } from "@/components/HowOfferRadarWorks";
import { JsonLd } from "@/components/JsonLd";
import { VerificationMethodology } from "@/components/VerificationMethodology";

export const metadata: Metadata = {
  title: "Banking Finder | Choose a Research Path",
  description:
    "Use the OfferRadar banking finder to choose research paths for checking accounts, savings accounts, credit unions, brokerage bonuses, and bank bonuses.",
  alternates: { canonical: "/banking-finder" },
};

const finderFaq = [
  {
    question: "Does the banking finder recommend specific financial products?",
    answer:
      "No. The finder recommends OfferRadar research pages, categories, guides, and comparison paths. It is not personalized financial advice.",
  },
  {
    question: "What should I verify after using the finder?",
    answer:
      "Verify account fees, eligibility, minimum deposits, direct deposit rules, ATM or branch access, rates, bonus terms, and provider availability directly.",
  },
];

export default function BankingFinderPage() {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "OfferRadar Banking Finder",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          url: "https://offerradar.io/banking-finder",
          description: metadata.description,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: finderFaq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://offerradar.io" },
            { "@type": "ListItem", position: 2, name: "Banking Finder", item: "https://offerradar.io/banking-finder" },
          ],
        }}
      />
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#dffcf4_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="inline-flex rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-teal-700">
            Start here
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Banking finder
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Choose the account type, comparison factor, and provider style you
            care about. OfferRadar will point you to research pages and tracked
            offer categories without recommending a specific product.
          </p>
          <p className="mt-4 text-sm font-bold text-slate-500">
            Research paths only · Verify current terms directly with providers
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <BankingFinderClient />
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-950">Strong starting points</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              { href: "/best-checking-accounts-florida", label: "Best checking accounts in Florida" },
              { href: "/best-banks-for-checking", label: "Best banks for checking" },
              { href: "/best-credit-unions-florida", label: "Best credit unions in Florida" },
              { href: "/bank-bonuses", label: "Bank bonuses" },
              { href: "/brokerage-bonuses", label: "Brokerage bonuses" },
              { href: "/offers", label: "All tracked offers" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <HowOfferRadarWorks />
        <DisclosureBlock />
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <VerificationMethodology />
      </section>
    </div>
  );
}
