# Affiliate Tracking

OfferRadar tracks outbound activity without sending names, email addresses, notes, or other personal data.

## Events

- `affiliate_click`: an approved, active registry link is opened on an allowed route.
- `official_provider_click`: an official provider fallback or non-compensated provider source is opened.
- `partner_tool_click`: a clearly labeled external tool is opened, whether the resolved link is affiliate or official.
- `network_outbound_click`: a contextual Florida Deals Network destination is opened.

Affiliate events include `affiliate_id`, `advertiser`, `network`, `category`, `source_page`, `placement`, `link_text`, `clickref`, and `destination_type`. Official fallbacks use the same context with `link_type=official`.

Each user action sends each applicable event once. An affiliate partner-tool click intentionally creates one `affiliate_click` and one `partner_tool_click`; these are different event categories, not duplicate affiliate events. An official fallback creates one `official_provider_click` and one `partner_tool_click`.

Example affiliate event parameters:

```text
affiliate_id=hellosafe-travel-insurance
advertiser=HelloSafe
network=Awin
category=travel-insurance
source_page=/research/travel-insurance-comparison
placement=inline-primary
link_text=Compare travel insurance
clickref=offerradar-research-travel-insurance-comparison-inline-primary
destination_type=partner-tool
```

## Testing

1. Open an allowed page in a production-mode local build.
2. Inspect the rendered anchor for `rel="sponsored nofollow noopener noreferrer"` and a sanitized `clickref`.
3. Click the resource and confirm the GA4 event in DebugView when a debug environment is configured.
4. Enable first-party analytics in a non-public test environment and confirm aggregate counts in `/ops/revenue`.
5. Test an unrelated route with `resolveAffiliateLink`; it must return no link.

## Debugging Checklist

- Confirm production mode before expecting GA4 requests.
- Confirm the registry entry is approved and active.
- Confirm the current page and placement appear as active rows in `data/affiliatePlacementMap.csv`.
- Confirm the current route is allowed and not prohibited.
- Confirm the anchor has the expected `clickref` and sponsored relationship attributes.
- Confirm only one `affiliate_click` is emitted for one click.
- Confirm the first-party analytics feature flags before expecting `/api/events` data.
- Confirm no email, name, notes, account details, or other personal data are present in event parameters.
- Use `/ops/revenue` only after unlocking the private ops session.

Future partner events belong in `AffiliateLink` or another central tracked component, not in individual article templates.
