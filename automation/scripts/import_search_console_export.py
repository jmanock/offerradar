#!/usr/bin/env python3
"""Import a manually downloaded Google Search Console CSV export."""

from __future__ import annotations

import argparse
import csv
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
DEFAULT_INPUT = ROOT / "automation" / "search-console" / "sample-search-console-export.csv"
JSON_OUTPUT = ROOT / "automation" / "reports" / "latest-search-console-summary.json"
MD_OUTPUT = ROOT / "automation" / "reports" / "latest-search-console-summary.md"


def normalize_header(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", value.lower())


def parse_number(value: str | None) -> float:
    if not value:
        return 0.0
    cleaned = value.strip().replace(",", "")
    if cleaned.endswith("%"):
        return float(cleaned.removesuffix("%") or 0) / 100
    return float(cleaned or 0)


def pick(row: dict[str, str], aliases: set[str]) -> str:
    for key, value in row.items():
        if normalize_header(key) in aliases:
            return value or ""
    return ""


def normalize_row(row: dict[str, str]) -> dict[str, Any]:
    query = pick(row, {"query", "queries", "topqueries", "searchquery"})
    page = pick(row, {"page", "pages", "toppages", "url", "landingpage"})
    clicks = parse_number(pick(row, {"click", "clicks"}))
    impressions = parse_number(pick(row, {"impression", "impressions"}))
    ctr_raw = pick(row, {"ctr", "clickthroughrate"})
    ctr = parse_number(ctr_raw) if ctr_raw else (clicks / impressions if impressions else 0)
    position = parse_number(pick(row, {"position", "averageposition", "avgposition"}))
    return {
        "query": query,
        "page": page,
        "clicks": clicks,
        "impressions": impressions,
        "ctr": ctr,
        "position": position,
    }


def aggregate_rows(rows: list[dict[str, Any]], key: str) -> list[dict[str, Any]]:
    grouped: dict[str, dict[str, Any]] = {}
    for row in rows:
        label = row.get(key)
        if not label:
            continue
        item = grouped.setdefault(
            label,
            {"query": "", "page": "", "clicks": 0.0, "impressions": 0.0, "positionWeight": 0.0},
        )
        item[key] = label
        item["clicks"] += row["clicks"]
        item["impressions"] += row["impressions"]
        item["positionWeight"] += row["position"] * row["impressions"]
    aggregated = []
    for item in grouped.values():
        impressions = item["impressions"]
        aggregated.append(
            {
                "query": item["query"],
                "page": item["page"],
                "clicks": item["clicks"],
                "impressions": impressions,
                "ctr": item["clicks"] / impressions if impressions else 0,
                "position": item["positionWeight"] / impressions if impressions else 0,
            }
        )
    return sorted(aggregated, key=lambda row: (-row["impressions"], row["position"]))


def summarize(input_path: Path) -> dict[str, Any]:
    with input_path.open(newline="", encoding="utf-8-sig") as handle:
        rows = [normalize_row(row) for row in csv.DictReader(handle)]

    top_pages = aggregate_rows(rows, "page")
    top_queries = aggregate_rows(rows, "query")
    ranked = top_pages or top_queries
    high_impressions_low_ctr = [
        row for row in ranked if row["impressions"] >= 100 and row["ctr"] < 0.02
    ]
    position_opportunities = [
        row for row in ranked if 8 <= row["position"] <= 20 and row["impressions"] > 0
    ]
    zero_click_pages = [
        row for row in ranked if row["clicks"] == 0 and row["impressions"] > 0
    ]
    return {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "sourceFile": str(input_path.relative_to(ROOT)),
        "rowCount": len(rows),
        "totals": {
            "clicks": sum(row["clicks"] for row in rows),
            "impressions": sum(row["impressions"] for row in rows),
            "averagePosition": (
                sum(row["position"] * row["impressions"] for row in rows)
                / sum(row["impressions"] for row in rows)
                if sum(row["impressions"] for row in rows)
                else 0
            ),
        },
        "topPages": top_pages[:10],
        "topQueries": top_queries[:10],
        "topUrlsByImpressions": ranked[:10],
        "highImpressionsLowCtr": high_impressions_low_ctr[:10],
        "averagePosition8To20": position_opportunities[:10],
        "zeroClicksWithImpressions": zero_click_pages[:10],
        "normalizedRows": rows,
    }


def format_row(row: dict[str, Any]) -> str:
    label = row.get("page") or row.get("query") or "Unlabeled row"
    return (
        f"- {label}: {row['clicks']:g} clicks, {row['impressions']:g} impressions, "
        f"{row['ctr'] * 100:.2f}% CTR, position {row['position']:.1f}"
    )


def render_markdown(summary: dict[str, Any]) -> str:
    lines = [
        "# OfferRadar Search Console Summary",
        "",
        f"Generated: {summary['generatedAt']}",
        f"Source: `{summary['sourceFile']}`",
        "",
        "## Totals",
        "",
        f"- Clicks: {summary['totals']['clicks']:g}",
        f"- Impressions: {summary['totals']['impressions']:g}",
        f"- Average position: {summary['totals']['averagePosition']:.1f}",
        f"- Imported rows: {summary['rowCount']}",
    ]
    for title, key in [
        ("Top Pages", "topPages"),
        ("Top Queries", "topQueries"),
        ("High Impressions And Low CTR", "highImpressionsLowCtr"),
        ("Average Position 8-20", "averagePosition8To20"),
        ("Zero Clicks With Impressions", "zeroClicksWithImpressions"),
    ]:
        lines.extend(["", f"## {title}", ""])
        items = summary[key]
        lines.extend(format_row(row) for row in items)
        if not items:
            lines.append("- None in this import.")
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description="Import a manual Search Console CSV export.")
    parser.add_argument("--input", default=str(DEFAULT_INPUT), help="CSV file exported from Search Console.")
    args = parser.parse_args()
    input_path = Path(args.input)
    if not input_path.is_absolute():
        input_path = ROOT / input_path
    summary = summarize(input_path)
    JSON_OUTPUT.write_text(json.dumps(summary, indent=2) + "\n")
    MD_OUTPUT.write_text(render_markdown(summary))
    print(
        f"Imported {summary['rowCount']} Search Console rows: "
        f"{summary['totals']['clicks']:g} clicks, {summary['totals']['impressions']:g} impressions."
    )
    print(f"Wrote {JSON_OUTPUT.relative_to(ROOT)}")
    print(f"Wrote {MD_OUTPUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
