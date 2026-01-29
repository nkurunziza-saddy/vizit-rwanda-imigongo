import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, addDays } from "date-fns";
import { CalendarIcon, MapPin, Users, Search } from "lucide-react";
import type { DateRange } from "react-day-picker";

/**
 * Hero Section
 *
 * Clean, minimal hero with search functionality
 */

export function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => {
    navigate({
      to: "/listings",
      search: {
        search: location || undefined,
        checkIn: date?.from?.toISOString(),
        checkOut: date?.to?.toISOString(),
        guests: guests || undefined,
        category: undefined,
        sortBy: undefined,
        priceRange: undefined,
        amenities: undefined,
        from: undefined,
        page: undefined,
      },
    });
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            {t("hero.subtitle")}
          </p>

          {/* Search Box */}
          <div className="bg-background rounded-2xl shadow-lg border p-2">
            <div className="flex flex-col md:flex-row gap-2">
              {/* Location */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 text-left">
                  <label className="text-xs font-medium text-muted-foreground uppercase">
                    {t("search.where")}
                  </label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t("search.locationPlaceholder")}
                    className="border-0 p-0 h-auto text-sm font-medium placeholder:text-muted-foreground/70 focus-visible:ring-0"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 text-left">
                  <label className="text-xs font-medium text-muted-foreground uppercase">
                    {t("search.when")}
                  </label>
                  <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger>
                      <button className="text-sm font-medium text-left w-full">
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "MMM d")} -{" "}
                              {format(date.to, "MMM d")}
                            </>
                          ) : (
                            format(date.from, "MMM d")
                          )
                        ) : (
                          <span className="text-muted-foreground">
                            {t("search.addDates")}
                          </span>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Guests */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 text-left">
                  <label className="text-xs font-medium text-muted-foreground uppercase">
                    {t("search.who")}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-muted"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium min-w-[20px] text-center">
                      {guests}
                    </span>
                    <button
                      onClick={() => setGuests(guests + 1)}
                      className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-muted"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <Button onClick={handleSearch} className="h-14 px-8 rounded-xl">
                <Search className="h-5 w-5 mr-2" />
                {t("search.button")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
