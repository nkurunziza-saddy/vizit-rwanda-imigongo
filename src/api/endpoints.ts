// API Endpoint definitions
// When Django backend is ready, these will point to the real API
// For now, the API client uses mock handlers when VITE_API_URL is not set

export const API_ENDPOINTS = {
	// Auth
	AUTH: {
		LOGIN: "/api/auth/login",
		REGISTER: "/api/auth/register",
		LOGOUT: "/api/auth/logout",
		REFRESH: "/api/auth/refresh",
		ME: "/api/auth/me",
	},

	// Users
	USERS: {
		BASE: "/api/users",
		ME: "/api/users/me",
		PROFILE: "/api/users/profile",
		CHANGE_PASSWORD: "/api/users/change-password",
		BY_ID: (id: number) => `/api/users/${id}`,
	},

	// Listings
	LISTINGS: {
		BASE: "/api/listings",
		SEARCH: "/api/listings/search",
		BY_ID: (id: number) => `/api/listings/${id}`,
		MEDIA: (id: number) => `/api/listings/${id}/media`,
		AVAILABILITY: (id: number) => `/api/listings/${id}/availability`,
	},

	// Bookings
	BOOKINGS: {
		BASE: "/api/bookings",
		MY_BOOKINGS: "/api/bookings/me",
		BY_ID: (id: number) => `/api/bookings/${id}`,
		CANCEL: (id: number) => `/api/bookings/${id}/cancel`,
		CONFIRM: (id: number) => `/api/bookings/${id}/confirm`,
	},

	// Vendors
	VENDORS: {
		BASE: "/api/vendors",
		REGISTER: "/api/vendors/register",
		MY_VENDOR: "/api/vendors/me",
		MY_LISTINGS: "/api/vendors/me/listings",
		MY_BOOKINGS: "/api/vendors/me/bookings",
		BY_ID: (id: number) => `/api/vendors/${id}`,
	},

	// Admin
	ADMIN: {
		DASHBOARD: "/api/admin/dashboard",
		USERS: "/api/admin/users",
		VENDORS: {
			PENDING: "/api/admin/vendors/pending",
			APPROVE: (id: number) => `/api/admin/vendors/${id}/approve`,
			REJECT: (id: number) => `/api/admin/vendors/${id}/reject`,
		},
		LISTINGS: "/api/admin/listings",
		BOOKINGS: "/api/admin/bookings",
	},

	// Locations
	LOCATIONS: {
		BASE: "/api/locations",
		BY_ID: (id: number) => `/api/locations/${id}`,
	},

	// Tickets
	TICKETS: {
		BASE: "/api/tickets",
		BY_BOOKING: (bookingId: number) => `/api/tickets/booking/${bookingId}`,
		DOWNLOAD: (id: number) => `/api/tickets/${id}/download`,
		VALIDATE: "/api/tickets/validate",
	},
} as const;

// Type-safe endpoint helper
export type ApiEndpoint =
	| (typeof API_ENDPOINTS.AUTH)[keyof typeof API_ENDPOINTS.AUTH]
	| (typeof API_ENDPOINTS.USERS)[keyof typeof API_ENDPOINTS.USERS]
	| (typeof API_ENDPOINTS.LISTINGS)[keyof typeof API_ENDPOINTS.LISTINGS]
	| (typeof API_ENDPOINTS.BOOKINGS)[keyof typeof API_ENDPOINTS.BOOKINGS]
	| (typeof API_ENDPOINTS.VENDORS)[keyof typeof API_ENDPOINTS.VENDORS]
	| (typeof API_ENDPOINTS.ADMIN)[keyof typeof API_ENDPOINTS.ADMIN]
	| (typeof API_ENDPOINTS.LOCATIONS)[keyof typeof API_ENDPOINTS.LOCATIONS]
	| (typeof API_ENDPOINTS.TICKETS)[keyof typeof API_ENDPOINTS.TICKETS];
