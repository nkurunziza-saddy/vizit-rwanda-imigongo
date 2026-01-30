import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, Filter, X, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Badge } from "@/components/ui/badge";

import ListingCard from "@/components/listing-card";
import { PageWrapper } from "@/components/layouts/page-wrapper";
import { useListings } from "@/hooks/use-listings";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/listings/")({
  component: Listings,
  validateSearch: (search: Record<string, unknown>) => ({
    category: search.category as string | undefined,
    search: search.search as string | undefined,
    sortBy: search.sortBy as string | undefined,
    priceRange: search.priceRange as number[] | undefined,
    amenities: search.amenities as string[] | undefined,
    from: search.from as string | undefined,
    checkIn: search.checkIn as string | undefined,
    checkOut: search.checkOut as string | undefined,
    guests: search.guests as number | undefined,
    page: search.page as number | undefined,
  }),
});

const categories = [
  { value: "all", label: "All", icon: Sparkles },
  { value: "hotel", label: "Hotels", icon: MapPin },
  { value: "bnb", label: "BnBs", icon: MapPin },
  { value: "car", label: "Car Rentals", icon: MapPin },
  { value: "tour", label: "Tours", icon: MapPin },
];

const priceRanges = [
  { label: "Budget", range: [0, 100] },
  { label: "Mid-range", range: [100, 300] },
  { label: "Luxury", range: [300, 1000] },
];

interface FilterContentProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setCategory: (category: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

const FilterContent = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setCategory,
  priceRange,
  setPriceRange,
  clearFilters,
  hasActiveFilters,
}: FilterContentProps) => (
  <div className="space-y-6">
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Search</h3>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-11 bg-muted/30 border-0 focus-visible:ring-1"
        />
      </div>
    </div>

    <div className="space-y-3">
      <h3 className="text-sm font-medium">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={selectedCategory === cat.value ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory(cat.value)}
            className={cn(
              "rounded-full transition-all",
              selectedCategory === cat.value
                ? "shadow-sm"
                : "hover:bg-muted/50",
            )}
          >
            {cat.label}
          </Button>
        ))}
      </div>
    </div>

    <div className="space-y-3">
      <h3 className="text-sm font-medium">Quick Filters</h3>
      <div className="grid grid-cols-3 gap-2">
        {priceRanges.map((preset) => (
          <button
            type="button"
            key={preset.label}
            onClick={() => setPriceRange(preset.range)}
            className={cn(
              "px-3 py-2 text-xs font-medium rounded-lg border transition-all",
              priceRange[0] === preset.range[0] &&
                priceRange[1] === preset.range[1]
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background hover:bg-muted border-border",
            )}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>

    <div className="space-y-3">
      <h3 className="text-sm font-medium">Price Range</h3>
      <div className="pt-2 pb-4">
        <Slider
          defaultValue={[0, 1000]}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as number[])}
          className="mb-4"
        />
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium bg-muted px-3 py-1.5 rounded-md">
            ${priceRange[0]}
          </div>
          <div className="h-px w-4 bg-border" />
          <div className="text-sm font-medium bg-muted px-3 py-1.5 rounded-md">
            ${priceRange[1]}+
          </div>
        </div>
      </div>
    </div>

    {hasActiveFilters && (
      <Button variant="outline" className="w-full gap-2" onClick={clearFilters}>
        <X className="h-4 w-4" />
        Clear All Filters
      </Button>
    )}
  </div>
);

function Listings() {
  const searchParams = useSearch({ from: "/_app/listings/" });
  const navigate = Route.useNavigate();

  const [localSearchQuery, setLocalSearchQuery] = useState(
    searchParams.search || "",
  );
  const debouncedSearchQuery = useDebounce(localSearchQuery, 500);

  useEffect(() => {
    if (debouncedSearchQuery !== (searchParams.search || "")) {
      navigate({
        search: (prev) => ({
          ...prev,
          search: debouncedSearchQuery || undefined,
          page: 1,
        }),
      });
    }
  }, [debouncedSearchQuery, searchParams.search, navigate]);

  const selectedCategory = searchParams.category || "all";
  const priceRange = searchParams.priceRange || [0, 1000];
  const currentPage = searchParams.page || 1;

  const setCategory = (category: string) => {
    navigate({
      search: (prev) => ({ ...prev, category: category, page: 1 }),
    });
  };

  const setPriceRangeParam = (range: number[]) => {
    navigate({
      search: (prev) => ({ ...prev, priceRange: range, page: 1 }),
    });
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    localSearchQuery !== "" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 1000;

  const clearFilters = () => {
    setLocalSearchQuery("");
    navigate({
      search: (prev) => ({
        ...prev,
        category: undefined,
        search: undefined,
        priceRange: undefined,
        page: 1,
      }),
    });
  };

  const { data: listings, isLoading } = useListings();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const activeSearchQuery = (searchParams.search || "").toLowerCase();

  const filteredListings =
    listings?.filter((listing) => {
      const matchesCategory =
        selectedCategory === "all" ||
        listing.listing_type.includes(
          selectedCategory === "hotel" ? "hotel" : selectedCategory,
        );

      const matchesSearch =
        listing.title.toLowerCase().includes(activeSearchQuery) ||
        "location".toLowerCase().includes(activeSearchQuery);

      const matchesPrice =
        listing.base_price >= priceRange[0] &&
        listing.base_price <= priceRange[1];

      return matchesCategory && matchesSearch && matchesPrice;
    }) || [];

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);

  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageWrapper>
        <div className="flex flex-col lg:flex-row gap-8 items-start pt-8">
          <aside className="hidden lg:block w-72 flex-none sticky top-24">
            <div className="bg-card rounded-lg p-4 border shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-medium">Filters</h2>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                )}
              </div>
              <FilterContent
                searchQuery={localSearchQuery}
                setSearchQuery={setLocalSearchQuery}
                selectedCategory={selectedCategory}
                setCategory={setCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRangeParam}
                clearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </aside>

          <main className="flex-1 w-full space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-lg font-semibold tracking-tight mb-2">
                  Explore Our Vendors
                </h1>
                <p className="text-sm text-muted-foreground">
                  {filteredListings.length}{" "}
                  {filteredListings.length === 1 ? "result" : "results"} found
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="lg:hidden flex-1 sm:flex-initial">
                  <Sheet>
                    <SheetTrigger
                      render={
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto gap-2 relative"
                        />
                      }
                    >
                      <Filter className="h-4 w-4" />
                      Filters
                      {hasActiveFilters && (
                        <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full" />
                      )}
                    </SheetTrigger>
                    <SheetContent
                      side="left"
                      className="w-full sm:w-[380px] p-0"
                    >
                      <SheetHeader className="p-6 pb-4 border-b">
                        <SheetTitle className="text-left text-xl font-bold flex items-center justify-between">
                          <span>Filters</span>
                          {hasActiveFilters && (
                            <Badge variant="secondary" className="text-xs">
                              Active
                            </Badge>
                          )}
                        </SheetTitle>
                      </SheetHeader>
                      <div className="p-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
                        <FilterContent
                          searchQuery={localSearchQuery}
                          setSearchQuery={setLocalSearchQuery}
                          selectedCategory={selectedCategory}
                          setCategory={setCategory}
                          priceRange={priceRange}
                          setPriceRange={setPriceRangeParam}
                          clearFilters={clearFilters}
                          hasActiveFilters={hasActiveFilters}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                {/* Sort */}
                <Select>
                  <SelectTrigger className="w-full sm:w-[160px]">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price_low">Price: Low</SelectItem>
                    <SelectItem value="price_high">Price: High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters Pills */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {selectedCategory !== "all" && (
                  <Badge
                    variant="secondary"
                    className="gap-1.5 pl-3 pr-2 py-1.5 cursor-pointer hover:bg-secondary/80"
                    onClick={() => setCategory("all")}
                  >
                    {
                      categories.find((c) => c.value === selectedCategory)
                        ?.label
                    }
                    <X className="h-3 w-3" />
                  </Badge>
                )}
                {localSearchQuery && (
                  <Badge
                    variant="secondary"
                    className="gap-1.5 pl-3 pr-2 py-1.5 cursor-pointer hover:bg-secondary/80"
                    onClick={() => setLocalSearchQuery("")}
                  >
                    "{localSearchQuery}"
                    <X className="h-3 w-3" />
                  </Badge>
                )}
                {(priceRange[0] !== 0 || priceRange[1] !== 1000) && (
                  <Badge
                    variant="secondary"
                    className="gap-1.5 pl-3 pr-2 py-1.5 cursor-pointer hover:bg-secondary/80"
                    onClick={() => setPriceRangeParam([0, 1000])}
                  >
                    ${priceRange[0]} - ${priceRange[1]}
                    <X className="h-3 w-3" />
                  </Badge>
                )}
              </div>
            )}

            {/* Listings Grid */}
            {paginatedListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    id={listing.id.toString()}
                    title={listing.title}
                    location={`Location ${listing.location_id}`}
                    price={listing.base_price}
                    rating={4.8}
                    reviewCount={12}
                    image={
                      listing.image_url ||
                      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                    }
                    category={
                      listing.listing_type.includes("hotel")
                        ? "hotel"
                        : listing.listing_type.includes("car")
                          ? "car"
                          : "tour"
                    }
                    listing={listing}
                  />
                ))}
              </div>
            ) : (
              <Empty className="py-16">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Search className="h-6 w-6" />
                  </EmptyMedia>
                  <EmptyTitle>No results found</EmptyTitle>
                  <EmptyDescription>
                    Try adjusting your filters or search terms
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button variant="default" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                </EmptyContent>
              </Empty>
            )}

            {/* Pagination */}
            {filteredListings.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center pt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) {
                            navigate({
                              search: (prev) => ({
                                ...prev,
                                page: Math.max(1, currentPage - 1),
                              }),
                            });
                          }
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                        aria-disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let p: number;
                      if (totalPages <= 5) {
                        p = i + 1;
                      } else if (currentPage <= 3) {
                        p = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        p = totalPages - 4 + i;
                      } else {
                        p = currentPage - 2 + i;
                      }
                      return (
                        <PaginationItem key={p}>
                          <PaginationLink
                            isActive={currentPage === p}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate({
                                search: (prev) => ({ ...prev, page: p }),
                              });
                            }}
                            className="cursor-pointer"
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    <PaginationItem>
                      <PaginationNext
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) {
                            navigate({
                              search: (prev) => ({
                                ...prev,
                                page: Math.min(totalPages, currentPage + 1),
                              }),
                            });
                          }
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                        aria-disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </main>
        </div>
      </PageWrapper>
    </div>
  );
}
