# OfferRadar V16 Affiliate Verification and Revenue Report

Date: 2026-07-22

## Executive Summary

V16 audited and tightened the existing affiliate foundation. Affiliate URLs remain centralized, public rendering now requires an approved active status plus route and runtime validation, placements are tracked in a machine-readable CSV, and pending campaigns do not fall back to public official links. The travel cluster now has complete checklist and World Cup finance research, while banking winner pages remain free of unrelated partner placements.

## Existing Implementation Audit

- Searched the repository for `awin1.com`, `awclick.php`, `awinaffid`, `affiliateUrl`, and `sponsored`.
- The generated affiliate audit documents every source and documentation location found.
- All raw AWIN click URLs remain in `data/affiliateRegistry.json`; none are hardcoded in public page components.
- The separate provider monetization registry retains empty `affiliateUrl` fields for backward-compatible provider approval workflows.
- Affiliate links use `sponsored nofollow noopener noreferrer`; official fallback links are distinctly labeled and do not use `sponsored`.
- Route restrictions, disclosure metadata, exact AWIN parameters, active status, approval status, and URL structure are validated before an affiliate URL can render.
- Pending or disabled entries return no public CTA. An official fallback is available only for an otherwise approved, active placement whose affiliate URL fails validation.

## Registry Status

### Active

| Affiliate | Exact public pages |
| --- | --- |
| HelloSafe travel insurance | `/travel`, `/tools`, `/research/travel-insurance-comparison`, `/research/travel-money-checklist`, `/research/world-cup-travel-finance-guide` |
| HelloSafe card coverage checker | `/travel`, `/tools`, `/research/credit-card-travel-insurance`, `/research/travel-money-checklist`, `/research/world-cup-travel-finance-guide` |
| eSimShop | `/travel`, `/tools`, `/research/esim-international-travel`, `/research/travel-money-checklist`, `/research/world-cup-travel-finance-guide` |
| Kitco | `/tools`, `/research/gold-price-tracking-guide` |

### Pending

`unest-app` is `pending-review` and `approved: false`. Its official product and U.S. account requirements were reviewed, but authenticated AWIN campaign approval and mobile placement checks remain unresolved. It has no public CTA and its former public research article was removed from the route collection and sitemap.

### Disabled or Expired

No entries are currently marked disabled or expired. The Unest placement-map row is disabled while the registry entry remains pending.

## Verification and Placement Records

- `data/affiliateVerification.csv` records tested date, redirect result, mobile-check state, target country, factual description, status, and notes.
- `data/affiliatePlacementMap.csv` contains 18 active or pending placement rows.
- The audit flags missing registry records, active placements using pending entries, prohibited routes, entries without placements, and placement routes not permitted by the registry.
- Mobile destination checks remain `unknown` until physical-device testing is completed; they are not guessed from a successful desktop redirect.

## Content and Hub Improvements

- Added `/research/travel-money-checklist` with foreign transaction fees, ATM fees, fraud controls, backup payments, insurance, card coverage, eSIM preparation, and emergency cash.
- Added `/research/world-cup-travel-finance-guide` with cards, ATM access, international fees, insurance research, connectivity, fraud protection, and contextual Florida travel-network links.
- Strengthened `/travel` with direct paths to both new guides.
- Strengthened partner cards with category labels, a visitor action description, research links, per-card disclosure, and review dates.
- `/tools` now separates OfferRadar tools from active travel and market resources. Unest does not render while pending.
- `/offers` now includes a `Needs review` filter alongside affiliate, official, research, and recently verified states. Affiliate compensation does not affect ordering.

## Search Winner Support

- Added stronger research, calculator, and offer-hub links to `/best-bank-bonuses-florida`, `/bank-bonuses-promotions-florida`, `/checking-account-bonuses-florida`, and `/best-checking-accounts-florida`.
- Improved `/ohio-bank-bonuses` and `/colorado-bank-bonuses` with unique access considerations, local-vs-national research paths, verification questions, and related research.
- Existing provider badges and offer cards continue to supply stable visuals on banking, referral, comparison, and state pages.
- No travel-insurance, eSIM, Kitco, or Unest placement was added to a banking, state, referral, or brokerage page.

## Visual Assets and Fallbacks

No third-party logo was added without documented permission. `public/partners/ASSET_SOURCES.md` records that all current partner cards use fixed-size OfferRadar text badges with accessible labels. Reserved partner directories are ready for locally stored, approved assets later.

## Analytics and Revenue Reporting

- Verified `affiliate_click`, `official_provider_click`, `partner_tool_click`, and `network_outbound_click` event paths.
- Affiliate events include affiliate ID, advertiser, network, category, source page, placement, link text, click reference, destination type, and link type without personal data.
- One affiliate partner-tool action emits one affiliate event and one separate partner-tool event. It does not emit duplicate affiliate events.
- `/ops/revenue` remains private and `noindex, nofollow`.
- The dashboard now shows explicit no-data states, imported network clicks, source landing pages, manual import status, and reconciliation guidance in addition to advertiser, placement, CTR, transaction, revenue, earnings-per-session, and revenue-per-click metrics.
- The CSV importer rejects malformed or invented data and writes only to ignored runtime storage when `--write` is explicitly supplied.

## Affiliate Audit

`automation/scripts/audit_affiliate_links.py` now checks duplicate IDs, missing URLs, exact AWIN parameters, missing click references, status controls, placement-map integrity, prohibited routes, disclosure and analytics integration, raw links outside the registry, official fallbacks, destination reachability, and unexpected final hosts.

Current result: `PASS-WITH-REVIEW`. The only expected finding is the intentionally pending Unest campaign. A temporary HTTP failure can create a review finding but never disables a link automatically.

## Network Plan

`docs/NETWORK_TRAFFIC_PLAN.md` now records source site, source page, destination, destination page, reason, anchor, event, and placement type for current OfferRadar links and future reciprocal opportunities. No footer-wide exchange was added.

## Validation Results

- `npm run affiliate:audit`: PASS-WITH-REVIEW, 5 entries, 18 placements, 1 expected pending finding
- `npm run affiliate:revenue-import`: PASS, sample import validated as an explicit zero-row dry run
- `npm run offers:pipeline`: PASS, 74 offers validated with no detected changes
- `npm run intelligence:all`: PASS, including monetization, content-gap, internal-link, and report generation
- `npm run lint`: PASS
- `npm run build`: PASS, 595 generated static pages
- `npm run indexnow:dry`: PASS, 25 priority URLs selected without submission
- Rendered desktop QA at 1280 x 720: PASS for `/travel`, `/tools`, both new travel guides, the Kitco guide, `/offers`, banking and brokerage hubs, the removed Unest route, and `/ops/revenue`
- Rendered mobile QA at 390 x 844: PASS for `/travel`, `/tools`, both new travel guides, and `/offers`; no horizontal overflow was detected and the accessible menu opened with `aria-expanded="true"`
- Public affiliate rendering: PASS; active AWIN links use `sponsored nofollow noopener noreferrer`, route-specific sanitized `clickref` values, accessible external-resource labels, and nearby disclosure language
- Pending-state rendering: PASS; Unest does not appear on public tools, travel, research, banking, brokerage, or offer routes, and `/research/family-investing-apps` returns the noindex 404 page
- Route boundaries: PASS; `/bank-bonuses`, `/brokerage-bonuses`, and `/offers` render no AWIN links
- Sitemap and robots: PASS; the sitemap includes the new travel guides and excludes the removed Unest article and private revenue dashboard; robots references the production sitemap
- Verification and analytics: PASS; production HTML contains GA4 `G-M5706CBZ5M`, Clarity `x29lg7gz7q`, and Bing verification, while the existing Google Search Console verification file remains publicly served
- IndexNow: PASS; the public key file matches the configured key and dry-run reporting completes without submission
- Revenue controls: PASS; `/ops/revenue` renders the locked private state with `noindex, nofollow` and no invented performance values
- Browser console: PASS; no runtime errors were recorded during route and mobile checks

## Unresolved Manual Tasks

1. Verify all four active campaign states and traffic-source rules inside the authenticated AWIN account.
2. Test advertiser destinations on physical iOS and Android devices.
3. Confirm Unest campaign approval and permitted placements before changing its status.
4. Collect advertiser-supplied image files and usage terms before replacing text badges.
5. Import a real affiliate-network CSV only after transactions or revenue are available.

## Recommended Next Program Research

Prioritize official programs that match existing search intent: approved bank or brokerage providers already present in the provider registry, international ATM or travel-fee resources, and well-documented travel-card research tools. Do not add a program until its destination, audience, approval state, route relevance, disclosure requirements, and traffic restrictions are verified.
