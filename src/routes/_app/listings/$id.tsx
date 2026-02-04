import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { addDays, differenceInDays, format } from "date-fns";
import { ArrowLeft, Heart, MapPin, Share2, Star } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { AddonSelector } from "@/components/booking/addon-selector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { PatternDiamond } from "@/components/ui/patterns";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Reveal } from "@/components/ui/reveal";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/cart-context";
import { MOCK_LISTINGS } from "@/lib/data";
import type { Addon } from "@/types";

export const Route = createFileRoute("/_app/listings/$id")({
	component: ListingDetail,
});

function ListingDetail() {
	const { id } = useParams({ from: "/_app/listings/$id" });
	const listing = MOCK_LISTINGS.find((l) => l.id === Number(id));

	const { addToCart } = useCart();

	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(),
		to: addDays(new Date(), 3),
	});

	const [selectedAddons, setSelectedAddons] = useState<
		{ addon: Addon; quantity: number }[]
	>([]);

	if (!listing) {
		return (
			<div className="min-h-screen bg-background flex flex-col pb-20">
				<Skeleton className="h-[60vh] w-full" />
				<div className="container mx-auto px-4 -mt-20 relative z-10">
					<Card className="border-0 shadow-lg bg-background/95 backdrop-blur-sm">
						<div className="p-8">
							<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
								<div className="lg:col-span-8 space-y-8">
									<h2 className="text-xl">Listing Not Found</h2>
									<Link to="/listings">Back to Listings</Link>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		);
	}


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

	const handleAddonSelect = (addon: Addon, quantity: number) => {
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
		if (listing) {
			addToCart({
				listing,
				image:
					listing.imageUrl ||
					"https://placehold.co/600x400/f1f5f9/cbd5e1?text=Image+Unavailable",
				dateRange: date,
				guests: 1,
				selectedAddons: selectedAddons,
			});
		}
	};

	const imageUrl =
		listing.imageUrl ||
		"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80";

	return (
		<div className="min-h-screen bg-background flex flex-col pb-32">
			<div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
				<img
					src={imageUrl}
					alt={listing.title}
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

				<div className="absolute top-8 left-0 right-0 container mx-auto px-4 z-20 flex justify-between items-center">
					<Link
						to="/listings"
						className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300"
					>
						<ArrowLeft className="h-4 w-4" />
						Back to Collection
					</Link>

					<div className="flex gap-2">
						<Button
							size="icon"
							variant="ghost"
							className="rounded-full bg-black/20 text-white hover:bg-black/40 hover:text-white"
						>
							<Share2 className="h-4 w-4" />
						</Button>
						<Button
							size="icon"
							variant="ghost"
							className="rounded-full bg-black/20 text-white hover:bg-black/40 hover:text-white"
						>
							<Heart className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 -mt-32 relative z-10">
				<Reveal>
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
						<div className="lg:col-span-8 space-y-12">
							<div className="space-y-4">
								<div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest bg-primary/10 w-fit px-3 py-1 rounded-full border border-primary/20">
									<PatternDiamond className="w-2 h-2" />
									<span>Premier Stay</span>
								</div>
								<h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
									{listing.title}
								</h1>
								<div className="flex items-center gap-6 text-sm text-muted-foreground font-medium pt-2">
									<span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
										<MapPin className="h-4 w-4" /> {listing.locationId}
									</span>
									<span className="flex items-center gap-1.5">
										<Star className="h-4 w-4 fill-primary text-primary" />
										<span className="font-bold text-foreground">4.98</span>
										<span className="underline cursor-pointer hover:text-foreground transition-colors">
											(128 reviews)
										</span>
									</span>
								</div>
							</div>

							<div className="h-px w-full bg-border/40" />

							<div className="prose prose-lg prose-gray max-w-none">
								<h3 className="font-serif text-2xl italic text-foreground mb-6">
									The Experience
								</h3>
								<p className="text-muted-foreground leading-relaxed text-lg">
									{listing.description}
								</p>
							</div>

							<div>
								<h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
									Amenities
								</h3>
								<div className="flex flex-wrap gap-3">
									{(listing.amenities || []).map((item) => (
										<Badge
											key={item}
											variant="outline"
											className="px-4 py-2 text-xs font-medium border-border/50 text-foreground/80 hover:bg-muted transition-colors rounded-sm"
										>
											{item}
										</Badge>
									))}
								</div>
							</div>

							{listing.addons && listing.addons.length > 0 && (
								<div className="bg-muted/10 p-8 border border-border/50 rounded-sm">
									<h3 className="text-xl font-bold uppercase tracking-tight text-foreground mb-6 flex items-center gap-3">
										<PatternDiamond className="w-4 h-4 text-primary" />
										Enhance your stay
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
							<div className="sticky top-28 bg-background border border-border shadow-2xl shadow-primary/5 rounded-xl overflow-hidden">
								<div className="bg-primary/5 p-6 border-b border-border/50">
									<div className="flex justify-between items-baseline">
										<div className="flex flex-col">
											<span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
												Starting from
											</span>
											<span className="text-3xl font-black tracking-tight text-foreground">
												${listing.basePrice}
											</span>
										</div>
										<span className="text-sm font-medium text-muted-foreground">
											/ night
										</span>
									</div>
								</div>

								<div className="p-6 space-y-6">
									<div className="grid grid-cols-2 gap-3">
										<Popover>
											<PopoverTrigger className="w-full">
												<div className="border border-input rounded-lg p-3 hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer text-left h-full">
													<div className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5">
														Check-in
													</div>
													<div className="text-sm font-medium truncate">
														{date?.from
															? format(date.from, "MMM dd, yyyy")
															: "Add date"}
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
											<PopoverTrigger className="w-full">
												<div className="border border-input rounded-lg p-3 hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer text-left h-full">
													<div className="text-[10px] uppercase font-bold text-muted-foreground mb-1.5">
														Check-out
													</div>
													<div className="text-sm font-medium truncate">
														{date?.to
															? format(date.to, "MMM dd, yyyy")
															: "Add date"}
													</div>
												</div>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="end">
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
										<div className="space-y-4 py-4 border-t border-border/50 border-b">
											<div className="flex justify-between text-sm">
												<span className="text-muted-foreground underline decoration-dotted decoration-border">
													${listing?.basePrice ?? 0} x {nights} nights
												</span>
												<span className="font-medium">
													${(listing?.basePrice ?? 0) * nights}
												</span>
											</div>
											{selectedAddons.length > 0 && (
												<div className="flex justify-between text-sm">
													<span className="text-muted-foreground underline decoration-dotted decoration-border">
														Add-ons
													</span>
													<span className="font-medium">
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
											<div className="flex justify-between font-bold text-lg pt-2">
												<span>Total</span>
												<span>${estimatedTotal}</span>
											</div>
										</div>
									)}

									<Button
										className="w-full h-12 text-sm uppercase tracking-widest font-bold shadow-lg shadow-primary/20"
										size="lg"
										onClick={handleBookClick}
									>
										{nights > 0 ? "Reserve Journey" : "Check Availability"}
									</Button>

									<p className="text-center text-xs text-muted-foreground font-serif italic">
										You won't be charged yet
									</p>
								</div>
							</div>
						</div>
					</div>
				</Reveal>
			</div>
		</div>
	);
}
