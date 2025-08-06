import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Footer } from "@/components/ui/footer";
import { getProductById } from "@/data/products";
import { colors } from "@/lib/colors";

type TabType = 'description' | 'specifications' | 'reviews';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('description');

  const product = getProductById(id || "");

  useEffect(() => {
    if (!product) {
      navigate('/productos');
    }
  }, [product, navigate]);

  // Scroll al principio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isTransparent={false} />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link 
              to="/productos" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Productos
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Imagen */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Información del Producto */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {product.isNew && (
                    <Badge className="bg-green-500 text-white">Nuevo</Badge>
                  )}
                  {product.isOnSale && (
                    <Badge className="bg-red-500 text-white">Oferta</Badge>
                  )}
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reseñas)
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  {product.description}
                </p>

                <div className="flex gap-4">
                  <Button size="lg" className="flex-1">
                    Contactar por WhatsApp
                  </Button>
                  <Button size="lg" variant="outline">
                    Solicitar Cotización
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <div className="border-b">
              <nav className="flex space-x-8">
                {[
                  { id: 'description' as TabType, label: 'Descripción' },
                  { id: 'specifications' as TabType, label: 'Especificaciones' },
                  { id: 'reviews' as TabType, label: 'Reseñas' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-8">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Descripción del Producto</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  {product.tags && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Características:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'specifications' && product.specifications && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Especificaciones Técnicas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {product.specifications.power && (
                        <div className="flex justify-between">
                          <span className="font-medium">Potencia:</span>
                          <span>{product.specifications.power}</span>
                        </div>
                      )}
                      {product.specifications.voltage && (
                        <div className="flex justify-between">
                          <span className="font-medium">Voltaje:</span>
                          <span>{product.specifications.voltage}</span>
                        </div>
                      )}
                      {product.specifications.dimensions && (
                        <div className="flex justify-between">
                          <span className="font-medium">Dimensiones:</span>
                          <span>{product.specifications.dimensions}</span>
                        </div>
                      )}
                      {product.specifications.weight && (
                        <div className="flex justify-between">
                          <span className="font-medium">Peso:</span>
                          <span>{product.specifications.weight}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Características</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {product.specifications.features?.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Las reseñas estarán disponibles próximamente.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail; 