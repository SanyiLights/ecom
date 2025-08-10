import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { getFeaturedProducts } from "@/lib/product-utils";

export const FeaturedProducts = () => {
  const isMobile = useIsMobile();
  const featuredProducts = getFeaturedProducts(isMobile ? 4 : 6);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-primary font-bold mb-6">
            Productos Nuevos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Los equipos más populares y solicitados de nuestro catálogo profesional. 
            Más de 23 años de experiencia en iluminación escénica.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.model}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        <div className="text-center">
         
          <Link to="/productos" onClick={() => window.scrollTo(0, 0)}>
            <Button size="lg" className="group">
              Ver Todos los Productos
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}; 