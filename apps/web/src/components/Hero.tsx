import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import heroImage from "@/assets/hero-rwanda.jpg";

const categories = [
  { value: "hotels", label: "Hotels" },
  { value: "bnbs", label: "BnBs" },
  { value: "cars", label: "Car Rentals" },
  { value: "tours", label: "Tours & Experiences" },
];

const destinations = [
  "Kigali",
  "Lake Kivu",
  "Volcanoes National Park",
  "Akagera National Park",
  "Nyungwe Forest",
  "Musanze",
];

export const Hero = () => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [category, setCategory] = useState("hotels");
  const [showDestinations, setShowDestinations] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Rwanda's beautiful hills"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground mb-6 leading-tight">
            Discover the Land of a
            <span className="block text-gradient-sunset">Thousand Hills</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Your one-stop destination for authentic Rwandan adventures. 
            Book trusted accommodations, transport, and unforgettable experiences.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Category Tabs */}
          <div className="flex justify-center gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat.value
                    ? "bg-accent text-accent-foreground"
                    : "bg-card/20 text-primary-foreground hover:bg-card/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Main Search Bar */}
          <div className="search-bar p-2 md:p-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-0">
              {/* Destination */}
              <div className="md:col-span-4 relative">
                <div className="px-4 py-3">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Where
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search destinations"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      onFocus={() => setShowDestinations(true)}
                      onBlur={() => setTimeout(() => setShowDestinations(false), 200)}
                      className="w-full pl-6 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>
                </div>
                {showDestinations && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-elevated border border-border p-2 z-20">
                    {destinations.map((dest) => (
                      <button
                        key={dest}
                        onClick={() => setDestination(dest)}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <MapPin className="inline h-4 w-4 mr-2 text-primary" />
                        {dest}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px bg-border mx-2" />

              {/* Check In */}
              <div className="md:col-span-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full text-left px-4 py-3 hover:bg-secondary/50 rounded-xl transition-colors">
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        Check in
                      </label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className={checkIn ? "text-foreground" : "text-muted-foreground"}>
                          {checkIn ? format(checkIn, "MMM d") : "Add date"}
                        </span>
                      </div>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px bg-border mx-2" />

              {/* Check Out */}
              <div className="md:col-span-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full text-left px-4 py-3 hover:bg-secondary/50 rounded-xl transition-colors">
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        Check out
                      </label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className={checkOut ? "text-foreground" : "text-muted-foreground"}>
                          {checkOut ? format(checkOut, "MMM d") : "Add date"}
                        </span>
                      </div>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px bg-border mx-2" />

              {/* Guests */}
              <div className="md:col-span-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full text-left px-4 py-3 hover:bg-secondary/50 rounded-xl transition-colors">
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        Guests
                      </label>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{guests} guest{guests > 1 ? 's' : ''}</span>
                      </div>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48" align="start">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Guests</span>
                      <div className="flex items-center gap-3">
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
                  </PopoverContent>
                </Popover>
              </div>

              {/* Search Button */}
              <div className="md:col-span-1 flex items-center justify-center px-2">
                <Button variant="hero" size="xl" className="rounded-full w-full md:w-auto md:aspect-square md:px-0">
                  <Search className="h-5 w-5" />
                  <span className="md:hidden">Search</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mt-12"
        >
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-primary-foreground">500+</div>
            <div className="text-sm text-primary-foreground/70">Verified Stays</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-primary-foreground">200+</div>
            <div className="text-sm text-primary-foreground/70">Safari Vehicles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-primary-foreground">50+</div>
            <div className="text-sm text-primary-foreground/70">Expert Guides</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-primary-foreground">10k+</div>
            <div className="text-sm text-primary-foreground/70">Happy Travelers</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
