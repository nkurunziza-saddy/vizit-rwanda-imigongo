import { z } from "zod";

export const listingTypeSchema = z.enum([
  "hotel_room",
  "bnb",
  "car",
  "tour",
  "guide",
]);

export const listingStatusSchema = z.enum(["draft", "active", "paused"]);

export const addonSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  priceType: z.enum(["per_person", "per_stay", "per_night"]),
});

export const listingMediaSchema = z.object({
  id: z.number(),
  listingId: z.number(),
  mediaUrl: z.string().url(),
  mediaType: z.enum(["image", "video"]),
  sortOrder: z.number(),
});

export const listingSchema = z.object({
  id: z.number(),
  vendorId: z.number(),
  locationId: z.number(),
  title: z.string(),
  listingType: listingTypeSchema,
  description: z.string(),
  basePrice: z.number(),
  currency: z.string(),
  capacity: z.number(),
  status: listingStatusSchema,
  imageUrl: z.string().url().optional(),
  createdAt: z.string().datetime(),
  addons: z.array(addonSchema).default([]),
});

export const createListingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  listingType: listingTypeSchema,
  basePrice: z.number().positive("Price must be positive"),
  currency: z.string().default("USD"),
  capacity: z.number().int().positive(),
  locationId: z.number().int().positive(),
});

export const listingFiltersSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  locationId: z.number().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.number().optional(),
  page: z.number().default(1),
  perPage: z.number().default(12),
});

export type ListingType = z.infer<typeof listingTypeSchema>;
export type ListingStatus = z.infer<typeof listingStatusSchema>;
export type Addon = z.infer<typeof addonSchema>;
export type ListingMedia = z.infer<typeof listingMediaSchema>;
export type Listing = z.infer<typeof listingSchema>;
export type CreateListingInput = z.infer<typeof createListingSchema>;
export type ListingFilters = z.infer<typeof listingFiltersSchema>;
