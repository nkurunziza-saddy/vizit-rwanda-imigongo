"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  listings,
  serviceTypeLabels,
  type ServiceType,
  type Listing,
} from "@/lib/data";
import {
  Search,
  Star,
  MapPin,
  SlidersHorizontal,
  X,
  Grid3X3,
  List,
  Filter,
} from "lucide-react";

function ListingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ServiceType | "all">("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState<
    "featured" | "price-low" | "price-high" | "rating"
  >("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam && typeParam in serviceTypeLabels) {
      setSelectedType(typeParam as ServiceType);
    }
  }, [searchParams]);

  useEffect(() => {
    gsap.from(".listing-card", {
      y: 40,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [selectedType, sortBy, searchQuery, priceRange]);

  const filteredListings = useMemo(() => {
    let result = [...listings];

    if (selectedType !== "all") {
      result = result.filter((listing) => listing.type === selectedType);
    }
    result = result.filter(
      (listing) =>
        listing.price >= priceRange[0] && listing.price <= priceRange[1],
    );

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query) ||
          listing.location.toLowerCase().includes(query),
      );
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedType, searchQuery, sortBy, priceRange]);

  const handleTypeChange = (value: ServiceType | "all" | null) => {
    if (value !== null) {
      setSelectedType(value);
      if (value === "all") {
        router.push("/listings");
      } else {
        router.push(`/listings?type=${value}`);
      }
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSortBy("featured");
    setPriceRange([0, 2000]);
    router.push("/listings");
  };

  const hasActiveFilters =
    selectedType !== "all" ||
    searchQuery ||
    sortBy !== "featured" ||
    priceRange[0] > 0 ||
    priceRange[1] < 2000;

  return (
    <main className="bg-background min-h-screen">
      <Navigation />

      <section className="pt-32 pb-16 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent uppercase tracking-[0.15em] text-xs font-semibold mb-4">
            Explore Rwanda
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-primary-foreground mb-6">
            Discover Experiences
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Browse our curated collection of flights, accommodations, car
            rentals, and unforgettable experiences across Rwanda.
          </p>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8 px-6 py-12 max-w-7xl mx-auto">
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block lg:w-64 flex-shrink-0 transition-all duration-300`}
        >
          <div className="sticky top-32 space-y-6">
            <div className="flex items-center justify-between lg:hidden mb-4">
              <h3 className="font-serif font-semibold text-foreground">
                Filters
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-muted rounded-sm transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border rounded-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Service Type
              </label>
              <Select value={selectedType} onValueChange={handleTypeChange}>
                <SelectTrigger className="bg-card border-border rounded-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-sm">
                  <SelectItem value="all">All Types</SelectItem>
                  {Object.entries(serviceTypeLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Price Range
              </label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([
                        parseInt(e.target.value) || 0,
                        priceRange[1],
                      ])
                    }
                    className="bg-card border-border rounded-sm text-sm"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([
                        priceRange[0],
                        parseInt(e.target.value) || 2000,
                      ])
                    }
                    className="bg-card border-border rounded-sm text-sm"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  ${priceRange[0]} - ${priceRange[1]}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Sort By
              </label>
              <Select
                value={sortBy}
                onValueChange={(v) => setSortBy(v as typeof sortBy)}
              >
                <SelectTrigger className="bg-card border-border rounded-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-sm">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full border-border rounded-sm text-foreground hover:bg-muted bg-transparent"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(true)}
                className="border-border rounded-sm"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              {filteredListings.length}{" "}
              {filteredListings.length === 1 ? "result" : "results"} found
            </p>

            <div className="flex gap-2 ml-auto">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-sm"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-sm"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {filteredListings.length > 0 ? (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-6">
                No listings found matching your criteria
              </p>
              <Button
                onClick={clearFilters}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-sm"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

function ListingCard({
  listing,
  viewMode,
}: {
  listing: Listing;
  viewMode: "grid" | "list";
}) {
  if (viewMode === "list") {
    return (
      <Link href={`/listings/${listing.id}`} className="listing-card group">
        <Card className="overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-300 rounded-sm h-full">
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-full sm:w-72 h-48 sm:h-auto flex-shrink-0">
              <Image
                src={listing.image || "/placeholder.svg"}
                alt={listing.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <Badge className="absolute top-4 left-4 bg-secondary text-primary-foreground rounded-sm text-xs">
                {serviceTypeLabels[listing.type]}
              </Badge>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2 font-medium">
                  <MapPin className="w-3 h-3" />
                  {listing.location}
                </div>
                <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors mb-2 font-semibold">
                  {listing.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {listing.shortDescription}
                </p>
                {listing.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.amenities.slice(0, 4).map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="outline"
                        className="rounded-sm text-xs border-border"
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-semibold text-foreground">
                    {listing.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({listing.reviews})
                  </span>
                </div>
                <span className="font-serif text-lg text-primary font-semibold">
                  ${listing.price}
                  <span className="text-xs text-muted-foreground font-normal">
                    {listing.duration ? `/${listing.duration}` : "/night"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/listings/${listing.id}`} className="listing-card group">
      <Card className="overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-300 rounded-sm h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={listing.image || "/placeholder.svg"}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <Badge className="absolute top-4 left-4 bg-secondary text-primary-foreground rounded-sm text-xs">
            {serviceTypeLabels[listing.type]}
          </Badge>
          {listing.featured && (
            <Badge className="absolute top-4 right-4 bg-accent text-secondary rounded-sm text-xs font-semibold">
              Featured
            </Badge>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2 font-medium">
              <MapPin className="w-3 h-3" />
              {listing.location}
            </div>
            <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors mb-2 font-semibold line-clamp-2">
              {listing.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {listing.shortDescription}
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-sm font-semibold text-foreground">
                {listing.rating}
              </span>
              <span className="text-xs text-muted-foreground">
                ({listing.reviews})
              </span>
            </div>
            <span className="font-serif text-lg text-primary font-semibold">
              ${listing.price}
              <span className="text-xs text-muted-foreground font-normal">
                {listing.duration ? `/${listing.duration}` : "/night"}
              </span>
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ListingsContent />
    </Suspense>
  );
}
