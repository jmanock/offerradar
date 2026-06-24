import { providers } from "@/data/providers";
import type { ProviderComparisonInfo } from "@/types/offer";

function pairSlug(providerA: string, providerB: string) {
  return `${providerA}-vs-${providerB}`;
}

const comparisonAliases = [
  {
    slug: "webull-vs-robinhood",
    providerA: "webull",
    providerB: "robinhood",
  },
];

export function getAllProviderComparisonPages(): ProviderComparisonInfo[] {
  const comparisons: ProviderComparisonInfo[] = [];

  for (let first = 0; first < providers.length; first += 1) {
    for (let second = first + 1; second < providers.length; second += 1) {
      const providerA = providers[first];
      const providerB = providers[second];
      const sharedCategories = providerA.relatedCategories.filter((category) =>
        providerB.relatedCategories.includes(category),
      );
      const categoryHint = sharedCategories.length
        ? "shared offer categories"
        : "different offer categories";

      comparisons.push({
        slug: pairSlug(providerA.slug, providerB.slug),
        title: `${providerA.name} vs ${providerB.name} offers`,
        description: `Compare ${providerA.name} and ${providerB.name} tracked offer types, requirements, fees, verification reminders, and ${categoryHint}.`,
        providerA,
        providerB,
        sharedCategories,
        comparisonAngles: [
          "Offer category fit",
          "Funding, direct deposit, or activity requirements",
          "Fees, waiver rules, and account costs",
          "Verification status and provider terms",
        ],
      });
    }
  }

  for (const alias of comparisonAliases) {
    const providerA = providers.find((provider) => provider.slug === alias.providerA);
    const providerB = providers.find((provider) => provider.slug === alias.providerB);

    if (!providerA || !providerB) {
      continue;
    }

    const sharedCategories = providerA.relatedCategories.filter((category) =>
      providerB.relatedCategories.includes(category),
    );

    comparisons.push({
      slug: alias.slug,
      title: `${providerA.name} vs ${providerB.name} offers`,
      description: `Compare ${providerA.name} and ${providerB.name} tracked offer types, requirements, fees, verification reminders, and shared offer categories.`,
      providerA,
      providerB,
      sharedCategories,
      comparisonAngles: [
        "Offer category fit",
        "Funding, direct deposit, or activity requirements",
        "Fees, waiver rules, and account costs",
        "Verification status and provider terms",
      ],
    });
  }

  return comparisons;
}

export function getProviderComparisonBySlug(slug: string) {
  const directPage = getAllProviderComparisonPages().find((page) => page.slug === slug);

  if (directPage) {
    return directPage;
  }

  const alias = comparisonAliases.find((candidate) => candidate.slug === slug);

  if (!alias) {
    return undefined;
  }

  const providerA = providers.find((provider) => provider.slug === alias.providerA);
  const providerB = providers.find((provider) => provider.slug === alias.providerB);

  if (!providerA || !providerB) {
    return undefined;
  }

  const sharedCategories = providerA.relatedCategories.filter((category) =>
    providerB.relatedCategories.includes(category),
  );

  return {
    slug: alias.slug,
    title: `${providerA.name} vs ${providerB.name} offers`,
    description: `Compare ${providerA.name} and ${providerB.name} tracked offer types, requirements, fees, verification reminders, and shared offer categories.`,
    providerA,
    providerB,
    sharedCategories,
    comparisonAngles: [
      "Offer category fit",
      "Funding, direct deposit, or activity requirements",
      "Fees, waiver rules, and account costs",
      "Verification status and provider terms",
    ],
  };
}

export function getComparisonsForProvider(providerSlug: string, limit = 6) {
  return getAllProviderComparisonPages()
    .filter(
      (page) =>
        page.providerA.slug === providerSlug || page.providerB.slug === providerSlug,
    )
    .slice(0, limit);
}
