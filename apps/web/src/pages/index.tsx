import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import FeaturedListings from "@/components/FeaturedListings";
import DestinationsSection from "@/components/DestinationsSection";
import TrustSection from "@/components/TrustSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => {
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

export default Index;
