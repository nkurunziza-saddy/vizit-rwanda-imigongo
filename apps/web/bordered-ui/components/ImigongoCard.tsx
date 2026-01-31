import React from "react";
import { cn } from "@/lib/utils";
import { PatternDiamond, PatternSpiral } from "./ImigongoPatterns";

interface ImigongoCardProps extends React.ComponentProps<"div"> {
  title?: string;
  imageSrc?: string;
  price?: string;
  badge?: string;
}

export function ImigongoCard({
  title,
  imageSrc,
  price,
  badge,
  className,
  children,
  ...props
}: ImigongoCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-white border-2 border-imigongo-black overflow-hidden hover:-translate-y-1 hover:shadow-[4px_4px_0px_var(--color-imigongo-ochre)] transition-all duration-300",
        className,
      )}
      {...props}
    >
      {/* Accent Corner */}
      <div className="absolute top-0 right-0 p-1 bg-imigongo-black text-white z-10">
        <PatternDiamond className="w-4 h-4 text-imigongo-white" />
      </div>

      {imageSrc && (
        <div className="relative h-48 w-full border-b-2 border-imigongo-black overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {badge && (
            <span className="absolute top-2 left-2 bg-imigongo-ochre text-white text-xs font-bold px-2 py-1 uppercase tracking-wider border border-imigongo-black">
              {badge}
            </span>
          )}
        </div>
      )}

      <div className="p-4 relative">
        {/* Decorative Spiral on background */}
        <PatternSpiral className="absolute bottom-2 right-2 w-16 h-16 text-imigongo-ochre/10 pointer-events-none" />

        {title && (
          <h3 className="text-xl font-bold uppercase tracking-tight text-imigongo-black mb-2">
            {title}
          </h3>
        )}

        {price && (
          <div className="text-imigongo-ochre font-mono font-bold text-lg mb-3">
            {price}
          </div>
        )}

        <div className="text-imigongo-dark/80 text-sm relative z-10">
          {children}
        </div>

        <div className="mt-4 pt-4 border-t-2 border-dashed border-imigongo-black/20 flex justify-between items-center">
          <span className="text-xs font-bold text-imigongo-black uppercase">
            Book Now
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-imigongo-ochre group-hover:translate-x-1 transition-transform"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
