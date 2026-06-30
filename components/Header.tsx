"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "./BrandLogo";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    ["Offers", "/offers"],
    ["Finder", "/banking-finder"],
    ["Tracker", "/offer-tracker"],
    ["Bank Bonuses", "/bank-bonuses"],
    ["Brokerage", "/brokerage-bonuses"],
    ["Providers", "/providers"],
    ["Compare", "/compare"],
    ["Best Bonuses", "/best-bank-bonuses"],
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 shadow-sm shadow-slate-950/[0.03] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <BrandLogo />
          <button
            type="button"
            aria-controls="primary-navigation"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <span className="grid gap-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-slate-900" />
              <span className="block h-0.5 w-5 rounded-full bg-slate-900" />
              <span className="block h-0.5 w-5 rounded-full bg-slate-900" />
            </span>
          </button>
        </div>
        <nav
          id="primary-navigation"
          className={`mt-4 gap-1 rounded-3xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-600 shadow-xl shadow-slate-950/5 lg:mt-0 lg:flex lg:items-center lg:justify-end lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
            isOpen ? "grid" : "hidden"
          }`}
        >
          {navLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/offers"
            onClick={() => setIsOpen(false)}
            className="inline-flex rounded-full bg-blue-700 px-4 py-2 text-white shadow-sm shadow-blue-900/20 transition hover:bg-blue-800 lg:ml-2"
          >
            Compare Offers
          </Link>
        </nav>
      </div>
    </header>
  );
}
