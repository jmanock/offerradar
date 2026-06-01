import Link from "next/link";
import { categories } from "@/data/offers";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-bold text-white">OfferRadar</p>
          <p className="mt-3 text-sm leading-6">
            Track bonuses, offers, referrals, and promotions. Updated daily,
            organized clearly, and built for comparison before signup.
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
          <p className="font-semibold text-white">Company</p>
          <div className="mt-3 grid gap-2 text-sm">
            <Link href="/offers">All offers</Link>
            <Link href="/best-bank-bonuses">Best bank bonuses</Link>
            <Link href="/best-brokerage-bonuses">Best brokerage bonuses</Link>
            <Link href="/best-referral-bonuses">Best referral bonuses</Link>
            <Link href="/about">About</Link>
            <Link href="/editorial-policy">Editorial policy</Link>
            <Link href="/disclosures">Disclosures</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
