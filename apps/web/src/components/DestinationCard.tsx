import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface DestinationCardProps {
  name: string;
  listingsCount: number;
  image: string;
  href: string;
}

export const DestinationCard = ({ name, listingsCount, image, href }: DestinationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
    >
      <Link to={href} className="destination-card block h-80 relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h3 className="text-2xl font-display font-bold text-primary-foreground mb-1">
            {name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-primary-foreground/80 text-sm">
              {listingsCount} listings available
            </span>
            <motion.div
              whileHover={{ x: 5 }}
              className="w-10 h-10 rounded-full bg-accent flex items-center justify-center"
            >
              <ArrowRight className="h-5 w-5 text-accent-foreground" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DestinationCard;
