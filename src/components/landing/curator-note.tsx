import React from "react";
import { cn } from "@/lib/utils";

interface CuratorNoteProps extends React.HTMLAttributes<HTMLDivElement> {
  note: string;
  arrowDirection?: "left" | "right" | "up" | "down" | "none";
}

export function CuratorNote({
  note,
  className,
  arrowDirection = "none",
  ...props
}: CuratorNoteProps) {
  return (
    <div
      className={cn(
        "absolute z-20 pointer-events-none hidden lg:flex flex-col items-center",
        className,
      )}
      {...props}
    >
      <span className="font-handwriting text-primary text-xl -rotate-6 max-w-[150px] leading-tight text-center drop-shadow-sm mix-blend-multiply">
        {note}
      </span>
      {arrowDirection !== "none" && (
        <svg
          width="40"
          height="40"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className={cn(
            "text-foreground/80 w-8 h-8 mt-1",
            arrowDirection === "left" && "-rotate-90",
            arrowDirection === "right" && "rotate-90",
            arrowDirection === "up" && "rotate-180",
            arrowDirection === "down" && "rotate-0",
          )}
        >
          <title>Arrow</title>
          <path d="M50 10 C 50 40, 45 60, 50 90 M 35 75 C 40 85, 50 90, 50 90 C 50 90, 60 85, 65 75" />
        </svg>
      )}
    </div>
  );
}
