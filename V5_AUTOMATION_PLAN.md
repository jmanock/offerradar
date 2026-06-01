# OfferRadar V5 Automation Plan

## Daily Target

- Target run time: 6 AM local server time.
- V5 mode: local generation and reporting only.
- Future mode: reviewed commit and deploy flow after validation passes.

## Intel Automation Server Role

- Maintain reviewed offer inputs.
- Run the normalization, validation, change detection, and report pipeline.
- Save reports for editorial review.
- Prepare commits only when explicitly configured.
- Avoid scraping, external APIs, credentials, or autonomous deployment until a
  later approved phase.

## GitHub Push Flow

1. Run the pipeline locally.
2. Review `automation/reports/latest-offer-report.md`.
3. Run `npm run lint` and `npm run build`.
4. Commit generated offer data and reports with:
   `python3 automation/scripts/run_offer_pipeline.py --write --commit`.
5. Push manually after human review.

## DigitalOcean Pull/Build/Restart Flow

V5 does not deploy automatically. The future reviewed deploy command sequence is:

```bash
cd /var/www/offerradar
git pull
npm install
npm run build
pm2 restart offerradar
```

## Human Review Vs Autonomous Mode

- Human review mode is the default for launch readiness.
- Autonomous mode should remain disabled until source quality, monitoring,
  rollback, alerting, and compliance review are in place.
- Any future autonomous mode must require explicit configuration and should keep
  deployment separate from data generation.
