import { Search, Calendar, Users, MapPin, Plus } from "lucide-react";
import { PatternZigZag } from "./ImigongoPatterns";

export function ImigongoHero() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-end pb-20 overflow-hidden bg-imigongo-black">
      {/* Background Image - Full Screen */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504707748692-419802cf939d?q=80&w=2047&auto=format&fit=crop"
          alt="Volcanic Earth Texture"
          className="w-full h-full object-cover grayscale-20 contrast-125 brightness-50"
        />
        {/* Engineered Overlay: Solid washes */}
        <div className="absolute inset-0 bg-imigongo-black/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-t from-imigongo-black/90 via-transparent to-transparent" />

        {/* Structural Grid Overlay - The "Schematic" Effect */}
        <div className="absolute inset-x-4 md:inset-x-12 inset-y-8 border-l border-r border-white/10 pointer-events-none grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4">
          {/* Grid Columns with Technical Markers */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`hidden ${
                i % 4 === 0 || i === 11 ? "lg:block" : ""
              } col-span-1 border-r border-white/5 h-full relative`}
            >
              <div className="absolute top-1/4 -right-1.5 w-3 h-3 text-white/30">
                <Plus strokeWidth={1} className="w-full h-full" />
              </div>
              <div className="absolute bottom-1/4 -right-1.5 w-3 h-3 text-white/30">
                <Plus strokeWidth={1} className="w-full h-full" />
              </div>
            </div>
          ))}

          <div className="absolute top-1/2 left-0 w-full border-t border-white/5" />
        </div>
      </div>

      {/* Content - Aligned to Grid */}
      <div className="relative z-10 px-4 md:px-12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-8 items-end">
        {/* Headline Area */}
        <div className="col-span-1 md:col-span-3 lg:col-span-7 mb-8 lg:mb-0">
          <div className="inline-flex items-center gap-4 mb-8">
            <span className="text-[10px] font-mono text-imigongo-ochre border border-imigongo-ochre/50 bg-black/50 backdrop-blur-sm px-2 py-1">
              SECT.01 // HERO
            </span>
            <span className="text-white/80 font-bold uppercase tracking-[0.3em] text-xs">
              Experience The Wild
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.8] font-black text-white uppercase tracking-tighter mb-8">
            Raw <br />
            {/* Solid Color Emphasis */}
            <span className="text-imigongo-ochre">Nature</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 font-light max-w-xl leading-relaxed pl-6 border-l-2 border-imigongo-ochre">
            Curated expeditions into the heart of the Land of a Thousand Hills.
          </p>
        </div>

        {/* Structural Search Widget - SOLID CONTROL PANEL */}
        <div className="col-span-1 md:col-span-4 lg:col-span-5 w-full">
          <div className="bg-white border-2 border-white p-0 shadow-2xl shadow-black/50 relative">
            {/* Pseudo-element for stacked paper effect */}
            <div className="absolute -bottom-2 -right-2 w-full h-full bg-imigongo-ochre -z-10" />

            <div className="flex items-center justify-between p-6 border-b border-imigongo-black/10 bg-white">
              <div className="flex items-center gap-3 text-imigongo-black uppercase text-[10px] font-black tracking-widest">
                <Search className="w-3 h-3 text-imigongo-ochre" />
                Expedition Finder
              </div>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-imigongo-black/20 rounded-full" />
                <div className="w-1 h-1 bg-imigongo-black/20 rounded-full" />
                <div className="w-1 h-1 bg-imigongo-ochre rounded-full" />
              </div>
            </div>

            <div className="grid gap-px bg-imigongo-black/10 border-b border-imigongo-black/10">
              <div className="group relative bg-white hover:bg-imigongo-black/5 transition-colors p-6 cursor-pointer">
                <label className="text-[9px] font-mono text-imigongo-black/40 uppercase tracking-wider mb-2 block font-bold">
                  01 // Destination
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-2xl text-imigongo-black font-bold tracking-tight">
                    Kigali
                  </span>
                  <MapPin className="w-5 h-5 text-imigongo-black/30 group-hover:text-imigongo-ochre transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-imigongo-black/10">
                <div className="group relative bg-white hover:bg-imigongo-black/5 transition-colors p-6 cursor-pointer">
                  <label className="text-[9px] font-mono text-imigongo-black/40 uppercase tracking-wider mb-2 block font-bold">
                    02 // Date
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-imigongo-black font-bold tracking-tight">
                      Anytime
                    </span>
                    <Calendar className="w-4 h-4 text-imigongo-black/30 group-hover:text-imigongo-ochre transition-colors" />
                  </div>
                </div>
                <div className="group relative bg-white hover:bg-imigongo-black/5 transition-colors p-6 cursor-pointer">
                  <label className="text-[9px] font-mono text-imigongo-black/40 uppercase tracking-wider mb-2 block font-bold">
                    03 // Guests
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-imigongo-black font-bold tracking-tight">
                      2 Adults
                    </span>
                    <Users className="w-4 h-4 text-imigongo-black/30 group-hover:text-imigongo-ochre transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            <button className="group w-full py-6 bg-imigongo-black text-white font-black uppercase tracking-[0.2em] text-sm hover:bg-imigongo-ochre transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Begin Search
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Pattern - Solid */}
      <div className="absolute bottom-0 left-0 right-0 h-4 z-10 opacity-50 mix-blend-overlay">
        <PatternZigZag className="w-full h-full text-white" />
      </div>
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}
