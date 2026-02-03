import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealScrollProps {
  text: string;
  className?: string;
}

export function TextRevealScroll({ text, className }: TextRevealScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      const words = textRef.current.querySelectorAll(".word");

      gsap.fromTo(
        words,
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 50%",
            scrub: 1,
          },
        },
      );
    },
    { scope: containerRef },
  );

  // Split text into words
  const words = text.split(" ");

  return (
    <div ref={containerRef} className={cn("py-24 md:py-32", className)}>
      <div className="container mx-auto px-4 max-w-4xl">
        <p
          ref={textRef}
          className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight text-foreground text-center"
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="word inline-block mr-[0.25em] transition-colors"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
