const images = [
  "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518182170546-07fb612d5c2e?q=80&w=2600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544605159-075b637d4060?q=80&w=2600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=80&w=2600&auto=format&fit=crop",
];

export function ImageMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-12 bg-background z-20">
      <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-r from-background via-transparent to-background" />

      <div className="flex animate-scroll whitespace-nowrap gap-4 md:gap-8">
        {[...images, ...images].map((src, i) => (
          <div
            key={i}
            className="w-[300px] md:w-[450px] aspect-video relative overflow-hidden shrink-0 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer group"
          >
            <img
              src={src}
              alt="Rwanda"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
            animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
