import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Star, Lightbulb, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { colors, getButtonClasses } from "@/lib/colors";

// Importar las imágenes
import prof1 from "/src/assets/prof1.jpg";
import messi from "/src/assets/messi.jpg";
import prof2 from "/src/assets/prof2.jpg";
import prof3 from "/src/assets/prof3.jpg";
import professionalLightingEvent from "/src/assets/professional-lighting-event.jpg";

const professionalImages = [
  {
    src: prof3,
    title: "Iluminación Profesional",
    subtitle: "Lideres con +23 años de experiencia en equipos de iluminación escénica"
  },
  {
    src: prof1,
    title: "Equipos de Alta Calidad",
    subtitle: "Moving heads, LED series y efectos especiales profesionales"
  },
  {
    src: messi,
    title: "Distribuidor Oficial",
    subtitle: "Representante exclusivo de Sanyi Lights en Argentina"
  },
  {
    src: prof2, 
    title: "Tecnología Avanzada",
    subtitle: "Cabezal movil LED, LED displays y consolas DMX"
  },
  {
    src: professionalLightingEvent,
    title: "Sanyi Lights Argentina",
    subtitle: "Chile 1380, C.A.B.A - (+54 9)11 7138 8885"
  }
];

export const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === professionalImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 100000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === professionalImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? professionalImages.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="relative min-h-[100vh] sm:min-h-[90vh] overflow-hidden">
      {/* Image Carousel */}
      <div className="absolute inset-0">
        {professionalImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 h-[100vh] sm:h-[90vh] flex items-center">
        <div className="w-full">
          {/* Main Content */}
          <div className="max-w-4xl text-white mb-8 sm:mb-12">
            <div className="animate-fade-in">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
                {professionalImages[currentImageIndex].title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-8 max-w-3xl opacity-90 leading-relaxed">
                {professionalImages[currentImageIndex].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <Link to="/products">
                  <Button size="lg" className={`${getButtonClasses('primary')} shadow-elegant group w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4`}>
                    Ver Productos
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/80 w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300"
                >
                  <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Contactar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      <Button
        onClick={prevImage}
        variant="ghost"
        size="icon"
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white border-0 hidden sm:flex"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
      <Button
        onClick={nextImage}
        variant="ghost"
        size="icon"
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white border-0 hidden sm:flex"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
        {professionalImages.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            onClick={() => goToImage(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full p-0 transition-all duration-300 ${
              index === currentImageIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Mobile Swipe Indicator */}
      <div className="absolute bottom-16 sm:hidden left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-1 text-white/70 text-xs">
          <ChevronLeft className="h-3 w-3" />
          <span>Swipe para cambiar</span>
          <ChevronRight className="h-3 w-3" />
        </div>
      </div>
    </section>
  );
};