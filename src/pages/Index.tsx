import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/ui/hero-section";
import { Testimonials } from "@/components/sections/Testimonials";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Footer } from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation isTransparent={true} />
      <HeroSection />
      <FeaturedProducts />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
