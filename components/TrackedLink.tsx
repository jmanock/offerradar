"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { event } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & {
  eventName: string;
  eventParams?: Record<string, string | number | boolean>;
};

export function TrackedLink({ eventName, eventParams, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(clickEvent) => {
        event(eventName, eventParams);
        onClick?.(clickEvent);
      }}
    />
  );
}
