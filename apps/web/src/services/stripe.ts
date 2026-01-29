// Stripe service wrapper
// This file provides a typed interface to the Stripe SDK

import Stripe from "stripe";

// Stripe API version to use (latest supported by the SDK)
const STRIPE_API_VERSION = "2026-01-28.clover" as const;

/**
 * Create a Stripe client instance
 * Note: This should only be called from server functions (not client-side)
 */
export const createStripeClient = (secretKey: string): Stripe => {
  return new Stripe(secretKey, {
    apiVersion: STRIPE_API_VERSION,
  });
};

/**
 * Create a PaymentIntent for a booking
 */
export const createPaymentIntent = async (
  stripe: Stripe,
  params: {
    amount: number; // in cents
    currency: string;
    bookingId: number;
    metadata?: Record<string, string>;
  },
) => {
  return stripe.paymentIntents.create({
    amount: params.amount,
    currency: params.currency,
    metadata: {
      bookingId: params.bookingId.toString(),
      ...params.metadata,
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });
};

/**
 * Retrieve a PaymentIntent by ID
 */
export const retrievePaymentIntent = async (
  stripe: Stripe,
  paymentIntentId: string,
) => {
  return stripe.paymentIntents.retrieve(paymentIntentId);
};

/**
 * Confirm a PaymentIntent (for manual confirmation flow)
 */
export const confirmPaymentIntent = async (
  stripe: Stripe,
  paymentIntentId: string,
  paymentMethodId?: string,
) => {
  return stripe.paymentIntents.confirm(paymentIntentId, {
    payment_method: paymentMethodId,
  });
};

/**
 * Create a refund for a payment
 */
export const createRefund = async (
  stripe: Stripe,
  paymentIntentId: string,
  amount?: number, // partial refund amount in cents
) => {
  return stripe.refunds.create({
    payment_intent: paymentIntentId,
    ...(amount && { amount }),
  });
};

/**
 * Construct Stripe event from webhook payload
 */
export const constructStripeEvent = (
  stripe: Stripe,
  payload: string | Buffer,
  signature: string,
  webhookSecret: string,
): Stripe.Event => {
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
};

// Stripe event types we handle
export type StripeEventType =
  | "payment_intent.succeeded"
  | "payment_intent.payment_failed"
  | "payment_intent.canceled"
  | "charge.refunded";

// Helper to check if event is a payment success
export const isPaymentSuccess = (event: Stripe.Event): boolean => {
  return event.type === "payment_intent.succeeded";
};

// Helper to check if event is a payment failure
export const isPaymentFailed = (event: Stripe.Event): boolean => {
  return event.type === "payment_intent.payment_failed";
};

// Helper to check if event is a refund
export const isRefund = (event: Stripe.Event): boolean => {
  return event.type === "charge.refunded";
};
