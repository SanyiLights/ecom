import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import professionalLedProduct from "@/assets/professional-led-product.jpg";

export const ProductShowcase = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Tecnología LED Avanzada
            </Badge>
            <h2 className="text-4xl font-bold mb-6">
              Equipos de Iluminación Profesional
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Descubre nuestra línea de equipos LED de alta gama, diseñados para profesionales 
              que buscan la máxima calidad y rendimiento en cada presentación.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Tecnología LED RGBW de última generación</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Control DMX512 profesional</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Eficiencia energética superior</span>
              </div>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary-dark group">
              Ver Productos
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
                <div className="text-2xl font-bold text-primary">LED Par 64</div>
                <div className="text-muted-foreground">RGBW 180W</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 