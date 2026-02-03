// API Client
// This client switches between mock data (when VITE_API_URL is empty)
// and real Django backend (when VITE_API_URL is set)

import { env } from "@/env";
import { mockHandlers } from "./mock/handlers";
import { API_ENDPOINTS } from "./endpoints";
import type {
  User,
  ListingFilters,
  BookingFilters,
  LoginInput,
  RegisterInput,
  CreateListingInput,
  CreateBookingInput,
  Listing,
  ListingMedia,
} from "@/types";

const API_BASE_URL = env.VITE_API_URL || "";

// Helper to build query string
const buildQueryString = (params?: Record<string, any>): string => {
  if (!params) return "";
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });
  return query.toString() ? `?${query.toString()}` : "";
};

// Real API client (for when Django backend is ready)
const realApiClient = {
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const queryString = buildQueryString(params);
    const response = await fetch(`${API_BASE_URL}${endpoint}${queryString}`, {
      headers: {
        "Content-Type": "application/json",
        // Add auth token if available
        ...(localStorage.getItem("vizit_auth_token") && {
          Authorization: `Bearer ${localStorage.getItem("vizit_auth_token")}`,
        }),
      },
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(localStorage.getItem("vizit_auth_token") && {
          Authorization: `Bearer ${localStorage.getItem("vizit_auth_token")}`,
        }),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  },

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(localStorage.getItem("vizit_auth_token") && {
          Authorization: `Bearer ${localStorage.getItem("vizit_auth_token")}`,
        }),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  },

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(localStorage.getItem("vizit_auth_token") && {
          Authorization: `Bearer ${localStorage.getItem("vizit_auth_token")}`,
        }),
      },
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  },
};

// Mock API client (uses localStorage)
const mockApiClient = {
  get: async <T>(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<T> => {
    // Route to appropriate mock handler based on endpoint
    if (endpoint === API_ENDPOINTS.LISTINGS.BASE) {
      return mockHandlers.listings.getAll(
        params as ListingFilters,
      ) as Promise<T>;
    }
    if (endpoint.startsWith("/api/listings/") && !endpoint.includes("search")) {
      const id = parseInt(endpoint.split("/").pop() || "0");
      return mockHandlers.listings.getById(id) as Promise<T>;
    }
    if (endpoint === API_ENDPOINTS.LISTINGS.SEARCH) {
      return mockHandlers.listings.search(params?.q || "") as Promise<T>;
    }
    if (endpoint === API_ENDPOINTS.BOOKINGS.MY_BOOKINGS) {
      // Get userId from mock auth
      const userStr = localStorage.getItem("vizit_current_user");
      const user = userStr ? JSON.parse(userStr) : null;
      return mockHandlers.bookings.getMyBookings(
        user?.id,
        params as BookingFilters,
      ) as Promise<T>;
    }
    if (endpoint === API_ENDPOINTS.LOCATIONS.BASE) {
      return mockHandlers.locations.getAll() as Promise<T>;
    }
    if (endpoint.startsWith("/api/locations/")) {
      const id = parseInt(endpoint.split("/").pop() || "0");
      return mockHandlers.locations.getById(id) as Promise<T>;
    }
    if (endpoint === API_ENDPOINTS.VENDORS.BASE) {
      return mockHandlers.vendors.getAll() as Promise<T>;
    }
    if (endpoint === API_ENDPOINTS.VENDORS.MY_VENDOR) {
      const userStr = localStorage.getItem("vizit_current_user");
      const user = userStr ? JSON.parse(userStr) : null;
      return mockHandlers.vendors.getByUserId(user?.id) as Promise<T>;
    }
    if (endpoint === API_ENDPOINTS.ADMIN.VENDORS.PENDING) {
      return mockHandlers.admin.getPendingVendors() as Promise<T>;
    }
    if (endpoint === API_ENDPOINTS.ADMIN.DASHBOARD) {
      return mockHandlers.admin.getDashboardStats() as Promise<T>;
    }
    if (endpoint === API_ENDPOINTS.ADMIN.USERS) {
      return mockHandlers.admin.getAllUsers() as Promise<T>;
    }
    if (endpoint === API_ENDPOINTS.AUTH.ME) {
      return mockHandlers.auth.me() as Promise<T>;
    }

    throw new Error(`Mock endpoint not implemented: ${endpoint}`);
  },

  post: async <T>(endpoint: string, data: any): Promise<T> => {
    if (endpoint === API_ENDPOINTS.AUTH.LOGIN) {
      return mockHandlers.auth.login(data as LoginInput) as Promise<T>;
    }
    if (endpoint === API_ENDPOINTS.AUTH.REGISTER) {
      return mockHandlers.auth.register(data as RegisterInput) as Promise<T>;
    }
    if (endpoint === API_ENDPOINTS.BOOKINGS.BASE) {
      const userStr = localStorage.getItem("vizit_current_user");
      const user = userStr ? JSON.parse(userStr) : null;
      return mockHandlers.bookings.create(
        data as CreateBookingInput,
        user?.id,
      ) as Promise<T>;
    }
    if (endpoint === API_ENDPOINTS.LISTINGS.BASE) {
      const userStr = localStorage.getItem("vizit_current_user");
      const user = userStr ? JSON.parse(userStr) : null;
      // Assume user is a vendor for mock
      return mockHandlers.listings.create(
        data as CreateListingInput,
        user?.id || 1,
      ) as Promise<T>;
    }
    if (endpoint === API_ENDPOINTS.VENDORS.REGISTER) {
      const userStr = localStorage.getItem("vizit_current_user");
      const user = userStr ? JSON.parse(userStr) : null;
      return mockHandlers.vendors.register(data, user?.id) as Promise<T>;
    }
    if (
      endpoint.includes("/api/admin/vendors/") &&
      endpoint.includes("/approve")
    ) {
      // Extract ID from URL: /api/admin/vendors/123/approve
      const parts = endpoint.split("/");
      // parts = ["", "api", "admin", "vendors", "123", "approve"]
      const id = parseInt(parts[4] || "0");
      return mockHandlers.admin.approveVendor(id, data.approved) as Promise<T>;
    }

    throw new Error(`Mock endpoint not implemented: ${endpoint}`);
  },

  put: async <T>(endpoint: string, data: any): Promise<T> => {
    if (endpoint.includes("/api/users/profile")) {
      // Mock profile update
      return Promise.resolve(data) as Promise<T>;
    }
    throw new Error(`Mock endpoint not implemented: ${endpoint}`);
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    throw new Error(`Mock endpoint not implemented: ${endpoint}`);
  },
};

// Main API client that switches between mock and real
export const apiClient = {
  get: async <T>(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<T> => {
    if (API_BASE_URL) {
      return realApiClient.get<T>(endpoint, params);
    }
    return mockApiClient.get<T>(endpoint, params);
  },

  post: async <T>(endpoint: string, data: any): Promise<T> => {
    if (API_BASE_URL) {
      return realApiClient.post<T>(endpoint, data);
    }
    return mockApiClient.post<T>(endpoint, data);
  },

  put: async <T>(endpoint: string, data: any): Promise<T> => {
    if (API_BASE_URL) {
      return realApiClient.put<T>(endpoint, data);
    }
    return mockApiClient.put<T>(endpoint, data);
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    if (API_BASE_URL) {
      return realApiClient.delete<T>(endpoint);
    }
    return mockApiClient.delete<T>(endpoint);
  },
};

// Convenience exports for common operations
export const api = {
  // Auth
  login: (data: LoginInput) => apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data),
  register: (data: RegisterInput) =>
    apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data),
  logout: () => mockHandlers.auth.logout(), // Only for mock, real API will have endpoint
  me: () => apiClient.get(API_ENDPOINTS.AUTH.ME),

  // Listings
  getListings: (filters?: ListingFilters) =>
    apiClient.get<Listing[]>(API_ENDPOINTS.LISTINGS.BASE, filters),
  getListing: (id: number) =>
    apiClient.get<{ listing: Listing; media: ListingMedia[] }>(
      API_ENDPOINTS.LISTINGS.BY_ID(id),
    ),
  searchListings: (query: string) =>
    apiClient.get<Listing[]>(API_ENDPOINTS.LISTINGS.SEARCH, { q: query }),
  createListing: (data: CreateListingInput) =>
    apiClient.post(API_ENDPOINTS.LISTINGS.BASE, data),

  // Bookings
  getMyBookings: (filters?: BookingFilters) =>
    apiClient.get<any[]>(API_ENDPOINTS.BOOKINGS.MY_BOOKINGS, filters),
  createBooking: (data: CreateBookingInput) =>
    apiClient.post(API_ENDPOINTS.BOOKINGS.BASE, data),
  cancelBooking: (id: number) =>
    apiClient.post(API_ENDPOINTS.BOOKINGS.CANCEL(id), {}),

  // Locations
  getLocations: () => apiClient.get<any[]>(API_ENDPOINTS.LOCATIONS.BASE),
  getLocation: (id: number) =>
    apiClient.get<any>(API_ENDPOINTS.LOCATIONS.BY_ID(id)),

  // Vendors
  getVendors: () => apiClient.get<any[]>(API_ENDPOINTS.VENDORS.BASE),
  getMyVendor: () => apiClient.get<any>(API_ENDPOINTS.VENDORS.MY_VENDOR),
  registerVendor: (data: {
    businessName: string;
    vendorType: string;
    bio: string;
  }) => apiClient.post(API_ENDPOINTS.VENDORS.REGISTER, data),
  getVendorListings: () => apiClient.get(API_ENDPOINTS.VENDORS.MY_LISTINGS),
  getVendorBookings: () => apiClient.get(API_ENDPOINTS.VENDORS.MY_BOOKINGS),

  // Admin
  getPendingVendors: () => apiClient.get(API_ENDPOINTS.ADMIN.VENDORS.PENDING),
  approveVendor: (id: number, approved: boolean) =>
    apiClient.post(API_ENDPOINTS.ADMIN.VENDORS.APPROVE(id), { approved }),
  getAdminUsers: () => apiClient.get(API_ENDPOINTS.ADMIN.USERS),
  getAdminDashboard: () => apiClient.get(API_ENDPOINTS.ADMIN.DASHBOARD),

  // Users
  getAllUsers: () => apiClient.get(API_ENDPOINTS.ADMIN.USERS),
  getUser: (id: number) => apiClient.get(API_ENDPOINTS.USERS.BY_ID(id)),
  updateUser: (id: number, data: Partial<User>) =>
    apiClient.put(API_ENDPOINTS.USERS.BY_ID(id), data),
};
