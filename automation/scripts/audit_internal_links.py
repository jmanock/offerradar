#!/usr/bin/env python3
"""Best-effort internal link audit for static OfferRadar routes."""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
APP_DIR = ROOT / "app"
DATA_DIR = ROOT / "data"
OUTPUT_PATH = ROOT / "automation" / "reports" / "latest-internal-link-audit.json"
HUB_FILES = [
    ROOT / "app" / "page.tsx",
    ROOT / "app" / "offers" / "page.tsx",
    ROOT / "app" / "providers" / "page.tsx",
    ROOT / "components" / "Footer.tsx",
]


def read_text(path: Path) -> str:
    return path.read_text() if path.exists() else ""


def slugify(value: str) -> str:
    value = value.lower().strip().replace("*", "")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return re.sub(r"-+", "-", value).strip("-")


def ts_slugs(path: Path) -> set[str]:
    if not path.exists():
        return set()
    return set(re.findall(r'slug:\s*"([^"]+)"', path.read_text()))


def routes() -> list[str]:
    offer_data = json.loads((DATA_DIR / "offers.json").read_text())
    registry_data = json.loads((DATA_DIR / "linkRegistry.json").read_text())
    route_set = {
        "/",
        "/offers",
        "/providers",
        "/about",
        "/disclosures",
        "/editorial-policy",
        "/best-bank-bonuses",
        "/best-brokerage-bonuses",
        "/best-referral-bonuses",
    }
    route_set.update(f"/offer/{offer['slug']}" for offer in offer_data)
    route_set.update(f"/provider/{record['slug']}" for record in registry_data)
    route_set.update(f"/guides/{slug}" for slug in ts_slugs(DATA_DIR / "guidePages.ts"))
    route_set.update(f"/{slug}" for slug in ts_slugs(DATA_DIR / "statePages.ts"))
    route_set.update(f"/{slug}" for slug in ts_slugs(DATA_DIR / "offerTypePages.ts"))
    return sorted(route_set)


def source_text() -> str:
    parts = []
    for folder in [APP_DIR, ROOT / "components", DATA_DIR]:
        for path in folder.rglob("*"):
            if path.name == "urlInventory.json":
                continue
            if path.suffix in {".tsx", ".ts", ".json"}:
                parts.append(read_text(path))
    return "\n".join(parts)


def analyze() -> dict[str, object]:
    all_routes = routes()
    all_source = source_text()
    hub_source = "\n".join(read_text(path) for path in HUB_FILES)
    link_counts = {
        route: len(re.findall(re.escape(route), all_source))
        for route in all_routes
        if route != "/"
    }
    hub_counts = {
        route: len(re.findall(re.escape(route), hub_source))
        for route in all_routes
        if route != "/"
    }

    major_pages_with_few_links = [
        {
            "route": route,
            "linkCount": count,
            "action": "Add this route to a hub page or related-page block if it is a priority.",
        }
        for route, count in sorted(link_counts.items(), key=lambda item: (item[1], item[0]))
        if count <= 1 and not route.startswith("/compare/")
    ][:25]

    registry = json.loads((DATA_DIR / "linkRegistry.json").read_text())
    offers = json.loads((DATA_DIR / "offers.json").read_text())
    offer_counts = {}
    for offer in offers:
        provider_slug = slugify(offer.get("provider", ""))
        offer_counts[provider_slug] = offer_counts.get(provider_slug, 0) + 1

    provider_pages_with_no_offer_links = [
        {
            "route": f"/provider/{record['slug']}",
            "provider": record["provider"],
            "action": "Add or review offer records for this provider, or add contextual related offer links.",
        }
        for record in registry
        if offer_counts.get(record["slug"], 0) == 0
    ]

    offer_pages_missing_provider_category_best_links = [
        {
            "route": f"/offer/{offer['slug']}",
            "provider": offer.get("provider"),
            "action": "Review offer detail internal links to provider, category, and best-of pages.",
        }
        for offer in offers
        if not offer.get("provider") or not offer.get("category")
    ]

    guide_pages_missing_related_links = [
        {
            "route": f"/guides/{slug}",
            "action": "Review guide related links and add offer/category links where useful.",
        }
        for slug in ts_slugs(DATA_DIR / "guidePages.ts")
        if hub_counts.get(f"/guides/{slug}", 0) == 0
    ]

    sitemap_routes_not_linked_from_obvious_hubs = [
        {
            "route": route,
            "hubLinkCount": hub_counts.get(route, 0),
            "action": "Consider adding this route to homepage, providers, offers, or footer if it is a priority landing page.",
        }
        for route in all_routes
        if route != "/" and hub_counts.get(route, 0) == 0 and not route.startswith("/offer/")
    ][:50]

    top_actions = [
        item["action"] + f" Route: {item['route']}"
        for item in sitemap_routes_not_linked_from_obvious_hubs[:10]
    ]

    return {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "routeCountAudited": len(all_routes),
        "majorPagesWithFewOrNoInternalLinks": major_pages_with_few_links,
        "providerPagesWithNoOfferLinks": provider_pages_with_no_offer_links,
        "offerPagesMissingProviderCategoryBestPageLinks": offer_pages_missing_provider_category_best_links,
        "guidePagesMissingRelatedOfferOrCategoryLinks": guide_pages_missing_related_links,
        "sitemapRoutesNotLinkedFromObviousHubPages": sitemap_routes_not_linked_from_obvious_hubs,
        "top10InternalLinkingActions": top_actions,
    }


def main() -> int:
    report = analyze()
    OUTPUT_PATH.write_text(json.dumps(report, indent=2) + "\n")
    print(
        "Internal link audit: "
        f"{report['routeCountAudited']} routes audited, "
        f"{len(report['top10InternalLinkingActions'])} top actions.",
    )
    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
