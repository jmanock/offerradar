import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { JsonLd } from "@/components/JsonLd";
import { researchArticles } from "@/data/researchArticles";

export const metadata: Metadata = { title: "Offer Research Library", description: "Practical, requirements-first research for comparing bank bonuses, brokerage promotions, fees, timelines, and offer claims.", alternates: { canonical: "/research" } };

export default function ResearchPage() {
  return <div>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "OfferRadar Research Library", url: "https://offerradar.io/research", mainEntity: { "@type": "ItemList", itemListElement: researchArticles.map((article, index) => ({ "@type": "ListItem", position: index + 1, name: article.title, url: `https://offerradar.io/research/${article.slug}` })) } }} />
    <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#dffcf4_0,#f8fbff_36%,#f6f8fb_75%)]"><div className="radar-grid absolute inset-0 opacity-60" /><div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><nav aria-label="Breadcrumb" className="text-sm font-bold text-slate-500"><Link href="/">Home</Link> / Research</nav><p className="mt-6 text-xs font-extrabold uppercase tracking-wide text-teal-700">Research library</p><h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Understand the offer behind the headline</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">Focused field guides for fees, requirements, timelines, taxes to research, verification, and better comparison decisions.</p></div></section>
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{researchArticles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div></section>
  </div>;
}
