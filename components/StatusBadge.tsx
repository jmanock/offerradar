import type { OfferStatus, VerificationStatus } from "@/types/offer";

type BadgeStatus = OfferStatus | VerificationStatus;

const styles: Record<BadgeStatus, string> = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  watching: "border-amber-200 bg-amber-50 text-amber-800",
  expired: "border-rose-100 bg-rose-50 text-rose-700",
  verified_today: "border-teal-200 bg-teal-50 text-teal-700",
  verified_this_week: "border-blue-200 bg-blue-50 text-blue-700",
  needs_review: "border-amber-200 bg-amber-50 text-amber-800",
};

const labels: Record<BadgeStatus, string> = {
  active: "Active",
  watching: "Watching",
  expired: "Expired",
  verified_today: "Verified Today",
  verified_this_week: "Verified This Week",
  needs_review: "Needs Review",
};

export function StatusBadge({ status }: { status: BadgeStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
