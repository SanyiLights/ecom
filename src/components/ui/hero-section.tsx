import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Zap, Star, ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-ping" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-white/20 rounded-full animate-pulse" />
        <div className="absolute bottom-32 left-20 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors">
          <Star className="h-4 w-4 mr-2" />
          Iluminación Profesional
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Ilumina Tus
          <span className="block text-white/90">Espectáculos</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-slide-up">
          Equipos de iluminación profesional para eventos, espectáculos, TV y escenarios. 
          Calidad premium que transforma cada presentación en una experiencia inolvidable.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-scale-in">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-elegant group">
            Ver Productos
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline-white">
            <Lightbulb className="mr-2 h-5 w-5" />
            Asesoramiento
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
            <Zap className="h-8 w-8 mb-4 mx-auto text-white" />
            <h3 className="text-lg font-semibold mb-2">Tecnología LED</h3>
            <p className="text-white/80">Eficiencia energética y colores vibrantes</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
            <Star className="h-8 w-8 mb-4 mx-auto text-white" />
            <h3 className="text-lg font-semibold mb-2">Calidad Premium</h3>
            <p className="text-white/80">Equipos profesionales de marcas reconocidas</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
            <Lightbulb className="h-8 w-8 mb-4 mx-auto text-white" />
            <h3 className="text-lg font-semibold mb-2">Soporte Técnico</h3>
            <p className="text-white/80">Asesoramiento especializado incluido</p>
          </div>
        </div>
      </div>
    </section>
  );
};