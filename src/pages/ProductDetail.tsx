import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Footer } from "@/components/ui/footer";
import { getProductById } from "@/lib/product-utils";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = getProductById(id || "");

  useEffect(() => {
    if (!product) {
      navigate('/productos');
    }
  }, [product, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return null;
  }

  const openUserManual = () => {
    window.open(product.manual, '_blank');
  };

  // Función para extraer el ID del video de YouTube
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(product.video);

  return (
    <div className="min-h-screen bg-background">
      <Navigation isTransparent={false} />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
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
            <div className="space-y-4">
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

                <p className="text-lg text-muted-foreground mb-6">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Video Embebido */}
          {videoId && (
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Video del Producto</h3>
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`Video de ${product.name}`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Manual de Usuario */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Manual de Usuario</h3>
            <Button 
              onClick={openUserManual}
              variant="outline"
              className="group"
            >
              <FileText className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Descargar Manual de Usuario
            </Button>
          </div>

          <div className="mt-12">
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">Descripción del Producto</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail; 