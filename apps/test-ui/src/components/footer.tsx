import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <h3 className="font-display text-3xl mb-4">VIZIT AFRICA</h3>
            <p className="text-primary-foreground/80 max-w-md leading-relaxed mb-6">
              Your home away from home in Rwanda. We connect travelers with
              authentic experiences, comfortable stays, and the warm hospitality
              that makes the Land of a Thousand Hills unforgettable.
            </p>
            <div className="flex flex-col gap-3 text-primary-foreground/80">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm">KG 9 Ave, Kigali, Rwanda</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-sm">+250 788 000 000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-sm">hello@vizit africa.rw</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-accent mb-6">Services</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li>
                <Link
                  href="/listings?type=flights"
                  className="hover:text-primary-foreground transition-colors text-sm"
                >
                  Flights to Rwanda
                </Link>
              </li>
              <li>
                <Link
                  href="/listings?type=hotels"
                  className="hover:text-primary-foreground transition-colors text-sm"
                >
                  Hotels & Lodges
                </Link>
              </li>
              <li>
                <Link
                  href="/listings?type=bnbs"
                  className="hover:text-primary-foreground transition-colors text-sm"
                >
                  Local BnBs
                </Link>
              </li>
              <li>
                <Link
                  href="/listings?type=car-rentals"
                  className="hover:text-primary-foreground transition-colors text-sm"
                >
                  Car Rentals
                </Link>
              </li>
              <li>
                <Link
                  href="/listings?type=experiences"
                  className="hover:text-primary-foreground transition-colors text-sm"
                >
                  Experiences
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-accent mb-6">Explore</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-primary-foreground transition-colors text-sm"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/listings"
                  className="hover:text-primary-foreground transition-colors text-sm"
                >
                  All Listings
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-primary-foreground transition-colors text-sm"
                >
                  About Rwanda
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-primary-foreground transition-colors text-sm"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {currentYear} Vizit Africa Rwanda. All rights reserved.
          </p>
          <p className="text-primary-foreground/50 text-sm">
            Made with love for Rwanda 🏔️
          </p>
        </div>
      </div>
    </footer>
  );
}
