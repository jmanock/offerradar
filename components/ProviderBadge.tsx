const palette = [
  "from-blue-700 to-cyan-500",
  "from-violet-700 to-fuchsia-500",
  "from-emerald-700 to-teal-500",
  "from-amber-600 to-orange-500",
  "from-slate-800 to-slate-600",
];

export function ProviderBadge({
  provider,
  size = "md",
}: {
  provider: string;
  size?: "sm" | "md" | "lg";
}) {
  const initials = provider
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  const color = palette[hash(provider) % palette.length];
  const dimensions = size === "lg" ? "size-16 text-lg" : size === "sm" ? "size-9 text-xs" : "size-12 text-sm";

  return (
    <span
      role="img"
      aria-label={`${provider} provider badge`}
      title={`${provider} — text badge, not an endorsement`}
      className={`grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${color} ${dimensions} font-black tracking-tight text-white shadow-sm ring-1 ring-black/5`}
    >
      {initials || "OR"}
    </span>
  );
}

function hash(value: string) {
  return Array.from(value).reduce((total, character) => total + character.charCodeAt(0), 0);
}
