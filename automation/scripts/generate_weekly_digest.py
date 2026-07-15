#!/usr/bin/env python3
"""Generate a factual weekly digest from approved changes and current records."""
from __future__ import annotations
import argparse, json
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OFFERS = ROOT / "data" / "offers.json"
CHANGES = ROOT / "data" / "approvedChanges.json"
RESEARCH = ROOT / "data" / "researchArticles.ts"
OUTPUT = ROOT / "data" / "weeklyDigests.json"
RUNTIME_ALERTS = ROOT / "data" / "runtime" / "alert-subscriptions.json"

def load(path: Path, fallback):
    try: return json.loads(path.read_text())
    except (FileNotFoundError, json.JSONDecodeError): return fallback

def generate(as_of: date) -> dict:
    offers, changes = load(OFFERS, []), load(CHANGES, [])
    start = as_of - timedelta(days=6)
    in_week = lambda value: bool(value) and start <= datetime.fromisoformat(value.replace("Z", "+00:00")).date() <= as_of
    increases = [c for c in changes if c.get("changeType") == "increased" and in_week(c.get("approvedAt"))]
    new = [c for c in changes if c.get("changeType") == "new" and in_week(c.get("approvedAt"))]
    expiring = [o for o in offers if o.get("expirationDate") and as_of <= date.fromisoformat(o["expirationDate"]) <= as_of + timedelta(days=30) and o.get("status") == "active"]
    needs_review = [o for o in offers if o.get("verificationStatus") == "needs_review"]
    subscriptions = [s for s in load(RUNTIME_ALERTS, []) if s.get("status") == "active" and s.get("scopeType") == "provider"]
    analytics = load(ROOT / "data" / "runtime" / "analytics-aggregate.json", {})
    watched = {}
    for subscription in subscriptions: watched[subscription.get("scopeLabel", "Unknown")] = watched.get(subscription.get("scopeLabel", "Unknown"), 0) + 1
    compared = {}
    for pair, count in analytics.get("dimensions", {}).get("comparison_opened", {}).items():
        for provider in pair.split("|"):
            if provider: compared[provider] = compared.get(provider, 0) + count
    return {
        "date": as_of.isoformat(), "periodStart": start.isoformat(), "generatedAt": datetime.now(timezone.utc).isoformat(),
        "largestIncreases": sorted(increases, key=lambda c: c.get("currentObservedValue", ""), reverse=True)[:5],
        "newOffers": new[:5], "expiringOffers": sorted(expiring, key=lambda o: o["expirationDate"])[:6],
        "needsVerification": sorted(needs_review, key=lambda o: o.get("lastVerified", ""))[:6],
        "mostWatchedProviders": [{"provider": name, "count": count} for name,count in sorted(watched.items(), key=lambda item: item[1], reverse=True)[:5]],
        "mostComparedProviders": [{"provider": name, "count": count} for name,count in sorted(compared.items(), key=lambda item: item[1], reverse=True)[:5]],
        "newResearch": [item for item in [
            {"slug":"how-offerradar-tracks-and-verifies-offers","title":"How OfferRadar Tracks and Verifies Offers","updated":"2026-07-14"},
            {"slug":"when-to-wait-for-a-better-offer","title":"When to Wait for a Better Offer","updated":"2026-07-14"},
            {"slug":"compare-an-offer-without-being-misled-by-headline-amount","title":"How to Compare an Offer Without Being Misled by the Headline Amount","updated":"2026-07-14"},
        ] if start <= date.fromisoformat(item["updated"]) <= as_of],
    }

def main() -> int:
    parser=argparse.ArgumentParser(); parser.add_argument("--date"); parser.add_argument("--write", action="store_true"); args=parser.parse_args()
    as_of=date.fromisoformat(args.date) if args.date else date.today(); digest=generate(as_of); existing=load(OUTPUT, []); values=[item for item in existing if item.get("date") != digest["date"]] + [digest]; values.sort(key=lambda item:item["date"], reverse=True)
    if args.write: OUTPUT.write_text(json.dumps(values, indent=2)+"\n"); print(f"Wrote weekly digest for {digest['date']}")
    else: print(json.dumps(digest, indent=2))
    return 0
if __name__ == "__main__": raise SystemExit(main())
