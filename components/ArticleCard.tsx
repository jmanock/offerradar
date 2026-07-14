import { CategoryArtwork } from "@/components/CategoryArtwork";
import { TrackedLink } from "@/components/TrackedLink";
import { formatDate } from "@/lib/offers";
import type { ResearchArticle } from "@/data/researchArticles";

export function ArticleCard({ article }: { article: ResearchArticle }) {
  return (
    <article className="premium-card flex h-full flex-col rounded-3xl p-5">
      <div className="flex items-start justify-between gap-4"><CategoryArtwork kind="research" label={article.category} /><span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800">{article.category}</span></div>
      <h2 className="mt-5 text-xl font-black leading-7 text-slate-950">{article.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{article.description}</p>
      <p className="mt-5 text-xs font-bold text-slate-500">Updated {formatDate(article.updated)} · {article.readingMinutes} min read</p>
      <TrackedLink href={`/research/${article.slug}`} eventName="article_click" eventParams={{ article_slug: article.slug, source_page: "research_hub" }} className="mt-4 inline-flex w-fit rounded-full bg-blue-700 px-4 py-2 text-sm font-extrabold text-white">Read the research</TrackedLink>
    </article>
  );
}
