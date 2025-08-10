import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";
import { getBadgeClasses } from "@/lib/colors";

export const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "María",
      role: "Event Planner",
      company: "Eventos Premium",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop",
      rating: 5,
      comment: "Los equipos de Sanyi Lights transformaron completamente nuestro evento corporativo. La calidad es excepcional y el soporte técnico fue fundamental para el éxito del evento.",
      event: "Evento Corporativo - 500 personas"
    },
    {
      id: 2,
      name: "Carlos",
      role: "DJ Profesional",
      company: "Sound & Light Studio",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
      comment: "He trabajado con muchas marcas de iluminación, pero Sanyi Lights se destaca por su confiabilidad y efectos visuales impresionantes. Mi público siempre queda fascinado.",
      event: "Fiesta de 15 años - 200 invitados"
    },
    {
      id: 3,
      name: "Ana",
      role: "Productora de Eventos",
      company: "Producciones Martínez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      rating: 5,
      comment: "La atención al cliente es increíble. Desde la asesoría inicial hasta la instalación, todo fue perfecto. Los equipos funcionaron sin problemas durante 8 horas continuas.",
      event: "Boda de lujo - 300 invitados"
    },
    {
      id: 4,
      name: "Diego",
      role: "Técnico de Iluminación",
      company: "Teatro Municipal",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      rating: 5,
      comment: "Como técnico, aprecio la calidad de construcción de estos equipos. Son robustos, fáciles de configurar y los efectos son espectaculares. Definitivamente los recomiendo.",
      event: "Obra de teatro - 2 semanas"
    },
    {
      id: 5,
      name: "Laura",
      role: "Organizadora de Eventos",
      company: "Celebraciones Fernández",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
      rating: 5,
      comment: "El servicio post-venta es excepcional. Cuando tuve una consulta técnica a las 11pm, me respondieron inmediatamente. Eso habla de su compromiso con el cliente.",
      event: "Cumpleaños empresarial - 150 personas"
    },
    {
      id: 6,
      name: "Roberto",
      role: "Músico Profesional",
      company: "Banda Los Profesionales",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating: 5,
      comment: "Los efectos de iluminación sincronizados con la música crearon una experiencia mágica. El público no paraba de tomar fotos y videos. ¡Increíble!",
      event: "Concierto en vivo - 800 espectadores"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className={`mb-4 ${getBadgeClasses('primary')}`}>
            Testimonios
          </Badge>
          <h2 className="text-4xl font-bold mb-6 animate-fade-in">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
            Descubre por qué cientos de profesionales confían en Sanyi Lights para sus eventos
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-red-100 text-red-600 font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                  <Quote className="h-6 w-6 text-red-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {testimonial.event}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    ⭐ {testimonial.rating}/5
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile/Tablet Carousel */}
        <div className="lg:hidden">
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="pl-4">
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback className="bg-red-100 text-red-600 font-semibold">
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                          </div>
                        </div>
                        <Quote className="h-6 w-6 text-red-400 opacity-50" />
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        "{testimonial.comment}"
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {testimonial.event}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          ⭐ {testimonial.rating}/5
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}; 