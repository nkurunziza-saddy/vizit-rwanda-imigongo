import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import {
	ArrowRight,
	CalendarDays,
	CreditCard,
	ShieldCheck,
	ShoppingBag,
	Trash2,
	Users2,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Separator } from "@/components/ui/separator";
import { useCart, type CartItem } from "@/context/cart-context";

export const Route = createFileRoute("/_app/cart/")({
	component: CartPage,
});

function CartPage() {
	const { cart, removeFromCart } = useCart();
	const isAuthenticated = true;
	const navigate = useNavigate();

	const subtotal = cart.reduce((total: number, item: CartItem) => {
		let itemTotal = item.listing.basePrice * item.guests;
		if (item.listing.listingType !== "experience") {
			const startDate = item.dateRange.from;
			const endDate = item.dateRange.to;
            const days = startDate && endDate 
                ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) 
                : 0;
			
            // Ensure at least 1 day if it's nightly
			const nights = days > 0 ? days : 1;
            
			itemTotal = item.listing.basePrice * nights; // Matches CartContext logic more closely (unit price * nights)
		}

		if (item.selectedAddons) {
			const addonsTotal = item.selectedAddons.reduce(
				(sum: number, itemAddon) => sum + itemAddon.addon.price * itemAddon.quantity,
				0,
			);
			itemTotal += addonsTotal;
		}

		return total + itemTotal;
	}, 0);

	const tax = subtotal * 0.18;
	const total = subtotal + tax;

	const handleCheckout = () => {
		if (!isAuthenticated) {
			toast.error("Please login to complete your booking");
			navigate({ to: "/login" });
			return;
		}
		navigate({ to: "/cart/checkout" });
	};

	if (cart.length === 0) {
		return (
			<div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-background">
				<Reveal>
					<div className="max-w-md w-full border border-dashed border-border/60 rounded-xl bg-muted/5 p-12 text-center">
						<div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
							<ShoppingBag className="h-8 w-8 text-muted-foreground" />
						</div>
						<h2 className="text-xl font-black uppercase tracking-tight mb-2">
							Your cart is empty
						</h2>
						<p className="text-muted-foreground mb-8 text-sm leading-relaxed">
							Looks like you haven't added any experiences yet. Browse our
							collection to find your next adventure.
						</p>
						<Link to="/listings">
							<Button
								size="lg"
								className="h-12 px-8 rounded-full uppercase tracking-widest font-bold text-xs shadow-md w-full sm:w-auto"
							>
								Browse Experiences
							</Button>
						</Link>
					</div>
				</Reveal>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background pb-32">
			<div className="container mx-auto px-4 py-8 max-w-7xl">
				<div className="mb-12">
					<div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest bg-primary/10 w-fit px-3 py-1 rounded-full border border-primary/20 mb-4">
						<ShoppingBag className="w-3 h-3" />
						<span>Checkout</span>
					</div>
					<h1 className="text-4xl font-black uppercase tracking-tighter text-foreground mb-2">
						Review Your Trip
					</h1>
					<p className="text-muted-foreground max-w-lg font-serif italic text-lg">
						Finalize the details of your upcoming journey.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
					<div className="lg:col-span-8 space-y-8">
						{cart.map((item: CartItem, index: number) => (
							<Reveal key={item.id} delay={index * 0.1}>
								<div className="group relative flex flex-col sm:flex-row border border-border/60 rounded-xl overflow-hidden bg-card hover:bg-muted/5 hover:border-border transition-all duration-300 shadow-sm hover:shadow-md">
									<div className="relative w-full sm:w-64 h-48 sm:h-auto bg-muted shrink-0 overflow-hidden">
										<img
											src={item.listing.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"}
											alt={item.listing.title}
											className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
										/>
										<div className="absolute top-3 left-3">
											<Badge className="bg-background/90 backdrop-blur-md text-foreground border-none rounded-sm uppercase tracking-wider text-[10px] font-bold px-2 py-1">
												{item.listing.listingType}
											</Badge>
										</div>
									</div>

									<div className="flex-1 p-6 flex flex-col justify-between">
										<div>
											<div className="flex justify-between items-start mb-2">
												<Link
													to={`/listings/${item.listing.id}`}
													className="hover:text-primary transition-colors"
												>
													<h3 className="font-bold text-lg leading-tight">
														{item.listing.title}
													</h3>
												</Link>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => removeFromCart(item.id)}
													className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mr-2 -mt-2"
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>

											<div className="flex flex-wrap gap-4 text-sm mt-4">
												{item.dateRange.from && (
													<div className="flex items-center gap-2 bg-muted/40 px-3 py-1.5 rounded-md border border-border/50">
														<CalendarDays className="h-4 w-4 text-muted-foreground" />
														<span className="font-medium text-xs uppercase tracking-wide">
															{format(item.dateRange.from, "MMM d")} -{" "}
															{item.dateRange.to ? format(item.dateRange.to, "MMM d, yyyy") : ""}
														</span>
													</div>
												)}
												<div className="flex items-center gap-2 bg-muted/40 px-3 py-1.5 rounded-md border border-border/50">
													<Users2 className="h-4 w-4 text-muted-foreground" />
													<span className="font-medium text-xs uppercase tracking-wide">
														{item.guests} Guest{item.guests > 1 ? "s" : ""}
													</span>
												</div>
											</div>

											{item.selectedAddons &&
												item.selectedAddons.length > 0 && (
													<div className="mt-4 flex flex-wrap gap-2">
														{item.selectedAddons.map((itemAddon) => (
															<Badge
																key={itemAddon.addon.id}
																variant="outline"
																className="text-[10px] text-muted-foreground border-dashed"
															>
																+ {itemAddon.addon.name}
															</Badge>
														))}
													</div>
												)}
										</div>

										<div className="mt-6 flex justify-between items-end border-t border-dashed border-border pt-4">
											<div className="text-xs text-muted-foreground">
												Base price:{" "}
												<span className="font-mono">{item.listing.basePrice} RWF</span> /
												unit
											</div>
											<div className="text-lg font-black text-primary">
												{item.listing.basePrice * (item.listing.listingType === "experience" ? item.guests : 1)} RWF
											</div>
										</div>
									</div>
								</div>
							</Reveal>
						))}
					</div>

					<div className="lg:col-span-4">
						<div className="sticky top-24">
							<Card className="border border-border/50 shadow-md bg-card/50 backdrop-blur-sm overflow-hidden">
								<div className="bg-muted/30 p-4 border-b border-border/40">
									<h3 className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
										<CreditCard className="w-4 h-4 text-primary" />
										Order Summary
									</h3>
								</div>
								<CardContent className="p-6 space-y-4">
									<div className="space-y-2 text-sm">
										<div className="flex justify-between">
											<span className="text-muted-foreground">Subtotal</span>
											<span className="font-medium font-mono">
												{subtotal.toLocaleString()} RWF
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												Taxes & Fees (18%)
											</span>
											<span className="font-medium font-mono">
												{tax.toLocaleString()} RWF
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												Total Discounts
											</span>
											<span className="font-medium font-mono text-green-600">
												-0 RWF
											</span>
										</div>
									</div>

									<Separator className="bg-border/60" />

									<div className="flex justify-between items-end">
										<span className="font-bold uppercase text-xs tracking-widest">
											Grand Total
										</span>
										<span className="font-black text-2xl text-primary font-mono">
											{total.toLocaleString()}{" "}
											<span className="text-sm font-bold text-muted-foreground align-top mt-1 inline-block">
												RWF
											</span>
										</span>
									</div>

									<Button
										className="w-full h-12 rounded-lg uppercase tracking-widest font-bold text-xs shadow-lg mt-4 group"
										size="lg"
										onClick={handleCheckout}
									>
										Proceed to Checkout
										<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
									</Button>

									<div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest mt-4">
										<ShieldCheck className="w-3 h-3" /> Secure Payment
									</div>
								</CardContent>
								<div className="bg-muted/30 p-4 border-t border-border/40 text-center">
									<p className="text-xs text-muted-foreground">
										By proceeding, you agree to our{" "}
										<Link
											to="/terms"
											className="underline underline-offset-2 hover:text-primary"
										>
											Terms of Service
										</Link>
										.
									</p>
								</div>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
