import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PatternZigZag } from "../ui/patterns";
import { CuratorNote } from "./curator-note";

export function ParallaxSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <div
      ref={containerRef}
      className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[90vh] overflow-hidden"
    >
      <div className="relative min-h-[60vh] md:min-h-full bg-foreground overflow-hidden group">
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <img
            src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop"
            alt="Imigongo Art Process"
            className="w-full h-full object-cover grayscale opacity-60"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[20vw] font-black text-white/10 leading-none tracking-tighter mix-blend-overlay">
            ART
          </span>
        </div>
      </div>

      <div className="bg-foreground text-background flex flex-col justify-center p-12 md:p-24 lg:p-32 border-l-4 border-primary relative z-10">
        <motion.div style={{ y: textY }}>
          <div className="mb-12 relative">
            <PatternZigZag className="w-64 h-8 text-primary mb-8 -ml-2" />
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white mb-8">
              The <br />
              <span className="text-primary">Earth</span> <br />
              Speaks
            </h2>

            <CuratorNote
              note="The geometry of the hills"
              className="top-10 right-0 md:-right-20 lg:-right-32"
              arrowDirection="left"
            />
          </div>

          <div className="space-y-8 max-w-xl">
            <p className="text-2xl font-light leading-relaxed text-white/90">
              Originating from the walls of the royal huts in Kibungo, Imigongo
              is more than decoration—it is architecture.
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              Created using cow dung and natural pigments, the geometric ridges
              created zigzags, spirals, and diamonds that represented the
              topography of the Rwandan hills and the rhythm of everyday life.
              Today, we bring this structural beauty to your travel experience.
            </p>
          </div>

          <div className="mt-16">
            <button
              type="button"
              className="px-12 py-5 border-2 border-white/20 text-white font-bold uppercase tracking-[0.2em] hover:bg-primary hover:border-primary transition-all"
            >
              Read the full story
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
