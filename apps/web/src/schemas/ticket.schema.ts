import { z } from "zod";

/**
 * Ticket schema for digital ticket generation
 * Based on db-structure.md tickets table
 */

export const ticketSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  bookingReference: z.string(),
  userId: z.string(),
  userName: z.string(),
  userEmail: z.string().email(),
  listingTitle: z.string(),
  listingType: z.enum(["hotel_room", "bnb", "car", "tour", "guide"]),
  vendorName: z.string(),
  startDate: z.string(), // ISO date string
  endDate: z.string(), // ISO date string
  quantity: z.number().int().min(1),
  unitPrice: z.number().positive(),
  totalAmount: z.number().positive(),
  currency: z.string().default("USD"),
  qrCodeData: z.string(),
  qrCodeImage: z.string(), // Base64 encoded QR image
  issuedAt: z.string(),
  expiresAt: z.string(),
  status: z.enum(["active", "used", "expired", "cancelled"]).default("active"),
  validationHash: z.string(),
});

export type Ticket = z.infer<typeof ticketSchema>;

// Schema for generating a new ticket
export const generateTicketInputSchema = z.object({
  bookingId: z.string(),
  userId: z.string(),
});

export type GenerateTicketInput = z.infer<typeof generateTicketInputSchema>;

// Schema for ticket validation (for QR code scanning)
export const validateTicketInputSchema = z.object({
  ticketId: z.string(),
  validationHash: z.string(),
});

export type ValidateTicketInput = z.infer<typeof validateTicketInputSchema>;

// Schema for ticket validation response
export const ticketValidationResponseSchema = z.object({
  valid: z.boolean(),
  ticket: ticketSchema.optional(),
  message: z.string(),
});

export type TicketValidationResponse = z.infer<
  typeof ticketValidationResponseSchema
>;
