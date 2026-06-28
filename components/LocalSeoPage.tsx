import Link from "next/link";
import { AnalyticsEvent } from "@/components/AnalyticsEvent";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { JsonLd } from "@/components/JsonLd";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { ResearchMethodologyBlock } from "@/components/ResearchMethodologyBlock";
import { SortableComparisonTable } from "@/components/SortableComparisonTable";
import { VerificationMethodology } from "@/components/VerificationMethodology";
import type { LocalSeoPage } from "@/data/localSeo";

export function LocalSeoPageView({ page }: { page: LocalSeoPage }) {
  const isFloridaChecking = page.slug === "best-checking-accounts-florida";
  const isFloridaCreditUnions = page.slug === "best-credit-unions-florida";
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    areaServed: page.location,
    provider: {
      "@type": "Organization",
      name: "OfferRadar",
      url: "https://offerradar.io",
    },
    description: page.description,
  };

  return (
    <div>
      {page.kind === "city" ? (
        <AnalyticsEvent
          name="city_page_view"
          params={{ city: page.location, page_slug: page.slug }}
        />
      ) : null}
      <JsonLd data={faqSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://offerradar.io",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: page.title,
              item: `https://offerradar.io/${page.slug}`,
            },
          ],
        }}
      />
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#dffcf4_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-teal-700">
              Florida banking comparison
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">{page.intro}</p>
            <p className="mt-5 text-sm font-bold text-slate-500">
              Last updated {page.lastUpdated} · Source reviewed · Last verified
              dates shown where offer records are available
            </p>
          </div>
          <div className="premium-card rounded-3xl p-6">
            <h2 className="text-xl font-black text-slate-950">
              {page.cta.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {page.cta.body}
            </p>
            <div className="mt-5 grid gap-3">
              <Link
                href="#lead-capture"
                className="inline-flex justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-800"
              >
                Review local options
              </Link>
              <Link
                href="/offers"
                className="inline-flex justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-extrabold text-slate-900 hover:border-blue-300 hover:text-blue-800"
              >
                Compare offers
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ResearchMethodologyBlock
          focus={
            isFloridaCreditUnions
              ? "Florida credit unions"
              : isFloridaChecking
                ? "Florida checking accounts"
                : "local banking pages"
          }
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          {page.comparisonSections.map((section) => (
            <article key={section.title} className="premium-card rounded-3xl p-6">
              <h2 className="text-2xl font-black text-slate-950">
                {section.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">{section.body}</p>
              <div className="mt-5 grid gap-3">
                {section.points.map((point) => (
                  <p key={point} className="rounded-2xl bg-slate-50 p-3 text-sm font-bold text-slate-700">
                    {point}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {isFloridaChecking ? (
        <>
          <SortableComparisonTable
            title="Sortable Florida checking comparison"
            description="Sort common Florida checking account research paths by monthly fee, minimum deposit, ATM access, or bonus amount. Values are cautious research fields, not guaranteed provider terms."
            rows={floridaCheckingSortableRows}
            showBonus
          />
          <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-950">Direct deposit bonus comparison</h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-600">
              Use this table as a Florida checking account bonus research
              checklist. The provider terms define qualifying deposits,
              deadlines, payout timing, and eligibility.
            </p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-[900px] w-full text-left text-sm">
                <thead className="bg-slate-950 text-white">
                  <tr>{["Provider", "Tracked bonus", "Direct deposit note", "Fee note", "Verification"].map((heading) => <th key={heading} className="px-4 py-3">{heading}</th>)}</tr>
                </thead>
                <tbody>
                  {directDepositRows.map((row) => (
                    <tr key={row.provider} className="border-t border-slate-200">
                      <td className="px-4 py-4 font-extrabold text-slate-950">{row.href ? <Link href={row.href} className="text-blue-700">{row.provider}</Link> : row.provider}</td>
                      <td className="px-4 py-4 text-slate-700">{row.bonus}</td>
                      <td className="px-4 py-4 text-slate-700">{row.deposit}</td>
                      <td className="px-4 py-4 text-slate-700">{row.fees}</td>
                      <td className="px-4 py-4 text-slate-700">{row.verification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-3 lg:px-8">
            <ComparisonCard
              title="Best bank bonuses for Florida residents"
              body="Florida residents can compare national, regional, online, and local account offers, but state availability and enrollment channels can vary. Start with the offer requirements, then verify current terms directly with the institution."
              href="/best-bank-bonuses-florida"
              linkLabel="Review Florida bank bonuses"
            />
            <ComparisonCard
              title="Minimum deposit comparison"
              body="Minimum opening deposits and bonus-related funding requirements are different concepts. A low opening deposit does not mean a promotion has low activity requirements."
              href="/guides/minimum-deposits"
              linkLabel="Review minimum deposits"
            />
            <ComparisonCard
              title="Monthly fee comparison"
              body="Monthly fees can matter more than a one-time promotion if the account is hard to waive. Compare direct deposit, balance, and activity waiver paths before opening."
              href="/no-monthly-fee-bank-bonuses"
              linkLabel="Compare fee-focused offers"
            />
          </section>
          <section className="border-y border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-black text-slate-950">Minimum deposit and monthly fee comparison</h2>
              <p className="mt-3 max-w-4xl leading-7 text-slate-600">
                Use this as a research checklist for checking accounts in
                Florida. The exact opening deposit, fee waiver, and promotion
                requirement should be confirmed from the provider source.
              </p>
              <ResponsiveTable
                headings={["Provider", "Minimum deposit lens", "Monthly fee lens", "What to verify"]}
                rows={checkingCostRows.map((row) => [row.provider, row.deposit, row.fee, row.verify])}
              />
            </div>
          </section>
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-950">Mobile banking comparison</h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-600">
              Mobile banking can matter as much as branch access for Florida
              users who travel between cities, rely on mobile check deposit, or
              manage direct deposits and alerts from a phone.
            </p>
            <ResponsiveTable
              headings={["Bank type", "Mobile strengths", "Access tradeoffs", "Verification notes"]}
              rows={mobileBankingRows.map((row) => [row.type, row.strengths, row.tradeoffs, row.verify])}
            />
          </section>
          <section className="border-y border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-black text-slate-950">Best banks for checking in Florida</h2>
              <p className="mt-3 max-w-4xl leading-7 text-slate-600">
                These institutions are useful comparison starting points because
                they represent national banks, regional banks, and Florida
                credit unions. Account availability, branch coverage, fees,
                and promotions should be verified directly.
              </p>
              <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-[850px] w-full text-left text-sm">
                  <thead className="bg-slate-950 text-white"><tr>{["Bank", "Branch availability", "Online banking", "ATM access", "Bonus availability", "Verification status"].map((heading) => <th key={heading} className="px-4 py-3">{heading}</th>)}</tr></thead>
                  <tbody>{floridaBanks.map((bank) => <tr key={bank.name} className="border-t border-slate-200"><td className="px-4 py-4 font-extrabold text-slate-950">{bank.href ? <Link href={bank.href} className="text-blue-700">{bank.name}</Link> : bank.name}</td><td className="px-4 py-4 text-slate-700">{bank.branches}</td><td className="px-4 py-4 text-slate-700">Available; verify features</td><td className="px-4 py-4 text-slate-700">Verify network and fees</td><td className="px-4 py-4 text-slate-700">{bank.bonus}</td><td className="px-4 py-4 text-slate-700">{bank.status}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          </section>
          <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
            <article className="premium-card rounded-3xl p-6">
              <h2 className="text-2xl font-black text-slate-950">Best online banks in Florida</h2>
              <p className="mt-3 leading-7 text-slate-600">Online banks may fit Florida users who prefer mobile account access, digital transfers, and broad ATM networks. Verify cash deposit rules, monthly fees, support options, and deposit insurance before opening an account.</p>
              <Link href="/best-online-banks-in-florida" className="mt-5 inline-flex font-extrabold text-blue-700">Review online banks in Florida</Link>
            </article>
            <article className="premium-card rounded-3xl p-6">
              <h2 className="text-2xl font-black text-slate-950">Florida credit unions</h2>
              <p className="mt-3 leading-7 text-slate-600">Credit unions may use membership eligibility and emphasize local service. Compare fees, eligibility, shared branch access, deposit insurance, and account fit before relying on a promotion.</p>
              <Link href="/florida-credit-unions" className="mt-5 inline-flex font-extrabold text-blue-700">Compare Florida credit union research</Link>
            </article>
            <article className="premium-card rounded-3xl p-6">
              <h2 className="text-2xl font-black text-slate-950">National banks vs local banks</h2>
              <p className="mt-3 leading-7 text-slate-600">National banks may offer broader branch, ATM, and digital coverage, while local banks and credit unions may offer community presence or membership-based service. Compare fees, access, support, and account usefulness.</p>
            </article>
            <article className="premium-card rounded-3xl p-6">
              <h2 className="text-2xl font-black text-slate-950">Florida direct deposit requirements explained</h2>
              <p className="mt-3 leading-7 text-slate-600">Providers may define qualifying direct deposit differently. Verify accepted sources, required amount, timing window, account package, monthly fee waiver, and bonus posting period.</p>
              <Link href="/guides/direct-deposits" className="mt-5 inline-flex font-extrabold text-blue-700">Read the direct deposit guide</Link>
              <Link href="/florida-world-cup-travel-banking-guide" className="mt-3 block font-extrabold text-blue-700">Review Florida travel banking considerations</Link>
            </article>
          </section>
          <section className="border-y border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-black text-slate-950">Florida banking by city</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale"].map((city) => <article key={city} className="rounded-2xl bg-slate-50 p-4"><h3 className="font-extrabold text-slate-950">{city}</h3><p className="mt-2 text-sm leading-6 text-slate-600">Compare branch access, regional institutions, credit unions, and online alternatives serving {city}.</p><Link href="/best-banks-in-florida" className="mt-3 inline-flex text-sm font-extrabold text-blue-700">Review Florida banks</Link></article>)}
              </div>
            </div>
          </section>
        </>
      ) : null}

      {isFloridaCreditUnions ? (
        <>
          <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="premium-card rounded-3xl p-6">
              <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
                Evaluation method
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">
                How we evaluate credit unions
              </h2>
              <p className="mt-3 max-w-4xl leading-7 text-slate-600">
                OfferRadar compares credit unions by membership eligibility,
                checking fees, savings and certificate considerations, ATM and
                shared-branch access, mobile banking tools, student and family
                fit, and the details users should verify directly. We do not
                rank credit unions by unverified rates or unsupported claims.
              </p>
            </div>
          </section>
          <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {creditUnionBestForSections.map((section) => (
                <article key={section.title} className="premium-card rounded-3xl p-6">
                  <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
                    {section.eyebrow}
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-slate-950">
                    {section.title}
                  </h2>
                  <p className="mt-3 leading-7 text-slate-600">{section.body}</p>
                </article>
              ))}
            </div>
          </section>
          <SortableComparisonTable
            title="Sortable Florida credit union comparison"
            description="Sort credit union research paths by monthly fee, minimum deposit, or ATM access. Verify membership rules, fee schedules, savings rates, and digital tools directly with the credit union."
            rows={creditUnionSortableRows}
          />
          <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-3">
              <ComparisonCard
                title="Florida credit unions"
                body="Florida credit unions may serve specific counties, cities, employers, schools, or association groups. Compare eligibility, branch access, shared branching, checking fees, savings options, and mobile tools."
                href="/florida-credit-unions"
                linkLabel="Review Florida credit unions"
              />
              <ComparisonCard
                title="National credit unions"
                body="Some credit unions have broader national membership paths or digital account opening. Verify field of membership, funding rules, branch access, and whether the product is available in Florida."
                href="/best-banks-in-florida"
                linkLabel="Compare Florida banking options"
              />
              <ComparisonCard
                title="Credit union vs bank"
                body="A credit union can be useful for local service or member-focused products, while a bank may offer broader branch networks or more specialized digital tools. Neither is automatically better."
                href="/best-checking-accounts-florida"
                linkLabel="Compare checking accounts"
              />
            </div>
          </section>
          <section className="border-y border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-black text-slate-950">Florida credit union comparison table</h2>
              <p className="mt-3 max-w-4xl leading-7 text-slate-600">
                This table avoids ranking credit unions by unsupported rates or
                promises. Use it to compare membership rules, fees, mobile
                access, ATM networks, and the details to verify directly.
              </p>
              <ResponsiveTable
                headings={["Institution type", "Membership requirement", "Fee check", "Mobile and ATM access", "Verify directly"]}
                rows={creditUnionRows.map((row) => [row.type, row.membership, row.fees, row.access, row.verify])}
              />
            </div>
          </section>
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="premium-card rounded-3xl p-6">
                <h2 className="text-2xl font-black text-slate-950">Savings rates discussion</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Credit union savings rates, certificate rates, and money
                  market rates can change. Compare the stated rate with balance
                  tiers, membership requirements, minimum deposits, early
                  withdrawal rules, and whether the account is practical for
                  your regular banking needs.
                </p>
                <p className="mt-3 leading-7 text-slate-600">
                  OfferRadar does not publish unverified rate claims on this
                  page. Treat any rate you see elsewhere as a point to verify
                  from the current credit union source.
                </p>
              </article>
              <article className="premium-card rounded-3xl p-6">
                <h2 className="text-2xl font-black text-slate-950">Mobile app and ATM network comparison</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  A credit union may be a good fit even with a smaller branch
                  footprint if mobile deposit, account alerts, external
                  transfers, shared branches, and fee-free ATM access meet your
                  needs. Verify cash deposit rules and support hours before
                  joining.
                </p>
                <p className="mt-3 leading-7 text-slate-600">
                  If you travel around Florida, compare ATM and branch access in
                  multiple cities instead of only the branch nearest your home.
                </p>
              </article>
            </div>
          </section>
        </>
      ) : null}

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-black text-slate-950">FAQ</h2>
            <div className="mt-5 grid gap-5">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="font-extrabold text-slate-950">{faq.question}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          <DisclosureBlock compact />
        </div>
      </section>

      <section id="lead-capture" className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
            Comparison request
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">
            Request local comparison information
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Share what you are comparing. OfferRadar will use this to organize
            future local banking comparison and research-update workflows.
          </p>
        </div>
        <div className="premium-card rounded-3xl p-6">
          <LeadCaptureForm source={page.slug} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <VerificationMethodology />
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-950">Related pages</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {page.relatedLinks.map((link) => (
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
    </div>
  );
}

const floridaBanks = [
  { name: "Chase", href: "/provider/chase", branches: "Florida locations; verify nearby branches", bonus: "Tracked records available", status: "Source review shown on provider page" },
  { name: "Wells Fargo", href: "/provider/wells-fargo", branches: "Florida locations; verify nearby branches", bonus: "Tracked records available", status: "Source review shown on provider page" },
  { name: "Bank of America", href: "/provider/bank-of-america", branches: "Florida locations; verify nearby branches", bonus: "Tracked records available", status: "Source review shown on provider page" },
  { name: "Truist", href: "/provider/truist", branches: "Regional Florida presence; verify locally", bonus: "No current tracked offer record", status: "Official website recorded" },
  { name: "Regions", branches: "Regional presence; verify locally", bonus: "Not currently tracked", status: "Independent verification needed" },
  { name: "Fifth Third", branches: "Regional presence; verify locally", bonus: "Not currently tracked", status: "Independent verification needed" },
  { name: "VyStar", branches: "Florida credit union; membership applies", bonus: "Not currently tracked", status: "Independent verification needed" },
  { name: "MIDFLORIDA", branches: "Florida credit union; membership applies", bonus: "Not currently tracked", status: "Independent verification needed" },
];

const directDepositRows = [
  {
    provider: "Chase",
    href: "/provider/chase",
    bonus: "Tracked checking records available",
    deposit: "Verify qualifying source, amount, and posting window",
    fees: "Review monthly fee and waiver rules",
    verification: "Source review shown on provider page",
  },
  {
    provider: "Wells Fargo",
    href: "/provider/wells-fargo",
    bonus: "Tracked checking records available",
    deposit: "Verify qualifying direct deposit definition and deadline",
    fees: "Review monthly fee, waiver, and account package",
    verification: "Source review shown on provider page",
  },
  {
    provider: "Bank of America",
    href: "/provider/bank-of-america",
    bonus: "Tracked checking records available",
    deposit: "Verify deposit source, activity timing, and eligibility",
    fees: "Review monthly fee and waiver requirements",
    verification: "Source review shown on provider page",
  },
  {
    provider: "SoFi",
    href: "/provider/sofi",
    bonus: "Tracked direct-deposit records available",
    deposit: "Verify direct deposit tier and evaluation period",
    fees: "Review account terms directly",
    verification: "Source review shown on provider page",
  },
];

const floridaCheckingSortableRows = [
  {
    name: "Online bank",
    bestFor: "Digital checking",
    monthlyFee: "$0 to verify",
    minimumDeposit: "$0 to verify",
    atmAccess: "Partner or national ATM network; verify cash access",
    bonusAmount: "Tracked offers vary",
    notes: "Verify mobile tools, cash deposits, transfer limits, and provider terms.",
  },
  {
    name: "National bank",
    bestFor: "Branch and ATM access",
    monthlyFee: "Waivable fee varies",
    minimumDeposit: "Verify by account package",
    atmAccess: "Broad national ATM and branch network",
    bonusAmount: "Tracked checking records available",
    notes: "Verify fee waiver, direct deposit rules, and Florida branch access.",
  },
  {
    name: "Florida credit union",
    bestFor: "Local service",
    monthlyFee: "Varies by membership",
    minimumDeposit: "Membership share may apply",
    atmAccess: "Local, shared branch, or partner ATM access",
    bonusAmount: "Verify current promotions",
    notes: "Verify eligibility, NCUA coverage, mobile tools, and shared branching.",
  },
  {
    name: "Regional bank",
    bestFor: "Florida branch footprint",
    monthlyFee: "Waivable fee varies",
    minimumDeposit: "Verify account opening rules",
    atmAccess: "Regional branch and ATM access",
    bonusAmount: "Verify current promotions",
    notes: "Verify ZIP-code availability, account package, and source terms.",
  },
];

const creditUnionBestForSections = [
  {
    eyebrow: "Best Overall",
    title: "Best overall credit union fit",
    body: "Look for a credit union with eligibility you can meet, reasonable fees, useful checking and savings products, reliable mobile access, and branches or ATM options where you actually bank.",
  },
  {
    eyebrow: "Best for Checking",
    title: "Best for checking",
    body: "Compare monthly fees, fee waivers, debit-card access, overdraft policies, direct deposit features, mobile deposit, and day-to-day support.",
  },
  {
    eyebrow: "Best for Savings",
    title: "Best for savings",
    body: "Verify current savings and certificate rates directly, then compare minimum deposits, balance tiers, transfer limits, early withdrawal rules, and NCUA coverage.",
  },
  {
    eyebrow: "Best for Students",
    title: "Best for students",
    body: "Student-friendly credit unions should be compared by low fees, easy membership, digital access, ATM availability near campus, and account education resources.",
  },
  {
    eyebrow: "Best for Military Families",
    title: "Best for military families",
    body: "Military families may value nationwide access, direct deposit reliability, shared branching, strong mobile tools, and support while relocating or traveling.",
  },
  {
    eyebrow: "Best Digital Experience",
    title: "Best digital experience",
    body: "Compare mobile deposit, external transfers, account alerts, card controls, secure login, support messaging, and how often users need a branch.",
  },
];

const creditUnionSortableRows = [
  {
    name: "Local Florida credit union",
    bestFor: "Local service",
    monthlyFee: "Varies by account",
    minimumDeposit: "Membership share may apply",
    atmAccess: "Local or shared branch access",
    notes: "Verify field of membership, fees, shared branching, and current terms.",
  },
  {
    name: "Regional Florida credit union",
    bestFor: "Broader Florida footprint",
    monthlyFee: "Varies by product",
    minimumDeposit: "Opening deposit varies",
    atmAccess: "Regional, shared, or partner ATM access",
    notes: "Verify branch coverage, mobile app tools, savings rates, and support.",
  },
  {
    name: "National credit union",
    bestFor: "Military or broad membership",
    monthlyFee: "Verify account schedule",
    minimumDeposit: "Membership path varies",
    atmAccess: "Broad or national ATM access",
    notes: "Verify eligibility, Florida availability, deposit rules, and support.",
  },
  {
    name: "Digital banking alternative",
    bestFor: "Mobile-first access",
    monthlyFee: "$0 to verify",
    minimumDeposit: "$0 to verify",
    atmAccess: "Partner ATM access; verify cash deposits",
    notes: "Verify charter, deposit insurance, cash access, and transfer limits.",
  },
];

function ComparisonCard({
  title,
  body,
  href,
  linkLabel,
}: {
  title: string;
  body: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <article className="premium-card rounded-3xl p-6">
      <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600">{body}</p>
      <Link href={href} className="mt-5 inline-flex font-extrabold text-blue-700">
        {linkLabel}
      </Link>
    </article>
  );
}

function ResponsiveTable({
  headings,
  rows,
}: {
  headings: string[];
  rows: string[][];
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-[900px] w-full text-left text-sm">
        <thead className="bg-slate-950 text-white">
          <tr>
            {headings.map((heading) => (
              <th key={heading} className="px-4 py-3">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`} className="border-t border-slate-200">
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-4 text-slate-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const checkingCostRows = [
  {
    provider: "National banks",
    deposit: "Opening deposit and bonus funding rules vary by account package",
    fee: "Monthly fee may be waivable by direct deposit, balance, or relationship",
    verify: "Confirm current fee schedule and promotion terms",
  },
  {
    provider: "Online banks",
    deposit: "Often digital opening with separate transfer limits or funding steps",
    fee: "May have lower routine fees, but cash deposit rules can matter",
    verify: "Confirm cash access, ATM policy, and account availability",
  },
  {
    provider: "Florida credit unions",
    deposit: "May require membership share or minimum opening deposit",
    fee: "Checking fees and waiver paths vary by membership and account type",
    verify: "Confirm membership eligibility, shared branching, and fees",
  },
  {
    provider: "Regional banks",
    deposit: "May combine branch access with account package requirements",
    fee: "Review balance, activity, and direct deposit waiver options",
    verify: "Confirm Florida ZIP code availability and branch access",
  },
];

const mobileBankingRows = [
  {
    type: "National banks",
    strengths: "Broad mobile feature sets, card controls, alerts, and branch integration",
    tradeoffs: "Fees and account package rules may be more complex",
    verify: "Mobile deposit limits, Zelle or transfer support, and fraud tools",
  },
  {
    type: "Online banks",
    strengths: "Digital-first account opening, transfers, alerts, and savings tools",
    tradeoffs: "Cash deposits and in-person support may be limited",
    verify: "ATM access, cash deposit options, support hours, and app reviews",
  },
  {
    type: "Credit unions",
    strengths: "Member service with mobile deposit and shared network options",
    tradeoffs: "App features and support hours can vary widely",
    verify: "Shared branching, ATM network, mobile deposit, and transfer limits",
  },
];

const creditUnionRows = [
  {
    type: "Local Florida credit union",
    membership: "Often based on county, city, employer, school, or family eligibility",
    fees: "Review checking fee, savings share requirement, and overdraft policy",
    access: "Local branches, shared branches, and ATM network may vary",
    verify: "Field of membership, NCUA coverage, and current account terms",
  },
  {
    type: "Regional credit union",
    membership: "May serve multiple Florida regions or employment groups",
    fees: "Compare monthly fees, balance rules, and certificate penalties",
    access: "Broader local footprint with possible shared branching",
    verify: "Branch coverage, digital tools, and product availability",
  },
  {
    type: "National credit union",
    membership: "May offer broader association or family membership paths",
    fees: "Fee schedules and account tiers differ by product",
    access: "Often more digital access, but local Florida branches may be limited",
    verify: "Eligibility path, funding rules, ATM access, and support options",
  },
  {
    type: "Online alternative",
    membership: "Not a credit union in every case; review charter and coverage",
    fees: "Routine fees may be lower, but services differ",
    access: "Digital-first access with partner ATM or cash constraints",
    verify: "Deposit insurance, cash access, and transfer limits",
  },
];
