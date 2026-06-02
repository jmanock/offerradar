# OfferRadar V7 Link Registry Plan

## Goal

Create a structured, reviewable registry for official provider websites, official
offer URLs, referral links, affiliate links, affiliate network status, and
monetization priority.

V7 is a foundation only. It does not publish empty links, invent referral URLs,
invent affiliate URLs, scrape providers, log into accounts, call external APIs,
or deploy anything.

## Files

- `data/linkRegistry.json` is the editable registry source.
- `data/linkRegistry.ts` provides typed helper functions for future app or
  automation use.

## Current Status Rules

- `official_only`: official provider or offer URL is available, but no
  monetized link is expected yet.
- `needs_referral`: Jon needs to manually collect a real referral link from the
  provider account or app.
- `needs_affiliate_approval`: Jon needs to confirm affiliate program approval
  before any affiliate URL can be added.
- `ready`: a reviewed official, referral, or affiliate URL is ready for future
  public use.
- `unknown`: provider status needs research before choosing another state.

## Manual Collection Workflow For Tomorrow

1. Open `data/linkRegistry.json`.
2. Work provider by provider by monetization priority.
3. For referral apps, log into the provider account manually and copy Jon's real
   referral URL into `referralUrl`.
4. For banks, brokerages, and card providers, confirm affiliate network approval
   manually before adding `affiliateUrl` or `affiliateNetwork`.
5. Add official offer pages to `officialOfferUrl` only when the page is clearly
   the provider's own current offer page.
6. Update `notes` with the review outcome.
7. Update `lastReviewed`.
8. Change `linkStatus` to `ready` only when a real, reviewed URL exists.
9. Run `npm run lint` and `npm run build`.

## Providers Needing Referral Collection

- Robinhood
- Webull
- Public
- Moomoo
- Acorns
- Stash
- Rakuten
- Upside
- Chime
- Current

## Providers Needing Affiliate Approval

- Chase
- SoFi
- Capital One
- Discover
- Ally
- Wells Fargo
- Citi
- Bank of America
- Fidelity
- Schwab

## Publishing Safety

- Do not expose `referralUrl` or `affiliateUrl` publicly until the registry
  record is marked `ready`.
- Do not use empty strings as public outbound links.
- Do not convert official homepages into affiliate links.
- Do not add URL parameters unless they come from a real approved affiliate or
  referral source.
- Keep disclosure language visible anywhere monetized links appear later.

## Future Integration

When V7 links are reviewed, future work can connect ready registry records to:

- Offer detail page outbound buttons.
- Provider pages.
- Comparison pages.
- Analytics events for outbound clicks.
- Automation reports that flag missing referral or affiliate approvals.

The first public integration should use `getReadyLinks()` or a provider-specific
lookup that checks `linkStatus === "ready"` before rendering any monetized URL.
