export function DisclosureBlock({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={`border border-indigo-100 bg-indigo-50/80 ${
        compact ? "rounded-lg p-4" : "rounded-xl p-6"
      }`}
    >
      <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-800">
        Disclosure
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        OfferRadar may earn compensation through referral or affiliate links.
        Offers can change, expire, or vary by user. Always verify details
        directly with the provider before opening an account or applying.
      </p>
    </section>
  );
}
