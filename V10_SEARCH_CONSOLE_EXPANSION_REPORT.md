# OfferRadar V10 Search Console Authority Expansion Report

## Executive Summary

V10 strengthens the search topics already earning impressions instead of expanding into unrelated subjects. The release builds on the existing V9.5 authority system, adds six focused research pages, improves contextual linking, sharpens major-page metadata, and makes verification methodology visible across every offer, provider, guide, and provider-comparison page.

The production build generated 541 static pages.

## Pages Created

- `/florida-credit-unions`
- `/best-online-banks-in-florida`
- `/wells-fargo-bonuses`
- `/wells-fargo-checking-bonus`
- `/robinhood-vs-webull`
- `/robinhood-vs-fidelity`

Each page uses the reusable authority-page architecture with:

- Unique title, description, H1, introduction, and research sections
- Verification-first language and a visible last verified date
- FAQ, breadcrumb, and CollectionPage structured data
- Related research links
- Tracked offers where matching provider or category data exists
- Verification methodology and disclosure blocks

## Pages Updated

- `/brokerage-bonuses`
- `/best-brokerage-bonuses`
- `/best-bank-bonuses`
- `/best-checking-accounts-florida`
- All `/offer/[slug]` pages
- All `/provider/[slug]` pages
- All `/guides/[slug]` pages
- All `/compare/[slug]` pages

The existing V9.5 work on `/brokerage-bonuses`, `/best-checking-accounts-florida`, priority provider pages, brokerage comparison tables, transfer education, Florida bank comparisons, and provider FAQs was preserved and extended.

## Keywords Targeted

- brokerage bonuses 2026
- brokerage promotions
- brokerage account bonus
- brokerage transfer bonuses
- Robinhood transfer bonus
- Florida credit unions
- online banks in Florida
- best banks in Florida
- Florida checking accounts
- Wells Fargo bonuses
- Wells Fargo checking bonus
- Robinhood vs Webull
- Robinhood vs Fidelity

## Metadata Improvements

CTR-oriented, non-clickbait 2026 titles were added to:

- `/brokerage-bonuses`
- `/best-brokerage-bonuses`
- `/best-bank-bonuses`
- `/best-checking-accounts-florida`

All new authority pages have unique metadata, canonical URLs, and Open Graph metadata through the existing programmatic page route.

## Internal Links Added

- Added all six V10 authority routes to the priority landing-page registry, surfacing them from the homepage and footer.
- Added Wells Fargo authority links to the Wells Fargo provider research section.
- Added Robinhood comparison authority links to Robinhood and Fidelity provider research sections.
- Connected new authority pages to relevant providers, guides, Florida pages, category pages, and provider comparisons.
- Preserved existing contextual brokerage, Florida, bank bonus, and comparison links.

## Trust And Freshness Improvements

- Added the reusable "How OfferRadar verifies offers" component to every offer page.
- Added visible verification methodology to every provider page, including providers outside the priority-provider group.
- Added visible last verified dates and verification methodology to every guide page.
- Added visible last verified dates and verification methodology to every provider-comparison page.
- Preserved disclosure, eligibility, fee, source-review, and direct-provider verification language.
- No bonuses, rates, approvals, eligibility, or availability claims were invented.

## Schema And Search Infrastructure

- New authority pages include CollectionPage, BreadcrumbList, and FAQPage schema.
- Existing guide Article and FAQ schema remains intact.
- Existing comparison CollectionPage and BreadcrumbList schema remains intact.
- Existing offer, provider, sitemap, robots, analytics, automation, and intelligence systems were preserved.
- Bing verification meta tag is present in rendered public-page heads.
- Bing verification key file remains at `/fbd66d1bed94486a87683b0b5f029153.txt`.
- Microsoft Clarity project ID remains configured as `x29lg7gz7q`.
- All six new routes appear exactly once in the generated sitemap.

## Validation Results

- `npm run offers:pipeline`: passed; 74 offers validated, no offer changes
- `npm run intelligence:all`: passed; monetization, content, internal-link, and intelligence reports regenerated
- `npm run lint`: passed
- `npm run build`: passed
- Production build: 541 static pages generated
- Rendered authority-page desktop QA: passed
- Rendered authority-page mobile QA: passed; no horizontal overflow and mobile menu present
- Structured-data spot check: FAQPage and BreadcrumbList present
- Sitemap uniqueness spot check: all six new routes included once

## Future Opportunities

- Use new Search Console exports to compare CTR changes for the updated 2026 titles.
- Add verified official offer URLs to Wells Fargo records when directly reviewed.
- Expand provider-specific authority pages only where Search Console demand and verified source data justify them.
- Review the top Florida city pages for opportunities to link directly to the new Florida credit union and online-bank guides.
- Monitor Robinhood comparison impressions before creating additional provider-pair authority pages.
