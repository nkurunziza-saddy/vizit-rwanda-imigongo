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
  TrendingUp,
  Clock,
  ArrowRight,
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
import { Reveal } from "@/components/ui/reveal";
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

export const Route = createFileRoute("/_app/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border/40 pb-6">
        <div>
          <Badge
            variant="outline"
            className="mb-3 rounded-full px-3 py-1 border-primary/20 bg-primary/5 text-primary tracking-widest uppercase text-[10px] font-bold"
          >
            {user.role} Dashboard
          </Badge>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground">
            Welcome back,{" "}
            <span className="text-muted-foreground">
              {user.fullName.split(" ")[0]}
            </span>
          </h1>
        </div>
        <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest hidden md:block">
          {format(new Date(), "EEEE, MMMM do, yyyy")}
        </p>
      </div>

      <Reveal>
        {user.role === "tourist" && <TouristDashboard />}
        {user.role === "vendor" && <VendorDashboard />}
        {user.role === "admin" && <AdminDashboard />}
      </Reveal>
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[280px] rounded-xl" />
          <Skeleton className="h-[280px] rounded-xl" />
          <Skeleton className="h-[280px] rounded-xl" />
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
    <Tabs defaultValue="upcoming" className="w-full space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          Your Journeys
        </h3>
        <TabsList className="grid w-full sm:w-[320px] grid-cols-2 h-10 bg-muted/30 p-1 rounded-lg">
          <TabsTrigger
            value="upcoming"
            className="rounded-md text-xs font-bold uppercase tracking-wide"
          >
            Upcoming ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="rounded-md text-xs font-bold uppercase tracking-wide"
          >
            History ({pastBookings.length})
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent
        value="upcoming"
        className="space-y-6 animate-in slide-in-from-bottom-2 duration-500"
      >
        {upcomingBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border/60 rounded-xl bg-muted/5">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
              <CalendarDays className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight mb-2">
              No upcoming trips
            </h3>
            <p className="text-muted-foreground mb-8 text-center max-w-sm">
              Your next adventure is waiting. Discover our curated collection of
              stays and experiences.
            </p>
            <Link to="/listings">
              <Button
                size="lg"
                className="h-12 px-8 rounded-full uppercase tracking-widest font-bold text-xs"
              >
                Plan a Trip
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {upcomingBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent
        value="past"
        className="space-y-6 animate-in slide-in-from-bottom-2 duration-500"
      >
        {pastBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border/60 rounded-xl bg-muted/5">
            <p className="text-muted-foreground font-medium">
              No past bookings found.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {pastBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

function BookingCard({ booking }: { booking: any }) {
  return (
    <div className="group relative flex flex-col sm:flex-row border border-border/60 rounded-xl overflow-hidden bg-card hover:bg-muted/5 hover:border-border transition-all duration-300 shadow-sm hover:shadow-md h-full">
      <div
        className="h-48 sm:h-auto sm:w-48 bg-muted bg-cover bg-center shrink-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80)",
        }}
      >
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-background/90 backdrop-blur-md text-foreground hover:bg-background border-none shadow-sm rounded-sm uppercase tracking-wider text-[10px] font-bold px-2 py-1">
            Stay
          </Badge>
        </div>
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2 mb-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                CONF-{booking.id}
              </span>
              <h4 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                Serenity Lodge
              </h4>
            </div>

            <Badge
              variant={
                booking.status === "confirmed"
                  ? "default"
                  : booking.status === "cancelled"
                    ? "destructive"
                    : "secondary"
              }
              className="capitalize px-2.5 py-0.5 rounded-full uppercase tracking-wide text-[10px] font-bold"
            >
              {booking.status}
            </Badge>
          </div>

          <div className="flex items-center text-xs text-muted-foreground gap-1.5 mb-4">
            <MapPin className="h-3 w-3" /> Kigali, Rwanda
          </div>

          <Separator className="my-3 opacity-50" />

          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
            <div className="space-y-0.5">
              <span className="text-muted-foreground/70 uppercase text-[10px] tracking-wider font-semibold block">
                Date
              </span>
              <span className="font-medium text-foreground">
                {format(new Date(booking.created_at), "MMM d, yyyy")}
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-muted-foreground/70 uppercase text-[10px] tracking-wider font-semibold block">
                Total
              </span>
              <span className="font-medium text-foreground">
                {booking.currency} {booking.total_amount}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 pt-2">
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
      <DialogTrigger render={<Button
          variant="outline"
          size="sm"
          className="flex-1 gap-2 rounded-lg text-xs font-bold uppercase tracking-widest h-9"
        />}>
        <Info className="h-3.5 w-3.5" /> Details
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-border/50">
        <div className="relative h-32 bg-muted">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
            className="w-full h-full object-cover opacity-80"
            alt="Booking header"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-4 left-6">
            <Badge
              variant="secondary"
              className="mb-2 bg-background/50 backdrop-blur-md text-foreground border-none rounded-sm uppercase tracking-wider text-[10px] font-bold"
            >
              Confirmed
            </Badge>
            <h3 className="font-black text-xl text-foreground uppercase tracking-tight">
              Booking #{booking.id}
            </h3>
          </div>
        </div>

        <div className="px-6 pb-6 pt-2 space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm mt-2">
            <div className="bg-muted/30 p-3 rounded-lg border border-border/40">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">
                Check-in
              </span>
              <span className="font-medium">Jan 27, 2026</span>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg border border-border/40">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">
                Check-out
              </span>
              <span className="font-medium">Jan 30, 2026</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm py-2 border-b border-dashed border-border">
              <span className="text-muted-foreground">Guests</span>
              <span className="font-medium">2 Adults</span>
            </div>
            <div className="flex justify-between items-center text-sm py-2 border-b border-dashed border-border">
              <span className="text-muted-foreground">Payment</span>
              <span className="font-medium flex items-center gap-2">
                <CreditCardIcon className="w-3 h-3" /> Visa ••42
              </span>
            </div>
          </div>

          <div className="bg-muted/20 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>$360.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Taxes</span>
              <span>Included</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between items-end">
              <span className="font-bold text-sm uppercase tracking-wide">
                Total Paid
              </span>
              <span className="font-black text-xl text-primary">
                {booking.currency} {booking.total_amount}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              className="flex-1 gap-2 rounded-lg text-xs font-bold uppercase tracking-widest"
              size="lg"
            >
              Download Invoice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CreditCardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Visa</title>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function TicketModal({ booking }: { booking: any }) {
  return (
    <Dialog>
      <DialogTrigger render={<Button
          size="sm"
          className="flex-1 gap-2 rounded-lg text-xs font-bold uppercase tracking-widest h-9 border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary hover:text-primary"
          variant="outline"
        />}>
        
          <QrCode className="h-3.5 w-3.5" /> Ticket
  
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm p-0 overflow-hidden bg-background">
        <div className="bg-primary p-6 text-primary-foreground text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
          <CheckCircle2 className="h-12 w-12 mx-auto mb-3 relative z-10" />
          <h3 className="font-black text-xl uppercase tracking-tighter relative z-10">
            Access Granted
          </h3>
          <p className="text-primary-foreground/80 text-xs font-medium relative z-10">
            Scan at reception
          </p>
        </div>

        <div className="p-8 flex flex-col items-center gap-6 bg-background">
          <div className="p-2 border-2 border-dashed border-primary/20 rounded-lg">
            <QRCode
              value={`VIZIT-BOOKING-${booking.id}`}
              size={160}
              className="rounded-lg"
            />
          </div>

          <div className="w-full text-center space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
              Booking Reference
            </p>
            <p className="font-mono text-lg font-bold">#{booking.id}</p>
          </div>

          <Button
            className="w-full rounded-lg uppercase tracking-widest font-bold text-xs"
            onClick={() => window.print()}
          >
            Download PDF
          </Button>
        </div>

        <div className="bg-muted p-3 text-center border-t border-border">
          <p className="text-[10px] text-muted-foreground">
            Valid for one-time entry only.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function VendorDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Revenue"
        value="$4,231.89"
        change="+20.1%"
        icon={Receipt}
        color="text-green-600"
      />
      <StatsCard
        title="Active Listings"
        value="12"
        change="+2 this month"
        icon={Hotel}
      />
      <StatsCard
        title="Pending Bookings"
        value="3"
        change="Needs approval"
        icon={CalendarDays}
        color="text-orange-600"
      />
      <StatsCard
        title="Rating"
        value="4.9"
        change="128 Reviews"
        icon={TrendingUp}
      />
    </div>
  );
}

function StatsCard({ title, value, change, icon: Icon, color }: any) {
  return (
    <Card className="rounded-xl border border-border/50 shadow-sm bg-card hover:border-primary/50 transition-colors group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {title}
        </CardTitle>
        <div className="p-2 bg-muted/50 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-black tracking-tight">{value}</div>
        <p
          className={`text-xs font-medium mt-1 ${color || "text-muted-foreground"}`}
        >
          {change}
        </p>
      </CardContent>
    </Card>
  );
}



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
      fetchPendingVendors();
    } catch (e) {
      console.error("Failed to approve vendor", e);
    }
  };

  const handleReject = async (vendorId: string, _reason: string) => {
    try {
      await api.approveVendor(Number(vendorId), false);
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
              className="p-0 w-6 h-6 rounded"
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
                  className="flex h-8 w-8 p-0 data-[state=open]:bg-muted rounded"
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
        <StatsCard
          title="Total Users"
          value="1,234"
          change="+180 this month"
          icon={Users}
          color="text-primary"
        />
        <StatsCard
          title="Pending Vendors"
          value={pendingVendors.length.toString()}
          change={pendingVendors.length > 0 ? "Action Required" : "All clear"}
          icon={Clock}
          color={
            pendingVendors.length > 0
              ? "text-orange-500"
              : "text-muted-foreground"
          }
        />
      </div>

      <Card className="border-border/50 shadow-sm rounded-xl overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border/40 pb-4">
          <CardTitle className="text-lg font-bold uppercase tracking-tight">
            Pending Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : pendingVendors.length === 0 ? (
            <div className="py-12">
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>All caught up!</EmptyTitle>
                  <EmptyDescription>
                    No vendors applications are pending.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>
          ) : (
            <div className="border-none">
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
