import { Link } from "@tanstack/react-router";
import { Building2, Car, Compass, Home } from "lucide-react";
import { SectionContainer } from "../ui/section";

const categories = [
  {
    name: "Hotels",
    description: "Premium stays",
    icon: Building2,
    href: "/listings",
    search: {
      category: "hotel_room" as const,
      search: undefined,
      sortBy: undefined,
      priceRange: undefined,
      amenities: undefined,
      from: undefined,
      checkIn: undefined,
      checkOut: undefined,
      guests: undefined,
      page: undefined,
    },
  },
  {
    name: "BnBs",
    description: "Local homestays",
    icon: Home,
    href: "/listings",
    search: {
      category: "bnb" as const,
      search: undefined,
      sortBy: undefined,
      priceRange: undefined,
      amenities: undefined,
      from: undefined,
      checkIn: undefined,
      checkOut: undefined,
      guests: undefined,
      page: undefined,
    },
  },
  {
    name: "Transport",
    description: "Safari vehicles",
    icon: Car,
    href: "/listings",
    search: {
      category: "car" as const,
      search: undefined,
      sortBy: undefined,
      priceRange: undefined,
      amenities: undefined,
      from: undefined,
      checkIn: undefined,
      checkOut: undefined,
      guests: undefined,
      page: undefined,
    },
  },
  {
    name: "Tours",
    description: "Guided experiences",
    icon: Compass,
    href: "/listings",
    search: {
      category: "tour" as const,
      search: undefined,
      sortBy: undefined,
      priceRange: undefined,
      amenities: undefined,
      from: undefined,
      checkIn: undefined,
      checkOut: undefined,
      guests: undefined,
      page: undefined,
    },
  },
];

export const CategorySection = () => {
  return (
    <SectionContainer
      title="Categories"
      description="Browse listings by your preferred travel style."
      align="start"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.href}
            search={category.search}
            className="group block focus:outline-none"
          >
            <div className="flex flex-col items-start p-4 hover:bg-muted/30 rounded-lg transition-colors border border-transparent hover:border-border/50">
              <div className="mb-3 text-foreground group-hover:text-primary transition-colors">
                <category.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-medium text-sm">{category.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {category.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </SectionContainer>
  );
};

export default CategorySection;
