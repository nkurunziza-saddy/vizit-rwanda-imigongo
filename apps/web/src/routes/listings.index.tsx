import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useState } from "react";
import { Search, StarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import ListingCard from '@/components/listing-card';
import { PageWrapper } from '@/components/layouts/page-wrapper';
import { useListings } from '@/hooks/use-listings';

export const Route = createFileRoute('/listings/')({
  component: Listings,
  validateSearch: (search: Record<string, unknown>) => ({
    category: search.category as string | undefined,
    search: search.search as string | undefined,
    sortBy: search.sortBy as string | undefined,
    priceRange: search.priceRange as number[] | undefined,
    amenities: search.amenities as string[] | undefined,
    
    // Booking Widget Params
    from: search.from as string | undefined,
    checkIn: search.checkIn as string | undefined,
    checkOut: search.checkOut as string | undefined,
    guests: search.guests as number | undefined,
  }),
})

const categories = [
  { value: "all", label: "All Categories" },
  { value: "hotel", label: "Hotels" },
  { value: "bnb", label: "BnBs" },
  { value: "car", label: "Car Rentals" },
  { value: "tour", label: "Tours" },
];

function Listings(){
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearch({ from: '/listings/' });
  const categoryParam = searchParams.category;
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");

  const { data: listings, isLoading } = useListings();

  if (isLoading) {
    return (
      <div className="min-h-screen">
     
         <PageWrapper>
            <div>Loading listings...</div>
         </PageWrapper>
      
      </div>
    )
  }

  // Filter listings
  const filteredListings = listings?.filter((listing) => {
    // Basic filtering simulation
    const matchesCategory =
      selectedCategory === "all" || listing.listing_type.includes(selectedCategory === 'hotel' ? 'hotel' : selectedCategory);
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      "location".toLowerCase().includes(searchQuery.toLowerCase()); // Location is ID, simulating search
    return matchesCategory && matchesSearch;
  }) || [];

  // Pagination Logic
  const ITEMS_PER_PAGE = 9;
  
  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);
  
  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
  }

  return (
    <div className="min-h-screen bg-background">
      <PageWrapper>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
       
            <aside className="w-full lg:w-64 flex-none space-y-8 sticky top-24">
               <div>
                  <h3 className="font-semibold mb-4">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-9"
                    />
                  </div>
               </div>

               <div>
                  <h3 className="font-semibold mb-4">Categories</h3>
                  <div className="space-y-2">
                     {categories.map((cat) => (
                        <button
                        type='button'
                           key={cat.value}
                           onClick={() => setSelectedCategory(cat.value)}
                           className={`block text-sm w-full text-left px-2 py-1.5 rounded-md transition-colors ${selectedCategory === cat.value ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"}`}
                        >
                           {cat.label}
                        </button>
                     ))}
                  </div>
               </div>

               <div>
                 <h3 className="font-semibold mb-4">Price Range</h3>
                  {/* Placeholder for slider */}
                  <div className="px-2">
                     <div className="h-1 bg-secondary rounded-full w-full mb-4 relative">
                        <div className="absolute left-0 top-0 h-full w-1/2 bg-primary rounded-full"></div>
                     </div>
                     <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$10</span>
                        <span>$500+</span>
                     </div>
                  </div>
               </div>

               <div>
                 <h3 className="font-semibold mb-4">Rating</h3>
                 <div className="space-y-2">
                    {[5, 4, 3].map((star) => (
                      <div key={star} className="flex items-center gap-2 text-sm text-muted-foreground">
                         <input type="checkbox" className="rounded border-gray-300" />
                         <span className="flex items-center gap-1">
                           {[...Array(star)].map((_, i) => <span key={i} className="text-yellow-400">
                            <StarIcon className='size-4'/>
                           </span>)}
                           <span className="text-xs">& Up</span>
                         </span>
                      </div>
                    ))}
                 </div>
               </div>
               
               <Button variant="outline" className="w-full text-xs h-8" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
                   Clear Filters
               </Button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full pt-6">
              <div className="mb-6 flex justify-between items-end">
                 <div>
                    <h1 className="text-2xl font-bold tracking-tight mb-1">Explore Listings</h1>
                    <p className="text-muted-foreground text-sm">Showing {paginatedListings.length} of {filteredListings.length} results</p>
                 </div>
                 {/* Sort Option (minimal) */}
                 <Select>
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                       <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                       <SelectItem value="popular">Most Popular</SelectItem>
                       <SelectItem value="newest">Newest</SelectItem>
                       <SelectItem value="price_low">Price: Low to High</SelectItem>
                    </SelectContent>
                 </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    id={listing.id.toString()}
                    title={listing.title}
                    location={`Location ${listing.location_id}`}
                    price={listing.base_price}
                    rating={4.8} // Mock
                    reviewCount={12} // Mock
                    image={"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"}
                    category={listing.listing_type.includes('hotel') ? 'hotel' : 'bnb'}
                  />
                ))}
            </div>
            {filteredListings.length === 0 && (
               <div className="py-12 text-center text-muted-foreground bg-muted/10 rounded-lg border border-dashed">
                  <p>No listings found matching your criteria.</p>
                  <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>Clear filters</Button>
               </div>
            )}
            
            {/* Pagination */}
            {filteredListings.length > ITEMS_PER_PAGE && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Simple logic to show first 5 pages or sliding window could be added
                      let p = i + 1;
                      if (totalPages > 5 && currentPage > 3) {
                          // Center around current page if possible, but keep simple for now or implement full logic
                          // Let's stick to simple list for MVP or generic simple "Page X of Y"
                      }
                      return (
                        <Button
                          key={p}
                          variant={currentPage === p ? "default" : "ghost"}
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => setCurrentPage(p)}
                        >
                          {p}
                        </Button>
                      )
                  })}
                   {totalPages > 5 && <span className="text-muted-foreground px-1">...</span>}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
            </main>
          </div>
      </PageWrapper>
 
    </div>
  );
};
