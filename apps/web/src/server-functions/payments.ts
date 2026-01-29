// Payment Server Functions
// These run on the server and use the Stripe secret key

import { createServerFn } from "@tanstack/react-start";
import {
  createStripeClient,
  createPaymentIntent as createStripePaymentIntent,
  retrievePaymentIntent,
} from "@/services/stripe";

// Types for payment requests
interface CreatePaymentIntentRequest {
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
 * Create a Stripe PaymentIntent
 * This is called from the checkout page to get a client secret
 */
export const createPaymentIntent = createServerFn({
  method: "POST",
}).handler(async (ctx: any) => {
  // Parse request body
  const body = (await ctx.request.json()) as CreatePaymentIntentRequest;

  // Validate required fields
  if (!body.amount || body.amount <= 0) {
    throw new Error("Amount must be positive");
  }
  if (!body.bookingId) {
    throw new Error("Booking ID is required");
  }

  // Get Stripe secret key from environment
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    // For development without Stripe configured, return a mock client secret
    console.warn("STRIPE_SECRET_KEY not configured, using mock payment");
    return {
      clientSecret: `mock_pi_${Date.now()}_secret_${Math.random().toString(36).substring(2)}`,
      mock: true,
    };
  }

  const stripe = createStripeClient(stripeSecretKey);

  // Convert amount to cents (Stripe uses smallest currency unit)
  const amountInCents = Math.round(body.amount * 100);

  const paymentIntent = await createStripePaymentIntent(stripe, {
    amount: amountInCents,
    currency: body.currency || "usd",
    bookingId: body.bookingId,
    metadata: body.metadata,
  });

  return {
    clientSecret: paymentIntent.client_secret,
    mock: false,
  };
});

/**
 * Confirm a payment and finalize the booking
 * This is called after the payment is confirmed on the client
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

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  // If no Stripe key, treat as mock payment success
  if (!stripeSecretKey || body.paymentIntentId.startsWith("mock_")) {
    console.warn("Processing mock payment confirmation");
    return {
      success: true,
      mock: true,
      bookingId: body.bookingId,
    };
  }

  const stripe = createStripeClient(stripeSecretKey);

  // Retrieve the payment intent to verify status
  const paymentIntent = await retrievePaymentIntent(
    stripe,
    body.paymentIntentId,
  );

  if (paymentIntent.status !== "succeeded") {
    throw new Error(`Payment not successful: ${paymentIntent.status}`);
  }

  // TODO: Update booking status in database via Django API
  // This would typically call your Django backend to:
  // 1. Update booking status to "confirmed"
  // 2. Create payment record
  // 3. Generate ticket

  return {
    success: true,
    mock: false,
    bookingId: body.bookingId,
    paymentIntentId: paymentIntent.id,
  };
});

/**
 * Get Stripe publishable key (safe to expose to client)
 */
export const getStripePublishableKey = createServerFn({
  method: "GET",
}).handler(async () => {
  // Return the publishable key from environment
  // This is safe because it's the publishable key, not the secret key
  return {
    publishableKey:
      process.env.VITE_STRIPE_PUBLISHABLE_KEY ||
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
      "", // Empty means Stripe is not configured
  };
});
