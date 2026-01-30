"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unsplashImages } from "@/lib/images";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function ImmersiveHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(".hero-text-container", {
        scale: 10,
        opacity: 0,
        filter: "blur(20px)",
        ease: "power2.in",
        duration: 1,
      }, 0)
      .to(".hero-image-container", {
        scale: 1.5,
        ease: "power2.inOut",
        duration: 1,
      }, 0)
      .to(".hero-overlay", {
        opacity: 0,
        duration: 0.5,
      }, 0.1);

      const entryTl = gsap.timeline({ delay: 0.5 });
      entryTl
        .from(".hero-char", {
          y: 100,
          opacity: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
        })
        .from(".hero-sub", {
          y: 20,
          opacity: 0,
          duration: 1,
        }, "-=0.5");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#0A0E0D] flex items-center justify-center"
    >
      <div className="hero-image-container absolute z-0 w-[40vw] h-[60vh] rounded-2xl overflow-hidden shadow-2xl origin-center">
        <Image
          src={unsplashImages.hero}
          alt="Rwanda Landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="hero-overlay absolute inset-0 bg-black/40 z-10" />
      </div>

      <div className="hero-text-container relative z-20 text-center px-4 mix-blend-difference text-white">
        <p className="hero-sub text-[#E8B44A] tracking-[0.3em] uppercase text-sm md:text-base mb-6 font-medium">
          The Heart of Africa
        </p>
        <h1 className="font-serif text-[clamp(4rem,15vw,12rem)] leading-[0.8] font-bold tracking-tighter mb-8 overflow-hidden">
          {"RWANDA".split("").map((char, i) => (
            <span key={i} className="hero-char inline-block">
              {char}
            </span>
          ))}
        </h1>
        <div className="hero-sub flex flex-col items-center gap-4">
          <p className="text-white/80 max-w-md mx-auto text-lg font-light leading-relaxed">
            A journey that begins with a single step into the extraordinary.
          </p>
          <div className="mt-8 animate-bounce">
            <ArrowDown className="w-6 h-6 text-white/50" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-50" />
    </section>
  );
}