# OfferRadar Affiliate Growth Report

Date: 2026-07-22

## Executive Summary

This release adds a controlled affiliate layer without changing OfferRadar's research-first positioning or allowing compensation to determine offer ordering. Affiliate URLs are stored in one validated registry, restricted by route, disclosed near every placement, and measured through existing GA4 and first-party event paths. An official destination is used as a fallback when an approved affiliate campaign is unavailable; otherwise no call to action renders.

## Affiliate Registry

Created `data/affiliateRegistry.json`, typed through `data/affiliateLinks.ts` and guarded by `lib/affiliateLinks.ts`.

Approved active entries:

- HelloSafe travel-insurance comparator
- HelloSafe credit-card insurance checker
- eSimShop
- Kitco
- Unest

No entries are disabled or pending. The Unest destination, current family-investing product, and U.S. eligibility were reviewed before publication. Its public copy still requires readers to verify account structure, fees, eligibility, and investment risk.

All supplied `gid`, `mid`, `awinaffid`, and `linkid` values remain unchanged. `clickref` is generated as `offerradar-{page}-{placement}` and sanitized before rendering.

## Public Placements

| Partner | Pages |
| --- | --- |
| HelloSafe travel insurance | `/travel`, `/tools`, `/research/travel-insurance-comparison` |
| HelloSafe card checker | `/travel`, `/tools`, `/research/credit-card-travel-insurance` |
| eSimShop | `/travel`, `/tools`, `/research/esim-international-travel` |
| Kitco | `/tools`, `/research/gold-price-tracking-guide` |
| Unest | `/tools`, `/research/family-investing-apps` |

No affiliate tools were added to unrelated checking, credit-union, bank-bonus, referral, or brokerage pages. The reusable `FeaturedPartnerOffers` component describes placements as external research tools rather than ranked offers.

## Content and Hubs

Created five substantive research articles:

- How to Compare Travel Insurance Before a Trip
- Does Your Credit Card Include Travel Insurance?
- How to Compare eSIM Options for International Travel
- How to Follow Gold and Precious-Metal Prices
- How to Compare Family Investing Apps

Created `/tools` with separate OfferRadar-owned and external-resource sections. Expanded `/travel` with insurance, card coverage, connectivity, travel-money, World Cup, and contextual Florida Deals Network paths. Expanded `/offers` with search, category, state, verification, and source-status filters while retaining editorial order.

## State and Checking Authority

Improved Texas, Georgia, North Carolina, Pennsylvania, Arizona, Michigan, and Virginia state pages with state-relevant research starting points, eligibility cautions, branch and ATM considerations, unique FAQs, and a visible 2026-07-22 review date. Institution references are not rankings or claims of a current promotion.

Selected `/best-banks-for-checking` as the primary national checking pillar. `/best-bank-for-checking` remains live but now canonicals and visibly points to the primary pillar. Florida checking, checking-bonus, and bank-bonus pages retain distinct intent. Public hub links now favor the primary pillar; no redirects were applied.

## Visual and Trust Improvements

- Reused local category artwork and provider text badges with accessible labels and stable dimensions.
- Added contextual partner cards instead of a site-wide logo wall.
- Added compensation disclosures beside every affiliate section and article placement.
- Clarified that not all providers compensate OfferRadar and compensation does not automatically determine rankings.
- Kept official-source links distinct from compensated links.

## Analytics and Revenue Operations

Added `affiliate_click`, `official_provider_click`, and `partner_tool_click` while preserving `network_outbound_click` and the legacy official-source event. Affiliate events carry registry ID, advertiser, network, category, source page, placement, link text, click reference, and destination type without personal data.

Created private noindex `/ops/revenue` with affiliate clicks by advertiser, page, and placement; official and partner-tool click totals; affiliate CTR; and optional imported conversion metrics. Created a strict manual CSV format at `automation/revenue/sample-affiliate-revenue.csv` and importer script. No revenue or conversion values are invented.

## Audit and Network Links

Created `automation/scripts/audit_affiliate_links.py` and the `affiliate:audit` npm script. The audit validates registry IDs, exact AWIN parameters, active/approved controls, route conflicts, disclosure configuration, uncontrolled hardcoded URLs, and live destination redirects. Temporary HTTP failures are reported for review and never disable a link automatically.

Added contextual, tracked travel links to active Florida Flight Deals, Florida Hotel Deals, Florida Cruise Deals, and Florida Local Deals properties. No footer-wide reciprocal exchange was added.

## Validation Results

- Affiliate registry audit: PASS, 5 entries, 0 findings
- Manual revenue sample import: PASS, 0 data rows, dry run
- `npm run offers:pipeline`: PASS, 74 offers validated, 0 changes
- `npm run intelligence:all`: PASS, monetization/content/internal-link reports regenerated
- `npm run lint`: PASS
- `npm run build`: PASS, 594 generated pages/routes in the build
- Mobile and rendered-page review: PASS at 390px and desktop; no horizontal overflow or console errors
- Affiliate placement rendering: PASS, required `rel` attributes and sanitized `clickref` values confirmed
- Route restrictions: PASS, no affiliate URL rendered on `/bank-bonuses`
- Sitemap: PASS, `/tools` and new research included; `/ops/revenue` excluded
- Private indexing controls: PASS, `/ops/revenue` renders `noindex, nofollow`

## Recommended Next Partners

Future reviews should prioritize partners that match demonstrated research intent: official bank and brokerage offer programs already represented in the provider registry, travel-fee or international-ATM tools, and clearly documented savings or family-finance products. A partner should be added only after destination, audience, terms, approval status, route relevance, and disclosure needs are verified.
