import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchDialog } from "./search-dialog";
import { colors } from "@/lib/colors";
import { categories } from "@/data/categories";
import logo from "/src/assets/logo.png";

interface NavigationProps {
  isTransparent?: boolean;
}

export const Navigation = ({ isTransparent = false }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTransparent) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTransparent]);

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

  const handleCategorySelect = (category: string) => {
    navigate('/productos', { 
      state: { selectedCategory: category } 
    });
  };

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
          <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <img 
                src={logo}
                alt="Sanyi Lights Argentina" 
                className="w-8 h-8 object-contain"
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
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`transition-all duration-300 px-3 py-2 rounded-md ${getTextClasses(true)}`}
            >
              Inicio
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`transition-all duration-300 px-3 py-2 rounded-md ${getTextClasses(true)} flex items-center gap-1`}
                >
                  Productos
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className="cursor-pointer"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              to="/about" 
              className={`transition-all duration-300 px-3 py-2 rounded-md ${getTextClasses(true)}`}
            >
              Sobre Nosotros
            </Link>
            
            <a 
              href="#contacto" 
              onClick={scrollToContact}
              className={`transition-all duration-300 px-3 py-2 rounded-md ${getTextClasses(true)}`}
            >
              Contacto
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <SearchDialog />
            
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
              <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col">
                <SheetHeader className="flex-shrink-0">
                  <SheetTitle className="text-left">Menú</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto py-6">
                  <div className="flex flex-col space-y-4">
                    <Link
                      to="/"
                      className="flex items-center px-3 py-2 text-lg font-medium hover:bg-muted rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Inicio
                    </Link>
                    <div className="space-y-2">
                      <div className="px-3 py-2 text-lg font-medium text-muted-foreground">
                        Productos
                      </div>
                      <div className="space-y-1">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              handleCategorySelect(category);
                              setIsMenuOpen(false);
                            }}
                            className="flex items-center px-6 py-2 text-base hover:bg-muted rounded-md transition-colors w-full text-left"
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Link
                      to="/about"
                      className="flex items-center px-3 py-2 text-lg font-medium hover:bg-muted rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sobre Nosotros
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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};