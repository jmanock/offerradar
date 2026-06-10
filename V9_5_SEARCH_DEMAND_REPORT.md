# OfferRadar V9.5 Search Demand and Authority Expansion Report

Date: 2026-06-10

## Mission

Expand topical authority around queries and pages already receiving Search
Console impressions while preserving OfferRadar's consumer-first,
research-first, and verification-first tone.

## Pages Updated

- `/brokerage-bonuses`
- `/best-brokerage-bonuses`
- `/brokerage-transfer-bonuses`
- `/best-checking-accounts-florida`
- `/provider/robinhood`
- `/provider/fidelity`
- `/provider/wells-fargo`
- `/provider/chase`
- `/provider/sofi`
- `/providers`
- `/offers`
- `/`
- Existing bank bonus, best-of, provider, and programmatic templates

## New Pages Created

- `/robinhood-transfer-bonus-guide`
- `/best-bank-bonuses-florida`
- `/best-banks-in-florida`
- `/florida-bank-bonuses`

The existing `/best-brokerage-bonuses` and `/brokerage-transfer-bonuses`
routes were upgraded rather than duplicated.

## Search Queries Targeted

- brokerage promotions
- brokerage account bonus
- brokerage transfer bonuses
- robinhood transfer bonus 2026
- florida checking account bonus
- best checking accounts florida
- best checking accounts fl
- best bank for checking
- best banks in florida
- florida bank bonuses
- wells fargo credit card

## Brokerage Authority Improvements

- Added a ranked current brokerage comparison using tracked data.
- Added a brokerage bonus comparison table showing provider, offer type,
  displayed value, transfer requirement, funding requirement, verification
  status, and last verified date.
- Added Robinhood transfer, ACAT, holding-period, and verification education.
- Added highest tracked brokerage records and popular brokerage provider links.
- Added a transfer-specific authority page and comparison table.
- Upgraded the primary best-brokerage ranking page.

## Florida Banking Authority Improvements

- Added an educational Florida checking comparison table covering Chase,
  Wells Fargo, Bank of America, Truist, Regions, Fifth Third, VyStar, and
  MIDFLORIDA without inventing product terms.
- Added Florida banking-by-city blocks for Miami, Orlando, Tampa,
  Jacksonville, and Fort Lauderdale.
- Added Florida credit union vs national bank education.
- Added checking vs savings, direct deposit, availability, and verification
  guidance.
- Added three focused Florida banking authority routes.

## Provider Authority Improvements

Priority provider pages now include:

- provider overview and account types
- tracked offer history based on existing records
- verification methodology
- related offers
- related comparisons
- related categories and guides
- provider-specific FAQ schema

Priority providers:

- Robinhood
- Fidelity
- Wells Fargo
- Chase
- SoFi

## Internal Links Added

- Connected brokerage category, ranking, transfer, Robinhood guide, provider,
  comparison, and educational guide pages.
- Connected Florida checking, bank bonus, best-bank, provider, savings,
  credit-union, and direct-deposit pages.
- Added new authority pages to priority landing-page hubs and footer research
  links.
- Added verification methodology links to major pages.

## Schema Improvements

- New authority pages include CollectionPage, BreadcrumbList, and FAQPage
  schema.
- Priority provider pages include FAQPage schema when provider-specific
  research content is available.
- Existing category, best-of, local, provider, and offer schemas were
  preserved.

## Trust And E-E-A-T Improvements

- Added reusable `How OfferRadar verifies offers` methodology component.
- Increased visibility of source review, last verified dates, editorial
  policy, disclosures, and direct provider verification.
- Tables distinguish tracked data from fields that still require provider
  confirmation.

## Future Opportunities

- Replace example-domain source URLs with reviewed official provider offer
  URLs as they are collected.
- Add city-specific banking pages only when each can provide substantial,
  useful local comparison content.
- Expand provider offer-history records when actual historical snapshots are
  available.
- Review Search Console CTR and average position after Google recrawls the
  updated authority pages.
- Expand entities such as Regions, VyStar, and MIDFLORIDA only when verified
  provider data is available.

## Validation

Required commands:

- `npm run offers:pipeline`
- `npm run intelligence:all`
- `npm run lint`
- `npm run build`

Final results are recorded after validation.

### Final Results

- `npm run offers:pipeline`: passed; 74 offers validated with no field changes.
- `npm run intelligence:all`: passed; monetization, content-gap, internal-link,
  and V7 intelligence reports regenerated.
- `npm run lint`: passed.
- `npm run build`: passed after allowing the existing Google font request;
  535 routes generated.
- Sitemap review confirmed each new and upgraded authority route appears once.
- Rendered HTML review confirmed FAQ schema, breadcrumb schema, verification
  methodology, brokerage comparison content, Florida comparison content, and
  tracked-history sections on the priority provider pages.
