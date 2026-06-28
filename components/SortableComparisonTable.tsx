"use client";

import { useMemo, useState } from "react";

export type SortKey =
  | "alphabetical"
  | "monthlyFee"
  | "minimumDeposit"
  | "atmAccess"
  | "bonusAmount";

export type SortableComparisonRow = {
  name: string;
  monthlyFee: string;
  minimumDeposit: string;
  atmAccess: string;
  bonusAmount?: string;
  bestFor?: string;
  notes: string;
};

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "alphabetical", label: "A-Z" },
  { key: "monthlyFee", label: "Monthly fee" },
  { key: "minimumDeposit", label: "Minimum deposit" },
  { key: "atmAccess", label: "ATM access" },
  { key: "bonusAmount", label: "Bonus amount" },
];

export function SortableComparisonTable({
  title,
  description,
  rows,
  showBonus = false,
}: {
  title: string;
  description: string;
  rows: SortableComparisonRow[];
  showBonus?: boolean;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("alphabetical");
  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => compareRows(a, b, sortKey));
  }, [rows, sortKey]);

  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-3xl font-black text-slate-950">{title}</h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-600">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Sort comparison table">
            {sortOptions
              .filter((option) => showBonus || option.key !== "bonusAmount")
              .map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setSortKey(option.key)}
                  className={
                    sortKey === option.key
                      ? "rounded-full bg-blue-700 px-4 py-2 text-sm font-extrabold text-white"
                      : "rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-extrabold text-slate-900 hover:border-blue-300 hover:text-blue-800"
                  }
                  aria-pressed={sortKey === option.key}
                >
                  {option.label}
                </button>
              ))}
          </div>
        </div>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-[980px] w-full text-left text-sm">
            <thead className="bg-slate-950 text-white">
              <tr>
                {[
                  "Provider",
                  "Best for",
                  "Monthly fee",
                  "Minimum deposit",
                  "ATM access",
                  ...(showBonus ? ["Bonus amount"] : []),
                  "What to verify",
                ].map((heading) => (
                  <th key={heading} className="px-4 py-3 font-extrabold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row) => (
                <tr key={row.name} className="border-t border-slate-200 bg-white align-top">
                  <td className="px-4 py-4 font-extrabold text-slate-950">{row.name}</td>
                  <td className="px-4 py-4 text-slate-700">{row.bestFor ?? "General comparison"}</td>
                  <td className="px-4 py-4 text-slate-700">{row.monthlyFee}</td>
                  <td className="px-4 py-4 text-slate-700">{row.minimumDeposit}</td>
                  <td className="px-4 py-4 text-slate-700">{row.atmAccess}</td>
                  {showBonus ? (
                    <td className="px-4 py-4 font-bold text-slate-950">{row.bonusAmount ?? "Verify current terms"}</td>
                  ) : null}
                  <td className="px-4 py-4 text-slate-700">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-500">
          Sorting is for comparison only. Verify current fees, deposits, access,
          rates, and availability directly with each provider.
        </p>
      </div>
    </section>
  );
}

function compareRows(a: SortableComparisonRow, b: SortableComparisonRow, key: SortKey) {
  if (key === "alphabetical") {
    return a.name.localeCompare(b.name);
  }

  if (key === "atmAccess") {
    return scoreAtm(b.atmAccess) - scoreAtm(a.atmAccess);
  }

  if (key === "monthlyFee") {
    return numberFromText(a.monthlyFee) - numberFromText(b.monthlyFee);
  }

  if (key === "minimumDeposit") {
    return numberFromText(a.minimumDeposit) - numberFromText(b.minimumDeposit);
  }

  return numberFromText(b.bonusAmount ?? "") - numberFromText(a.bonusAmount ?? "");
}

function numberFromText(value: string) {
  if (/no current|not listed|verify|varies/i.test(value)) {
    return 999999;
  }

  const match = value.replaceAll(",", "").match(/\d+/);
  return match ? Number(match[0]) : 999999;
}

function scoreAtm(value: string) {
  const text = value.toLowerCase();

  if (text.includes("broad") || text.includes("national")) {
    return 3;
  }

  if (text.includes("shared") || text.includes("partner")) {
    return 2;
  }

  if (text.includes("local")) {
    return 1;
  }

  return 0;
}
