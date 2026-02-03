import { Quote } from "lucide-react";
import { PatternZigZag } from "../ui/patterns";

export function EditorialTestimonials() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Visual Side */}
        <div className="relative">
          <div className="aspect-[3/4] md:aspect-square bg-muted relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=2574&auto=format&fit=crop"
              alt="Traveler Portrait"
              className="w-full h-full object-cover grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-foreground z-10 hidden md:flex items-center justify-center">
            <Quote className="text-primary w-10 h-10" />
          </div>
          <div className="absolute -bottom-12 -left-12 w-64 h-64 border border-foreground/10 rounded-full z-0 hidden md:block" />
        </div>

        {/* Text Side */}
        <div className="relative z-10">
          <span className="text-xs font-mono text-primary uppercase tracking-widest border border-primary/50 px-3 py-1 mb-8 inline-block">
            Traveler Journal
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] mb-12">
            "It wasn't just a trip. It was a complete{" "}
            <span className="italic text-foreground/50">recalibration</span> of
            how I see the world. Rwanda doesn't just welcome you; it embraces
            you."
          </h2>

          <div className="flex items-center gap-6">
            <div className="h-px bg-foreground/20 w-16" />
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm">
                Elena & Marc
              </h4>
              <span className="text-muted-foreground text-xs uppercase tracking-widest">
                Architects, Copenhagen
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 opacity-5">
        <PatternZigZag className="w-96 h-96 text-foreground" />
      </div>
    </section>
  );
}
