// API Response Types

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  field?: string;
}

// Query Parameters
export interface ListingFilters {
  category?: string;
  search?: string;
  priceMin?: number;
  priceMax?: number;
  locationId?: number;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  page?: number;
  perPage?: number;
}

export interface BookingFilters {
  status?: "pending" | "confirmed" | "cancelled" | "completed";
  page?: number;
  perPage?: number;
}

// Request Types
export interface CreateBookingRequest {
  items: {
    listingId: number;
    startDate: string;
    endDate: string;
    quantity: number;
    selectedAddons: {
      addonId: number;
      quantity: number;
    }[];
  }[];
}

export interface UpdateProfileRequest {
  fullName?: string;
  email?: string;
  phone?: string;
  preferredCurrency?: string;
}

export interface CreateListingRequest {
  title: string;
  description: string;
  listingType: "hotel_room" | "bnb" | "car" | "tour" | "guide";
  basePrice: number;
  currency: string;
  capacity: number;
  locationId: number;
}

export interface VendorRegistrationRequest {
  businessName: string;
  vendorType: "hotel" | "bnb" | "car_rental" | "guide" | "tour_operator";
  bio: string;
}
