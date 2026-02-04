import { useNavigate } from "@tanstack/react-router";
import { differenceInDays, format } from "date-fns";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/cart-context";

export function CartSheet() {
	const { cart, openCart, setOpenCart, totalPrice, removeFromCart } = useCart();
	const navigate = useNavigate();

	const handleCheckout = () => {
		setOpenCart(false);
		navigate({ to: "/cart/checkout" });
	};

	return (
		<Sheet open={openCart} onOpenChange={setOpenCart}>
			<SheetContent className="flex flex-col w-full sm:max-w-lg p-0 gap-0">
				<SheetHeader className="px-6 pt-6 pb-4 border-b flex-shrink-0">
					<SheetTitle className="text-xl">Your Trip</SheetTitle>
					<SheetDescription className="text-sm">
						{cart.length > 0
							? `${cart.length} item${cart.length === 1 ? "" : "s"} in your cart`
							: "Your cart is empty"}
					</SheetDescription>
				</SheetHeader>

				{cart.length === 0 ? (
					<Empty className="flex-1">
						<EmptyHeader>
							<EmptyTitle>Your cart is empty</EmptyTitle>
							<EmptyDescription>
								Start exploring to add your next adventure!
							</EmptyDescription>
						</EmptyHeader>
						<EmptyContent>
							<Button variant="outline" onClick={() => setOpenCart(false)}>
								Browse Listings
							</Button>
						</EmptyContent>
					</Empty>
				) : (
					<>
						<div className="flex-1 overflow-hidden">
							<ScrollArea className="h-full px-6">
								<div className="space-y-6 py-4">
									{cart.map((item) => {
										const nights =
											item.dateRange.from && item.dateRange.to
												? differenceInDays(
														item.dateRange.to,
														item.dateRange.from,
													)
												: 0;

										const itemTotal = (() => {
											if (nights < 1) return 0;
											const base = item.listing.basePrice * nights;
											const addons = item.selectedAddons.reduce((acc, curr) => {
												const multiplier =
													curr.addon.price_type === "per_night" ? nights : 1;
												return (
													acc + curr.addon.price * curr.quantity * multiplier
												);
											}, 0);
											return base + addons;
										})();

										return (
											<div
												key={item.id}
												className="space-y-3 pb-6 border-b last:border-0"
											>
												<div className="flex gap-3">
													<div className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg bg-muted overflow-hidden flex-shrink-0">
														<div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
													</div>

													<div className="flex-1 min-w-0">
														<div className="flex items-start justify-between gap-2 mb-1">
															<h4 className="font-semibold text-sm sm:text-base line-clamp-2 leading-tight">
																{item.listing.title}
															</h4>
															<Button
																variant="ghost"
																size="icon"
																className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-destructive"
																onClick={() => removeFromCart(item.id)}
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>

														<p className="text-xs text-muted-foreground">
															{item.listing.listingType} • Location{" "}
															{item.listing.locationId}
														</p>

														<div className="text-xs text-muted-foreground mt-1.5 flex flex-wrap items-center gap-1">
															<span className="whitespace-nowrap">
																{item.dateRange.from &&
																	format(item.dateRange.from, "MMM d")}{" "}
																-{" "}
																{item.dateRange.to &&
																	format(item.dateRange.to, "MMM d, yyyy")}
															</span>
															<span>•</span>
															<span className="whitespace-nowrap">
																{nights} night{nights !== 1 ? "s" : ""}
															</span>
														</div>
													</div>
												</div>

												<div className="bg-muted/40 rounded-lg p-3 space-y-2 text-xs sm:text-sm">
													<div className="flex justify-between items-center">
														<span className="text-muted-foreground">
															Base ({nights} night{nights !== 1 ? "s" : ""})
														</span>
														<span className="font-medium">
															${(item.listing.basePrice * nights).toFixed(2)}
														</span>
													</div>

													{item.selectedAddons.map((addonItem) => {
														const addonTotal =
															addonItem.addon.price *
															addonItem.quantity *
															(addonItem.addon.price_type === "per_night"
																? nights
																: 1);

														return (
															<div
																key={addonItem.addon.id}
																className="flex justify-between items-center"
															>
																<span className="text-muted-foreground truncate pr-2">
																	{addonItem.addon.name} ×{addonItem.quantity}
																</span>
																<span className="font-medium flex-shrink-0">
																	${addonTotal.toFixed(2)}
																</span>
															</div>
														);
													})}

													{item.selectedAddons.length > 0 && (
														<Separator className="my-2" />
													)}

													<div className="flex justify-between items-center font-semibold">
														<span>Subtotal</span>
														<span>${itemTotal.toFixed(2)}</span>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</ScrollArea>
						</div>

						<SheetFooter className="px-6 py-4 border-t flex-shrink-0">
							<div className="w-full space-y-4">
								<div className="flex justify-between items-center">
									<span className="text-base sm:text-lg font-semibold">
										Total
									</span>
									<span className="text-lg sm:text-xl font-bold">
										${totalPrice.toFixed(2)}
									</span>
								</div>

								<div className="space-y-2">
									<Button className="w-full" size="lg" onClick={handleCheckout}>
										Proceed to Checkout
									</Button>
									<Button
										variant="outline"
										className="w-full"
										size="lg"
										onClick={() => {
											setOpenCart(false);
											navigate({ to: "/cart" });
										}}
									>
										View & Edit Cart
									</Button>
								</div>
							</div>
						</SheetFooter>
					</>
				)}
			</SheetContent>
		</Sheet>
	);
}
