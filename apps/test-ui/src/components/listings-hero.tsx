'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tree, ForestAccent } from '@/components/forest-elements';

gsap.registerPlugin(ScrollTrigger);

export function ListingsHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    gsap.to(imageRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  }, []);

  return (
    <section ref={heroRef} className="relative pt-32 pb-16 h-[70vh] flex items-center justify-center overflow-hidden">
      <div ref={imageRef} className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop"
          alt="Rwanda Forest"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/30 to-background/20" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-20">
        <Tree size="large" className="absolute top-10 left-5 opacity-40" variant={1} />
        <Tree size="medium" className="absolute top-20 right-10 opacity-35" variant={2} />
        <ForestAccent className="absolute bottom-10 right-1/4 w-96 h-96" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-gold/20 border border-gold/40 backdrop-blur-sm">
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">Explore Rwanda</span>
        </div>
        
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-background mb-6 leading-tight drop-shadow-lg">
          Discover Your Adventure
        </h1>
        
        <p className="text-lg md:text-xl text-background/95 max-w-2xl mx-auto leading-relaxed drop-shadow">
          From misty mountains to serene lakes, from bustling cities to ancient forests. Every experience in Rwanda awaits your discovery.
        </p>
      </div>
    </section>
  );
}
