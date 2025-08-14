import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { Eye, X } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductPreviewProps {
  product: Partial<Product>;
  onClose: () => void;
  isVisible: boolean;
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({
  product,
  onClose,
  isVisible
}) => {
  if (!isVisible || !product.model) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex justify-between items-start">
          <CardTitle className="text-xl">Vista Previa del Producto</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Header del producto */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">{product.model}</h2>
            <p className="text-gray-600">{product.description}</p>
            <div className="flex justify-center space-x-2">
              <Badge variant="outline">{product.category}</Badge>
              {product.new && (
                <Badge variant="secondary">Nuevo</Badge>
              )}
            </div>
          </div>

          {/* Imágenes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Imagen principal */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Imagen Principal</h3>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {product.image && product.image !== '/placeholder.svg' ? (
                  <img
                    src={product.image}
                    alt={product.model}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">📷</div>
                    <p className="text-sm">Sin imagen</p>
                  </div>
                )}
              </div>
            </div>

            {/* Imagen de contenido */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Imagen de Contenido</h3>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {product.content && product.content !== '/placeholder.svg' ? (
                  <img
                    src={product.content}
                    alt={`Contenido de ${product.model}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p className="text-sm">Sin imagen de contenido</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Imagen secundaria si existe */}
          {product.content2 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Imagen Secundaria</h3>
              <div className="max-w-md mx-auto">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={product.content2}
                    alt={`Contenido secundario de ${product.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Video si existe */}
          {product.video && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Video</h3>
              <div className="max-w-2xl mx-auto">
                {product.video.includes('youtube.com') || product.video.includes('youtu.be') ? (
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="text-4xl mb-2">🎥</div>
                      <p>Video de YouTube: {product.video}</p>
                    </div>
                  </div>
                ) : (
                  <video
                    src={product.video}
                    controls
                    className="w-full rounded-lg"
                  >
                    Tu navegador no soporta el elemento de video.
                  </video>
                )}
              </div>
            </div>
          )}

          {/* Información del producto */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-900">Información del Producto</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Modelo:</span>
                <p className="text-gray-900">{product.model}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Categoría:</span>
                <p className="text-gray-900">{product.category}</p>
              </div>
              <div className="col-span-2">
                <span className="font-medium text-gray-700">Descripción:</span>
                <p className="text-gray-900">{product.description}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Estado:</span>
                <p className="text-gray-900">
                  {product.new ? 'Producto Nuevo' : 'Producto Regular'}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Tipo:</span>
                <p className="text-gray-900">
                  {product.video ? 'Con Video' : 'Sin Video'}
                </p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={onClose}>
              Cerrar Vista Previa
            </Button>
            <Button>
              Guardar Producto
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
