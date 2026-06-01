# OfferRadar Launch Checklist

- Confirm DNS A record points `offerradar.io` to `162.243.4.99`.
- Confirm `www` CNAME points to `offerradar.io`.
- Run `npm run lint`.
- Run `npm run build`.
- Review local routes for homepage, offers, categories, providers, best-of pages, offer-type pages, state pages, disclosures, and editorial policy.
- Deploy after human approval.
- Run `sudo nginx -t`.
- Reload Nginx.
- Configure SSL with Certbot.
- Add Google Analytics if desired.
- Add Google Search Console.
- Submit `https://offerradar.io/sitemap.xml`.
- Check `https://offerradar.io/robots.txt`.
- Check `https://offerradar.io/sitemap.xml`.
- Spot-check provider pages and offer detail pages for cautious language and working internal links.
