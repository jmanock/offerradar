# OfferRadar Affiliate Workflow

This workflow keeps official provider sources, affiliate approvals, and
monetized links reviewable without publishing unverified or invented URLs.

## Apply For Programs

1. Start with providers marked `needs_approval` in `/ops/affiliate`.
2. Apply only through the provider's official affiliate page or a confirmed
   affiliate network.
3. Record the program name in `affiliateProgram` and the network name in
   `affiliateNetwork`.
4. Keep `affiliateStatus` as `needs_approval` until approval is confirmed.
5. Never store account passwords, API credentials, tax information, or private
   application details in the repository.

## Verify Websites And Offer Sources

1. Open the provider's known official website from `officialWebsiteUrl`.
2. Confirm the offer page is on the provider's official domain or a confirmed
   program destination.
3. Store the direct provider offer page in `officialOfferUrl`.
4. Record a concise verification note and update `lastReviewed`.
5. Do not treat a homepage, search result, social post, or third-party article
   as an official offer source.

## Store Official URLs

Edit `data/linkRegistry.json`:

- `officialWebsiteUrl`: the provider's official public website.
- `officialOfferUrl`: the provider's direct offer or promotion page.
- `lastReviewed`: the date the source was reviewed.
- `notes`: what was verified and what still needs manual review.

An official URL can be published without affiliate approval when it has been
reviewed and is relevant. Terms still need to be verified directly by users.

## Store Affiliate Links

Add an `affiliateUrl` only after the account is approved and the link is copied
from the confirmed provider or affiliate-network dashboard. Then:

1. Record `affiliateProgram` and `affiliateNetwork`.
2. Set `affiliateStatus` to `ready`.
3. Set `monetizationStatus` to `ready`.
4. Update `lastReviewed` and explain the review in `notes`.
5. Confirm the public destination and disclosure treatment before deployment.

Use `referralUrl` only for a real, manually collected referral link. Never
invent, guess, or transform referral or affiliate URLs.

## Approval Tracking

Use `/ops/affiliate` as the working queue:

- **Programs identified**: program or network information has been recorded.
- **Need approval**: a program may be relevant, but approval is not confirmed.
- **Missing official URLs**: collect and verify a direct provider offer page.
- **Affiliate links ready**: reviewed monetized links are available.
- **Need review**: determine whether an official program or referral option
  exists.

After each review, update the registry record, run `npm run lint` and
`npm run build`, inspect the affected provider page, and deploy only through
the normal reviewed release process.

## Compatibility

The legacy `linkStatus` field remains in the registry for V7 automation and
report compatibility. New affiliate operations should use:

- `officialOfferUrl`
- `affiliateProgram`
- `affiliateNetwork`
- `affiliateStatus`
- `monetizationStatus`
