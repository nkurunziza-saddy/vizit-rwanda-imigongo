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
	listing_type: "hotel_room" | "bnb" | "car" | "tour" | "guide" | "ticket";
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

const HOTEL_IMAGES = [
	"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1590490360182-f33efe293b3b?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1507720365775-f9a888a7c2ac?auto=format&fit=crop&w=800&q=80",
];

const BNB_IMAGES = [
	"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
];

const CAR_IMAGES = [
	"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
];

const TOUR_IMAGES = [
	"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1517400508447-f8dd518b86db?auto=format&fit=crop&w=800&q=80",
];

const GUIDE_IMAGES = [
	"https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
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
		if (listingType === "bnb")
			title = `${faker.word.adjective()} City Apartment`;
		if (listingType === "car")
			title = `${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`;
		if (listingType === "tour")
			title = `${faker.location.city()} Full-Day Experience`;
		if (listingType === "guide")
			title = `Expert Guide: ${faker.person.fullName()}`;

		let listingImage = "";
		switch (listingType) {
			case "hotel_room":
				listingImage = faker.helpers.arrayElement(HOTEL_IMAGES);
				break;
			case "bnb":
				listingImage = faker.helpers.arrayElement(BNB_IMAGES);
				break;
			case "car":
				listingImage = faker.helpers.arrayElement(CAR_IMAGES);
				break;
			case "tour":
				listingImage = faker.helpers.arrayElement(TOUR_IMAGES);
				break;
			case "guide":
				listingImage = faker.helpers.arrayElement(GUIDE_IMAGES);
				break;
			default:
				listingImage = faker.helpers.arrayElement(TOUR_IMAGES);
		}

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
			image_url: listingImage,
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
			// Here we could also try to be specific but listing object has the main image
			// For simplicity we use the same pool or listing image for now,
			// or just travel images for generic media.
			// Let's reuse the listing image for the first one to match card
			let mediaUrl = listing.image_url;
			if (i > 0) {
				// For additional images, pick random from same category pool if possible, or generic
				mediaUrl = faker.image.urlLoremFlickr({ category: "travel" });
			}

			media.push({
				id: id++,
				listing_id: listing.id,
				media_url: mediaUrl || "",
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

	const DB_VERSION = "3"; // Increment this to force re-seed
	const storedVersion = localStorage.getItem("vizit_db_version");
	let shouldReseed = storedVersion !== DB_VERSION;

	if (shouldReseed) {
		console.log("♻️ Database version mismatch. Forcing re-seed...");
		localStorage.clear(); // Clear everything to be safe
		localStorage.setItem("vizit_db_version", DB_VERSION);
	} else if (!localStorage.getItem(DB_KEYS.USERS)) {
		shouldReseed = true;
	}

	if (shouldReseed) {
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
		localStorage.setItem(DB_KEYS.BOOKINGS, JSON.stringify([]));
		localStorage.setItem(DB_KEYS.BOOKING_ITEMS, JSON.stringify([]));
		localStorage.setItem(DB_KEYS.TESTIMONIALS, JSON.stringify([]));

		console.log("✅ LocalStorage seeded successfully!");
	} else {
		console.log("ℹ️ LocalStorage already seeded.");
	}
};

// --- Helpers to simulate network delay ---
export const delay = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));
