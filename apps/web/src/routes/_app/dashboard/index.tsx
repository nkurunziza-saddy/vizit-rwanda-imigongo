import { createFileRoute, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import {
  CalendarDays,
  Hotel,
  MapPin,
  QrCode,
  Users,
  CheckCircle2,
  Info,
  ExternalLink,
  Receipt,
} from "lucide-react";
import QRCode from "react-qr-code";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth-context";
import { useMyBookings } from "@/hooks/use-bookings";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_app/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground uppercase text-sm">
          Manage your trips, profile, and account settings here.
        </p>
      </div>

      {user.role === "tourist" && <TouristDashboard />}
      {user.role === "vendor" && <VendorDashboard />}
      {user.role === "admin" && <AdminDashboard />}
    </div>
  );
}

function TouristDashboard() {
  const { user } = useAuth();
  const { data: bookings, isLoading } = useMyBookings(
    user?.id ? { page: 1, perPage: 10 } : undefined,
  );

  if (isLoading)
    return (
      <div className="space-y-6">
        <Skeleton className="h-4 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
        </div>
        <Skeleton className="h-10 w-64" />
        <div className="space-y-4">
          <Skeleton className="h-40 rounded-lg" />
          <Skeleton className="h-40 rounded-lg" />
        </div>
      </div>
    );

  const upcomingBookings =
    bookings?.filter(
      (b) => b.status === "confirmed" || b.status === "pending",
    ) || [];

  const pastBookings =
    bookings?.filter(
      (b) => b.status === "completed" || b.status === "cancelled",
    ) || [];

  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-xl font-semibold">Your Trips</h3>
        <TabsList className="grid w-full sm:w-[400px] grid-cols-2">
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            History ({pastBookings.length})
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="upcoming" className="space-y-4">
        {upcomingBookings.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed rounded-xl bg-muted/20">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <CalendarDays className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-semibold">No upcoming trips</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
              Ready for your next adventure in Rwanda? Explore our top-rated
              stays and tours.
            </p>
            <Link to="/listings">
              <Button size="lg" className="px-8 shadow-md">
                Explore Destinations
              </Button>
            </Link>
          </div>
        ) : (
          upcomingBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        )}
      </TabsContent>

      <TabsContent value="past" className="space-y-4">
        {pastBookings.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed rounded-xl bg-muted/20">
            <p className="text-muted-foreground">No past bookings found.</p>
          </div>
        ) : (
          pastBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        )}
      </TabsContent>
    </Tabs>
  );
}

function BookingCard({ booking }: { booking: any }) {
  return (
    <div className="group relative flex flex-col sm:flex-row border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-all duration-300">
      <div
        className="h-40 sm:w-64 bg-muted bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80)",
        }}
      >
        <div className="absolute top-2 left-2">
          <Badge className="bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90 border-none shadow-sm">
            Hotel
          </Badge>
        </div>
      </div>
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2">
            <div>
              <h4 className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors">
                Trip to Kigali
              </h4>
              <div className="flex items-center text-sm text-muted-foreground gap-1.5 mt-1">
                <MapPin className="h-3.5 w-3.5 text-primary" /> Kigali, Rwanda
              </div>
            </div>
            <Badge
              variant={
                booking.status === "confirmed"
                  ? "default"
                  : booking.status === "cancelled"
                    ? "destructive"
                    : "secondary"
              }
              className="capitalize px-3 py-0.5 rounded-full"
            >
              {booking.status}
            </Badge>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>
                Booked on {format(new Date(booking.created_at), "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Receipt className="h-4 w-4" />
              <span className="font-medium text-foreground">
                {booking.currency} {booking.total_amount}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <BookingDetailsModal booking={booking} />
          {booking.status === "confirmed" && <TicketModal booking={booking} />}
        </div>
      </div>
    </div>
  );
}

function BookingDetailsModal({ booking }: { booking: any }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="sm" className="gap-2">
          <Info className="h-4 w-4" /> View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex gap-4">
            <div
              className="h-20 w-20 rounded-lg bg-muted bg-cover bg-center shrink-0"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80)",
              }}
            />
            <div className="flex-1">
              <h4 className="font-bold">Luxury Hotel stay in Kigali</h4>
              <p className="text-sm text-muted-foreground">
                Reference: #BK-{booking.id}
              </p>
              <Badge variant="outline" className="mt-2">
                Confirmed
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Check-in</p>
              <p className="font-medium">Jan 27, 2026</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Check-out</p>
              <p className="font-medium">Jan 30, 2026</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Guests</p>
              <p className="font-medium">2 Adults</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Payment Method</p>
              <p className="font-medium">Visa •••• 4242</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm font-semibold">Price Breakdown</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  3 nights x $120.00
                </span>
                <span>$360.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Fee</span>
                <span>$0.00</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>
                  {booking.currency} {booking.total_amount}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <Button className="flex-1 gap-2">
              <Receipt className="h-4 w-4" /> Download Invoice
            </Button>
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" /> Contact Vendor
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TicketModal({ booking }: { booking: any }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" className="gap-2 shadow-sm">
          <QrCode className="h-4 w-4" /> Digital Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center p-6 space-y-6 text-center">
          <div className="rounded-full bg-green-100 p-4 text-green-600 dark:bg-green-900/30 dark:text-green-400 animate-bounce">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-2xl">Booking Confirmed!</h3>
            <p className="text-sm text-muted-foreground">
              Show this QR code at the reception when you arrive.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-lg border-2 border-primary/5">
            <QRCode value={`VIZIT-BOOKING-${booking.id}`} size={200} />
          </div>

          <div className="w-full text-left space-y-2 bg-muted/50 p-4 rounded-xl text-sm border border-border/50">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Booking ID</span>
              <span className="font-mono font-bold">#{booking.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer</span>
              <span className="font-medium">Test Tourist</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-bold text-primary">
                {booking.currency} {booking.total_amount}
              </span>
            </div>
          </div>

          <Button
            className="w-full py-6 text-base"
            onClick={() => window.print()}
          >
            Download Ticket (PDF)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function VendorDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <div className="text-muted-foreground font-bold">$</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$4,231.89</div>
          <p className="text-xs text-green-600 font-medium">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
          <Hotel className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground font-medium">
            +2 new this month
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Bookings
          </CardTitle>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-orange-600 font-medium">Needs approval</p>
        </CardContent>
      </Card>
    </div>
  );
}

import { useEffect, useState, useMemo } from "react";
import { api } from "@/api/client";
import { DataTable } from "@/components/data-table/data-table";
import { approvalColumns } from "@/components/dashboard/tables/approvals-columns";
import { VendorApplicationDetails } from "@/components/dashboard/tables/vendor-application-details";
import { ColumnDef } from "@tanstack/react-table";
import { Vendor } from "@/schemas/vendor.schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  ChevronRight,
  Check,
  X,
  MoreHorizontal,
} from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

function AdminDashboard() {
  const [pendingVendors, setPendingVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPendingVendors = async () => {
    try {
      setIsLoading(true);
      const vendors = await api.getPendingVendors();
      setPendingVendors(vendors as Vendor[]);
    } catch (error) {
      console.error("Failed to fetch pending vendors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingVendors();
  }, []);

  const handleApprove = async (vendorId: string, _commissionRate: number) => {
    try {
      await api.approveVendor(Number(vendorId), true);
      // Refresh list
      fetchPendingVendors();
    } catch (e) {
      console.error("Failed to approve vendor", e);
    }
  };

  const handleReject = async (vendorId: string, _reason: string) => {
    try {
      // For now, mapping reject to approve(false)
      await api.approveVendor(Number(vendorId), false);
      // Refresh list
      fetchPendingVendors();
    } catch (e) {
      console.error("Failed to reject vendor", e);
    }
  };

  const columns = useMemo<ColumnDef<Vendor>[]>(
    () => [
      {
        accessorKey: "expander",
        header: () => null,
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <Button
              variant="ghost"
              size="sm"
              className="p-0 w-6 h-6"
              onClick={row.getToggleExpandedHandler()}
            >
              {row.getIsExpanded() ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          ) : null;
        },
        enableSorting: false,
        enableHiding: false,
      },
      ...approvalColumns,
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const vendor = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="ghost"
                  className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={() => handleApprove(vendor.id, 10)}>
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleReject(vendor.id, "Manually rejected")}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-green-600 font-medium">
              +180 from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-2 border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Vendors
            </CardTitle>
            {pendingVendors.length > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                {pendingVendors.length}
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingVendors.length}</div>
            <p className="text-xs text-muted-foreground font-medium">
              Requires verification
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Pending Applications
        </h2>
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="h-10 w-64 bg-muted rounded animate-pulse" />
              <div className="h-10 w-32 bg-muted rounded animate-pulse ml-auto" />
            </div>
            <div className="border rounded-lg">
              <div className="h-12 bg-muted/50 border-b" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 border-b last:border-0 flex items-center px-4 gap-4"
                >
                  <div className="h-4 w-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-48 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                  <div className="h-8 w-8 bg-muted rounded animate-pulse ml-auto" />
                </div>
              ))}
            </div>
          </div>
        ) : pendingVendors.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>No vendors</EmptyTitle>
              <EmptyDescription>
                No vendors applications are pending.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <DataTable
            columns={columns}
            data={pendingVendors}
            searchKey="businessName"
            rowSize="md"
            getRowCanExpand={() => true}
            renderSubComponent={({ row }) => (
              <VendorApplicationDetails row={row} />
            )}
          />
        )}
      </div>
    </div>
  );
}
