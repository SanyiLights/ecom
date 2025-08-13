import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const professionalVideos = [
  {
    src: "/videos/video1.mp4",
    title: "SPL-LED-1260",
    subtitle: "12*60W LED moving bar zoom",
    productRoute: "/producto/SPL-LED-1260"
  },
];

export const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const oneSecond = 1000;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === professionalVideos.length - 1 ? 0 : prevIndex + 1
      );
    }, oneSecond * 5);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === professionalVideos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? professionalVideos.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  const getButtonClasses = (variant: 'primary' | 'secondary') => {
    if (variant === 'primary') {
      return 'bg-white text-black hover:bg-white/90';
    }
    return 'border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/80';
  };

  const openWhatsApp = () => {
    const phoneNumber = '5491133333333'; // Replace with your actual WhatsApp number
    const message = 'Hola, me gustaría saber más sobre el producto.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="relative min-h-[100vh] sm:min-h-[90vh] overflow-hidden">
      <div 
        className="absolute inset-0"
        ref={carouselRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {professionalVideos.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <video
              src={image.src}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
          </div>
        ))}
      </div>

      {/* Navigation Buttons - Bottom Right */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">
        {professionalVideos.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            onClick={() => goToImage(index)}
            className={`w-8 h-8 rounded-full p-0 transition-all duration-300 font-bold text-sm ${
              index === currentImageIndex
                ? 'bg-white text-black scale-110 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/40 hover:scale-105'
            }`}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      {/* Dots Indicator - Remove old one */}

      <div className="relative z-10 container mx-auto px-4 h-[100vh] sm:h-[90vh] flex items-center">
        <div className="w-full">
          <div className="max-w-4xl text-white mb-8 sm:mb-12 mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
                {professionalVideos[currentImageIndex].title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
                {professionalVideos[currentImageIndex].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link to={professionalVideos[currentImageIndex].productRoute} onClick={() => window.scrollTo(0, 0)}>
                  <Button size="lg" className={`${getButtonClasses('primary')} shadow-elegant group w-auto text-base sm:text-lg lg:text-xl px-6 sm:px-8 py-6 sm:py-8 font-bold tracking-wide hover:scale-105 transition-all duration-300`}>
                    DESCUBRILO
                    <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};