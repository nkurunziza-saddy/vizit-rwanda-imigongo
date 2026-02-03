import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Population", value: 14.1, suffix: "M", decimals: 1 },
  { label: "National Parks", value: 3, suffix: "", decimals: 0 },
  { label: "Provinces", value: 5, suffix: "", decimals: 0 },
  { label: "Districts", value: 30, suffix: "", decimals: 0 },
];

export function CountingStats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const items = gsap.utils.toArray(".stat-item");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "center center",
          end: "+=100%",
          pin: true,
          scrub: 1,
        },
      });

      items.forEach((item: any, i) => {
        const valueSpan = item.querySelector(".stat-value");
        const targetValue = stats[i].value;
        const decimals = stats[i].decimals;

        const proxy = { val: 0 };

        tl.to(
          proxy,
          {
            val: targetValue,
            duration: 1,
            ease: "power1.out",
            onUpdate: function () {
              if (valueSpan) {
                valueSpan.innerText =
                  proxy.val.toFixed(decimals) + stats[i].suffix;
              }
            },
          },
          "<", 
        );

        tl.fromTo(
          item.querySelector(".stat-label"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "<",
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="bg-primary text-primary-foreground py-32 h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="container mx-auto px-4 z-10">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black font-serif uppercase tracking-tighter mix-blend-overlay opacity-50">
            By The Numbers
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-item flex flex-col items-center text-center"
            >
              <span className="stat-value text-6xl md:text-8xl font-black font-serif tracking-tighter leading-none block mb-2">
                0
              </span>
              <span className="stat-label text-sm md:text-base font-bold uppercase tracking-widest opacity-80">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/20 to-transparent" />
      </div>
    </div>
  );
}
