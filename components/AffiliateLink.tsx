"use client";

import type { ReactNode } from "react";
import { event } from "@/lib/analytics";
import { resolveAffiliateLink } from "@/lib/affiliateLinks";

export function AffiliateLink({
  affiliateId,
  placementId,
  pagePath,
  linkText,
  variant = "button",
  showBadge = false,
  targetBlank = true,
  children,
}: {
  affiliateId: string;
  placementId: string;
  pagePath: string;
  linkText?: string;
  variant?: "button" | "text";
  showBadge?: boolean;
  targetBlank?: boolean;
  children?: ReactNode;
}) {
  const resolved = resolveAffiliateLink(affiliateId, pagePath, placementId);
  if (!resolved) return null;

  const { entry, href, clickref, linkType } = resolved;
  const label = linkText || entry.linkText;
  const className =
    variant === "button"
      ? "inline-flex min-h-11 items-center justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      : "font-extrabold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:text-blue-900";

  return (
    <a
      href={href}
      target={targetBlank ? "_blank" : undefined}
      rel={linkType === "affiliate" ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"}
      className={className}
      aria-label={`${label} from ${entry.advertiser} (opens an external resource)`}
      onClick={() => {
        const params = {
          affiliate_id: entry.id,
          advertiser: entry.advertiser,
          provider: entry.advertiser,
          network: entry.network,
          category: entry.category,
          source_page: pagePath,
          placement: placementId,
          link_text: label,
          clickref,
          destination_type: entry.destinationType,
          link_type: linkType,
        };
        event(linkType === "affiliate" ? "affiliate_click" : "official_provider_click", params);
        event("partner_tool_click", params);
      }}
    >
      {showBadge ? (
        <span className="mr-2 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide">
          External
        </span>
      ) : null}
      {children || label}
    </a>
  );
}
