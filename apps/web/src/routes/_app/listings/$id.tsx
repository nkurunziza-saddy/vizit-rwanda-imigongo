import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Star, MapPin, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PageWrapper } from "@/components/layouts/page-wrapper";
import { useListing } from "@/hooks/use-listings";
import { toast } from "sonner";
import { addDays, differenceInDays } from "date-fns";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { AddonSelector } from "@/components/booking/addon-selector";
import type { DateRange } from "react-day-picker";

export const Route = createFileRoute("/_app/listings/$id")({
  component: ListingDetail,
});

function ListingDetail() {
  const { id } = useParams({ from: "/_app/listings/$id" });
  const { data, isLoading: isListingLoading } = useListing(parseInt(id));
  const { addToCart } = useCart();

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });

  const [selectedAddons, setSelectedAddons] = useState<
    { addon: any; quantity: number }[]
  >([]);

  if (isListingLoading || !data) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <PageWrapper className="flex-1 py-8">
          <Skeleton className="h-4 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-3/4" />
              </div>
              <Skeleton className="h-px w-full" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
              <Skeleton className="h-px w-full" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-28" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
          </div>
        </PageWrapper>
      </div>
    );
  }

  const { listing } = data;

  const nights =
    date?.from && date?.to ? differenceInDays(date.to, date.from) : 0;

  const estimatedTotal = (() => {
    if (nights < 1) return 0;
    const baseTotal = listing.basePrice * nights;
    const addonsTotal = selectedAddons.reduce((acc, curr) => {
      const multiplier = curr.addon.price_type === "per_night" ? nights : 1;
      return acc + curr.addon.price * curr.quantity * multiplier;
    }, 0);
    return baseTotal + addonsTotal;
  })();

  const handleAddonSelect = (addon: any, quantity: number) => {
    setSelectedAddons((prev) => {
      const existing = prev.findIndex((p) => p.addon.id === addon.id);
      if (quantity <= 0) {
        return prev.filter((p) => p.addon.id !== addon.id);
      }
      if (existing > -1) {
        const newArr = [...prev];
        newArr[existing].quantity = quantity;
        return newArr;
      }
      return [...prev, { addon, quantity }];
    });
  };

  const handleBookClick = () => {
    if (!date?.from || !date?.to) {
      toast.error("Please select dates first");
      return;
    }
    addToCart({
      listing,
      image:
        listing.imageUrl ||
        "https://placehold.co/600x400/f1f5f9/cbd5e1?text=Image+Unavailable",
      dateRange: date,
      guests: 1,
      selectedAddons: selectedAddons,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageWrapper className="flex-1">
        <Link
          to="/listings"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" /> {listing.locationId}
                  </span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-foreground text-foreground" />
                    <span className="font-semibold text-foreground">4.8</span>
                    <span>(12)</span>
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  {listing.title}
                </h1>
              </div>
            </div>

            <div className="w-full h-px bg-border/50" />

            <div className="prose prose-gray prose-sm max-w-none">
              <h3 className="text-lg font-semibold float-none mb-2 tracking-tight text-foreground">
                About
              </h3>
              <p className="text-muted-foreground leading-bg">
                {listing.description}
              </p>
            </div>

            <div className="w-full h-px bg-border/50" />

            <div>
              <h3 className="text-lg font-semibold mb-4 tracking-tight text-foreground">
                Amenities
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Wifi", "Parking", "Pool", "Kitchen", "Air conditioning"].map(
                  (item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="px-2.5 py-1 text-xs font-normal border-border/50 text-muted-foreground"
                    >
                      {item}
                    </Badge>
                  ),
                )}
              </div>
            </div>

            <div className="w-full h-px bg-border/50" />

            {/* Addons Section */}
            {listing.addons && listing.addons.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 tracking-tight text-foreground">
                  Enhance your trip
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {listing.addons.map((addon) => (
                    <AddonSelector
                      key={addon.id}
                      addon={addon}
                      onSelect={(qty) => handleAddonSelect(addon, qty)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <Card className="shadow-none border border-border/50 bg-transparent">
                <CardHeader className="pb-4 pt-6 px-6">
                  <CardTitle className="flex justify-between items-baseline">
                    <span className="text-xl font-bold">
                      ${listing.basePrice}{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        / night
                      </span>
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-6 pb-6">
                  <div className="grid grid-cols-2 gap-2">
                    <Popover>
                      <PopoverTrigger>
                        <div className="border border-border/50 rounded p-2 hover:border-border transition-colors cursor-pointer flex-1 cursor-pointer">
                          <div className="text-[10px] uppercase font-medium text-muted-foreground mb-1">
                            Check-in
                          </div>
                          <div className="text-sm">
                            {date?.from
                              ? format(date.from, "PPP")
                              : "Select date"}
                          </div>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger>
                        <div className="border border-border/50 rounded p-2 hover:border-border transition-colors cursor-pointer flex-1 cursor-pointer">
                          <div className="text-[10px] uppercase font-medium text-muted-foreground mb-1">
                            Check-out
                          </div>
                          <div className="text-sm">
                            {date?.to ? format(date.to, "PPP") : "Select date"}
                          </div>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.to}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {nights > 0 && (
                    <div className="space-y-3 py-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground underline decoration-dashed">
                          ${listing.basePrice} x {nights} nights
                        </span>
                        <span>${listing.basePrice * nights}</span>
                      </div>
                      {selectedAddons.length > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground underline decoration-dashed">
                            Add-ons
                          </span>
                          <span>
                            +$
                            {selectedAddons.reduce((acc, curr) => {
                              const multiplier =
                                curr.addon.price_type === "per_night"
                                  ? nights
                                  : 1;
                              return (
                                acc +
                                curr.addon.price * curr.quantity * multiplier
                              );
                            }, 0)}
                          </span>
                        </div>
                      )}
                      <div className="w-full h-px bg-border/50" />
                      <div className="flex justify-between font-semibold text-base">
                        <span>Total</span>
                        <span>${estimatedTotal}</span>
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleBookClick}
                  >
                    {nights > 0 ? "Reserve" : "Check Availability"}
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <span>You won't be charged yet</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}
