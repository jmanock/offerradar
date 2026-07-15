import type { Metadata } from "next";
import Link from "next/link";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { HowOfferRadarWorks } from "@/components/HowOfferRadarWorks";
import { JsonLd } from "@/components/JsonLd";
import { VerificationMethodology } from "@/components/VerificationMethodology";
import { getAllProviderComparisonPages } from "@/data/comparisonPages";
import { featuredGuideLinks, popularCategoryLinks } from "@/data/internalLinks";

export const metadata: Metadata = {
  title: "Compare Providers | Bank and Brokerage Comparisons",
  description:
    "Compare banks, brokerage apps, credit unions, and Florida banking providers by account types, fees, mobile experience, access, offer records, and verification reminders.",
  alternates: { canonical: "/compare" },
};

const featuredSlugs = [
  "chase-vs-robinhood",
  "chase-vs-sofi",
  "chase-vs-capital-one",
  "robinhood-vs-webull",
  "robinhood-vs-fidelity",
  "fidelity-vs-merrill-edge",
  "chase-vs-wells-fargo",
  "webull-vs-robinhood",
];

export default function CompareHubPage() {
  const comparisons = getAllProviderComparisonPages();
  const featured = featuredSlugs
    .map((slug) => comparisons.find((comparison) => comparison.slug === slug))
    .filter((comparison): comparison is NonNullable<typeof comparison> => Boolean(comparison));
  const bankComparisons = comparisons
    .filter((comparison) => comparison.sharedCategories.includes("bank-bonuses"))
    .slice(0, 12);
  const brokerageComparisons = comparisons
    .filter((comparison) => comparison.sharedCategories.includes("brokerage-bonuses"))
    .slice(0, 12);
  const creditUnionComparisons = [
    { href: "/best-credit-unions-florida", label: "Best credit unions in Florida" },
    { href: "/florida-credit-unions", label: "Florida credit unions" },
    { href: "/credit-unions-sanford-fl", label: "Credit unions in Sanford, FL" },
  ];
  const floridaComparisons = [
    { href: "/best-checking-accounts-florida", label: "Best checking accounts in Florida" },
    { href: "/best-banks-in-florida", label: "Best banks in Florida" },
    { href: "/best-bank-bonuses-florida", label: "Best bank bonuses in Florida" },
    { href: "/business-banking-florida", label: "Business banking in Florida" },
  ];

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Provider comparison hub",
          url: "https://offerradar.io/compare",
          description: metadata.description,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: featured.map((comparison, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: comparison.title,
              url: `https://offerradar.io/compare/${comparison.slug}`,
            })),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://offerradar.io" },
            { "@type": "ListItem", position: 2, name: "Compare", item: "https://offerradar.io/compare" },
          ],
        }}
      />
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#e0f7ff_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="inline-flex rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-teal-700">
            Comparison engine
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Compare banks, brokerage apps, and providers
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Use provider comparisons to review account types, fees, mobile
            experience, ATM or branch access, tracked offer records, and
            verification reminders. Provider terms control current availability.
          </p>
          <p className="mt-4 text-sm font-bold text-slate-500">
            Side-by-side research · No unsupported rankings
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-slate-950">Featured comparisons</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((comparison) => (
            <Link
              key={comparison.slug}
              href={`/compare/${comparison.slug}`}
              className="premium-card rounded-3xl p-5 transition hover:-translate-y-0.5 hover:border-blue-200"
            >
              <h3 className="font-extrabold text-slate-950">
                {comparison.providerA.name} vs {comparison.providerB.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Compare account fit, fees, access, offer categories, and
                verification reminders.
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <LinkPanel
            title="Bank comparisons"
            description="Compare national and online banking providers by checking, savings, fees, access, and tracked offer categories."
            links={bankComparisons.map((comparison) => ({
              href: `/compare/${comparison.slug}`,
              label: `${comparison.providerA.name} vs ${comparison.providerB.name}`,
            }))}
          />
          <LinkPanel
            title="Brokerage comparisons"
            description="Compare brokerage apps and investment providers by funding promotions, transfers, fees, mobile experience, and account fit."
            links={brokerageComparisons.map((comparison) => ({
              href: `/compare/${comparison.slug}`,
              label: `${comparison.providerA.name} vs ${comparison.providerB.name}`,
            }))}
          />
          <LinkPanel
            title="Credit union comparisons"
            description="Review credit union research paths by membership rules, fees, branch access, and Florida availability."
            links={creditUnionComparisons}
          />
          <LinkPanel
            title="Florida banking comparisons"
            description="Compare Florida checking, banking, credit union, and business banking research pages."
            links={floridaComparisons}
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <LinkPanel title="Related tools" links={[
          { href: "/banking-finder", label: "Banking finder" },
          { href: "/offer-tracker", label: "Offer tracker" },
          { href: "/bank-bonus-calculator", label: "Bank bonus calculator" },
          { href: "/brokerage-bonus-calculator", label: "Brokerage bonus calculator" },
        ]} />
        <LinkPanel title="Featured guides" links={featuredGuideLinks} />
        <LinkPanel title="Popular categories" links={popularCategoryLinks} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <HowOfferRadarWorks />
        <DisclosureBlock />
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <VerificationMethodology />
      </section>
    </div>
  );
}

function LinkPanel({
  title,
  description,
  links,
}: {
  title: string;
  description?: string;
  links: { href: string; label: string }[];
}) {
  return (
    <section className="premium-card rounded-3xl p-6">
      <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
