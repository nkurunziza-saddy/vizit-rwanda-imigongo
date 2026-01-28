import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useWishlist } from "@/context/wishlist-context";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layouts/page-wrapper";
import ListingCard from "@/components/listing-card";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/_app/saved")({
	component: SavedPage,
});

function SavedPage() {
	const { wishlist } = useWishlist();
	const navigate = useNavigate();

	if (wishlist.length === 0) {
		return (
			<PageWrapper>
				<div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
					<div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center">
						<Heart className="h-10 w-10 text-muted-foreground" />
					</div>
					<div className="space-y-2">
						<h2 className="text-2xl font-bold">Your wishlist is empty</h2>
						<p className="text-muted-foreground max-w-sm">
							Save places you'd like to visit to track them here.
						</p>
					</div>
					<Button
						size="lg"
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
		<div className="min-h-screen bg-background pb-20">
			<PageWrapper className="py-8">
				<h1 className="text-3xl font-bold mb-2">Saved Trips</h1>
				<p className="text-muted-foreground mb-8">
					Places you've bookmarked for your next adventure.
				</p>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{wishlist.map((listing) => (
						<ListingCard
							key={listing.id}
							id={listing.id.toString()}
							title={listing.title}
							location={`Location ${listing.location_id}`}
							price={listing.base_price}
							rating={4.8} // Mock
							reviewCount={12} // Mock
							image={
								"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
							}
							category={
								listing.listing_type.includes("hotel")
									? "hotel"
									: listing.listing_type.includes("car")
										? "car"
										: "tour"
							}
							listing={listing}
						/>
					))}
				</div>
			</PageWrapper>
		</div>
	);
}
