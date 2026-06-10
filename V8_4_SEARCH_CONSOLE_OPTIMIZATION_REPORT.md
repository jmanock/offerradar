# OfferRadar V8.4 Search Console Optimization Report

Date: 2026-06-09

## Objective

Improve relevance, click-through potential, trust signals, and crawl paths for
pages already receiving Search Console impressions without adding hype,
unsupported claims, or affiliate-forward copy.

## Pages Optimized

- `/`
- `/offers`
- `/brokerage-bonuses`
- `/bank-bonuses`
- `/best-bank-bonuses`
- `/best-checking-accounts-florida`
- `/provider/wells-fargo`
- `/provider/merrill-edge`
- Existing offer detail pages through the shared offer template

## Queries Targeted

- florida checking account bonus
- best checking accounts fl
- best checking and savings account offers
- best banks for checking
- best bank for checking
- brokerage promotions
- brokerage account bonus
- robinhood transfer bonus 2026
- wells fargo credit card
- Merrill Edge brokerage and transfer research

Clearpath Brokerage was handled cautiously. Existing tracked data supports a
research note, but no verified official provider source is recorded, so no
current promotion claim was added.

## Metadata Changed

- Rewrote titles and descriptions for the homepage, offers database, bank
  bonuses, brokerage bonuses, best bank bonuses, Florida checking accounts,
  Wells Fargo, and Merrill Edge.
- Titles now describe comparison intent and tracked records more clearly.
- Descriptions emphasize requirements, fees, verification dates, and current
  provider terms.

## Content And Trust Improvements

- Added stronger verification-first above-the-fold language.
- Added last verified or source reviewed context to category, best-of, local,
  and provider templates.
- Added query-matched educational sections for bank bonuses, brokerage
  promotions, Florida checking accounts, Wells Fargo, and Merrill Edge.
- Added a visible `Tracked offer record` label to offer detail pages while
  preserving existing indexed slugs.
- Preserved consumer-first disclosures and cautious provider-verification
  language.

## Internal Links Added

- Category pages now link to related providers, guides, comparisons, and offer
  type pages.
- Best-of pages now link to related guides and popular comparisons.
- Florida checking content now links to bank bonuses, Wells Fargo, direct
  deposit guidance, and a provider comparison.
- Wells Fargo and Merrill Edge pages now link to relevant categories, guides,
  and comparisons.
- `/offers` retains and strengthens provider, guide, comparison, category, and
  recently verified offer paths.

## Schema Added

- FAQ schema on the homepage, offers page, targeted category pages, targeted
  provider pages, and best-of pages.
- Breadcrumb schema on `/offers`, local SEO pages, and best-of pages.
- Existing CollectionPage, Service, provider breadcrumb, and local FAQ schema
  were preserved.

## Example-Language Cleanup

- Existing `-example` offer routes were preserved to avoid breaking indexed
  URLs and sitemap entries.
- Public offer titles do not use `Example`, `Manual`, or `Placeholder`.
- Offer detail pages identify themselves as tracked offer records rather than
  development examples.

## Remaining Opportunities

- Replace unverified example-domain source URLs with reviewed official provider
  offer URLs as they are collected.
- Import fresh Search Console exports regularly and compare CTR changes by
  page and query.
- Review whether high-impression pages earn clicks after titles are recrawled.
- Expand provider-specific content only when verified source data supports it.
- Reassess Clearpath Brokerage after an official provider source is verified.

## Next Search Console Checks

1. Compare CTR and average position for the eight prioritized pages after
   Google recrawls them.
2. Watch `brokerage promotions`, `brokerage account bonus`, and
   `robinhood transfer bonus 2026` impressions.
3. Watch `florida checking account bonus` and `best checking accounts fl` for
   position and CTR movement.
4. Confirm Wells Fargo impressions land on the provider page or relevant
   tracked offer record.
5. Review queries with impressions above 10 and CTR below 1% for the next
   optimization pass.

## Validation

Validation commands:

- `npm run offers:pipeline`
- `npm run intelligence:all`
- `npm run lint`
- `npm run build`

Final results are recorded after the validation run.

### Final Results

- `npm run offers:pipeline`: passed; 74 offers validated with no field changes.
- `npm run intelligence:all`: passed; monetization, content-gap, internal-link,
  and V7 intelligence reports regenerated.
- `npm run lint`: passed.
- `npm run build`: passed; 532 routes generated.
- Rendered-output review confirmed the new metadata titles, FAQ schema,
  breadcrumb schema, query-matched sections, and verification language on the
  prioritized routes.
