import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { AffiliateLink } from "@/components/AffiliateLink";
import { getResearchArticle, researchArticles } from "@/data/researchArticles";
import { formatDate } from "@/lib/offers";

export function generateStaticParams() { return researchArticles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = getResearchArticle((await params).slug);
  if (!article) return {};
  return { title: article.title, description: article.description, alternates: { canonical: `/research/${article.slug}` }, openGraph: { title: article.title, description: article.description, type: "article", modifiedTime: `${article.updated}T00:00:00Z` } };
}

export default async function ResearchArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getResearchArticle((await params).slug);
  if (!article) notFound();
  return <article>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, dateModified: article.updated, datePublished: article.updated, author: { "@type": "Organization", name: "OfferRadar Editorial" }, publisher: { "@id": "https://offerradar.io/#organization" }, mainEntityOfPage: `https://offerradar.io/research/${article.slug}` }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://offerradar.io" }, { "@type": "ListItem", position: 2, name: "Research", item: "https://offerradar.io/research" }, { "@type": "ListItem", position: 3, name: article.title, item: `https://offerradar.io/research/${article.slug}` }] }} />
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto max-w-4xl px-4 py-14 sm:px-6"><nav aria-label="Breadcrumb" className="text-sm font-bold text-slate-500"><Link href="/">Home</Link> / <Link href="/research">Research</Link> / {article.category}</nav><p className="mt-7 text-xs font-extrabold uppercase tracking-wide text-teal-700">{article.category}</p><h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{article.title}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{article.description}</p><div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-slate-500"><span>OfferRadar Editorial</span><span>Updated {formatDate(article.updated)}</span><span>{article.readingMinutes} min read</span></div></div></header>
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_260px]">
      <div className="grid gap-6"><aside className="rounded-3xl border border-teal-200 bg-teal-50 p-6"><p className="text-xs font-extrabold uppercase tracking-wide text-teal-800">Key takeaway</p><p className="mt-2 text-lg font-bold leading-8 text-slate-900">{article.takeaway}</p></aside>{article.sections.map((section, index) => <section key={section.title} className="premium-card rounded-3xl p-6"><p className="text-xs font-black text-teal-700">0{index + 1}</p><h2 className="mt-2 text-2xl font-black text-slate-950">{section.title}</h2><p className="mt-3 leading-7 text-slate-600">{section.body}</p><ul className="mt-5 grid gap-2">{section.points.map((point) => <li key={point} className="flex gap-3 rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-slate-700"><span className="text-teal-600">✓</span>{point}</li>)}</ul></section>)}{article.affiliatePlacement ? <section className="rounded-3xl border border-blue-200 bg-blue-50 p-6"><p className="text-xs font-extrabold uppercase tracking-wide text-blue-800">External research tool</p><h2 className="mt-2 text-2xl font-black text-slate-950">{article.affiliatePlacement.heading}</h2><p className="mt-3 leading-7 text-slate-700">{article.affiliatePlacement.body}</p><div className="mt-5"><AffiliateLink affiliateId={article.affiliatePlacement.affiliateId} placementId={article.affiliatePlacement.placementId} pagePath={`/research/${article.slug}`} linkText={article.affiliatePlacement.linkText} /></div><div className="mt-5"><AffiliateDisclosure compact /></div></section> : null}</div>
      <aside className="h-fit rounded-3xl bg-slate-950 p-5 text-white lg:sticky lg:top-24"><h2 className="font-black">Continue researching</h2><div className="mt-4 grid gap-3">{article.related.map((link) => <Link key={link.href} href={link.href} className="rounded-xl bg-white/10 p-3 text-sm font-bold text-slate-100 hover:bg-white/15">{link.label}</Link>)}<Link href="/offer-tracker" className="rounded-xl bg-teal-300 p-3 text-sm font-black text-slate-950">Open offer tracker</Link></div><p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-slate-400">Educational research only. Verify provider terms and consult a qualified professional for tax, legal, or financial advice.</p></aside>
    </div>
  </article>;
}
