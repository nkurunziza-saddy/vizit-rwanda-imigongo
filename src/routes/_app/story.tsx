import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CinematicReveal } from "@/components/landing/cinematic-reveal";
import { CountingStats } from "@/components/landing/counting-stats";
import { DramaticQuote } from "@/components/landing/dramatic-quote";
import { FactGrid } from "@/components/landing/fact-grid";
import { HorizontalScroll } from "@/components/landing/horizontal-scroll";
import { PatternDecoder } from "@/components/landing/pattern-decoder";
import { StorySection } from "@/components/landing/story-section";
import { TextRevealScroll } from "@/components/landing/text-reveal-scroll";
import { Timeline } from "@/components/landing/timeline";
import { Button } from "@/components/ui/button";
import { PatternZigZag } from "@/components/ui/patterns";

export const Route = createFileRoute("/_app/story")({
	component: RwandaStoryPage,
});

function RwandaStoryPage() {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const ghostTextY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

	return (
		<div
			ref={containerRef}
			className="bg-background min-h-screen flex flex-col relative overflow-hidden"
		>
			<motion.div
				style={{ y: ghostTextY }}
				className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-[0.03]"
			>
				<span className="fixed top-[20%] -left-[10%] text-[40vw] font-black text-foreground leading-none whitespace-nowrap">
					RWANDA
				</span>
			</motion.div>

			<main className="grow relative">
				<div className="relative min-h-[110vh] w-full flex flex-col justify-end pb-32 overflow-hidden bg-foreground">
					<div className="absolute inset-0 z-0">
						<img
							src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2600&auto=format&fit=crop"
							alt="Rwanda Hills"
							className="w-full h-full object-cover grayscale-40 contrast-125 brightness-50"
						/>
						<div className="absolute inset-0 bg-linear-to-t from-foreground via-transparent to-transparent" />
					</div>

					<div className="relative z-10 container mx-auto px-4 max-w-7xl">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 0.5 }}
							className="mb-8"
						>
							<span className="text-primary uppercase tracking-[0.5em] text-sm font-bold pl-1">
								Welcome to
							</span>
						</motion.div>

						<h1 className="text-7xl md:text-[10rem] leading-[0.8] font-black text-white uppercase tracking-tighter mb-8 overflow-hidden">
							<motion.span
								initial={{ y: "100%" }}
								animate={{ y: 0 }}
								transition={{
									duration: 1,
									ease: [0.21, 0.47, 0.32, 0.98],
									delay: 0.8,
								}}
								className="block"
							>
								The Land
							</motion.span>
							<motion.span
								initial={{ y: "100%" }}
								animate={{ y: 0 }}
								transition={{
									duration: 1,
									ease: [0.21, 0.47, 0.32, 0.98],
									delay: 0.9,
								}}
								className="block text-white/50"
							>
								of Thousand
							</motion.span>
							<motion.span
								initial={{ y: "100%" }}
								animate={{ y: 0 }}
								transition={{
									duration: 1,
									ease: [0.21, 0.47, 0.32, 0.98],
									delay: 1,
								}}
								className="block text-primary"
							>
								Hills
							</motion.span>
						</h1>

						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1, delay: 1.5 }}
							className="max-w-2xl text-white/80 text-xl font-light leading-relaxed border-l-2 border-white/20 pl-8"
						>
							Rwanda is a country of breathtaking scenery, known for its
							cleanliness, safety, and the remarkable resilience of its people.
						</motion.p>
					</div>
				</div>

				<TextRevealScroll
					text="In the heart of Africa, a transformation has taken place. From the ashes of history, a green, vibrant, and unified nation has emerged. This is not just a story of survival, but a masterclass in resilience."
					className="bg-background"
				/>

				<FactGrid />

				<CountingStats />

				<Timeline />

				<StorySection
					category="NATURE"
					imageSrc="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2600&auto=format&fit=crop"
					title={
						<>
							Geography <br />
							<span className="text-white/50">& Nature</span>
						</>
					}
					description={
						<>
							<p className="text-2xl font-light leading-relaxed text-white/90">
								From the volcanic peaks of the Virungas to the shores of Lake
								Kivu.
							</p>
							<div className="text-lg text-white/60 leading-relaxed grid gap-4">
								<p>
									The altitude ranges from 950m to the 4,507m peak of Mount
									Karisimbi. This topography creates a temperate tropical
									highland climate, with the famous gorillas roaming free in the
									Volcanoes National Park.
								</p>
								<p>
									Akagera National Park offers a savannah teeming with the Big
									Five, while Nyungwe Forest protects ancient chimpanzee
									populations.
								</p>
							</div>
						</>
					}
					note="Visit in June-Sept for trekking"
				/>

				<CinematicReveal />

				<HorizontalScroll />
				<PatternDecoder />

				<DramaticQuote
					quote="In Rwanda, we have decided to define ourselves not by our past, but by our potential."
					author="Paul Kagame"
					subAuthor="President of the Republic of Rwanda"
				/>

				<StorySection
					category="CULTURE"
					reversed
					imageSrc="https://images.unsplash.com/photo-1532798369041-b333486e1e82?q=80&w=2600&auto=format&fit=crop"
					title={
						<>
							People <br />
							<span className="text-primary">& Spirit</span>
						</>
					}
					description={
						<>
							<p className="text-2xl font-light leading-relaxed text-white/90">
								"Ndi Umunyarwanda" — I am Rwandan.
							</p>
							<div className="text-lg text-white/60 leading-relaxed grid gap-4">
								<p>
									Rwanda draws on its culture to solve modern challenges.{" "}
									<strong>Umuganda</strong> brings communities together every
									month to clean neighborhoods, making Rwanda one of the
									cleanest nations on earth.
								</p>
								<p>
									From the warrior dance of <strong>Intore</strong> to the
									geometric <strong>Imigongo</strong> art made from nature
									itself, tradition is the foundation of the future.
								</p>
							</div>
						</>
					}
					note="Median Age: 22.7 years"
				/>

				<StorySection
					category="RESILIENCE"
					imageSrc="https://images.unsplash.com/photo-1518182170546-07fb612d5c2e?q=80&w=2600&auto=format&fit=crop"
					title={
						<>
							History <br />
							<span className="text-white/50">& Hope</span>
						</>
					}
					description={
						<>
							<p className="text-2xl font-light leading-relaxed text-white/90">
								Unity, Work, Patriotism.
							</p>
							<div className="text-lg text-white/60 leading-relaxed grid gap-4">
								<p>
									Following the tragedy of the 1994 Genocide against the Tutsi,
									Rwanda has risen with a focus on unity and reconciliation. The
									Kigali Genocide Memorial stands as a testament to the past and
									a promise for the future.
								</p>
								<p>
									Today, Rwanda is a beacon of development, gender equality, and
									innovation in Africa.
								</p>
							</div>
						</>
					}
				/>

				<div className="bg-white py-32 border-t border-foreground text-center relative overflow-hidden group">
					<div className="absolute inset-0 opacity-10 pointer-events-none">
						<PatternZigZag className="w-full h-full text-foreground scale-150 rotate-12" />
					</div>

					<div className="relative z-10 container mx-auto">
						<h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
							Experience it <br />
							<span className="text-primary">Yourself</span>
						</h2>
						<p className="max-w-xl mx-auto text-xl text-foreground/70 mb-12 font-serif">
							The land of a thousand hills is waiting for your story.
						</p>
						<Button className="px-16 py-6 bg-foreground text-white font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all duration-300 transform hover:scale-105 h-auto rounded">
							Book Your Expedition
						</Button>
					</div>
				</div>
			</main>
		</div>
	);
}
