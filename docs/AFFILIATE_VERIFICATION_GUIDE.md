# Affiliate Verification Guide

## Verification Standard

An affiliate entry may be public only when its registry record is approved and active, the exact AWIN parameters pass validation, the route is allowed by both the registry and placement map, disclosure metadata is present, and the destination is appropriate for the surrounding research.

The redirect resolving once is not enough to prove that a campaign remains approved. AWIN account status, advertiser terms, permitted traffic sources, geographic scope, and current creative rules must be checked in the authenticated network account.

## Checks Completed on 2026-07-22

- The four active AWIN redirects resolved to the expected HelloSafe, eSimShop, and Kitco hosts.
- HelloSafe destinations matched the intended travel-insurance and United States card-coverage paths.
- eSimShop resolved to its international eSIM shopping experience.
- Kitco resolved to its precious-metals research destination.
- Unest's official site described a current custodial family-investing product, and its FAQ described U.S. residency and account requirements.
- OfferRadar's active placements rendered at a 390px local viewport without horizontal overflow.

## Manual Checks Still Required

- Confirm each campaign is approved and active inside AWIN.
- Confirm paid-search, email, social, sub-network, and brand-bidding rules before using a new traffic source.
- Test every destination on a physical iOS and Android device.
- Confirm any supplied logo or creative license before adding an image.
- Confirm Unest's AWIN campaign approval, permitted placements, and mobile destination before changing its pending status.
- Record any advertiser-specific disclosure or attribution requirement.

`data/affiliateVerification.csv` uses `unknown` when a check was not completed. Do not convert `unknown` to `yes` based on assumptions.

## Updating an Entry

1. Test the exact registry URL and record the final host and path.
2. Review the current product and country requirements on the advertiser's official site.
3. Verify campaign approval and restrictions inside AWIN.
4. Update `data/affiliateVerification.csv` with the test date and factual result.
5. Update `data/affiliateRegistry.json` only after the verification record is complete.
6. Add or activate rows in `data/affiliatePlacementMap.csv` for relevant routes.
7. Run `npm run affiliate:audit`, lint, build, and rendered-page checks before publication.

## Review Frequency

Recheck active links after every placement change and at least monthly. Recheck immediately after an advertiser notice, redirect change, unexpected landing page, analytics anomaly, or user report. Pending entries should remain hidden until every blocking item is resolved.
