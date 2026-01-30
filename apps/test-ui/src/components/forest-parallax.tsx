"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unsplashImages } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export function ForestParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null); // fur (sku or mountains)
  const layer2Ref = useRef<HTMLDivElement>(null); // mid (tress)
  const layer3Ref = useRef<HTMLDivElement>(null); // mid-near (bushes)
  const layer4Ref = useRef<HTMLDivElement>(null); // closest (leaves)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTrigger = {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      };

      gsap.to(layer1Ref.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger,
      });

      gsap.to(layer2Ref.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger,
      });

      gsap.to(layer3Ref.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger,
      });

      gsap.to(layer4Ref.current, {
        yPercent: -60,
        ease: "none",
        scrollTrigger,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[120vh] w-full overflow-hidden bg-[#0A0E0D] flex items-center justify-center"
    >
      <div ref={layer1Ref} className="absolute inset-0 z-0">
        <Image
          src={unsplashImages.mountainVista}
          alt="Background"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E0D] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl mix-blend-overlay">
        <h2 className="font-serif text-6xl md:text-9xl text-white font-bold opacity-80">
          Breath of life
        </h2>
      </div>

      <div
        ref={layer2Ref}
        className="absolute inset-0 z-20 pointer-events-none"
      >
        <Image
          src={unsplashImages.bamboo}
          alt="Midground"
          fill
          className="object-cover opacity-80 scale-110"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E0D] via-transparent to-transparent" />
      </div>

      <div
        ref={layer3Ref}
        className="absolute -bottom-20 left-0 right-0 h-[60vh] z-30 pointer-events-none"
      >
        <Image
          src={unsplashImages.nyungwe}
          alt="Foreground"
          fill
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E0D] to-transparent" />
      </div>
    </section>
  );
}
