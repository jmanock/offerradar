import Link from "next/link";
import { AnalyticsEvent } from "@/components/AnalyticsEvent";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { JsonLd } from "@/components/JsonLd";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import type { LocalSeoPage } from "@/data/localSeo";

export function LocalSeoPageView({ page }: { page: LocalSeoPage }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    areaServed: page.location,
    provider: {
      "@type": "Organization",
      name: "OfferRadar",
      url: "https://offerradar.io",
    },
    description: page.description,
  };

  return (
    <div>
      {page.kind === "city" ? (
        <AnalyticsEvent
          name="city_page_view"
          params={{ city: page.location, page_slug: page.slug }}
        />
      ) : null}
      <JsonLd data={faqSchema} />
      <JsonLd data={serviceSchema} />
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#dffcf4_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-teal-700">
              Florida banking comparison
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">{page.intro}</p>
            <p className="mt-5 text-sm font-bold text-slate-500">
              Last updated {page.lastUpdated}
            </p>
          </div>
          <div className="premium-card rounded-3xl p-6">
            <h2 className="text-xl font-black text-slate-950">
              {page.cta.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {page.cta.body}
            </p>
            <div className="mt-5 grid gap-3">
              <Link
                href="#lead-capture"
                className="inline-flex justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-800"
              >
                Review local options
              </Link>
              <Link
                href="/offers"
                className="inline-flex justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-extrabold text-slate-900 hover:border-blue-300 hover:text-blue-800"
              >
                Compare offers
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          {page.comparisonSections.map((section) => (
            <article key={section.title} className="premium-card rounded-3xl p-6">
              <h2 className="text-2xl font-black text-slate-950">
                {section.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">{section.body}</p>
              <div className="mt-5 grid gap-3">
                {section.points.map((point) => (
                  <p key={point} className="rounded-2xl bg-slate-50 p-3 text-sm font-bold text-slate-700">
                    {point}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-black text-slate-950">FAQ</h2>
            <div className="mt-5 grid gap-5">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="font-extrabold text-slate-950">{faq.question}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          <DisclosureBlock compact />
        </div>
      </section>

      <section id="lead-capture" className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
            Comparison request
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">
            Request local comparison information
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Share what you are comparing. OfferRadar will use this to organize
            future local banking comparison and research-update workflows.
          </p>
        </div>
        <div className="premium-card rounded-3xl p-6">
          <LeadCaptureForm source={page.slug} />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-950">Related pages</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {page.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-900 hover:border-blue-300 hover:text-blue-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
