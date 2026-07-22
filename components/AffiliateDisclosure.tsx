export function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      className={`border border-amber-200 bg-amber-50 text-amber-950 ${
        compact ? "rounded-2xl px-4 py-3" : "rounded-3xl p-5"
      }`}
      aria-label="Affiliate disclosure"
    >
      <p className="text-xs font-extrabold uppercase tracking-wide">Compensation disclosure</p>
      <p className="mt-2 text-sm leading-6">
        OfferRadar may receive compensation when you use certain links. This does not change our
        research standards or the terms available to you. Always verify current details with the
        provider.
      </p>
    </aside>
  );
}
