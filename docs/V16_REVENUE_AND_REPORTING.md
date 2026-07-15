# V16 revenue and reporting foundation

## First-party reporting

When both analytics flags are enabled, the browser sends a small allowlisted event to `/api/events`. The server records aggregate totals for source class, page, event, and new/return state. It does not store full referrers, emails, notes, targets, or visitor IDs.

The credential-gated `/ops/analytics` dashboard separates search, direct, offer detail, official-provider, affiliate, watchlist, alert, returning, and network activity. GA and Clarity remain intact.

## Relationship labels

Offer details distinguish:

- Official source
- Tracked affiliate/referral link with compensation disclosure
- Sponsored placement (supported by the component, unused today)
- Research record only

Ready affiliate/referral clicks are reported separately from official source clicks. Monetized registry entries must have ready approval state and disclosure notes.

## Disabled features

`lib/features.ts` keeps premium alerts, display ads, and newsletter sponsorships disabled. No empty ad containers, paid plan, or sponsorship claims render in V16. These switches are readiness markers, not launch controls by themselves; compliance and product validation are still required.

## Network reporting

The contextual network module sends `source_site`, `destination_site`, `source_page`, `destination_category`, and `link_position`. Return-visit attribution requires agreed UTM/referrer handling on both properties before activation.
