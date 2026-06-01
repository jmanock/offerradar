#!/usr/bin/env python3
"""Compare current offer data with the latest local snapshot."""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
DATA_PATH = ROOT / "data" / "offers.json"
SNAPSHOT_PATH = ROOT / "automation" / "snapshots" / "latest-offers.json"
REPORT_PATH = ROOT / "automation" / "reports" / "latest-offer-changes.json"
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
