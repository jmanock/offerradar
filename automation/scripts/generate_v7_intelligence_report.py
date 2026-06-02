#!/usr/bin/env python3
"""Generate the V7 Offer Intelligence report from local report JSON."""

from __future__ import annotations

import html
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
REPORTS_DIR = ROOT / "automation" / "reports"
MONETIZATION_PATH = REPORTS_DIR / "latest-monetization-gaps.json"
CONTENT_PATH = REPORTS_DIR / "latest-content-gaps.json"
LINKS_PATH = REPORTS_DIR / "latest-internal-link-audit.json"
OFFER_REPORT_PATH = REPORTS_DIR / "latest-offer-report.md"
OUTPUT_MD_PATH = REPORTS_DIR / "latest-v7-intelligence-report.md"
OUTPUT_HTML_PATH = REPORTS_DIR / "latest-v7-intelligence-report.html"


def load_json(path: Path, fallback: Any) -> Any:
    return json.loads(path.read_text()) if path.exists() else fallback


def offer_count_from_markdown() -> int | None:
    if not OFFER_REPORT_PATH.exists():
        return None
    match = re.search(r"Total offers:\s*(\d+)", OFFER_REPORT_PATH.read_text())
    return int(match.group(1)) if match else None


def bullet_lines(items: list[Any], formatter=lambda item: str(item), empty="None listed.") -> list[str]:
    if not items:
        return [f"- {empty}"]
    return [f"- {formatter(item)}" for item in items[:10]]


def render_markdown() -> str:
    monetization = load_json(MONETIZATION_PATH, {})
    content = load_json(CONTENT_PATH, {})
    links = load_json(LINKS_PATH, {})
    offer_count = monetization.get("offerCount") or offer_count_from_markdown() or 0
    provider_count = monetization.get("registryProviderCount", 0)
    monetized_count = monetization.get("monetizedProviderCount", 0)
    referral = monetization.get("providersNeedingReferral", [])
    affiliate = monetization.get("providersNeedingAffiliateApproval", [])
    missing_offer_urls = [
        record
        for record in monetization.get("highPriorityProviders", [])
        if not record.get("officialOfferUrl")
    ]

    lines = [
        "# OfferRadar V7 Intelligence Report",
        "",
        f"Generated: {datetime.now(timezone.utc).isoformat()}",
        "",
        "## Executive Summary",
        "",
        f"- Current offer count: {offer_count}",
        f"- Current provider registry count: {provider_count}",
        f"- Monetized provider count: {monetized_count}",
        f"- Providers needing referral links: {len(referral)}",
        f"- Providers needing affiliate approval: {len(affiliate)}",
        f"- High-priority providers missing offer URLs: {len(missing_offer_urls)}",
        "",
        "## Providers Needing Referral Links",
        "",
        *bullet_lines(referral, lambda item: f"{item['provider']} ({item['monetizationPriority']})"),
        "",
        "## Providers Needing Affiliate Approval",
        "",
        *bullet_lines(affiliate, lambda item: f"{item['provider']} ({item['monetizationPriority']})"),
        "",
        "## Providers Missing Offer URLs",
        "",
        *bullet_lines(missing_offer_urls, lambda item: f"{item['provider']} ({item['monetizationPriority']})"),
        "",
        "## Top 10 Revenue Actions",
        "",
        *bullet_lines(
            monetization.get("top10MoneyActionItems", []),
            lambda item: f"{item['provider']}: {item['action']}",
        ),
        "",
        "## Top 10 Content Actions",
        "",
        *bullet_lines(content.get("top10ContentActions", [])),
        "",
        "## Top 10 Internal Linking Actions",
        "",
        *bullet_lines(links.get("top10InternalLinkingActions", [])),
        "",
        "## Recommended Tomorrow Workflow",
        "",
        "1. Collect real referral links for Robinhood, Webull, Public, Moomoo, Acorns, Stash, Rakuten, Upside, Chime, Current, and SoFi if available.",
        "2. Apply to or confirm approval in Impact, CJ, FlexOffers, Rakuten Advertising, PartnerStack, and Awin where applicable.",
        "3. Collect official offer URLs for critical/high providers before publishing new CTAs.",
        "4. Paste reviewed links into `data/linkRegistry.json` only after manual confirmation.",
        "5. Run `npm run intelligence:all`, `npm run lint`, and `npm run build` before publishing changes.",
    ]
    return "\n".join(lines) + "\n"


def render_html(markdown: str) -> str:
    body = []
    for line in markdown.splitlines():
        if line.startswith("# "):
            body.append(f"<h1>{html.escape(line[2:])}</h1>")
        elif line.startswith("## "):
            body.append(f"<h2>{html.escape(line[3:])}</h2>")
        elif line.startswith("- "):
            body.append(f"<p>{html.escape(line)}</p>")
        elif re.match(r"^\\d+\\. ", line):
            body.append(f"<p>{html.escape(line)}</p>")
        elif line:
            body.append(f"<p>{html.escape(line)}</p>")
        else:
            body.append("<br>")
    return (
        "<!doctype html>\n<html lang=\"en\">\n<head><meta charset=\"utf-8\">"
        "<title>OfferRadar V7 Intelligence Report</title>"
        "<style>body{font-family:Arial,sans-serif;max-width:960px;margin:40px auto;"
        "line-height:1.55;color:#0f172a}h1,h2{color:#0f172a}p{margin:7px 0}</style>"
        "</head>\n<body>"
        + "\n".join(body)
        + "</body>\n</html>\n"
    )


def main() -> int:
    markdown = render_markdown()
    OUTPUT_MD_PATH.write_text(markdown)
    OUTPUT_HTML_PATH.write_text(render_html(markdown))
    print(f"Wrote {OUTPUT_MD_PATH.relative_to(ROOT)}")
    print(f"Wrote {OUTPUT_HTML_PATH.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
