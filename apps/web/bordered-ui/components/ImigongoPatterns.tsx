import React from "react";
import { cn } from "@/lib/utils";

interface PatternProps extends React.ComponentProps<"svg"> {
  color?: string;
  strokeWidth?: number;
}

export function PatternZigZag({
  className,
  color = "currentColor",
  strokeWidth = 2,
  ...props
}: PatternProps) {
  return (
    <svg
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      className={cn("w-full h-4", className)}
      {...props}
    >
      <path
        d="M0,20 L10,0 L20,20 L30,0 L40,20 L50,0 L60,20 L70,0 L80,20 L90,0 L100,20"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function PatternDiamond({
  className,
  color = "currentColor",
  strokeWidth = 2,
  ...props
}: PatternProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      preserveAspectRatio="xMidYMid slice"
      className={cn("w-10 h-10", className)}
      {...props}
    >
      <path
        d="M20,0 L40,20 L20,40 L0,20 Z"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M20,10 L30,20 L20,30 L10,20 Z"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function PatternSpiral({
  className,
  color = "currentColor",
  strokeWidth = 2,
  ...props
}: PatternProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn("w-10 h-10", className)} {...props}>
      <path
        d="M20,20 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M20,20 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
