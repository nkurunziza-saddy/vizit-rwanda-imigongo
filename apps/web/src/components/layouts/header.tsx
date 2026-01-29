"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useScroll } from "@/hooks/use-scroll";
import { Logo } from "@/components/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/layouts/mobile-nav";
import { navLinks } from "@/lib/nav-links";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { NotificationBell } from "@/components/notifications";
import { LanguageSwitcher } from "@/components/i18n";
import { ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { Notification } from "@/schemas/notification.schema";

// Mock notifications for demonstration
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
  const scrolled = useScroll(10);
  const { user, logout, isAuthenticated } = useAuth();
  const { cart, setOpenCart } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full max-w-4xl border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
        {
          "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl md:shadow":
            scrolled,
        },
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
          {
            "md:px-2": scrolled,
          },
        )}
      >
        <Link className="rounded-md p-2 hover:bg-accent" to="/">
          <Logo className="h-4.5" />
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              className={buttonVariants({ variant: "ghost" })}
              to={link.href}
              key={`${link.label}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8"
              onClick={() => setOpenCart(true)}
            >
              <ShoppingCart className="h-4 w-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-medium ring-1 ring-background">
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
                <DropdownMenuTrigger className="outline-none">
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                        alt={user.full_name}
                      />
                      <AvatarFallback>
                        {user.full_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.full_name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/saved" className="w-full cursor-pointer">
                        {t("nav.savedTrips")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/profile" className="w-full cursor-pointer">
                        {t("nav.profile")}
                      </Link>
                    </DropdownMenuItem>
                    {user.role === "admin" && (
                      <DropdownMenuItem>
                        <Link to="/dashboard" className="w-full cursor-pointer">
                          {t("nav.dashboard")}
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {user.role === "vendor" && (
                      <DropdownMenuItem>
                        <Link to="/dashboard" className="w-full cursor-pointer">
                          {t("nav.dashboard")}
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer"
                    >
                      {t("common.logout")}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <LanguageSwitcher />
                <Link to="/login" className={buttonVariants()}>
                  {t("common.login")}
                </Link>
              </>
            )}
          </div>
        </div>
        <MobileNav />
      </nav>
    </header>
  );
}
