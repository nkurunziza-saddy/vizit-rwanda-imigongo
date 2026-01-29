import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { useCreateBooking } from "@/hooks/use-bookings";
import {
  useStripePublishableKey,
  useCreatePaymentIntent,
  useConfirmPayment,
} from "@/hooks/use-payments";
import type { Booking } from "@/utils/mock-db";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { differenceInDays, format } from "date-fns";
import { Loader2, AlertCircle } from "lucide-react";
import { PageWrapper } from "@/components/layouts/page-wrapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Stripe imports
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export const Route = createFileRoute("/_app/cart/checkout")({
  component: CheckoutPage,
});

// Stripe Elements wrapper component
function StripeCheckoutForm({
  totalPrice,
  onSuccess,
  onError,
}: {
  totalPrice: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      onError("Stripe is not loaded yet");
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/cart/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      onError(error.message || "Payment failed");
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent.id);
    } else {
      onError("Payment was not completed");
      setIsProcessing(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay $${totalPrice}`
        )}
      </Button>
    </form>
  );
}

function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { mutateAsync: createBooking } = useCreateBooking();
  const { mutateAsync: createPaymentIntent } = useCreatePaymentIntent();
  const { mutateAsync: confirmPayment } = useConfirmPayment();
  const { data: stripeKeyData } = useStripePublishableKey();

  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingId, setBookingId] = useState<number | null>(null);

  const navigate = useNavigate();

  // Initialize Stripe when key is available
  useEffect(() => {
    if (stripeKeyData?.publishableKey) {
      setStripePromise(loadStripe(stripeKeyData.publishableKey));
    }
  }, [stripeKeyData]);

  // Create payment intent when component mounts
  useEffect(() => {
    const initPayment = async () => {
      if (cart.length === 0 || !isAuthenticated) return;

      setIsLoading(true);
      try {
        // First create a booking in pending state
        const bookingItems = cart.map((item) => {
          const nights = differenceInDays(
            item.dateRange.to!,
            item.dateRange.from!,
          );
          const _baseSubtotal = item.listing.base_price * nights;
          const _addonsSubtotal = item.selectedAddons.reduce((acc, curr) => {
            const multiplier =
              curr.addon.price_type === "per_night" ? nights : 1;
            return acc + curr.addon.price * curr.quantity * multiplier;
          }, 0);

          return {
            listingId: item.listing.id,
            startDate: item.dateRange.from!.toISOString(),
            endDate: item.dateRange.to!.toISOString(),
            quantity: 1,
            selectedAddons: item.selectedAddons.map((sa) => ({
              addonId: sa.addon.id,
              quantity: sa.quantity,
            })),
          };
        });

        const bookingResult = (await createBooking({
          items: bookingItems,
        })) as Booking;

        setBookingId(bookingResult.id);

        // Create payment intent
        const paymentResult = await createPaymentIntent({
          amount: totalPrice,
          currency: "usd",
          bookingId: bookingResult.id,
          metadata: {
            userId: user?.id?.toString() || "",
          },
        });

        if (paymentResult.clientSecret) {
          setClientSecret(paymentResult.clientSecret);
        }
      } catch (error) {
        console.error("Failed to initialize payment:", error);
        toast.error("Failed to initialize payment. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    initPayment();
  }, [
    cart,
    isAuthenticated,
    createBooking,
    createPaymentIntent,
    totalPrice,
    user?.id,
  ]);

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    if (!bookingId) return;

    try {
      // Confirm payment on server
      await confirmPayment({
        paymentIntentId,
        bookingId,
      });

      toast.success("Payment successful!");
      clearCart();
      navigate({
        to: "/cart/success",
        search: { orderId: bookingId.toString() },
      });
    } catch (error) {
      console.error("Payment confirmation failed:", error);
      toast.error("Payment confirmation failed. Please contact support.");
    }
  };

  const handlePaymentError = (error: string) => {
    toast.error(error);
  };

  if (cart.length === 0) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <Button
            onClick={() =>
              navigate({
                to: "/listings",
                search: (prev: any) => ({ ...prev, page: 1 }),
              })
            }
          >
            Browse Listings
          </Button>
        </div>
      </PageWrapper>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
          <h2 className="text-2xl font-bold">Please log in</h2>
          <p className="text-muted-foreground">
            You need to be logged in to complete your booking
          </p>
          <Button onClick={() => navigate({ to: "/login" })}>Log In</Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <PageWrapper className="py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Order Review & Payment Form */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Review Items */}
            <Card>
              <CardHeader>
                <CardTitle>Review Your Trip</CardTitle>
                <CardDescription>
                  Verify your booking details before payment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!cart.some(
                  (item) => item.listing.listing_type === "ticket",
                ) && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Missing Flight Ticket</AlertTitle>
                    <AlertDescription>
                      We noticed you don't have a flight ticket to Rwanda in
                      your cart. We highly recommend securing your flight first.
                    </AlertDescription>
                  </Alert>
                )}
                {cart.map((item) => {
                  const nights = differenceInDays(
                    item.dateRange.to!,
                    item.dateRange.from!,
                  );
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-4 border-b last:border-0 pb-6 last:pb-0"
                    >
                      <div className="h-24 w-32 bg-muted rounded-md flex-shrink-0 bg-gray-200" />
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">
                            {item.listing.title}
                          </h3>
                          <span className="font-medium">
                            ${item.listing.base_price * nights}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.listing.listing_type} in Location{" "}
                          {item.listing.location_id}
                        </p>
                        <div className="flex gap-4 text-sm mt-2">
                          <div className="bg-muted px-2 py-1 rounded">
                            {format(item.dateRange.from!, "MMM d")} -{" "}
                            {format(item.dateRange.to!, "MMM d, yyyy")}
                          </div>
                          <div className="bg-muted px-2 py-1 rounded">
                            {nights} Nights
                          </div>
                          <div className="bg-muted px-2 py-1 rounded">
                            {item.guests} Guests
                          </div>
                        </div>
                        {item.selectedAddons.length > 0 && (
                          <div className="mt-2 text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">
                              Add-ons:{" "}
                            </span>
                            {item.selectedAddons
                              .map((a) => `${a.addon.name} (x${a.quantity})`)
                              .join(", ")}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* 2. Payment Form with Stripe */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>
                  Enter your payment information securely.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading || !clientSecret ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : stripePromise && clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <StripeCheckoutForm
                      totalPrice={totalPrice}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  </Elements>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Payment system is not configured.</p>
                    <p className="text-sm">
                      Please contact support to complete your booking.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items Total</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes</span>
                    <span>Included</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  Secure checkout powered by Stripe
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}
