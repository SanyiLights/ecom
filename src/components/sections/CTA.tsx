import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, Phone, Mail, Clock } from "lucide-react";
import { getBadgeClasses, getButtonClasses } from "@/lib/colors";

export const CTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className={`mb-6 ${getBadgeClasses('primary')}`}>
            ¿Listo para brillar?
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transforma Tu Próximo Evento
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contacta con nuestros especialistas y descubre cómo podemos hacer que tu espectáculo brille con luz propia
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className={`text-white ${getButtonClasses('primary')} group`}>
              Cotizar Proyecto
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Ver Catálogo Completo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Alert>
              <Phone className="h-4 w-4" />
              <AlertDescription>
                <strong>WhatsApp:</strong> +54 11 1234-5678
              </AlertDescription>
            </Alert>
            
            <Alert>
              <Mail className="h-4 w-4" />
              <AlertDescription>
                <strong>Email:</strong> info@sanyilights.com
              </AlertDescription>
            </Alert>
            
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                <strong>Horarios:</strong> Lun-Vie 9-18hs
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </section>
  );
}; 