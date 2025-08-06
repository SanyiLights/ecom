import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchDialog } from "./search-dialog";
import { colors } from "@/lib/colors";

// Importar el logo
import logo from "/src/assets/logo.png";

interface NavigationProps {
  isTransparent?: boolean;
}

export const Navigation = ({ isTransparent = false }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll para cambiar el fondo solo si es transparente
  useEffect(() => {
    if (!isTransparent) {
      setIsScrolled(true); // Siempre sólido en otras páginas
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTransparent]);

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

  // Función para obtener clases de texto según el estado
  const getTextClasses = (isLink = false) => {
    if (isScrolled) {
      return isLink 
        ? 'text-white hover:bg-white/20' 
        : 'text-white';
    } else {
      return isLink 
        ? 'text-white hover:bg-white/10 drop-shadow-lg' 
        : 'text-white drop-shadow-lg';
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? `${colors.primary.main} backdrop-blur-md shadow-lg` 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <img 
                src={logo}
                alt="Sanyi Lights Argentina" 
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  // Fallback si el logo no carga
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
            </div>
            <div className="hidden sm:block">
              <span className={`text-xl font-bold ${getTextClasses()}`}>
                Sanyi Lights
              </span>
              <span className={`text-sm opacity-90 ml-2 ${getTextClasses()}`}>
                Argentina
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-all duration-300 px-3 py-2 rounded-md ${getTextClasses(true)}`}
            >
              Inicio
            </Link>
            <Link 
              to="/productos" 
              className={`transition-all duration-300 px-3 py-2 rounded-md ${getTextClasses(true)}`}
            >
              Productos
            </Link>
            <a 
              href="#contacto" 
              onClick={scrollToContact}
              className={`transition-all duration-300 px-3 py-2 rounded-md ${getTextClasses(true)}`}
            >
              Contacto
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <SearchDialog />
            
            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`md:hidden transition-all duration-300 ${getTextClasses()}`}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Menú</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  <Link
                    to="/"
                    className="flex items-center px-3 py-2 text-lg font-medium hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Inicio
                  </Link>
                  <Link
                    to="/productos"
                    className="flex items-center px-3 py-2 text-lg font-medium hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Productos
                  </Link>
                  <a
                    href="#contacto"
                    onClick={(e) => {
                      scrollToContact(e);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center px-3 py-2 text-lg font-medium hover:bg-muted rounded-md transition-colors"
                  >
                    Contacto
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};