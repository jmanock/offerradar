#!/usr/bin/env python3
"""Validate a manual affiliate-network CSV and optionally store private aggregates."""
import argparse, csv, json
from datetime import datetime, timezone
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
FIELDS = ["date", "network", "advertiser", "clicks", "transactions", "revenue"]
def main():
    parser=argparse.ArgumentParser(); parser.add_argument("--input",required=True); parser.add_argument("--write",action="store_true"); args=parser.parse_args()
    source=Path(args.input); source=source if source.is_absolute() else ROOT/source
    with source.open(newline="",encoding="utf-8-sig") as handle:
        reader=csv.DictReader(handle)
        if reader.fieldnames != FIELDS: raise SystemExit(f"Expected CSV header: {','.join(FIELDS)}")
        rows=[]
        for line,row in enumerate(reader,start=2):
            try: datetime.strptime(row["date"],"%Y-%m-%d"); clicks=int(row["clicks"]); transactions=int(row["transactions"]); revenue=float(row["revenue"])
            except (TypeError,ValueError) as error: raise SystemExit(f"Invalid row {line}: {error}") from error
            if min(clicks,transactions,revenue)<0: raise SystemExit(f"Invalid negative value on row {line}")
            rows.append({"date":row["date"],"network":row["network"].strip(),"advertiser":row["advertiser"].strip(),"clicks":clicks,"transactions":transactions,"revenue":revenue})
    payload={"importedAt":datetime.now(timezone.utc).isoformat(),"source":source.name,"rows":rows}
    if args.write:
        destination=ROOT/"data/runtime/affiliate-revenue.json"; destination.parent.mkdir(parents=True,exist_ok=True); destination.write_text(json.dumps(payload,indent=2)+"\n",encoding="utf-8"); print(f"Stored {len(rows)} rows in {destination.relative_to(ROOT)}")
    else: print(f"Validated {len(rows)} rows from {source.relative_to(ROOT)} (dry run)")
if __name__ == "__main__": main()
