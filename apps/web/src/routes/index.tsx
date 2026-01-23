import { createFileRoute } from '@tanstack/react-router'
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import CategorySection from '@/components/layouts/category-section';
import FeaturedListings from '@/components/layouts/featured-listings';
import DestinationsSection from '@/components/layouts/destinations-section';
import TrustSection from '@/components/layouts/trust-section';
import NewsletterSection from '@/components/layouts/newsletter-section';
import Footer from '@/components/footer';

export const Route = createFileRoute('/')({ 
  component: IndexPage 
})

function IndexPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <CategorySection />
      <FeaturedListings />
      <DestinationsSection />
      <TrustSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

