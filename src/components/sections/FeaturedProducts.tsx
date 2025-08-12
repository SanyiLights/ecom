import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { getFeaturedProducts } from "@/lib/product-utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const FeaturedProducts = () => {
  const isMobile = useIsMobile();
  const featuredProducts = getFeaturedProducts(8); // Más productos para el carousel

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-primary font-bold mb-4">
            Productos Nuevos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Los equipos más populares y solicitados de nuestro catálogo profesional. 
            Más de 23 años de experiencia en iluminación escénica.
          </p>
        </div>

        {/* Vista móvil: Grid normal */}
        {isMobile && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-10">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <div 
                key={product.model}
                className="animate-fade-in w-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        )}

        {/* Vista desktop: Carousel */}
        {!isMobile && (
          <div className="relative mb-10">
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {featuredProducts.map((product, index) => (
                  <CarouselItem key={product.model} className="pl-4 basis-1/4">
                    <div className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <ProductCard {...product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-primary shadow-lg">
                <ChevronLeft className="h-5 w-5" />
              </CarouselPrevious>
              
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-primary shadow-lg">
                <ChevronRight className="h-5 w-5" />
              </CarouselNext>
            </Carousel>
          </div>
        )}

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