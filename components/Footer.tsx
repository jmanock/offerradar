import Link from "next/link";
import { categories } from "@/data/offers";
import { getAllProviders } from "@/lib/offers";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  const providers = getAllProviders().slice(0, 6);

  return (
    <footer className="border-t border-slate-800 bg-[#07111f] text-slate-300">
      <div className="radar-grid mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <div className="[&_span_span:first-child]:text-white">
            <BrandLogo />
          </div>
          <p className="mt-3 text-sm leading-6">
            A disclosure-first offer tracking platform for comparing bonuses,
            referrals, promotions, fees, and verification dates before signup.
          </p>
          <p className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs leading-5 text-slate-400">
            Offer details can change. Verify terms directly with the provider.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">Categories</p>
          <div className="mt-3 grid gap-2 text-sm">
            {categories.map((category) => (
              <Link key={category.slug} href={`/${category.slug}`}>
                {category.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold text-white">Providers</p>
          <div className="mt-3 grid gap-2 text-sm">
            {providers.map((provider) => (
              <Link key={provider.slug} href={`/provider/${provider.slug}`}>
                {provider.name}
              </Link>
            ))}
            <Link href="/providers">All providers</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-white">Research</p>
          <div className="mt-3 grid gap-2 text-sm">
            <Link href="/offers">All offers</Link>
            <Link href="/providers">Providers</Link>
            <Link href="/best-bank-bonuses">Best bank bonuses</Link>
            <Link href="/best-brokerage-bonuses">Best brokerage bonuses</Link>
            <Link href="/best-referral-bonuses">Best referral bonuses</Link>
            <Link href="/checking-account-bonuses">Checking bonuses</Link>
            <Link href="/national-bank-bonuses">National bank bonuses</Link>
            <Link href="/about">About</Link>
            <Link href="/editorial-policy">Editorial policy</Link>
            <Link href="/disclosures">Disclosures</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
