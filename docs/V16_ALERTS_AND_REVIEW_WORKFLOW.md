# V16 alerts and editorial review workflow

## Product loop

```text
discover → save/follow → detect → private review → approve → publish → alert → return
```

Detection never publishes or emails by itself. `detect_offer_changes.py` compares the current normalized records with the retained snapshot and writes deduplicated candidates to `automation/queue/pending-changes.json`. The queue records old/new values, source URL, detection time, confidence, proposed status, and a public-preview summary.

Reviewers unlock `/ops/changes` with `OPS_ACCESS_KEY`. Approve, reject, and research actions call the private ops API. Approval is blocked when provider/source/date/value/history/status requirements fail. An approved record is written to `data/approvedChanges.json`, becomes eligible for the public feed/history, and can trigger matching immediate alerts.

## Alert flow

1. Visitor follows an offer, provider, or the reviewed feed.
2. `/api/alerts/subscribe` validates the request and applies a hashed email/IP rate limit.
3. A pending subscription is stored in `data/runtime/alert-subscriptions.json` with mode `0600`.
4. A random token is emailed; only its SHA-256 hash is retained.
5. The magic link confirms the subscription and opens `/alerts/manage`.
6. The same link can pause, resume, or unsubscribe without a password.

If delivery is not configured, the public form is explicitly unavailable and retains no subscription. If sending fails, the pending record is rolled back.

Immediate alerts are considered only after approval. Weekly subscriptions are delivered through `POST /api/cron/weekly-alerts` with `Authorization: Bearer $CRON_SECRET`; delivery keys prevent duplicate sends for the same digest and subscription.

## Required environment

See `.env.example`. Production requires `ALERTS_ENABLED=true`, a real site URL, Resend credentials, `OPS_ACCESS_KEY`, and `CRON_SECRET`. `ALERT_EMAIL_MODE=log` is for local testing only and never sends mail.

## Storage and deployment

The first implementation uses atomic JSON files under ignored `data/runtime/`, suitable for the current self-hosted/single-process workflow. It is not a multi-region datastore. Before horizontal scaling, migrate subscriptions, rate limits, analytics aggregates, and delivery idempotency to a transactional database or managed KV store with encryption, backups, retention controls, and deletion tooling.

## Privacy

- Email is stored only for alert delivery.
- Magic tokens are never stored in plaintext.
- Watchlist notes and target values remain local and are not copied into alert analytics.
- First-party reports use aggregate counts without persistent visitor IDs.
- Runtime data and environment secrets are gitignored.
