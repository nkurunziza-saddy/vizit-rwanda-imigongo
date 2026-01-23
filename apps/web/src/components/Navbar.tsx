import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navLinks = [
  {name: "Home", href: "/"},
  { name: "Stays", href: "/listings?category=stays" },
  { name: "Transport", href: "/listings?category=transport" },
  { name: "Tours", href: "/listings?category=tours" },
  { name: "Experiences", href: "/listings?category=experiences" },
];

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "RWF", symbol: "FRw", name: "Rwandan Franc" },
  { code: "GBP", symbol: "£", name: "British Pound" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState(currencies[0]);

  return (
    <nav

 
      className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", "bg-transparent")}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div
      
              className="flex items-center"
            >
              <span className="text-2xl font-display font-bold text-gradient-safari">
                Vizit
              </span>
              <span className="text-2xl font-display font-bold text-accent">
                Africa
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                activeProps={{
                  className: "text-primary",
                }}
                className={`font-medium hover:text-primary ${
                 "text-primary-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Currency Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger render={ <Button
                  variant="ghost"
                  className={`gap-2`}
                />}>
               
                  <Globe className="h-4 w-4" />
                  {currency.code}
                  <ChevronDown className="h-3 w-3" />
            
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {currencies.map((curr) => (
                  <DropdownMenuItem
                    key={curr.code}
                    onClick={() => setCurrency(curr)}
                    className="cursor-pointer"
                  >
                    {curr.symbol} {curr.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Buttons */}
            <Button variant="ghost" className={""}>
              Sign In
            </Button>
            <Button variant="default" className="rounded-full">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

 
        {isOpen && (
          <div

            className="lg:hidden bg-card border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border space-y-2">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <Button variant="default" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
    
    </nav>
  );
};

export default Navbar;
