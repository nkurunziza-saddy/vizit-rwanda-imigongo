import { createFileRoute } from "@tanstack/react-router";
import { ImigongoContainer } from "bordered-ui/components/ImigongoContainer";
import { ImigongoCard } from "bordered-ui/components/ImigongoCard";
import { ImigongoSection } from "bordered-ui/components/ImigongoSection";
import { PatternZigZag } from "bordered-ui/components/ImigongoPatterns";

export const Route = createFileRoute("/imigongo")({
  component: ImigongoPage,
});

import { ImigongoHeader } from "bordered-ui/components/ImigongoHeader";
import { ImigongoFooter } from "bordered-ui/components/ImigongoFooter";

function ImigongoPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <ImigongoHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative pt-20 pb-16 overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-4 bg-imigongo-ochre/10">
            <PatternZigZag className="w-full h-full text-imigongo-black opacity-20" />
          </div>

          <div className="container mx-auto px-4 text-center">
            <span className="inline-block py-1 px-3 border border-imigongo-black text-xs font-bold uppercase tracking-widest mb-4 bg-imigongo-ochre text-white">
              Premium experience
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter text-imigongo-black">
              Discover{" "}
              <span className="text-imigongo-ochre underline decoration-wavy decoration-4">
                Rwanda
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-imigongo-black/70 max-w-2xl mx-auto mb-10 font-medium">
              Immerse yourself in the culture with our curated tours and
              experiences.
            </p>
          </div>
        </div>

        <ImigongoSection title="Upcoming Events" patternPosition="top">
          <ImigongoContainer variant="zigzag" className="mt-8 bg-white/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ImigongoCard
                title="Kigali Art Walk"
                price="$45"
                imageSrc="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop"
                badge="Popular"
              >
                Explore the vibrant street art and galleries of Nyamirambo.
              </ImigongoCard>

              <ImigongoCard
                title="Coffee Masterclass"
                price="$30"
                imageSrc="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop"
              >
                Learn the journey from bean to cup with expert baristas.
              </ImigongoCard>

              <ImigongoCard
                title="Traditional Dance"
                price="$60"
                imageSrc="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=668&auto=format&fit=crop"
                badge="Selling Fast"
              >
                An evening of Intore dance and drumming performances.
              </ImigongoCard>
            </div>
          </ImigongoContainer>
        </ImigongoSection>

        <ImigongoSection
          className="bg-imigongo-black text-white"
          patternPosition="bottom"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center py-12">
            <div>
              <h2 className="text-4xl font-black mb-6 uppercase">
                The Imigongo Story
              </h2>
              <p className="text-lg opacity-90 leading-relaxed mb-6">
                Originating from the Kibungo province, Imigongo art is a
                traditional form created using cow dung and natural pigments.
                The geometric patterns—zigzags, spirals, and diamonds—represent
                the topography and everyday life of Rwanda.
              </p>
              <button className="px-8 py-3 bg-imigongo-ochre text-white font-bold uppercase tracking-wider border-2 border-white hover:bg-white hover:text-imigongo-black transition-colors">
                Learn More
              </button>
            </div>
            <div className="relative aspect-square md:aspect-video border-4 border-white">
              <div className="absolute inset-0 bg-imigongo-ochre/20 z-0"></div>
              <PatternZigZag className="absolute top-1/2 left-0 w-full text-white/10 -translate-y-1/2 scale-150 rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-black opacity-20">ART</span>
              </div>
            </div>
          </div>
        </ImigongoSection>
      </main>
      <ImigongoFooter />
    </div>
  );
}
