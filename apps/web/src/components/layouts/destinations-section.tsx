import { motion } from "framer-motion";
import { DestinationCard } from "../destination-card";

import kivuImage from "@/assets/destination-kivu.jpg";
import kigaliImage from "@/assets/destination-kigali.jpg";
import volcanoesImage from "@/assets/destination-kivu.jpg";

const destinations = [
  {
    name: "Kigali",
    listingsCount: 156,
    image: kigaliImage,
    href: "/listings?destination=kigali",
  },
  {
    name: "Lake Kivu",
    listingsCount: 89,
    image: kivuImage,
    href: "/listings?destination=lake-kivu",
  },
  {
    name: "Volcanoes National Park",
    listingsCount: 45,
    image: volcanoesImage,
    href: "/listings?destination=volcanoes",
  },
];

export const DestinationsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div

          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Popular Destinations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore Rwanda's most sought-after destinations – 
            from the vibrant capital to pristine national parks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={destination.name}
            >
              <DestinationCard {...destination} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
