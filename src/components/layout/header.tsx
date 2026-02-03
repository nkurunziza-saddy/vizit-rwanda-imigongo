import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { PatternHorizontalDiamonds } from "@/components/ui/patterns";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { NotificationBell } from "@/components/notifications";
import { LanguageSwitcher, CurrencySwitcher } from "@/components/i18n";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import type { Notification } from "@/schemas/notification.schema";

const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    type: "booking_confirmed",
    title: "Booking Confirmed",
    message: "Your booking at Kigali Marriott has been confirmed",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "2",
    userId: "1",
    type: "payment_received",
    title: "Payment Received",
    message: "Payment of $180 received for booking #1234",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const { cart, setOpenCart } = useCart();
  const navigate = useNavigate();
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b-2 border-foreground">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="cursor-help">
                  <PatternHorizontalDiamonds className="w-12 h-6 text-primary shrink-0" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-foreground border border-primary text-white p-4 max-w-xs shadow-xl rounded">
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold uppercase tracking-widest text-primary text-xs">
                    Imigongo (Cow Dung Art)
                  </h4>
                  <div className="mt-2 border-t border-white/20 pt-2">
                    <span className="block text-[10px] uppercase font-bold text-primary mb-1">
                      Material
                    </span>
                    <p className="text-white/80 font-light text-xs leading-relaxed">
                      Cow dung (Amase) mixed with natural ash (Ivu) and
                      pigmented earth.
                    </p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Link
            to="/"
            className="text-xl font-black uppercase tracking-tighter text-foreground"
          >
            Vizit<span className="text-primary">Africa</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Explore", href: "/listings" },
            { label: "Our Story", href: "/story" },
            { label: "Gallery", href: "/gallery" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <CurrencySwitcher />
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded hover:bg-accent hover:text-accent-foreground"
            onClick={() => setOpenCart(true)}
          >
            <ShoppingCart className="h-4 w-4" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center  bg-primary text-[10px] text-primary-foreground font-medium ring-1 ring-background">
                {cart.length}
              </span>
            )}
          </Button>

          {isAuthenticated && user && (
            <NotificationBell
              notifications={notifications}
              onMarkAsRead={(id) => {
                setNotifications((prev) =>
                  prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
                );
              }}
              onMarkAllAsRead={() => {
                setNotifications((prev) =>
                  prev.map((n) => ({ ...n, isRead: true })),
                );
              }}
              onDelete={(id) => {
                setNotifications((prev) => prev.filter((n) => n.id !== id));
              }}
              onViewAll={() => navigate({ to: "/dashboard" })}
            />
          )}

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none ml-2">
                <Avatar className="h-9 w-9 border-2 border-transparent hover:border-primary transition-colors">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    alt={user.fullName}
                  />
                  <AvatarFallback className="bg-foreground text-white font-bold">
                    {user.fullName?.charAt(0) || user.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded border-foreground/20"
                align="end"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.fullName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-foreground/10" />
                  <DropdownMenuItem className="rounded cursor-pointer focus:bg-foreground/5">
                    <Link to="/saved" className="w-full">
                      Saved Trips
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded cursor-pointer focus:bg-foreground/5">
                    <Link to="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {(user.role === "admin" || user.role === "vendor") && (
                    <DropdownMenuItem className="rounded cursor-pointer focus:bg-foreground/5">
                      <Link to="/dashboard" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-foreground/10" />
                  <DropdownMenuItem onClick={logout} variant="destructive">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button className="px-6 h-9 rounded bg-foreground text-white text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors ml-2">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform translate-y-full"></div>
    </header>
  );
}
