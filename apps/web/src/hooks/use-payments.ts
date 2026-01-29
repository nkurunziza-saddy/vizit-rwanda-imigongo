import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createPaymentIntent,
  confirmPayment,
  getStripePublishableKey,
} from "@/server-functions/payments";

// Query keys for payments
export const paymentKeys = {
  all: ["payments"] as const,
  stripeKey: () => [...paymentKeys.all, "stripeKey"] as const,
};

// Hook to get Stripe publishable key
export const useStripePublishableKey = () => {
  return useQuery({
    queryKey: paymentKeys.stripeKey(),
    queryFn: () => getStripePublishableKey(),
    staleTime: Infinity, // Key doesn't change during session
  });
};

// Hook to create a payment intent
export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationFn: (data: {
      amount: number;
      currency: string;
      bookingId: number;
      metadata?: Record<string, string>;
    }) => createPaymentIntent({ data } as any),
  });
};

// Hook to confirm a payment
export const useConfirmPayment = () => {
  return useMutation({
    mutationFn: (data: { paymentIntentId: string; bookingId: number }) =>
      confirmPayment({ data } as any),
  });
};
