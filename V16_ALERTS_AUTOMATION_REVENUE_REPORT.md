# OfferRadar V16 — Alerts, Automation & Revenue Foundation

Date: July 15, 2026

## Outcome

V16 implements the reviewed return loop around V15:

```text
discover → save/follow → detect → review → approve → publish → alert → return
```

No detected financial change can publish or trigger an alert without explicit editorial approval. No deployment was performed, and production email/analytics remain disabled by default until environment credentials and privacy review are complete.

## Real alert foundation

- Added offer, provider, and all-feed following.
- Supports optional numeric targets, immediate or weekly frequency, and selectable new/increased/decreased/terms/expired/reactivated/needs-review triggers.
- Uses email magic-link confirmation; there are no passwords or user profiles.
- Magic tokens are random and stored only as SHA-256 hashes.
- Management links pause, resume, or unsubscribe.
- Failed confirmation-email delivery rolls back the pending record.
- Hashed email/IP rate limiting allows five confirmation requests per hour.
- Resend delivery is implemented; local `log` mode writes only to ignored runtime test storage.
- Weekly delivery is protected by `CRON_SECRET` and uses idempotency keys.

## Daily ingestion and review queue

- Existing snapshot comparison now writes deduplicated candidates to `automation/queue/pending-changes.json`.
- Candidates include provider, title, offer ID, category, field, old/new values, source, detection time, confidence, proposed status, and review state.
- Added credential-gated `/ops/changes` with pending/research/approved/rejected counts, old-versus-new panels, source details, public preview, and approve/reject/research actions.
- Approval writes `data/approvedChanges.json`, updates public history, and dispatches eligible immediate alerts.
- Rejection and research states remain private.

The July 15 pipeline found zero additions, removals, or field changes, so the committed queue and approved-change file remain empty.

## Data-quality safeguards

Approval blocks publication when provider or source is missing, dates are invalid, values are malformed, an increase/decrease lacks a prior observation, values do not differ, or expired/reactivated statuses conflict.

`npm run v16:validate` independently checks committed approved history and monetized-link readiness/disclosure notes. Legacy public data remains intact; V16 applies the strict boundary to new approved observations rather than silently rewriting existing records.

## Recently changed product

- Rebuilt `/recently-changed-offers` as a dynamic reviewed feed.
- Filters: Today, This week, Increased, Decreased, New, Expired, Reactivated, and Recently verified.
- Added provider badges, change arrows, old/current value panels, concise review summaries, and a truthful empty state.
- Public counters explicitly show approved changes, recent reviews, and zero auto-published changes.
- Added an alert-follow module to the feed.

## Provider and offer following

- Provider pages now have branded initial headers, provider-follow forms, current tracked offers, official source links, comparisons, research paths, and approved-history panels.
- Offer pages now have offer-specific alerts, target support, relationship labels, and approved-history charts.
- Charts require two approved numeric observations and otherwise show an explicit no-trend illustration.

## Weekly digest

- Added `npm run weekly:generate` and `/weekly/YYYY-MM-DD`.
- Generated `/weekly/2026-07-15` from current records and approved data.
- Sections cover approved increases, newly approved offers, expiring offers, needs verification, most watched providers, most compared providers, and new research.
- Empty evidence remains visibly empty rather than becoming manufactured news.
- The weekly hub links to the latest dated digest.

## Cross-category and network discipline

V16 did not launch thin collections. Florida travel lacks a verified offer feed; the only software-tagged legacy record lacks a verified source; internet/mobile/streaming has no qualifying records. The automation runbook records these launch decisions.

An analytics-ready contextual network component and typed destination registry were added. The registry remains empty until live domains, ownership, usefulness, canonical behavior, and reciprocal context are verified.

## Visual upgrades

- Change-direction arrows and status colors.
- Approved-history SVG mini charts with evidence-based empty states.
- Provider-branded headers and follow modules.
- Alert empty/loading states.
- Generated 1200×630 global Open Graph image with no external assets or dynamic font dependency.
- Existing V15 category artwork and provider badges remain reused.

## First-party reporting

Added an optional aggregate first-party endpoint and credential-gated `/ops/analytics` dashboard. It separates search/direct visits, offer details, official clicks, affiliate clicks, watchlist saves, alert subscriptions, return-state visits, and network referrals. Comparison dimensions can generate “most compared provider” counts.

No full referrer, email, note, target value, or persistent visitor identifier is recorded. The endpoint uses an event allowlist and remains disabled by default.

## Monetization readiness

- Offer details distinguish official source, tracked affiliate/referral link, sponsored placement support, and research-only records.
- Referral clicks are classified with affiliate clicks and show compensation disclosure.
- Premium alerts, display ads, and newsletter sponsorship flags exist but remain disabled.
- No paid plan, live sponsored offer, ad unit, or newsletter sponsorship was launched.

## Validation

- `npm run v16:daily`: passed; 74 offers normalized and validated, zero detected changes.
- `npm run intelligence:all`: passed and refreshed all intelligence reports.
- `npm run v16:weekly`: passed and generated the July 15 digest.
- `npm run v16:validate`: passed.
- `npm run lint`: passed with no warnings.
- `npm run build`: passed on Next.js 16.2.6; 587 pages generated with no build warnings after social-card correction.
- Magic-link API: availability, pending creation, email outbox, confirmation redirect, pause, resume, and unsubscribe verified.
- Stored test subscription retained only a token hash; target parsing verified.
- Ops API: unauthorized, incorrect key, successful login/cookie, and authenticated queue read verified.
- Invalid approval with a missing source returned HTTP 422 and did not publish.
- Weekly endpoint rejected missing authorization and accepted the correct cron secret.
- First-party endpoint counted an allowed Bing/returning offer-detail event and ignored a non-allowlisted event.
- Browser QA at 1440×900 and 390×844 covered alerts, change feed, provider, offer detail, history, dated weekly digest, and ops queue.
- No horizontal overflow, missing image alt attributes, or browser console warnings/errors were found.
- Change feed filter and ops unlock interactions passed.
- Runtime QA email/subscription/analytics files were removed after testing.

## Production configuration required

Before enabling alerts, configure the values documented in `.env.example`, verify the sender domain, set the live site origin, create strong ops/cron secrets, confirm privacy/retention language, schedule daily/weekly jobs, and ensure the single-process persistent data directory is backed up.

The JSON runtime store is appropriate for the current self-hosted single-process foundation. Migrate subscriptions, rate limits, analytics, and idempotency to a transactional database or managed KV store before horizontal or multi-region scaling.

## Proposed V17

1. Move runtime state to encrypted transactional storage with data deletion tooling.
2. Add signed, expiring magic sessions and email-change verification.
3. Connect the external intelligence server to the queue through an authenticated ingestion API.
4. Retain enough approved observations for real per-offer/provider charts.
5. Add delivery retry/dead-letter processing and alert health reporting.
6. Verify real network domains and launch one contextual Florida experiment.
7. Replace legacy placeholder sources through a reviewed source-quality cleanup.
