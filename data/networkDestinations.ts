export type NetworkDestination = { id:string; name:string; href:string; category:"hotel"|"flight"|"cruise"|"local"|"travel-money"; description:string; active:boolean; lastVerified:string };
// Add destinations only after domain ownership, live usefulness, canonical status,
// reciprocal context, and analytics policy are verified.
export const networkDestinations:NetworkDestination[]=[
  { id:"florida-flight-deals", name:"Florida Flight Deals", href:"https://flightdealsflorida.org", category:"flight", description:"Continue with Florida-focused flight research and travel planning.", active:true, lastVerified:"2026-07-22" },
  { id:"florida-hotel-deals", name:"Florida Hotel Deals", href:"https://hoteldealsflorida.org", category:"hotel", description:"Research Florida stays after planning payment and travel costs.", active:true, lastVerified:"2026-07-22" },
  { id:"florida-cruise-deals", name:"Florida Cruise Deals", href:"https://cruisedealsflorida.org", category:"cruise", description:"Explore cruise research alongside card, insurance, and connectivity checks.", active:true, lastVerified:"2026-07-22" },
  { id:"florida-local-deals", name:"Florida Local Deals", href:"https://localdealsflorida.org", category:"local", description:"Browse local Florida research and trip-adjacent resources.", active:true, lastVerified:"2026-07-22" },
];
