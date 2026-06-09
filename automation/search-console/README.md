# Manual Google Search Console Import

OfferRadar does not use Google Search Console API credentials yet. Export search performance data manually from Google Search Console, then import the CSV locally.

## Export

1. Open Google Search Console and select `offerradar.io`.
2. Open **Performance** and choose the desired date range.
3. Select the **Pages** or **Queries** tab.
4. Export CSV and place it in `automation/search-console/`.

Google export headers can vary. The importer recognizes common names including `Top queries`, `Query`, `Pages`, `Page`, `Clicks`, `Impressions`, `CTR`, and `Position`.

## Import

```bash
python3 -B automation/scripts/import_search_console_export.py --input automation/search-console/your-export.csv
```

Or run the configured sample import:

```bash
npm run search-console:import
```

The importer writes:

- `automation/reports/latest-search-console-summary.json`
- `automation/reports/latest-search-console-summary.md`

No API calls, credentials, or live Google access are used.

The normalized row format is documented in `automation/search-console/schema.json`.
