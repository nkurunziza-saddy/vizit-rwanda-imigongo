import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useWishlist } from "@/context/wishlist-context";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

import { SectionTitle } from "@/components/landing/section-title";
import ListingCard from "@/components/listing-card";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty";
import { Heart, Compass } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export const Route = createFileRoute("/_app/saved")({
  component: SavedPage,
});

function SavedPage() {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-background">
        <Reveal>
          <div className="max-w-md w-full border border-dashed border-border/60 rounded-xl bg-muted/5 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              Start exploring our curated destinations and save your favorite
              stays and experiences here.
            </p>
            <Button
              size="lg"
              className="h-12 px-8 rounded-full uppercase tracking-widest font-bold text-xs shadow-md w-full sm:w-auto"
              onClick={() =>
                navigate({
                  to: "/listings",
                  search: (prev: any) => ({ ...prev, page: 1 }),
                })
              }
            >
              Explore Collection
            </Button>
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest bg-primary/10 w-fit px-3 py-1 rounded-full border border-primary/20">
              <Heart className="w-3 h-3" />
              <span>Curated by You</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
              Saved Journeys
            </h1>
            <p className="text-muted-foreground max-w-lg font-serif italic text-lg">
              Your personal collection of unforgettable experiences.
            </p>
          </div>

          <Link to="/listings">
            <Button
              variant="outline"
              className="gap-2 rounded-full uppercase tracking-widest font-bold text-xs h-10 px-6"
            >
              <Compass className="h-3.5 w-3.5" /> Continue Exploring
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((listing) => (
            <Reveal key={listing.id}>
              <ListingCard
                id={listing.id.toString()}
                title={listing.title}
                location={`Location ${listing.locationId}`} 
                price={listing.basePrice}
                rating={4.9} 
                reviewCount={24} 
                image={
                  listing.imageUrl ||
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                }
                category={
                  (listing.listingType || "stay").includes("hotel")
                    ? "hotel"
                    : (listing.listingType || "stay").includes("car")
                      ? "car"
                      : "tour"
                }
                listing={listing}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
