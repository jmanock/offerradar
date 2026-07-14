# OfferRadar analytics events

Events use Google Analytics through `lib/analytics.ts`. Production-only dispatch prevents local QA from polluting reporting. No notes, target values, email addresses, eligibility details, or other sensitive values are sent.

| Event | Trigger | Parameters | Business question |
| --- | --- | --- | --- |
| `offer_card_click` | Visitor opens an offer from a card or tracker | `offer_id`, `provider`, `category` or `source_page` | Which offer records drive detail exploration? |
| `provider_click` | Planned tracked provider navigation | `provider`, `source_page` | Which providers attract research interest? |
| `outbound_offer_click` | Visitor opens a reviewed external offer/provider link | `offer_slug`, `provider`, `category`, `link_type` | Which records send visitors to a provider? |
| `affiliate_click` | Outbound registry link has `link_type=affiliate` | Same non-sensitive outbound context | Which disclosed affiliate links are used? |
| `official_source_click` | Outbound registry link is neutral/official | Same non-sensitive outbound context | Which official verification sources are used? |
| `save_to_watchlist` | Visitor saves an offer locally | `offer_id`, `provider` | Which offers create return intent? |
| `remove_from_watchlist` | Visitor removes a saved offer | `offer_id`, `provider`, optional `source_page` | Where does saved-offer interest fall away? |
| `filter_used` | Tracker category, provider, status, freshness, type, availability, range, or sorting changes | `filter_name`, `filter_value`, `source_page` | How do visitors narrow the market? |
| `comparison_opened` | Reserved for tracked comparison entry points | comparison slug, source page | Which comparisons are useful? |
| `article_click` | Visitor opens a V15 research article card | `article_slug`, `source_page` | Which research topics support discovery? |
| `network_outbound_click` | Future verified Florida Deals Network link | `network_destination`, `source_page`, `link_position` | Which network destinations receive qualified traffic? |
| `recently_changed_click` | Reserved for tracked feed entry points | `offer_id`, `source_page` | Does review/change activity drive detail views? |
| `finder_start` / `finder_complete` | Existing/future finder workflow boundaries | non-sensitive selection counts/categories | Does the finder help visitors reach a result? |

Legacy `offer_click`, `compare_click`, `lead_submit`, `newsletter_signup`, and `city_page_view` events remain intact for continuity.

## QA

1. Run a production build locally; development mode intentionally does not send events.
2. Inspect `window.dataLayer` or GA DebugView with an authorized test property.
3. Confirm watchlist notes and target values never appear in payloads.
4. Verify outbound events fire once per click and carry the registry `link_type`.
