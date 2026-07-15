#!/usr/bin/env python3
"""Compare current offer data with the latest local snapshot."""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from uuid import uuid4

ROOT = Path(__file__).resolve().parents[2]
DATA_PATH = ROOT / "data" / "offers.json"
SNAPSHOT_PATH = ROOT / "automation" / "snapshots" / "latest-offers.json"
REPORT_PATH = ROOT / "automation" / "reports" / "latest-offer-changes.json"
QUEUE_PATH = ROOT / "automation" / "queue" / "pending-changes.json"
TRACKED_FIELDS = {
    "offerAmount": "changed bonus amount",
    "expirationDate": "changed expiration date",
    "status": "changed status",
    "verificationStatus": "changed verification status",
    "referralUrl": "changed referral URL",
    "sourceUrl": "changed source URL",
}


def load_json(path: Path, fallback: Any) -> Any:
    if not path.exists():
        return fallback
    return json.loads(path.read_text())


def detect_changes() -> dict[str, Any]:
    current = load_json(DATA_PATH, [])
    previous = load_json(SNAPSHOT_PATH, [])
    current_by_slug = {offer["slug"]: offer for offer in current}
    previous_by_slug = {offer["slug"]: offer for offer in previous}

    added = sorted(set(current_by_slug) - set(previous_by_slug))
    removed = sorted(set(previous_by_slug) - set(current_by_slug))
    field_changes: list[dict[str, Any]] = []

    for slug in sorted(set(current_by_slug) & set(previous_by_slug)):
        current_offer = current_by_slug[slug]
        previous_offer = previous_by_slug[slug]
        for field, label in TRACKED_FIELDS.items():
            old_value = previous_offer.get(field)
            new_value = current_offer.get(field)
            if old_value != new_value:
                field_changes.append(
                    {
                        "slug": slug,
                        "provider": current_offer.get("provider"),
                        "title": current_offer.get("title"),
                        "changeType": label,
                        "field": field,
                        "previous": old_value,
                        "current": new_value,
                    },
                )

    return {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "summary": {
            "added": len(added),
            "removed": len(removed),
            "fieldChanges": len(field_changes),
        },
        "addedOffers": [current_by_slug[slug] for slug in added],
        "removedOffers": [previous_by_slug[slug] for slug in removed],
        "changedOffers": field_changes,
    }


def write_changes(changes: dict[str, Any]) -> None:
    REPORT_PATH.write_text(json.dumps(changes, indent=2) + "\n")
    queue_changes_for_review(changes)


def queue_changes_for_review(changes: dict[str, Any]) -> None:
    """Queue detected differences for human review; never publish them here."""
    queue = load_json(QUEUE_PATH, [])
    existing_keys = {
        (item.get("offerId"), item.get("field"), item.get("previousObservedValue"), item.get("currentObservedValue"))
        for item in queue
    }
    now = changes.get("generatedAt") or datetime.now(timezone.utc).isoformat()

    current_offers = load_json(DATA_PATH, [])
    for changed in changes.get("changedOffers", []):
        offer = next((item for item in current_offers if item.get("slug") == changed.get("slug")), {})
        change_type = classify_change(changed.get("field"), changed.get("previous"), changed.get("current"))
        key = (changed.get("slug"), changed.get("field"), changed.get("previous"), changed.get("current"))
        if key in existing_keys:
            continue
        source_url = offer.get("sourceUrl", "")
        queue.append({
            "id": str(uuid4()),
            "offerId": changed.get("slug", ""),
            "provider": changed.get("provider", ""),
            "title": changed.get("title", ""),
            "category": offer.get("category", ""),
            "previousObservedValue": str(changed.get("previous") or ""),
            "currentObservedValue": str(changed.get("current") or ""),
            "field": changed.get("field", ""),
            "changeType": change_type,
            "detectedAt": now,
            "sourceUrl": source_url,
            "confidence": source_confidence(source_url),
            "status": "pending",
            "proposedStatus": offer.get("status"),
        })

    for offer in changes.get("addedOffers", []):
        key = (offer.get("slug"), "record", "", offer.get("offerAmount"))
        if key in existing_keys:
            continue
        source_url = offer.get("sourceUrl", "")
        queue.append({"id": str(uuid4()), "offerId": offer.get("slug", ""), "provider": offer.get("provider", ""), "title": offer.get("title", ""), "category": offer.get("category", ""), "previousObservedValue": "", "currentObservedValue": str(offer.get("offerAmount") or ""), "field": "record", "changeType": "new", "detectedAt": now, "sourceUrl": source_url, "confidence": source_confidence(source_url), "status": "pending", "proposedStatus": offer.get("status")})

    for offer in changes.get("removedOffers", []):
        key = (offer.get("slug"), "record", offer.get("offerAmount"), "Expired or removed")
        if key in existing_keys:
            continue
        source_url = offer.get("sourceUrl", "")
        queue.append({"id": str(uuid4()), "offerId": offer.get("slug", ""), "provider": offer.get("provider", ""), "title": offer.get("title", ""), "category": offer.get("category", ""), "previousObservedValue": str(offer.get("offerAmount") or ""), "currentObservedValue": "Expired or removed", "field": "record", "changeType": "expired", "detectedAt": now, "sourceUrl": source_url, "confidence": source_confidence(source_url), "status": "pending", "proposedStatus": "expired"})

    QUEUE_PATH.parent.mkdir(parents=True, exist_ok=True)
    QUEUE_PATH.write_text(json.dumps(queue, indent=2) + "\n")


def classify_change(field: str | None, previous: Any, current: Any) -> str:
    if field == "offerAmount":
        old_number = first_number(previous)
        new_number = first_number(current)
        if old_number is not None and new_number is not None:
            return "increased" if new_number > old_number else "decreased" if new_number < old_number else "terms"
    if field == "status":
        if current == "expired":
            return "expired"
        if previous == "expired" and current == "active":
            return "reactivated"
    if field == "verificationStatus" and current == "needs_review":
        return "needs-review"
    return "terms"


def first_number(value: Any) -> float | None:
    match = __import__("re").search(r"\d+(?:\.\d+)?", str(value or "").replace(",", ""))
    return float(match.group()) if match else None


def source_confidence(source_url: str) -> str:
    if not source_url:
        return "low"
    return "low" if "example.com" in source_url else "medium"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="write latest change report")
    args = parser.parse_args()
    changes = detect_changes()
    summary = changes["summary"]
    print(
        "Detected "
        f"{summary['added']} added, {summary['removed']} removed, "
        f"{summary['fieldChanges']} field changes.",
    )
    if args.write:
        write_changes(changes)
        print(f"Wrote {REPORT_PATH.relative_to(ROOT)}")
    else:
        print("DRY RUN: no change report written")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
