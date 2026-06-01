#!/usr/bin/env python3
"""Run the OfferRadar V5 local automation pipeline safely."""

from __future__ import annotations

import argparse
import json
import subprocess
from pathlib import Path

from detect_offer_changes import detect_changes, write_changes
from generate_offer_report import build_summary, write_reports
from normalize_offers import normalize_offers
from validate_offers import validate_offers

ROOT = Path(__file__).resolve().parents[2]
DATA_PATH = ROOT / "data" / "offers.json"
SNAPSHOT_PATH = ROOT / "automation" / "snapshots" / "latest-offers.json"
COMMIT_PATHS = [
    "data/offers.json",
    "automation/reports/latest-offer-changes.json",
    "automation/reports/latest-offer-report.md",
    "automation/reports/latest-offer-report.html",
    "automation/snapshots/latest-offers.json",
]
DEPLOY_COMMANDS = [
    "cd /var/www/offerradar",
    "git pull",
    "npm install",
    "npm run build",
    "pm2 restart offerradar",
]


def run_git(args: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["git", *args],
        cwd=ROOT,
        check=False,
        text=True,
        capture_output=True,
    )


def commit_changes() -> None:
    run_git(["add", *COMMIT_PATHS])
    diff = run_git(["diff", "--cached", "--quiet"])
    if diff.returncode == 0:
        print("No staged offer data/report changes to commit.")
        return
    commit = run_git(["commit", "-m", "Update OfferRadar offer data"])
    if commit.returncode != 0:
        raise RuntimeError(commit.stderr.strip() or "git commit failed")
    print(commit.stdout.strip())


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="write generated data and reports")
    parser.add_argument("--commit", action="store_true", help="commit changed data/reports only")
    parser.add_argument(
        "--deploy",
        action="store_true",
        help="print manual deploy commands; requires --commit",
    )
    args = parser.parse_args()

    if args.commit and not args.write:
        raise SystemExit("--commit requires --write")
    if args.deploy and not args.commit:
        raise SystemExit("--deploy requires --commit")

    print("OfferRadar V5 pipeline starting.")
    print("Mode: local write" if args.write else "Mode: DRY RUN; no files, commits, pushes, or deploys")

    normalize_offers(write=args.write)

    validation = validate_offers()
    if not validation["valid"]:
        print("Validation failed:")
        for error in validation["errors"]:
            print(f"- {error}")
        return 1
    print(f"Validation passed for {validation['offerCount']} offers.")

    changes = detect_changes()
    change_summary = changes["summary"]
    print(
        "Changes: "
        f"{change_summary['added']} added, {change_summary['removed']} removed, "
        f"{change_summary['fieldChanges']} field changes.",
    )
    if args.write:
        write_changes(changes)

    report_summary = build_summary()
    if args.write:
        write_reports(report_summary)
        SNAPSHOT_PATH.write_text(DATA_PATH.read_text())
        print(f"Updated {SNAPSHOT_PATH.relative_to(ROOT)}")
    else:
        print("DRY RUN: reports and snapshot were not written.")

    if args.commit:
        commit_changes()

    if args.deploy:
        print("Manual deploy commands for a future reviewed deploy:")
        for command in DEPLOY_COMMANDS:
            print(command)

    print("OfferRadar V5 pipeline complete.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
