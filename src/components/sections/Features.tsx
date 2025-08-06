import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Award, Truck, Shield, Headphones } from "lucide-react";
import { colors, getBadgeClasses } from "@/lib/colors";

export const Features = () => {
  const features = [
    {
      icon: Award,
      title: "Calidad Premium",
      description: "Equipos de las mejores marcas internacionales con garantía completa",
      details: "Trabajamos exclusivamente con marcas reconocidas como Chauvet, ADJ, Elation y otras líderes en iluminación profesional."
    },
    {
      icon: Truck,
      title: "Envío Rápido",
      description: "Entrega en todo el país con opciones express para urgencias",
      details: "Entregamos en 24-48 horas en CABA y GBA, y en 3-5 días hábiles al resto del país."
    },
    {
      icon: Shield,
      title: "Garantía Total",
      description: "Respaldo completo y servicio técnico especializado incluido",
      details: "Garantía de 1 año en todos nuestros productos con soporte técnico especializado incluido."
    },
    {
      icon: Headphones,
      title: "Soporte 24/7",
      description: "Asesoramiento técnico disponible cuando lo necesites",
      details: "Nuestro equipo técnico está disponible para asesorarte en cualquier momento del día."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className={`mb-4 ${getBadgeClasses('primary')}`}>
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
          {features.map((feature, index) => (
            <HoverCard key={index}>
              <HoverCardTrigger asChild>
                <Card className="text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-scale-in group cursor-pointer">
                  <CardHeader className="flex flex-col items-center space-y-4">
                    <AspectRatio ratio={1} className="w-16 h-16">
                      <div className={`p-3 ${colors.primary.bg10} rounded-full group-hover:${colors.primary.bg20} transition-colors w-full h-full flex items-center justify-center`}>
                        <feature.icon className="h-8 w-8 text-red-600" />
                      </div>
                    </AspectRatio>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.details}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  );
}; 