import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plane, Check, ArrowRight, Luggage, Utensils } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Listing } from "@/utils/mock-db";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface TicketSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultDate?: DateRange;
  guests?: number;
  fromLocation?: string;
}

export function TicketSelectionModal({
  open,
  onOpenChange,
  defaultDate,
  guests = 1,
  fromLocation = "City",
}: TicketSelectionModalProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"search" | "results" | "success">("search");
  const [isSearching, setIsSearching] = useState(false);

  // Mock flight ticket listing
  const ticketListing: Listing = {
    id: 99999, // Special ID for ticket
    vendor_id: 1, // Admin vendor
    location_id: 1, // Kigali
    title: `Round Trip Flight: ${fromLocation} to Kigali`,
    listing_type: "ticket",
    description: `Economy class round trip ticket from ${fromLocation} to Kigali International Airport (KGL). Includes baggage and meals.`,
    base_price: 850,
    currency: "USD",
    capacity: 100,
    status: "active",
    image_url:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop",
    created_at: new Date().toISOString(),
    addons: [],
  };

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API search delay
    setTimeout(() => {
      setIsSearching(false);
      setStep("results");
    }, 2000);
  };

  const handleSelectTicket = () => {
    // Add to cart
    const dateRange = defaultDate || {
      from: new Date(),
      to: addDays(new Date(), 7),
    };

    addToCart({
      listing: ticketListing,
      image: ticketListing.image_url!,
      dateRange,
      guests,
      selectedAddons: [],
    });

    setStep("success");
    toast.success("Flight ticket added to cart!");
  };

  const handleCheckout = () => {
    onOpenChange(false);
    navigate({ to: "/cart/checkout" });
  };

  const handleContinueShopping = () => {
    onOpenChange(false);
    // Reset state after closing
    setTimeout(() => {
      setStep("search");
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-background">
        <div className="px-6 py-6 pb-2">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {step === "search" && "Search for Flights"}
              {step === "results" && "Select Your Flight"}
              {step === "success" && "Ticket Added Successfully"}
            </DialogTitle>
            <DialogDescription>
              {step === "search" &&
                `Finding flights from ${fromLocation} to Kigali, Rwanda.`}
              {step === "results" &&
                `Best options from ${fromLocation} to Kigali.`}
              {step === "success" &&
                "Your flight has been secured. Ready for the next step?"}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 pb-8 min-h-[300px] flex flex-col justify-center">
          {step === "search" && (
            <div className="flex flex-col items-center justify-center space-y-6 py-8 animate-in fade-in zoom-in-95 duration-500">
              <div className="relative">
                <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <Plane
                    className={`h-10 w-10 text-primary ${isSearching ? "animate-pulse" : ""}`}
                  />
                </div>
                {isSearching && (
                  <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                )}
              </div>
              <div className="text-center space-y-2 max-w-sm">
                <h3 className="font-medium text-lg text-foreground">
                  {isSearching ? "Searching Airlines..." : "Ready to fly?"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isSearching
                    ? "We are checking availability with major carriers including RwandAir, KLM, and Qatar Airways."
                    : "We'll find the best connection for you to start your Rwandan journey."}
                </p>
              </div>
              {!isSearching && (
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="w-full max-w-[200px] rounded-full shadow-md"
                >
                  Find Tickets
                </Button>
              )}
            </div>
          )}

          {step === "results" && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
              <div
                className="group relative border rounded-xl p-5 hover:border-primary/50 transition-all cursor-pointer bg-card hover:shadow-md ring-2 ring-transparent hover:ring-primary/10"
                onClick={handleSelectTicket}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSelectTicket();
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200"
                  >
                    Best Value
                  </Badge>
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center shrink-0 border border-border">
                      {/* Placeholder for Airline Logo */}
                      <span className="font-bold text-xs text-muted-foreground">
                        RwandAir
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">RwandAir</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge
                          variant="outline"
                          className="text-[10px] h-5 px-1.5 font-normal"
                        >
                          Economy
                        </Badge>
                        <span>•</span>
                        <span>Direct Flight</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center mb-6">
                  <div className="text-left">
                    <div className="text-2xl font-bold">08:00</div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase">
                      {fromLocation}
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-full px-2">
                    <div className="text-[10px] text-muted-foreground mb-1">
                      8h 30m
                    </div>
                    <div className="relative w-full flex items-center">
                      <div className="h-[1px] bg-border w-full"></div>
                      <Plane className="h-3 w-3 text-muted-foreground absolute left-1/2 -translate-x-1/2" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">16:30</div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase">
                      KGL
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border/50 pt-4 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Luggage className="h-3.5 w-3.5" />
                    <span>2 x 23kg</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Utensils className="h-3.5 w-3.5" />
                    <span>Meals included</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-2xl font-bold text-foreground block">
                      ${ticketListing.base_price}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      per person
                    </span>
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTicket();
                    }}
                  >
                    Select Fight
                  </Button>
                </div>
              </div>

              <p className="text-xs text-center text-muted-foreground pt-2">
                *Fares include all taxes and fees.
              </p>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center space-y-6 py-4 animate-in zoom-in-95 duration-500">
              <div className="h-20 w-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-2">
                <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-xl">Flight Added to Cart!</h3>
                <p className="text-sm text-muted-foreground max-w-[320px] mx-auto">
                  Great! Your flight is secured. Would you like to check out
                  some hotels for your stay in Rwanda?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-4">
                <Button
                  variant="outline"
                  onClick={handleContinueShopping}
                  className="w-full h-11 rounded-lg border-2 hover:bg-secondary/50 hover:border-border"
                >
                  Browse Hotels
                </Button>
                <Button
                  onClick={handleCheckout}
                  className="w-full h-11 rounded-lg gap-2 shadow-lg shadow-primary/20"
                >
                  Checkout Now <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
