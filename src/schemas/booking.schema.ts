import { z } from "zod";

export const bookingStatusSchema = z.enum([
	"pending",
	"confirmed",
	"cancelled",
	"completed",
]);

export const bookingItemAddonSchema = z.object({
	addonId: z.number(),
	quantity: z.number().int().positive(),
	subtotal: z.number(),
});

export const bookingItemSchema = z.object({
	id: z.number(),
	bookingId: z.number(),
	listingId: z.number(),
	listingTitle: z.string(),
	listingType: z.enum(["hotel_room", "bnb", "car", "tour", "guide"]),
	startDate: z.string().datetime(),
	endDate: z.string().datetime(),
	quantity: z.number().int().positive(),
	unitPrice: z.number(),
	subtotal: z.number(),
	selectedAddons: z.array(bookingItemAddonSchema).default([]),
});

export const bookingSchema = z.object({
	id: z.number(),
	userId: z.number(),
	bookingReference: z.string(),
	totalAmount: z.number(),
	currency: z.string(),
	status: bookingStatusSchema,
	items: z.array(bookingItemSchema).default([]),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

export const createBookingItemSchema = z.object({
	listingId: z.number(),
	startDate: z.string().datetime(),
	endDate: z.string().datetime(),
	quantity: z.number().int().positive(),
	selectedAddons: z
		.array(
			z.object({
				addonId: z.number(),
				quantity: z.number().int().positive(),
			}),
		)
		.default([]),
});

export const createBookingSchema = z.object({
	items: z
		.array(createBookingItemSchema)
		.min(1, "At least one item is required"),
});

export const bookingFiltersSchema = z.object({
	status: bookingStatusSchema.optional(),
	page: z.number().default(1),
	perPage: z.number().default(10),
});

export type BookingStatus = z.infer<typeof bookingStatusSchema>;
export type BookingItemAddon = z.infer<typeof bookingItemAddonSchema>;
export type BookingItem = z.infer<typeof bookingItemSchema>;
export type Booking = z.infer<typeof bookingSchema>;
export type CreateBookingItemInput = z.infer<typeof createBookingItemSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type BookingFilters = z.infer<typeof bookingFiltersSchema>;
