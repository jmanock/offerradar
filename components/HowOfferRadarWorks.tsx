export function HowOfferRadarWorks({
  compact = false,
}: {
  compact?: boolean;
}) {
  const items = [
    {
      title: "We track public offer information",
      body: "OfferRadar organizes publicly available offer records, provider pages, and comparison paths so users can review requirements before acting.",
    },
    {
      title: "We review provider pages when possible",
      body: "Source links and verification dates are shown where available. Provider terms remain the source of truth.",
    },
    {
      title: "We show verification dates",
      body: "Last verified and last reviewed dates help orient research, but offers, rates, eligibility, and fees can change.",
    },
    {
      title: "We do not provide financial advice",
      body: "OfferRadar is a research tool. Users should verify current terms directly with providers before opening, applying, or transferring.",
    },
    {
      title: "Outbound links may be compensated",
      body: "Some outbound links may result in compensation, and disclosures stay visible so comparison pages remain consumer-first.",
    },
  ];

  return (
    <section className="premium-card rounded-3xl p-6">
      <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
        How OfferRadar works
      </p>
      <h2 className="mt-3 text-2xl font-black text-slate-950">
        Research-first offer tracking
      </h2>
      <div className={compact ? "mt-5 grid gap-3" : "mt-5 grid gap-3 md:grid-cols-2"}>
        {items.map((item) => (
          <article key={item.title} className="rounded-2xl bg-slate-50 p-4">
            <h3 className="font-extrabold text-slate-950">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
