import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Star, ArrowRight } from "lucide-react";
import { PatternZigZag } from "@/components/ui/patterns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ExperienceCardProps extends ComponentProps<"div"> {
  title: string;
  imageSrc: string;
  price: string;
  rating?: number;
  reviews?: number;
  duration?: string;
  location?: string;
}

export function ExperienceCard({
  title,
  imageSrc,
  price,
  rating = 4.8,
  reviews = 124,
  duration = "3h",
  location = "Kigali",
  className,
  children,
  ...props
}: ExperienceCardProps) {
  return (
    <Card
      className={cn(
        "group h-full p-0 overflow-hidden border-2 border-foreground bg-card gap-0 shadow-none hover:shadow-none transition-all duration-300",
        className,
      )}
      {...props}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover grayscale-50 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 border-[3px] border-white/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        <div className="absolute top-4 right-4 z-20 bg-foreground/90 text-primary text-[9px] font-black uppercase tracking-widest px-2 py-1 border border-primary/20 backdrop-blur-md">
          Verified
        </div>
      </div>

      <div className="h-4 w-full bg-foreground flex items-center overflow-hidden relative">
        <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
        <PatternZigZag className="w-[200%] h-full text-background animate-pulse relative z-10 mix-blend-overlay" />
      </div>

      <div className="p-4 md:p-6 flex flex-col grow relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="text-primary font-mono font-bold text-xs uppercase tracking-widest border border-primary/20 bg-primary/5 px-2 py-1">
            {price}
          </span>
          <div className="flex items-center gap-1 text-foreground/60 text-xs font-bold">
            <Star className="w-3 h-3 fill-primary text-primary" /> {rating} (
            {reviews})
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {children && (
          <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6 line-clamp-3">
            {children}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-foreground/10 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
          <span>
            {duration} — {location}
          </span>
          <ArrowRight className="w-4 h-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-primary" />
        </div>
      </div>
    </Card>
  );
}
