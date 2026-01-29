import { Link } from "@tanstack/react-router";
import { Star, Plus, Check, AlertCircle, Heart } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import type { Listing } from "@/utils/mock-db";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface ListingCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  currency?: string;
  rating: number;
  reviewCount: number;
  image: string;
  category: "hotel" | "bnb" | "car" | "tour";
  perUnit?: string;
  listing: Listing;
}

export default function ListingCard({
  id,
  title,
  location,
  price,
  currency = "USD",
  rating,
  reviewCount,
  image,
  listing,
}: ListingCardProps) {
  const { addToCart, removeFromCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [pendingConfirm, setPendingConfirm] = useState(false);
  const [imgSrc, setImgSrc] = useState(image);

  useEffect(() => {
    setImgSrc(image);
  }, [image]);

  const isSaved = isInWishlist(listing.id);

  const existingCartItem = cart.find((item) => item.listing.id === listing.id);
  const isInCart = !!existingCartItem;

  const hasSameCategory = cart.some(
    (item) =>
      item.listing.listing_type === listing.listing_type &&
      item.listing.id !== listing.id,
  );

  useEffect(() => {
    if (isInCart !== undefined) {
      setPendingConfirm(false);
    }
  }, [isInCart]);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(listing);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart) {
      if (existingCartItem) {
        removeFromCart(existingCartItem.id);
        toast.info("Removed from cart");
      }
      return;
    }

    if (hasSameCategory && !pendingConfirm) {
      setPendingConfirm(true);
      const typeLabel = listing.listing_type.replace("_", " ");
      toast.info(`You already have a ${typeLabel} in your cart.`, {
        description: "Click again to add this one as well.",
        duration: 5000,
        icon: <AlertCircle className="h-4 w-4 text-blue-500" />,
      });

      setTimeout(() => {
        setPendingConfirm(false);
      }, 30000);
      return;
    }

    const defaultDateRange = {
      from: new Date(),
      to: addDays(new Date(), 1),
    };

    const newItem = {
      listing,
      image,
      dateRange: defaultDateRange,
      guests: 1,
      selectedAddons: [],
    };

    addToCart(newItem);
    setPendingConfirm(false);
    toast.success("Added to cart!");
  };

  return (
    <Link to="/listings/$id" params={{ id }} className="block h-full">
      <motion.div
        className="h-full flex flex-col group"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted/30 isolate">
          <motion.img
            src={imgSrc}
            alt={title}
            onError={() =>
              setImgSrc(
                "https://placehold.co/600x400/f1f5f9/cbd5e1?text=Image+Unavailable",
              )
            }
            className="w-full h-full object-cover"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.03 },
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            loading="lazy"
          />

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 1 },
            }}
            transition={{ duration: 0.3 }}
          />

          <div className="absolute top-3 right-3 z-20">
            <motion.div
              variants={{
                rest: { opacity: isSaved ? 1 : 0, y: -5 },
                hover: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center gap-2"
            >
              <Button
                variant="ghost"
                size="icon-sm"
                className={cn(
                  "rounded-full backdrop-blur-md transition-all duration-300 border border-transparent",
                  isSaved
                    ? "bg-black/20 text-rose-500 hover:text-rose-600"
                    : "bg-black/20 text-white hover:text-rose-500",
                )}
                onClick={handleWishlistClick}
              >
                <Heart
                  className={cn("h-3.5 w-3.5", isSaved && "fill-current")}
                />
              </Button>
              <Button
                size="icon-sm"
                className={cn(
                  "rounded-full transition-all duration-300 border-transparent",
                  isInCart
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900",
                  pendingConfirm && "bg-rose-500 hover:bg-rose-600 text-white",
                )}
                onClick={handleQuickAdd}
              >
                <AnimatePresence mode="wait">
                  {isInCart ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="plus"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="pt-3 space-y-1.5 px-0.5">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-medium text-sm leading-tight line-clamp-1 text-foreground">
              {title}
            </h3>
            <div className="flex items-center gap-0.5 shrink-0">
              <Star className="h-3 w-3 fill-foreground text-foreground" />
              <span className="text-xs font-medium">{rating}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-xs line-clamp-1 truncate">
              {location}
            </p>
            <div className="flex items-baseline gap-0.5 shrink-0">
              <span className="text-sm font-semibold text-foreground">
                ${price}
              </span>
              <span className="text-[10px] text-muted-foreground">/nt</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
