#!/usr/bin/env python3
"""Analyze local OfferRadar content gaps without scraping or network calls."""

from __future__ import annotations

import json
import re
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
OFFERS_PATH = ROOT / "data" / "offers.json"
REGISTRY_PATH = ROOT / "data" / "linkRegistry.json"
PROVIDERS_TS_PATH = ROOT / "data" / "providers.ts"
GUIDES_TS_PATH = ROOT / "data" / "guidePages.ts"
STATE_TS_PATH = ROOT / "data" / "statePages.ts"
OFFER_TYPE_TS_PATH = ROOT / "data" / "offerTypePages.ts"
OUTPUT_PATH = ROOT / "automation" / "reports" / "latest-content-gaps.json"
PRIORITY_RANK = {"critical": 0, "high": 1, "medium": 2, "low": 3}


def slugify(value: str) -> str:
    value = value.lower().strip().replace("*", "")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return re.sub(r"-+", "-", value).strip("-")


def read_json(path: Path) -> Any:
    return json.loads(path.read_text())


def ts_slugs(path: Path) -> set[str]:
    if not path.exists():
        return set()
    return set(re.findall(r'slug:\s*"([^"]+)"', path.read_text()))


def analyze() -> dict[str, Any]:
    offers = read_json(OFFERS_PATH)
    registry = read_json(REGISTRY_PATH)
    provider_slugs = ts_slugs(PROVIDERS_TS_PATH)
    guide_slugs = ts_slugs(GUIDES_TS_PATH)
    state_slugs = ts_slugs(STATE_TS_PATH)
    offer_type_slugs = ts_slugs(OFFER_TYPE_TS_PATH)
    offer_counts = Counter(slugify(offer.get("provider", "")) for offer in offers)

    providers_in_registry_with_no_offer = [
        record for record in registry if offer_counts.get(record["slug"], 0) == 0
    ]
    providers_with_offer_no_provider_page = [
        {
            "provider": provider,
            "slug": provider,
            "offerCount": count,
            "action": "Add provider metadata/page coverage for this offer provider.",
        }
        for provider, count in sorted(offer_counts.items())
        if provider and provider not in provider_slugs
    ]
    providers_with_weak_offer_coverage = [
        {
            **record,
            "offerCount": offer_counts.get(record["slug"], 0),
            "action": f"Add or review offer coverage for {record['provider']} before prioritizing comparison traffic.",
        }
        for record in registry
        if record["slug"] in provider_slugs and offer_counts.get(record["slug"], 0) < 2
    ]
    high_priority_missing_comparison_focus = [
        {
            **record,
            "action": f"Add hand-curated comparison links or a focused comparison hub for {record['provider']}.",
        }
        for record in registry
        if record["monetizationPriority"] in {"critical", "high"} and record["slug"] not in provider_slugs
    ]

    desired_guides = {
        "affiliate-networks",
        "official-offer-urls",
        "bank-affiliate-programs",
        "brokerage-referral-links",
        "cash-back-referral-links",
        "offer-review-workflow",
    }
    missing_guides = sorted(desired_guides - guide_slugs)
    page_family_actions = [
        {
            "family": "Provider pages",
            "status": f"{len(provider_slugs)} provider pages detected",
            "action": "Add missing registry providers to data/providers.ts when they become important traffic or monetization targets.",
        },
        {
            "family": "State pages",
            "status": f"{len(state_slugs)} state/national pages detected",
            "action": "Add more state-specific offer context after real source URLs and bank availability data improve.",
        },
        {
            "family": "Offer type pages",
            "status": f"{len(offer_type_slugs)} intent pages detected",
            "action": "Strengthen pages with real source URLs, monetized links, and editorial review notes.",
        },
    ]

    top_content_actions = []
    for record in sorted(
        registry,
        key=lambda item: (
            PRIORITY_RANK.get(item["monetizationPriority"], 9),
            offer_counts.get(item["slug"], 0),
            item["provider"],
        ),
    ):
        count = offer_counts.get(record["slug"], 0)
        if count == 0:
            top_content_actions.append(
                f"Add or verify at least one tracked offer for {record['provider']} before deeper SEO expansion.",
            )
        elif count < 2:
            top_content_actions.append(
                f"Strengthen {record['provider']} with another reviewed offer or official source URL.",
            )
        if len(top_content_actions) == 10:
            break
    for guide in missing_guides:
        if len(top_content_actions) == 10:
            break
        top_content_actions.append(f"Create guide topic: {guide.replace('-', ' ')}.")

    return {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "providersInRegistryWithNoOffer": providers_in_registry_with_no_offer,
        "providersWithOfferButNoProviderPage": providers_with_offer_no_provider_page,
        "providersWithProviderPageButWeakOfferCoverage": providers_with_weak_offer_coverage,
        "highPriorityProvidersMissingFromComparisonPages": high_priority_missing_comparison_focus,
        "guideTopicsThatShouldExistNext": missing_guides,
        "pageFamiliesThatNeedStrengthening": page_family_actions,
        "top10ContentActions": top_content_actions[:10],
    }


def main() -> int:
    report = analyze()
    OUTPUT_PATH.write_text(json.dumps(report, indent=2) + "\n")
    print(
        "Content gaps: "
        f"{len(report['providersInRegistryWithNoOffer'])} registry providers have no offer, "
        f"{len(report['top10ContentActions'])} top actions.",
    )
    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
