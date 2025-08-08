import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { InstagramReels } from "@/components/sections/InstagramReels";
import { Testimonials } from "@/components/sections/Testimonials";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation isTransparent={true} />
      <HeroSection />
      <InstagramReels />
      <FeaturedProducts />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
