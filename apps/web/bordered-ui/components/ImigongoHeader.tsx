import { PatternZigZag } from "./ImigongoPatterns";
import React from "react";

export function ImigongoHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b-2 border-imigongo-black">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-imigongo-ochre flex items-center justify-center">
            <PatternZigZag className="w-full h-full text-white rotate-90 scale-150" />
          </div>
          <span className="text-xl font-black uppercase tracking-tighter text-imigongo-black">
            Vizit<span className="text-imigongo-ochre">Africa</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {["Tours", "Experiences", "Events", "About"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-bold uppercase tracking-wide text-imigongo-black hover:text-imigongo-ochre transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button className="px-4 py-2 bg-imigongo-black text-white text-xs font-bold uppercase tracking-widest hover:bg-imigongo-ochre transition-colors">
          Book Now
        </button>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-imigongo-ochre transform translate-y-full"></div>
    </header>
  );
}
