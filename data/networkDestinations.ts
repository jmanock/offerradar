export type NetworkDestination = { id:string; name:string; href:string; category:"hotel"|"flight"|"cruise"|"local"|"travel-money"; description:string; active:boolean; lastVerified:string };
// Add destinations only after domain ownership, live usefulness, canonical status,
// reciprocal context, and analytics policy are verified.
export const networkDestinations:NetworkDestination[]=[];
