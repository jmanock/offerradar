"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { event, offerClick } from "@/lib/analytics";

type EventParams = Record<string, string | number | boolean | null | undefined>;

type TrackedOutboundLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventParams: EventParams;
  children: ReactNode;
};

export function TrackedOutboundLink({
  eventParams,
  onClick,
  children,
  ...props
}: TrackedOutboundLinkProps) {
  return (
    <a
      {...props}
      onClick={(clickEvent) => {
        event("outbound_offer_click", eventParams);
        event(eventParams.link_type === "affiliate" ? "affiliate_click" : "official_source_click", eventParams);
        offerClick(eventParams);
        onClick?.(clickEvent);
      }}
    >
      {children}
    </a>
  );
}

// Add future click-level analytics wrappers here when new outbound actions,
// comparison tools, or newsletter/signup flows are introduced.
