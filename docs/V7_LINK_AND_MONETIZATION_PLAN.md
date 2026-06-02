# V7 Link And Monetization Plan

## Purpose

This plan tells Jon how to turn the V7 registry into real monetized links
without inventing URLs, scraping providers, or publishing unreviewed links.

## Where To Paste Links

Use:

```text
data/linkRegistry.json
```

For each provider:

- Paste real referral links into `referralUrl`.
- Paste approved affiliate links into `affiliateUrl`.
- Paste the affiliate platform name into `affiliateNetwork`.
- Paste reviewed provider offer pages into `officialOfferUrl`.
- Change `linkStatus` to `ready` only when a real reviewed URL is available.
- Update `userActionNeeded`, `notes`, and `lastReviewed`.

## First Referral Targets

Collect these manually from Jon's real provider accounts or app dashboards:

1. Robinhood
2. Webull
3. Public
4. Moomoo
5. Acorns
6. Stash
7. Rakuten
8. Upside
9. Chime
10. Current
11. SoFi, if a real referral link is available

Do not publish any referral link until the visible provider/app terms are
reviewed and the link is pasted into the registry by hand.

## Affiliate Network Targets

Apply to or review approval status in:

- Impact
- CJ
- FlexOffers
- Rakuten Advertising
- PartnerStack
- Awin, if applicable

Priority providers for affiliate approval:

- Chase
- SoFi
- Capital One
- Wells Fargo
- Citi
- Bank of America
- Fidelity
- Schwab
- Discover
- Ally

## Official URLs To Collect

Collect official offer URLs for critical/high providers first:

- Chase
- SoFi
- Capital One
- Wells Fargo
- Citi
- Bank of America
- Fidelity
- Schwab
- Robinhood
- Webull
- Rakuten
- PNC
- Truist
- E*TRADE
- Merrill Edge

Use only provider-owned public offer pages. If the URL is not clearly official,
leave `officialOfferUrl` empty.

## Running Intelligence Reports

Run the full V7 workflow:

```bash
npm run intelligence:all
```

Run individual steps:

```bash
npm run intelligence:monetization
npm run intelligence:content
npm run intelligence:links
npm run intelligence:report
```

After link edits, also run:

```bash
npm run lint
npm run build
```

## Reading Dashboards

Manual internal pages:

- `/ops`
- `/ops/monetization`
- `/ops/content-gaps`

These are noindex planning pages. Do not add them to the public header, footer,
or sitemap.

## Generated Report Files

Reports are generated under:

```text
automation/reports/
```

If generated report files ever create server pull conflicts, keep the committed
baseline reports and document the conflict before changing ignore rules. Do not
blindly delete report files that are used for build-time ops dashboards.

## Connection To V8 Real Offer Ingestion

V8 can use the registry as a reviewed link source:

1. Confirm official provider offer URLs.
2. Add real referral or affiliate links.
3. Mark reviewed providers `ready`.
4. Let offer ingestion associate offers with safe registry links.
5. Keep public rendering restricted to `ready` monetized links or reviewed
   official offer URLs.

This keeps monetization and offer ingestion separate, reviewable, and safer.
