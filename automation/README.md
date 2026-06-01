# OfferRadar Future Automation

This folder is reserved for a future automation server. The current site intentionally
does not implement scraping, scheduled jobs, external API calls, deployment, or
server automation.

Future automation is expected to:

1. Check offer sources.
2. Detect changes in offer amounts, requirements, fees, status, and expiration dates.
3. Update local offer data after review.
4. Regenerate static pages from the TypeScript data model.
5. Build and deploy after validation.
6. Produce a daily report for editorial review.

The current source of truth remains `data/offers.ts`. Future reviewed processes
can add operational metadata without changing the public page structure.
