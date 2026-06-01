import Link from "next/link";
import { getOffersByCategory } from "@/lib/offers";
import type { CategoryInfo } from "@/types/offer";

export function CategoryCard({ category }: { category: CategoryInfo }) {
  const offers = getOffersByCategory(category.slug);

  return (
    <Link
      href={`/${category.slug}`}
      className="premium-card group rounded-3xl p-6 transition hover:-translate-y-1 hover:border-emerald-200"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-extrabold text-slate-950">
          {category.title}
        </h3>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {offers.length} tracked
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        {category.description}
      </p>
      <p className="mt-5 text-sm font-bold text-blue-700 group-hover:text-blue-900">
        Compare category
      </p>
    </Link>
  );
}
