#!/usr/bin/env python3
"""Audit the controlled affiliate registry, placement map, and public integration."""
from __future__ import annotations

import argparse
import csv
import json
import urllib.error
import urllib.request
from collections import Counter, defaultdict
from datetime import date, datetime, timezone
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).resolve().parents[2]
REGISTRY = ROOT / "data/affiliateRegistry.json"
PLACEMENT_MAP = ROOT / "data/affiliatePlacementMap.csv"
EXPECTED = {
    "hellosafe-travel-insurance": {"gid": "610091", "mid": "128757", "awinaffid": "2935515", "linkid": "4837486", "host": "hellosafe.com"},
    "hellosafe-card-insurance-checker": {"gid": "610148", "mid": "128757", "awinaffid": "2935515", "linkid": "4837754", "host": "hellosafe.com"},
    "esimshop": {"gid": "600694", "mid": "124780", "awinaffid": "2935515", "linkid": "4730960", "host": "h5.esimshop.org"},
    "kitco": {"gid": "493731", "mid": "84579", "awinaffid": "2935515", "linkid": "3675184", "host": "online.kitco.com"},
    "unest-app": {"gid": "513309", "mid": "114220", "awinaffid": "2935515", "linkid": "4024345", "host": "www.unest.co"},
}
SEARCH_TERMS = ("awin1.com", "awclick.php", "awinaffid", "affiliateUrl", "sponsored")
SOURCE_SUFFIXES = {".ts", ".tsx", ".js", ".jsx", ".md", ".json", ".csv", ".py"}


def finding(status: str, item: str, message: str) -> dict[str, str]:
    return {"status": status, "id": item, "message": message}


def normalize_route(value: str) -> str:
    route = (value or "/").split("?", 1)[0].split("#", 1)[0].rstrip("/")
    return route or "/"


def route_matches(route: str, candidate: str) -> bool:
    route, candidate = normalize_route(route), normalize_route(candidate)
    return route == candidate or route.startswith(candidate + "/")


def route_allowed(entry: dict, route: str) -> bool:
    allowed = any(route_matches(route, value) for value in entry.get("allowedRoutes", []))
    prohibited = any(route_matches(route, value) for value in entry.get("prohibitedRoutes", []))
    return allowed and not prohibited


def check_destination(url: str, expected_host: str) -> dict:
    request = urllib.request.Request(url, headers={"User-Agent": "OfferRadarLinkAudit/2.0"})
    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            parsed = urlparse(response.geturl())
            destination = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
            suspicious = parsed.hostname != expected_host
            return {"status": response.status, "destination": destination, "redirectStatus": "needs-review" if suspicious else "pass", "note": "Unexpected final host." if suspicious else ""}
    except urllib.error.HTTPError as error:
        return {"status": error.code, "destination": error.geturl().split("?", 1)[0], "redirectStatus": "needs-review", "note": "HTTP failure; review manually before changing campaign state."}
    except Exception as error:  # A temporary network failure must never disable a campaign.
        return {"status": None, "destination": "", "redirectStatus": "needs-review", "note": f"Temporary destination check failure: {type(error).__name__}."}


def repository_references() -> dict[str, list[str]]:
    references: dict[str, list[str]] = {term: [] for term in SEARCH_TERMS}
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix not in SOURCE_SUFFIXES:
            continue
        if any(part in {"node_modules", ".next", ".git", "reports"} for part in path.parts):
            continue
        if path == Path(__file__) or "automation/reports" in path.as_posix():
            continue
        try:
            lines = path.read_text(encoding="utf-8").splitlines()
        except UnicodeDecodeError:
            continue
        for line_number, line in enumerate(lines, start=1):
            for term in SEARCH_TERMS:
                if term.lower() in line.lower():
                    references[term].append(f"{path.relative_to(ROOT)}:{line_number}")
    return references


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check-destinations", action="store_true")
    args = parser.parse_args()

    entries = json.loads(REGISTRY.read_text(encoding="utf-8"))
    with PLACEMENT_MAP.open(newline="", encoding="utf-8-sig") as handle:
        placements = list(csv.DictReader(handle))

    findings: list[dict[str, str]] = []
    ids = [entry.get("id", "") for entry in entries]
    duplicate_ids = [item for item, count in Counter(ids).items() if item and count > 1]
    for item in duplicate_ids:
        findings.append(finding("critical", item, "Duplicate registry ID."))

    by_id = {entry.get("id"): entry for entry in entries}
    for missing in EXPECTED.keys() - by_id.keys():
        findings.append(finding("critical", missing, "Required registry entry is missing."))

    active_placements = defaultdict(list)
    for placement in placements:
        item = placement.get("affiliate_id", "")
        route = placement.get("page", "")
        entry = by_id.get(item)
        if not entry:
            findings.append(finding("critical", item or "missing-id", f"Placement {route} refers to a missing registry entry."))
            continue
        if not route_allowed(entry, route):
            findings.append(finding("critical", item, f"Placement route is not permitted: {route}."))
        if placement.get("status") == "active":
            active_placements[item].append(route)
            if entry.get("status") != "active" or entry.get("approved") is not True:
                findings.append(finding("critical", item, f"Active public placement uses a non-active or unapproved entry: {route}."))
        elif placement.get("status") == "pending-review" and entry.get("status") == "active":
            findings.append(finding("warning", item, "Pending placement references an active entry; confirm intended state."))

    destination_checks = {}
    for entry in entries:
        item = entry.get("id", "unknown")
        affiliate_url = entry.get("affiliateUrl", "")
        if not affiliate_url:
            findings.append(finding("critical", item, "Affiliate URL is missing."))
            continue
        parsed = urlparse(affiliate_url)
        query = parse_qs(parsed.query, keep_blank_values=True)
        if parsed.scheme != "https" or parsed.hostname != "www.awin1.com" or parsed.path != "/awclick.php":
            findings.append(finding("critical", item, "Affiliate URL does not match the approved HTTPS AWIN endpoint."))
        for key in ("gid", "mid", "awinaffid", "linkid"):
            if not query.get(key, [""])[0]:
                findings.append(finding("critical", item, f"Missing AWIN parameter: {key}."))
            elif query.get(key, [""])[0] != EXPECTED.get(item, {}).get(key):
                findings.append(finding("critical", item, f"Approved AWIN parameter changed: {key}."))
        if "clickref" not in query:
            findings.append(finding("critical", item, "Affiliate URL is missing the clickref parameter."))
        if not entry.get("disclosureRequired"):
            findings.append(finding("critical", item, "Disclosure metadata is missing or disabled."))
        if not entry.get("officialUrl"):
            findings.append(finding("warning", item, "No official fallback URL is stored."))
        if entry.get("status") == "active" and entry.get("approved") is True and not active_placements[item]:
            findings.append(finding("critical", item, "Active registry entry has no active placement-map row."))
        if entry.get("status") != "active" or entry.get("approved") is not True:
            findings.append(finding("needs-review", item, "Campaign remains non-public until manual approval and status checks are complete."))
        overlap = set(entry.get("allowedRoutes", [])) & set(entry.get("prohibitedRoutes", []))
        if overlap:
            findings.append(finding("critical", item, f"Allowed/prohibited route overlap: {sorted(overlap)}"))
        if args.check_destinations:
            destination_checks[item] = check_destination(affiliate_url, EXPECTED.get(item, {}).get("host", ""))
            if destination_checks[item]["redirectStatus"] != "pass":
                findings.append(finding("needs-review", item, destination_checks[item]["note"] or "Redirect requires review."))

    references = repository_references()
    for location in references["awin1.com"]:
        relative_path, line_number = location.rsplit(":", 1)
        source_line = (ROOT / relative_path).read_text(encoding="utf-8").splitlines()[int(line_number) - 1]
        if "https://www.awin1.com/awclick" in source_line and not location.startswith("data/affiliateRegistry.json:"):
            findings.append(finding("critical", "hardcoded-link", f"Raw AWIN URL exists outside the central registry: {location}."))

    integration_sources = {
        "link": (ROOT / "components/AffiliateLink.tsx").read_text(encoding="utf-8"),
        "featured": (ROOT / "components/FeaturedPartnerOffers.tsx").read_text(encoding="utf-8"),
        "article": (ROOT / "app/research/[slug]/page.tsx").read_text(encoding="utf-8"),
        "researchData": (ROOT / "data/researchArticles.ts").read_text(encoding="utf-8"),
        "tools": (ROOT / "app/tools/page.tsx").read_text(encoding="utf-8"),
    }
    link_source = integration_sources["link"]
    for token in ("affiliate_click", "official_provider_click", "partner_tool_click", "affiliate_id", "source_page", "placement", "clickref"):
        if token not in link_source:
            findings.append(finding("critical", "analytics", f"AffiliateLink is missing analytics token: {token}."))
    if "sponsored nofollow noopener noreferrer" not in link_source:
        findings.append(finding("critical", "rel", "Affiliate links are missing the required sponsored relationship attributes."))
    if "AffiliateDisclosure" not in integration_sources["featured"] or "AffiliateDisclosure" not in integration_sources["article"]:
        findings.append(finding("critical", "disclosure", "A public affiliate template is missing its disclosure component."))
    for entry in entries:
        if entry.get("status") == "active" and entry.get("approved") is True:
            continue
        item = entry.get("id", "")
        for source_name in ("researchData", "tools"):
            if item and item in integration_sources[source_name]:
                findings.append(finding("critical", item, f"Pending or disabled entry appears in public {source_name} source."))

    status_counts = Counter(item["status"] for item in findings)
    passed = status_counts["critical"] == 0
    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "overallStatus": "pass-with-review" if passed and findings else "pass" if passed else "critical",
        "registryEntries": len(entries),
        "placementRows": len(placements),
        "statusCounts": dict(status_counts),
        "activePlacements": dict(active_placements),
        "destinationChecks": destination_checks,
        "repositoryReferences": references,
        "findings": findings,
        "passed": passed,
    }

    reports = ROOT / "reports"
    reports.mkdir(exist_ok=True)
    (reports / "latest-affiliate-link-audit.json").write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    lines = [
        "# Affiliate Link Audit",
        f"Generated: {date.today().isoformat()}",
        "",
        f"Status: {payload['overallStatus'].upper()}",
        f"Registry entries: {len(entries)}",
        f"Placement rows: {len(placements)}",
        "",
        "## Findings",
    ]
    lines += [f"- **{item['status'].upper()}** `{item['id']}`: {item['message']}" for item in findings] or ["- No findings."]
    lines += ["", "## Destination Checks", "A temporary HTTP failure is a review flag only; the audit never removes or disables a link."]
    lines += [f"- `{key}`: {value['status'] or 'unavailable'} -> {value['destination'] or 'not resolved'} ({value['redirectStatus']})" for key, value in destination_checks.items()] or ["- Not requested."]
    lines += ["", "## Repository Search References", "Raw AWIN URLs are permitted only in `data/affiliateRegistry.json`. The separate provider monetization registry retains empty `affiliateUrl` fields for backward-compatible provider workflows."]
    for term, locations in references.items():
        lines.append(f"### `{term}`")
        lines += [f"- `{location}`" for location in locations] or ["- No matches."]
    (reports / "latest-affiliate-link-audit.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Affiliate audit: {payload['overallStatus'].upper()} ({len(entries)} entries, {len(placements)} placements, {len(findings)} findings)")
    return 0 if passed else 1


if __name__ == "__main__":
    raise SystemExit(main())
