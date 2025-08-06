import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin,
  MessageCircle,
  Globe,
  Truck,
  Shield,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import { colors, getButtonClasses } from "@/lib/colors";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Función para scroll suave al footer
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <footer id="contacto" className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">SL</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Sanyi Lights</h3>
                <p className="text-sm text-gray-400">Argentina</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Especialistas en iluminación profesional para eventos, espectáculos y producciones audiovisuales. 
              Más de 10 años de experiencia en el mercado.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Enlaces Rápidos</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors">
                Inicio
              </Link>
              <Link to="/productos" className="block text-gray-300 hover:text-white transition-colors">
                Productos
              </Link>
              <a href="#servicios" className="block text-gray-300 hover:text-white transition-colors">
                Servicios
              </a>
              <a 
                href="#contacto" 
                onClick={scrollToContact}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Contacto
              </a>
              <a href="#nosotros" className="block text-gray-300 hover:text-white transition-colors">
                Nosotros
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Servicios</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Truck className="h-4 w-4" />
                <span>Envío a todo el país</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Shield className="h-4 w-4" />
                <span>Garantía completa</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Award className="h-4 w-4" />
                <span>Asesoramiento técnico</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MessageCircle className="h-4 w-4" />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-red-400" />
                <div>
                  <p className="text-sm font-medium">WhatsApp</p>
                  <p className="text-xs text-gray-400">+54 11 1234-5678</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-red-400" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-gray-400">info@sanyilights.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-red-400" />
                <div>
                  <p className="text-sm font-medium">Dirección</p>
                  <p className="text-xs text-gray-400">Av. Corrientes 1234, CABA</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-red-400" />
                <div>
                  <p className="text-sm font-medium">Horarios</p>
                  <p className="text-xs text-gray-400">Lun-Vie 9:00-18:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              <Globe className="h-3 w-3 mr-1" />
              Envío a todo el país
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              <Shield className="h-3 w-3 mr-1" />
              Garantía 1 año
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              <MessageCircle className="h-3 w-3 mr-1" />
              Soporte 24/7
            </Badge>
          </div>
          
          <div className="text-sm text-gray-400">
            © {currentYear} Sanyi Lights Argentina. Todos los derechos reservados.
          </div>
        </div>
      </div>

      {/* Contact Cards Section */}
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-red-400" />
                  Contacto Directo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-3">
                  ¿Necesitas asesoramiento técnico? Nuestros especialistas están disponibles para ayudarte.
                </p>
                <Button className={`${getButtonClasses('primary')} w-full`}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contactar Ahora
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 border-gray-600">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-red-400" />
                  Envío Express
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-3">
                  Envío en 24-48 horas en CABA y GBA. 3-5 días hábiles al resto del país.
                </p>
                <Button variant="outline" className="w-full border-gray-500 text-gray-300 hover:bg-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  Calcular Envío
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 border-gray-600">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center">
                  <Award className="h-5 w-5 mr-2 text-red-400" />
                  Garantía Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-3">
                  Todos nuestros productos incluyen garantía de 1 año con soporte técnico incluido.
                </p>
                <Button variant="outline" className="w-full border-gray-500 text-gray-300 hover:bg-gray-600">
                  <Shield className="h-4 w-4 mr-2" />
                  Ver Garantías
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </footer>
  );
}; 