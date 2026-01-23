import { motion } from "framer-motion";
import { Star, Heart, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

export interface ListingCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  currency?: string;
  rating: number;
  reviewCount: number;
  image: string;
  category: "hotel" | "bnb" | "car" | "tour";
  isFavorite?: boolean;
  perUnit?: string;
}

const categoryLabels = {
  hotel: "Hotel",
  bnb: "BnB",
  car: "Car Rental",
  tour: "Tour",
};

const categoryColors = {
  hotel: "bg-primary/10 text-primary",
  bnb: "bg-accent/10 text-accent",
  car: "bg-gold/20 text-gold-foreground",
  tour: "bg-safari-light/10 text-safari-dark",
};

export const ListingCard = ({
  id,
  title,
  location,
  price,
  currency = "$",
  rating,
  reviewCount,
  image,
  category,
  isFavorite = false,
  perUnit = "night",
}: ListingCardProps) => {
  return (
    <div
      className="listing-card group"
    >
      <Link to="/listings/$id" params={{ id }} >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              // Handle favorite toggle
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isFavorite ? "fill-destructive text-destructive" : "text-foreground"
              }`}
            />
          </button>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[category]}`}>
              {categoryLabels[category]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Location & Rating */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {location}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-accent">{currency}{price}</span>
            <span className="text-sm text-muted-foreground">/ {perUnit}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
