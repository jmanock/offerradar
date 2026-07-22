import { readRuntimeJson } from "@/lib/runtimeStore";

export type AffiliateRevenueRow = { date: string; network: string; advertiser: string; clicks: number; transactions: number; revenue: number };
export type AffiliateRevenueImport = { importedAt: string; source: string; rows: AffiliateRevenueRow[] };

const empty: AffiliateRevenueImport = { importedAt: "", source: "", rows: [] };

export async function getAffiliateRevenue() { return readRuntimeJson<AffiliateRevenueImport>("affiliate-revenue.json", empty); }
export function summarizeAffiliateRevenue(rows: AffiliateRevenueRow[]) { return rows.reduce((summary, row) => ({ clicks: summary.clicks + row.clicks, transactions: summary.transactions + row.transactions, revenue: summary.revenue + row.revenue }), { clicks: 0, transactions: 0, revenue: 0 }); }
