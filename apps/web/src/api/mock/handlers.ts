// Mock API Handlers
// These simulate Django backend responses using localStorage
// When VITE_API_URL is set, the real API will be used instead

import { DB_KEYS, initializeMockDB } from "@/utils/mock-db";
import type {
  Listing,
  Booking,
  User,
  ListingFilters,
  BookingFilters,
  LoginInput,
  RegisterInput,
  CreateListingInput,
  CreateBookingInput,
} from "@/schemas";
import type { Location, Vendor } from "@/utils/mock-db";
// Ensure mock DB is initialized
initializeMockDB();

// Helper to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to get data from localStorage
const getFromStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Helper to save data to localStorage
const saveToStorage = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const mockHandlers = {
  // Auth handlers
  auth: {
    login: async (data: LoginInput): Promise<{ user: User; token: string }> => {
      await delay(800);

      const users = getFromStorage<User>(DB_KEYS.USERS);
      const user = users.find((u) => u.email === data.email);

      if (!user) {
        throw new Error("Invalid credentials");
      }

      // In real app, password would be hashed
      // For mock, we accept any password with "masterpassword" override
      if (data.password !== "masterpassword") {
        // Check stored password (in real app this would be hashed)
        const storedPassword = localStorage.getItem(`pwd_${user.id}`);
        if (storedPassword && storedPassword !== data.password) {
          throw new Error("Invalid credentials");
        }
      }

      const token = `mock_token_${user.id}_${Date.now()}`;
      localStorage.setItem("vizit_auth_token", token);

      return {
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          preferredCurrency: user.preferredCurrency,
          isActive: true,
          createdAt: user.createdAt,
        },
        token,
      };
    },

    register: async (
      data: RegisterInput,
    ): Promise<{ user: User; token: string }> => {
      await delay(800);

      const users = getFromStorage<User>(DB_KEYS.USERS);

      if (users.find((u) => u.email === data.email)) {
        throw new Error("Email already registered");
      }

      const newUser: User = {
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        role: data.role || "tourist",
        preferredCurrency: "USD",
        isActive: true,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      saveToStorage(DB_KEYS.USERS, users);

      // Store password separately (in real app, this would be hashed)
      localStorage.setItem(`pwd_${newUser.id}`, data.password);

      const token = `mock_token_${newUser.id}_${Date.now()}`;
      localStorage.setItem("vizit_auth_token", token);

      return {
        user: newUser,
        token,
      };
    },

    logout: async (): Promise<void> => {
      await delay(300);
      localStorage.removeItem("vizit_auth_token");
      localStorage.removeItem("vizit_current_user");
    },

    me: async (): Promise<User | null> => {
      await delay(300);
      const token = localStorage.getItem("vizit_auth_token");
      if (!token) return null;

      const storedUser = localStorage.getItem("vizit_current_user");
      if (storedUser) {
        return JSON.parse(storedUser);
      }

      return null;
    },
  },

  // Listing handlers
  listings: {
    getAll: async (filters?: ListingFilters): Promise<Listing[]> => {
      await delay(500);

      let listings = getFromStorage<Listing>(DB_KEYS.LISTINGS);

      if (filters) {
        if (filters.category && filters.category !== "all") {
          listings = listings.filter((l) =>
            l.listing_type.includes(filters.category!),
          );
        }

        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          listings = listings.filter(
            (l) =>
              l.title.toLowerCase().includes(searchLower) ||
              l.description.toLowerCase().includes(searchLower),
          );
        }

        if (filters.priceMin !== undefined) {
          listings = listings.filter((l) => l.base_price >= filters.priceMin!);
        }

        if (filters.priceMax !== undefined) {
          listings = listings.filter((l) => l.base_price <= filters.priceMax!);
        }

        if (filters.locationId) {
          listings = listings.filter(
            (l) => l.location_id === filters.locationId,
          );
        }
      }

      return listings;
    },

    getById: async (
      id: number,
    ): Promise<{ listing: Listing; media: any[] } | null> => {
      await delay(300);

      const listings = getFromStorage<Listing>(DB_KEYS.LISTINGS);
      const listing = listings.find((l) => l.id === id);

      if (!listing) return null;

      const media = getFromStorage<any>(DB_KEYS.LISTING_MEDIA).filter(
        (m) => m.listing_id === id,
      );

      return { listing, media };
    },

    create: async (
      data: CreateListingInput,
      vendorId: number,
    ): Promise<Listing> => {
      await delay(800);

      const listings = getFromStorage<Listing>(DB_KEYS.LISTINGS);

      const newListing: Listing = {
        id:
          listings.length > 0 ? Math.max(...listings.map((l) => l.id)) + 1 : 1,
        vendor_id: vendorId,
        location_id: data.locationId,
        title: data.title,
        listing_type: data.listingType,
        description: data.description,
        base_price: data.basePrice,
        currency: data.currency,
        capacity: data.capacity,
        status: "active",
        image_url: undefined, // Add image_url property to match schema
        created_at: new Date().toISOString(),
        addons: [],
      };

      listings.push(newListing);
      saveToStorage(DB_KEYS.LISTINGS, listings);

      return newListing;
    },

    search: async (query: string): Promise<Listing[]> => {
      await delay(500);

      const listings = getFromStorage<Listing>(DB_KEYS.LISTINGS);
      const searchLower = query.toLowerCase();

      return listings.filter(
        (l) =>
          l.title.toLowerCase().includes(searchLower) ||
          l.description.toLowerCase().includes(searchLower) ||
          l.listing_type.toLowerCase().includes(searchLower),
      );
    },
  },

  // Booking handlers
  bookings: {
    getMyBookings: async (
      userId: number,
      filters?: BookingFilters,
    ): Promise<Booking[]> => {
      await delay(500);

      let bookings = getFromStorage<Booking>(DB_KEYS.BOOKINGS).filter(
        (b) => b.userId === userId,
      );

      if (filters?.status) {
        bookings = bookings.filter((b) => b.status === filters.status);
      }

      return bookings;
    },

    create: async (
      data: CreateBookingInput,
      userId: number,
    ): Promise<Booking> => {
      await delay(1000);

      const bookings = getFromStorage<Booking>(DB_KEYS.BOOKINGS);
      const bookingItems = getFromStorage<any>(DB_KEYS.BOOKING_ITEMS);

      const newBookingId =
        bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1;

      // Calculate total
      let totalAmount = 0;
      const newItems = data.items.map((item, index) => {
        const listings = getFromStorage<Listing>(DB_KEYS.LISTINGS);
        const listing = listings.find((l) => l.id === item.listingId);
        if (!listing) throw new Error("Listing not found");

        const itemTotal = listing.base_price * item.quantity;
        totalAmount += itemTotal;

        return {
          id: bookingItems.length + index + 1,
          bookingId: newBookingId,
          listingId: item.listingId,
          listingTitle: listing.title,
          listingType: listing.listing_type,
          startDate: item.startDate,
          endDate: item.endDate,
          quantity: item.quantity,
          unitPrice: listing.base_price,
          subtotal: itemTotal,
          selectedAddons: item.selectedAddons.map((addon) => ({
            ...addon,
            subtotal: 0, // Calculate addon subtotal if needed
          })),
        };
      });

      // Generate booking reference (e.g., VZ-2024-0001)
      const bookingReference = `VZ-${new Date().getFullYear()}-${String(newBookingId).padStart(4, "0")}`;

      const newBooking: Booking = {
        id: newBookingId,
        userId,
        bookingReference,
        totalAmount,
        currency: "USD",
        status: "pending",
        items: newItems,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      bookings.push(newBooking);
      bookingItems.push(...newItems);

      saveToStorage(DB_KEYS.BOOKINGS, bookings);
      saveToStorage(DB_KEYS.BOOKING_ITEMS, bookingItems);

      return newBooking;
    },

    getById: async (id: number): Promise<Booking | null> => {
      await delay(300);

      const bookings = getFromStorage<Booking>(DB_KEYS.BOOKINGS);
      return bookings.find((b) => b.id === id) || null;
    },

    cancel: async (id: number): Promise<Booking> => {
      await delay(500);

      const bookings = getFromStorage<Booking>(DB_KEYS.BOOKINGS);
      const booking = bookings.find((b) => b.id === id);

      if (!booking) throw new Error("Booking not found");

      booking.status = "cancelled";
      booking.updatedAt = new Date().toISOString();

      saveToStorage(DB_KEYS.BOOKINGS, bookings);

      return booking;
    },
  },

  // Location handlers
  locations: {
    getAll: async (): Promise<Location[]> => {
      await delay(300);
      return getFromStorage<Location>(DB_KEYS.LOCATIONS);
    },

    getById: async (id: number): Promise<Location | null> => {
      await delay(200);
      const locations = getFromStorage<Location>(DB_KEYS.LOCATIONS);
      return locations.find((l: Location) => l.id === id) || null;
    },
  },

  // Vendor handlers
  vendors: {
    getAll: async (): Promise<Vendor[]> => {
      await delay(500);
      return getFromStorage<Vendor>(DB_KEYS.VENDORS);
    },

    getById: async (id: number): Promise<Vendor | null> => {
      await delay(300);
      const vendors = getFromStorage<Vendor>(DB_KEYS.VENDORS);
      return vendors.find((v: Vendor) => v.id === id) || null;
    },

    getByUserId: async (userId: number): Promise<Vendor | null> => {
      await delay(300);
      const vendors = getFromStorage<Vendor>(DB_KEYS.VENDORS);
      return vendors.find((v: Vendor) => v.user_id === userId) || null;
    },

    register: async (
      data: { businessName: string; vendorType: string; bio: string },
      userId: number,
    ): Promise<Vendor> => {
      await delay(800);

      const vendors = getFromStorage<Vendor>(DB_KEYS.VENDORS);

      const newVendor: Vendor = {
        id: vendors.length > 0 ? Math.max(...vendors.map((v) => v.id)) + 1 : 1,
        user_id: userId,
        business_name: data.businessName,
        vendor_type: data.vendorType as any,
        bio: data.bio,
        is_approved: false,
      };

      vendors.push(newVendor);
      saveToStorage(DB_KEYS.VENDORS, vendors);

      return newVendor;
    },
  },

  // Admin handlers
  admin: {
    getPendingVendors: async (): Promise<Vendor[]> => {
      await delay(500);
      const vendors = getFromStorage<Vendor>(DB_KEYS.VENDORS);
      return vendors.filter((v) => !v.is_approved);
    },

    approveVendor: async (
      vendorId: number,
      approved: boolean,
    ): Promise<Vendor> => {
      await delay(500);

      const vendors = getFromStorage<Vendor>(DB_KEYS.VENDORS);
      const vendor = vendors.find((v) => v.id === vendorId);

      if (!vendor) throw new Error("Vendor not found");

      vendor.is_approved = approved;
      vendor.approved_at = new Date().toISOString();

      saveToStorage(DB_KEYS.VENDORS, vendors);

      return vendor;
    },

    getAllUsers: async (): Promise<User[]> => {
      await delay(500);
      return getFromStorage<User>(DB_KEYS.USERS);
    },

    getDashboardStats: async (): Promise<{
      totalUsers: number;
      totalVendors: number;
      totalBookings: number;
      pendingVendors: number;
    }> => {
      await delay(500);

      const users = getFromStorage<User>(DB_KEYS.USERS);
      const vendors = getFromStorage<Vendor>(DB_KEYS.VENDORS);
      const bookings = getFromStorage<Booking>(DB_KEYS.BOOKINGS);

      return {
        totalUsers: users.length,
        totalVendors: vendors.length,
        totalBookings: bookings.length,
        pendingVendors: vendors.filter((v) => !v.is_approved).length,
      };
    },
  },
};
