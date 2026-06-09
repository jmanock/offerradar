#!/usr/bin/env python3
"""Generate the OfferRadar URL inventory from local route data and sitemap output."""

from __future__ import annotations

import itertools
import json
import re
import urllib.request
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT / "data"
OUTPUT_PATH = DATA_DIR / "urlInventory.json"
SITE_URL = "https://offerradar.io"
STATIC_ROUTES = [
    "",
    "/offers",
    "/about",
    "/disclosures",
    "/editorial-policy",
    "/advertising-disclosure",
    "/privacy-policy",
    "/terms-of-use",
    "/contact",
    "/best-bank-bonuses",
    "/best-brokerage-bonuses",
    "/best-referral-bonuses",
    "/providers",
]
CRITICAL_PATHS = {
    "/",
    "/offers",
    "/providers",
    "/bank-bonuses",
    "/brokerage-bonuses",
    "/referral-offers",
    "/best-bank-bonuses",
    "/best-brokerage-bonuses",
    "/best-referral-bonuses",
}
POLICY_PATHS = {
    "/about",
    "/disclosures",
    "/editorial-policy",
    "/advertising-disclosure",
    "/privacy-policy",
    "/terms-of-use",
    "/contact",
}


def read_json(path: Path, fallback: Any) -> Any:
    return json.loads(path.read_text()) if path.exists() else fallback


def slugify(value: str) -> str:
    value = value.lower().strip().replace("*", "")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return re.sub(r"-+", "-", value).strip("-")


def ts_slugs(path: Path) -> list[str]:
    if not path.exists():
        return []
    return list(dict.fromkeys(re.findall(r'slug:\s*"([^"]+)"', path.read_text())))


def ts_slugs_after(path: Path, marker: str) -> list[str]:
    if not path.exists():
        return []
    source = path.read_text().split(marker, 1)[-1]
    return list(dict.fromkeys(re.findall(r'slug:\s*"([^"]+)"', source)))


def category_slugs() -> list[str]:
    source = (DATA_DIR / "offers.ts").read_text()
    category_source = source.split("type SeedOffer", 1)[0]
    return list(dict.fromkeys(re.findall(r'slug:\s*"([^"]+)"', category_source)))


def state_page_slugs() -> list[str]:
    source = (DATA_DIR / "statePages.ts").read_text()
    slugs = re.findall(r'statePage\("([^"]+)"', source)
    return list(dict.fromkeys(slugs))


def sitemap_urls() -> list[str]:
    candidates = [
        ROOT / "public" / "sitemap.xml",
        ROOT / ".next" / "server" / "app" / "sitemap.xml.body",
    ]
    xml_text = ""
    for candidate in candidates:
        if candidate.exists():
            xml_text = candidate.read_text()
            break
    if not xml_text:
        try:
            request = urllib.request.Request(
                f"{SITE_URL}/sitemap.xml",
                headers={"User-Agent": "OfferRadar-URL-Inventory/1.0"},
            )
            with urllib.request.urlopen(request, timeout=15) as response:
                xml_text = response.read().decode("utf-8")
        except OSError:
            return []

    root = ET.fromstring(xml_text)
    return [
        loc.text.strip()
        for loc in root.findall(".//{*}loc")
        if loc.text and loc.text.strip().startswith(SITE_URL)
    ]


def route_sources() -> dict[str, str]:
    routes = {route or "/": "static" for route in STATIC_ROUTES}
    offers = read_json(DATA_DIR / "offers.json", [])
    provider_slugs = ts_slugs(DATA_DIR / "providers.ts")
    generated = set()
    generated.update(f"/{slug}" for slug in category_slugs())
    generated.update(f"/offer/{offer['slug']}" for offer in offers)
    generated.update(f"/provider/{slug}" for slug in provider_slugs)
    generated.update(
        f"/compare/{first}-vs-{second}"
        for first, second in itertools.combinations(provider_slugs, 2)
    )
    generated.update(f"/guides/{slug}" for slug in ts_slugs(DATA_DIR / "guidePages.ts"))
    generated.update(f"/{slug}" for slug in state_page_slugs())
    generated.update(f"/{slug}" for slug in ts_slugs(DATA_DIR / "offerTypePages.ts"))
    generated.update(
        f"/{slug}"
        for slug in ts_slugs_after(DATA_DIR / "localSeo.ts", "export const localSeoPages")
    )
    for route in generated:
        routes.setdefault(route, "generated")
    for url in sitemap_urls():
        path = url.removeprefix(SITE_URL) or "/"
        routes.setdefault(path, "sitemap")
    return routes


def route_type(path: str, state_slugs: set[str]) -> str:
    slug = path.removeprefix("/")
    if path == "/":
        return "homepage"
    if path.startswith("/provider/"):
        return "provider"
    if path.startswith("/offer/"):
        return "offer"
    if path.startswith("/compare/"):
        return "comparison"
    if path.startswith("/guides/"):
        return "guide"
    if slug in state_slugs:
        return "state"
    if slug.startswith("best-"):
        return "best-of"
    if slug in category_slugs():
        return "category"
    return "other"


def monetization_for_record(
    path: str,
    kind: str,
    registry_by_slug: dict[str, dict[str, Any]],
    offers_by_slug: dict[str, dict[str, Any]],
) -> str:
    record = None
    if kind == "provider":
        record = registry_by_slug.get(path.rsplit("/", 1)[-1])
    elif kind == "offer":
        offer = offers_by_slug.get(path.rsplit("/", 1)[-1], {})
        provider_name = offer.get("provider", "").lower()
        record = next(
            (item for item in registry_by_slug.values() if item["provider"].lower() == provider_name),
            None,
        )
    if record:
        if record.get("linkStatus") == "ready" and (record.get("referralUrl") or record.get("affiliateUrl")):
            return "monetized"
        if record.get("linkStatus") == "official_only" or record.get("officialOfferUrl"):
            return "official_only"
        return "needs_link"
    if kind == "other" and path in POLICY_PATHS:
        return "not_applicable"
    if kind in {"category", "best-of", "comparison", "other"}:
        return "needs_link"
    return "not_applicable"


def priority_for_record(path: str, kind: str, registry_by_slug: dict[str, dict[str, Any]], offers_by_slug: dict[str, dict[str, Any]]) -> str:
    if path in CRITICAL_PATHS:
        return "critical"
    if kind == "provider":
        return registry_by_slug.get(path.rsplit("/", 1)[-1], {}).get("monetizationPriority", "high")
    if kind == "offer":
        offer = offers_by_slug.get(path.rsplit("/", 1)[-1], {})
        return "high" if offer.get("featured") or offer.get("status") == "active" else "medium"
    if kind in {"category", "guide", "best-of"}:
        return "high"
    if kind in {"comparison", "state"}:
        return "medium"
    if kind == "other" and path not in POLICY_PATHS:
        return "high"
    return "low"


def source_text() -> str:
    parts = []
    for folder in [ROOT / "app", ROOT / "components", DATA_DIR]:
        for path in folder.rglob("*"):
            if path.name == "urlInventory.json":
                continue
            if path.suffix in {".tsx", ".ts", ".json"}:
                parts.append(path.read_text())
    return "\n".join(parts)


def provider_and_offer_count(
    path: str,
    kind: str,
    provider_names: dict[str, str],
    provider_offer_counts: Counter[str],
    offers_by_slug: dict[str, dict[str, Any]],
    category_offer_counts: Counter[str],
) -> tuple[str | None, int]:
    if kind == "provider":
        slug = path.rsplit("/", 1)[-1]
        return provider_names.get(slug), provider_offer_counts.get(slug, 0)
    if kind == "offer":
        offer = offers_by_slug.get(path.rsplit("/", 1)[-1], {})
        return offer.get("provider") or None, 1 if offer else 0
    if kind == "comparison":
        pair = path.removeprefix("/compare/")
        first_slug, separator, second_slug = pair.partition("-vs-")
        if separator:
            names = [provider_names.get(first_slug), provider_names.get(second_slug)]
            provider = " vs ".join(name for name in names if name) or None
            return provider, provider_offer_counts.get(first_slug, 0) + provider_offer_counts.get(second_slug, 0)
    if kind == "category":
        return None, category_offer_counts.get(path.removeprefix("/"), 0)
    return None, 0


def last_reviewed_for_record(
    old: dict[str, Any],
    kind: str,
    path: str,
    registry_by_slug: dict[str, dict[str, Any]],
    offers_by_slug: dict[str, dict[str, Any]],
    latest_offer_review: str | None,
) -> str | None:
    if old.get("lastReviewed"):
        return old["lastReviewed"]
    if kind == "provider":
        return registry_by_slug.get(path.rsplit("/", 1)[-1], {}).get("lastReviewed")
    if kind == "offer":
        return offers_by_slug.get(path.rsplit("/", 1)[-1], {}).get("lastVerified")
    return latest_offer_review


def generate_inventory() -> list[dict[str, Any]]:
    previous = {item["url"]: item for item in read_json(OUTPUT_PATH, [])}
    registry = read_json(DATA_DIR / "linkRegistry.json", [])
    offers = read_json(DATA_DIR / "offers.json", [])
    registry_by_slug = {item["slug"]: item for item in registry}
    offers_by_slug = {item["slug"]: item for item in offers}
    provider_names = {item["slug"]: item["provider"] for item in registry}
    provider_offer_counts = Counter(slugify(offer.get("provider", "")) for offer in offers)
    category_offer_counts = Counter(offer.get("category", "") for offer in offers)
    state_slugs = set(state_page_slugs())
    all_source = source_text()
    latest_offer_review = max((offer.get("lastVerified", "") for offer in offers), default="") or None
    inventory = []

    for path, source in sorted(route_sources().items()):
        url = SITE_URL if path == "/" else f"{SITE_URL}{path}"
        old = previous.get(url, {})
        kind = route_type(path, state_slugs)
        previous_notes = old.get("notes", "")
        provider, offer_count = provider_and_offer_count(
            path,
            kind,
            provider_names,
            provider_offer_counts,
            offers_by_slug,
            category_offer_counts,
        )
        inventory.append(
            {
                "url": url,
                "path": path,
                "type": kind,
                "provider": provider,
                "offerCount": offer_count,
                "priority": priority_for_record(path, kind, registry_by_slug, offers_by_slug),
                "monetizationStatus": monetization_for_record(path, kind, registry_by_slug, offers_by_slug),
                "indexingStatus": old.get("indexingStatus", "unknown"),
                "lastReviewed": last_reviewed_for_record(
                    old,
                    kind,
                    path,
                    registry_by_slug,
                    offers_by_slug,
                    latest_offer_review,
                ),
                "internalLinkCountEstimate": 0 if path == "/" else len(re.findall(re.escape(path), all_source)),
                "lastChecked": old.get("lastChecked"),
                "lastSubmitted": old.get("lastSubmitted"),
                "source": source,
                "notes": (
                    previous_notes
                    if previous_notes and not previous_notes.startswith("Generated ")
                    else f"Generated {kind} route; verify indexing status manually."
                ),
            }
        )
    return inventory


def main() -> int:
    inventory = generate_inventory()
    OUTPUT_PATH.write_text(json.dumps(inventory, indent=2) + "\n")
    by_type: dict[str, int] = {}
    for item in inventory:
        by_type[item["type"]] = by_type.get(item["type"], 0) + 1
    print(f"Wrote {len(inventory)} URL records to {OUTPUT_PATH.relative_to(ROOT)}.")
    print("Types: " + ", ".join(f"{key}={value}" for key, value in sorted(by_type.items())))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
