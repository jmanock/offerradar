This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Morning Content Engine Signal Export

Offer Radar can export its strongest finance, banking, credit card, cash back, and deal alert offers as standardized JSON signals for Morning Content Engine.

Run:

```bash
npm run signals:export
```

The exporter writes files to:

```text
signals/outbox/
```

Each signal follows the Morning Content Engine Signal Contract with:

- `source_project`: `offer-radar`
- `brand`: `Offer Radar`
- `source_type`: `financial_offer`, `credit_card_offer`, `banking_offer`, `cashback_offer`, or `deal_alert`
- `title`, `summary`, `url`, `category`, `priority`, and `confidence`
- metadata for offer id, category, estimated value, affiliate network, merchant/provider, expiration, source URL, and priority reason

The exporter skips weak, expired, duplicate, and incomplete offers. Filenames are stable by date and offer slug, so re-running the command on the same day will not create duplicate files.

Workflow:

```bash
cd ~/Documents/Codex/offerradar
npm run signals:export

cd ~/Documents/Codex/morning-content-engine
python main.py collect-signals
python main.py morning
open reports/$(date +%F)/preview.html
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
