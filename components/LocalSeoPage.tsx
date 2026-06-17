import Link from "next/link";
import { AnalyticsEvent } from "@/components/AnalyticsEvent";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { JsonLd } from "@/components/JsonLd";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { VerificationMethodology } from "@/components/VerificationMethodology";
import type { LocalSeoPage } from "@/data/localSeo";

export function LocalSeoPageView({ page }: { page: LocalSeoPage }) {
  const isFloridaChecking = page.slug === "best-checking-accounts-florida";
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
              Source reviewed · Last verified {page.lastUpdated}
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
