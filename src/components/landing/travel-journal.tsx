import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "A Chef's Guide to Kigali",
    category: "Dining",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Gorilla Trekking Etiquette",
    category: "Guide",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1544605159-075b637d4060?q=80&w=2600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "The Art of Imigongo",
    category: "Culture",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1532798369041-b333486e1e82?q=80&w=2600&auto=format&fit=crop", // Placeholder for art
  },
  {
    id: 4,
    title: "Packing for the Rainforest",
    category: "Travel Tips",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2600&auto=format&fit=crop",
  },
];

export function TravelJournal() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 bg-foreground border-y border-white/10 relative overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-4 mb-16 flex items-end justify-between">
        <div>
          <h2 className="text-4xl md:text-5xl font-black font-serif uppercase tracking-tighter text-white mb-2">
            The Journal
          </h2>
          <p className="text-white/60 font-mono text-sm uppercase tracking-widest">
            Curated stories from the field
          </p>
        </div>

        <button
          type="button"
          className="hidden md:flex items-center gap-2 text-white/80 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest"
        >
          View All Stories <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Horizontal Scroll Area */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-8 px-4 md:px-12 pb-12 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex-none w-[300px] md:w-[400px] snap-center group cursor-pointer"
          >
            <div className="aspect-[4/5] relative overflow-hidden bg-black/50 mb-6">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 text-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                  {article.category}
                </span>
              </div>
            </div>

            <div className="pr-4">
              <h3 className="text-2xl font-bold font-serif text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <span className="text-white/40 text-xs font-mono uppercase tracking-widest">
                {article.readTime}
              </span>
            </div>
          </div>
        ))}

        {/* Spacer */}
        <div className="flex-none w-12" />
      </div>
    </section>
  );
}
