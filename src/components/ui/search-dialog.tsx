import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Info, X } from "lucide-react";
import { useState } from "react";
import { getButtonClasses, getBadgeClasses } from "@/lib/colors";

export const SearchDialog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Mock search results
  const searchResults = [
    {
      id: "1",
      name: "LED Par 64 RGBW 180W",
      category: "Luces Par",
      price: 45000,
      isNew: true,
      isOnSale: true
    },
    {
      id: "2",
      name: "Moving Head Beam 230W",
      category: "Moving Lights",
      price: 120000,
      isNew: false,
      isOnSale: false
    },
    {
      id: "3",
      name: "Barra LED RGBW 18x10W",
      category: "Barras LED",
      price: 28000,
      isNew: false,
      isOnSale: true
    }
  ];

  const filteredResults = searchResults.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Buscar Productos</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {searchQuery && (
            <div className="space-y-2">
              {filteredResults.length > 0 ? (
                filteredResults.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold">${product.price.toLocaleString()}</span>
                        {product.isNew && (
                          <Badge className={`${getBadgeClasses('primary')} text-xs`}>
                            Nuevo
                          </Badge>
                        )}
                        {product.isOnSale && (
                          <Badge className={`${getBadgeClasses('error')} text-xs`}>
                            Oferta
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button size="sm" className={`${getButtonClasses('primary')}`}>
                      <Info className="h-4 w-4 mr-2" />
                      Ver
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <X className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No se encontraron productos que coincidan con "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}; 