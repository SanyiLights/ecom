import { Navigation } from "@/components/ui/navigation";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search, Grid, List } from "lucide-react";
import { useState } from "react";
import { Footer } from "@/components/ui/footer";

// Mock product data
const products = [
  {
    id: "1",
    name: "LED Par 64 RGBW 180W",
    price: 45000,
    originalPrice: 52000,
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=500&fit=crop",
    category: "Luces Par",
    rating: 4.8,
    reviews: 24,
    isNew: true,
    isOnSale: true
  },
  {
    id: "2",
    name: "Moving Head Beam 230W",
    price: 120000,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    category: "Moving Lights",
    rating: 4.9,
    reviews: 18,
    isNew: false,
    isOnSale: false
  },
  {
    id: "3",
    name: "Barra LED RGBW 18x10W",
    price: 28000,
    originalPrice: 32000,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
    category: "Barras LED",
    rating: 4.7,
    reviews: 35,
    isNew: false,
    isOnSale: true
  },
  {
    id: "4",
    name: "Láser RGB 1000mW",
    price: 85000,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
    category: "Efectos Láser",
    rating: 4.6,
    reviews: 12,
    isNew: true,
    isOnSale: false
  },
  {
    id: "5",
    name: "Estrobo LED 1000W",
    price: 38000,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    category: "Efectos",
    rating: 4.5,
    reviews: 28,
    isNew: false,
    isOnSale: false
  },
  {
    id: "6",
    name: "Controlador DMX 512",
    price: 15000,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
    category: "Controladores",
    rating: 4.4,
    reviews: 42,
    isNew: false,
    isOnSale: false
  }
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [
    "Todos",
    "Luces Par",
    "Moving Lights",
    "Barras LED",
    "Efectos Láser",
    "Efectos",
    "Controladores"
  ];

  const filteredProducts = products.filter(product => {
    const matchesQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "" || selectedCategory === "Todos" || 
                           product.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation isTransparent={false} />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Nuestros Productos</h1>
            <p className="text-xl text-muted-foreground">
              Equipos de iluminación profesional para todos tus eventos
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex items-center border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-4">
            <p className="text-muted-foreground">
              {filteredProducts.length} productos encontrados
            </p>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
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