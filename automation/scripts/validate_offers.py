#!/usr/bin/env python3
"""Validate the generated OfferRadar JSON data with no third-party packages."""

from __future__ import annotations

import argparse
import json
import re
from datetime import datetime
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
DATA_PATH = ROOT / "data" / "offers.json"
SCHEMA_PATH = ROOT / "automation" / "schemas" / "offer.schema.json"

VALID_CATEGORIES = {
    "bank-bonuses",
    "brokerage-bonuses",
    "referral-offers",
    "high-yield-savings",
    "business-banking",
    "credit-card-offers",
    "cash-back-apps",
}
VALID_STATUSES = {"active", "expired", "watching"}
VALID_VERIFICATION_STATUSES = {
    "verified_today",
    "verified_this_week",
    "needs_review",
    "expired",
}
REQUIRED_FIELDS = {
    "slug",
    "title",
    "provider",
    "category",
    "offerAmount",
    "offerType",
    "description",
    "requirements",
    "lastVerified",
    "verificationStatus",
    "status",
}
ALLOWED_FIELDS = {
    "slug",
    "title",
    "provider",
    "category",
    "offerAmount",
    "offerType",
    "description",
    "requirements",
    "fees",
    "expirationDate",
    "referralUrl",
    "sourceUrl",
    "lastVerified",
    "verificationStatus",
    "status",
    "featured",
    "riskNotes",
    "tags",
    "requiresDirectDeposit",
    "minimumDeposit",
    "monthlyFee",
    "stateRestrictions",
    "referralCode",
    "lastChanged",
    "changeSummary",
}
ARRAY_FIELDS = {"requirements", "fees", "riskNotes", "tags", "stateRestrictions"}
DATE_FIELDS = {"expirationDate", "lastVerified", "lastChanged"}
BOOL_FIELDS = {"featured", "requiresDirectDeposit"}
SUSPICIOUS_PATTERNS = [
    "manual_seed",
    "automation source",
    "local placeholder data",
    "local seed data",
    "no external link is listed",
    "no change summary listed",
    "placeholder",
    "static data",
]


def load_offers(path: Path = DATA_PATH) -> list[dict[str, Any]]:
    data = json.loads(path.read_text())
    if not isinstance(data, list):
        raise ValueError(f"{path.relative_to(ROOT)} must contain a JSON array")
    return data


def is_iso_date(value: str) -> bool:
    try:
        datetime.strptime(value, "%Y-%m-%d")
        return True
    except ValueError:
        return False


def text_values(value: Any) -> list[str]:
    if isinstance(value, str):
        return [value]
    if isinstance(value, list):
        values: list[str] = []
        for item in value:
            values.extend(text_values(item))
        return values
    if isinstance(value, dict):
        values = []
        for item in value.values():
            values.extend(text_values(item))
        return values
    return []


def validate_offers(path: Path = DATA_PATH) -> dict[str, Any]:
    schema = json.loads(SCHEMA_PATH.read_text())
    offers = load_offers(path)
    errors: list[str] = []
    warnings: list[str] = []
    seen_slugs: set[str] = set()

    schema_required = set(schema.get("required", []))
    if schema_required != REQUIRED_FIELDS:
        warnings.append("Schema required fields differ from validator required fields.")

    for index, offer in enumerate(offers):
        label = offer.get("slug") or f"offer[{index}]"
        if not isinstance(offer, dict):
            errors.append(f"{label}: record must be an object")
            continue

        missing = REQUIRED_FIELDS - set(offer.keys())
        if missing:
            errors.append(f"{label}: missing required fields {', '.join(sorted(missing))}")

        extra = set(offer.keys()) - ALLOWED_FIELDS
        if extra:
            errors.append(f"{label}: unsupported internal/public fields {', '.join(sorted(extra))}")

        slug = str(offer.get("slug", "")).strip()
        if not slug:
            errors.append(f"{label}: slug is empty")
        elif slug in seen_slugs:
            errors.append(f"{label}: duplicate slug")
        else:
            seen_slugs.add(slug)

        for field in ["title", "provider", "offerAmount", "offerType", "description"]:
            if not str(offer.get(field, "")).strip():
                errors.append(f"{label}: {field} must not be empty")

        if offer.get("category") not in VALID_CATEGORIES:
            errors.append(f"{label}: invalid category {offer.get('category')!r}")

        if offer.get("status") not in VALID_STATUSES:
            errors.append(f"{label}: invalid status {offer.get('status')!r}")

        if offer.get("verificationStatus") not in VALID_VERIFICATION_STATUSES:
            errors.append(
                f"{label}: invalid verificationStatus {offer.get('verificationStatus')!r}",
            )

        if not offer.get("lastVerified"):
            errors.append(f"{label}: missing lastVerified")

        for field in DATE_FIELDS:
            if field in offer and offer[field] and not is_iso_date(str(offer[field])):
                errors.append(f"{label}: {field} must use YYYY-MM-DD")

        for field in ARRAY_FIELDS:
            if field in offer:
                values = offer[field]
                if not isinstance(values, list) or not all(
                    isinstance(item, str) and item.strip() for item in values
                ):
                    errors.append(f"{label}: {field} must be an array of non-empty strings")

        for field in BOOL_FIELDS:
            if field in offer and not isinstance(offer[field], bool):
                errors.append(f"{label}: {field} must be a boolean")

        haystack = " ".join(text_values(offer)).lower()
        for pattern in SUSPICIOUS_PATTERNS:
            if re.search(re.escape(pattern), haystack):
                errors.append(f"{label}: suspicious public/internal language found: {pattern}")

    summary = {
        "valid": not errors,
        "offerCount": len(offers),
        "errors": errors,
        "warnings": warnings,
    }
    return summary


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--json", action="store_true", help="print machine-readable JSON")
    args = parser.parse_args()

    summary = validate_offers()
    if args.json:
        print(json.dumps(summary, indent=2))
    elif summary["valid"]:
        print(f"Validation passed for {summary['offerCount']} offers.")
        for warning in summary["warnings"]:
            print(f"Warning: {warning}")
    else:
        print("Validation failed:")
        for error in summary["errors"]:
            print(f"- {error}")

    return 0 if summary["valid"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
