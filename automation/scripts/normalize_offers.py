#!/usr/bin/env python3
"""Normalize manual OfferRadar records into data/offers.json.

No scraping, network calls, credentials, commits, pushes, or deploys happen here.
Future source adapters should write reviewed records into automation/sources/
before this normalizer is run.
"""

from __future__ import annotations

import argparse
import json
import re
from datetime import datetime
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
SOURCE_PATH = ROOT / "automation" / "sources" / "manual-offers.json"
OUTPUT_PATH = ROOT / "data" / "offers.json"

CATEGORY_ALIASES = {
    "bank": "bank-bonuses",
    "bank bonus": "bank-bonuses",
    "bank bonuses": "bank-bonuses",
    "brokerage": "brokerage-bonuses",
    "brokerage bonus": "brokerage-bonuses",
    "brokerage bonuses": "brokerage-bonuses",
    "referral": "referral-offers",
    "referral offer": "referral-offers",
    "referral offers": "referral-offers",
    "hysa": "high-yield-savings",
    "high yield savings": "high-yield-savings",
    "high-yield savings": "high-yield-savings",
    "business bank": "business-banking",
    "business banking": "business-banking",
    "credit card": "credit-card-offers",
    "credit card offers": "credit-card-offers",
    "cash back": "cash-back-apps",
    "cash back apps": "cash-back-apps",
}

STATUS_ALIASES = {
    "active": "active",
    "expired": "expired",
    "watching": "watching",
    "watch": "watching",
    "needs_review": "watching",
    "needs review": "watching",
}

VERIFICATION_ALIASES = {
    "verified_today": "verified_today",
    "verified today": "verified_today",
    "verified_this_week": "verified_this_week",
    "verified this week": "verified_this_week",
    "needs_review": "needs_review",
    "needs review": "needs_review",
    "expired": "expired",
}

OPTIONAL_ARRAY_FIELDS = ["fees", "riskNotes", "tags", "stateRestrictions"]
OPTIONAL_STRING_FIELDS = [
    "expirationDate",
    "referralUrl",
    "sourceUrl",
    "minimumDeposit",
    "monthlyFee",
    "referralCode",
    "lastChanged",
    "changeSummary",
]
OPTIONAL_BOOL_FIELDS = ["featured", "requiresDirectDeposit"]
FIELD_ORDER = [
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
]


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return re.sub(r"-+", "-", value).strip("-")


def normalize_string(value: Any) -> str:
    if value is None:
        return ""
    return re.sub(r"\s+", " ", str(value)).strip()


def normalize_array(value: Any) -> list[str]:
    if value is None or value == "":
        return []
    if isinstance(value, list):
        return [normalize_string(item) for item in value if normalize_string(item)]
    return [normalize_string(value)]


def normalize_date(value: Any) -> str:
    text = normalize_string(value)
    if not text:
        return ""
    for fmt in ("%Y-%m-%d", "%m/%d/%Y", "%m/%d/%y"):
        try:
            return datetime.strptime(text, fmt).date().isoformat()
        except ValueError:
            pass
    return text


def normalize_category(value: Any) -> str:
    text = normalize_string(value).lower().replace("_", "-")
    return CATEGORY_ALIASES.get(text, text)


def normalize_offer(raw_offer: dict[str, Any]) -> dict[str, Any]:
    offer: dict[str, Any] = {}
    title = normalize_string(raw_offer.get("title"))
    provider = normalize_string(raw_offer.get("provider"))

    offer["slug"] = slugify(normalize_string(raw_offer.get("slug")) or f"{provider}-{title}")
    offer["title"] = title
    offer["provider"] = provider
    offer["category"] = normalize_category(raw_offer.get("category"))
    offer["offerAmount"] = normalize_string(raw_offer.get("offerAmount"))
    offer["offerType"] = normalize_string(raw_offer.get("offerType"))
    offer["description"] = normalize_string(raw_offer.get("description"))
    offer["requirements"] = normalize_array(raw_offer.get("requirements"))

    for field in OPTIONAL_ARRAY_FIELDS:
        values = normalize_array(raw_offer.get(field))
        if values:
            offer[field] = values

    for field in ["expirationDate", "lastVerified", "lastChanged"]:
        value = normalize_date(raw_offer.get(field))
        if value or field == "lastVerified":
            offer[field] = value

    for field in OPTIONAL_STRING_FIELDS:
        if field in {"expirationDate", "lastChanged"}:
            continue
        value = normalize_string(raw_offer.get(field))
        if value:
            offer[field] = value

    verification = normalize_string(raw_offer.get("verificationStatus")).lower().replace("-", "_")
    offer["verificationStatus"] = VERIFICATION_ALIASES.get(verification, verification)

    status = normalize_string(raw_offer.get("status")).lower().replace("-", "_")
    offer["status"] = STATUS_ALIASES.get(status, status)

    for field in OPTIONAL_BOOL_FIELDS:
        if field in raw_offer:
            offer[field] = bool(raw_offer[field])

    ordered = {field: offer[field] for field in FIELD_ORDER if field in offer}
    return ordered


def normalize_offers(write: bool = False) -> list[dict[str, Any]]:
    raw_offers = json.loads(SOURCE_PATH.read_text())
    if not isinstance(raw_offers, list):
        raise ValueError(f"{SOURCE_PATH} must contain a JSON array")

    normalized = [normalize_offer(offer) for offer in raw_offers]

    if write:
        OUTPUT_PATH.write_text(json.dumps(normalized, indent=2) + "\n")
        print(f"Wrote {len(normalized)} offers to {OUTPUT_PATH.relative_to(ROOT)}")
    else:
        print(f"DRY RUN: normalized {len(normalized)} offers; no files written")

    return normalized


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="write normalized data/offers.json")
    args = parser.parse_args()
    normalize_offers(write=args.write)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
