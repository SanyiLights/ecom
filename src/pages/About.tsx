import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Globe, Users, Award, Truck, Shield } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";



const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            </div>
          </div>

          {/* Presencia Global */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Nuestra Presencia Global</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Argentina</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Chile 1380, C.A.B.A</p>
                <p className="text-sm text-muted-foreground mb-2">(+54 9) 11 7138-8885</p>
                <p className="text-sm text-muted-foreground">ventas@sanyilights.com</p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Estados Unidos</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">2446 Merced Ave, South El Monte, CA</p>
                <p className="text-sm text-muted-foreground mb-2">+1(626) 601-1887</p>
                <p className="text-sm text-muted-foreground">sanyilightsusa@gmail.com</p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">China</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Building 29, Jiayichuangxin Industry Zone</p>
                <p className="text-sm text-muted-foreground mb-2">Qingyuan City, Guangdong Province</p>
                <p className="text-sm text-muted-foreground">info@sparklaser.com</p>
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
