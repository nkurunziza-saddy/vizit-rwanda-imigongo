// Payment Server Functions - Placeholder
// Payment processing will be handled on the backend (Django)
// This file is kept as a placeholder for future payment-related server functions

import { createServerFn } from "@tanstack/react-start";

// Types for payment requests
interface CreatePaymentRequest {
  amount: number;
  currency: string;
  bookingId: number;
  metadata?: Record<string, string>;
}

interface ConfirmPaymentRequest {
  paymentIntentId: string;
  bookingId: number;
}

/**
 * Create a payment - placeholder
 * Actual payment processing will be handled on the backend
 */
export const createPayment = createServerFn({
  method: "POST",
}).handler(async (ctx: any) => {
  // Parse request body
  const body = (await ctx.request.json()) as CreatePaymentRequest;

  // Validate required fields
  if (!body.amount || body.amount <= 0) {
    throw new Error("Amount must be positive");
  }
  if (!body.bookingId) {
    throw new Error("Booking ID is required");
  }

  // Placeholder - actual payment processing moved to backend
  console.log("Payment creation requested for booking:", body.bookingId);

  return {
    success: true,
    bookingId: body.bookingId,
    message: "Payment will be processed on the backend",
  };
});

/**
 * Confirm a payment - placeholder
 * Actual payment confirmation will be handled on the backend
 */
export const confirmPayment = createServerFn({
  method: "POST",
}).handler(async (ctx: any) => {
  // Parse request body
  const body = (await ctx.request.json()) as ConfirmPaymentRequest;

  // Validate required fields
  if (!body.paymentIntentId) {
    throw new Error("Payment Intent ID is required");
  }
  if (!body.bookingId) {
    throw new Error("Booking ID is required");
  }

  // Placeholder - actual payment confirmation moved to backend
  console.log("Payment confirmation requested for booking:", body.bookingId);

  return {
    success: true,
    bookingId: body.bookingId,
    message: "Payment confirmation will be processed on the backend",
  };
});

/**
 * Get payment configuration
 * Returns placeholder configuration
 */
export const getPaymentConfig = createServerFn({
  method: "GET",
}).handler(async () => {
  return {
    enabled: false,
    message: "Payment processing is handled on the backend",
  };
});
