import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, Info } from "lucide-react";
import { getButtonClasses } from "@/lib/colors";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isOnSale?: boolean;
}

export const ProductCard = ({
  name,
  price,
  originalPrice,
  image,
  category,
  rating,
  reviews,
  isNew = false,
  isOnSale = false
}: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && (
              <Badge className="bg-green-600 text-white border-0 text-xs">
                Nuevo
              </Badge>
            )}
            {isOnSale && (
              <Badge className="bg-red-600 text-white border-0 text-xs">
                Oferta
              </Badge>
            )}
          </div>
          
          {/* Category */}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{name}</h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              ${price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        
        <Button 
          size="sm" 
          className={`w-full ${getButtonClasses('primary')} group-hover:scale-105 transition-transform`}
        >
          <Info className="mr-2 h-4 w-4" />
          Ver Detalles
        </Button>
      </CardContent>
    </Card>
  );
};