// Central type exports - Single source of truth for all types
// All types are derived from Zod schemas to ensure runtime and compile-time safety

export * from "./api.types";

// Re-export all schema types for convenience
export {
  // Listing types
  type ListingType,
  type ListingStatus,
  type Addon,
  type ListingMedia,
  type Listing,
  type CreateListingInput,
  type ListingFilters,
  // Booking types
  type BookingStatus,
  type BookingItemAddon,
  type BookingItem,
  type Booking,
  type CreateBookingItemInput,
  type CreateBookingInput,
  type BookingFilters,
  // User types
  type UserRole,
  type User,
  type LoginInput,
  type RegisterInput,
  type UpdateProfileInput,
  type ChangePasswordInput,
  // Payment types
  type PaymentStatus,
  type Payment,
  type CreatePaymentIntentInput,
  type ConfirmPaymentInput,
  type PaymentIntentResponse,
  type ConfirmPaymentResponse,
  // Vendor types
  type VendorType,
  type VendorStatus,
  type Vendor,
  type VendorRegistrationInput,
  type VendorApprovalInput,
  type VendorBankDetailsInput,
  type VendorFilters,
  // Ticket types
  type Ticket,
  type GenerateTicketInput,
  type ValidateTicketInput,
  type TicketValidationResponse,
} from "@/schemas";
