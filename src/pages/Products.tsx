import { Navigation } from "@/components/ui/navigation";
import { ProductCard } from "@/components/ui/product-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "@/components/sections/Footer";
import { categories } from "@/data/categories";
import { filterProducts } from "@/lib/product-utils";
import { products } from "@/data/new-products";

const Products = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const filteredProducts = filterProducts(products, searchQuery, selectedCategory);

  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("Todos");
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isTransparent={false} />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Nuestros Productos</h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Equipos de iluminación profesional para todos tus eventos
            </p>
          </div>

          <div className="flex flex-col gap-4 mb-6 sm:mb-8">
            <div className="flex-1">
              <Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:max-w-md bg-white focus:border-red-600 focus:ring-red-500 shadow-lg h-10 sm:h-12 text-sm sm:text-base"
              />
            </div>
            
            {/* Chips de categorías */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={`cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 ${
                    selectedCategory === category ? "bg-primary text-primary-foreground" : ""
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <p className="text-sm sm:text-base text-muted-foreground">
              {filteredProducts.length} productos encontrados
              {selectedCategory && selectedCategory !== "Todos" && (
                <span className="ml-2">
                  en <Badge variant="secondary" className="text-xs sm:text-sm">{selectedCategory}</Badge>
                </span>
              )}
            </p>
          </div>

          <div className={`grid gap-3 sm:gap-4 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {filteredProducts.map((product) => (
              <div key={product.model} className="w-full">
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-muted-foreground text-base sm:text-lg">
                No se encontraron productos que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;