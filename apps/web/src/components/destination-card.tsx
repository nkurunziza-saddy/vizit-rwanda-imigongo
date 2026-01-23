
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

interface DestinationCardProps {
  name: string;
  listingsCount: number;
  image: string;
  href: string;
}

export const DestinationCard = ({ name, listingsCount, image, href }: DestinationCardProps) => {
  return (
    <div
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
            <div
 
              className="w-10 h-10 rounded-full bg-accent flex items-center justify-center"
            >
              <ArrowRight className="h-5 w-5 text-accent-foreground" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DestinationCard;
