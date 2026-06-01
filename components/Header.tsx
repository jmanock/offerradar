import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

export function Header() {
  const navLinks = [
    ["Offers", "/offers"],
    ["Bank Bonuses", "/bank-bonuses"],
    ["Brokerage", "/brokerage-bonuses"],
    ["Providers", "/providers"],
    ["Best Bonuses", "/best-bank-bonuses"],
    ["Policy", "/editorial-policy"],
    ["Disclosures", "/disclosures"],
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 shadow-sm shadow-slate-950/[0.03] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <BrandLogo />
        <nav className="flex flex-wrap items-center gap-1 text-sm font-semibold text-slate-600">
          {navLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/offers"
            className="ml-0 inline-flex rounded-full bg-blue-700 px-4 py-2 text-white shadow-sm shadow-blue-900/20 transition hover:bg-blue-800 lg:ml-2"
          >
            Browse Offers
          </Link>
        </nav>
      </div>
    </header>
  );
}
