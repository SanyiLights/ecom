import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "@/data/products";
import { useQuoteList } from "@/hooks/use-quote-list";

export const ProductCard = (product: Product) => {
  const navigate = useNavigate();
  const { has, toggle } = useQuoteList();

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/producto/${encodeURIComponent(product.model)}`);
  };

  return (
    <Link to={`/producto/${encodeURIComponent(product.model)}`} className="block group h-full">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer h-full flex flex-col max-h-[500px]">
        <CardHeader className="p-0 relative flex-shrink-0">
          <div className="aspect-square overflow-hidden">
            <img 
              src={product.image} 
              alt={product.description}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 product-image"
              loading="lazy"
            />
            {product.new && (
              <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-xs px-2 py-1 shadow-lg">
                Nuevo
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="space-y-1 flex-1 flex flex-col">
            <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">
              {product.model}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
              {product.description}
            </p>
            <div className="pt-3 grid grid-cols-1 max-w-sm:grid-cols-2 gap-2 mt-auto">
              <Button 
                size="sm" 
                className="w-full bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300 text-xs sm:text-sm px-2 sm:px-3 py-2"
                onClick={handleViewDetails}
              >
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                Detalles
              </Button>
              <Button 
                size="sm"
                variant={has(product.model) ? "secondary" : "default"}
                className="w-full text-xs sm:text-sm px-2 sm:px-3 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggle(product.model);
                }}
              >
                {has(product.model) ? "Quitar" : "Cotizar"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};