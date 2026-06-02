#!/usr/bin/env python3
"""Analyze OfferRadar monetization gaps from local JSON/TS data only."""

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
OUTPUT_PATH = ROOT / "automation" / "reports" / "latest-monetization-gaps.json"
PRIORITY_RANK = {"critical": 0, "high": 1, "medium": 2, "low": 3}


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = value.replace("*", "")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return re.sub(r"-+", "-", value).strip("-")


def read_json(path: Path) -> Any:
    return json.loads(path.read_text())


def provider_page_slugs() -> set[str]:
    if not PROVIDERS_TS_PATH.exists():
        return set()
    return set(re.findall(r'slug:\s*"([^"]+)"', PROVIDERS_TS_PATH.read_text()))


def action_for(record: dict[str, Any], offer_count: int, has_page: bool) -> str:
    if record["linkStatus"] == "needs_referral":
        return f"Collect real referral link for {record['provider']} and paste it into data/linkRegistry.json."
    if record["linkStatus"] == "needs_affiliate_approval":
        return f"Apply for or confirm affiliate approval for {record['provider']}; collect official offer URL while reviewing."
    if not record["officialOfferUrl"]:
        return f"Collect official offer URL for {record['provider']}."
    if offer_count and has_page and record["linkStatus"] != "ready":
        return f"Review {record['provider']} link status and mark ready only after a real URL is available."
    return f"Review {record['provider']} monetization status."


def analyze() -> dict[str, Any]:
    offers = read_json(OFFERS_PATH)
    registry = read_json(REGISTRY_PATH)
    page_slugs = provider_page_slugs()
    offer_counts = Counter(slugify(offer.get("provider", "")) for offer in offers)
    registry_by_slug = {record["slug"]: record for record in registry}

    providers_with_offers_no_monetized_link = []
    providers_with_pages_no_monetized_link = []
    needs_referral = []
    needs_affiliate_approval = []
    high_priority = []

    for record in registry:
        slug = record["slug"]
        has_monetized_link = bool(record.get("referralUrl") or record.get("affiliateUrl"))
        enriched = {
          **record,
          "offerCount": offer_counts.get(slug, 0),
          "hasProviderPage": slug in page_slugs,
        }

        if enriched["offerCount"] and not has_monetized_link:
            providers_with_offers_no_monetized_link.append(enriched)
        if enriched["hasProviderPage"] and not has_monetized_link:
            providers_with_pages_no_monetized_link.append(enriched)
        if record["linkStatus"] == "needs_referral":
            needs_referral.append(enriched)
        if record["linkStatus"] == "needs_affiliate_approval":
            needs_affiliate_approval.append(enriched)
        if record["monetizationPriority"] in {"critical", "high"}:
            high_priority.append(enriched)

    top_actions = []
    candidates = sorted(
        registry,
        key=lambda record: (
            PRIORITY_RANK.get(record["monetizationPriority"], 9),
            -offer_counts.get(record["slug"], 0),
            record["provider"],
        ),
    )
    for record in candidates:
        if record["linkStatus"] == "ready":
            continue
        top_actions.append(
            {
                "provider": record["provider"],
                "slug": record["slug"],
                "priority": record["monetizationPriority"],
                "linkStatus": record["linkStatus"],
                "offerCount": offer_counts.get(record["slug"], 0),
                "hasProviderPage": record["slug"] in page_slugs,
                "action": action_for(
                    record,
                    offer_counts.get(record["slug"], 0),
                    record["slug"] in page_slugs,
                ),
            },
        )
        if len(top_actions) == 10:
            break

    ready_count = sum(1 for record in registry_by_slug.values() if record["linkStatus"] == "ready")

    return {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "offerCount": len(offers),
        "registryProviderCount": len(registry),
        "providerPageCount": len(page_slugs),
        "monetizedProviderCount": ready_count,
        "providersWithOffersButNoReferralOrAffiliateLink": providers_with_offers_no_monetized_link,
        "providersWithPagesButNoMonetizedLink": providers_with_pages_no_monetized_link,
        "providersNeedingReferral": needs_referral,
        "providersNeedingAffiliateApproval": needs_affiliate_approval,
        "highPriorityProviders": high_priority,
        "top10MoneyActionItems": top_actions,
    }


def main() -> int:
    report = analyze()
    OUTPUT_PATH.write_text(json.dumps(report, indent=2) + "\n")
    print(
        "Monetization gaps: "
        f"{len(report['top10MoneyActionItems'])} top actions, "
        f"{len(report['providersNeedingReferral'])} need referral, "
        f"{len(report['providersNeedingAffiliateApproval'])} need affiliate approval.",
    )
    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
