import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { SearchDialog } from "./search-dialog";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img 
              src="./lovable-uploads/7903f7c1-09e4-4991-9794-eb54f4b2e59e.png" 
              alt="Sanyi Lights Argentina" 
              className="h-10 w-10"
            />
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-primary">Sanyi Lights</span>
              <span className="text-sm text-muted-foreground ml-2">Argentina</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors">
              Inicio
            </a>
            <a href="/productos" className="text-foreground hover:text-primary transition-colors">
              Productos
            </a>
            <a href="#servicios" className="text-foreground hover:text-primary transition-colors">
              Servicios
            </a>
            <a href="#contacto" className="text-foreground hover:text-primary transition-colors">
              Contacto
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <SearchDialog />
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
              >
                Inicio
              </a>
              <a
                href="/productos"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
              >
                Productos
              </a>
              <a
                href="#servicios"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
              >
                Servicios
              </a>
              <a
                href="#contacto"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
              >
                Contacto
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};