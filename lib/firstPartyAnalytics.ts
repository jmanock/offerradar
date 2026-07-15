import { readRuntimeJson, writeRuntimeJson } from "@/lib/runtimeStore";

export type AnalyticsAggregate = { updatedAt:string; events:Record<string,number>; sources:Record<string,number>; pages:Record<string,number>; returnState:Record<string,number>; dimensions:Record<string,Record<string,number>> };
const empty: AnalyticsAggregate = { updatedAt:"", events:{}, sources:{}, pages:{}, returnState:{}, dimensions:{} };
const allowed = new Set(["page_view","offer_detail_view","official_source_click","affiliate_click","offer_card_click","save_to_watchlist","remove_from_watchlist","alert_subscription","network_outbound_click","comparison_opened","article_click","recently_changed_click","filter_used"]);

export function firstPartyAnalyticsAvailable(){return process.env.FIRST_PARTY_ANALYTICS_ENABLED === "true";}
export async function recordFirstPartyEvent(input:{name:string;source?:string;page?:string;return_state?:string;dimension?:string}){
  if(!firstPartyAnalyticsAvailable()||!allowed.has(input.name))return false;
  const aggregate=await readRuntimeJson<AnalyticsAggregate>("analytics-aggregate.json",empty);
  aggregate.dimensions ||= {};
  increment(aggregate.events,input.name); if(input.source)increment(aggregate.sources,input.source.slice(0,60)); if(input.page)increment(aggregate.pages,input.page.slice(0,160)); if(input.return_state)increment(aggregate.returnState,input.return_state); if(input.dimension){aggregate.dimensions[input.name]||={};increment(aggregate.dimensions[input.name],input.dimension.slice(0,120));}
  aggregate.updatedAt=new Date().toISOString(); await writeRuntimeJson("analytics-aggregate.json",aggregate); return true;
}
export async function getFirstPartyAnalytics(){return readRuntimeJson<AnalyticsAggregate>("analytics-aggregate.json",empty);}
function increment(record:Record<string,number>,key:string){record[key]=(record[key]||0)+1;}
