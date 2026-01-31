import { ImigongoGrid } from "./ImigongoGrid";
import { ShieldCheck, Leaf, Heart, MonitorCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Guides",
    desc: "Every guide is vetted for expertise and authenticity.",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious",
    desc: "Adventures that respect and preserve our natural heritage.",
  },
  {
    icon: Heart,
    title: "Community First",
    desc: "Direct support to local artisans and communities.",
  },
  {
    icon: MonitorCheck,
    title: "Easy Booking",
    desc: "Seamless digital experience for ancient traditions.",
  },
];

export function ImigongoFeatures() {
  return (
    <div className="py-32 bg-white">
      <div className="container mx-auto px-4 max-w-7xl mb-16 text-center">
        <span className="text-[10px] font-mono text-imigongo-black/40 border border-imigongo-black/20 px-2 py-1 uppercase mb-6 inline-block">
          Core Values
        </span>
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-imigongo-black mb-6">
          Why Choose Us
        </h2>
      </div>

      <ImigongoGrid cols={4} className="border-t border-b border-black">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white p-10 flex flex-col items-center text-center group hover:bg-imigongo-black hover:text-white transition-all duration-300 relative overflow-hidden"
          >
            {/* Tech Background Number */}
            <span className="absolute top-2 right-4 text-[6rem] font-black text-black/[0.03] group-hover:text-white/[0.05] leading-none pointer-events-none">
              0{i + 1}
            </span>

            <div className="relative mb-8 p-4">
              {/* Box Frame for Icon */}
              <div className="absolute inset-0 border-2 border-imigongo-black group-hover:border-white transition-colors" />
              <div className="absolute inset-0 border border-imigongo-black/20 m-1 group-hover:border-white/20" />

              <f.icon
                className="w-8 h-8 text-imigongo-black relative z-10 group-hover:text-white transition-colors"
                strokeWidth={1.5}
              />
            </div>

            <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 text-imigongo-black group-hover:text-imigongo-ochre transition-colors">
              {f.title}
            </h3>
            <p className="text-xs font-mono opacity-60 leading-relaxed max-w-xs uppercase">
              {f.desc}
            </p>

            {/* Corner Markers */}
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-current opacity-0 group-hover:opacity-50 transition-opacity" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-current opacity-0 group-hover:opacity-50 transition-opacity" />
          </div>
        ))}
      </ImigongoGrid>
    </div>
  );
}
