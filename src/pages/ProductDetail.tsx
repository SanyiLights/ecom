import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Footer } from "@/components/sections/Footer";
import { getProductByModel, getProductsByCategory } from "@/lib/product-utils";
import { Product } from "@/data/products";
import { useQuoteList } from "@/hooks/use-quote-list";
import { openWhatsAppForModel, openWhatsAppForModels } from "@/lib/contact";
import { ProductCard } from "@/components/ui/product-card";

const ProductDetail = () => {
  const { model } = useParams<{ model: string }>();
  const navigate = useNavigate();

  const product: Product = getProductByModel(model || "");
  const { add, has, toggle, items } = useQuoteList();

  // Obtener productos relacionados de la misma categoría
  const relatedProducts = getProductsByCategory(product?.category || "", 3, product?.model || "");

  useEffect(() => {
    if (!product) {
      navigate('/productos');
    }
  }, [product, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const isYouTubeVideo = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const videoId = getYouTubeVideoId(product.video || "");

  if (!product) return null;

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

            <div className="grid grid-cols-1 gap-3 mt-2">
              <div className="space-y-4">
                {/* Primera imagen del producto */}
                <div className="relative w-full max-w-6xl mx-auto bg-white rounded-lg overflow-hidden shadow-sm">
                  <img 
                    src={product.image} 
                    alt={product.description}
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] object-contain bg-white"
                    style={{
                      imageRendering: 'crisp-edges',
                      border: 'none',
                      outline: 'none',
                      boxShadow: 'none',
                      filter: 'none'
                    }}
                  />
                </div>

                {product.content2 && (
                  <div className="relative w-full max-w-6xl mx-auto bg-white rounded-lg overflow-hidden shadow-sm">
                    <img 
                      src={product.content2} 
                      alt={`${product.description} - Vista adicional`}
                      className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] object-contain bg-white"
                      style={{
                        imageRendering: 'crisp-edges',
                        border: 'none',
                        outline: 'none',
                        boxShadow: 'none',
                        filter: 'none'
                      }}
                    />
                  </div>
                )}
              </div>
        
            <div className="space-y-2">
              {product.video && (
                <div className="max-w-6xl mx-auto">
                  <h3 className="text-lg font-semibold mb-4">Video del {product.model}</h3>
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    {isYouTubeVideo(product.video) ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={`Video de ${product.model}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={product.video}
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
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail; 