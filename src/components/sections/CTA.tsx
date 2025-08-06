import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            ¿Listo para brillar?
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transforma Tu Próximo Evento
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contacta con nuestros especialistas y descubre cómo podemos hacer que tu espectáculo 
            brille con luz propia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary-dark group">
              Cotizar Proyecto
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Ver Catálogo Completo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}; 