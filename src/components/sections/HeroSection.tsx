import { Button } from "@/components/ui/button";
import { ArrowRight} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const professionalVideos = [
  {
    src: "/videos/video1.mp4",
    title: "SPL-LED-1260",
    subtitle: "12*60W LED MOVING BAR ZOOM",
    productRoute: "/producto/SPL-LED-1260",
    type: "local",
    new: false
  },
  {
    src: "https://www.youtube.com/watch?v=J5wAKFQtPNs&t=9s",
    title: "SPL-LED-700",
    subtitle: "700W LED Profile",
    productRoute: "/producto/SPL-LED-700",
    type: "youtube",
    new: true
  },
  {
    src: "https://www.youtube.com/watch?v=RFt90EgxTTk&t=1m16s",
    title: "LED WASH MOVING HEAD ZOOM + BEE EYE",
    subtitle: "SPL-LED-M1940 EYE IP",
    productRoute: "/producto/SPL-LED-M1940-EYE-IP",
    type: "youtube",
    new: true
  }
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
    }, oneSecond * 10);

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

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getYouTubeStartTime = (url: string) => {
    // Extraer tiempo de inicio de la URL (ej: &t=9s, &t=1m30s, &t=90)
    const timeMatch = url.match(/[?&]t=([^&]+)/);
    if (!timeMatch) return 0;
    
    const timeStr = timeMatch[1];
    
    // Si termina en 's' (segundos)
    if (timeStr.endsWith('s')) {
      return parseInt(timeStr.slice(0, -1));
    }
    
    // Si termina en 'm' (minutos)
    if (timeStr.endsWith('m')) {
      return parseInt(timeStr.slice(0, -1)) * 60;
    }
    
    // Si termina en 'h' (horas)
    if (timeStr.endsWith('h')) {
      return parseInt(timeStr.slice(0, -1)) * 3600;
    }
    
    // Si es solo un número (segundos)
    return parseInt(timeStr) || 0;
  };

  const renderVideoContent = (video: typeof professionalVideos[0]) => {
    if (video.type === "youtube") {
      const videoId = getYouTubeVideoId(video.src);
      const startTime = getYouTubeStartTime(video.src);
      
      if (videoId) {
        return (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=${startTime}`}
            title={video.title}
            className="w-full h-full object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      }
    }
    
    // Video local
    return (
      <video
        src={video.src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    );
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
        {professionalVideos.map((video, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {renderVideoContent(video)}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-3">
        {professionalVideos.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            onClick={() => goToImage(index)}
            className={`w-8 h-8 rounded-full p-0 transition-all duration-700 font-bold text-sm relative overflow-hidden group ${
              index === currentImageIndex
                ? 'bg-gradient-to-br from-white via-white to-gray-100 text-black scale-125 shadow-2xl shadow-white/50 border-2 border-white/60 hover:scale-110'
                : 'bg-gradient-to-br from-black/30 via-black/20 to-transparent text-white/90 hover:scale-110 hover:bg-gradient-to-br hover:from-white/20 hover:via-white/15 hover:to-transparent hover:text-white border border-white/20 hover:border-white/40'
            }`}
          >
            <span className="relative z-10">{index + 1}</span>
            {index === currentImageIndex && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            )}
          </Button>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 h-[100vh] sm:h-[90vh] flex items-center">
        <div className="w-full">
          <div className="max-w-4xl text-white mb-8 sm:mb-12 mx-auto text-center">
            <div className="animate-fade-in">
              {/* Chip de NUEVO para productos nuevos */}
              {professionalVideos[currentImageIndex].new && (
                <div className="mb-4">
                  <span className="inline-block bg-red-600 text-white font-bold text-sm sm:text-base px-4 py-2 rounded-full shadow-lg border-2 border-white/20">
                    NUEVO
                  </span>
                </div>
              )}
              
              <h1 
                key={currentImageIndex} 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight animate-in slide-in-from-bottom-4 duration-700"
              >
                {professionalVideos[currentImageIndex].title}
              </h1>
              <p 
                key={`subtitle-${currentImageIndex}`}
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed animate-in slide-in-from-bottom-4 duration-700 delay-200"
              >
                {professionalVideos[currentImageIndex].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link to={professionalVideos[currentImageIndex].productRoute} onClick={() => window.scrollTo(0, 0)}>
                  <Button 
                    size="lg" 
                    className="bg-white text-black hover:bg-red-600 hover:text-white shadow-elegant group w-auto text-base sm:text-lg lg:text-xl px-6 sm:px-8 py-6 sm:py-8 font-bold tracking-wide hover:scale-105 transition-all duration-300"
                  >
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