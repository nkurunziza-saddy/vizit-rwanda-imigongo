import {
	DB_KEYS,
	type Listing,
	type ListingMedia,
	delay,
} from "../utils/mock-db";

export const getListings = async (): Promise<Listing[]> => {
	await delay(500);
	const listingsStr = localStorage.getItem(DB_KEYS.LISTINGS);
	return listingsStr ? JSON.parse(listingsStr) : [];
};

export const getListingById = async (
	id: number,
): Promise<{ listing: Listing; media: ListingMedia[] } | null> => {
	await delay(300);
	const listingsStr = localStorage.getItem(DB_KEYS.LISTINGS);
	const mediaStr = localStorage.getItem(DB_KEYS.LISTING_MEDIA);

	if (!listingsStr) return null;

	const listings: Listing[] = JSON.parse(listingsStr);
	const fullMedia: ListingMedia[] = mediaStr ? JSON.parse(mediaStr) : [];

	const listing = listings.find((l) => l.id === id);
	if (!listing) return null;

	const media = fullMedia
		.filter((m) => m.listing_id === id)
		.sort((a, b) => a.sort_order - b.sort_order);

	return { listing, media };
};

export const searchListings = async (query: string): Promise<Listing[]> => {
	await delay(500);
	const allListings = await getListings();
	const lowerQuery = query.toLowerCase();

	return allListings.filter(
		(l) =>
			l.title.toLowerCase().includes(lowerQuery) ||
			l.description.toLowerCase().includes(lowerQuery) ||
			l.listing_type.toLowerCase().includes(lowerQuery),
	);
};
