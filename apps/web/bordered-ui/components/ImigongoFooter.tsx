import { PatternDiamond } from "./ImigongoPatterns";
import React from "react";

export function ImigongoFooter() {
  return (
    <footer className="bg-imigongo-black text-white py-16 border-t-4 border-imigongo-ochre relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <PatternDiamond className="w-64 h-64" />
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-imigongo-ochre flex items-center justify-center">
              <span className="font-bold text-white">V</span>
            </div>
            <span className="text-2xl font-black uppercase tracking-tighter text-white">
              Vizit<span className="text-imigongo-ochre">Africa</span>
            </span>
          </div>
          <p className="text-white/70 max-w-sm mb-6">
            Discover the heart of Rwanda through immersive cultural experiences
            and curated adventures.
          </p>
        </div>

        <div>
          <h4 className="text-imigongo-ochre font-bold uppercase tracking-widest mb-6">
            Explore
          </h4>
          <ul className="space-y-3">
            {["Destinations", "Cultural Tours", "Workshops", "Events"].map(
              (item) => (
                <li key={item}>
                  <a href="#" className="flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-imigongo-ochre opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="hover:translate-x-1 transition-transform">
                      {item}
                    </span>
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-imigongo-ochre font-bold uppercase tracking-widest mb-6">
            Connect
          </h4>
          <ul className="space-y-3">
            {["Instagram", "Twitter", "Facebook", "Newsletter"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-imigongo-ochre transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
        <p>&copy; 2025 Vizit Africa. All rights reserved.</p>
        <p>Inspired by Imigongo Art</p>
      </div>
    </footer>
  );
}
