import Link from "next/link";
import { getOffersByCategory } from "@/lib/offers";
import type { CategoryInfo } from "@/types/offer";

export function CategoryCard({ category }: { category: CategoryInfo }) {
  const offers = getOffersByCategory(category.slug);

  return (
    <Link
      href={`/${category.slug}`}
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-950">
          {category.title}
        </h3>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {offers.length} tracked
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        {category.description}
      </p>
    </Link>
  );
}
