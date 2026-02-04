import { createFileRoute } from "@tanstack/react-router";
import { StorySection } from "@/components/landing/story-section";
import { Timeline } from "@/components/landing/timeline";
import { PatternDiamond, PatternZigZag } from "@/components/ui/patterns";
import { Reveal } from "@/components/ui/reveal";

export const Route = createFileRoute("/_app/about")({
	component: AboutPage,
});

function AboutPage() {
	return (
		<div className="bg-background min-h-screen relative">
			<div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<img
						src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop"
						alt="About Vizit Africa"
						className="w-full h-full object-cover grayscale opacity-40"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
				</div>

				<div className="relative z-10 text-center container px-4">
					<Reveal>
						<span className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
							Our Story
						</span>
					</Reveal>
					<Reveal delay={0.1}>
						<h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-foreground mb-6">
							Bridging <br /> Worlds
						</h1>
					</Reveal>
					<Reveal delay={0.2}>
						<div className="h-1 w-24 bg-foreground mx-auto relative overflow-hidden">
							<PatternZigZag className="w-full h-full text-primary absolute inset-0" />
						</div>
					</Reveal>
				</div>
			</div>

			<StorySection
				imageSrc="https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=1974&auto=format&fit=crop"
				category="Origins"
				title={
					<>
						Born from <span className="text-primary">Earth</span>
					</>
				}
				note="Every pattern tells a story. Every journey leaves a mark."
				description={
					<>
						<p className="text-lg font-light leading-relaxed text-foreground/80">
							Imigongo is more than just art; it is a language of resilience.
							Originating from the royal court of Kibungo, this traditional art
							form uses cow dung and ash to create geometric spiral and diamond
							patterns that speak to the rhythm of life in Rwanda.
						</p>
						<p className="text-lg font-light leading-relaxed text-foreground/80">
							At Vizit Africa, we embody this spirit. We believe that true
							luxury lies in the raw, authentic connection to the land and its
							people. Our journeys are designed to reveal the hidden geometries
							of culture, connecting you to the heart of the continent.
						</p>
					</>
				}
			/>

			<section className="py-24 bg-foreground text-white relative overflow-hidden">
				<div className="absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none">
					<PatternDiamond className="w-full h-full" />
				</div>

				<div className="container mx-auto px-4 relative z-10">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
						<Reveal delay={0.1}>
							<div className="space-y-4">
								<span className="text-primary font-mono text-xl font-bold">
									01.
								</span>
								<h3 className="text-3xl font-black uppercase tracking-tight">
									Authenticity
								</h3>
								<p className="text-white/60 font-light leading-relaxed">
									We shun the staged for the real. Every interaction is genuine,
									every smile earned. We connect you with the true custodians of
									culture.
								</p>
							</div>
						</Reveal>
						<Reveal delay={0.2}>
							<div className="space-y-4">
								<span className="text-primary font-mono text-xl font-bold">
									02.
								</span>
								<h3 className="text-3xl font-black uppercase tracking-tight">
									Sustainability
								</h3>
								<p className="text-white/60 font-light leading-relaxed">
									We tread lightly. Our footprint is minimal, but our impact is
									profound. We invest in the communities that host us, ensuring
									a cycle of growth.
								</p>
							</div>
						</Reveal>
						<Reveal delay={0.3}>
							<div className="space-y-4">
								<span className="text-primary font-mono text-xl font-bold">
									03.
								</span>
								<h3 className="text-3xl font-black uppercase tracking-tight">
									Excellence
								</h3>
								<p className="text-white/60 font-light leading-relaxed">
									From the thread count of your sheets to the knowledge of your
									guide, we obsess over details. Luxury is not just comfort; it
									is seamlessness.
								</p>
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			<Timeline />

			<section className="py-24 bg-background">
				<div className="container mx-auto px-4 text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground">
						The Architects
					</h2>
					<p className="text-muted-foreground font-serif text-xl mt-4 max-w-2xl mx-auto">
						The curators, guides, and dreamers who craft your journey.
					</p>
				</div>

				<div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
					{[
						{
							name: "Keza M.",
							role: "Head Curator",
							img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=2574&auto=format&fit=crop",
						},
						{
							name: "David K.",
							role: "Lead Guide",
							img: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=2664&auto=format&fit=crop",
						},
						{
							name: "Sarah L.",
							role: "Experience Design",
							img: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=2572&auto=format&fit=crop",
						},
					].map((member, i) => (
						<Reveal key={i} delay={i * 0.1}>
							<div className="group relative overflow-hidden aspect-[3/4] bg-foreground/5">
								<img
									src={member.img}
									alt={member.name}
									className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
									<span className="text-primary font-mono text-xs uppercase tracking-widest">
										{member.role}
									</span>
									<h3 className="text-white text-3xl font-black uppercase tracking-tight">
										{member.name}
									</h3>
								</div>
							</div>
						</Reveal>
					))}
				</div>
			</section>

			<StorySection
				reversed
				imageSrc="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop"
				category="Vision"
				title={
					<>
						Beyond <span className="text-primary">Tourism</span>
					</>
				}
				description={
					<>
						<p className="text-lg font-light leading-relaxed text-foreground/80">
							We are moving beyond the passive observation of tourism. We invite
							you to participate. To learn the craft, to taste the soil, to
							dance to the beat of the Iningiri.
						</p>
						<p className="text-lg font-light leading-relaxed text-foreground/80">
							Our vision is a connected Africa, where borders blur and culture
							flows freely. Join us as we map the future of travel, one pattern
							at a time.
						</p>
					</>
				}
			/>
		</div>
	);
}
