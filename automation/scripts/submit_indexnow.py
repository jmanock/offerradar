#!/usr/bin/env python3
"""Submit OfferRadar URLs to Bing IndexNow, dry-run by default."""

from __future__ import annotations

import argparse
import json
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
HOST = "offerradar.io"
KEY = "fbd66d1bed94486a87683b0b5f029153"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
INDEXNOW_ENDPOINT = "https://www.bing.com/indexnow"
DEFAULT_SITEMAP_CANDIDATES = [
    ROOT / "public" / "sitemap.xml",
    ROOT / ".next" / "server" / "app" / "sitemap.xml.body",
]


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


def read_url(url: str) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": "OfferRadar-IndexNow/1.0"})
    with urllib.request.urlopen(request, timeout=20) as response:
        return response.read().decode("utf-8")


def extract_urls(sitemap_xml: str) -> list[str]:
    root = ET.fromstring(sitemap_xml)
    urls: list[str] = []
    for loc in root.findall(".//{*}loc"):
        if loc.text:
            url = loc.text.strip()
            if url.startswith(f"https://{HOST}"):
                urls.append(url)
    return sorted(dict.fromkeys(urls))


def build_payload(urls: list[str]) -> dict[str, object]:
    return {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }


def submit_payload(payload: dict[str, object]) -> None:
    body = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        INDEXNOW_ENDPOINT,
        data=body,
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


def main() -> int:
    parser = argparse.ArgumentParser(description="Submit OfferRadar sitemap URLs to Bing IndexNow.")
    parser.add_argument(
        "--sitemap",
        help="Path or URL for sitemap XML. Defaults to local build output, then live sitemap.",
    )
    parser.add_argument("--limit", type=int, help="Limit the number of sitemap URLs processed.")
    parser.add_argument("--submit", action="store_true", help="Submit URLs to Bing IndexNow.")
    args = parser.parse_args()

    if args.limit is not None and args.limit < 1:
        raise SystemExit("--limit must be greater than zero")

    source, sitemap_xml = read_sitemap_source(args.sitemap)
    urls = extract_urls(sitemap_xml)
    if args.limit:
        urls = urls[: args.limit]

    if not urls:
        raise SystemExit("No offerradar.io URLs found in sitemap.")

    payload = build_payload(urls)
    mode = "SUBMIT" if args.submit else "DRY RUN"
    print(f"IndexNow mode: {mode}")
    print(f"Sitemap source: {source}")
    print(f"URL count: {len(urls)}")
    print(f"Key location: {KEY_LOCATION}")

    if not args.submit:
        print("URLs that would be submitted:")
        for url in urls:
            print(url)
        return 0

    submit_payload(payload)
    print("IndexNow submission complete.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except ET.ParseError as error:
        print(f"Could not parse sitemap XML: {error}", file=sys.stderr)
        raise SystemExit(1) from error
    except OSError as error:
        print(f"Could not read sitemap source: {error}", file=sys.stderr)
        raise SystemExit(1) from error
    except RuntimeError as error:
        print(str(error), file=sys.stderr)
        raise SystemExit(1) from error
