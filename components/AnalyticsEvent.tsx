"use client";

import { useEffect } from "react";
import { event } from "@/lib/analytics";

type EventParams = Record<string, string | number | boolean | null | undefined>;

export function AnalyticsEvent({
  name,
  params,
}: {
  name: string;
  params?: EventParams;
}) {
  useEffect(() => {
    event(name, params);
  }, [name, params]);

  return null;
}

// Use this component for future impression-style analytics that should fire
// when a statically rendered page hydrates in the browser.
