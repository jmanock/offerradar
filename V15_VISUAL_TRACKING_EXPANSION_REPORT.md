# OfferRadar V15 — Visual Tracking Expansion Report

Date: July 14, 2026

## Outcome

V15 expands the existing banking SEO foundation into a visual discovery and local-tracking product. Existing routes, metadata patterns, analytics integrations, verification files, offer data, automation scripts, and dynamic route families remain intact. No deployment was performed.

## Design changes

- Reframed the homepage around “Find offers. Track changes. Know when a deal is worth it.”
- Added a visual six-path discovery grid for Money, Travel, Shopping, Research, Florida, and Comparisons.
- Added original lightweight category artwork and fixed-size provider badges.
- Replaced unsupported “popular” and “trending” claims with editorially accurate “featured” labels.
- Simplified navigation to Explore, Track, Compare, Research, Florida, and About.
- Reduced the footer to focused discovery, tracking, research, and trust groups.
- Added responsive focus states, fixed visual dimensions, and reduced-motion-safe hover behavior.

## Logos and visual assets

No official logo licenses or local official brand files were available in the repository. V15 uses deterministic text/initial provider badges instead. They identify providers without implying partnership or endorsement. No images are scraped, hotlinked, or loaded from third parties. See `docs/V15_ASSET_MANIFEST.md`.

## Homepage

- Stronger product hero with Explore, Track, and Recent Changes actions.
- Live counts and current last-reviewed data preserved in the radar panel.
- Visual discovery cards, provider badges, real review activity, featured research cards, and tracking actions added.
- Existing high-value banking, Florida, provider, comparison, guide, methodology, and disclosure modules remain linked.

## Tracking and watchlist

- `/offer-tracker` remains server-rendered/static for crawlability and now supports category, provider, current status, offer type, verification freshness, amount, and availability filters.
- Sorting supports recent review, largest parsed value, provider name, and recorded change date.
- Offer cards expose provider badges, details, and local save actions.
- `/watchlist` stores offer ID, saved timestamp, optional target, and optional note in browser local storage.
- Watchlists persist across page reloads on the same browser/device. No account, sync, email alert, or notification claim is made.

## Offer history and recently changed feed

- The history-ready record includes offer ID, provider, category, observed value, optional prior value, observation dates, verification date, current status, source, notes, and controlled change type.
- `/offer-history` explicitly states when historical observations are insufficient.
- `/recently-changed-offers` shows genuine review activity and needs-review/expired states.
- The July 14 pipeline detected 0 additions, 0 removals, and 0 field changes; V15 therefore makes no new/increased/decreased claims.

## Research articles

Created a `/research` library and ten statically generated articles:

1. How to Tell Whether a Bank Bonus Is Worth It
2. Bank Bonus Requirements People Commonly Miss
3. Brokerage Transfer Bonuses Explained
4. Bank Bonus Taxes: What to Research Before Applying
5. Checking Account Fees That Can Erase a Signup Bonus
6. Credit Unions vs Banks in Florida
7. How OfferRadar Tracks and Verifies Offers
8. When to Wait for a Better Offer
9. How Long Bank and Brokerage Bonuses Usually Take
10. How to Compare an Offer Without Being Misled by the Headline Amount

Each article includes editorial attribution, updated date, reading time, key takeaway, checklist sections, related actions, Article schema, breadcrumb schema, and professional-advice guardrails.

## Category architecture

- `/money`: banking, savings, credit unions, brokerage, referrals, calculators, comparison, and tracking.
- `/florida`: preserves and connects existing Florida checking, credit-union, bonus, travel, and research paths.
- `/travel`: a useful curated gateway to existing travel-fee, travel-card, World Cup, Florida, and banking content.
- Shopping links to the existing live cash-back collection.
- No empty Software or standalone Shopping hub was launched.

## Linking and network

New routes connect the homepage, tracker, watchlist, change feed, history, research, priority banking pages, providers, comparisons, and tools. External provider behavior remains controlled by the reviewed link registry.

No verified Florida Deals Network domain inventory exists in the repository, so V15 deliberately ships no speculative network links. `docs/V15_NETWORK_LINKING_PLAN.md` defines destination verification, analytics, contextual placement, reciprocal-link guidance, and link-health checks.

## Analytics

Implemented or wired `offer_card_click`, `outbound_offer_click`, `affiliate_click`, `official_source_click`, `save_to_watchlist`, `remove_from_watchlist`, `filter_used`, and `article_click`. Future network events and reserved workflow events are documented in `docs/ANALYTICS_EVENTS.md`. Notes and target values are never sent.

Existing GA (`G-M5706CBZ5M`) and Clarity (`x29lg7gz7q`) markers were confirmed in rendered output. Bing and Google public verification files both returned HTTP 200.

## Structured data and SEO

- Preserved global WebSite and Organization schema.
- Added CollectionPage/ItemList data to discovery, tracker, feed, and research hubs.
- Added Article and BreadcrumbList data to all ten new articles.
- Added appropriate WebApplication data to tracker/watchlist product surfaces.
- Added all V15 public routes to the sitemap; robots output remains available.
- Existing static and dynamic SEO route families continue to build.

## Validation and performance

- `npm run offers:pipeline`: passed, 74 offers validated, 0 detected changes.
- `npm run intelligence:all`: passed; refreshed monetization, content, link, and intelligence reports.
- `npm run lint`: passed with no warnings.
- `npm run build`: passed on Next.js 16.2.6; 575 static pages generated.
- Production build compiled in approximately 2.1 seconds; static generation completed in approximately 1.1 seconds on the local environment.
- Browser QA: desktop 1440×900 and mobile 390×844.
- Homepage, tracker, watchlist, change feed, history, research, Money, Travel, Florida, and priority banking routes showed no horizontal overflow at 390px.
- Provider badges expose meaningful accessible labels; rendered pages reported no missing `img` alt attributes.
- Tracker category filtering returned the expected 22 bank-bonus records.
- Save, target, and note state persisted through watchlist navigation and reload.
- No browser console warnings or errors appeared during the checked V15 routes.
- Sitemap, robots, GA, Clarity, Bing verification, Google verification, and 16 priority/new pages returned HTTP 200.

## Remaining issues

- Official provider logos require an approved asset/licensing inventory before replacing text badges.
- The current snapshots do not contain enough retained observations for real trend graphs or most previous-value comparisons.
- Florida Deals Network destinations require verified live domains and ownership before links can launch.
- Target/email/browser alerts need a consented server-side subscription and delivery system.
- Popularity and “most compared” modules need reliable analytics aggregation before making public claims.
- No dedicated Open Graph image generator was added; existing metadata remains intact.

## Proposed V16 roadmap

1. Retain versioned snapshots and publish reviewed field-level timelines.
2. Add approved local logo assets with source/license metadata and resilient fallbacks.
3. Verify and launch a small contextual Florida Deals Network module with link-health monitoring.
4. Add privacy-reviewed account migration and opt-in target/change alerts.
5. Aggregate anonymized comparison engagement for evidence-based “most compared” modules.
6. Add reusable generated Open Graph cards for category, comparison, and research pages.
7. Add automated browser regression coverage for filters, watchlist storage, metadata, and mobile overflow.
