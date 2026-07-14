export type ArtworkKind = "money" | "travel" | "shopping" | "software" | "florida" | "compare" | "research";

const symbols: Record<ArtworkKind, string> = {
  money: "$",
  travel: "↗",
  shopping: "◇",
  software: "{ }",
  florida: "FL",
  compare: "⇄",
  research: "✓",
};

export function CategoryArtwork({ kind, label }: { kind: ArtworkKind; label: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} category illustration`}
      className={`category-artwork category-artwork-${kind}`}
    >
      <span className="category-orbit" aria-hidden="true" />
      <span className="category-symbol" aria-hidden="true">{symbols[kind]}</span>
      <span className="category-ping" aria-hidden="true" />
    </div>
  );
}
