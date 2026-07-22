import Link from "next/link";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { AffiliateLink } from "@/components/AffiliateLink";
import { ProviderBadge } from "@/components/ProviderBadge";
import { getAffiliateEntry, isRouteAllowed, resolveAffiliateLink } from "@/lib/affiliateLinks";

export function FeaturedPartnerOffers({
  pagePath,
  affiliateIds,
  title = "Useful external tools",
  placementId = "featured-tool",
}: {
  pagePath: string;
  affiliateIds: string[];
  title?: string;
  placementId?: string;
}) {
  const entries = affiliateIds.map((id) => getAffiliateEntry(id)).filter((entry) => entry && isRouteAllowed(entry, pagePath) && resolveAffiliateLink(entry.id, pagePath, placementId));
  if (!entries.length) return null;
  const sectionId = `partner-tools-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

  return (
    <section className="mt-10" aria-labelledby={sectionId}>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
            External resources
          </p>
          <h2 id={sectionId} className="mt-2 text-3xl font-black text-slate-950">
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
                  {entry.category.replaceAll("-", " ")}
                </p>
                <h3 className="font-black text-slate-950">{entry.advertiser}</h3>
              </div>
            </div>
            <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{entry.description}</p>
            <p className="mt-4 text-sm font-semibold leading-6 text-slate-700"><span className="font-black text-slate-950">What you can do:</span> {getActionDescription(entry.id)}</p>
            <p className="mt-4 text-xs font-bold text-slate-500">Last verified {entry.lastVerified}</p>
            <div className="mt-4">
              <AffiliateLink
                affiliateId={entry.id}
                placementId={placementId}
                pagePath={pagePath}
                showBadge
              />
            </div>
            <Link href={getResearchPath(entry.id)} className="mt-4 text-sm font-extrabold text-blue-700 underline decoration-blue-200 underline-offset-4">Read OfferRadar research</Link>
            <div className="mt-4"><AffiliateDisclosure compact /></div>
          </article>
        ) : null)}
      </div>
    </section>
  );
}

function getResearchPath(id: string) {
  return {
    "hellosafe-travel-insurance": "/research/travel-insurance-comparison",
    "hellosafe-card-insurance-checker": "/research/credit-card-travel-insurance",
    esimshop: "/research/esim-international-travel",
    kitco: "/research/gold-price-tracking-guide",
  }[id] || "/research";
}

function getActionDescription(id: string) {
  return {
    "hellosafe-travel-insurance": "Compare possible travel-insurance policies before checking the insurer's current wording.",
    "hellosafe-card-insurance-checker": "Review coverage your card may include before confirming it with the issuer.",
    esimshop: "Compare destination eSIM options before checking compatibility and data terms.",
    kitco: "Open an external source for precious-metals market data and charts.",
  }[id] || "Continue to an external research resource and verify its current terms.";
}
