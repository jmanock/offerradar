import Link from "next/link";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <span className="relative grid size-11 place-items-center rounded-2xl border border-teal-200/70 bg-slate-950 shadow-lg shadow-slate-950/10">
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          className="size-8 text-teal-300"
          fill="none"
        >
          <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="2.2" opacity="0.45" />
          <circle cx="24" cy="24" r="9" stroke="currentColor" strokeWidth="2" opacity="0.65" />
          <path d="M24 24 36 13" stroke="currentColor" strokeLinecap="round" strokeWidth="2.6" />
          <path d="M24 7v5M24 36v5M7 24h5M36 24h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" opacity="0.55" />
          <path d="M31 30h8l3 3v7H31z" fill="#d1fae5" opacity="0.95" />
          <circle cx="37" cy="36" r="1.6" fill="#0f766e" />
        </svg>
        <span className="absolute right-2 top-2 size-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
      </span>
      <span>
        <span className="block text-lg font-extrabold tracking-tight text-slate-950 group-hover:text-blue-800">
          OfferRadar
        </span>
        {!compact ? (
          <span className="block text-xs font-semibold text-slate-500">
            Track offers with confidence
          </span>
        ) : null}
      </span>
    </Link>
  );
}
