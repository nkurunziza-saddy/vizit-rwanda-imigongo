import type {
	BookingFilters,
	CreateBookingInput,
	CreateListingInput,
	Listing,
	ListingFilters,
	LoginInput,
	RegisterInput,
	User,
	Vendor,
} from "@/types";
import {
	DB_KEYS,
	type Booking as DBBooking,
	type Listing as DBListing,
	type ListingMedia as DBListingMedia,
	type Location as DBLocation,
	type User as DBUser,
	type Vendor as DBVendor,
} from "@/utils/mock-db";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getFromStorage = <T>(key: string): T[] => {
	if (typeof window === "undefined") return [];
	const stored = localStorage.getItem(key);
	return stored ? JSON.parse(stored) : [];
};

const mapVendorToSchema = (v: DBVendor): Vendor => ({
	id: String(v.id),
	userId: String(v.user_id),
	businessName: v.business_name,
	vendorType: v.vendor_type,
	bio: v.bio || "",
	status: v.is_approved
		? "approved"
		: (v as any).status || (v.is_approved === false ? "pending" : "pending"),
	isApproved: v.is_approved,
	approvedBy: v.approved_by ? String(v.approved_by) : undefined,
	approvedAt: v.approved_at,
	email: "vendor@example.com",
	phone: "+250 788 000 000",
	address: "Kigali, Rwanda",
	commissionRate: 10,
	createdAt: (v as any).created_at || new Date().toISOString(),
	updatedAt: (v as any).updated_at || new Date().toISOString(),
	bankAccountName: (v as any).bank_account_name,
	bankAccountNumber: (v as any).bank_account_number,
	bankName: (v as any).bank_name,
	bankSwiftCode: (v as any).bank_swift_code,
});

const mapListingToSchema = (l: DBListing): Listing => ({
	id: l.id,
	vendorId: l.vendor_id,
	locationId: l.location_id,
	title: l.title,
	listingType: l.listing_type,
	description: l.description,
	basePrice: l.base_price,
	currency: l.currency,
	capacity: l.capacity,
	status: l.status,
	imageUrl: l.image_url,
	createdAt: l.created_at,
	updatedAt: (l as any).updated_at || new Date().toISOString(),
	addons: l.addons || [],
});

const mapUserToSchema = (u: DBUser): User => ({
	id: u.id,
	fullName: u.full_name,
	email: u.email,
	phone: u.phone,
	role: u.role,
	preferredCurrency: u.preferred_currency,
	isActive: true,
	createdAt: u.created_at,
});

export const mockHandlers = {
	auth: {
		login: async (data: LoginInput) => {
			await delay(500);
			const users = getFromStorage<DBUser>(DB_KEYS.USERS);
			const user = users.find(
				(u) => u.email === data.email && u.password_hash === data.password,
			);

			if (!user) {
				throw new Error("Invalid credentials");
			}

			const token = `mock_token_${user.id}_${Date.now()}`;
			localStorage.setItem("vizit_auth_token", token);
			localStorage.setItem(
				"vizit_current_user",
				JSON.stringify(mapUserToSchema(user)),
			);

			return { user: mapUserToSchema(user), token };
		},
		register: async (data: RegisterInput) => {
			await delay(800);
			const users = getFromStorage<DBUser>(DB_KEYS.USERS);
			if (users.find((u) => u.email === data.email)) {
				throw new Error("Email already exists");
			}

			const newUser: DBUser = {
				id: users.length + 1,
				full_name: data.fullName,
				email: data.email,
				password_hash: data.password,
				phone: "",
				role: data.role as "tourist" | "vendor" | "admin",
				preferred_currency: "USD",
				created_at: new Date().toISOString(),
			};

			users.push(newUser);
			localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));

			const token = `mock_token_${newUser.id}_${Date.now()}`;
			return { user: mapUserToSchema(newUser), token };
		},
		logout: async () => {
			await delay(200);
			localStorage.removeItem("vizit_auth_token");
			localStorage.removeItem("vizit_current_user");
			return { success: true };
		},
		me: async () => {
			await delay(300);
			const userStr = localStorage.getItem("vizit_current_user");
			if (!userStr) throw new Error("Not authenticated");
			return JSON.parse(userStr);
		},
	},

	listings: {
		getAll: async (filters?: ListingFilters) => {
			await delay(600);
			let listings = getFromStorage<DBListing>(DB_KEYS.LISTINGS);
			// vendors and locations variables removed as they are unused

			// Join data manually since we can't mutate DB types easily to generic ANY without casting
			// Filter first for performance
			if (filters?.search) {
				const q = filters.search.toLowerCase();
				listings = listings.filter(
					(l) =>
						l.title.toLowerCase().includes(q) ||
						l.description.toLowerCase().includes(q),
				);
			}

			if (filters?.category) {
				listings = listings.filter((l) => l.listing_type === filters.category);
			}

			return listings.map((l) => mapListingToSchema(l));
		},
		getById: async (id: number) => {
			await delay(300);
			const listings = getFromStorage<DBListing>(DB_KEYS.LISTINGS);
			const listing = listings.find((l) => l.id === id);
			if (!listing) throw new Error("Listing not found");

			const schemaListing = mapListingToSchema(listing);
			const media = getFromStorage<DBListingMedia>(
				DB_KEYS.LISTING_MEDIA,
			).filter((m) => m.listing_id === id);

			const mappedMedia = media.map((m) => ({
				id: m.id,
				listingId: m.listing_id,
				mediaUrl: m.media_url,
				mediaType: m.media_type,
				sortOrder: m.sort_order,
			}));

			return {
				listing: schemaListing,
				media: mappedMedia,
			};
		},
		search: async (query: string) => {
			await delay(400);
			const listings = getFromStorage<DBListing>(DB_KEYS.LISTINGS);
			const q = query.toLowerCase();
			const matched = listings.filter(
				(l) =>
					l.title.toLowerCase().includes(q) ||
					l.description.toLowerCase().includes(q),
			);
			return matched.map(mapListingToSchema);
		},
		create: async (data: CreateListingInput, userId: string | number) => {
			await delay(800);
			const listings = getFromStorage<DBListing>(DB_KEYS.LISTINGS);
			const vendors = getFromStorage<DBVendor>(DB_KEYS.VENDORS);
			const vendor =
				vendors.find((v) => String(v.user_id) === String(userId)) || vendors[0];

			if (!vendor) throw new Error("Vendor not found for user");

			const newListing: DBListing = {
				id: listings.length + 1,
				vendor_id: vendor.id,
				location_id: data.locationId ?? 1,
				title: data.title,
				listing_type: data.listingType as any,
				description: data.description,
				base_price: data.basePrice,
				currency: data.currency,
				capacity: data.capacity,
				status: "active",
				image_url: "",
				created_at: new Date().toISOString(),
				addons: [],
			};

			listings.push(newListing);
			localStorage.setItem(DB_KEYS.LISTINGS, JSON.stringify(listings));
			return mapListingToSchema(newListing);
		},
	},

	bookings: {
		getMyBookings: async (
			userId: string | number,
			_filters?: BookingFilters,
		) => {
			await delay(500);
			if (!userId) return [];
			const bookings = getFromStorage<DBBooking>(DB_KEYS.BOOKINGS);
			const userBookings = bookings.filter(
				(b) => String(b.user_id) === String(userId),
			);

			return userBookings.map((b) => ({
				id: b.id,
				totalAmount: b.total_amount,
				status: b.status,
				createdAt: b.created_at,
			}));
		},
		create: async (_data: CreateBookingInput, userId: string | number) => {
			await delay(1000);
			const bookings = getFromStorage<DBBooking>(DB_KEYS.BOOKINGS);
			const newBooking: DBBooking = {
				id: bookings.length + 1,
				user_id: Number(userId),
				total_amount: 100,
				currency: "USD",
				status: "pending",
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			};
			bookings.push(newBooking);
			localStorage.setItem(DB_KEYS.BOOKINGS, JSON.stringify(bookings));
			return newBooking;
		},
	},

	locations: {
		getAll: async () => {
			await delay(200);
			return getFromStorage<DBLocation>(DB_KEYS.LOCATIONS);
		},
		getById: async (id: number) => {
			await delay(200);
			const locations = getFromStorage<DBLocation>(DB_KEYS.LOCATIONS);
			return locations.find((p) => p.id === id);
		},
	},

	vendors: {
		getAll: async () => {
			await delay(400);
			const vendors = getFromStorage<DBVendor>(DB_KEYS.VENDORS);
			return vendors.map(mapVendorToSchema);
		},
		getByUserId: async (userId: string | number) => {
			await delay(300);
			const vendors = getFromStorage<DBVendor>(DB_KEYS.VENDORS);
			const vendor = vendors.find((v) => String(v.user_id) === String(userId));
			if (!vendor) return null;
			return mapVendorToSchema(vendor);
		},
		register: async (data: any, userId: string | number) => {
			await delay(1000);
			const vendors = getFromStorage<DBVendor>(DB_KEYS.VENDORS);
			const newVendor: DBVendor = {
				id: vendors.length + 1,
				user_id: Number(userId),
				business_name: data.businessName,
				vendor_type: data.vendorType,
				bio: data.bio,
				is_approved: false,
				approved_by: undefined,
				approved_at: undefined,
			};
			vendors.push(newVendor);
			localStorage.setItem(DB_KEYS.VENDORS, JSON.stringify(vendors));
			return mapVendorToSchema(newVendor);
		},
	},

	admin: {
		getPendingVendors: async () => {
			await delay(600);
			const vendors = getFromStorage<DBVendor>(DB_KEYS.VENDORS);
			const pending = vendors.filter((v) => v.is_approved === false);
			return pending.map(mapVendorToSchema);
		},
		approveVendor: async (id: number, approved: boolean) => {
			await delay(500);
			const vendors = getFromStorage<DBVendor>(DB_KEYS.VENDORS);
			const index = vendors.findIndex((v) => v.id === id);
			if (index === -1) throw new Error("Vendor not found");

			vendors[index].is_approved = approved;
			if (approved) {
				vendors[index].approved_at = new Date().toISOString();
				vendors[index].approved_by = 1;
			}

			localStorage.setItem(DB_KEYS.VENDORS, JSON.stringify(vendors));
			return mapVendorToSchema(vendors[index]);
		},
		getDashboardStats: async () => {
			await delay(400);
			return {
				totalRevenue: 15400,
				activeBookings: 24,
				pendingApprovals: 5,
				totalUsers: 142,
			};
		},
		getAllUsers: async () => {
			await delay(500);
			const users = getFromStorage<DBUser>(DB_KEYS.USERS);
			return users.map(mapUserToSchema);
		},
	},
};
