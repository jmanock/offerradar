# Affiliate Link Audit
Generated: 2026-07-22

Status: PASS-WITH-REVIEW
Registry entries: 5
Placement rows: 18

## Findings
- **NEEDS-REVIEW** `unest-app`: Campaign remains non-public until manual approval and status checks are complete.

## Destination Checks
A temporary HTTP failure is a review flag only; the audit never removes or disables a link.
- `hellosafe-travel-insurance`: 200 -> https://hellosafe.com/travel-insurance/app (pass)
- `hellosafe-card-insurance-checker`: 200 -> https://hellosafe.com/credit-card-insurance/united-states (pass)
- `esimshop`: 200 -> https://h5.esimshop.org/ (pass)
- `kitco`: 200 -> https://online.kitco.com/ (pass)
- `unest-app`: 200 -> https://www.unest.co/ (pass)

## Repository Search References
Raw AWIN URLs are permitted only in `data/affiliateRegistry.json`. The separate provider monetization registry retains empty `affiliateUrl` fields for backward-compatible provider workflows.
### `awin1.com`
- `V16_AFFILIATE_VERIFICATION_REVENUE_REPORT.md:11`
- `lib/affiliateLinks.ts:41`
- `data/affiliateRegistry.json:8`
- `data/affiliateRegistry.json:30`
- `data/affiliateRegistry.json:52`
- `data/affiliateRegistry.json:74`
- `data/affiliateRegistry.json:96`
### `awclick.php`
- `V16_AFFILIATE_VERIFICATION_REVENUE_REPORT.md:11`
- `lib/affiliateLinks.ts:41`
- `data/affiliateRegistry.json:8`
- `data/affiliateRegistry.json:30`
- `data/affiliateRegistry.json:52`
- `data/affiliateRegistry.json:74`
- `data/affiliateRegistry.json:96`
### `awinaffid`
- `V_NEXT_AFFILIATE_GROWTH_REPORT.md:25`
- `V16_AFFILIATE_VERIFICATION_REVENUE_REPORT.md:11`
- `lib/affiliateLinks.ts:3`
- `lib/affiliateLinks.ts:5`
- `lib/affiliateLinks.ts:6`
- `lib/affiliateLinks.ts:7`
- `lib/affiliateLinks.ts:8`
- `lib/affiliateLinks.ts:9`
- `data/affiliateRegistry.json:8`
- `data/affiliateRegistry.json:30`
- `data/affiliateRegistry.json:52`
- `data/affiliateRegistry.json:74`
- `data/affiliateRegistry.json:96`
### `affiliateUrl`
- `V16_AFFILIATE_VERIFICATION_REVENUE_REPORT.md:11`
- `V16_AFFILIATE_VERIFICATION_REVENUE_REPORT.md:14`
- `docs/AFFILIATE_WORKFLOW.md:41`
- `docs/V7_LINK_REGISTRY_PLAN.md:38`
- `docs/V7_LINK_REGISTRY_PLAN.md:74`
- `docs/V7_LINK_AND_MONETIZATION_PLAN.md:19`
- `components/OfferHubExplorer.tsx:22`
- `components/OfferHubExplorer.tsx:37`
- `lib/affiliateLinks.ts:39`
- `lib/affiliateLinks.ts:93`
- `lib/linkRegistry.ts:23`
- `lib/linkRegistry.ts:81`
- `data/affiliateLinks.ts:22`
- `data/affiliateRegistry.json:8`
- `data/affiliateRegistry.json:30`
- `data/affiliateRegistry.json:52`
- `data/affiliateRegistry.json:74`
- `data/affiliateRegistry.json:96`
- `data/linkRegistry.json:9`
- `data/linkRegistry.json:27`
- `data/linkRegistry.json:45`
- `data/linkRegistry.json:63`
- `data/linkRegistry.json:81`
- `data/linkRegistry.json:99`
- `data/linkRegistry.json:117`
- `data/linkRegistry.json:135`
- `data/linkRegistry.json:153`
- `data/linkRegistry.json:171`
- `data/linkRegistry.json:189`
- `data/linkRegistry.json:207`
- `data/linkRegistry.json:225`
- `data/linkRegistry.json:243`
- `data/linkRegistry.json:261`
- `data/linkRegistry.json:279`
- `data/linkRegistry.json:297`
- `data/linkRegistry.json:315`
- `data/linkRegistry.json:333`
- `data/linkRegistry.json:351`
- `data/linkRegistry.json:369`
- `data/linkRegistry.json:387`
- `data/linkRegistry.json:405`
- `data/linkRegistry.json:423`
- `data/linkRegistry.json:441`
- `data/linkRegistry.json:459`
- `data/linkRegistry.json:477`
- `data/linkRegistry.json:495`
- `data/linkRegistry.json:513`
- `data/linkRegistry.ts:31`
- `automation/scripts/generate_search_growth_report.py:83`
- `automation/scripts/analyze_monetization_gaps.py:65`
- `automation/scripts/generate_url_inventory.py:185`
- `automation/scripts/validate_v16_publication.py:28`
### `sponsored`
- `V16_AFFILIATE_VERIFICATION_REVENUE_REPORT.md:11`
- `V16_AFFILIATE_VERIFICATION_REVENUE_REPORT.md:15`
- `V16_ALERTS_AUTOMATION_REVENUE_REPORT.md:88`
- `V16_ALERTS_AUTOMATION_REVENUE_REPORT.md:91`
- `docs/AFFILIATE_TRACKING.md:33`
- `docs/AFFILIATE_TRACKING.md:44`
- `docs/V16_REVENUE_AND_REPORTING.md:15`
- `components/OfferRelationshipLabel.tsx:1`
- `components/OfferRelationshipLabel.tsx:2`
- `components/OfferRelationshipLabel.tsx:3`
- `components/AffiliateLink.tsx:40`
