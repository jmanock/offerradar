# OfferRadar IndexNow

IndexNow is a search engine notification protocol that lets OfferRadar tell participating search engines when important URLs are created, updated, or removed. It does not replace the sitemap, Google Search Console, Bing Webmaster Tools, or normal crawling. It is an indexing signal, not an indexing guarantee.

## Key Verification

OfferRadar uses this IndexNow key:

```text
fbd66d1bed94486a87683b0b5f029153
```

The key file is published at:

```text
https://offerradar.io/fbd66d1bed94486a87683b0b5f029153.txt
```

After deploy, verify the key file by opening that URL in a browser or with:

```bash
curl https://offerradar.io/fbd66d1bed94486a87683b0b5f029153.txt
```

The response should be exactly the key value.

## Dry Run

Run a dry run before submitting:

```bash
npm run indexnow:dry
```

The dry run reads sitemap URLs from the local production build output when available and prints the URLs that would be sent. It does not contact Bing.

To inspect a smaller or larger batch directly:

```bash
python3 -B automation/scripts/submit_indexnow.py --limit 10
```

## Submit URLs

Submit URLs only after a reviewed production deploy:

```bash
npm run indexnow:submit
```

To submit a limited batch:

```bash
python3 -B automation/scripts/submit_indexnow.py --submit --limit 50
```

The script submits to:

```text
https://www.bing.com/indexnow
```

No credentials or secrets are required. The public key file verifies ownership.

## When To Use

Use IndexNow after:

- A production deploy that adds or updates important public pages.
- A meaningful offer, provider, guide, comparison, or local SEO page update.
- Removing public URLs that should be recrawled.

Do not submit repeatedly for unchanged pages. IndexNow should support crawling, not spam search engines with duplicate notifications.
