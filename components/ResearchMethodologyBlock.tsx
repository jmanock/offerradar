export function ResearchMethodologyBlock({
  focus = "offers and accounts",
}: {
  focus?: string;
}) {
  return (
    <section className="premium-card rounded-3xl p-6">
      <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
        Research process
      </p>
      <h2 className="mt-3 text-2xl font-black text-slate-950">
        How we research {focus}
      </h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {[
          {
            title: "How we evaluate",
            body: "We compare requirements, fees, access, account fit, verification dates, and provider terms rather than ranking by headline value alone.",
          },
          {
            title: "How we update offers",
            body: "Offer records show last verified dates where available. Terms can change, so provider pages and source links remain the final reference.",
          },
          {
            title: "What readers should verify",
            body: "Before opening an account or applying, verify eligibility, fees, deposits, rewards, rates, payout timing, and account availability directly.",
          },
        ].map((item) => (
          <article key={item.title} className="rounded-2xl bg-slate-50 p-4">
            <h3 className="font-extrabold text-slate-950">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
