import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "OfferRadar terms of use for educational banking comparison content, local financial pages, and offer listings.",
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
        Terms
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
        Terms of Use
      </h1>
      <p className="mt-4 leading-7 text-slate-600">
        By using OfferRadar, you understand that the site provides educational
        comparison information. OfferRadar is not a bank, lender, credit union,
        broker-dealer, or financial advisor.
      </p>
      <div className="mt-8 grid gap-5">
        {[
          ["Verify directly", "Rates, offers, fees, availability, eligibility, and terms can change. Verify directly with the financial institution before acting."],
          ["No guarantees", "OfferRadar does not guarantee approval, payouts, rates, eligibility, savings, rewards, or availability."],
          ["No sensitive submissions", "Do not submit passwords, account numbers, Social Security numbers, or confidential financial information through site forms."],
        ].map(([heading, body]) => (
          <section key={heading} className="premium-card rounded-3xl p-6">
            <h2 className="text-2xl font-black text-slate-950">{heading}</h2>
            <p className="mt-3 leading-7 text-slate-600">{body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
