import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageWrapper } from "@/components/layouts/page-wrapper";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty";
import { format, differenceInDays } from "date-fns";
import {
  Calendar as CalendarIcon,
  Users,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState, useEffect } from "react";

function CartItemThumbnail({
  image,
  title,
}: {
  image?: string;
  title: string;
}) {
  const [imgSrc, setImgSrc] = useState(
    image ||
      "https://placehold.co/600x400/f1f5f9/cbd5e1?text=Image+Unavailable",
  );

  useEffect(() => {
    if (image) setImgSrc(image);
  }, [image]);

  return (
    <img
      src={imgSrc}
      alt={title}
      className="h-24 w-32 object-cover rounded-md flex-shrink-0 bg-muted"
      onError={() =>
        setImgSrc(
          "https://placehold.co/600x400/f1f5f9/cbd5e1?text=Image+Unavailable",
        )
      }
      loading="lazy"
    />
  );
}

export const Route = createFileRoute("/_app/cart/")({
  component: CartPage,
});

function CartPage() {
  const {
    cart,
    removeFromCart,
    updateGuests,
    updateDateRange,
    updateAddon,
    totalPrice,
    clearCart,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleProceed = () => {
    if (isAuthenticated) {
      navigate({ to: "/cart/checkout" });
    } else {
      toast.info("Please login to continue checkout");
      navigate({ to: "/login", search: { redirect: "/cart/checkout" } });
    }
  };

  if (cart.length === 0) {
    return (
      <PageWrapper>
        <Empty className="min-h-[60vh]">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Trash2 className="h-6 w-6" />
            </EmptyMedia>
            <EmptyTitle>Your cart is empty</EmptyTitle>
            <EmptyDescription>
              Looks like you haven't added any adventures yet. Explore our
              listings to find your next destination.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              size="lg"
              onClick={() =>
                navigate({
                  to: "/listings",
                  search: (prev: any) => ({ ...prev, page: 1 }),
                })
              }
            >
              Browse Listings
            </Button>
          </EmptyContent>
        </Empty>
      </PageWrapper>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <PageWrapper className="py-8">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground mb-8">
          Review and customize your booking details.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item) => {
              const nights =
                item.dateRange.from && item.dateRange.to
                  ? differenceInDays(item.dateRange.to, item.dateRange.from)
                  : 0;

              // Available addons that are NOT selected
              const availableAddons =
                item.listing.addons?.filter(
                  (addon) =>
                    !item.selectedAddons.some((sa) => sa.addon.id === addon.id),
                ) || [];

              return (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/20 pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        {/* Image Thumbnail */}
                        <CartItemThumbnail
                          image={item.image}
                          title={item.listing.title}
                        />
                        <div>
                          <CardTitle className="text-xl">
                            <Link
                              to="/listings/$id"
                              params={{ id: item.listing.id.toString() }}
                              className="hover:underline"
                            >
                              {item.listing.title}
                            </Link>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.listing.listingType} in{" "}
                            {item.listing.locationId}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => {
                          removeFromCart(item.id);
                          toast.success("Item removed from cart");
                        }}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-8">
                    {/* Main Configuration Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Date Picker */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" /> Dates
                        </label>
                        <Popover>
                          <PopoverTrigger>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !item.dateRange && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {item.dateRange?.from ? (
                                item.dateRange.to ? (
                                  <>
                                    {format(item.dateRange.from, "LLL dd")} -{" "}
                                    {format(item.dateRange.to, "LLL dd, y")}
                                    <span className="ml-auto text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                                      {nights} nights
                                    </span>
                                  </>
                                ) : (
                                  format(item.dateRange.from, "LLL dd, y")
                                )
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              initialFocus
                              mode="range"
                              defaultMonth={item.dateRange?.from}
                              selected={item.dateRange}
                              onSelect={(range) =>
                                range && updateDateRange(item.id, range)
                              }
                              numberOfMonths={2}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Guests Counter */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Users className="h-4 w-4" /> Guests
                        </label>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10"
                            onClick={() =>
                              updateGuests(
                                item.id,
                                Math.max(1, item.guests - 1),
                              )
                            }
                            disabled={item.guests <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="flex-1 text-center font-medium border rounded-md h-10 flex items-center justify-center">
                            {item.guests} Guest{item.guests !== 1 && "s"}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10"
                            onClick={() =>
                              updateGuests(
                                item.id,
                                Math.min(
                                  item.listing.capacity,
                                  item.guests + 1,
                                ),
                              )
                            }
                            disabled={item.guests >= item.listing.capacity}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Addons Section */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm">
                        Enhance your trip
                      </h4>

                      {/* Selected Addons */}
                      <div className="space-y-3">
                        {item.selectedAddons.map((addonItem) => (
                          <div
                            key={addonItem.addon.id}
                            className="flex items-center justify-between bg-accent/30 p-3 rounded-lg border"
                          >
                            <div className="flex-1">
                              <div className="font-medium text-sm">
                                {addonItem.addon.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                ${addonItem.addon.price} /{" "}
                                {addonItem.addon.price_type.replace("_", " ")}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2 bg-background rounded-md border p-0.5">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() =>
                                    updateAddon(
                                      item.id,
                                      addonItem.addon,
                                      addonItem.quantity - 1,
                                    )
                                  }
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="text-xs w-4 text-center">
                                  {addonItem.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() =>
                                    updateAddon(
                                      item.id,
                                      addonItem.addon,
                                      addonItem.quantity + 1,
                                    )
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="font-medium text-sm min-w-[60px] text-right">
                                $
                                {addonItem.addon.price *
                                  addonItem.quantity *
                                  (addonItem.addon.price_type === "per_night"
                                    ? nights
                                    : 1)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Available Addons to Add */}
                      {availableAddons.length > 0 && (
                        <div className="pt-2">
                          <div className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
                            Available Add-ons
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {availableAddons.map((addon) => (
                              <Badge
                                key={addon.id}
                                variant="outline"
                                className="cursor-pointer hover:bg-accent hover:text-accent-foreground py-1.5 px-3 transition-colors border-dashed"
                                onClick={() => updateAddon(item.id, addon, 1)}
                              >
                                <Plus className="h-3 w-3 mr-1.5" />
                                {addon.name} (+${addon.price})
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/10 border-t p-4 flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Base price:{" "}
                      <span className="font-medium text-foreground">
                        ${item.listing.basePrice}
                      </span>{" "}
                      / night
                    </div>
                    <div className="text-lg font-bold">
                      Subtotal: $
                      {(() => {
                        const base = item.listing.basePrice * nights;
                        const addons = item.selectedAddons.reduce(
                          (acc, curr) => {
                            const multiplier =
                              curr.addon.price_type === "per_night"
                                ? nights
                                : 1;
                            return (
                              acc +
                              curr.addon.price * curr.quantity * multiplier
                            );
                          },
                          0,
                        );
                        return base + addons;
                      })()}
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="sticky top-24 shadow-sm border-2 border-primary/10 py-0 pb-3">
              <CardHeader className="bg-primary/5 py-4">
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total Listings
                    </span>
                    <span>{cart.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & Fees</span>
                    <span>Included</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-end">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-2xl text-primary">
                      ${totalPrice}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full text-base py-6 shadow-md hover:shadow-lg transition-all"
                  size="lg"
                  onClick={handleProceed}
                >
                  Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="text-center">
                  <Button
                    variant="link"
                    className="text-xs text-muted-foreground h-auto p-0"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}
