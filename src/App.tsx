import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  const openWhatsApp = () => {
    const phoneNumber = "5491171388885";
    const message = "Hola! Me interesa conocer más sobre sus equipos de iluminación profesional.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter basename="/ecom">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <Button
            onClick={openWhatsApp}
            size="lg"
            className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white shadow-lg rounded-full w-16 h-16 p-0 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle className="h-8 w-8" />
          </Button>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
