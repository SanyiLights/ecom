import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/ui/hero-section";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Award, Truck, Shield, Headphones, Star, Users, CheckCircle } from "lucide-react";

const Index = () => {
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
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              ¿Por qué elegirnos?
            </Badge>
            <h2 className="text-4xl font-bold mb-6 animate-fade-in">
              Nueva Generación en Iluminación Profesional
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
              Innovación y tecnología de vanguardia para transformar tus eventos y producciones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-scale-in">
              <CardHeader>
                <Award className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Calidad Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Equipos de las mejores marcas internacionales con garantía completa
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <Truck className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Envío Rápido</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Entrega en todo el país con opciones express para urgencias
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <Shield className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Garantía Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Respaldo completo y servicio técnico especializado incluido
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <Headphones className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Soporte 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Asesoramiento técnico disponible cuando lo necesites
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

          <div className="text-center mt-12 md:hidden">
            <Button variant="outline" size="lg" className="group">
              Ver Todos los Productos
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Números que Hablan</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Nuestra pasión por la excelencia se refleja en cada proyecto que emprendemos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in">
              <div className="text-5xl font-bold mb-2">100+</div>
              <p className="text-white/90">Productos Disponibles</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl font-bold mb-2">98%</div>
              <p className="text-white/90">Clientes Satisfechos</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <p className="text-white/90">Soporte Técnico</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-5xl font-bold mb-2">100%</div>
              <p className="text-white/90">Garantía de Calidad</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              ¿Listo para brillar?
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Transforma Tu Próximo Evento
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contacta con nuestros especialistas y descubre cómo podemos hacer que tu espectáculo 
              brille con luz propia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary-dark group">
                Cotizar Proyecto
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Ver Catálogo Completo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
