import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Advertising Disclosure",
  description:
    "OfferRadar advertising disclosure explaining outbound links and compensation relationships.",
  alternates: { canonical: "/advertising-disclosure" },
};

export default function AdvertisingDisclosurePage() {
  return (
    <PolicyPage
      eyebrow="Advertising disclosure"
      title="Advertising Disclosure"
      intro="Some reviewed outbound links may result in compensation to OfferRadar. This does not guarantee approval, eligibility, payout, rate, or offer availability."
      sections={[
        ["Not a bank", "OfferRadar is not a bank, credit union, lender, broker-dealer, or financial institution."],
        ["Educational information", "Information on OfferRadar is for educational comparison purposes only and is not financial advice."],
        ["Provider terms control", "Rates, bonuses, fees, and eligibility can change. Always verify directly with the financial institution before opening an account or applying."],
        ["Editorial independence", "Not every provider compensates OfferRadar. Compensation does not automatically determine rankings, inclusion, or the conclusions of our research."],
        ["Official and compensated links", "An official-source link may be shown separately from a compensated link. Both are research paths; current provider terms remain authoritative."],
      ]}
    />
  );
}

function PolicyPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: [string, string][];
}) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
        {title}
      </h1>
      <p className="mt-4 leading-7 text-slate-600">{intro}</p>
      <div className="mt-8 grid gap-5">
        {sections.map(([heading, body]) => (
          <section key={heading} className="premium-card rounded-3xl p-6">
            <h2 className="text-2xl font-black text-slate-950">{heading}</h2>
            <p className="mt-3 leading-7 text-slate-600">{body}</p>
          </section>
        ))}
      </div>
      <Link href="/contact" className="mt-8 inline-flex font-extrabold text-blue-700">
        Contact OfferRadar
      </Link>
    </main>
  );
}
