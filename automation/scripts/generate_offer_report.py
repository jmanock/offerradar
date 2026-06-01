#!/usr/bin/env python3
"""Generate a local OfferRadar automation report."""

from __future__ import annotations

import argparse
import html
import json
from collections import Counter
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

from validate_offers import validate_offers

ROOT = Path(__file__).resolve().parents[2]
DATA_PATH = ROOT / "data" / "offers.json"
CHANGES_PATH = ROOT / "automation" / "reports" / "latest-offer-changes.json"
REPORT_MD_PATH = ROOT / "automation" / "reports" / "latest-offer-report.md"
REPORT_HTML_PATH = ROOT / "automation" / "reports" / "latest-offer-report.html"


def load_json(path: Path, fallback: Any) -> Any:
    if not path.exists():
        return fallback
    return json.loads(path.read_text())


def offer_date(value: str) -> datetime | None:
    try:
        return datetime.strptime(value, "%Y-%m-%d").replace(tzinfo=timezone.utc)
    except (TypeError, ValueError):
        return None


def build_summary() -> dict[str, Any]:
    offers = load_json(DATA_PATH, [])
    changes = load_json(
        CHANGES_PATH,
        {"summary": {"added": 0, "removed": 0, "fieldChanges": 0}, "changedOffers": []},
    )
    validation = validate_offers()
    now = datetime.now(timezone.utc)
    status_counts = Counter(offer.get("status", "unknown") for offer in offers)
    category_counts = Counter(offer.get("category", "unknown") for offer in offers)
    provider_counts = Counter(offer.get("provider", "unknown") for offer in offers)

    recently_verified = sorted(
        offers,
        key=lambda offer: offer.get("lastVerified", ""),
        reverse=True,
    )[:10]

    expiring_soon = []
    for offer in offers:
        expiration = offer_date(offer.get("expirationDate", ""))
        if expiration and now <= expiration <= now + timedelta(days=45):
            expiring_soon.append(offer)
    expiring_soon.sort(key=lambda offer: offer.get("expirationDate", ""))

    return {
        "generatedAt": now.isoformat(),
        "totalOffers": len(offers),
        "activeOffers": status_counts.get("active", 0),
        "expiredOffers": status_counts.get("expired", 0),
        "watchingOffers": status_counts.get("watching", 0),
        "categories": dict(sorted(category_counts.items())),
        "providers": dict(sorted(provider_counts.items())),
        "recentlyVerified": recently_verified,
        "expiringSoon": expiring_soon[:10],
        "changes": changes,
        "validation": validation,
    }


def render_markdown(summary: dict[str, Any]) -> str:
    validation_status = "passed" if summary["validation"]["valid"] else "failed"
    lines = [
        "# OfferRadar Automation Report",
        "",
        f"Generated: {summary['generatedAt']}",
        "",
        "## Summary",
        "",
        f"- Total offers: {summary['totalOffers']}",
        f"- Active offers: {summary['activeOffers']}",
        f"- Expired offers: {summary['expiredOffers']}",
        f"- Watching offers: {summary['watchingOffers']}",
        f"- Validation status: {validation_status}",
        "",
        "## Categories",
        "",
    ]
    lines.extend(f"- {category}: {count}" for category, count in summary["categories"].items())
    lines.extend(["", "## Providers", ""])
    lines.extend(f"- {provider}: {count}" for provider, count in summary["providers"].items())
    lines.extend(["", "## Recently Verified", ""])
    lines.extend(
        f"- {offer.get('lastVerified')}: {offer.get('provider')} - {offer.get('title')}"
        for offer in summary["recentlyVerified"]
    )
    lines.extend(["", "## Expiring Soon", ""])
    if summary["expiringSoon"]:
        lines.extend(
            f"- {offer.get('expirationDate')}: {offer.get('provider')} - {offer.get('title')}"
            for offer in summary["expiringSoon"]
        )
    else:
        lines.append("- No tracked offers expire within 45 days.")

    changes = summary["changes"]["summary"]
    lines.extend(
        [
            "",
            "## Changes Detected",
            "",
            f"- Added offers: {changes.get('added', 0)}",
            f"- Removed offers: {changes.get('removed', 0)}",
            f"- Tracked field changes: {changes.get('fieldChanges', 0)}",
        ],
    )

    if summary["validation"]["errors"]:
        lines.extend(["", "## Validation Errors", ""])
        lines.extend(f"- {error}" for error in summary["validation"]["errors"])

    return "\n".join(lines) + "\n"


def render_html(summary: dict[str, Any]) -> str:
    markdown = render_markdown(summary)
    body = "\n".join(
        f"<p>{html.escape(line)}</p>" if line and not line.startswith("#") else
        f"<h1>{html.escape(line[2:])}</h1>" if line.startswith("# ") else
        f"<h2>{html.escape(line[3:])}</h2>" if line.startswith("## ") else
        "<br>"
        for line in markdown.splitlines()
    )
    return (
        "<!doctype html>\n"
        "<html lang=\"en\">\n"
        "<head><meta charset=\"utf-8\"><title>OfferRadar Automation Report</title>"
        "<style>body{font-family:Arial,sans-serif;max-width:900px;margin:40px auto;"
        "line-height:1.5;color:#0f172a}h1,h2{color:#0f172a}p{margin:6px 0}</style>"
        "</head>\n"
        f"<body>{body}</body>\n"
        "</html>\n"
    )


def write_reports(summary: dict[str, Any]) -> None:
    REPORT_MD_PATH.write_text(render_markdown(summary))
    REPORT_HTML_PATH.write_text(render_html(summary))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="write Markdown and HTML reports")
    args = parser.parse_args()
    summary = build_summary()
    print(
        f"Report summary: {summary['totalOffers']} offers, "
        f"{summary['activeOffers']} active, validation "
        f"{'passed' if summary['validation']['valid'] else 'failed'}.",
    )
    if args.write:
        write_reports(summary)
        print(f"Wrote {REPORT_MD_PATH.relative_to(ROOT)}")
        print(f"Wrote {REPORT_HTML_PATH.relative_to(ROOT)}")
    else:
        print("DRY RUN: no reports written")
    return 0 if summary["validation"]["valid"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
