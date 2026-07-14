# V15 tracking architecture

## Current capabilities

- Structured offer records are statically loaded from the existing normalized offer data.
- `/offer-tracker` renders crawlable server HTML, then adds client-side filtering, sorting, analytics, and save actions.
- `/watchlist` stores offer IDs, optional target values, optional notes, and save timestamps in browser `localStorage` under `offerradar-watchlist-v1`.
- `/recently-changed-offers` presents real review activity and only uses increase/decrease/new language when a stored observation supports it.
- `/offer-history` exposes current observations without manufacturing prior values.

## Data model

The existing `Offer` model supplies stable `slug` IDs, provider, category, amount, offer type, requirements, source fields, last verification, verification status, current status, optional `lastChanged`, and optional `changeSummary`.

The history-ready model is:

```text
offerId, provider, category, observedValue, previousObservedValue,
dateObserved, firstSeen, lastVerified, status, sourceUrl, notes, changeType
```

Valid future `changeType` values are `new`, `increased`, `decreased`, `unchanged`, `expired`, `reactivated`, and `needs-review`. Values must come from retained snapshots or reviewed editorial input.

## Public routes

- Discovery: `/`, `/offers`, `/money`, `/travel`, `/florida`
- Tracking: `/offer-tracker`, `/watchlist`, `/offer-history`, `/recently-changed-offers`
- Understanding: `/research` and `/research/[slug]`
- Existing offer, category, provider, comparison, guide, authority, state, and local SEO URLs are preserved.

## Automation integration

`automation/scripts/run_offer_pipeline.py` normalizes and validates source records, compares snapshots, and produces reports. The public feed must consume only reviewed output. Stable offer slugs are watchlist-ready IDs. Category mappings remain the canonical `OfferCategory` union.

The current `latest-offer-changes.json` reports zero additions, removals, or field changes. V15 therefore shows recent review and freshness statuses, not fabricated value movement.

## Future account and alerts approach

A future authenticated service can migrate local records after explicit consent and add target-value, change, email, or browser-notification subscriptions. It should use a server-side subscription ID, verified consent timestamp, delivery preferences, unsubscribe state, and minimal offer IDs. Notes should remain local by default and never be copied silently.

## Privacy considerations

- No account is required in V15.
- Notes and targets remain on the device and are not sent to analytics.
- Clearing browser storage removes the watchlist.
- Local records do not sync between browsers or devices.
- V15 does not claim active alerts or collect alert emails.
