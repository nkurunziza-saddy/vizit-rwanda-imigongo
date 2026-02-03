import { SectionTitle } from "./section-title";
import { ArrowRight, Plus } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Custom Itineraries",
    image:
      "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=2070&auto=format&fit=crop",
    desc: "Tailor-made journeys designed around your interests, pace, and passions.",
  },
  {
    id: "02",
    title: "Corporate Retreats",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop",
    desc: "Inspiring off-site experiences for teams, blending work with wilderness.",
  },
  {
    id: "03",
    title: "Photography Tours",
    image:
      "https://images.unsplash.com/photo-1547619292-240402b5ae5d?q=80&w=1974&auto=format&fit=crop",
    desc: "Guided by professional photographers to capture Rwanda's golden hour.",
  },
];

export function Services() {
  return (
    <div className="py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionTitle
          title={
            <>
              Curated <span className="text-primary">Services</span>
            </>
          }
          subtitle="Beyond standard tours. We craft experiences with architectural precision."
          tooltip={
            <div className="flex flex-col gap-1">
              <h4 className="font-bold uppercase tracking-widest text-primary text-xs">
                Ubuhanga (Craftsmanship)
              </h4>
              <p className="font-light text-xs leading-relaxed opacity-80">
                Inspired by the intricate *Urukangarara* (woven reeds). A symbol
                of skill and structural integrity.
              </p>
            </div>
          }
          align="left"
        />

        <div className="space-y-0 border-t border-foreground/10">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative h-auto md:h-64 w-full border-b border-foreground/10 flex flex-col md:flex-row hover:bg-foreground/5 transition-colors overflow-hidden"
            >
              <div className="absolute top-4 left-4 z-20 text-[10px] font-mono font-bold text-foreground/30 group-hover:text-primary transition-colors">
                REF.{service.id}
              </div>

              <div className="w-full md:w-1/3 h-64 md:h-full relative overflow-hidden border-r border-foreground/10">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors mix-blend-multiply" />
                <div className="absolute bottom-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-6 h-6" strokeWidth={1} />
                </div>
              </div>

              <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between p-8 md:p-12">
                <div>
                  <h3 className="text-3xl font-black uppercase text-foreground mb-3 flex items-center gap-4 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground max-w-md font-light">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-8 md:mt-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <button
                    type="button"
                    className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
                  >
                    Explore <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
