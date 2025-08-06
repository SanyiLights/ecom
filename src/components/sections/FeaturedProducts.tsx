import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProductCard } from "@/components/ui/product-card";
import { ArrowRight } from "lucide-react";
import { getBadgeClasses, getButtonClasses } from "@/lib/colors";

export const FeaturedProducts = () => {
  // Featured products
  const featuredProducts = [
    {
      id: "1",
      name: "LED Par 64 RGBW 180W",
      price: 45000,
      originalPrice: 52000,
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=500&fit=crop",
      category: "Luces Par",
      rating: 4.8,
      reviews: 24,
      isNew: true,
      isOnSale: true
    },
    {
      id: "2",
      name: "Moving Head Beam 230W",
      price: 120000,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
      category: "Moving Lights",
      rating: 4.9,
      reviews: 18,
      isNew: false,
      isOnSale: false
    },
    {
      id: "3",
      name: "Barra LED RGBW 18x10W",
      price: 28000,
      originalPrice: 32000,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
      category: "Barras LED",
      rating: 4.7,
      reviews: 35,
      isNew: false,
      isOnSale: true
    },
    {
      id: "4",
      name: "Láser RGB 1000mW",
      price: 85000,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
      category: "Efectos Láser",
      rating: 4.6,
      reviews: 12,
      isNew: true,
      isOnSale: false
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <Badge className={`mb-4 ${getBadgeClasses('primary')}`}>
              Productos Destacados
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Los Más Populares</h2>
            <p className="text-xl text-muted-foreground">
              Equipos preferidos por profesionales del entretenimiento
            </p>
          </div>
          <Button variant="outline" size="lg" className="hidden md:flex items-center group">
            Ver Todos
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <Separator className="mb-8" />

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Mobile Scrollable */}
        <div className="md:hidden">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 p-1">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="w-80 flex-shrink-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <div className="text-center mt-12 md:hidden">
          <Button variant="outline" size="lg" className="group">
            Ver Todos los Productos
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}; 