import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { PatternVerticalDiamond } from "../ui/patterns";
import { SectionTitle } from "./section-title";

gsap.registerPlugin(ScrollTrigger);

const parks = [
	{
		title: "Volcanoes",
		subtitle: "Home of the Mountain Gorilla",
		image:
			"https://images.unsplash.com/photo-1723036123249-1955f57f6d8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
		desc: "A chain of dormant volcanoes forming a sanctuary for the gentle giants.",
		id: "01",
	},
	{
		title: "Akagera",
		subtitle: "Where the Savannah Roars",
		image:
			"https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop",
		desc: "Rwanda's only Big Five park, a conservation miracle of wetlands and plains.",
		id: "02",
	},
	{
		title: "Nyungwe",
		subtitle: "The Ancient Rainforest",
		image:
			"https://images.unsplash.com/photo-1444090542259-0af8fa96557e?q=80&w=2070&auto=format&fit=crop",
		desc: "One of Africa's oldest rainforests, home to chimpanzees and canopy walks.",
		id: "03",
	},
	{
		title: "Gishwati",
		subtitle: "A Forest Reborn",
		image:
			"https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop",
		desc: "A symbol of restoration, this reserve protects primates and biodiversity.",
		id: "04",
	},
];

export function HorizontalScroll() {
	const sectionRef = useRef<HTMLElement>(null);
	const sliderRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const slider = sliderRef.current;
			if (!slider) return;

			const totalScroll = slider.scrollWidth - window.innerWidth;

			gsap.to(slider, {
				x: () => -totalScroll,
				ease: "none",
				scrollTrigger: {
					trigger: sectionRef.current,
					pin: true,
					scrub: 1,
					end: () => `+=${slider.scrollWidth}`,
					invalidateOnRefresh: true,
				},
			});
		},
		{ scope: sectionRef },
	);

	return (
		<section
			ref={sectionRef}
			className="relative overflow-hidden bg-foreground h-screen"
		>
			<div ref={triggerRef} className="h-full flex flex-col justify-center">
				<div className="px-12 mb-12 flex flex-col z-10 relative">
					<SectionTitle
						title={
							<>
								The Great <span className="text-primary">Parks</span>
							</>
						}
						subtitle="A journey through the varied and majestic landscapes of the rift valley."
						align="left"
						theme="dark"
						className="mb-0"
						tooltip={
							<div className="flex flex-col gap-1">
								<h4 className="font-bold uppercase tracking-widest text-primary text-xs">
									Isi (The Earth)
								</h4>
								<p className="text-white/80 font-light text-xs leading-relaxed">
									Protected lands. Material: *Ibyatsi* (grass) and *Inkwi*
									(wood), representing the organic flow of nature.
								</p>
							</div>
						}
					/>
				</div>

				<div ref={sliderRef} className="flex gap-8 items-center px-12 w-max">
					{parks.map((park) => (
						<div
							key={park.id}
							className="group relative h-[60vh] w-[85vw] md:w-[600px] shrink-0 overflow-hidden bg-zinc-900 border border-white/10"
						>
							<div className="absolute inset-0 overflow-hidden">
								<img
									src={park.image}
									alt={park.title}
									className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02] grayscale group-hover:grayscale-0"
								/>
								<div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
							</div>

							<div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
								<span className="text-[8rem] md:text-[12rem] font-[Caveat] text-white/5 absolute top-0 right-0 leading-none group-hover:text-primary/20 transition-colors duration-500">
									{park.id}
								</span>

								<div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
									<span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
										{park.subtitle}
									</span>
									<h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4">
										{park.title}
									</h3>
									<p className="text-white/80 font-light text-base leading-relaxed border-l-2 border-primary pl-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 hidden md:block">
										{park.desc}
									</p>
								</div>
							</div>
						</div>
					))}

					<div className="h-[60vh] w-[400px] shrink-0 flex items-center justify-center border-l border-white/10 opacity-50 pr-24">
						<div className="text-center">
							<PatternVerticalDiamond className="w-24 h-96 text-primary mx-auto mb-8" />
							<span className="text-white text-3xl font-bold uppercase tracking-widest block">
								End of <br /> Expedition
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
