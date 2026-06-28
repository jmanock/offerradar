# OfferRadar V13 CTR, Authority & User Experience Report

Date: 2026-06-28

## Executive Summary

V13 focused on the pages Google is already testing instead of creating broad keyword inventory. The work improved CTR-oriented titles and descriptions, above-the-fold trust language, research methodology, internal linking, FAQ depth, and comparison UX for the highest-priority banking and brokerage pages.

Final static page count from production build: 554 pages.

## Pages Updated

- `/best-credit-unions-florida`
- `/brokerage-bonuses`
- `/bank-bonuses`
- `/best-checking-accounts-florida`
- `/offers`
- `/provider/[slug]` provider template internal links
- Homepage internal links

## New Page Added

- `/best-bank-for-checking`

This is the only new V13 page. It targets the proven query family around "best bank for checking" with research-first guidance, comparison prompts, pros and cons, fees, mobile banking, ATM access, direct deposit considerations, FAQ, related links, and schema from the existing authority-page system.

## Components Improved

- Added `components/ResearchMethodologyBlock.tsx`
  - Reusable trust block for "How we research," "How we update offers," and "What readers should verify."

- Added `components/SortableComparisonTable.tsx`
  - Reusable client-side sortable comparison table.
  - Supports sorting by provider, monthly fee, minimum deposit, ATM access, and bonus amount.
  - Preserves static table HTML for SEO and progressive enhancement.

- Updated category, authority, and local SEO page templates to reuse these components.

## Comparison Tables Added

- `/best-credit-unions-florida`
  - Sortable Florida credit union comparison.
  - Best-fit categories for overall, checking, savings, students, military families, and digital experience.

- `/best-checking-accounts-florida`
  - Sortable Florida checking comparison.
  - Supports online banks, regional banks, credit unions, national banks, and bonus-account research paths.

- `/brokerage-bonuses`
  - Sortable brokerage bonus comparison using tracked offer data.
  - Expanded brokerage comparison remains available through the existing offer comparison table.

- `/bank-bonuses`
  - Sortable checking and savings comparison using tracked offer data.
  - Existing bank offer comparison table preserved.

- `/best-bank-for-checking`
  - Sortable checking account comparison for online banks, national banks, regional banks, and credit unions.

## FAQ Additions

- `/brokerage-bonuses`
  - Added FAQ coverage for whether brokerage bonuses can be combined.
  - Existing FAQ coverage continues to target brokerage promotions, transfer bonuses, brokerage account bonuses, Robinhood transfer concepts, and Webull bonus comparisons.

- `/best-credit-unions-florida`
  - Expanded page body with methodology and best-fit sections.
  - Existing Florida credit union FAQ schema remains active.

- `/best-checking-accounts-florida`
  - Expanded comparison coverage for online banks, regional banks, credit unions, direct deposit bonus comparisons, fees, mobile banking, and ATM access.

- `/best-bank-for-checking`
  - Added FAQ covering best bank selection, online banks, credit unions, choosing accounts because of bonuses, and what to verify before opening checking.

## Internal Links Added

Strengthened contextual paths between:

- `/best-checking-accounts-florida`
- `/best-bank-for-checking`
- `/best-banks-for-checking`
- `/best-bank-bonuses-florida`
- `/best-credit-unions-florida`
- `/bank-bonuses`
- `/brokerage-bonuses`
- `/offers`
- Provider pages for bank providers

Specific additions:

- Homepage now links to `/best-bank-for-checking`.
- `/offers` now includes `/best-bank-for-checking` as a research path.
- Bank provider pages now include `/best-bank-for-checking` in related research.
- Internal priority links now include `/best-bank-for-checking`.
- Florida checking and authority pages link into the new singular checking intent page.

## Schema Improvements

- Confirmed FAQ schema on all priority pages.
- Confirmed breadcrumb schema on all priority pages.
- Confirmed CollectionPage schema remains active for category and authority pages.
- Organization schema remains handled globally by the existing app foundation.
- No fake reviews, ratings, or unsupported financial claims were added.

## Title and Meta Optimization

### `/best-credit-unions-florida`

Title options considered:

1. Best Credit Unions in Florida | Compare Fees and Access
2. Best Credit Unions in Florida (2026) | Membership, Fees, ATMs
3. Florida Credit Unions Compared | Checking, Savings, Access

Selected: `Best Credit Unions in Florida | Compare Fees and Access`

Meta description options considered:

1. Compare Florida credit unions by membership rules, checking fees, savings rate questions, mobile app access, ATM networks, and best-fit categories.
2. Research Florida credit unions by eligibility, fees, mobile banking, ATM access, and what to verify before joining.
3. Compare Florida credit union options by checking, savings, membership rules, branch access, and source-reviewed terms.

Selected: option 1.

### `/brokerage-bonuses`

Title options considered:

1. Brokerage Account Bonuses (2026) | Compare Promotions
2. Brokerage Bonuses | Compare Current Account Promotions
3. Brokerage Promotions | Bonus Requirements and Verification

Selected: `Brokerage Account Bonuses (2026) | Compare Promotions`

Meta description options considered:

1. Compare brokerage account bonuses and promotions by provider, bonus amount, transfer requirements, holding periods, fees, and verification dates.
2. Research brokerage promotions by transfer requirements, funding rules, holding periods, fees, and source-reviewed terms.
3. Compare tracked brokerage bonus records for Robinhood, Fidelity, Merrill Edge, Webull, SoFi Invest, and more.

Selected: option 1.

### `/bank-bonuses`

Title options considered:

1. Bank Bonuses and Best Checking Offers (2026) | Compare
2. Bank Bonuses | Compare Checking and Savings Offers
3. Best Bank Bonuses | Current Tracked Offers and Requirements

Selected: `Bank Bonuses and Best Checking Offers (2026) | Compare`

Meta description options considered:

1. Compare bank bonuses, checking and savings account offers, direct deposit rules, monthly fees, account access, and last verified dates.
2. Research bank bonuses by checking offers, savings promotions, direct deposit requirements, monthly fees, and verification dates.
3. Compare tracked bank bonus records with requirements, fees, provider terms, and source-reviewed details.

Selected: option 1.

### `/best-checking-accounts-florida`

Title options considered:

1. Best Checking Accounts in Florida | Fees, Bonuses, Banks
2. Best Checking Accounts Florida | Compare Banks and Credit Unions
3. Florida Checking Accounts | Fees, Bonuses, Online Banks

Selected: `Best Checking Accounts in Florida | Fees, Bonuses, Banks`

Meta description options considered:

1. Compare Florida checking accounts by fees, bonuses, online banks, credit unions, mobile banking, ATM access, and last verified details.
2. Research checking accounts in Florida by fees, branch access, mobile banking, credit unions, direct deposit rules, and tracked bonus records.
3. Compare Florida checking options from banks, credit unions, and online providers with source-reviewed verification notes.

Selected: option 1.

### `/best-bank-for-checking`

Title options considered:

1. Best Bank for Checking
2. Best Bank for Checking | Compare Fees, ATMs, Mobile Banking
3. Best Bank for Checking | Research Account Fit and Fees

Selected: `Best Bank for Checking`

Meta description options considered:

1. Research the best bank for checking by fees, mobile banking, ATM network, direct deposit rules, credit unions, online banks, and account fit.
2. Compare checking account options by monthly fees, ATM access, branch needs, mobile banking, direct deposit rules, and verification reminders.
3. Review how to choose a checking account across national banks, online banks, regional banks, and credit unions.

Selected: option 1.

## Trust and Verification Improvements

- Added visible research methodology blocks across priority page templates.
- Added above-the-fold verification-first language where priority templates render.
- Preserved disclosure and provider-term verification language.
- Avoided exclusive, guaranteed, urgency-driven, or affiliate-first wording.
- Added repeated reminders to verify provider terms, fees, availability, deposits, rates, and eligibility directly.

## Performance and Technical Review

- No image-heavy additions were introduced.
- New interactivity is limited to lightweight client sorting in one reusable component.
- Tables use horizontal overflow instead of compressing columns on mobile.
- No external dependencies were added.
- Existing canonical metadata remains in place.
- Local production smoke checks returned 200 for all priority and new routes.

Smoke-checked routes:

- `/best-credit-unions-florida`
- `/brokerage-bonuses`
- `/bank-bonuses`
- `/best-checking-accounts-florida`
- `/best-bank-for-checking`

Each checked route included FAQ schema, breadcrumb schema, sortable comparison content, research methodology content, and visible last-updated or last-verified language.

## Validation Results

- `npm run offers:pipeline` passed.
  - 74 offers validated.
  - 0 added, 0 removed, 0 field changes.

- `npm run intelligence:all` passed.
  - Monetization, content, link, and intelligence reports generated.

- `npm run lint` passed.

- `npm run build` passed.
  - Next.js 16.2.6 production build succeeded.
  - 554 static pages generated.

## Recommended Next Optimization Cycle

1. Re-check Search Console in 7-14 days for CTR changes on:
   - `/best-credit-unions-florida`
   - `/brokerage-bonuses`
   - `/bank-bonuses`
   - `/best-checking-accounts-florida`
   - `/best-bank-for-checking`

2. If `/best-credit-unions-florida` continues getting impressions with low CTR, test a more explicit title:
   - `Best Credit Unions in Florida (2026) | Membership, Fees, ATMs`

3. If `/brokerage-bonuses` impressions rise but CTR stays flat, test a title focused on user task:
   - `Brokerage Bonuses | Compare Current Account Promotions`

4. Expand provider-specific source coverage only where real source URLs and verified data exist.

5. Add no new keyword pages until Search Console shows another clear query cluster with impressions.
