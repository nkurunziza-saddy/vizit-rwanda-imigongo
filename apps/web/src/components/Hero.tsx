import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar as CalendarIcon, Users } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { FloatingPaths } from "@/curated/floating-paths";

export default function Hero() {
  const navigate = useNavigate();
  const [locationFrom, setLocationFrom] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    navigate({
      to: "/listings",
      search: {
        category: "all",
        search: "Rwanda", // Default destination
        from: locationFrom,
        checkIn: date?.from?.toISOString(),
        checkOut: date?.to?.toISOString(),
        guests: guests,
      },
    });
  };

  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden py-24 md:py-32">
      <div className="container relative z-10 mx-auto px-4 text-center max-w-5xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
          Discover <span className="text-primary">Rwanda</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Experience the land of a thousand hills. Find unique stays, premium cars, and expert guides for your journey.
        </p>
        
        <div className="max-w-5xl mx-auto bg-background/80 backdrop-blur-md border border-border/50 rounded-full shadow-lg p-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="flex flex-col md:flex-row items-center gap-2">
                
                {/* Location From */}
                <div className="relative w-full md:w-[28%] group">
                     <div className="flex items-center gap-3 px-6 h-14 rounded-full bg-transparent hover:bg-secondary/50 border border-transparent transition-colors">
                        <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                        <div className="text-left flex-1 min-w-0">
                             <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">From</div>
                             <input 
                                type="text" 
                                className="w-full bg-transparent border-none p-0 h-auto text-sm font-semibold placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0 truncate"
                                placeholder="City"
                                value={locationFrom}
                                onChange={(e) => setLocationFrom(e.target.value)}
                             />
                        </div>
                     </div>
                </div>

                <div className="hidden md:block w-px h-10 bg-border/50" />

                {/* Destination (Static for now) */}
                <div className="relative w-full md:w-[22%] group">
                     <div className="flex items-center gap-3 px-6 h-14 rounded-full bg-secondary/50 border border-transparent group-hover:border-border/50 transition-colors cursor-default">
                        <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                        <div className="text-left flex-1 min-w-0">
                             <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">To</div>
                             <div className="font-semibold text-sm truncate">Rwanda</div>
                        </div>
                     </div>
                </div>

                <div className="hidden md:block w-px h-10 bg-border/50" />

                {/* Dates Popover */}
                <div className="relative w-full md:w-[25%] group">
                    <Popover>
                        <PopoverTrigger className="flex items-center gap-3 px-6 h-14 rounded-full bg-transparent hover:bg-secondary/50 border border-transparent transition-colors cursor-pointer w-full text-left">
                                <CalendarIcon className="h-5 w-5 text-muted-foreground shrink-0" />
                                <div className="text-left flex-1 min-w-0">
                                     <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">When</div>
                                     <div className="font-semibold text-sm text-foreground/80 truncate">
                                        {date?.from ? (
                                            date.to ? (
                                                <>
                                                {format(date.from, "LLL dd")} - {format(date.to, "LLL dd")}
                                                </>
                                            ) : (
                                                format(date.from, "LLL dd")
                                            )
                                        ) : (
                                            <span>Add dates</span>
                                        )}
                                     </div>
                                </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="hidden md:block w-px h-10 bg-border/50" />

                {/* Guests Popover */}
                <div className="relative w-full md:w-[20%] group">
                    <Popover>
                        <PopoverTrigger className="flex items-center gap-3 px-6 h-14 rounded-full bg-transparent hover:bg-secondary/50 border border-transparent transition-colors cursor-pointer w-full text-left">
                                <Users className="h-5 w-5 text-muted-foreground shrink-0" />
                                <div className="text-left flex-1 min-w-0">
                                     <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Who</div>
                                     <div className="font-semibold text-sm text-foreground/80 truncate">
                                        {guests} Guest{guests !== 1 ? 's' : ''}
                                     </div>
                                </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-4" align="end">
                            <div className="flex justify-between items-center bg-background">
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm">Guests</span>
                                    <span className="text-xs text-muted-foreground">How many people?</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button 
                                        variant="outline" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-full"
                                        onClick={() => setGuests(Math.max(1, guests - 1))}
                                        disabled={guests <= 1}
                                    >
                                        -
                                    </Button>
                                    <span className="w-4 text-center text-sm font-medium">{guests}</span>
                                    <Button 
                                        variant="outline" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-full"
                                        onClick={() => setGuests(guests + 1)}
                                        disabled={guests >= 10}
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                 <div className="w-full md:w-auto p-1">
                    <Button onClick={handleSearch} size="lg" className="w-full md:w-auto rounded-full h-12 px-8 gap-2 shadow-md">
                        <Search className="h-4 w-4" />
                        <span>Search</span>
                    </Button>
                 </div>
             </div>
        </div>

         <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
             <span className="hidden md:inline">Popular:</span>
             <Link to="/listings" search={{ category: 'hotel' }} className="hover:text-primary transition-colors cursor-pointer px-3 py-1 rounded-full border border-transparent hover:border-border hover:bg-secondary/30">Hotels</Link>
             <Link to="/listings" search={{ category: 'car' }} className="hover:text-primary transition-colors cursor-pointer px-3 py-1 rounded-full border border-transparent hover:border-border hover:bg-secondary/30">Car Rentals</Link>
             <Link to="/listings" search={{ category: 'tour' }} className="hover:text-primary transition-colors cursor-pointer px-3 py-1 rounded-full border border-transparent hover:border-border hover:bg-secondary/30">Tours</Link>
         </div>
      </div>
    </div>
  );
}
