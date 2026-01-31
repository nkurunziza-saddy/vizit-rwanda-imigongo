import React from "react";
import { cn } from "@/lib/utils";
import { PatternZigZag } from "./ImigongoPatterns";

interface ImigongoSectionProps extends React.ComponentProps<"section"> {
  title?: string;
  patternPosition?: "top" | "bottom" | "both";
}

export function ImigongoSection({
  children,
  className,
  title,
  patternPosition = "top",
  ...props
}: ImigongoSectionProps) {
  return (
    <section
      className={cn("relative py-16 bg-background", className)}
      {...props}
    >
      {(patternPosition === "top" || patternPosition === "both") && (
        <div className="absolute top-0 left-0 right-0 h-4 border-b-2 border-imigongo-ochre overflow-hidden">
          <PatternZigZag className="w-full h-8 -mt-2 text-imigongo-black" />
        </div>
      )}

      <div className="container mx-auto px-4 max-w-7xl">
        {title && (
          <div className="mb-12 text-center">
            <div className="inline-block relative">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-imigongo-black relative z-10 px-4">
                {title}
              </h2>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-imigongo-ochre/30 -rotate-1 skew-x-12" />
            </div>
            <div className="mx-auto mt-4 w-24 h-1 bg-imigongo-black" />
          </div>
        )}
        {children}
      </div>

      {(patternPosition === "bottom" || patternPosition === "both") && (
        <div className="absolute bottom-0 left-0 right-0 h-4 border-t-2 border-imigongo-ochre overflow-hidden">
          <PatternZigZag className="w-full h-8 -mt-2 text-imigongo-black" />
        </div>
      )}
    </section>
  );
}
