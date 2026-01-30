"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unsplashImages } from "@/lib/images";
import { ArrowRight, Mountain, TreePine, Waves, Building2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const regions = [
  {
    id: "virunga",
    title: "The Peaks",
    subtitle: "Virunga Mountains",
    description:
      "Home to the majestic mountain gorillas, where volcanoes pierce the clouds.",
    image: unsplashImages.virunga,
    icon: Mountain,
    color: "#4ADE80",
  },
  {
    id: "nyungwe",
    title: "The Canopy",
    subtitle: "Nyungwe Forest",
    description: "Walk above ancient treetops in Africa's oldest rainforest.",
    image: unsplashImages.nyungwe,
    icon: TreePine,
    color: "#86EFAC",
  },
  {
    id: "kivu",
    title: "The Waters",
    subtitle: "Lake Kivu",
    description:
      "Serene beaches and emerald waters reflecting the African sky.",
    image: unsplashImages.lakeKivu,
    icon: Waves,
    color: "#60A5FA",
  },
  {
    id: "kigali",
    title: "The Pulse",
    subtitle: "Kigali City",
    description:
      "The vibrant heart of Rwanda, pulsing with art, culture, and life.",
    image: unsplashImages.kigali,
    icon: Building2,
    color: "#FDBA74",
  },
];

export function CircularJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [activeRegion, setActiveRegion] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalRotation = 360;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentRotation = progress * totalRotation;

          gsap.set(wheelRef.current, { rotation: -currentRotation });

          gsap.set(".wheel-counter-rotate", { rotation: currentRotation });

          const index = Math.min(
            Math.floor(progress * regions.length),
            regions.length - 1,
          );
          setActiveRegion(index);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#0F1512] text-white flex items-center"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        <div className="order-2 md:order-1 relative z-10 pl-8 md:pl-0">
          <div className="relative h-[60vh]">
            <p className="text-[#E8B44A] tracking-widest uppercase text-xs font-bold mb-4">
              Explore the Regions
            </p>
            {regions.map((region, i) => (
              <div
                key={region.id}
                className={`transition-all duration-700 absolute top-10 left-0 w-full ${
                  i === activeRegion
                    ? "opacity-100 translate-y-0 blur-0"
                    : "opacity-0 translate-y-8 blur-sm pointer-events-none"
                }`}
              >
                <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                  {region.title}
                </h2>
                <h3 className="text-xl md:text-2xl text-[#E8B44A] mb-4 font-serif italic">
                  {region.subtitle}
                </h3>
                <p className="text-white/60 text-lg leading-relaxed max-w-md mb-8">
                  {region.description}
                </p>
                <button className="group flex items-center gap-3 text-sm uppercase tracking-widest hover:text-[#E8B44A] transition-colors">
                  Discover More
                  <span className="w-8 h-[1px] bg-white/30 group-hover:bg-[#E8B44A] transition-colors" />
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 md:order-2 relative h-full flex items-center justify-center">
          <div
            ref={wheelRef}
            className="relative w-[80vh] h-[80vh] rounded-full border border-white/5"
            style={{ right: "-20%" }}
          >
            {regions.map((region, i) => {
              const angle = i * 90;

              return (
                <div
                  key={region.id}
                  className="absolute top-1/2 left-1/2 w-0 h-0"
                  style={{
                    transform: `rotate(${angle}deg) translate(38vh) rotate(-${angle}deg)`,
                  }}
                >
                  <div className="wheel-counter-rotate w-64 h-80 -ml-32 -mt-40">
                    <div
                      className={`relative w-full h-full rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 group cursor-pointer ${
                        i === activeRegion
                          ? "scale-100 grayscale-0 shadow-[0_0_50px_rgba(232,180,74,0.3)]"
                          : "scale-[0.8] grayscale opacity-30"
                      }`}
                    >
                      <Image
                        src={region.image}
                        alt={region.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                      <div
                        className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 text-white transition-colors duration-500 ${
                          i === activeRegion
                            ? "bg-[#E8B44A] text-black border-[#E8B44A]"
                            : ""
                        }`}
                      >
                        <region.icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-[#E8B44A]/30 flex items-center justify-center animate-pulse-slow pointer-events-none"
            style={{ right: "-20%" }}
          >
            <div className="w-2 h-2 rounded-full bg-[#E8B44A]" />
          </div>
        </div>
      </div>
    </section>
  );
}