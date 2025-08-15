import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Footer } from "@/components/sections/Footer";
import { getProductByModel, getProductsByCategory } from "@/lib/product-utils";
import { Product } from "@/data/products";
import { useQuoteList } from "@/hooks/use-quote-list";
import { openWhatsAppForModel, openWhatsAppForModels } from "@/lib/contact";
import { ProductCard } from "@/components/ui/product-card";
import { useSupabaseProducts } from "@/hooks/use-supabase-products";

const ProductDetail = () => {
  const { model } = useParams<{ model: string }>();
  const navigate = useNavigate();
  const { products, isLoaded } = useSupabaseProducts();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  const product: Product | undefined = getProductByModel(products, model || "");
  
  const { add, has, toggle, items } = useQuoteList();

  const relatedProducts = getProductsByCategory(products, product?.category || "", 3, product?.model || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Resetear índices cuando cambie el producto
  useEffect(() => {
    setCurrentImageIndex(0);
    setCurrentContentIndex(0);
  }, [product?.model]);

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const isYouTubeVideo = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const nextImage = () => {
    if (product?.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const nextContent = () => {
    if (product?.contents && product.contents.length > 0) {
      setCurrentContentIndex((prev) => (prev + 1) % product.contents.length);
    }
  };

  const prevContent = () => {
    if (product?.contents && product.contents.length > 0) {
      setCurrentContentIndex((prev) => (prev - 1 + product.contents.length) % product.contents.length);
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const goToContent = (index: number) => {
    setCurrentContentIndex(index);
  };

  if (!isLoaded || !products || products.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation isTransparent={false} />
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground text-lg">
                {!isLoaded ? 'Cargando producto...' : 'Cargando productos...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation isTransparent={false} />
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
              <p className="text-muted-foreground mb-4">
                El producto "{model}" no esta disponible.
              </p>
              <Button onClick={() => navigate('/productos')}>
                Volver a Productos
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const videoId = getYouTubeVideoId(product.videos?.[0] || "");

  return (
    <div className="min-h-screen bg-background">
      <Navigation isTransparent={false} />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4">
            <Link 
              to="/productos" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Productos
            </Link>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{product.category}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.model}</h1>
            <p className="text-lg text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4 mb-4">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => openWhatsAppForModel(product.model)}
            >
              Cotizar por WhatsApp
            </Button>
            <Button
              size="lg"
              variant={has(product.model) ? "secondary" : "default"}
              onClick={() => toggle(product.model)}
            >
              {has(product.model) ? "Quitar de lista" : "Agregar a lista"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-8">
            {/* Columna izquierda - Imágenes del producto (2/5 del ancho) */}
            <div className="lg:col-span-2 space-y-4 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Imágenes del producto</h2>
              {product.images && product.images.length > 0 && (
                <div className="relative w-full bg-white rounded-lg overflow-hidden shadow-sm">
                  {/* Imagen principal */}
                  <div className="relative">
                    <img 
                      src={product.images[currentImageIndex]} 
                      alt={`${product.description} - Imagen ${currentImageIndex + 1}`}
                      className="w-full h-[120px] sm:h-[150px] md:h-[180px] object-contain bg-white"
                      style={{
                        imageRendering: 'crisp-edges',
                        border: 'none',
                        outline: 'none',
                        boxShadow: 'none',
                        filter: 'none'
                      }}
                    />
                    
                    {/* Botones de navegación */}
                    {product.images.length > 1 && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails de navegación */}
                  {product.images.length > 1 && (
                    <div className="p-3 bg-gray-50">
                      <div className="flex gap-2 overflow-x-auto">
                        {product.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                              index === currentImageIndex 
                                ? 'border-blue-500 ring-2 ring-blue-200' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <img
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Columna derecha - Contenidos del producto (3/5 del ancho) */}
            <div className="lg:col-span-3 space-y-4 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Especificaciones</h2>
              {product.contents && product.contents.length > 0 && (
                <div className="relative w-full bg-white rounded-lg overflow-hidden shadow-sm">
                  {/* Contenido principal */}
                  <div className="relative">
                    <img 
                      src={product.contents[currentContentIndex]} 
                      alt={`${product.description} - Contenido ${currentContentIndex + 1}`}
                      className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] object-contain bg-white"
                      style={{
                        imageRendering: 'crisp-edges',
                        border: 'none',
                        outline: 'none',
                        boxShadow: 'none',
                        filter: 'none'
                      }}
                    />
                    
                    {/* Botones de navegación */}
                    {product.contents.length > 1 && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={prevContent}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={nextContent}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails de navegación */}
                  {product.contents.length > 1 && (
                    <div className="p-3 bg-gray-50">
                      <div className="flex gap-2 overflow-x-auto">
                        {product.contents.map((content, index) => (
                          <button
                            key={index}
                            onClick={() => goToContent(index)}
                            className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                              index === currentContentIndex 
                                ? 'border-green-500 ring-2 ring-green-200' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <img
                              src={content}
                              alt={`Contenido ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2 mt-6">
            {product.videos?.[0] && (
              <div className="max-w-6xl mx-auto">
                <h3 className="text-lg font-semibold mb-4">Video del {product.model}</h3>
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  {isYouTubeVideo(product.videos[0]) ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`Video de ${product.model}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={product.videos[0]}
                      controls
                      className="w-full h-full object-cover"
                      preload="metadata"
                    >
                      Tu navegador no soporta el elemento de video.
                    </video>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Productos Relacionados */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center text-primary">Productos Relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.model} className="flex justify-center">
                    <div className="w-full max-w-sm">
                      <ProductCard {...relatedProduct} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail; 