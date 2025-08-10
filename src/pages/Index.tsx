import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Footer } from "@/components/sections/Footer";
import { useEffect } from "react";

const Index = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
