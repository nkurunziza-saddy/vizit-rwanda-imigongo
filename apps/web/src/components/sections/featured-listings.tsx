import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import { useListings } from "@/hooks/use-listings";
import type { Listing } from "@/schemas";

/**
 * Featured Listings Section
 *
 * Clean grid of featured property listings
 */

export function FeaturedListings() {
  const { t } = useTranslation();
  const { data: listings, isLoading } = useListings();

  const featuredListings: Listing[] = listings
    ? (listings as Listing[]).slice(0, 6)
    : [];

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg" />
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">{t("featured.title")}</h2>
            <p className="text-muted-foreground">{t("featured.subtitle")}</p>
          </div>
          <Link
            to="/listings"
            search={{
              category: undefined,
              search: undefined,
              sortBy: undefined,
              priceRange: undefined,
              amenities: undefined,
              from: undefined,
              checkIn: undefined,
              checkOut: undefined,
              guests: undefined,
              page: undefined,
            }}
            className="text-sm font-medium text-primary hover:underline"
          >
            {t("featured.viewAll")}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((listing) => (
            <Link
              key={listing.id}
              to={`/listings/$id`}
              params={{ id: String(listing.id) }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={listing.imageUrl || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3">
                    {listing.listingType}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold line-clamp-1">
                        {listing.title}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        <span className="line-clamp-1">
                          {(listing as Listing & { location?: string })
                            .location || "Rwanda"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {(listing as Listing & { rating?: number }).rating ||
                          4.5}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-lg font-bold">
                      ${listing.basePrice}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {t("listing.night")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
