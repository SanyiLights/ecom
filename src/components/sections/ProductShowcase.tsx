import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Sparkles, Zap, Star } from "lucide-react";
import professionalLedProduct from "@/assets/professional-led-product.jpg";

interface ProductShowcaseProps {
  version?: "fiestas" | "profesional" | "minimalista";
}

export const ProductShowcase = ({ version = "fiestas" }: ProductShowcaseProps) => {
  // Configuración según la versión
  const getVersionConfig = () => {
    switch (version) {
      case "fiestas":
        return {
          badgeBg: "bg-gradient-to-r from-purple-600 to-pink-600",
          title: "Equipos para Fiestas y Eventos",
          subtitle: "Descubre nuestra línea de equipos LED RGB de alta gama, diseñados para crear experiencias mágicas y momentos inolvidables en cualquier evento.",
          features: [
            "Tecnología LED RGB de millones de colores",
            "Control inalámbrico para fiestas",
            "Efectos especiales para eventos"
          ],
          buttonBg: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
          productName: "LED Par RGB",
          productSpec: "RGB 180W para Fiestas"
        };
      case "profesional":
        return {
          badgeBg: "bg-blue-600",
          title: "Equipos de Iluminación Profesional",
          subtitle: "Descubre nuestra línea de equipos LED de alta gama, diseñados para profesionales que buscan la máxima calidad y rendimiento en cada presentación.",
          features: [
            "Tecnología LED RGBW de última generación",
            "Control DMX512 profesional",
            "Eficiencia energética superior"
          ],
          buttonBg: "bg-blue-600 hover:bg-blue-700",
          productName: "LED Par 64",
          productSpec: "RGBW 180W"
        };
      case "minimalista":
        return {
          badgeBg: "bg-gray-600",
          title: "Iluminación Minimalista y Elegante",
          subtitle: "Descubre nuestra línea de equipos LED de diseño limpio, perfectos para espacios modernos que buscan funcionalidad sin comprometer la estética.",
          features: [
            "Diseño minimalista y elegante",
            "Instalación simple y rápida",
            "Funcionalidad sin complicaciones"
          ],
          buttonBg: "bg-gray-900 hover:bg-gray-800",
          productName: "LED Minimal",
          productSpec: "Diseño Limpio"
        };
      default:
        return {
          badgeBg: "bg-primary",
          title: "Equipos de Iluminación Profesional",
          subtitle: "Descubre nuestra línea de equipos LED de alta gama, diseñados para profesionales que buscan la máxima calidad y rendimiento en cada presentación.",
          features: [
            "Tecnología LED RGBW de última generación",
            "Control DMX512 profesional",
            "Eficiencia energética superior"
          ],
          buttonBg: "bg-primary hover:bg-primary/90",
          productName: "LED Par 64",
          productSpec: "RGBW 180W"
        };
    }
  };

  const config = getVersionConfig();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <Badge className={`mb-4 ${config.badgeBg} text-white border-0`}>
              {version === "fiestas" ? "Tecnología RGB para Fiestas" : "Tecnología LED Avanzada"}
            </Badge>
            <h2 className="text-4xl font-bold mb-6">
              {config.title}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {config.subtitle}
            </p>
            <div className="space-y-4 mb-8">
              {config.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Button size="lg" className={`text-white ${config.buttonBg} group`}>
              {version === "fiestas" ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Ver Productos para Fiestas
                </>
              ) : (
                <>
                  Ver Productos
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
          <div className="relative animate-scale-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={professionalLedProduct} 
                alt="Equipo de iluminación LED profesional Sanyi Lights"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-elegant animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{config.productName}</div>
                <div className="text-muted-foreground">{config.productSpec}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 