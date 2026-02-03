import { Hero } from "@/components/landing/hero";

import { Affiliations } from "@/components/landing/affiliations";
import { CTA } from "@/components/landing/cta";
import { ParallaxSection } from "@/components/landing/parallax-section";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/ui/reveal";
import { CuratorNote } from "@/components/landing/curator-note";
import { ExperienceCard } from "@/components/experience-card";
import { PatternZigZag } from "@/components/ui/patterns";
import { BentoGrid } from "@/components/landing/bento-grid";
import { ImageMarquee } from "@/components/landing/image-marquee";
import { DestinationAccordion } from "@/components/landing/destination-accordion";
import { EditorialTestimonials } from "@/components/landing/editorial-testimonials";
import { FeaturedStays } from "@/components/landing/featured-stays";
import { TravelJournal } from "@/components/landing/travel-journal";
import { PageNavigator } from "@/components/ui/page-navigator";
import { ChapterHeader } from "@/components/ui/chapter-header";
import { ChapterDivider } from "@/components/ui/chapter-divider";
export const Route = createFileRoute("/_app/")({
  component: IndexPage,
});
function IndexPage() {
  return (
    <div className="relative bg-background min-h-screen">
      <PageNavigator />

      {/* Prologue: hero & marquee list */}
      <div id="prologue" className="relative">
        <Hero />
        <ImageMarquee />
      </div>

      {/* Chapter I: the cconcierge */}
      <div id="concierge" className="py-24 bg-background">
        <ChapterHeader number="01" title="The Concierge" />
        <Affiliations />
        <BentoGrid />
      </div>

      {/* Chapter II: the land */}
      <div id="land" className="bg-foreground text-white">
        <div className="pt-24">
          <ChapterHeader number="02" title="The Land" theme="dark" />
        </div>
        <DestinationAccordion />
      </div>

      {/* Chapter III: the sanctuary */}
      <div id="sanctuary" className="bg-background">
        <div className="pt-24">
          <ChapterHeader number="03" title="The Sanctuary" />
        </div>
        <FeaturedStays />
      </div>

      {/* Chapter IV: the community & experience */}
      <div id="community" className="bg-background relative">
        <ChapterDivider text="The Community" theme="light" />

        <div className="pt-24">
          <ChapterHeader number="04" title="The Community" />
        </div>

        <EditorialTestimonials />

        <ChapterDivider
          text="Travel Journal"
          theme="light"
          className="border-t-0 border-b"
        />

        <TravelJournal />

        <ChapterDivider text="Experiences" theme="light" />

        <section className="container mx-auto px-4 py-24">
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="text-primary font-mono text-xs uppercase tracking-widest mb-4">
              Discover
            </span>
            <h2 className="text-4xl md:text-5xl font-black font-serif uppercase tracking-tighter text-foreground">
              Popular Experiences
            </h2>
            <div className="h-1 w-24 bg-foreground mt-6 relative overflow-hidden">
              <PatternZigZag className="w-full h-full text-primary absolute inset-0" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Standard Item */}
            <div className="relative">
              <Reveal delay={0.1}>
                <ExperienceCard
                  title="Volcanoes National Park Trek"
                  price="$1500"
                  imageSrc="https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=1974&auto=format&fit=crop"
                  rating={5.0}
                  reviews={204}
                  duration="2d"
                  location="Musanze"
                  className="h-full"
                >
                  A once-in-a-lifetime encounter with the majestic mountain
                  gorillas in their natural habitat.
                </ExperienceCard>
              </Reveal>
              <CuratorNote
                note="Limited permits available daily"
                className="top-4 right-4 translate-x-1/4 -rotate-6 z-30"
                arrowDirection="down"
              />
            </div>

            <Reveal delay={0.2}>
              <ExperienceCard
                title="Kigali Street Art Walk"
                price="$45"
                imageSrc="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop"
                rating={4.9}
                reviews={86}
                duration="3h"
                location="Nyamirambo"
              >
                Discover the vibrant murals and hidden galleries of Kigali's
                most colorful neighborhood with a local artist.
              </ExperienceCard>
            </Reveal>

            <ExperienceCard
              title="Lake Kivu Kayak Adventure"
              price="$60"
              imageSrc="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
              rating={4.7}
              reviews={42}
              duration="4h"
              location="Gisenyi"
            >
              Paddle through the serene waters of Lake Kivu and watch the sunset
              over the singing fishermen.
            </ExperienceCard>

            <ExperienceCard
              title="Akagera Game Drive"
              price="$120"
              imageSrc="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop"
              rating={4.8}
              reviews={115}
              duration="1d"
              location="Akagera"
            >
              Spot the Big Five in Rwanda's only savannah park with experienced
              guides.
            </ExperienceCard>

            <ExperienceCard
              title="Cultural Village Visit"
              price="$35"
              imageSrc="https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=80&w=2070&auto=format&fit=crop"
              rating={4.6}
              reviews={55}
              duration="5h"
              location="Musanze"
            >
              Experience traditional Rwandan life, dance, and archery at the
              Iby'Iwacu Cultural Village.
            </ExperienceCard>

            <ExperienceCard
              title="Coffee Plantation Tour"
              price="$25"
              imageSrc="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop"
              rating={4.9}
              reviews={92}
              duration="3h"
              location="Huye"
            >
              Trace the journey of the coffee bean from the crop to the cup in
              the heart of Rwanda's coffee region.
            </ExperienceCard>
          </div>
        </section>
      </div>

      <ParallaxSection />

      <section className="container mx-auto px-4 py-24 relative overflow-hidden">
        <div className="relative z-10 mb-12">
          <h2 className="text-4xl md:text-5xl font-black font-serif uppercase tracking-tighter ">
            Curated Journeys
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/20 border border-white/20">
          <div className="relative group overflow-hidden bg-black h-96">
            <img
              src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop"
              alt="Cultural"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 border border-white/10 m-2">
              <span className="text-primary text-xs font-mono uppercase tracking-widest mb-2">
                Heritage
              </span>
              <h3 className="text-4xl text-white font-black font-serif uppercase tracking-tighter">
                Cultural Deep Dive
              </h3>
            </div>
          </div>
          <div className="relative group overflow-hidden bg-black h-96">
            <img
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop"
              alt="Adventure"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 border border-white/10 m-2">
              <span className="text-primary text-xs font-mono uppercase tracking-widest mb-2">
                Adventure
              </span>
              <h3 className="text-4xl text-white font-black font-serif uppercase tracking-tighter">
                Highland Trekking
              </h3>
            </div>
          </div>
        </div>
      </section>

      <CTA />

      <section className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black font-serif uppercase tracking-tighter text-foreground mb-4">
            Frequently Asked
          </h2>
        </div>

        <Accordion className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Do I need a visa to visit Rwanda?
            </AccordionTrigger>
            <AccordionContent>
              Most nationalities can obtain a visa upon arrival in Rwanda.
              However, we recommend checking the latest entry requirements on
              the official government migration website before your trip.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it safe to travel solo?</AccordionTrigger>
            <AccordionContent>
              Rwanda is ranked as one of the safest countries in the world. Solo
              travelers, including women, frequently report feeling safe and
              welcomed throughout the country.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is the best time to visit?</AccordionTrigger>
            <AccordionContent>
              Rwanda is a year-round destination. The long dry season from June
              to September is the best time for tracking gorillas. The wet
              seasons offer lush scenery and better birdwatching.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Are these tours suitable for children?
            </AccordionTrigger>
            <AccordionContent>
              Many of our cultural experiences and city tours are
              family-friendly. However, gorilla trekking has a minimum age limit
              of 15 years.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
