import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DisclosureBlock } from "@/components/DisclosureBlock";
import { AuthorityPage } from "@/components/AuthorityPage";
import { LocalSeoPageView } from "@/components/LocalSeoPage";
import { OfferCard } from "@/components/OfferCard";
import { getLocalSeoPageBySlug, localSeoPages } from "@/data/localSeo";
import { authorityPages, getAuthorityPage } from "@/data/authorityPages";
import {
  getAllOfferTypePages,
  getAllStatePages,
  getCategoryBySlug,
  getOfferTypePageBySlug,
  getOffersForOfferTypePage,
  getOffersForStatePage,
  getStatePageBySlug,
} from "@/lib/offers";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const pages = [
    ...getAllOfferTypePages().map((page) => ({ slug: page.slug })),
    ...getAllStatePages().map((page) => ({ slug: page.slug })),
    ...localSeoPages.map((page) => ({ slug: page.slug })),
    ...authorityPages.map((page) => ({ slug: page.slug })),
  ];

  return pages.filter(
    (page, index) => pages.findIndex((candidate) => candidate.slug === page.slug) === index,
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offerTypePage = getOfferTypePageBySlug(slug);
  const statePage = getStatePageBySlug(slug);
  const localSeoPage = getLocalSeoPageBySlug(slug);
  const authorityPage = getAuthorityPage(slug);

  if (authorityPage) {
    return {
      title: authorityPage.title,
      description: authorityPage.description,
      alternates: { canonical: `/${authorityPage.slug}` },
      openGraph: {
        title: authorityPage.title,
        description: authorityPage.description,
        url: `/${authorityPage.slug}`,
      },
    };
  }

  if (offerTypePage) {
    return {
      title: offerTypePage.title,
      description: offerTypePage.description,
      alternates: { canonical: `/${offerTypePage.slug}` },
    };
  }

  if (statePage) {
    return {
      title: statePage.title,
      description: statePage.description,
      alternates: { canonical: `/${statePage.slug}` },
    };
  }

  if (localSeoPage) {
    if (localSeoPage.slug === "best-checking-accounts-florida") {
      return {
        title: "Best Checking Accounts in Florida (2026) | Compare Features",
        description:
          "Compare checking accounts in Florida by monthly fees, direct deposit rules, branch and ATM access, tracked bonuses, and last verified details.",
        alternates: { canonical: `/${localSeoPage.slug}` },
        openGraph: {
          title: "Best Checking Accounts in Florida (2026) | Compare Features",
          description:
            "Compare Florida checking accounts, tracked bonuses, banking features, fees, access, and last verified details.",
          url: `/${localSeoPage.slug}`,
        },
      };
    }

    return {
      title: localSeoPage.title,
      description: localSeoPage.description,
      alternates: { canonical: `/${localSeoPage.slug}` },
    };
  }

  return { title: "Page not found" };
}

export default async function ProgrammaticPage({ params }: Props) {
  const { slug } = await params;
  const offerTypePage = getOfferTypePageBySlug(slug);
  const statePage = getStatePageBySlug(slug);
  const localSeoPage = getLocalSeoPageBySlug(slug);
  const authorityPage = getAuthorityPage(slug);

  if (authorityPage) {
    return <AuthorityPage page={authorityPage} />;
  }

  if (offerTypePage) {
    const offers = getOffersForOfferTypePage(offerTypePage.slug);

    return (
      <ProgrammaticLayout
        eyebrow="Offer type"
        h1={offerTypePage.h1}
        intro={offerTypePage.intro}
        offers={offers}
        tipsTitle="How to compare"
        tips={offerTypePage.comparisonTips}
        faq={offerTypePage.faq}
        relatedLinks={offerTypePage.relatedCategories.map((categorySlug) => {
          const category = getCategoryBySlug(categorySlug);
          return {
            href: `/${categorySlug}`,
            label: category?.title ?? categorySlug,
          };
        })}
      />
    );
  }

  if (statePage) {
    const offers = getOffersForStatePage(statePage.slug);

    return (
      <ProgrammaticLayout
        eyebrow="State guide"
        h1={statePage.h1}
        intro={statePage.intro}
        offers={offers}
        tipsTitle={`How to compare offers in ${statePage.stateName}`}
        tips={statePage.cautions}
        faq={statePage.faq}
        relatedLinks={statePage.relatedPages.map((href) => ({
          href,
          label: href
            .replace("/", "")
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        }))}
      />
    );
  }

  if (localSeoPage) {
    return <LocalSeoPageView page={localSeoPage} />;
  }

  notFound();
}

function ProgrammaticLayout({
  eyebrow,
  h1,
  intro,
  offers,
  tipsTitle,
  tips,
  faq,
  relatedLinks,
}: {
  eyebrow: string;
  h1: string;
  intro: string;
  offers: ReturnType<typeof getOffersForOfferTypePage>;
  tipsTitle: string;
  tips: string[];
  faq: { question: string; answer: string }[];
  relatedLinks: { href: string; label: string }[];
}) {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_18%_20%,#dffcf4_0,#f8fbff_34%,#f6f8fb_72%)]">
        <div className="radar-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-teal-700">
              {eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {h1}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">{intro}</p>
          </div>
          <div className="premium-card rounded-3xl p-6">
            <h2 className="text-lg font-black text-slate-950">
              Verification reminder
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Terms may change. Verify availability, fees, eligibility, and
              payout timing directly with the provider before acting.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-slate-950">Matching offers</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard key={offer.slug} offer={offer} />
          ))}
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
        <section className="premium-card rounded-3xl p-6">
          <h2 className="text-2xl font-black text-slate-950">{tipsTitle}</h2>
          <div className="mt-5 grid gap-3">
            {tips.map((tip) => (
              <p key={tip} className="rounded-2xl bg-slate-50 p-4 text-slate-700">
                {tip}
              </p>
            ))}
          </div>
        </section>
        <DisclosureBlock />
      </div>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-950">FAQ</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {faq.map((item) => (
              <div key={item.question} className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-extrabold text-slate-950">{item.question}</h3>
                <p className="mt-2 leading-7 text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="premium-card rounded-3xl p-6">
          <h2 className="text-2xl font-black text-slate-950">Related pages</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
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
