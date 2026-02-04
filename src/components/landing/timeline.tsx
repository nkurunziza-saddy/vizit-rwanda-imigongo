import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { SectionTitle } from "./section-title";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
	{
		year: "KGL",
		title: "The Arrival",
		desc: "Touch down in the heart of Africa. The air is crisp, the streets are spotless.",
		image:
			"https://images.unsplash.com/photo-1687986261123-b17f08f2796c?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
	},
	{
		year: "CLEAN",
		title: "Greenest City",
		desc: "A ban on plastic bags since 2008. Umuganda community work keeps the city pristine.",
		image:
			"https://images.unsplash.com/photo-1756245994848-1eb2be3b9b63?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		year: "ANIMALS",
		title: "Gorillas",
		desc: "Rwanda is one of only two countries in the world where you can trek to see mountain gorillas in the wild. These majestic creatures are critically endangered, and tourism plays a vital role in their conservation.",
		image:
			"https://images.unsplash.com/photo-1590692995294-564cea87a687?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		year: "YOUTH",
		title: "Youth",
		desc: "Rwanda is home to some of the most innovative and forward-thinking youth in Africa. From tech startups to social entrepreneurs, Rwanda is a hub for young talent.",
		image:
			"https://images.unsplash.com/photo-1759720107956-1cbad755e952?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];

export function Timeline() {
	const containerRef = useRef<HTMLDivElement>(null);
	const lineRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const container = containerRef.current;
			if (!container) return;
			gsap.fromTo(
				lineRef.current,
				{ height: "0%" },
				{
					height: "100%",
					ease: "none",
					scrollTrigger: {
						trigger: container,
						start: "top center",
						end: "bottom center",
						scrub: 1,
					},
				},
			);

			const items = gsap.utils.toArray(".timeline-item");
			items.forEach((item: any) => {
				gsap.fromTo(
					item,
					{ opacity: 0, y: 50 },
					{
						opacity: 1,
						y: 0,
						duration: 1,
						scrollTrigger: {
							trigger: item,
							start: "top 80%",
							end: "top 50%",
							scrub: 1,
						},
					},
				);
			});
		},
		{ scope: containerRef },
	);

	return (
		<div
			ref={containerRef}
			className="bg-white py-32 relative overflow-hidden text-foreground"
		>
			<div className="container mx-auto px-4 md:px-12 relative z-10">
				<SectionTitle
					title={
						<>
							Kigali <span className="text-primary">Rising</span>
						</>
					}
					subtitle="Your journey begins in the cleanest city in Africa."
					tooltip={
						<div className="flex flex-col gap-1">
							<h4 className="font-bold uppercase tracking-widest text-primary text-xs">
								Ishema (Pride)
							</h4>
							<p className="text-white/80 font-light text-xs leading-relaxed">
								Reflecting *Amahindu* (burnt earth) construction. A symbol of
								resilience and lasting strength.
							</p>
						</div>
					}
				/>

				<div className="relative max-w-5xl mx-auto">
					<div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-foreground/10 -translate-x-1/2 hidden md:block" />
					<div
						ref={lineRef}
						className="absolute left-0 md:left-1/2 top-0 w-1 bg-primary -translate-x-1/2 hidden md:block origin-top"
					/>

					<div className="space-y-24">
						{timelineEvents.map((event, i) => (
							<div
								key={i}
								className={`timeline-item flex flex-col md:flex-row gap-12 md:gap-24 items-center ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}
							>
								<div
									className={`flex-1 ${i % 2 === 0 ? "text-left md:text-right" : "text-left"}`}
								>
									<span className="text-6xl font-[Caveat] text-primary/30 leading-none block mb-4">
										{event.year}
									</span>
									<h3 className="text-3xl font-black uppercase tracking-tighter mb-4">
										{event.title}
									</h3>
									<p className="text-lg text-foreground/70 font-serif leading-relaxed">
										{event.desc}
									</p>
								</div>

								<div className="w-4 h-4  bg-primary shrink-0 relative z-10 hidden md:block ring-4 ring-white"></div>

								<div className="flex-1">
									<div className="aspect-4/3 w-full overflow-hidden bg-zinc-100 relative group">
										<div className="absolute inset-0 border-4 border-white z-10 opacity-50" />
										<img
											src={event.image}
											alt={event.title}
											className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] filter grayscale group-hover:grayscale-0"
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
