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
          Important information
        </h2>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        OfferRadar is an independent research and comparison resource. Some
        outbound links may result in compensation to OfferRadar. Offers can
        change, expire, or vary by user, so verify current terms directly with
        the provider before acting.
      </p>
    </section>
  );
}
