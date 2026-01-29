import { z } from "zod";

export const paymentStatusSchema = z.enum([
  "pending",
  "succeeded",
  "failed",
  "refunded",
]);

export const paymentSchema = z.object({
  id: z.number(),
  bookingId: z.number(),
  provider: z.string(),
  providerPaymentId: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: paymentStatusSchema,
  paidAt: z.string().datetime().optional(),
});

export const createPaymentIntentSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().default("usd"),
  bookingId: z.number(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const confirmPaymentSchema = z.object({
  paymentIntentId: z.string(),
  bookingId: z.number(),
});

export const paymentIntentResponseSchema = z.object({
  clientSecret: z.string(),
});

export const confirmPaymentResponseSchema = z.object({
  success: z.boolean(),
  booking: z.any().optional(), // Will be properly typed
  ticket: z.any().optional(), // Will be properly typed
});

export type PaymentStatus = z.infer<typeof paymentStatusSchema>;
export type Payment = z.infer<typeof paymentSchema>;
export type CreatePaymentIntentInput = z.infer<
  typeof createPaymentIntentSchema
>;
export type ConfirmPaymentInput = z.infer<typeof confirmPaymentSchema>;
export type PaymentIntentResponse = z.infer<typeof paymentIntentResponseSchema>;
export type ConfirmPaymentResponse = z.infer<
  typeof confirmPaymentResponseSchema
>;
