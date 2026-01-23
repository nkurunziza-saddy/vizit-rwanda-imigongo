import { motion } from "framer-motion";
import { ListingCard, ListingCardProps } from "./ListingCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import hotelImage from "@/assets/hotel-listing.jpg";
import bnbImage from "@/assets/bnb-listing.jpg";
import carImage from "@/assets/car-listing.jpg";
import tourImage from "@/assets/tour-gorilla.jpg";

const featuredListings: ListingCardProps[] = [
  {
    id: "1",
    title: "Luxury Safari Lodge with Panoramic Views",
    location: "Volcanoes National Park",
    price: 350,
    rating: 4.9,
    reviewCount: 128,
    image: hotelImage,
    category: "hotel",
    perUnit: "night",
  },
  {
    id: "2",
    title: "Cozy Mountain Retreat BnB",
    location: "Musanze",
    price: 85,
    rating: 4.7,
    reviewCount: 64,
    image: bnbImage,
    category: "bnb",
    perUnit: "night",
  },
  {
    id: "3",
    title: "Toyota Land Cruiser 4x4 Safari Edition",
    location: "Kigali",
    price: 120,
    rating: 4.8,
    reviewCount: 92,
    image: carImage,
    category: "car",
    perUnit: "day",
  },
  {
    id: "4",
    title: "Gorilla Trekking Experience with Expert Guide",
    location: "Volcanoes National Park",
    price: 1500,
    rating: 5.0,
    reviewCount: 256,
    image: tourImage,
    category: "tour",
    perUnit: "person",
  },
];

export const FeaturedListings = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Featured Experiences
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Handpicked selections from our verified partners – 
              the best Rwanda has to offer.
            </p>
          </div>
          <Link to="/listings" className="mt-4 md:mt-0">
            <Button variant="outline" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ListingCard {...listing} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
