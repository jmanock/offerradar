import Link from "next/link";

export function VerificationMethodology({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`border border-slate-200 bg-white shadow-sm ${compact ? "rounded-2xl p-5" : "rounded-3xl p-7"}`}>
      <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
        Verification methodology
      </p>
      <h2 className="mt-3 text-2xl font-black text-slate-950">
        How OfferRadar verifies offers
      </h2>
      <p className="mt-3 leading-7 text-slate-600">
        OfferRadar records the source reviewed, last verified date, requirements,
        fees to check, and terms that need direct provider confirmation. A
        verification date documents research timing; it does not guarantee
        availability, eligibility, approval, or payout.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/editorial-policy" className="font-extrabold text-blue-700 hover:text-blue-800">
          Editorial policy
        </Link>
        <Link href="/disclosures" className="font-extrabold text-blue-700 hover:text-blue-800">
          Disclosures
        </Link>
        <Link href="/guides/offer-comparisons" className="font-extrabold text-blue-700 hover:text-blue-800">
          Comparison guide
        </Link>
      </div>
    </section>
  );
}
