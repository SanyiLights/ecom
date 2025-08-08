import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "@/data/products";
import { getHighQualityImage } from "@/lib/image-utils";

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
  const navigate = useNavigate();
  const highQualityImage = getHighQualityImage(image);

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/producto/${id}`);
  };

  return (
    <Link to={`/producto/${id}`} className="block group">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
        <CardHeader className="p-0 relative">
          <div className="aspect-square overflow-hidden">
            <img 
              src={highQualityImage} 
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 product-image"
              loading="lazy"
              onError={(e) => {
                // Fallback to original image if high-quality fails
                const target = e.target as HTMLImageElement;
                if (target.src !== image) {
                  target.src = image;
                }
              }}
            />
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
                className="w-full bg-gray-100 text-gray-700 group-hover:bg-red-500 group-hover:text-white transition-all duration-300"
                onClick={handleViewDetails}
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