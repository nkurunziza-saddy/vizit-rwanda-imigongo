"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unsplashImages } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  {
    id: 1,
    title: "The Beginning",
    text: "Your journey starts in the heart of the mist-covered valleys.",
    image: unsplashImages.deepForest,
  },
  {
    id: 2,
    title: "The Climb",
    text: "Ascend through bamboo forests where golden monkeys play.",
    image: unsplashImages.bamboo,
  },
  {
    id: 3,
    title: "The Summit",
    text: "Stand atop the Virungas and see the world stretch before you.",
    image: unsplashImages.mountainVista,
  },
  {
    id: 4,
    title: "The Descent",
    text: "Return to the warmth of the lakeside fires as evening falls.",
    image: unsplashImages.lakeside,
  },
];

export function HorizontalJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".scene-panel");
      
      gsap.to(panels, {
        xPercent: -100 * (scenes.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          start: "top top",
          end: () => "+=" + (window.innerWidth * (scenes.length - 1)),
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-[#0A0E0D]"
    >
      <div
        ref={trackRef}
        className="flex h-full"
        style={{ width: `${scenes.length * 100}vw` }}
      >
        {scenes.map((scene, i) => (
          <div
            key={scene.id}
            className="scene-panel relative w-screen h-full flex-shrink-0 flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0">
              <Image
                src={scene.image}
                alt={scene.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 max-w-4xl px-6 text-center text-white">
              <div className="mb-4 inline-block px-4 py-1 border border-[#E8B44A] rounded-full text-[#E8B44A] text-xs uppercase tracking-widest bg-black/30 backdrop-blur-md">
                Chapter {String(i + 1).padStart(2, "0")}
              </div>
              <h2 className="font-serif text-5xl md:text-8xl font-bold mb-6 drop-shadow-lg">
                {scene.title}
              </h2>
              <p className="text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto drop-shadow-md">
                {scene.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}