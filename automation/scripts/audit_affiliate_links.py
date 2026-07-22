#!/usr/bin/env python3
"""Audit the controlled affiliate registry without changing public links."""
from __future__ import annotations
import argparse, json, urllib.error, urllib.request
from datetime import date, datetime, timezone
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT=Path(__file__).resolve().parents[2]
REGISTRY=ROOT/"data/affiliateRegistry.json"
EXPECTED={
 "hellosafe-travel-insurance":{"gid":"610091","mid":"128757","awinaffid":"2935515","linkid":"4837486"},
 "hellosafe-card-insurance-checker":{"gid":"610148","mid":"128757","awinaffid":"2935515","linkid":"4837754"},
 "esimshop":{"gid":"600694","mid":"124780","awinaffid":"2935515","linkid":"4730960"},
 "kitco":{"gid":"493731","mid":"84579","awinaffid":"2935515","linkid":"3675184"},
 "unest-app":{"gid":"513309","mid":"114220","awinaffid":"2935515","linkid":"4024345"},
}
PLACEMENTS={
 "hellosafe-travel-insurance":["/travel","/tools","/research/travel-insurance-comparison"],
 "hellosafe-card-insurance-checker":["/travel","/tools","/research/credit-card-travel-insurance"],
 "esimshop":["/travel","/tools","/research/esim-international-travel"],
 "kitco":["/tools","/research/gold-price-tracking-guide"],
 "unest-app":["/tools","/research/family-investing-apps"],
}
def check_destination(url):
    request=urllib.request.Request(url,headers={"User-Agent":"OfferRadarLinkAudit/1.0"})
    try:
        with urllib.request.urlopen(request,timeout=15) as response:
            parsed=urlparse(response.geturl()); destination=f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
            return {"status":response.status,"destination":destination,"warning":""}
    except urllib.error.HTTPError as error: return {"status":error.code,"destination":error.geturl(),"warning":f"HTTP {error.code}; review manually before changing status."}
    except Exception as error: return {"status":None,"destination":"","warning":f"Temporary destination check failure: {type(error).__name__}."}
def main():
    parser=argparse.ArgumentParser(); parser.add_argument("--check-destinations",action="store_true"); args=parser.parse_args()
    entries=json.loads(REGISTRY.read_text(encoding="utf-8")); findings=[]; destination_checks={}
    ids={entry.get("id") for entry in entries}
    for missing in EXPECTED.keys()-ids: findings.append({"severity":"error","id":missing,"message":"Required registry entry is missing."})
    for entry in entries:
        item=entry.get("id","unknown"); query=parse_qs(urlparse(entry.get("affiliateUrl","")).query,keep_blank_values=True)
        if item in EXPECTED:
            for key,value in EXPECTED[item].items():
                if query.get(key,[""])[0]!=value: findings.append({"severity":"error","id":item,"message":f"Approved Awin parameter {key} changed or is missing."})
        if entry.get("approved") is not True or entry.get("status")!="active": findings.append({"severity":"warning","id":item,"message":"Entry is not currently approved and active."})
        if not entry.get("allowedRoutes"): findings.append({"severity":"error","id":item,"message":"No allowed routes configured."})
        overlap=set(entry.get("allowedRoutes",[])) & set(entry.get("prohibitedRoutes",[]))
        if overlap: findings.append({"severity":"error","id":item,"message":f"Allowed/prohibited route overlap: {sorted(overlap)}"})
        if entry.get("disclosureRequired") is not True: findings.append({"severity":"error","id":item,"message":"Disclosure requirement is disabled."})
        if args.check_destinations: destination_checks[item]=check_destination(entry.get("affiliateUrl",""))
    for path in ROOT.rglob("*"):
        if path.suffix not in {".ts",".tsx",".js",".jsx",".md",".json"} or any(part in {"node_modules",".next","reports"} for part in path.parts): continue
        if path in {REGISTRY,Path(__file__)}: continue
        try: content=path.read_text(encoding="utf-8")
        except UnicodeDecodeError: continue
        if "awin1.com/awclick" in content: findings.append({"severity":"error","id":"hardcoded-link","message":f"Uncontrolled Awin URL in {path.relative_to(ROOT)}"})
    placement_source=(ROOT/"app/research/[slug]/page.tsx").read_text()+ (ROOT/"app/travel/page.tsx").read_text()+ (ROOT/"app/tools/page.tsx").read_text()
    if "AffiliateDisclosure" not in placement_source: findings.append({"severity":"error","id":"disclosure","message":"Public affiliate placements do not reference the disclosure component."})
    payload={"generatedAt":datetime.now(timezone.utc).isoformat(),"registryEntries":len(entries),"requiredEntries":len(EXPECTED),"placements":PLACEMENTS,"destinationChecks":destination_checks,"findings":findings,"passed":not any(item["severity"]=="error" for item in findings)}
    reports=ROOT/"reports"; reports.mkdir(exist_ok=True); (reports/"latest-affiliate-link-audit.json").write_text(json.dumps(payload,indent=2)+"\n")
    lines=["# Affiliate Link Audit",f"Generated: {date.today().isoformat()}","",f"Status: {'PASS' if payload['passed'] else 'FAIL'}",f"Registry entries: {len(entries)}",""]
    lines += ["## Findings"] + ([f"- **{item['severity'].upper()}** `{item['id']}`: {item['message']}" for item in findings] or ["- No configuration errors found."])
    lines += ["","## Destination Checks","A temporary HTTP failure is a review flag only; the audit never removes or disables a link."]
    lines += [f"- `{key}`: {value['status'] or 'unavailable'} -> {value['destination'] or 'not resolved'}{(' — '+value['warning']) if value['warning'] else ''}" for key,value in destination_checks.items()] or ["- Not requested."]
    (reports/"latest-affiliate-link-audit.md").write_text("\n".join(lines)+"\n")
    print(f"Affiliate audit: {'PASS' if payload['passed'] else 'FAIL'} ({len(entries)} entries, {len(findings)} findings)")
    return 0 if payload["passed"] else 1
if __name__=="__main__": raise SystemExit(main())
