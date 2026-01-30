"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass, Heart, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home", icon: Compass },
    { href: "/listings", label: "Experiences", icon: MapPin },
    { href: "/about", label: "Our Story", icon: Heart },
    { href: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0A0E0D]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 border-2 border-[#E8B44A] rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <Compass className="w-5 h-5 text-[#E8B44A] relative z-10" />
              </div>
              <div>
                <h1 className="font-serif text-xl font-bold text-white tracking-tight">
                  Rwanda
                </h1>
                <p className="text-[10px] text-white/60 uppercase tracking-[0.2em]">
                  Experience
                </p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative"
                  >
                    <span
                      className={`text-sm font-medium uppercase tracking-[0.1em] transition-colors ${
                        isActive
                          ? "text-[#E8B44A]"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </span>
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#E8B44A]"
                      initial={false}
                      animate={{
                        scaleX: isActive ? 1 : 0,
                      }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: 0 }}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:block">
              <Link href="/listings">
                <Button
                  size="sm"
                  className="group bg-[#C85A3A] hover:bg-[#A04A2E] text-white rounded-none px-6 py-2 uppercase tracking-[0.15em] text-xs font-semibold transition-all duration-300 hover:scale-105"
                >
                  Book Now
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </Button>
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#E8B44A] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#0F1512] border-l border-white/10 z-40 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="mb-12 pt-4">
                  <h2 className="font-serif text-3xl font-bold text-white mb-1">
                    Rwanda
                  </h2>
                  <p className="text-[#E8B44A] text-xs uppercase tracking-[0.3em]">
                    Experience
                  </p>
                </div>

\                <nav className="space-y-6 mb-12">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          className={`flex items-center gap-4 p-4 rounded-none transition-all ${
                            isActive
                              ? "bg-[#E8B44A]/10 border-l-2 border-[#E8B44A]"
                              : "hover:bg-white/5"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              isActive ? "text-[#E8B44A]" : "text-white/60"
                            }`}
                          />
                          <span
                            className={`text-lg font-medium ${
                              isActive ? "text-[#E8B44A]" : "text-white"
                            }`}
                          >
                            {link.label}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link href="/listings">
                    <Button
                      size="lg"
                      className="w-full bg-[#C85A3A] hover:bg-[#A04A2E] text-white rounded-none py-6 uppercase tracking-[0.2em] text-sm font-bold"
                    >
                      Book Your Journey
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 pt-8 border-t border-white/10"
                >
                  <p className="text-white/60 text-sm mb-2">Need help?</p>
                  <a
                    href="mailto:hello@rwanda-experience.com"
                    className="text-[#E8B44A] text-sm hover:underline"
                  >
                    hello@rwanda-experience.com
                  </a>
                  <p className="text-white/60 text-sm mt-4">+250 788 123 456</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function MinimalNavigation() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/listings", label: "Experiences" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0E0D]/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif text-lg font-bold text-white">
            Rwanda
          </Link>

          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-wider transition-colors ${
                  pathname === link.href
                    ? "text-[#E8B44A]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
