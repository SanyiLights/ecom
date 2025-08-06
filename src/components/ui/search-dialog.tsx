import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, X, Star, ShoppingCart } from "lucide-react";

interface SearchResult {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  isNew?: boolean;
  isOnSale?: boolean;
}

export const SearchDialog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "Todos",
    "Luces Par",
    "Moving Lights", 
    "Barras LED",
    "Efectos Láser",
    "Controladores"
  ];

  const searchResults: SearchResult[] = [
    {
      id: "1",
      name: "LED Par 64 RGBW 180W",
      category: "Luces Par",
      price: 45000,
      rating: 4.8,
      reviews: 24,
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=100&h=100&fit=crop",
      isNew: true,
      isOnSale: true
    },
    {
      id: "2", 
      name: "Moving Head Beam 230W",
      category: "Moving Lights",
      price: 120000,
      rating: 4.9,
      reviews: 18,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop"
    }
  ];

  const filteredResults = searchResults.filter(result => {
    const matchesQuery = result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        result.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "" || selectedCategory === "Todos" || 
                           result.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Buscar Productos
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary/80"
                onClick={() => setSelectedCategory(category === selectedCategory ? "" : category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          <Separator />

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto space-y-3">
            {filteredResults.length === 0 ? (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No se encontraron resultados</h3>
                <p className="text-muted-foreground">
                  Intenta con otros términos de búsqueda
                </p>
              </div>
            ) : (
              filteredResults.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={result.image}
                        alt={result.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold truncate">{result.name}</h4>
                          {result.isNew && (
                            <Badge variant="default" className="text-xs">Nuevo</Badge>
                          )}
                          {result.isOnSale && (
                            <Badge variant="destructive" className="text-xs">Oferta</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{result.category}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{result.rating}</span>
                            <span className="text-sm text-muted-foreground">({result.reviews})</span>
                          </div>
                          <span className="text-lg font-bold text-primary">
                            ${result.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 