# OfferRadar Future Automation

This folder is a placeholder for a future automation server. V2 intentionally
does not implement scraping, scheduled jobs, external API calls, deployment, or
server automation.

Future automation is expected to:

1. Check offer sources.
2. Detect changes in offer amounts, requirements, fees, status, and expiration dates.
3. Update local offer data after review.
4. Regenerate static pages from the TypeScript data model.
5. Build and deploy after validation.
6. Produce a daily report for editorial review.

The current source of truth remains `data/offers.ts`, and all offers use
`automationSource: "manual_seed"` unless a future reviewed process updates that
field.
