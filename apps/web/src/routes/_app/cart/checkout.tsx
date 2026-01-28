import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { useCreateBooking } from "@/hooks/use-bookings";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { differenceInDays, format } from "date-fns";
import { Loader2, CreditCard, Lock } from "lucide-react";
import { PageWrapper } from "@/components/layouts/page-wrapper";

export const Route = createFileRoute("/_app/cart/checkout")({
	component: CheckoutPage,
});

function CheckoutPage() {
	const { cart, totalPrice, clearCart } = useCart();
	const { user, isAuthenticated } = useAuth();
	const { mutateAsync: createBooking, isPending } = useCreateBooking();
	const navigate = useNavigate();

	const handlePlaceOrder = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!isAuthenticated || !user) {
			toast.error("Please log in to complete your booking");
			navigate({ to: "/login" });
			return;
		}

		if (cart.length === 0) {
			toast.error("Your cart is empty");
			navigate({
				to: "/listings",
				search: (prev: any) => ({ ...prev, page: 1 }),
			});
			return;
		}

		try {
			// Create Booking Payload
			// We assume single booking group for all items for now.
			const bookingPayload = {
				booking: {
					user_id: user.id,
					total_amount: totalPrice,
					currency: cart[0].listing.currency || "USD",
					status: "confirmed" as const,
				},
				items: cart.map((item) => {
					const nights = differenceInDays(
						item.dateRange.to!,
						item.dateRange.from!,
					);

					// Calculate item subtotal including addons
					const baseSubtotal = item.listing.base_price * nights;
					const addonsSubtotal = item.selectedAddons.reduce((acc, curr) => {
						const multiplier =
							curr.addon.price_type === "per_night" ? nights : 1;
						return acc + curr.addon.price * curr.quantity * multiplier;
					}, 0);

					return {
						listing_id: item.listing.id,
						start_date: item.dateRange.from!.toISOString(),
						end_date: item.dateRange.to!.toISOString(),
						quantity: 1, // Main unit (room/trip) quantity
						unit_price: item.listing.base_price,
						subtotal: baseSubtotal + addonsSubtotal,
						selected_addons: item.selectedAddons.map((sa) => ({
							addon_id: sa.addon.id,
							quantity: sa.quantity,
							subtotal:
								sa.addon.price *
								sa.quantity *
								(sa.addon.price_type === "per_night" ? nights : 1),
						})),
					};
				}),
			};

			const result = await createBooking(bookingPayload);

			toast.success("Booking confirmed successfully!");
			clearCart();
			// Use a mocked ID if result doesn't return one (depends on mock implementation)
			const orderId = result?.id ? result.id.toString() : `ORD-${Date.now()}`;
			navigate({ to: "/cart/success", search: { orderId } });
		} catch (error) {
			console.error("Booking failed", error);
			toast.error("Failed to process booking. Please try again.");
		}
	};

	if (cart.length === 0) {
		return (
			<PageWrapper>
				<div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
					<h2 className="text-2xl font-bold">Your cart is empty</h2>
					<Button
						onClick={() =>
							navigate({
								to: "/listings",
								search: (prev: any) => ({ ...prev, page: 1 }),
							})
						}
					>
						Browse Listings
					</Button>
				</div>
			</PageWrapper>
		);
	}

	return (
		<div className="min-h-screen bg-muted/30">
			<PageWrapper className="py-8">
				<h1 className="text-3xl font-bold mb-8">Checkout</h1>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					{/* Left Column: Order Review & Payment Form */}
					<div className="lg:col-span-8 space-y-8">
						{/* 1. Review Items */}
						<Card>
							<CardHeader>
								<CardTitle>Review Your Trip</CardTitle>
								<CardDescription>
									Verify your booking details before payment.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{cart.map((item) => {
									const nights = differenceInDays(
										item.dateRange.to!,
										item.dateRange.from!,
									);
									return (
										<div
											key={item.id}
											className="flex flex-col sm:flex-row gap-4 border-b last:border-0 pb-6 last:pb-0"
										>
											<div className="h-24 w-32 bg-muted rounded-md flex-shrink-0 bg-gray-200" />
											<div className="flex-1 space-y-1">
												<div className="flex justify-between">
													<h3 className="font-semibold">
														{item.listing.title}
													</h3>
													<span className="font-medium">
														${item.listing.base_price * nights}
													</span>
												</div>
												<p className="text-sm text-muted-foreground">
													{item.listing.listing_type} in Location{" "}
													{item.listing.location_id}
												</p>
												<div className="flex gap-4 text-sm mt-2">
													<div className="bg-muted px-2 py-1 rounded">
														{format(item.dateRange.from!, "MMM d")} -{" "}
														{format(item.dateRange.to!, "MMM d, yyyy")}
													</div>
													<div className="bg-muted px-2 py-1 rounded">
														{nights} Nights
													</div>
													<div className="bg-muted px-2 py-1 rounded">
														{item.guests} Guests
													</div>
												</div>
												{item.selectedAddons.length > 0 && (
													<div className="mt-2 text-sm text-muted-foreground">
														<span className="font-medium text-foreground">
															Add-ons:{" "}
														</span>
														{item.selectedAddons
															.map((a) => `${a.addon.name} (x${a.quantity})`)
															.join(", ")}
													</div>
												)}
											</div>
										</div>
									);
								})}
							</CardContent>
						</Card>

						{/* 2. Payment Details (Mock) */}
						<Card>
							<CardHeader>
								<CardTitle>Payment Details</CardTitle>
								<CardDescription>
									Enter your payment information. (Secure Mock)
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form
									id="payment-form"
									onSubmit={handlePlaceOrder}
									className="space-y-4"
								>
									<div className="grid grid-cols-2 gap-4">
										<div className="col-span-2 space-y-2">
											<Label htmlFor="cardName">Cardholder Name</Label>
											<Input id="cardName" placeholder="John Doe" required />
										</div>
										<div className="col-span-2 space-y-2">
											<Label htmlFor="cardNumber">Card Number</Label>
											<div className="relative">
												<CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
												<Input
													id="cardNumber"
													placeholder="0000 0000 0000 0000"
													className="pl-9"
													required
												/>
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="expiry">Expiry Date</Label>
											<Input id="expiry" placeholder="MM/YY" required />
										</div>
										<div className="space-y-2">
											<Label htmlFor="cvc">CVC</Label>
											<div className="relative">
												<Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
												<Input
													id="cvc"
													placeholder="123"
													className="pl-9"
													required
												/>
											</div>
										</div>
									</div>
								</form>
							</CardContent>
						</Card>
					</div>

					{/* Right Column: Order Summary */}
					<div className="lg:col-span-4 space-y-6">
						<Card className="sticky top-24">
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-muted-foreground">Items Total</span>
										<span>${totalPrice}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Service Fee</span>
										<span>$0.00</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Taxes</span>
										<span>Included</span>
									</div>
									<Separator />
									<div className="flex justify-between font-bold text-lg">
										<span>Total</span>
										<span>${totalPrice}</span>
									</div>
								</div>

								<Button
									className="w-full"
									size="lg"
									type="submit"
									form="payment-form"
									disabled={isPending}
								>
									{isPending ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Processing...
										</>
									) : (
										`Pay $${totalPrice}`
									)}
								</Button>

								<p className="text-xs text-center text-muted-foreground">
									Secure checkout powered by Vizit MockPay
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</PageWrapper>
		</div>
	);
}
