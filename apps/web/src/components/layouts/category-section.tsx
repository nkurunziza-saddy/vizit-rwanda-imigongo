import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Building2, Home, Car, Compass } from "lucide-react";

const categories = [
  {
    name: "Hotels",
    description: "Premium stays with world-class amenities",
    icon: Building2,
    href: "/listings?category=hotels",
    color: "from-primary to-safari-light",
  },
  {
    name: "BnBs",
    description: "Authentic local homestay experiences",
    icon: Home,
    href: "/listings?category=bnbs",
    color: "from-accent to-gold",
  },
  {
    name: "Car Rentals",
    description: "Safari-ready vehicles for your adventure",
    icon: Car,
    href: "/listings?category=cars",
    color: "from-terracotta to-accent",
  },
  {
    name: "Tours",
    description: "Expert-guided unforgettable experiences",
    icon: Compass,
    href: "/listings?category=tours",
    color: "from-safari-dark to-primary",
  },
];

export const CategorySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div

          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Explore by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From luxurious hotels to authentic homestays, safari vehicles to guided tours – 
            find everything you need for your perfect Rwandan adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
            >
              <Link
                to={category.href}
                className="group block p-6 rounded-2xl bg-card border border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
