import { motion } from "motion/react";

export function ImigongoFloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 24 }, (_, i) => {
    // Creating "Zig-Zag" geometric paths instead of curves
    // M = Move to, L = Line to
    const offset = i * 40 * position;
    const width = 1 + i * 0.1;

    // Zig-Zag Logic
    return {
      id: i,
      d: `
        M -${100 + offset} -${50 + i * 20} 
        L ${100 - offset} ${150 + i * 20} 
        L ${300 - offset} ${50 + i * 20} 
        L ${500 - offset} ${250 + i * 20} 
        L ${700 - offset} ${100 + i * 20} 
        L ${900 - offset} ${300 + i * 20}
        L ${1100 - offset} ${50 + i * 20}
      `,
      color: i % 2 === 0 ? "#D97706" : "#FFFFFF", // Ochre and White
      opacity: 0.1 + i * 0.02,
      width,
    };
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="h-full w-full"
        fill="none"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Imigongo Geometric Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.width * 2} // Doubled width for visibility
            strokeOpacity={0.4} // Much higher base opacity
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0], // Draw, stay, undraw
              opacity: [0, 0.4, 0.4, 0],
              pathOffset: [0, 0, 1, 1], // Move along the path
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
