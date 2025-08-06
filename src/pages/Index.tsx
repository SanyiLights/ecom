import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/ui/hero-section";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Features } from "@/components/sections/Features";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Stats } from "@/components/sections/Stats";
import { CTA } from "@/components/sections/CTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ProductShowcase />
      <Features />
      <FeaturedProducts />
      <Stats />
      <CTA />
    </div>
  );
};

export default Index;
