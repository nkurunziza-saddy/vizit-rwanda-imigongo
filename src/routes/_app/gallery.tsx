import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { SectionTitle } from "@/components/landing/section-title";
import { PatternDiamond, PatternZigZag } from "@/components/ui/patterns";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/gallery")({
	component: GalleryPage,
});

const galleryItems = [
	{
		src: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2600&auto=format&fit=crop",
		title: "Terraced Hills",
		location: "Gicumbi",
		category: "Landscape",
	},
	{
		src: "https://images.unsplash.com/photo-1544605159-075b637d4060?q=80&w=2670&auto=format&fit=crop",
		title: "Silverback Gaze",
		location: "Volcanoes NP",
		category: "Wildlife",
	},
	{
		src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop",
		title: "Tea Plantations",
		location: "Nyungwe",
		category: "Nature",
	},
	{
		src: "https://images.unsplash.com/photo-1532798369041-b333486e1e82?q=80&w=2600&auto=format&fit=crop",
		title: "Intore Dancers",
		location: "Nyanza",
		category: "Culture",
	},
	{
		src: "https://images.unsplash.com/photo-1628175787679-5095e1eb2465?q=80&w=2670&auto=format&fit=crop",
		title: "Kigali Convention",
		location: "Kigali",
		category: "City",
	},
	{
		src: "https://images.unsplash.com/photo-1617308722744-93ff93b048d0?q=80&w=2574&auto=format&fit=crop",
		title: "Lake Kivu Sunset",
		location: "Rubavu",
		category: "Landscape",
	},
	{
		src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop",
		title: "Canopy Walkway",
		location: "Nyungwe",
		category: "Nature",
	},
	{
		src: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop",
		title: "Coffee Harvest",
		location: "Huye",
		category: "Culture",
	},
	{
		src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop",
		title: "Akagera Savanna",
		location: "Akagera",
		category: "Wildlife",
	},
];

const categories = [
	"All",
	"Landscape",
	"Wildlife",
	"Nature",
	"Culture",
	"City",
];

function GalleryPage() {
	const containerRef = useRef(null);
	const [activeCategory, setActiveCategory] = useState("All");

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	});
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

	const filteredItems = useMemo(() => {
		if (activeCategory === "All") return galleryItems;
		return galleryItems.filter((item) => item.category === activeCategory);
	}, [activeCategory]);

	return (
		<div className="bg-background min-h-screen relative flex flex-col">
			<div
				ref={containerRef}
				className="relative h-[60vh] overflow-hidden flex items-center justify-center border-b border-foreground"
			>
				<motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
					<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=3474&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-20" />
				</motion.div>

				<div className="relative z-10 text-center container px-4">
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<PatternDiamond className="w-16 h-16 text-primary mx-auto mb-6" />
					</motion.div>
					<h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground mb-4">
						Visual <br className="md:hidden" /> Journey
					</h1>
					<p className="text-foreground/60 font-serif text-xl md:text-2xl max-w-2xl mx-auto">
						Glimpses of the soul of Rwanda. From the mist of the volcanoes to
						the vibrant rhythm of the city.
					</p>
				</div>
			</div>

			<main className="flex-grow py-24 container mx-auto px-4 max-w-7xl relative z-10">
				<SectionTitle
					title={
						<>
							Curated <span className="text-primary">Moments</span>
						</>
					}
					subtitle="Captured in time, preserved in memory."
				/>

				<div className="flex flex-wrap justify-center gap-4 mb-16">
					{categories.map((cat) => (
						<button
							type="button"
							key={cat}
							onClick={() => setActiveCategory(cat)}
							className={cn(
								"text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 border transition-all duration-300",
								activeCategory === cat
									? "border-primary text-primary bg-primary/5"
									: "border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/20",
							)}
						>
							{cat}
						</button>
					))}
				</div>

				<motion.div
					layout
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					<AnimatePresence mode="popLayout">
						{filteredItems.map((item) => (
							<motion.div
								layout
								key={item.src}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.3 }}
								className="group cursor-pointer"
							>
								<div className="relative overflow-hidden aspect-[3/4] border-2 border-transparent hover:border-primary transition-colors duration-500 bg-foreground/5">
									<div className="absolute inset-0 p-2">
										<div className="w-full h-full relative overflow-hidden">
											<img
												src={item.src}
												alt={item.title}
												className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
											/>
											<div className="absolute inset-0 bg-foreground/20 group-hover:opacity-0 transition-opacity duration-500" />
										</div>
									</div>

									<div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-foreground text-white z-20">
										<span className="text-primary text-xs font-bold uppercase tracking-widest block mb-1">
											{item.category}
										</span>
										<h3 className="text-xl font-bold uppercase tracking-wide">
											{item.title}
										</h3>
										<div className="flex items-center justify-between mt-2 text-white/60 text-sm">
											<div className="flex items-center gap-2">
												<PatternZigZag className="w-4 h-2" />
												{item.location}
											</div>
											<ArrowUpRight className="w-4 h-4 text-primary" />
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>

				<div className="mt-24 text-center">
					<p className="text-muted-foreground font-serif italic mb-6">
						Have your own story to tell?
					</p>
					<button
						type="button"
						className="text-xs font-bold uppercase tracking-widest border-b border-primary text-primary hover:text-foreground hover:border-foreground transition-colors pb-1"
					>
						Share your experience
					</button>
				</div>
			</main>
		</div>
	);
}
