export function DisclosureBlock({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={`border border-teal-200/70 bg-gradient-to-br from-teal-50 via-white to-blue-50 shadow-sm ${
        compact ? "rounded-2xl p-4" : "rounded-3xl p-6"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-teal-600 text-sm font-black text-white">
          i
        </span>
        <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-950">
          Disclosure first
        </h2>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        OfferRadar may earn compensation through referral or affiliate links.
        Offers can change, expire, or vary by user. Always verify details
        directly with the provider before opening an account or applying.
      </p>
    </section>
  );
}
