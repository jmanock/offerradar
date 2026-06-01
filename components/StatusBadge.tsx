import type { OfferStatus } from "@/types/offer";

const styles: Record<OfferStatus, string> = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  watching: "border-amber-200 bg-amber-50 text-amber-700",
  expired: "border-slate-200 bg-slate-100 text-slate-600",
};

const labels: Record<OfferStatus, string> = {
  active: "Active",
  watching: "Watching",
  expired: "Expired",
};

export function StatusBadge({ status }: { status: OfferStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
