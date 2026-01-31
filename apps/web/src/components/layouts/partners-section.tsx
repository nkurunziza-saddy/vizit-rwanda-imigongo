import { InfiniteSlider } from "@/components/ui/infinite-slider";
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
      <div className="mask-[linear-gradient(to_right,transparent,black,transparent)] overflow-hidden py-4">
        <InfiniteSlider gap={60} reverse speed={50} speedOnHover={25}>
          {partners.map((partner) => (
            <div
              key={`partner-${partner.name}`}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <img
                src={partner.src}
                className="h-12 w-20 object-cover rounded-md transition-all duration-500 opacity-70 group-hover:opacity-100"
                alt={partner.name}
                loading="lazy"
                width={80}
                height={48}
              />
              <span className="text-sm font-semibold text-foreground/85 group-hover:text-foreground transition-colors uppercase tracking-wider">
                {partner.name}
              </span>
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </SectionContainer>
  );
};

export default PartnersSection;
