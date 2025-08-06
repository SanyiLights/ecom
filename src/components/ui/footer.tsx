import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  MessageCircle,
  Globe,
  Truck,
  Shield,
  Award
} from "lucide-react";
import { colors } from "@/lib/colors";

import logo from "/src/assets/logo.png";

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
              <img 
                src={logo}
                alt="Sanyi Lights Argentina" 
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                        <span class="text-white text-xs font-bold">SL</span>
                      </div>
                    `;
                  }
                }}
              />
              <div>
                <h3 className="text-xl font-bold">Sanyi Lights</h3>
                <p className="text-sm text-gray-400">Argentina</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Especialistas en iluminación profesional para eventos, espectáculos y producciones audiovisuales. 
              Más de 23 años de experiencia en el mercado.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:text-white"
                onClick={() => window.open('https://www.facebook.com/sanyilightsusa', '_blank')}
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:text-white"
                onClick={() => window.open('https://www.instagram.com/sanyilightsar/', '_blank')}
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">WhatsApp</h4>
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-red-400" />
              <div>
                <p className="text-sm font-medium">(+54 9) 11 7138-8885</p>
                <p className="text-xs text-gray-400">Contacto directo</p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Email</h4>
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-red-400" />
              <div>
                <p className="text-sm font-medium">ventas@sanyilights.com</p>
                <p className="text-xs text-gray-400">Consultas comerciales</p>
              </div>
            </div>
          </div>

          {/* Dirección y Horarios */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Ubicación</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-red-400" />
                <div>
                  <p className="text-sm font-medium">Chile 1380, C.A.B.A</p>
                  <p className="text-xs text-gray-400">Ciudad Autónoma</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-red-400" />
                <div>
                  <p className="text-sm font-medium">Lun-Vie 9:00-18:00</p>
                  <p className="text-xs text-gray-400">Horario comercial</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />
        
        <div className="text-sm text-gray-400 text-center">
          © {currentYear} Sanyi Lights Argentina. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}; 