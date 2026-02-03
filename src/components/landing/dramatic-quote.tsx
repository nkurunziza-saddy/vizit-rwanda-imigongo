import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface DramaticQuoteProps {
  quote: string;
  author: string;
  subAuthor?: string;
  backgroundImage?: string;
}

export function DramaticQuote({
  quote,
  author,
  subAuthor,
  backgroundImage = "https://images.unsplash.com/photo-1518182170546-07fb612d5c2e?q=80&w=2600&auto=format&fit=crop",
}: DramaticQuoteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=100%",
        pin: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=100%",
          scrub: 1,
        },
      });

      tl.to(".bg-image", { scale: 1.1, duration: 1 });

      tl.fromTo(
        quoteRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 },
        "<",
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="h-screen relative overflow-hidden flex items-center justify-center bg-black text-white"
    >
      <div className="bg-image absolute inset-0 opacity-60">
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover grayscale brightness-50"
        />
      </div>

      <div
        ref={quoteRef}
        className="container mx-auto px-4 max-w-5xl relative z-10 text-center"
      >
        <Quote className="w-16 h-16 md:w-24 md:h-24 text-primary mx-auto mb-8 opacity-80" />

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-12">
          "{quote}"
        </h2>

        <div className="flex flex-col items-center gap-2">
          <span className="text-primary font-black uppercase tracking-[0.2em] text-lg">
            {author}
          </span>
          {subAuthor && (
            <span className="text-white/60 font-mono text-sm uppercase tracking-widest">
              {subAuthor}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
