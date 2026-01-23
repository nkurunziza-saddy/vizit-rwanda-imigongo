import { Link } from "@tanstack/react-router";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Safety", href: "/safety" },
    { name: "Cancellation", href: "/cancellation" },
    { name: "COVID-19", href: "/covid" },
  ],
  hosting: [
    { name: "List Your Property", href: "/host" },
    { name: "Host Resources", href: "/resources" },
    { name: "Community", href: "/community" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer className="bg-safari-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-display font-bold text-primary-foreground">
                Vizit
              </span>
              <span className="text-2xl font-display font-bold text-accent">
                Africa
              </span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Your gateway to authentic African adventures. Discover Rwanda's 
              beauty with trusted accommodations, transport, and unforgettable 
              experiences.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="mailto:hello@vizitafrica.com" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors">
                <Mail className="h-4 w-4" />
                hello@vizitafrica.com
              </a>
              <a href="tel:+250788123456" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors">
                <Phone className="h-4 w-4" />
                +250 788 123 456
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <MapPin className="h-4 w-4" />
                Kigali, Rwanda
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Hosting</h4>
            <ul className="space-y-3">
              {footerLinks.hosting.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Vizit Africa. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-primary-foreground/60 hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
