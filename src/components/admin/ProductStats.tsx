import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/data/products';

interface ProductStatsProps {
  products: Product[];
}

export const ProductStats: React.FC<ProductStatsProps> = ({ products }) => {
  const productsWithMultipleImages = products.filter(p => p.images && p.images.length > 1).length;
  const productsWithVideos = products.filter(p => p.videos && p.videos.length > 0).length;
  const productsWithMultipleContents = products.filter(p => p.contents && p.contents.length > 1).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estadísticas de Productos</CardTitle>
        <CardDescription>
          Información sobre la estructura de productos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {productsWithMultipleImages}
            </div>
            <div className="text-sm text-blue-600">Productos con múltiples imágenes</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {productsWithVideos}
            </div>
            <div className="text-sm text-green-600">Productos con videos</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {productsWithMultipleContents}
            </div>
            <div className="text-sm text-purple-600">Productos con múltiples contenidos</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
