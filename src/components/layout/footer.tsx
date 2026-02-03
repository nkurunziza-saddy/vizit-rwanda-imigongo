import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-foreground text-white py-16 border-t-4 border-primary relative overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        <div className="md:col-span-2 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <span className="font-black text-white text-xl">V</span>
              </div>
              <span className="text-3xl font-black uppercase tracking-tighter text-white">
                Vizit<span className="text-primary">Africa</span>
              </span>
            </div>
            <p className="text-white/60 max-w-sm font-light text-lg leading-relaxed mb-8 md:mb-12">
              Curating authentic Rwandan journeys that blend ancient tradition
              with modern luxury.
            </p>
          </div>

          <div className="hidden lg:block">
            <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-4">
              Stay Updated
            </h4>
            <div className="flex items-center border-b border-white/20 pb-2 max-w-sm group focus-within:border-primary transition-colors">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none text-white placeholder:text-white/20 focus:ring-0 focus:outline-0 w-full p-0 font-mono text-sm"
              />
              <button
                type="button"
                className="text-white/40 group-focus-within:text-primary uppercase font-bold text-xs tracking-widest hover:text-white transition-colors"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 border-l-2 border-primary pl-4">
            Explore
          </h4>
          <ul className="space-y-4">
            {[
              "Destinations",
              "Cultural Tours",
              "Workshops",
              "Events",
              "The Gallery",
            ].map((item) => (
              <li key={item}>
                <Link
                  to="/"
                  className="flex items-center gap-3 group text-white/60 hover:text-white transition-colors"
                >
                  <span className="w-1 h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="text-sm font-medium tracking-wide">
                    {item}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 border-l-2 border-primary pl-4">
            Company
          </h4>
          <ul className="space-y-4">
            {[
              { label: "About Us", href: "/about" },
              { label: "Our Guides", href: "#" },
              { label: "Sustainability", href: "#" },
              { label: "Partners", href: "#" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="flex items-center gap-3 group text-white/60 hover:text-white transition-colors"
                >
                  <span className="w-1 h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="text-sm font-medium tracking-wide">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 lg:hidden">
          <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-4">
            Stay Updated
          </h4>
          <div className="flex items-center border-b border-white/20 pb-2 max-w-md group focus-within:border-primary transition-colors">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-none text-white placeholder:text-white/20 focus:ring-0 w-full p-0 font-mono text-sm"
            />
            <button
              type="button"
              className="text-white/40 group-focus-within:text-primary uppercase font-bold text-xs tracking-widest hover:text-white transition-colors"
            >
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
        <p>&copy; 2025 Vizit Africa. All rights reserved.</p>
        <p>Inspired by Imigongo</p>
      </div>
    </footer>
  );
}
