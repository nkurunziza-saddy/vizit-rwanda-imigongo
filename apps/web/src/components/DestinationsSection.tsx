import { motion } from "framer-motion";
import { DestinationCard } from "./DestinationCard";

import kivuImage from "@/assets/destination-kivu.jpg";
import kigaliImage from "@/assets/destination-kigali.jpg";
import volcanoesImage from "@/assets/destination-volcanoes.jpg";

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Popular Destinations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore Rwanda's most sought-after destinations – 
            from the vibrant capital to pristine national parks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <DestinationCard {...destination} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
