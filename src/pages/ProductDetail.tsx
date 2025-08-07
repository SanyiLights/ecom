import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, FileText } from "lucide-react";
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Footer } from "@/components/ui/footer";
import { getProductById } from "@/data/products";

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

  const openDemoVideo = () => {
    window.open(product.video, '_blank');
  };

  const openUserManual = () => {
    window.open(product.manual, '_blank');
  };

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

                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    onClick={openDemoVideo}
                    className="flex-1 group"
                  >
                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Ver Demo
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={openUserManual}
                    className="flex-1 group"
                  >
                    <FileText className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Manual Usuario
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail; 