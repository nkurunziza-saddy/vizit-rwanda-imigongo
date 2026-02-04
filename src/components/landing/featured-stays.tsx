import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const stays = [
	{
		id: "bisate",
		name: "Bisate Lodge",
		location: "Volcanoes N.P.",
		description:
			"Nestled in the amphitheatre of an eroded volcanic cone, Bisate offers a luxurious base for gorilla trekking with sustainable architecture.",
		image:
			"https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2600&auto=format&fit=crop", // Luxury lodge vibe
	},
	{
		id: "magashi",
		name: "Magashi Camp",
		location: "Akagera N.P.",
		description:
			"A classic safari camp overlooking Lake Rwanyakazinga, offering exclusive access to Rwanda's only savannah big game area.",
		image:
			"https://images.unsplash.com/photo-1547619292-240402b5ae5d?q=80&w=2600&auto=format&fit=crop", // Safari vibe
	},
	{
		id: "nyungwe",
		name: "Nyungwe House",
		location: "Nyungwe Forest",
		description:
			"Set amidst the rich tea plantations on the edge of the ancient rainforest, offering wellness and chimpanzee trekking.",
		image:
			"https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2600&auto=format&fit=crop", // Forest vibe
	},
];

export function FeaturedStays() {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const container = containerRef.current;
			if (!container) return;

			const items = gsap.utils.toArray(".stay-item");
			const images = gsap.utils.toArray(".stay-image");

			items.forEach((item: any, i: number) => {
				ScrollTrigger.create({
					trigger: item,
					start: "top center",
					end: "bottom center",
					onEnter: () => updateImage(i),
					onEnterBack: () => updateImage(i),
				});
			});

			function updateImage(index: number) {
				images.forEach((img: any, i: number) => {
					if (i === index) {
						gsap.to(img, { opacity: 1, duration: 0.5 });
					} else {
						gsap.to(img, { opacity: 0, duration: 0.5 });
					}
				});
			}
		},
		{ scope: containerRef },
	);

	return (
		<section
			ref={containerRef}
			className="bg-background py-24 md:py-32 relative"
		>
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row gap-12 lg:gap-24">
					<div className="md:w-1/2 h-[50vh] md:h-[80vh] sticky top-24 overflow-hidden rounded-sm">
						{stays.map((stay, i) => (
							<div
								key={stay.id}
								className={cn(
									"stay-image absolute inset-0 w-full h-full bg-black",
									i === 0 ? "opacity-100" : "opacity-0",
								)}
							>
								<img
									src={stay.image}
									alt={stay.name}
									className="w-full h-full object-cover opacity-80"
								/>
								<div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

								<div className="absolute bottom-8 left-8 text-white">
									<p className="text-xs font-mono uppercase tracking-widest text-primary mb-2">
										{stay.location}
									</p>
									<h3 className="text-4xl font-black font-serif uppercase tracking-tight">
										{stay.name}
									</h3>
								</div>
							</div>
						))}
					</div>

					<div className="md:w-1/2 flex flex-col gap-24 py-12 md:py-24">
						<div className="mb-12">
							<span className="text-primary text-xs font-mono uppercase tracking-widest border border-primary/20 px-3 py-1 bg-primary/5">
								Accommodations
							</span>
							<h2 className="text-4xl md:text-6xl font-black font-serif uppercase tracking-tighter mt-6 mb-4 text-foreground">
								Featured <br />{" "}
								<span className="text-foreground/50">Stays</span>
							</h2>
							<p className="text-muted-foreground font-light text-lg">
								We partner with the most exclusive lodges that share our
								commitment to conservation and luxury.
							</p>
						</div>

						{stays.map((stay) => (
							<div
								key={stay.id}
								className="stay-item group cursor-pointer border-l-2 border-foreground/10 pl-8 hover:border-primary transition-colors duration-500 py-4"
							>
								<h3 className="text-3xl font-black uppercase text-foreground mb-4 group-hover:translate-x-2 transition-transform duration-300">
									{stay.name}
								</h3>
								<p className="text-muted-foreground text-lg font-light leading-relaxed mb-6 group-hover:text-foreground transition-colors duration-300">
									{stay.description}
								</p>
								<button
									type="button"
									className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300 delay-75"
								>
									View Lodge <ArrowUpRight className="w-4 h-4" />
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
