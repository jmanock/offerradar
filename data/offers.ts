export type OfferCategory = 
	| "bank"
	| "brokerage"
	| "regerral";

export interface Offer {
	slug: sting;
	title: string;
	provider: string;
	category: OfferCategory;
	offerAmount: string;
	description: string;
	requirements: string[];
	expires?: string;
	referralUrl?: string;
	lastVerified: string;
	featured?: boolean;
}

