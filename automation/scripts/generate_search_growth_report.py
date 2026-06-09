#!/usr/bin/env python3
"""Combine OfferRadar search, crawl, content, link, and monetization reports."""

from __future__ import annotations

import html
import json
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
REPORTS = ROOT / "automation" / "reports"
INVENTORY_PATH = ROOT / "data" / "urlInventory.json"
MD_OUTPUT = REPORTS / "latest-search-growth-report.md"
HTML_OUTPUT = REPORTS / "latest-search-growth-report.html"


def read_json(path: Path, fallback: Any) -> Any:
    return json.loads(path.read_text()) if path.exists() else fallback


def bullets(items: list[str], empty: str = "None available.") -> list[str]:
    return [f"- {item}" for item in items[:10]] or [f"- {empty}"]


def render_markdown() -> str:
    inventory = read_json(INVENTORY_PATH, [])
    offers = read_json(ROOT / "data" / "offers.json", [])
    registry = read_json(ROOT / "data" / "linkRegistry.json", [])
    monetization = read_json(REPORTS / "latest-monetization-gaps.json", {})
    content = read_json(REPORTS / "latest-content-gaps.json", {})
    links = read_json(REPORTS / "latest-internal-link-audit.json", {})
    indexnow = read_json(REPORTS / "latest-indexnow-report.json", {})
    search_console = read_json(REPORTS / "latest-search-console-summary.json", {})
    indexing_counts = Counter(item.get("indexingStatus", "unknown") for item in inventory)
    priority_counts = Counter(item.get("priority", "unknown") for item in inventory)
    crawl_priorities = [
        f"{item['priority']} {item['type']}: {item['path']} ({item['indexingStatus']})"
        for item in inventory
        if item.get("priority") in {"critical", "high"}
        and item.get("indexingStatus") in {"unknown", "not_indexed", "needs_review"}
    ]
    monetization_actions = [
        f"{item.get('provider', 'Provider')}: {item.get('action', 'Review monetization status')}"
        for item in monetization.get("top10MoneyActionItems", [])
    ]
    if not monetization_actions:
        monetization_actions = [
            f"{item.get('provider', 'Provider')}: {item.get('userActionNeeded', 'Review link status')}"
            for item in monetization.get("highPriorityProviders", [])
        ]
    search_opportunities = [
        f"{item.get('page') or item.get('query')}: position {item.get('position', 0):.1f}, {item.get('impressions', 0):g} impressions, {item.get('ctr', 0) * 100:.2f}% CTR"
        for item in search_console.get("averagePosition8To20", [])
    ]
    pages_needing_links = [
        f"{item.get('route')}: estimated {item.get('linkCount', item.get('hubLinkCount', 0))} links"
        for item in links.get("majorPagesWithFewOrNoInternalLinks", [])
    ]
    pages_needing_offer_data = [
        f"{item.get('provider')}: add or review offer coverage"
        for item in content.get("providersInRegistryWithNoOffer", [])
    ]
    pages_needing_official_urls = [
        f"{item.get('provider')}: collect official offer URL"
        for item in monetization.get("highPriorityProviders", [])
        if not item.get("officialOfferUrl")
    ]
    missing_referrals = [
        f"{item.get('provider')}: collect real referral link"
        for item in monetization.get("providersNeedingReferral", [])
    ]
    missing_affiliate_approvals = [
        f"{item.get('provider')}: confirm affiliate approval"
        for item in monetization.get("providersNeedingAffiliateApproval", [])
    ]
    monetized_provider_count = sum(
        1
        for item in registry
        if item.get("linkStatus") == "ready"
        and (item.get("referralUrl") or item.get("affiliateUrl"))
    )
    lines = [
        "# OfferRadar Search Growth Report",
        "",
        f"Generated: {datetime.now(timezone.utc).isoformat()}",
        "",
        "## Executive Summary",
        "",
        f"- URL count: {len(inventory)}",
        f"- Offer count: {len(offers)}",
        f"- Provider count: {len(registry)}",
        f"- Monetized provider count: {monetized_provider_count}",
        f"- Critical URLs: {priority_counts.get('critical', 0)}",
        f"- High-priority URLs: {priority_counts.get('high', 0)}",
        f"- Unknown indexing status: {indexing_counts.get('unknown', 0)}",
        f"- Latest IndexNow dry run: {indexnow.get('urlCount', 0)} URLs",
        f"- Imported Search Console impressions: {search_console.get('totals', {}).get('impressions', 0):g}",
        "",
        "## Top Crawl And Indexing Priorities",
        "",
        *bullets(crawl_priorities),
        "",
        "## Search Console Opportunities",
        "",
        *bullets(search_opportunities, "Import a recent Search Console CSV to populate opportunities."),
        "",
        "## Top Growth Opportunities",
        "",
        "### Pages Needing Internal Links",
        "",
        *bullets(pages_needing_links),
        "",
        "### Pages Needing Offer Data",
        "",
        *bullets(pages_needing_offer_data),
        "",
        "### Pages Needing Official URLs",
        "",
        *bullets(pages_needing_official_urls),
        "",
        "### Pages With Strongest Ranking Potential",
        "",
        *bullets(search_opportunities, "Import a recent Search Console CSV to identify ranking opportunities."),
        "",
        "## Top Monetization Opportunities",
        "",
        *bullets(monetization_actions),
        "",
        "### Missing Referral Links",
        "",
        *bullets(missing_referrals),
        "",
        "### Missing Affiliate Approvals",
        "",
        *bullets(missing_affiliate_approvals),
        "",
        "### Missing Official Offer URLs",
        "",
        *bullets(pages_needing_official_urls),
        "",
        "## Top SEO Content Priorities",
        "",
        *bullets(content.get("top10ContentActions", [])),
        "",
        "## Top Internal Link Priorities",
        "",
        *bullets(links.get("top10InternalLinkingActions", [])),
        "",
        "## Recommended Daily Workflow",
        "",
        "1. Run `npm run ops:all` to refresh offers, intelligence, URL inventory, IndexNow dry run, and this report.",
        "2. Review critical/high URLs with unknown, not indexed, or needs review status.",
        "3. Import a fresh manual Search Console CSV when new performance data is available.",
        "4. Improve pages with impressions but low CTR or average positions from 8-20.",
        "5. Review the IndexNow dry-run report before any intentional `npm run indexnow:submit` action.",
        "6. Collect real official/referral/affiliate links only through the V7 registry workflow.",
    ]
    return "\n".join(lines) + "\n"


def render_html(markdown: str) -> str:
    body = []
    for line in markdown.splitlines():
        if line.startswith("# "):
            body.append(f"<h1>{html.escape(line[2:])}</h1>")
        elif line.startswith("## "):
            body.append(f"<h2>{html.escape(line[3:])}</h2>")
        elif line.startswith("- ") or (len(line) > 2 and line[0].isdigit() and line[1:3] == ". "):
            body.append(f"<p>{html.escape(line)}</p>")
        elif line:
            body.append(f"<p>{html.escape(line)}</p>")
    return (
        "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\">"
        "<title>OfferRadar Search Growth Report</title>"
        "<style>body{font-family:Arial,sans-serif;max-width:960px;margin:40px auto;"
        "line-height:1.55;color:#0f172a}h1,h2{color:#0f172a}</style></head><body>"
        + "\n".join(body)
        + "</body></html>\n"
    )


def main() -> int:
    markdown = render_markdown()
    MD_OUTPUT.write_text(markdown)
    HTML_OUTPUT.write_text(render_html(markdown))
    print(f"Wrote {MD_OUTPUT.relative_to(ROOT)}")
    print(f"Wrote {HTML_OUTPUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
