import { faker } from "@faker-js/faker";

// --- Types based on db-structure.md ---

export type User = {
	id: number;
	full_name: string;
	email: string;
	password_hash: string;
	phone: string;
	role: "tourist" | "vendor" | "admin";
	preferred_currency: string;
	created_at: string; // timestamp
};

export type Vendor = {
	id: number;
	user_id: number;
	business_name: string;
	vendor_type: "hotel" | "bnb" | "car_rental" | "guide" | "tour_operator";
	bio: string;
	is_approved: boolean;
	approved_by?: number;
	approved_at?: string;
};

export type Location = {
	id: number;
	name: string;
	country: string;
	latitude: number;
	longitude: number;
};

export type Listing = {
	id: number;
	vendor_id: number;
	location_id: number;
	title: string;
	listing_type: "hotel_room" | "bnb" | "car" | "tour" | "guide";
	description: string;
	base_price: number;
	currency: string;
	capacity: number;
	status: "draft" | "active" | "paused";
	image_url?: string;
	created_at: string;
	addons: Addon[];
};

export type Addon = {
	id: number;
	name: string;
	description: string;
	price: number;
	price_type: "per_person" | "per_stay" | "per_night";
};

export type ListingMedia = {
	id: number;
	listing_id: number;
	media_url: string;
	media_type: "image" | "video";
	sort_order: number;
};

export type Availability = {
	id: number;
	listing_id: number;
	start_date: string; // date
	end_date: string; // date
	available_quantity: number;
	price_override?: number;
	is_blocked: boolean;
};

export type Booking = {
	id: number;
	user_id: number;
	total_amount: number;
	currency: string;
	status: "pending" | "confirmed" | "cancelled" | "completed";
	created_at: string;
	updated_at: string;
};

export type BookingItem = {
	id: number;
	booking_id: number;
	listing_id: number;
	start_date: string;
	end_date: string;
	quantity: number;
	unit_price: number;
	subtotal: number;
	selected_addons: {
		addon_id: number;
		quantity: number;
		subtotal: number;
	}[];
};

export type Ticket = {
	id: number;
	booking_id: number;
	pdf_url: string;
	qr_code_data: string;
	issued_at: string;
	expires_at: string;
};

export type Testimonial = {
	id: number;
	user_id: number;
	listing_id: number;
	rating: number; // integer
	comment: string;
	created_at: string;
};

// --- DB Keys ---

export const DB_KEYS = {
	USERS: "vizit_users",
	VENDORS: "vizit_vendors",
	LOCATIONS: "vizit_locations",
	LISTINGS: "vizit_listings",
	LISTING_MEDIA: "vizit_listing_media",
	AVAILABILITIES: "vizit_availabilities",
	BOOKINGS: "vizit_bookings",
	BOOKING_ITEMS: "vizit_booking_items",
	TICKETS: "vizit_tickets",
	TESTIMONIALS: "vizit_testimonials",
};

// --- Generators ---

const generateUsers = (count: number): User[] => {
	const users: User[] = [];
	// Ensure at least one admin, one vendor, and one tourist
	users.push({
		id: 1,
		full_name: "Admin User",
		email: "admin@vizit.rw",
		password_hash: "admin123",
		phone: faker.phone.number(),
		role: "admin",
		preferred_currency: "RWF",
		created_at: new Date().toISOString(),
	});
	users.push({
		id: 2,
		full_name: "Vendor One",
		email: "vendor@vizit.rw",
		password_hash: "vendor123",
		phone: faker.phone.number(),
		role: "vendor",
		preferred_currency: "RWF",
		created_at: new Date().toISOString(),
	});
	users.push({
		id: 3,
		full_name: "Tourist One",
		email: "tourist@vizit.rw",
		password_hash: "tourist123",
		phone: faker.phone.number(),
		role: "tourist",
		preferred_currency: "USD",
		created_at: new Date().toISOString(),
	});

	for (let i = 4; i <= count; i++) {
		users.push({
			id: i,
			full_name: faker.person.fullName(),
			email: faker.internet.email(),
			password_hash: "password",
			phone: faker.phone.number(),
			role: faker.helpers.arrayElement(["tourist", "vendor"]),
			preferred_currency: faker.helpers.arrayElement(["USD", "RWF", "EUR"]),
			created_at: faker.date.past().toISOString(),
		});
	}
	return users;
};

const generateVendors = (users: User[]): Vendor[] => {
	const vendors: Vendor[] = [];
	const vendorUsers = users.filter((u) => u.role === "vendor");
	let id = 1;
	for (const user of vendorUsers) {
		vendors.push({
			id: id++,
			user_id: user.id,
			business_name: faker.company.name(),
			vendor_type: faker.helpers.arrayElement([
				"hotel",
				"bnb",
				"car_rental",
				"guide",
				"tour_operator",
			]),
			bio: faker.company.catchPhrase(),
			is_approved: true,
			approved_by: 1, // Admin
			approved_at: faker.date.recent().toISOString(),
		});
	}
	return vendors;
};

const locationsData: Location[] = [
	{
		id: 1,
		name: "Kigali",
		country: "Rwanda",
		latitude: -1.9441,
		longitude: 30.0619,
	},
	{
		id: 2,
		name: "Musanze",
		country: "Rwanda",
		latitude: -1.5034,
		longitude: 29.6326,
	},
	{
		id: 3,
		name: "Rubavu",
		country: "Rwanda",
		latitude: -1.6763,
		longitude: 29.2619,
	},
	{
		id: 4,
		name: "Akagera",
		country: "Rwanda",
		latitude: -1.8214,
		longitude: 30.7303,
	},
	{
		id: 5,
		name: "Nyungwe",
		country: "Rwanda",
		latitude: -2.4862,
		longitude: 29.1171,
	},
];

const generateListings = (count: number, vendors: Vendor[]): Listing[] => {
	const listings: Listing[] = [];
	for (let i = 1; i <= count; i++) {
		const vendor = faker.helpers.arrayElement(vendors);
		const listingTypes = ["hotel_room", "bnb", "car", "tour", "guide"] as const;
		const listingType = faker.helpers.arrayElement(listingTypes);

		// Adjust title based on type for realism
		let title = faker.commerce.productName();
		if (listingType === "hotel_room")
			title = `${faker.word.adjective()} Suite at ${vendor.business_name}`;
		if (listingType === "car")
			title = `${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`;

		const addonCount = faker.number.int({ min: 0, max: 4 });
		const addons: Addon[] = [];
		for (let k = 0; k < addonCount; k++) {
			addons.push({
				id: k + 1,
				name: faker.commerce.productName(),
				description: faker.commerce.productDescription(),
				price: parseFloat(faker.commerce.price({ min: 10, max: 100 })),
				price_type: faker.helpers.arrayElement([
					"per_person",
					"per_stay",
					"per_night",
				]),
			});
		}

		listings.push({
			id: i,
			vendor_id: vendor.id,
			location_id: faker.helpers.arrayElement(locationsData).id,
			title: title,
			listing_type: listingType,
			description: faker.lorem.paragraph(),
			base_price: parseFloat(faker.commerce.price({ min: 20, max: 500 })),
			currency: "USD",
			capacity: faker.number.int({ min: 1, max: 10 }),
			status: "active",
			created_at: faker.date.past().toISOString(),
			addons: addons,
		});
	}
	return listings;
};

const generateListingMedia = (listings: Listing[]): ListingMedia[] => {
	const media: ListingMedia[] = [];
	let id = 1;
	for (const listing of listings) {
		// Add 1-3 images per listing
		const count = faker.number.int({ min: 1, max: 3 });
		for (let i = 0; i < count; i++) {
			media.push({
				id: id++,
				listing_id: listing.id,
				media_url: faker.image.urlLoremFlickr({ category: "travel" }),
				media_type: "image",
				sort_order: i,
			});
		}
	}
	return media;
};

// --- Initialization ---

export const initializeMockDB = () => {
	if (typeof window === "undefined") return; // Server-side guard

	if (!localStorage.getItem(DB_KEYS.USERS)) {
		console.log("⚡ Seeding LocalStorage with Mock Data...");

		const users = generateUsers(20);
		const vendors = generateVendors(users);
		const locations = locationsData;
		const listings = generateListings(50, vendors);
		const listingMedia = generateListingMedia(listings);

		localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
		localStorage.setItem(DB_KEYS.VENDORS, JSON.stringify(vendors));
		localStorage.setItem(DB_KEYS.LOCATIONS, JSON.stringify(locations));
		localStorage.setItem(DB_KEYS.LISTINGS, JSON.stringify(listings));
		localStorage.setItem(DB_KEYS.LISTING_MEDIA, JSON.stringify(listingMedia));

		// Initialize empty tables for others
		if (!localStorage.getItem(DB_KEYS.BOOKINGS))
			localStorage.setItem(DB_KEYS.BOOKINGS, JSON.stringify([]));
		if (!localStorage.getItem(DB_KEYS.BOOKING_ITEMS))
			localStorage.setItem(DB_KEYS.BOOKING_ITEMS, JSON.stringify([]));
		if (!localStorage.getItem(DB_KEYS.TESTIMONIALS))
			localStorage.setItem(DB_KEYS.TESTIMONIALS, JSON.stringify([]));

		console.log("✅ LocalStorage seeded successfully!");
	} else {
		console.log("ℹ️ LocalStorage already seeded.");
	}
};

// --- Helpers to simulate network delay ---
export const delay = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));
