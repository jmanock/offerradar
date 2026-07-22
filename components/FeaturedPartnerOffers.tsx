import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { AffiliateLink } from "@/components/AffiliateLink";
import { ProviderBadge } from "@/components/ProviderBadge";
import { getAffiliateEntry, isRouteAllowed, resolveAffiliateLink } from "@/lib/affiliateLinks";

export function FeaturedPartnerOffers({
  pagePath,
  affiliateIds,
  title = "Useful external tools",
}: {
  pagePath: string;
  affiliateIds: string[];
  title?: string;
}) {
  const entries = affiliateIds.map((id) => getAffiliateEntry(id)).filter((entry) => entry && isRouteAllowed(entry, pagePath) && resolveAffiliateLink(entry.id, pagePath, `partner-card-${entry.id}`));
  if (!entries.length) return null;

  return (
    <section className="mt-10" aria-labelledby="partner-tools-title">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
            External resources
          </p>
          <h2 id="partner-tools-title" className="mt-2 text-3xl font-black text-slate-950">
            {title}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-600">
          These tools are shown for contextual research. Inclusion is not a ranking or endorsement.
        </p>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {entries.map((entry) => entry ? (
          <article key={entry.id} className="premium-card flex h-full flex-col rounded-3xl p-6">
            <div className="flex items-center gap-3">
              <ProviderBadge provider={entry.advertiser} />
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                  External resource
                </p>
                <h3 className="font-black text-slate-950">{entry.advertiser}</h3>
              </div>
            </div>
            <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{entry.description}</p>
            <p className="mt-4 text-xs font-bold text-slate-500">Last verified {entry.lastVerified}</p>
            <div className="mt-4">
              <AffiliateLink
                affiliateId={entry.id}
                placementId={`partner-card-${entry.id}`}
                pagePath={pagePath}
                showBadge
              />
            </div>
          </article>
        ) : null)}
      </div>
      <div className="mt-5"><AffiliateDisclosure compact /></div>
    </section>
  );
}
