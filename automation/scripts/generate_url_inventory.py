#!/usr/bin/env python3
"""Generate the OfferRadar URL inventory from local route data and sitemap output."""

from __future__ import annotations

import itertools
import json
import re
import urllib.request
import xml.etree.ElementTree as ET
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


def read_json(path: Path, fallback: Any) -> Any:
    return json.loads(path.read_text()) if path.exists() else fallback


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


def route_type(path: str, state_slugs: set[str], intent_slugs: set[str], local_slugs: set[str]) -> str:
    slug = path.removeprefix("/")
    if path == "/":
        return "home"
    if path.startswith("/provider/"):
        return "provider"
    if path.startswith("/offer/"):
        return "offer"
    if path.startswith("/compare/"):
        return "compare"
    if path.startswith("/guides/"):
        return "guide"
    if slug in state_slugs:
        return "state"
    if slug in intent_slugs:
        return "intent"
    if slug in local_slugs:
        return "intent"
    if slug in category_slugs():
        return "category"
    if path in {"/about", "/disclosures", "/editorial-policy", "/advertising-disclosure", "/privacy-policy", "/terms-of-use", "/contact"}:
        return "policy"
    return "static"


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
    if kind in {"category", "intent", "compare"}:
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
    if kind in {"category", "guide", "intent"}:
        return "high"
    if kind in {"compare", "state"}:
        return "medium"
    return "low"


def generate_inventory() -> list[dict[str, Any]]:
    previous = {item["url"]: item for item in read_json(OUTPUT_PATH, [])}
    registry = read_json(DATA_DIR / "linkRegistry.json", [])
    offers = read_json(DATA_DIR / "offers.json", [])
    registry_by_slug = {item["slug"]: item for item in registry}
    offers_by_slug = {item["slug"]: item for item in offers}
    state_slugs = set(state_page_slugs())
    intent_slugs = set(ts_slugs(DATA_DIR / "offerTypePages.ts"))
    local_slugs = set(
        ts_slugs_after(DATA_DIR / "localSeo.ts", "export const localSeoPages")
    )
    inventory = []

    for path, source in sorted(route_sources().items()):
        url = SITE_URL if path == "/" else f"{SITE_URL}{path}"
        old = previous.get(url, {})
        kind = route_type(path, state_slugs, intent_slugs, local_slugs)
        inventory.append(
            {
                "url": url,
                "path": path,
                "type": kind,
                "priority": priority_for_record(path, kind, registry_by_slug, offers_by_slug),
                "monetizationStatus": monetization_for_record(path, kind, registry_by_slug, offers_by_slug),
                "indexingStatus": old.get("indexingStatus", "unknown"),
                "lastChecked": old.get("lastChecked"),
                "lastSubmitted": old.get("lastSubmitted"),
                "source": source,
                "notes": old.get("notes") or f"Generated {kind} route; verify indexing status manually.",
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
