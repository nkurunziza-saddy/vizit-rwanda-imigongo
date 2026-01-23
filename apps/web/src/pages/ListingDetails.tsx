import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Heart,
  Share2,
  Check,
  Users,
  Calendar,
  ArrowLeft,
  Shield,
  Award,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

import hotelImage from "@/assets/hotel-listing.jpg";

// Mock listing data - would come from API
const listing = {
  id: "1",
  title: "Luxury Safari Lodge with Panoramic Views",
  location: "Volcanoes National Park, Rwanda",
  price: 350,
  currency: "$",
  rating: 4.9,
  reviewCount: 128,
  image: hotelImage,
  images: [hotelImage, hotelImage, hotelImage],
  category: "hotel",
  description:
    "Experience the ultimate safari luxury at our award-winning lodge nestled in the heart of Volcanoes National Park. Wake up to breathtaking views of the Virunga mountains and enjoy world-class amenities designed for discerning travelers.",
  amenities: [
    "Free WiFi",
    "Breakfast Included",
    "Infinity Pool",
    "Spa & Wellness",
    "Restaurant & Bar",
    "Safari Tours",
    "Airport Transfer",
    "24/7 Concierge",
  ],
  host: {
    name: "Safari Lodges Rwanda",
    verified: true,
    responseTime: "1 hour",
    responseRate: "100%",
  },
  policies: {
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    cancellation: "Free cancellation up to 48 hours before check-in",
  },
};

const ListingDetail = () => {
  const { id } = useParams();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [isFavorite, setIsFavorite] = useState(false);

  // Calculate total price
  const nights = checkIn && checkOut
    ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const subtotal = nights * listing.price;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + serviceFee;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            to="/listings"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to listings
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                  {listing.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-gold text-gold" />
                    <span className="font-semibold">{listing.rating}</span>
                    <span className="text-muted-foreground">
                      ({listing.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {listing.location}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="gap-2"
                >
                  <Heart
                    className={`h-4 w-4 ${isFavorite ? "fill-destructive text-destructive" : ""}`}
                  />
                  Save
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl overflow-hidden mb-8"
          >
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Host Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Hosted by {listing.host.name}
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Response rate: {listing.host.responseRate} • Usually responds in {listing.host.responseTime}
                    </p>
                  </div>
                  {listing.host.verified && (
                    <div className="flex items-center gap-1 text-primary">
                      <Shield className="h-5 w-5" />
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  About this place
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {listing.description}
                </p>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  What this place offers
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {listing.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 text-foreground"
                    >
                      <Check className="h-5 w-5 text-primary" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Policies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-6 border-t border-border"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Things to know
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Check-in</h4>
                    <p className="text-sm text-muted-foreground">{listing.policies.checkIn}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Check-out</h4>
                    <p className="text-sm text-muted-foreground">{listing.policies.checkOut}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Cancellation</h4>
                    <p className="text-sm text-muted-foreground">{listing.policies.cancellation}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-28 bg-card rounded-2xl border border-border shadow-card p-6">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-2xl font-bold text-foreground">
                    {listing.currency}{listing.price}
                  </span>
                  <span className="text-muted-foreground">/ night</span>
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-left p-3 border border-border rounded-xl hover:border-primary transition-colors">
                        <div className="text-xs font-semibold text-muted-foreground mb-1">CHECK-IN</div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className={checkIn ? "text-foreground" : "text-muted-foreground"}>
                            {checkIn ? format(checkIn, "MMM d, yyyy") : "Add date"}
                          </span>
                        </div>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-left p-3 border border-border rounded-xl hover:border-primary transition-colors">
                        <div className="text-xs font-semibold text-muted-foreground mb-1">CHECK-OUT</div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className={checkOut ? "text-foreground" : "text-muted-foreground"}>
                            {checkOut ? format(checkOut, "MMM d, yyyy") : "Add date"}
                          </span>
                        </div>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Guests */}
                <div className="p-3 border border-border rounded-xl mb-6">
                  <div className="text-xs font-semibold text-muted-foreground mb-1">GUESTS</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{guests} guest{guests > 1 ? "s" : ""}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary"
                      >
                        -
                      </button>
                      <span className="w-4 text-center">{guests}</span>
                      <button
                        onClick={() => setGuests(Math.min(10, guests + 1))}
                        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reserve Button */}
                <Button variant="safari" size="xl" className="w-full rounded-xl mb-4">
                  Reserve
                </Button>

                <p className="text-center text-sm text-muted-foreground mb-6">
                  You won't be charged yet
                </p>

                {/* Price Breakdown */}
                {nights > 0 && (
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground underline cursor-help">
                        {listing.currency}{listing.price} x {nights} nights
                      </span>
                      <span>{listing.currency}{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground underline cursor-help">
                        Service fee
                      </span>
                      <span>{listing.currency}{serviceFee}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{listing.currency}{total}</span>
                    </div>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Award className="h-5 w-5 text-primary" />
                    <span>This is a rare find. Usually booked within hours.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ListingDetail;
