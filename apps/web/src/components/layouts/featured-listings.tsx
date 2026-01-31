import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ListingCard, { type ListingCardProps } from "../listing-card";
import { SectionContainer } from "../ui/section";

// Helper to create mock listing for the card
import type { Listing } from "@/types";

const featuredListings: (ListingCardProps & { listing: Listing })[] = [
  {
    id: "1",
    title: "Luxury Safari Lodge",
    location: "Volcanoes National Park",
    price: 350,
    rating: 4.9,
    reviewCount: 128,
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&w=800&q=80",
    category: "hotel",
    listing: {
      id: 1,
      vendorId: 1,
      locationId: 2, // Musanze/Volcanoes
      title: "Luxury Safari Lodge",
      description: "Experience the ultimate safari luxury.",
      listingType: "hotel_room",
      basePrice: 350,
      currency: "USD",
      capacity: 4,
      status: "active",
      createdAt: new Date().toISOString(),
      addons: [],
    },
  },
  {
    id: "2",
    title: "Cozy Mountain BnB",
    location: "Musanze",
    price: 85,
    rating: 4.7,
    reviewCount: 64,
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
    category: "bnb",
    listing: {
      id: 2,
      vendorId: 2,
      locationId: 2,
      title: "Cozy Mountain BnB",
      description: "A cozy retreat in the mountains.",
      listingType: "bnb",
      basePrice: 85,
      currency: "USD",
      capacity: 2,
      status: "active",
      createdAt: new Date().toISOString(),
      addons: [],
    },
  },
  {
    id: "3",
    title: "Toyota Land Cruiser",
    location: "Kigali",
    price: 120,
    rating: 4.8,
    reviewCount: 92,
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    category: "car",
    listing: {
      id: 3,
      vendorId: 3,
      locationId: 1,
      title: "Toyota Land Cruiser",
      description: "Robust 4x4 for your adventures.",
      listingType: "car",
      basePrice: 120,
      currency: "USD",
      capacity: 5,
      status: "active",
      createdAt: new Date().toISOString(),
      addons: [],
    },
  },
  {
    id: "4",
    title: "Gorilla Trekking",
    location: "Volcanoes National Park",
    price: 1500,
    rating: 5.0,
    reviewCount: 256,
    image:
      "https://images.unsplash.com/photo-1543326166-51f67f0f6224?auto=format&fit=crop&w=800&q=80",
    category: "tour",
    listing: {
      id: 4,
      vendorId: 4,
      locationId: 2,
      title: "Gorilla Trekking",
      description: "Once in a lifetime experience.",
      listingType: "tour",
      basePrice: 1500,
      currency: "USD",
      capacity: 10,
      status: "active",
      createdAt: new Date().toISOString(),
      addons: [],
    },
  },
];

export const FeaturedListings = () => {
  const action = (
    <Link to="/listings">
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-foreground"
      >
        View All <ArrowRight />
      </Button>
    </Link>
  );

  return (
    <SectionContainer
      title="Featured Experiences"
      description="Handpicked selections from our verified partners."
      align="start"
      action={action}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredListings.map((listing) => (
          <ListingCard key={listing.id} {...listing} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default FeaturedListings;
