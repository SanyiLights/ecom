import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Truck, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import mapImage from "@/assets/map.jpeg";
import prof2 from "@/assets/prof2.jpg";
import prof3 from "@/assets/prof3.jpg";
import professionalLightingEvent from "@/assets/professional-lighting-event.jpg";
import messi from "@/assets/messi.jpg";

const professionalImages = [
  {
    src: prof3,
    title: "Iluminación Profesional",
    subtitle: "Lideres con +23 años de experiencia en equipos de iluminación escénica"
  },
  {
    src: prof2, 
    title: "Tecnología Avanzada",
    subtitle: "Cabezal movil LED, LED displays y consolas DMX"
  },
  {
    src: professionalLightingEvent,
    title: "Solicita Asesoramiento",
    subtitle: "Te ayudamos a elegir la mejor iluminación para tu evento"
  },
  {
    src: messi,
    title: "Distribuidor Oficial",
    subtitle: "Representante exclusivo de Sanyi Lights en Argentina"
  },
];

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const oneSecond = 1000;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === professionalImages.length - 1 ? 0 : prevIndex + 1
      );
    }, oneSecond * 5);

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

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  
  return (
    <div className="min-h-screen bg-background">
      <Navigation isTransparent={false} />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary text-primary-foreground">
              Sobre Nosotros
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tu Nuevo Socio Confiable de Iluminación
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Más de 23 años de experiencia en iluminación profesional, 
              entregando soluciones de alta calidad a la industria del entretenimiento mundial.
            </p>
          </div>

          {/* Carousel de Imágenes Profesionales */}
          <div className="mb-20">
            <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-lg shadow-2xl">
              <div 
                className="absolute inset-0"
                ref={carouselRef}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
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
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
                  </div>
                ))}
              </div>

              {/* Texto por encima */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center text-white max-w-4xl px-6">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                    {professionalImages[currentImageIndex].title}
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl opacity-90 leading-relaxed">
                    {professionalImages[currentImageIndex].subtitle}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons - Bottom Right */}
              <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">
                {professionalImages.map((_, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    onClick={() => goToImage(index)}
                    className={`w-8 h-8 rounded-full p-0 transition-all duration-300 font-bold text-sm ${
                      index === currentImageIndex
                        ? 'bg-white text-black scale-110 shadow-lg'
                        : 'bg-white/20 text-white hover:bg-white/40 hover:scale-105'
                    }`}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Historia */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Sanyi Lights Argentina es el representante exclusivo de Sanyi Lights en Argentina, 
                  con más de 23 años de experiencia en equipos de iluminación escénica. 
                  Somos especialistas en iluminación profesional para eventos, espectáculos 
                  y producciones audiovisuales.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Con nuestro equipo local de expertos, ofrecemos soporte técnico, 
                  servicio de garantía y asistencia al cliente, respaldados por la 
                  calidad y confiabilidad de Sanyi Lights.
                </p>
              </div>
              <div className="bg-muted rounded-lg p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">23+</div>
                    <div className="text-sm text-muted-foreground">Años de Experiencia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                    <div className="text-sm text-muted-foreground">Proyectos Completados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Países Servidos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Soporte Técnico</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Por qué elegirnos */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegir Sanyi Lights?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">23+ años de experiencia</h3>
                <p className="text-muted-foreground">
                  En la fabricación de iluminación escénica profesional
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Equipo local experto</h3>
                <p className="text-muted-foreground">
                  Soporte técnico, garantía y asistencia al cliente
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Entrega rápida</h3>
                <p className="text-muted-foreground">
                  Directamente desde nuestra sucursal en Argentina
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Soluciones de vanguardia</h3>
                <p className="text-muted-foreground">
                  Iluminación de alto rendimiento y tecnología avanzada
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Garantía</h3>
                <p className="text-muted-foreground">
                  Respaldamos todos nuestros productos con garantía oficial
                </p>
              </div>
            </div>
          </div>

          {/* Presencia Global */}
          <div className="mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">Nuestra Presencia Global</h2>
            
            {/* Mapa */}
            <div className="mb-16 -mx-4 lg:-mx-8">
              <div className="w-full h-96 lg:h-[600px] xl:h-[700px]">
                <img 
                  src={mapImage} 
                  alt="Mapa de Presencia Global de Sanyi Lights" 
                  className="w-full h-full object-contain object-center"
                />
              </div>
            </div>
          </div>

          <div className="text-center bg-primary/5 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">¿Listo para tu próximo proyecto?</h2>
            <p className="text-muted-foreground mb-6">
              Contáctanos para obtener asesoramiento especializado y cotizaciones personalizadas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-primary hover:bg-primary/90" >
                  Ver Productos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
