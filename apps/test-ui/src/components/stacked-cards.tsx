'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface StackedCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  href: string;
  region: string;
  color: string;
}

export function StackedCardsSection({ 
  cards,
  title,
  description,
}: { 
  cards: StackedCard[];
  title: string;
  description: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = cardsRef.current;
    const container = containerRef.current;

    cards.forEach((card, index) => {
      const delay = index * 0.1;
      
      gsap.fromTo(
        card,
        {
          y: 100,
          opacity: 0,
          scale: 0.95,
          rotationZ: -2 + Math.random() * 4,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationZ: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: `top center+=${index * 100}px`,
            end: `center center-=${index * 50}px`,
            scrub: 0.5,
            markers: false,
          },
        }
      );

      gsap.to(card, {
        y: -index * 20,
        z: index * 10,
        duration: 0.5,
        scrollTrigger: {
          trigger: container,
          start: `${index * 200}px center`,
          end: `${(index + 1) * 200}px center`,
          scrub: true,
          markers: false,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="relative py-20 px-4 md:px-8" ref={containerRef}>
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-forest blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-terracotta blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-forest mb-6 text-balance">
            {title}
          </h2>
          <p className="text-lg text-forest/70 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="relative h-[600px] md:h-[800px] perspective">
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl"
              style={{
                transformStyle: 'preserve-3d',
              } as React.CSSProperties}
            >
              <div className="absolute inset-0 flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/2 relative overflow-hidden">
                  <Image
                    src={card.image || "/placeholder.svg"}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-forest/30 to-transparent" />
                </div>

                <div className={`w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-cream via-cream to-cream/90`}>
                  <div className="inline-block w-fit mb-4">
                    <span className="text-sm font-semibold text-terracotta uppercase tracking-wider px-3 py-1 rounded-full bg-terracotta/10">
                      {card.region}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-forest mb-2">
                    {card.title}
                  </h3>
                  
                  <p className="text-lg text-forest/60 mb-2 font-medium">
                    {card.subtitle}
                  </p>

                  <p className="text-forest/70 leading-relaxed mb-8 mt-4">
                    {card.description}
                  </p>

                  <Link
                    href={card.href}
                    className="inline-block w-fit px-8 py-3 bg-terracotta text-cream rounded-lg font-semibold hover:bg-terracotta-light transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                  >
                    Explore & Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-sm text-forest/50 font-medium tracking-widest uppercase">
            ↓ Scroll to discover more
          </p>
        </div>
      </div>
    </section>
  );
}

export function DiscoveryCard({
  card,
  index,
}: {
  card: StackedCard;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom-=100px',
          end: 'center center',
          scrub: 0.3,
          markers: false,
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group rounded-lg overflow-hidden bg-card hover:shadow-xl transition-all duration-500 hover:translate-y-[-4px]"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={card.image || "/placeholder.svg"}
          alt={card.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent" />
        <span className="absolute top-4 right-4 text-xs font-bold text-cream bg-terracotta/90 px-3 py-1 rounded-full">
          {card.region}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-forest mb-1">
          {card.title}
        </h3>
        <p className="text-sm text-forest/60 mb-3">
          {card.subtitle}
        </p>
        <p className="text-sm text-forest/70 line-clamp-2 mb-4">
          {card.description}
        </p>
        <Link
          href={card.href}
          className="text-terracotta hover:text-terracotta-light font-semibold text-sm inline-flex items-center gap-2 transition-colors"
        >
          Learn More
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
