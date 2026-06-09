#!/usr/bin/env python3
"""Select and optionally submit OfferRadar URLs to Bing IndexNow."""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
HOST = "offerradar.io"
KEY = "fbd66d1bed94486a87683b0b5f029153"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
INDEXNOW_ENDPOINT = "https://www.bing.com/indexnow"
INVENTORY_PATH = ROOT / "data" / "urlInventory.json"
JSON_REPORT = ROOT / "automation" / "reports" / "latest-indexnow-report.json"
MD_REPORT = ROOT / "automation" / "reports" / "latest-indexnow-report.md"
LEGACY_JSON_REPORT = ROOT / "automation" / "reports" / "latest-indexnow-dry-run.json"
LEGACY_MD_REPORT = ROOT / "automation" / "reports" / "latest-indexnow-dry-run.md"
DEFAULT_SITEMAP_CANDIDATES = [
    ROOT / "public" / "sitemap.xml",
    ROOT / ".next" / "server" / "app" / "sitemap.xml.body",
]
PRIORITIES = {"critical", "high", "medium", "low"}
FILTER_TYPES = {
    "homepage",
    "offer",
    "provider",
    "comparison",
    "guide",
    "category",
    "state",
    "best-of",
    "other",
}


def read_url(url: str) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": "OfferRadar-IndexNow/1.0"})
    with urllib.request.urlopen(request, timeout=20) as response:
        return response.read().decode("utf-8")


def read_sitemap_source(path_or_url: str | None) -> tuple[str, str]:
    if path_or_url:
        if path_or_url.startswith(("http://", "https://")):
            return path_or_url, read_url(path_or_url)
        path = Path(path_or_url)
        if not path.is_absolute():
            path = ROOT / path
        return str(path), path.read_text()
    for candidate in DEFAULT_SITEMAP_CANDIDATES:
        if candidate.exists():
            return str(candidate), candidate.read_text()
    live_sitemap = f"https://{HOST}/sitemap.xml"
    return live_sitemap, read_url(live_sitemap)


def extract_urls(sitemap_xml: str) -> list[str]:
    root = ET.fromstring(sitemap_xml)
    return sorted(
        dict.fromkeys(
            loc.text.strip()
            for loc in root.findall(".//{*}loc")
            if loc.text and loc.text.strip().startswith(f"https://{HOST}")
        )
    )


def load_inventory() -> list[dict[str, Any]]:
    return json.loads(INVENTORY_PATH.read_text()) if INVENTORY_PATH.exists() else []


def changed_files() -> list[str]:
    result = subprocess.run(
        ["git", "diff", "--name-only", "HEAD"],
        cwd=ROOT,
        check=False,
        text=True,
        capture_output=True,
    )
    return [line.strip() for line in result.stdout.splitlines() if line.strip()]


def record_matches_changed_files(record: dict[str, Any], files: list[str]) -> bool:
    path = record["path"]
    kind = record["type"]
    for file in files:
        if file in {"app/layout.tsx", "components/Header.tsx", "components/Footer.tsx"}:
            return record["priority"] in {"critical", "high"}
        if file == "app/page.tsx" and path == "/":
            return True
        if file.startswith("app/offers") and path == "/offers":
            return True
        if file.startswith("app/providers") and path == "/providers":
            return True
        if file.startswith("app/provider") and kind == "provider":
            return True
        if file.startswith("app/offer") and kind == "offer":
            return True
        if file.startswith("app/compare") and kind == "comparison":
            return True
        if file.startswith("app/guides") and kind == "guide":
            return True
        if file in {"data/offers.json", "data/offers.ts", "lib/offerData.ts"} and kind in {"offer", "category", "best-of", "other"}:
            return True
        if file in {"data/providers.ts", "data/linkRegistry.json", "data/linkRegistry.ts"} and kind in {"provider", "comparison"}:
            return True
        if file == "data/guidePages.ts" and kind == "guide":
            return True
        if file == "data/statePages.ts" and kind == "state":
            return True
        if file in {"data/offerTypePages.ts", "data/localSeo.ts"} and kind in {"best-of", "other"}:
            return True
    return False


def select_urls(
    sitemap: str | None,
    priorities: set[str],
    types: set[str],
    changed_only: bool,
) -> tuple[list[str], str, list[str]]:
    inventory = load_inventory()
    files = changed_files() if changed_only else []
    if inventory:
        selected = [
            record
            for record in inventory
            if (not priorities or record["priority"] in priorities)
            and (not types or record["type"] in types)
            and (not changed_only or record_matches_changed_files(record, files))
        ]
        return sorted(record["url"] for record in selected), str(INVENTORY_PATH), files
    source, sitemap_xml = read_sitemap_source(sitemap)
    return extract_urls(sitemap_xml), source, files


def build_payload(urls: list[str]) -> dict[str, object]:
    return {"host": HOST, "key": KEY, "keyLocation": KEY_LOCATION, "urlList": urls}


def submit_payload(payload: dict[str, object]) -> None:
    request = urllib.request.Request(
        INDEXNOW_ENDPOINT,
        data=json.dumps(payload).encode("utf-8"),
        method="POST",
        headers={"Content-Type": "application/json; charset=utf-8"},
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            print(f"IndexNow response: {response.status} {response.reason}")
            response_body = response.read().decode("utf-8").strip()
            if response_body:
                print(response_body)
    except urllib.error.HTTPError as error:
        details = error.read().decode("utf-8", errors="replace").strip()
        raise RuntimeError(f"IndexNow HTTP {error.code}: {details or error.reason}") from error


def mark_urls_submitted(urls: list[str]) -> None:
    inventory = load_inventory()
    if not inventory:
        return
    selected = set(urls)
    submitted_at = datetime.now(timezone.utc).isoformat()
    for record in inventory:
        if record["url"] in selected:
            record["indexingStatus"] = "submitted"
            record["lastSubmitted"] = submitted_at
    INVENTORY_PATH.write_text(json.dumps(inventory, indent=2) + "\n")
    print(f"Updated submission status in {INVENTORY_PATH.relative_to(ROOT)}")


def write_dry_run_report(
    urls: list[str],
    source: str,
    priorities: set[str],
    types: set[str],
    changed_only: bool,
    files: list[str],
) -> None:
    report = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "mode": "dry_run",
        "source": source,
        "urlCount": len(urls),
        "filters": {
            "priorities": sorted(priorities),
            "types": sorted(types),
            "changedOnly": changed_only,
        },
        "changedFiles": files,
        "urls": urls,
    }
    JSON_REPORT.write_text(json.dumps(report, indent=2) + "\n")
    lines = [
        "# OfferRadar IndexNow Dry Run",
        "",
        f"Generated: {report['generatedAt']}",
        f"Source: `{source}`",
        f"URL count: {len(urls)}",
        f"Priorities: {', '.join(sorted(priorities)) or 'all'}",
        f"Types: {', '.join(sorted(types)) or 'all'}",
        f"Changed only: {'yes' if changed_only else 'no'}",
        "",
        "## URLs",
        "",
        *[f"- {url}" for url in urls],
    ]
    MD_REPORT.write_text("\n".join(lines) + "\n")
    LEGACY_JSON_REPORT.write_text(JSON_REPORT.read_text())
    LEGACY_MD_REPORT.write_text(MD_REPORT.read_text())


def main() -> int:
    parser = argparse.ArgumentParser(description="Submit OfferRadar URLs to Bing IndexNow.")
    parser.add_argument("--sitemap", help="Fallback sitemap path or URL.")
    parser.add_argument("--limit", type=int, help="Limit URLs after filtering.")
    parser.add_argument("--submit", action="store_true", help="Actually submit selected URLs.")
    parser.add_argument("--changed-only", action="store_true", help="Select URLs related to git-changed files.")
    parser.add_argument("--priority", action="append", choices=sorted(PRIORITIES), default=[], help="Filter by inventory priority.")
    parser.add_argument("--type", action="append", choices=sorted(FILTER_TYPES), default=[], help="Filter by inventory type.")
    args = parser.parse_args()
    if args.limit is not None and args.limit < 1:
        raise SystemExit("--limit must be greater than zero")

    priorities = set(args.priority)
    types = set(args.type)
    urls, source, files = select_urls(args.sitemap, priorities, types, args.changed_only)
    if args.limit:
        urls = urls[: args.limit]

    mode = "SUBMIT" if args.submit else "DRY RUN"
    print(f"IndexNow mode: {mode}")
    print(f"Selection source: {source}")
    print(f"URL count: {len(urls)}")
    print(f"Key location: {KEY_LOCATION}")
    if args.changed_only:
        print(f"Changed files considered: {len(files)}")

    if not args.submit:
        write_dry_run_report(urls, source, priorities, types, args.changed_only, files)
        print("URLs that would be submitted:")
        for url in urls:
            print(url)
        print(f"Wrote {JSON_REPORT.relative_to(ROOT)}")
        print(f"Wrote {MD_REPORT.relative_to(ROOT)}")
        return 0

    if not urls:
        raise SystemExit("No URLs selected for IndexNow submission.")
    submit_payload(build_payload(urls))
    mark_urls_submitted(urls)
    print("IndexNow submission complete.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except ET.ParseError as error:
        print(f"Could not parse sitemap XML: {error}", file=sys.stderr)
        raise SystemExit(1) from error
    except OSError as error:
        print(f"Could not read URL source: {error}", file=sys.stderr)
        raise SystemExit(1) from error
    except RuntimeError as error:
        print(str(error), file=sys.stderr)
        raise SystemExit(1) from error
