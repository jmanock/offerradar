import Link from "next/link";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { FinancialCalculator } from "@/components/FinancialCalculator";
import { JsonLd } from "@/components/JsonLd";
import { VerificationMethodology } from "@/components/VerificationMethodology";

type CalculatorMode = "bank" | "brokerage" | "travel";

export function CalculatorPage({
  mode,
  title,
  intro,
  path,
  relatedLinks,
}: {
  mode: CalculatorMode;
  title: string;
  intro: string;
  path: string;
  relatedLinks: { href: string; label: string }[];
}) {
  return (
    <div>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: title, applicationCategory: "FinanceApplication", operatingSystem: "Web", url: `https://offerradar.io/${path}`, description: intro }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://offerradar.io" }, { "@type": "ListItem", position: 2, name: title, item: `https://offerradar.io/${path}` }] }} />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">Comparison tool</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">{intro}</p>
          <p className="mt-4 text-sm font-bold text-slate-500">Educational estimate · Verify inputs and provider terms</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <FinancialCalculator mode={mode} />
      </section>
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-slate-950">Continue your research</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {relatedLinks.map((link) => <Link key={link.href} href={link.href} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800">{link.label}</Link>)}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8"><VerificationMethodology /><DisclosureBlock /></section>
    </div>
  );
}
