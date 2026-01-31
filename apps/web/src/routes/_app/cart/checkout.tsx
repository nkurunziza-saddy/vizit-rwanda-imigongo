import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { useCreateBooking } from "@/hooks/use-bookings";
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

export const Route = createFileRoute("/_app/cart/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { mutateAsync: createBooking } = useCreateBooking();

  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cart.length === 0 || !isAuthenticated) return;

    setIsProcessing(true);
    try {
      // Create a booking in pending state
      const bookingItems = cart.map((item) => {
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

      // Payment will be handled on the backend
      // For now, show success and redirect
      toast.success("Booking created successfully!");
      clearCart();
      navigate({
        to: "/cart/success",
        search: { orderId: bookingResult.id.toString() },
      });
    } catch (error) {
      console.error("Failed to create booking:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsProcessing(false);
    }
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
                  (item) => item.listing.listingType === "ticket",
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
                            ${item.listing.basePrice * nights}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.listing.listingType} in Location{" "}
                          {item.listing.locationId}
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

            {/* 2. Payment Section - UI Only */}
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription>
                  Complete your booking. Payment will be processed securely.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Payment processing will be handled on our secure backend.
                    Click the button below to complete your booking.
                  </p>
                  <Button
                    onClick={handleCheckout}
                    className="w-full"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Complete Booking - $${totalPrice}`
                    )}
                  </Button>
                </div>
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
                  Secure checkout
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}
