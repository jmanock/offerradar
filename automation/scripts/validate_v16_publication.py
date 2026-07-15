#!/usr/bin/env python3
"""Validate V16 publication boundaries and monetized-link disclosures."""
from __future__ import annotations
import json, re
from datetime import datetime
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]

def load(path:Path,fallback):
    try:return json.loads(path.read_text())
    except (FileNotFoundError,json.JSONDecodeError):return fallback
def valid_date(value):
    try:datetime.fromisoformat(str(value).replace("Z","+00:00"));return True
    except ValueError:return False
def valid_value(value):return bool(re.search(r"(?:\$\s?\d|\d[\d,]*(?:\.\d+)?\s?(?:%|points?|miles?|credit|bonus|apy)?)",str(value or ""),re.I))

def validate():
    errors=[]; approved=load(ROOT/"data"/"approvedChanges.json",[]); registry=load(ROOT/"data"/"linkRegistry.json",[])
    for item in approved:
        label=item.get("id","approved change")
        if not str(item.get("provider","")).strip():errors.append(f"{label}: provider missing")
        if not str(item.get("sourceUrl","")).startswith(("http://","https://")):errors.append(f"{label}: source URL missing or invalid")
        if not valid_date(item.get("approvedAt")):errors.append(f"{label}: approval date invalid")
        if item.get("changeType")!="expired" and not valid_value(item.get("currentObservedValue")):errors.append(f"{label}: current value malformed")
        if item.get("changeType") in {"increased","decreased"} and not valid_value(item.get("previousObservedValue")):errors.append(f"{label}: prior observation required")
        if item.get("changeType")=="expired" and item.get("proposedStatus") not in {None,"expired"}:errors.append(f"{label}: expired status conflict")
    for record in registry:
        if record.get("affiliateUrl") or record.get("referralUrl"):
            if record.get("monetizationStatus")=="ready" and record.get("affiliateStatus")!="ready":errors.append(f"{record.get('provider')}: monetized link lacks ready disclosure/approval state")
            if not str(record.get("notes","")).strip():errors.append(f"{record.get('provider')}: monetized link lacks disclosure notes")
    return errors
def main():
    errors=validate()
    if errors:
        print("V16 publication validation failed:");[print(f"- {error}") for error in errors];return 1
    print("V16 publication validation passed.");return 0
if __name__=="__main__":raise SystemExit(main())
