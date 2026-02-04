import { Link } from "@tanstack/react-router";
import { addDays } from "date-fns";
import { AlertCircle, Check, Heart, Plus, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { cn } from "@/lib/utils";
import type { Listing } from "@/types";

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
	currency: _currency = "USD",
	rating,
	reviewCount: _reviewCount,
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
			item.listing.listingType === listing.listingType &&
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
			const typeLabel = listing.listingType.replace("_", " ");
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
		<Link to="/listings/$id" params={{ id }} className="block h-full group">
			<div className="h-full flex flex-col bg-background border border-border/50 hover:border-foreground transition-all duration-300 relative overflow-hidden">
				{/* Image Section */}
				<div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
					<img
						src={imgSrc}
						alt={title}
						onError={() =>
							setImgSrc(
								"https://placehold.co/600x400/f1f5f9/cbd5e1?text=Image+Unavailable",
							)
						}
						className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.02]"
						loading="lazy"
					/>
					<div className="absolute left-0 top-4 z-10 bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-md">
						{listing.listingType?.replace("_", " ")}
					</div>

					<div className="absolute top-2 right-2 z-20 flex flex-col gap-2">
						<Button
							variant="ghost"
							size="icon"
							className={cn(
								"rounded h-8 w-8 backdrop-blur-md transition-all duration-300 border border-transparent",
								isSaved
									? "bg-foreground text-primary hover:text-white"
									: "bg-black/20 text-white hover:bg-foreground hover:text-primary",
							)}
							onClick={handleWishlistClick}
						>
							<Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
						</Button>
					</div>

					<AnimatePresence>
						{pendingConfirm && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="absolute inset-0 z-30 flex items-center justify-center bg-foreground/80 p-4 text-center text-white"
							>
								<div>
									<AlertCircle className="mx-auto mb-2 h-8 w-8 text-primary" />
									<p className="text-sm font-bold uppercase tracking-wider">
										Already in cart
									</p>
									<p className="mt-1 text-xs opacity-70 font-mono">
										Click + again to confirm
									</p>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				<div className="h-1 w-full bg-foreground/10 group-hover:bg-primary transition-colors duration-300" />

				<div className="p-3 flex flex-col flex-grow relative bg-white group-hover:bg-zinc-50 transition-colors duration-300">
					<div className="flex flex-col gap-2 mb-4">
						<div className="flex justify-between items-center border-b border-dashed border-foreground/10 pb-2">
							<div className="flex items-center gap-1 text-foreground">
								<Star className="w-3 h-3 fill-primary text-primary" />
								<span className="text-xs font-bold font-mono">
									{rating.toFixed(1)}
								</span>
								<span className="text-[10px] text-muted-foreground">(60)</span>
							</div>
							<p className="text-[10px] uppercase tracking-wider font-bold text-foreground/60 truncate max-w-[50%]">
								{location}
							</p>
						</div>

						<h3 className="text-lg font-black uppercase tracking-tight text-foreground leading-none group-hover:text-primary transition-colors line-clamp-2 mt-1">
							{title}
						</h3>
					</div>

					<div className="mt-auto pt-3 flex items-end justify-between">
						<div>
							<div className="flex items-baseline gap-1">
								<span className="text-xl font-bold text-foreground">
									{new Intl.NumberFormat("en-US", {
										style: "currency",
										currency: _currency,
									}).format(price)}
								</span>
								{(listing as any).perUnit && (
									<span className="text-[10px] text-muted-foreground uppercase font-bold">
										/ {(listing as any).perUnit}
									</span>
								)}
							</div>
						</div>

						<Button
							size="sm"
							variant={isInCart ? "destructive" : "outline"}
							className={cn(
								"h-9 px-4 rounded uppercase tracking-wider font-bold text-[10px] gap-2 transition-all duration-300 border-2",
								isInCart
									? "bg-destructive hover:bg-destructive/90 text-white border-transparent"
									: "border-foreground text-foreground hover:bg-foreground hover:text-white",
							)}
							onClick={handleQuickAdd}
						>
							<AnimatePresence mode="wait">
								{isInCart ? (
									<motion.div
										key="check"
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										exit={{ scale: 0 }}
										className="flex items-center gap-2"
									>
										<Check className="h-3 w-3" />
										<span>Remove</span>
									</motion.div>
								) : (
									<motion.div
										key="plus"
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										exit={{ scale: 0 }}
										className="flex items-center gap-2"
									>
										<Plus className="h-3 w-3" />
										<span>Add</span>
									</motion.div>
								)}
							</AnimatePresence>
						</Button>
					</div>
				</div>
			</div>
		</Link>
	);
}
