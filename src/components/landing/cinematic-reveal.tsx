import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function CinematicReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // A dark section that pins, then text reveals, then image fades in
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });

      // 1. Start Pitch Black
      // 2. Text "In The Mist" reveals (Blur out to in)
      tl.fromTo(
        textRef.current,
        { scale: 3, opacity: 0, filter: "blur(20px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1 },
      )
        // 3. Text fades
        .to(
          textRef.current,
          { opacity: 0, scale: 0.8, filter: "blur(10px)", duration: 0.5 },
          "+=0.5",
        )

        // 4. Background Image Reveals (Lightning flash effect?)
        .to(".bg-image", { opacity: 1, duration: 1 })
        // 5. Final Text
        .fromTo(
          ".final-caption",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 },
        );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="bg-foreground h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* Background Image (Initially Hidden) */}
      <div className="bg-image absolute inset-0 opacity-0 transition-opacity duration-1000">
        <img
          src="https://images.unsplash.com/photo-1544605159-075b637d4060?q=80&w=2670&auto=format&fit=crop" // Silverback Gorilla
          alt="Silverback"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-t from-foreground via-transparent to-foreground" />
      </div>

      {/* Dramatic Text */}
      <div
        ref={textRef}
        className="relative z-10 text-center mix-blend-difference"
      >
        <h2 className="text-white text-[8vw] md:text-[10vw] font-black uppercase tracking-tighter leading-none">
          In The <br /> Mist
        </h2>
      </div>

      {/* Final Caption */}
      <div className="final-caption absolute bottom-24 left-0 w-full text-center z-20 opacity-0">
        <p className="text-primary uppercase tracking-[0.5em] text-sm font-bold mb-4">
          Volcanoes National Park
        </p>
        <h3 className="text-white text-4xl md:text-5xl font-black uppercase tracking-tighter">
          Face to Face with Giants
        </h3>
      </div>
    </div>
  );
}
