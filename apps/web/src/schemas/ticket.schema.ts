import { z } from "zod";


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
  startDate: z.string(),
  endDate: z.string(),
  quantity: z.number().int().min(1),
  unitPrice: z.number().positive(),
  totalAmount: z.number().positive(),
  currency: z.string().default("USD"),
  qrCodeData: z.string(),
  qrCodeImage: z.string(),
  issuedAt: z.string(),
  expiresAt: z.string(),
  status: z.enum(["active", "used", "expired", "cancelled"]).default("active"),
  validationHash: z.string(),
});

export type Ticket = z.infer<typeof ticketSchema>;

export const generateTicketInputSchema = z.object({
  bookingId: z.string(),
  userId: z.string(),
});

export type GenerateTicketInput = z.infer<typeof generateTicketInputSchema>;

export const validateTicketInputSchema = z.object({
  ticketId: z.string(),
  validationHash: z.string(),
});

export type ValidateTicketInput = z.infer<typeof validateTicketInputSchema>;

export const ticketValidationResponseSchema = z.object({
  valid: z.boolean(),
  ticket: ticketSchema.optional(),
  message: z.string(),
});

export type TicketValidationResponse = z.infer<
  typeof ticketValidationResponseSchema
>;
