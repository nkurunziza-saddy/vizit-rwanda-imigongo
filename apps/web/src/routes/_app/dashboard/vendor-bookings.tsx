import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/context/auth-context";
import { useQuery } from "@tanstack/react-query";
import { DB_KEYS, Booking, BookingItem, Listing } from "@/utils/mock-db";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, User, Mail, Check, X } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/dashboard/vendor-bookings")({
  component: VendorBookingsPage,
});

// Fetch bookings for listings owned by this vendor
const getVendorBookings = async (userId: number) => {
  // 1. Get my vendor ID
  const vendorsStr = localStorage.getItem(DB_KEYS.VENDORS);
  const vendors = vendorsStr ? JSON.parse(vendorsStr) : [];
  const myVendor = vendors.find((v: any) => v.user_id === userId);

  if (!myVendor) return [];

  // 2. Get my listings
  const listingsStr = localStorage.getItem(DB_KEYS.LISTINGS);
  const listings = listingsStr ? JSON.parse(listingsStr) : [];
  const myListings = listings.filter(
    (l: Listing) => l.vendor_id === myVendor.id,
  );
  const myListingIds = myListings.map((l: Listing) => l.id);

  // 3. Get booking items that match my listings
  const bookingItemsStr = localStorage.getItem(DB_KEYS.BOOKING_ITEMS);
  const bookingItems = bookingItemsStr ? JSON.parse(bookingItemsStr) : [];
  const myBookingItems = bookingItems.filter((bi: BookingItem) =>
    myListingIds.includes(bi.listing_id),
  );

  // 4. Get parent bookings and users for context
  const bookingsStr = localStorage.getItem(DB_KEYS.BOOKINGS);
  const allBookings = bookingsStr ? JSON.parse(bookingsStr) : [];

  const usersStr = localStorage.getItem(DB_KEYS.USERS);
  const allUsers = usersStr ? JSON.parse(usersStr) : [];

  // Combine data
  return myBookingItems.map((item: BookingItem) => {
    const booking = allBookings.find((b: Booking) => b.id === item.booking_id);
    const listing = myListings.find((l: Listing) => l.id === item.listing_id);
    const customer = allUsers.find((u: any) => u.id === booking?.user_id);

    return {
      id: item.id,
      booking_id: booking?.id,
      listing_title: listing?.title,
      customer_name: customer?.full_name || "Unknown",
      customer_email: customer?.email,
      start_date: item.start_date,
      end_date: item.end_date,
      total_price: item.subtotal,
      status: booking?.status,
    };
  });
};

function VendorBookingsPage() {
  const { user } = useAuth();
  const {
    data: bookings,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["vendor-bookings", user?.id],
    queryFn: () => getVendorBookings(user!.id),
    enabled: !!user,
  });

  const handleStatusUpdate = async (
    bookingId: number,
    newStatus: "confirmed" | "cancelled",
  ) => {
    const stored = localStorage.getItem(DB_KEYS.BOOKINGS);
    if (stored) {
      const allBookings = JSON.parse(stored);
      const updated = allBookings.map((b: Booking) =>
        b.id === bookingId ? { ...b, status: newStatus } : b,
      );
      localStorage.setItem(DB_KEYS.BOOKINGS, JSON.stringify(updated));
      toast.success(`Booking ${newStatus}`);
      refetch();
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-4 w-64" />
        <div className="space-y-4">
          <Skeleton className="h-40 rounded-lg" />
          <Skeleton className="h-40 rounded-lg" />
          <Skeleton className="h-40 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground uppercase text-sm">
          Manage bookings for your properties.
        </p>
      </div>

      <div className="space-y-4">
        {bookings?.length === 0 ? (
          <div className="p-8 text-center border rounded-lg bg-muted/20">
            <CalendarDays className="mx-auto h-10 w-10 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No reservations found yet.</p>
          </div>
        ) : (
          bookings?.map((booking: any) => (
            <Card key={booking.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base font-bold">
                      {booking.listing_title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" /> {booking.customer_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {booking.customer_email}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      booking.status === "confirmed"
                        ? "default"
                        : booking.status === "cancelled"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm border-t pt-4 mt-2">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs uppercase font-medium">
                      Check-in
                    </span>
                    <span>{format(new Date(booking.start_date), "PPP")}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-muted-foreground text-xs uppercase font-medium">
                      Check-out
                    </span>
                    <span>{format(new Date(booking.end_date), "PPP")}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm bg-muted/50 p-2 rounded mt-4">
                  <span className="font-medium">Total Payout</span>
                  <span className="font-bold">${booking.total_price}</span>
                </div>
              </CardContent>
              {booking.status === "pending" && (
                <CardFooter className="flex gap-2 pt-0">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() =>
                      handleStatusUpdate(booking.booking_id, "confirmed")
                    }
                  >
                    <Check className="mr-2 h-4 w-4" /> Approve
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() =>
                      handleStatusUpdate(booking.booking_id, "cancelled")
                    }
                  >
                    <X className="mr-2 h-4 w-4" /> Reject
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
