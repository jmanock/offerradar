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

## Manual affiliate revenue import

Use `automation/revenue/sample-affiliate-revenue.csv` with this exact header:

```csv
date,network,advertiser,clicks,transactions,revenue
```

Run `npm run affiliate:revenue-import` to validate the template without writing runtime data. To import a completed network export, run:

```bash
python3 -B automation/scripts/import_affiliate_revenue.py --input /absolute/path/to/export.csv --write
```

The importer stores aggregate rows in the ignored `data/runtime/affiliate-revenue.json` file. It rejects malformed dates, nonnumeric metrics, negative values, and unexpected columns.

## Reconciliation

1. Match the export date range to the dashboard date range.
2. Compare network click totals with OfferRadar `affiliate_click` totals, allowing for blockers, redirect loss, attribution windows, and network processing delays.
3. Confirm advertiser names use a stable spelling before importing.
4. Investigate material differences instead of adjusting either source to force a match.
5. Keep the original network export outside the repository according to the owner's retention policy.
6. Never enter estimated transactions or revenue when the network report is unavailable.

## Disabled features

`lib/features.ts` keeps premium alerts, display ads, and newsletter sponsorships disabled. No empty ad containers, paid plan, or sponsorship claims render in V16. These switches are readiness markers, not launch controls by themselves; compliance and product validation are still required.

## Network reporting

The contextual network module sends `source_site`, `destination_site`, `source_page`, `destination_category`, and `link_position`. Return-visit attribution requires agreed UTM/referrer handling on both properties before activation.
