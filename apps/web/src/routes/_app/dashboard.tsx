import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
  CalendarDays,
  CheckCircle,
  Hotel,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-context";
import { GrainOverlay } from "@/components/ui/grain-overlay";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="space-y-4 w-64">
          <Skeleton className="h-8 w-3/4 mx-auto rounded" />
          <Skeleton className="h-4 w-1/2 mx-auto rounded" />
          <div className="flex justify-center gap-2 pt-4">
            <Skeleton className="h-10 w-24 rounded" />
            <Skeleton className="h-10 w-24 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-background">
        <GrainOverlay />
        <h2 className="text-2xl font-black uppercase tracking-tight mb-2">
          Access Restricted
        </h2>
        <p className="mb-8 text-muted-foreground font-serif">
          You need to be logged in to view your dashboard.
        </p>
        <Link to="/login">
          <Button className="rounded-full px-8 h-12 uppercase tracking-widest font-bold text-xs">
            Login to Continue
          </Button>
        </Link>
      </div>
    );
  }

  const sidebarItems = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["tourist", "vendor", "admin"],
    },
    {
      label: "My Bookings",
      href: "/dashboard",
      icon: CalendarDays,
      roles: ["tourist"],
    },
    {
      label: "My Listings",
      href: "/dashboard/listings",
      icon: Hotel,
      roles: ["vendor"],
    },
    {
      label: "Manage Bookings",
      href: "/dashboard/vendor-bookings",
      icon: CalendarDays,
      roles: ["vendor"],
    },
    {
      label: "Approvals",
      href: "/dashboard/approvals",
      icon: CheckCircle,
      roles: ["admin"],
    },
    {
      label: "All Users",
      href: "/dashboard/users",
      icon: Users,
      roles: ["admin"],
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      roles: ["tourist", "vendor", "admin"],
    },
  ];

  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(user.role),
  );

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-background relative">
      <GrainOverlay />
      <section className="py-8 relative z-10 w-full max-w-7xl mx-auto px-4">
        <div className="flex h-14 border-b border-border/40 items-center space-x-1 overflow-x-auto gap-2 mb-8 no-scrollbar">
          {filteredItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              activeProps={{
                className: "text-foreground border-primary bg-primary/5",
              }}
              className="flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent text-xs font-bold uppercase tracking-widest transition-all hover:text-primary hover:bg-primary/5 px-4 py-2.5 rounded-t-sm text-muted-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
        <main className="py-4 mt-4 min-h-[500px]">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
