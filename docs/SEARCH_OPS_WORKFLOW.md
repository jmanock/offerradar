# OfferRadar Search Ops Workflow

OfferRadar search operations are local, review-first, and credential-free. The workflow combines offer automation, V7 intelligence, URL inventory, manual Search Console exports, and safe IndexNow dry runs.

## Daily Workflow

Run:

```bash
npm run ops:all
```

This refreshes:

1. Offer normalization, validation, changes, and reports.
2. Monetization, content gap, and internal link intelligence.
3. URL inventory.
4. IndexNow dry-run selection.
5. Combined search growth report.

Then review:

- `/ops/url-inventory`
- `/ops/search-console`
- `/ops/indexnow`
- `automation/reports/latest-search-growth-report.md`

## Manual Search Console Export

1. Open Google Search Console for `offerradar.io`.
2. Open **Performance**.
3. Choose a useful date range, usually the last 28 days.
4. Export the **Pages** or **Queries** table as CSV.
5. Place the CSV in `automation/search-console/`.
6. Import it:

```bash
python3 -B automation/scripts/import_search_console_export.py --input automation/search-console/your-export.csv
```

Google export headers can vary. The importer recognizes common query, page, click, impression, CTR, and position headers.

## URL Inventory

Generate the inventory:

```bash
npm run url:inventory
```

The generator combines known local route families with sitemap URLs when available. It assigns route type, crawl priority, monetization status, and indexing status. Existing manual indexing statuses and notes are preserved when the inventory is regenerated.

Update `indexingStatus`, `lastChecked`, `lastSubmitted`, and notes manually when reliable information is available.

## IndexNow Safety

IndexNow is dry-run only unless `--submit` is explicitly provided.

Review a normal dry run:

```bash
npm run indexnow:dry
```

Review URLs related to current git changes:

```bash
npm run indexnow:changed
```

Filter directly:

```bash
python3 -B automation/scripts/submit_indexnow.py --priority critical --type provider --limit 20
```

Submit only after a reviewed production deploy:

```bash
npm run indexnow:submit
```

Do not repeatedly submit unchanged URLs. IndexNow is a crawl notification signal, not an indexing guarantee.

## Deciding What To Improve Next

Prioritize pages that combine several signals:

- Critical or high URL inventory priority.
- Unknown, not indexed, or needs review indexing status.
- Search Console impressions with low CTR.
- Average positions between 8 and 20.
- Zero clicks despite meaningful impressions.
- Missing official/referral/affiliate links.
- Internal link or content gaps from V7 reports.

Improve source quality, titles, descriptions, internal links, offer coverage, and verification notes before creating more pages.

## Future Search Console API Plan

A future reviewed integration may use Google Search Console APIs for Search Analytics, Sitemaps, Sites, and URL Inspection. That work should:

- Use secure credentials outside the repository.
- Start read-only.
- Preserve manual import support.
- Store only the minimum reporting data needed.
- Avoid automatic indexing or content changes without review.
