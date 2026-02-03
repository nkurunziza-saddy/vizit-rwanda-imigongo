import { useRef } from "react";
import { PatternVerticalDiamond } from "../ui/patterns";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function PatternDecoder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      gsap.to(".pattern-bg", {
        backgroundPosition: "0% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      tl.fromTo(
        ".grid-part-1",
        { x: "-100%", opacity: 0 },
        { x: "0%", opacity: 1 },
      ).fromTo(
        ".grid-part-2",
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1 },
        "<",
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="bg-primary min-h-screen relative overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 pattern-bg opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />

      <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        <div ref={leftColRef} className="text-foreground">
          <span className="text-white text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
            The Art Form
          </span>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
            Decoding <br /> The Pattern
          </h2>
          <p className="text-xl md:text-2xl font-serif font-medium leading-relaxed max-w-lg mb-8">
            Traditionally made from cow dung and ash, Imigongo is more than
            decor. It is the geometry of Rwandan spirit.
          </p>
          <div className="flex gap-4">
            <div className="w-16 h-16 border-2 border-foreground flex items-center justify-center">
              <PatternVerticalDiamond className="w-8 h-8" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest max-w-[150px] self-center">
              Strength in <br /> Structure
            </p>
          </div>
        </div>

        <div
          ref={rightColRef}
          className="relative h-[60vh] w-full flex items-center justify-center bg-foreground border-4 border-white shadow-2xl"
        >
          <div className="grid-part-1 absolute bg-white w-32 h-32 top-10 left-10 rotate-45 mix-blend-difference" />
          <div className="grid-part-2 absolute bg-white w-32 h-32 bottom-10 right-10 rotate-45 mix-blend-difference" />
          <div className="grid-part-1 absolute bg-white w-16 h-16 inset-0 m-auto rotate-12 mix-blend-difference" />

          <PatternVerticalDiamond className="w-full h-full text-primary opacity-20 absolute inset-0" />
          <h3 className="relative z-10 text-white text-5xl font-black uppercase mix-blend-overlay opacity-50">
            Geometry
          </h3>
        </div>
      </div>
    </div>
  );
}
