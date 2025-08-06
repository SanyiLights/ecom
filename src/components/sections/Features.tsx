import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Truck, Shield, Headphones } from "lucide-react";

export const Features = () => {
  return (
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
  );
}; 