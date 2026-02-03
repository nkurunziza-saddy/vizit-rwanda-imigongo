import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 160 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Vizit Africa</title>
      <text
        x="0"
        y="28"
        fill="currentColor"
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 900,
          fontSize: "24px",
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
        }}
      >
        Vizit Africa
      </text>
    </svg>
  );
}
