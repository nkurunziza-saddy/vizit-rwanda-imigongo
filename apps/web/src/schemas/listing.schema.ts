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
  price_type: z.enum(["per_person", "per_stay", "per_night"]),
});

export const listingMediaSchema = z.object({
  id: z.number(),
  listing_id: z.number(),
  media_url: z.string().url(),
  media_type: z.enum(["image", "video"]),
  sort_order: z.number(),
});

export const listingSchema = z.object({
  id: z.number(),
  vendor_id: z.number(),
  location_id: z.number(),
  title: z.string(),
  listing_type: listingTypeSchema,
  description: z.string(),
  base_price: z.number(),
  currency: z.string(),
  capacity: z.number(),
  status: listingStatusSchema,
  image_url: z.string().url().optional(),
  created_at: z.string().datetime(),
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
