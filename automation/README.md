# OfferRadar V5 Automation Foundation

OfferRadar V5 moves offer records toward JSON-driven data while keeping the
public Next.js site static and safe. This foundation does not scrape websites,
call external APIs, store credentials, push to GitHub, or deploy by default.

## Source Of Truth

- Reviewed manual input lives in `automation/sources/manual-offers.json`.
- The generated public data file is `data/offers.json`.
- The app reads `data/offers.json` through `lib/offerData.ts`, so existing pages
  keep receiving typed `Offer` objects.
- `data/offers.ts` still contains category metadata and remains in place so the
  current site structure is preserved.

## Local Commands

Run the full local pipeline:

```bash
npm run offers:pipeline
```

Run individual steps:

```bash
npm run offers:normalize
npm run offers:validate
npm run offers:changes
npm run offers:report
```

Direct script usage is dry-run unless `--write` is passed:

```bash
python3 automation/scripts/run_offer_pipeline.py
python3 automation/scripts/run_offer_pipeline.py --write
```

## Adding Manual Offers

1. Add or update records in `automation/sources/manual-offers.json`.
2. Use cautious offer language: terms may change, verify with the provider, and
   do not guarantee availability, eligibility, rates, approvals, or payouts.
3. Run `npm run offers:pipeline`.
4. Review `automation/reports/latest-offer-report.md` and
   `automation/reports/latest-offer-changes.json`.
5. Run `npm run lint` and `npm run build` before launch or deployment work.

## Validation

`automation/scripts/validate_offers.py` validates `data/offers.json` against the
V5 schema and editorial safety checks. It fails on:

- Missing required fields.
- Duplicate slugs.
- Unknown categories.
- Invalid status or verification status values.
- Missing `lastVerified`.
- Empty titles, providers, amounts, types, or descriptions.
- Unsupported internal fields.
- Suspicious public/internal language such as `manual_seed`, automation-source
  labels, placeholder notes, or local seed-data phrases.

## Change Detection

`automation/scripts/detect_offer_changes.py` compares `data/offers.json` with
`automation/snapshots/latest-offers.json` and reports:

- Added offers.
- Removed offers.
- Changed bonus amounts.
- Changed expiration dates.
- Changed offer status.
- Changed verification status.
- Changed referral or source URLs.

The full pipeline updates the snapshot after a successful local write.

## Reports

`automation/scripts/generate_offer_report.py` creates:

- `automation/reports/latest-offer-report.md`
- `automation/reports/latest-offer-report.html`

Reports include total offers, active/expired/watching counts, categories,
providers, recently verified offers, offers expiring soon, detected changes,
validation status, and a timestamp.

## Safe Commit And Deploy Hooks

The pipeline can stage and commit only generated offer data and reports:

```bash
python3 automation/scripts/run_offer_pipeline.py --write --commit
```

The commit message is:

```text
Update OfferRadar offer data
```

`--deploy` is allowed only with `--commit`. V5 does not SSH or deploy. It prints
the future manual commands only:

```bash
cd /var/www/offerradar
git pull
npm install
npm run build
pm2 restart offerradar
```

## Future Cron Plan

The target daily automation window is 6 AM local server time. A future Intel
automation server can run the reviewed pipeline, produce reports, and either
open a human review step or commit generated data depending on the selected
operating mode.

## Safety Rules

- Do not store secrets in this repo.
- Do not hardcode private tokens.
- Do not scrape bank, brokerage, referral, or provider websites yet.
- Do not call external APIs in V5.
- Do not auto-publish without explicit flags.
- Do not deploy from the pipeline in V5.
- Keep affiliate/referral disclosure visible on public pages.
- Keep internal operational fields off public offer pages.
