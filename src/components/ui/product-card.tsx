import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";

interface ProductCardProps extends Product {
  showVideoIcon?: boolean;
}

export const ProductCard = ({ 
  id,
  name, 
  image, 
  category, 
  showVideoIcon = false,
  ...props 
}: ProductCardProps) => {
  return (
    <Link to={`/producto/${id}`} className="block group">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
        <CardHeader className="p-0 relative">
          <div className="aspect-square overflow-hidden">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {name}
            </h3>
            
            <div className="flex items-center justify-between pt-2">
              <Button 
                size="sm" 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // Aquí puedes agregar lógica adicional si necesitas
                }}
              >
                <Eye className="h-4 w-4 mr-1" />
                Ver Detalles
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};