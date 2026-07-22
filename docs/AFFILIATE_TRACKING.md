# Affiliate Tracking

OfferRadar tracks outbound activity without sending names, email addresses, notes, or other personal data.

## Events

- `affiliate_click`: an approved, active registry link is opened on an allowed route.
- `official_provider_click`: an official provider fallback or non-compensated provider source is opened.
- `partner_tool_click`: a clearly labeled external tool is opened, whether the resolved link is affiliate or official.
- `network_outbound_click`: a contextual Florida Deals Network destination is opened.

Affiliate events include `affiliate_id`, `advertiser`, `network`, `category`, `source_page`, `placement`, `link_text`, `clickref`, and `destination_type`. Official fallbacks use the same context with `link_type=official`.

## Testing

1. Open an allowed page in a production-mode local build.
2. Inspect the rendered anchor for `rel="sponsored nofollow noopener noreferrer"` and a sanitized `clickref`.
3. Click the resource and confirm the GA4 event in DebugView when a debug environment is configured.
4. Enable first-party analytics in a non-public test environment and confirm aggregate counts in `/ops/revenue`.
5. Test an unrelated route with `resolveAffiliateLink`; it must return no link.

Future partner events belong in `AffiliateLink` or another central tracked component, not in individual article templates.
