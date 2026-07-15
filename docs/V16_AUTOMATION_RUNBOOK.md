# V16 automation runbook

## Daily reviewed-change ingestion

Run `npm run v16:daily` after the upstream intelligence/source process updates manual inputs. It normalizes and validates offers, detects snapshot differences, refreshes reports, queues differences for review, updates the snapshot, and validates the publication boundary.

Expected workflow:

1. Detection creates a private queue candidate.
2. Reviewer opens `/ops/changes` and checks official source evidence.
3. “Mark for research” keeps the candidate unpublished.
4. “Reject” records the decision and prevents repeat action on that candidate.
5. “Approve” runs strict checks, publishes the approved observation, and dispatches matching immediate alerts.

Do not run approval automatically from cron, a scraper, Codex, or the source server.

## Weekly digest

Run `npm run v16:weekly` once per publication week. It generates `/weekly/YYYY-MM-DD` from approved changes and current structured records. Sections with no evidence remain visibly empty. Then rebuild/deploy through the normal reviewed release process and call the protected weekly-alert endpoint once.

## Data-quality boundary

`npm run v16:validate` blocks approved publication when provider/source/date/value/prior-observation/status requirements fail. It also checks that any ready monetized URL has a ready affiliate state and disclosure notes.

Legacy public records are not silently rewritten by this new boundary. They remain candidates for a separate source-quality cleanup; new approved history must meet V16 rules.

## Cross-category experiment readiness

V16 evaluates only three future collections:

| Collection | Current state | Launch decision |
| --- | --- | --- |
| Florida travel offers | Useful travel-money gateway exists, but no verified Florida hotel/flight/cruise offer feed | Do not launch a claimed offer collection |
| Software and developer offers | One legacy software-tagged research record lacks a verified source | Do not launch |
| Internet, mobile, and streaming | No qualifying tracked records | Do not launch |

Use the same approval boundary and require several verified records before any public collection is created.

## Network destinations

`data/networkDestinations.ts` and `NetworkOpportunityModule` provide the contextual, analytics-ready interface. The active inventory remains empty until domain ownership, live usefulness, canonical behavior, analytics policy, and reciprocal context pass the V15 network checklist.
