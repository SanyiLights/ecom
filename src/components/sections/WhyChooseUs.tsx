import { Award, Users, Truck, Shield } from "lucide-react";

export const WhyChooseUs = () => {
  return (
    <div className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">
          ¿Por qué elegir Sanyi Lights?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">23+ años de experiencia</h3>
            <p className="text-muted-foreground">
              En la fabricación de iluminación escénica profesional
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Equipo local experto</h3>
            <p className="text-muted-foreground">
              Soporte técnico, garantía y asistencia al cliente
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Entrega rápida</h3>
            <p className="text-muted-foreground">
              Directamente desde nuestra sucursal en Argentina
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Soluciones de vanguardia</h3>
            <p className="text-muted-foreground">
              Iluminación de alto rendimiento y tecnología avanzada
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Garantía</h3>
            <p className="text-muted-foreground">
              Respaldamos todos nuestros productos con garantía oficial
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
