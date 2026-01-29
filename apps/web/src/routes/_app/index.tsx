import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/layouts/hero-section";
import CategorySection from "@/components/layouts/category-section";
import { FeaturedListings } from "@/components/layouts/featured-listings";
import DestinationsSection from "@/components/layouts/destinations-section";
import TrustSection from "@/components/layouts/trust-section";
import QuickContactSection from "@/components/layouts/quick-contact-section";
import { Footer } from "@/components/layouts/footer";
import PartnersSection from "@/components/layouts/partners-section";
import TestimonialsSection from "@/components/layouts/testimonials-section";
import FaqsSection from "@/components/layouts/faq-section";

export const Route = createFileRoute("/_app/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <PartnersSection />
      <CategorySection />
      <FeaturedListings />
      <DestinationsSection />
      <TrustSection />
      <TestimonialsSection />
      <FaqsSection />
      <QuickContactSection />
      <Footer />
    </div>
  );
}
