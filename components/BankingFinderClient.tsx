"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const wantOptions = [
  "checking",
  "savings",
  "brokerage",
  "credit union",
  "bank bonus",
] as const;

const careOptions = [
  "no monthly fee",
  "bonus amount",
  "mobile app",
  "local branches",
  "ATM access",
  "direct deposit",
  "Florida availability",
] as const;

const preferOptions = [
  "online bank",
  "national bank",
  "credit union",
  "brokerage app",
] as const;

type Want = (typeof wantOptions)[number];
type Care = (typeof careOptions)[number];
type Prefer = (typeof preferOptions)[number];

const baseRecommendations = [
  {
    href: "/offers",
    label: "All tracked offers",
    description: "Start with the full tracker when you want to compare multiple offer categories.",
  },
  {
    href: "/banking-finder",
    label: "Banking finder",
    description: "Adjust your research path and compare related pages.",
  },
];

export function BankingFinderClient() {
  const [want, setWant] = useState<Want>("checking");
  const [care, setCare] = useState<Care>("no monthly fee");
  const [prefer, setPrefer] = useState<Prefer>("online bank");

  const recommendations = useMemo(() => {
    const links = [...baseRecommendations];

    if (want === "checking") {
      links.unshift({
        href: "/best-checking-accounts-florida",
        label: "Best checking accounts in Florida",
        description: "Compare checking fees, direct deposit rules, ATM access, and Florida account fit.",
      });
      links.unshift({
        href: "/best-bank-for-checking",
        label: "Best bank for checking",
        description: "Use this page to compare checking account types without assuming one bank fits everyone.",
      });
    }

    if (want === "savings") {
      links.unshift({
        href: "/best-savings-accounts-florida",
        label: "Best savings accounts in Florida",
        description: "Compare savings account factors, balance rules, access, and verification reminders.",
      });
      links.unshift({
        href: "/high-yield-savings",
        label: "High-yield savings",
        description: "Review tracked savings-related records and terms to verify.",
      });
    }

    if (want === "brokerage") {
      links.unshift({
        href: "/brokerage-bonuses",
        label: "Brokerage bonuses",
        description: "Compare brokerage promotions by transfer, funding, holding periods, and fees.",
      });
      links.unshift({
        href: "/compare/robinhood-vs-webull",
        label: "Robinhood vs Webull",
        description: "Compare brokerage app offer fit, account access, and verification reminders.",
      });
    }

    if (want === "credit union" || prefer === "credit union") {
      links.unshift({
        href: "/best-credit-unions-florida",
        label: "Best credit unions in Florida",
        description: "Compare membership rules, checking fees, ATM access, mobile tools, and account fit.",
      });
    }

    if (want === "bank bonus" || care === "bonus amount" || care === "direct deposit") {
      links.unshift({
        href: "/bank-bonuses",
        label: "Bank bonuses",
        description: "Compare checking and savings offers by requirements, fees, and last verified dates.",
      });
    }

    if (care === "Florida availability" || care === "local branches") {
      links.unshift({
        href: "/best-banks-in-florida",
        label: "Best banks in Florida",
        description: "Compare Florida banking access, branch needs, credit unions, and online alternatives.",
      });
    }

    if (prefer === "national bank") {
      links.unshift({
        href: "/compare/chase-vs-wells-fargo",
        label: "Chase vs Wells Fargo",
        description: "Compare two national bank research paths by fees, access, and tracked offer records.",
      });
    }

    return links.filter(
      (link, index, all) =>
        all.findIndex((candidate) => candidate.href === link.href) === index,
    ).slice(0, 6);
  }, [care, prefer, want]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="premium-card rounded-3xl p-6">
        <h2 className="text-2xl font-black text-slate-950">
          What are you looking for?
        </h2>
        <div className="mt-6 grid gap-5">
          <ChoiceGroup
            label="I want"
            options={wantOptions}
            value={want}
            onChange={(value) => setWant(value as Want)}
          />
          <ChoiceGroup
            label="I care about"
            options={careOptions}
            value={care}
            onChange={(value) => setCare(value as Care)}
          />
          <ChoiceGroup
            label="I prefer"
            options={preferOptions}
            value={prefer}
            onChange={(value) => setPrefer(value as Prefer)}
          />
        </div>
      </section>
      <section className="premium-card rounded-3xl p-6">
        <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
          Recommended research path
        </p>
        <h2 className="mt-3 text-2xl font-black text-slate-950">
          Start with these pages
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          These recommendations point to OfferRadar pages and comparison paths,
          not personalized financial products.
        </p>
        <div className="mt-5 grid gap-3">
          {recommendations.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-white"
            >
              <span className="font-extrabold text-slate-950">{link.label}</span>
              <span className="mt-1 block text-sm leading-6 text-slate-600">
                {link.description}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-extrabold text-slate-950">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={
              value === option
                ? "rounded-full bg-blue-700 px-4 py-2 text-sm font-extrabold text-white"
                : "rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-extrabold text-slate-900 hover:border-blue-300 hover:text-blue-800"
            }
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
