import offersJson from "@/data/offers.json";
import type { Offer } from "@/types/offer";

// JSON is the V5 source of truth for public offer records. Automation scripts
// update data/offers.json; app helpers keep consuming typed Offer objects.
export const offers = offersJson as Offer[];
