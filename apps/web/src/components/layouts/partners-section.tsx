import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { SectionContainer } from "@/components/ui/section";

const partners = [
	{
		name: "Wilderness Safaris",
		src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=300&q=80", // Safari Jeep
	},
	{
		name: "Singita",
		src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80", // Luxury Resort
	},
	{
		name: "African Parks",
		src: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=300&q=80", // Elephants/Sunset
	},
	{
		name: "RwandAir",
		src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80", // Airplane
	},
	{
		name: "Virunga National Park",
		src: "https://images.unsplash.com/photo-1534234828563-025a1d2f60db?auto=format&fit=crop&w=300&q=80", // Gorilla (Representation)
	},
	{
		name: "Serena Hotels",
		src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=300&q=80", // Hotel Building
	},
	{
		name: "&Beyond",
		src: "https://images.unsplash.com/photo-1519092433925-6563982850ea?auto=format&fit=crop&w=300&q=80", // Nature
	},
];

export const PartnersSection = () => {
	return (
		<SectionContainer title="Affiliated Partners">
			<div className="relative border-y bg-linear-to-r from-secondary via-transparent to-secondary py-8">
				<InfiniteSlider gap={48} speed={40} speedOnHover={20}>
					{partners.map((partner) => (
						<div
							key={`partner-${partner.name}`}
							className="flex items-center gap-3 group cursor-pointer"
						>
							<img
								src={partner.src}
								className="h-12 w-20 object-cover rounded-md grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
								alt={partner.name}
								loading="lazy"
								width={80}
								height={48}
							/>
							<span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-wider">
								{partner.name}
							</span>
						</div>
					))}
				</InfiniteSlider>

				<ProgressiveBlur
					blurIntensity={1}
					className="pointer-events-none absolute top-0 left-0 h-full w-[100px] md:w-[160px]"
					direction="left"
				/>
				<ProgressiveBlur
					blurIntensity={1}
					className="pointer-events-none absolute top-0 right-0 h-full w-[100px] md:w-[160px]"
					direction="right"
				/>
			</div>
		</SectionContainer>
	);
};

export default PartnersSection;
