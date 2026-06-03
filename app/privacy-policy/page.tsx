import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "OfferRadar privacy policy for lead forms, analytics, and educational banking comparison pages.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
        Privacy
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
        Privacy Policy
      </h1>
      <p className="mt-4 leading-7 text-slate-600">
        OfferRadar collects information users submit through forms, such as
        name, email, city, product interest, and optional notes. This information
        is used to respond to comparison requests and improve future offer
        workflows.
      </p>
      <div className="mt-8 grid gap-5">
        {[
          ["Analytics", "OfferRadar may use analytics tools to understand page views, clicks, and form submissions."],
          ["No bank relationship", "OfferRadar is not a bank and does not process applications, deposits, loans, or account approvals."],
          ["Data caution", "Do not submit sensitive account numbers, Social Security numbers, passwords, or private financial details through OfferRadar forms."],
        ].map(([heading, body]) => (
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
