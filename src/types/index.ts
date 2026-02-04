export * from "./api.types";

export interface Addon {
	id: number;
	name: string;
	description: string;
	price: number;
	price_type: "per_stay" | "per_night" | "per_person";
}

export interface Listing {
	id: number;
	title: string;
	description: string;
	listingType: string;
	basePrice: number;
	currency: string;
	capacity: number;
	locationId: string;
	imageUrl: string;
	rating: number;
	reviewCount: number;
	amenities: string[];
	addons: Addon[];
	images: string[];
}

export interface User {
	id: string;
	email: string;
	fullName: string;
	phone?: string;
	role: string;
	preferredCurrency: string;
	createdAt: string;
	avatarUrl?: string;
}

export interface Review {
	id: number;
	userId: string;
	listingId: number;
	rating: number;
	comment: string;
	createdAt: string;
	user: {
		fullName: string;
		avatarUrl: string;
	};
}

