const partners = [
  "RDB",
  "Mastercard Foundation",
  "Conservation Int",
  "Visit Rwanda",
  "NatGeo",
];

export function Affiliations() {
  return (
    <div className="border-t border-b border-foreground py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-70 mb-8">
          Trusted Partners & Affiliations
        </p>

        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-80 grayscale mix-blend-screen">
          {partners.map((p) => (
            <span
              key={p}
              className="text-2xl md:text-3xl font-black uppercase tracking-tighter hover:opacity-100 transition-opacity cursor-default"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
