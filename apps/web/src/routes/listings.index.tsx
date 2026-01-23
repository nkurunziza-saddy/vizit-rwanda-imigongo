import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

import hotelImage from "@/assets/hotel-listing.jpg";
import bnbImage from "@/assets/bnb-listing.jpg";
import carImage from "@/assets/car-listing.jpg";
import tourImage from "@/assets/tour-gorilla.jpg";
import Navbar from '@/components/navbar';
import ListingCard, { ListingCardProps } from '@/components/listing-card';
import Footer from '@/components/footer';

export const Route = createFileRoute('/listings/')({
  component: Listings,
  validateSearch: (search: Record<string, unknown>) => ({
    category: search.category as string | undefined,
    search: search.search as string | undefined,
    sortBy: search.sortBy as string | undefined,
    priceRange: search.priceRange as number[] | undefined,
    amenities: search.amenities as string[] | undefined,
  }),
})

// Mock data - would come from API
const allListings: ListingCardProps[] = [
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
  {
    id: "5",
    title: "Lakeside Resort & Spa",
    location: "Lake Kivu",
    price: 280,
    rating: 4.8,
    reviewCount: 89,
    image: hotelImage,
    category: "hotel",
    perUnit: "night",
  },
  {
    id: "6",
    title: "Traditional Rwandan Guesthouse",
    location: "Kigali",
    price: 65,
    rating: 4.6,
    reviewCount: 42,
    image: bnbImage,
    category: "bnb",
    perUnit: "night",
  },
  {
    id: "7",
    title: "Suzuki Jimny Adventure Vehicle",
    location: "Kigali",
    price: 80,
    rating: 4.5,
    reviewCount: 56,
    image: carImage,
    category: "car",
    perUnit: "day",
  },
  {
    id: "8",
    title: "Nyungwe Forest Canopy Walk Tour",
    location: "Nyungwe Forest",
    price: 200,
    rating: 4.9,
    reviewCount: 178,
    image: tourImage,
    category: "tour",
    perUnit: "person",
  },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "hotel", label: "Hotels" },
  { value: "bnb", label: "BnBs" },
  { value: "car", label: "Car Rentals" },
  { value: "tour", label: "Tours" },
];

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const amenities = [
  "Free WiFi",
  "Breakfast Included",
  "Pool",
  "Spa",
  "Airport Transfer",
  "Safari Guide",
  "4x4 Vehicle",
  "Parking",
];

function Listings(){
  const searchParams = useSearch({ from: '/listings/' });
  const categoryParam = searchParams.category;
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [sortBy, setSortBy] = useState("recommended");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Filter listings
  const filteredListings = allListings.filter((listing) => {
    const matchesCategory =
      selectedCategory === "all" || listing.category === selectedCategory;
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      listing.price >= priceRange[0] && listing.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("recommended");
    setPriceRange([0, 2000]);
    setSelectedAmenities([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div
   
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Explore Listings
            </h1>
            <p className="text-muted-foreground">
              Discover {sortedListings.length} verified listings across Rwanda
            </p>
          </div>

          {/* Filters Bar */}
          <div
  
            className="flex flex-col lg:flex-row gap-4 mb-8"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={(val) => val && setSelectedCategory(val)}>
              <SelectTrigger className="w-full lg:w-48 h-11">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(val) => val && setSortBy(val)}>
              <SelectTrigger className="w-full lg:w-48 h-11">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Advanced Filters */}
            <Sheet>
              <SheetTrigger render={<Button variant="outline" className="h-11 gap-2"/>}>
                
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
         
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Filter Results</SheetTitle>
                  <SheetDescription>
                    Refine your search with advanced filters
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-4 block">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={(val) => setPriceRange(val as number[])}
                      min={0}
                      max={2000}
                      step={50}
                      className="mt-2"
                    />
                  </div>

                  {/* Amenities */}
                  <div>
                    <label className="text-sm font-medium mb-4 block">
                      Amenities
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {amenities.map((amenity) => (
                        <label
                          key={amenity}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Checkbox
                            checked={selectedAmenities.includes(amenity)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedAmenities([...selectedAmenities, amenity]);
                              } else {
                                setSelectedAmenities(
                                  selectedAmenities.filter((a) => a !== amenity)
                                );
                              }
                            }}
                          />
                          <span className="text-sm">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== "all" || searchQuery || priceRange[0] > 0 || priceRange[1] < 2000) && (
            <div

              className="flex flex-wrap gap-2 mb-6"
            >
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  {categories.find((c) => c.value === selectedCategory)?.label}
                  <button onClick={() => setSelectedCategory("all")}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery("")}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  ${priceRange[0]} - ${priceRange[1]}
                  <button onClick={() => setPriceRange([0, 2000])}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Results Grid */}
          {sortedListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedListings.map((listing, index) => (
                <div
                  key={listing.id}
   
                >
                  <ListingCard {...listing} />
                </div>
              ))}
            </div>
          ) : (
            <div
      
              className="text-center py-16"
            >
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No listings found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
