// Central type exports - Single source of truth for all types
// All types are derived from Zod schemas to ensure runtime and compile-time safety

// Re-export all schema types for convenience
export type {
	Addon,
	Booking,
	BookingFilters,
	BookingItem,
	BookingItemAddon,
	// Booking types
	BookingStatus,
	ChangePasswordInput,
	ConfirmPaymentInput,
	ConfirmPaymentResponse,
	CreateBookingInput,
	CreateBookingItemInput,
	CreateListingInput,
	CreatePaymentIntentInput,
	GenerateTicketInput,
	Listing,
	ListingFilters,
	ListingMedia,
	ListingStatus,
	// Listing types
	ListingType,
	LoginInput,
	Payment,
	PaymentIntentResponse,
	// Payment types
	PaymentStatus,
	RegisterInput,
	// Ticket types
	Ticket,
	TicketValidationResponse,
	UpdateProfileInput,
	User,
	// User types
	UserRole,
	ValidateTicketInput,
	Vendor,
	VendorApprovalInput,
	VendorBankDetailsInput,
	VendorFilters,
	VendorRegistrationInput,
	VendorStatus,
	// Vendor types
	VendorType,
} from "@/schemas";
export * from "./api.types";
