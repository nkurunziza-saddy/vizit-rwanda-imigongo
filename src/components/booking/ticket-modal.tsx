import { useNavigate } from "@tanstack/react-router";
import { addDays } from "date-fns";
import {
	ArrowRight,
	Check,
	Loader2,
	Luggage,
	Plane,
	Utensils,
} from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { PatternZigZag } from "@/components/ui/patterns";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import type { Listing } from "@/types";

interface TicketSelectionModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	defaultDate?: DateRange;
	guests?: number;
	fromLocation?: string;
}

export function TicketSelectionModal({
	open,
	onOpenChange,
	defaultDate,
	guests = 1,
	fromLocation = "City",
}: TicketSelectionModalProps) {
	const { addToCart } = useCart();
	const navigate = useNavigate();
	const [step, setStep] = useState<"search" | "results" | "success">("search");
	const [isSearching, setIsSearching] = useState(false);

	const ticketListing: Listing = {
		id: 99999,
		vendorId: 1,
		locationId: 1,
		title: `Round Trip Flight: ${fromLocation} to Kigali`,
		listingType: "ticket",
		description: `Economy class round trip ticket from ${fromLocation} to Kigali International Airport (KGL). Includes baggage and meals.`,
		basePrice: 850,
		currency: "USD",
		capacity: 100,
		status: "active",
		imageUrl:
			"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop",
		createdAt: new Date().toISOString(),
		addons: [],
	};

	const handleSearch = () => {
		setIsSearching(true);
		setTimeout(() => {
			setIsSearching(false);
			setStep("results");
		}, 2000);
	};

	const handleSelectTicket = () => {
		const dateRange = defaultDate || {
			from: new Date(),
			to: addDays(new Date(), 7),
		};

		addToCart({
			listing: ticketListing,
			image: ticketListing.imageUrl!,
			dateRange,
			guests,
			selectedAddons: [],
		});

		setStep("success");
		toast.success("Flight ticket added to cart!");
	};

	const handleCheckout = () => {
		onOpenChange(false);
		navigate({ to: "/cart" });
	};

	const handleContinueShopping = () => {
		onOpenChange(false);
		setTimeout(() => {
			setStep("search");
		}, 300);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-background border-2 border-foreground shadow-none rounded">
				<div className="px-6 py-6 pb-2 bg-foreground text-white rounded">
					<DialogHeader>
						<DialogTitle className="text-xl font-black uppercase tracking-tight text-primary font-heading">
							{step === "search" && "Search Flights"}
							{step === "results" && "Select Flight"}
							{step === "success" && "Ticket Added"}
						</DialogTitle>
						<DialogDescription className="text-white/70 font-serif italic">
							{step === "search" &&
								`Find the best deals from ${fromLocation} to Kigali.`}
							{step === "results" &&
								`Available flights from ${fromLocation} to Kigali.`}
							{step === "success" &&
								"Flight secured. What would you like to do next?"}
						</DialogDescription>
					</DialogHeader>
				</div>
				<div className="h-2 w-full bg-primary overflow-hidden relative">
					<PatternZigZag className="w-[100%] h-full text-foreground/20" />
				</div>

				<div className="px-6 pb-8 min-h-[350px] flex flex-col justify-center bg-zinc-50">
					{step === "search" && (
						<div className="flex flex-col items-center justify-center space-y-8 py-8 animate-in fade-in zoom-in-95 duration-500">
							<div className="relative">
								<div
									className={cn(
										"h-24 w-24 bg-foreground rounded rotate-45 flex items-center justify-center transition-all duration-500 border-4 border-double border-primary",
										isSearching ? "scale-110 bg-foreground/90" : "",
									)}
								>
									<div className="-rotate-45">
										{isSearching ? (
											<Loader2 className="h-10 w-10 text-primary animate-spin" />
										) : (
											<Plane className="h-10 w-10 text-primary" />
										)}
									</div>
								</div>
							</div>

							<div className="text-center space-y-2 max-w-sm">
								<h3 className="font-bold text-lg text-foreground uppercase tracking-wider">
									{isSearching
										? "Finding best connections..."
										: "Start your journey"}
								</h3>
								<p className="text-sm text-muted-foreground leading-relaxed font-serif">
									{isSearching
										? "We're scanning major airlines for the best routes and prices."
										: `Search for flights from ${fromLocation} to Kigali International Airport.`}
								</p>
							</div>

							{!isSearching && (
								<Button
									onClick={handleSearch}
									size="lg"
									className="w-full max-w-[200px] rounded font-bold uppercase tracking-widest bg-foreground hover:bg-foreground/90 text-primary"
								>
									Search Flights
								</Button>
							)}
						</div>
					)}

					{step === "results" && (
						<div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
							<Card
								className="group relative overflow-hidden border-2 border-foreground rounded hover:shadow-lg transition-all cursor-pointer bg-white"
								onClick={handleSelectTicket}
								role="button"
								tabIndex={0}
								onKeyDown={(e) => e.key === "Enter" && handleSelectTicket()}
							>
								<div className="absolute top-0 right-0 p-4">
									<Badge
										variant="default"
										className="bg-primary text-foreground hover:bg-primary rounded uppercase tracking-widest font-bold border-none"
									>
										Best Value
									</Badge>
								</div>

								<CardContent className="p-6">
									<div className="flex flex-col gap-6">
										<div className="flex items-center gap-4 sm:w-48 shrink-0">
											<div className="h-12 w-12 bg-foreground text-white rounded flex items-center justify-center shrink-0 border border-primary">
												<span className="font-bold text-xs">WB</span>
											</div>
											<div>
												<h4 className="font-bold text-base uppercase tracking-tight">
													RwandAir
												</h4>
												<div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
													<span className="font-medium">Economy</span>
													<span>•</span>
													<span>Direct</span>
												</div>
											</div>
										</div>

										<div className="flex-1 flex flex-col justify-center min-w-0">
											<div className="flex items-end justify-between mb-2">
												<div className="text-left">
													<div className="text-2xl font-black leading-none font-heading">
														08:00
													</div>
													<div className="text-[10px] font-bold text-muted-foreground uppercase pt-1 tracking-wider">
														{fromLocation}
													</div>
												</div>

												<div className="flex-1 px-4 pb-1.5 flex flex-col items-center">
													<div className="text-[10px] text-muted-foreground mb-1 font-bold">
														8h 30m
													</div>
													<div className="relative w-full flex items-center">
														<Separator className="bg-foreground/20" />
														<Plane className="h-3 w-3 text-foreground absolute left-1/2 -translate-x-1/2 bg-white px-0.5" />
													</div>
												</div>

												<div className="text-right">
													<div className="text-2xl font-black leading-none font-heading">
														16:30
													</div>
													<div className="text-[10px] font-bold text-muted-foreground uppercase pt-1 tracking-wider">
														KGL
													</div>
												</div>
											</div>

											<div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
												<div className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded border border-border">
													<Luggage className="h-3 w-3" />
													<span>2 x 23kg</span>
												</div>
												<div className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded border border-border">
													<Utensils className="h-3 w-3" />
													<span>Meals</span>
												</div>
											</div>
										</div>

										<div className="sm:border-l sm:border-foreground/10 sm:pl-6 flex flex-row sm:flex-col gap-2 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-foreground/10">
											<div className="text-right sm:text-left">
												<span className="text-2xl font-black text-foreground block font-heading">
													${ticketListing.basePrice}
												</span>
												<span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
													per person
												</span>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							<p className="text-xs text-center text-muted-foreground font-serif italic">
								Final price includes all taxes and fees. No hidden charges.
							</p>
						</div>
					)}

					{step === "success" && (
						<div className="flex flex-col items-center justify-center space-y-8 py-6 animate-in zoom-in-95 duration-500">
							<div className="w-20 h-20 bg-green-50 border-2 border-green-500 rounded flex items-center justify-center rotate-45 transform">
								<div className="-rotate-45">
									<Check className="h-10 w-10 text-green-600" />
								</div>
							</div>

							<div className="text-center space-y-2">
								<h3 className="font-black text-2xl uppercase tracking-tighter">
									Flight Added!
								</h3>
								<p className="text-muted-foreground text-sm max-w-[300px] mx-auto font-serif">
									Your flight to Kigali has been added to your cart.
								</p>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
								<Button
									variant="outline"
									onClick={handleContinueShopping}
									className="h-11 border-2 border-foreground rounded uppercase tracking-wider font-bold hover:bg-foreground hover:text-white"
								>
									Browse Hotels
								</Button>
								<Button
									onClick={handleCheckout}
									className="h-11 gap-2 rounded bg-primary text-foreground hover:bg-primary/90 uppercase tracking-wider font-bold font-heading"
								>
									Go to Cart <ArrowRight className="h-4 w-4" />
								</Button>
							</div>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
