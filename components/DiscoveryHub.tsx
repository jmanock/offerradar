import Link from "next/link";
import type { ReactNode } from "react";
import { CategoryArtwork, type ArtworkKind } from "@/components/CategoryArtwork";
import { JsonLd } from "@/components/JsonLd";

type HubLink = { href: string; label: string; description: string; kind: ArtworkKind };

export function DiscoveryHub({ title, eyebrow, intro, path, links, note, children }: { title: string; eyebrow: string; intro: string; path: string; links: HubLink[]; note?: string; children?: ReactNode }) {
  return <div>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: title, url: `https://offerradar.io${path}`, mainEntity: { "@type": "ItemList", itemListElement: links.map((link, index) => ({ "@type": "ListItem", position: index + 1, name: link.label, url: `https://offerradar.io${link.href}` })) } }} />
    <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#dffcf4_0,#f8fbff_36%,#f6f8fb_75%)]"><div className="radar-grid absolute inset-0 opacity-60" /><div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><nav aria-label="Breadcrumb" className="text-sm font-bold text-slate-500"><Link href="/">Home</Link> / {title}</nav><p className="mt-6 text-xs font-extrabold uppercase tracking-wide text-teal-700">{eyebrow}</p><h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{title}</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{intro}</p></div></section>
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{links.map((link) => <Link key={link.href} href={link.href} className="premium-card rounded-3xl p-6 transition hover:-translate-y-1 hover:border-blue-200"><CategoryArtwork kind={link.kind} label={link.label} /><h2 className="mt-5 text-xl font-black text-slate-950">{link.label}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{link.description}</p><span className="mt-5 inline-flex text-sm font-extrabold text-blue-700">Explore →</span></Link>)}</div>{note ? <p className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600">{note}</p> : null}{children}</section>
  </div>;
}
