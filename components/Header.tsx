import Link from "next/link";
import { categories } from "@/data/offers";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-slate-950 text-sm font-bold text-white">
            OR
          </span>
          <span>
            <span className="block text-lg font-bold leading-5 text-slate-950">
              OfferRadar
            </span>
            <span className="text-xs font-medium text-slate-500">
              Track bonuses and promotions
            </span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-600">
          <Link href="/offers" className="hover:text-blue-700">
            Offers
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="hover:text-blue-700"
            >
              {category.shortTitle}
            </Link>
          ))}
          <Link href="/about" className="hover:text-blue-700">
            About
          </Link>
          <Link href="/editorial-policy" className="hover:text-blue-700">
            Policy
          </Link>
        </nav>
      </div>
    </header>
  );
}
