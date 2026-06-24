# OfferRadar V12 Banking Authority and Query Expansion Report

Date: 2026-06-24

## Mission

Strengthen pages Google is already testing for banking bonuses, checking accounts, brokerage bonuses, credit unions, and Florida banking queries. The pass focused on CTR, topical authority, internal linking, schema support, and verification-first consumer research.

No fake bonuses, fake rates, fake provider terms, fake urgency, scraping, external APIs, credentials, or deployment automation were added.

## Pages Expanded

### `/best-checking-accounts-florida`

Expanded into a stronger Florida checking hub with:

- Best online banks in Florida
- Florida credit unions
- National banks vs local banks
- Best bank bonuses for Florida residents
- Minimum deposit comparison
- Monthly fee comparison
- Mobile banking comparison
- Direct deposit bonus comparison table
- Additional internal links to bank bonus, checking, savings, credit union, and World Cup banking pages

Browser QA confirmed:

- FAQ schema present
- Breadcrumb schema present
- 4 comparison tables
- Trust language above the fold
- No horizontal overflow

### `/best-credit-unions-florida`

Expanded around the tested credit-union query cluster:

- Florida credit unions
- National credit unions
- Membership requirements
- Fee comparison table
- Savings rates discussion
- Mobile app comparison
- ATM network comparison
- Expanded FAQ section
- Internal links to checking accounts, bank bonuses, offers, and Florida banking pages

Browser QA confirmed:

- FAQ schema present
- Breadcrumb schema present
- 1 comparison table
- Trust language above the fold
- No desktop or 390px mobile horizontal overflow

### `/brokerage-bonuses`

Upgraded brokerage query alignment with:

- Transfer bonus section
- Account funding section
- Brokerage account bonus comparison copy
- Robinhood, Webull, Fidelity, Merrill Edge, and SoFi Invest research coverage
- Expanded FAQ around taxable treatment, timing, transfer bonuses, and brokerage promotions
- Popular brokerage provider links updated to include Merrill Edge and SoFi

Browser QA confirmed:

- FAQ schema present
- Breadcrumb schema present
- Comparison table present
- Query-matched copy present
- Trust language above the fold

## Pages Added

### `/best-banks-for-checking`

Created as an authority page targeting:

- `best banks for checking`
- `best bank for checking`

Includes:

- Bank offer comparison table
- Online banks section
- Traditional banks section
- Credit unions section
- Fees and account costs
- Direct deposit requirements
- Mobile banking features
- FAQ schema
- Breadcrumb schema

### `/best-checking-and-savings-account-offers`

Created as an authority page targeting:

- `best checking and savings account offers`

Includes:

- Bank offer comparison table
- Current account offers
- Checking bonuses
- Savings bonuses
- Combined account offers
- Minimum deposit requirements
- Direct deposit requirements
- FAQ schema
- Breadcrumb schema

### `/2026-world-cup-banking-guide`

Created as an informational authority guide covering:

- No foreign transaction fees
- International ATM access
- Mobile banking while traveling
- Travel-focused checking accounts
- Debit cards abroad
- Credit card considerations

This page uses educational language only and does not force keywords or make account recommendations.

### `/compare/webull-vs-robinhood`

Added requested comparison-route alias while preserving the generated provider comparison architecture.

The comparison template now includes:

- Side-by-side comparison table
- Provider research notes
- Fees and account costs
- Mobile experience and access
- ATM or branch access
- Account types
- FAQ schema
- Breadcrumb schema

## Existing Comparison Pages Improved

The generated comparison template now improves every provider-vs-provider page, including:

- `/compare/chase-vs-robinhood`
- `/compare/chase-vs-sofi`
- `/compare/chase-vs-capital-one`
- `/compare/webull-vs-robinhood`
- `/compare/robinhood-vs-webull`

## Internal Linking Improvements

Added or strengthened links from:

- Homepage
- `/offers`
- `/bank-bonuses`
- `/best-bank-bonuses-florida`
- Provider pages for bank-related providers
- Provider pages for brokerage-related providers
- Local SEO pages
- Authority pages
- Internal link hub data

New internal-link targets include:

- `/best-banks-for-checking`
- `/best-checking-and-savings-account-offers`
- `/best-credit-unions-florida`
- `/2026-world-cup-banking-guide`
- `/compare/webull-vs-robinhood`

Also fixed one stale internal link from `/state/florida` to `/florida-bank-bonuses`.

## Schema and SEO

Confirmed or added:

- FAQ schema on expanded local, authority, and comparison pages
- Breadcrumb schema on local, authority, and comparison pages
- CollectionPage schema on authority/comparison pages
- Article schema on World Cup travel-related guides
- Metadata via the existing App Router metadata patterns
- Sitemap inclusion through existing generated route arrays

## Files Modified

- `app/compare/[slug]/page.tsx`
- `app/offers/page.tsx`
- `app/page.tsx`
- `app/provider/[slug]/page.tsx`
- `components/AuthorityPage.tsx`
- `components/CategoryPage.tsx`
- `components/LocalSeoPage.tsx`
- `data/authorityPages.ts`
- `data/comparisonPages.ts`
- `data/internalLinks.ts`
- `data/localSeo.ts`
- Generated automation report files refreshed by validation scripts

## Validation Results

- `npm run offers:pipeline`: passed
  - 74 offers validated
  - 0 added, 0 removed, 0 field changes
- `npm run intelligence:all`: passed
  - Monetization, content, internal link, and V7 intelligence reports regenerated
- `npm run lint`: passed
- `npm run build`: passed
  - Next.js 16.2.6
  - 553 static pages generated

## Browser QA

Checked:

- `/best-checking-accounts-florida`
- `/best-credit-unions-florida`
- `/best-banks-for-checking`
- `/best-checking-and-savings-account-offers`
- `/brokerage-bonuses`
- `/compare/webull-vs-robinhood`
- `/2026-world-cup-banking-guide`

Confirmed:

- Expected H1s render
- FAQ schema present
- Breadcrumb schema present
- Query-matched copy present
- Trust or verification language present
- Tables render where expected
- No horizontal overflow on desktop
- `/best-credit-unions-florida` has no horizontal overflow at 390px mobile width

## Recommended Next Checks

After recrawl, review Search Console for:

- `best checking accounts florida`
- `checking accounts in florida`
- `best credit union`
- `best credit unions florida`
- `best banks for checking`
- `best bank for checking`
- `best checking and savings account offers`
- `brokerage account bonus`
- `brokerage promotions`
- `clearpath brokerage`
