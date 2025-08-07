export interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  video: string;
  manual: string;
}

export const products: Product[] = [
  // AUTOMATED LIGHT - BEAM
  {
    id: "1",
    name: "VERSATILIS LUCIDUS 1000",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    category: "Beam Moving Head",
    description: "Moving head beam 1000W high brightness para eventos profesionales",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-1.pdf"
  },
  {
    id: "2",
    name: "VERSATILIS VERUS 1000",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=500&fit=crop",
    category: "Beam Moving Head",
    description: "SPL-PRO-1000HCRI high CRI beam moving head con excelente reproducción de color",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-2.pdf"
  },
  {
    id: "3",
    name: "VERSATILIS IMPERVIUS 1000",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
    category: "Beam Moving Head",
    description: "Moving head beam 1000W IP65 waterproof para exteriores",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-3.pdf"
  },
  {
    id: "4",
    name: "JUBARIS BEAM L200",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
    category: "Beam Moving Head",
    description: "L200 beam moving head compacto y potente",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-4.pdf"
  },
  {
    id: "5",
    name: "JUBARIS BEAM L90",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop",
    category: "Beam Moving Head",
    description: "Beam moving head compacto para espacios reducidos",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-5.pdf"
  },

  // AUTOMATED LIGHT - WASH
  {
    id: "6",
    name: "STELLA WASH 1940F",
    image: "https://images.unsplash.com/photo-1501281668545-0dc85e0b8e7b?w=500&h=500&fit=crop",
    category: "Wash Moving Head",
    description: "Moving head wash 19x15W LED para iluminación de escenarios",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-6.pdf"
  },
  {
    id: "7",
    name: "STELLA WASH 1920F",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    category: "Wash Moving Head",
    description: "Moving head wash 19x20W LED con excelente cobertura",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-7.pdf"
  },
  {
    id: "8",
    name: "STELLA WASH 740F",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=500&fit=crop",
    category: "Wash Moving Head",
    description: "Moving head wash 7x40W LED para eventos medianos",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-8.pdf"
  },
  {
    id: "9",
    name: "STELLA WASH 1940IP",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
    category: "Wash Moving Head",
    description: "Moving head wash 19x40W IP65 waterproof para exteriores",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-9.pdf"
  },
  {
    id: "10",
    name: "HUEWAVE MOVING HEAD 1915Z",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
    category: "Wash Moving Head",
    description: "Moving head wash 19x15W con zoom para control preciso",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-10.pdf"
  },

  // STATIC LIGHT - PAR LED
  {
    id: "11",
    name: "HUEWAVE PL 1810",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop",
    category: "LED PAR Light",
    description: "PAR LED 18x10W RGBWA para iluminación escénica",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-11.pdf"
  },
  {
    id: "12",
    name: "HUEWAVE PL 1810IP",
    image: "https://images.unsplash.com/photo-1501281668545-0dc85e0b8e7b?w=500&h=500&fit=crop",
    category: "LED PAR Light",
    description: "PAR LED 18x10W IP65 waterproof para exteriores",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-12.pdf"
  },
  {
    id: "13",
    name: "HUEWAVE PL 1210",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    category: "LED PAR Light",
    description: "PAR LED 12x10W RGBWA para eventos compactos",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-13.pdf"
  },
  {
    id: "14",
    name: "HUEWAVE PL 910IP",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=500&fit=crop",
    category: "LED PAR Light",
    description: "PAR LED 9x10W IP65 waterproof para exteriores",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-14.pdf"
  },
  {
    id: "15",
    name: "HUEWAVE PL 2410IP",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
    category: "LED PAR Light",
    description: "PAR LED 24x10W IP65 waterproof para alta potencia",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-15.pdf"
  },
  {
    id: "16",
    name: "HUEWAVE PL 363",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
    category: "LED PAR Light",
    description: "PAR LED 3x6W RGBWA compacto para espacios reducidos",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-16.pdf"
  },
  {
    id: "17",
    name: "DUALTONE PAR L450",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop",
    category: "LED PAR Light",
    description: "PAR LED 4x50W dual white para iluminación profesional",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-17.pdf"
  },
  {
    id: "18",
    name: "DUALTONE PAR L750",
    image: "https://images.unsplash.com/photo-1501281668545-0dc85e0b8e7b?w=500&h=500&fit=crop",
    category: "LED PAR Light",
    description: "PAR LED 7x50W dual white de alta potencia",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-18.pdf"
  },

  // STATIC LIGHT - BLINDER
  {
    id: "19",
    name: "COLOR SPECTRUM STROBE T3240",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    category: "LED Blinder",
    description: "Blinder LED 32x40W RGBWA para efectos de escena",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-19.pdf"
  },
  {
    id: "20",
    name: "COLOR SPECTRUM 4410IP",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=500&fit=crop",
    category: "LED Blinder",
    description: "Blinder LED 44x10W IP65 waterproof para exteriores",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-20.pdf"
  },

  // LED VIDEO WALL
  {
    id: "21",
    name: "LED VIDEO WALL P2.6 INDOOR",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
    category: "LED Display",
    description: "LED Video Wall P2.6 indoor 500x500mm para interiores",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-21.pdf"
  },
  {
    id: "22",
    name: "LED VIDEO WALL P3.91 OUTDOOR",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
    category: "LED Display",
    description: "LED Video Wall P3.91 outdoor 500x500mm para exteriores",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-22.pdf"
  },

  // CONTROLLER
  {
    id: "23",
    name: "HEMERA DMX C192",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop",
    category: "Console Series",
    description: "DMX Controller 192 channels para control profesional",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-23.pdf"
  },
  {
    id: "24",
    name: "HEMERA DMX C384",
    image: "https://images.unsplash.com/photo-1501281668545-0dc85e0b8e7b?w=500&h=500&fit=crop",
    category: "Console Series",
    description: "DMX Controller 384 channels para eventos grandes",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-24.pdf"
  },
  {
    id: "25",
    name: "EMPOWERER UNI4",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    category: "Console Series",
    description: "DMX Controller universal 4 universes para control avanzado",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-25.pdf"
  },
  {
    id: "26",
    name: "EMPOWERER MINI2",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=500&fit=crop",
    category: "Console Series",
    description: "DMX Controller mini 2 universes para eventos compactos",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-26.pdf"
  },

  // TV & STUDIO
  {
    id: "27",
    name: "STUDIO LUX 1600",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
    category: "TV & Studio",
    description: "Studio light 1600W para producción televisiva profesional",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-27.pdf"
  },
  {
    id: "28",
    name: "STUDIO LUX FRESNEL 400",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
    category: "TV & Studio",
    description: "Studio Fresnel 400W para iluminación de estudio",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-28.pdf"
  },

  // EFFECT LIGHT
  {
    id: "29",
    name: "VINTAGE COLUMNA 6",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop",
    category: "Effect Light",
    description: "Efecto vintage columna 6 canales para ambiente retro",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-29.pdf"
  },
  {
    id: "30",
    name: "VINTAGE CIRCULUS 7",
    image: "https://images.unsplash.com/photo-1501281668545-0dc85e0b8e7b?w=500&h=500&fit=crop",
    category: "Effect Light",
    description: "Efecto vintage circular 7 canales para efectos especiales",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-30.pdf"
  },
  {
    id: "31",
    name: "LEVATIO BALL",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    category: "Effect Light",
    description: "Efecto bola flotante para eventos únicos",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-31.pdf"
  },

  // EFFECT MACHINE
  {
    id: "32",
    name: "MAGICAL MIST",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=500&fit=crop",
    category: "Effect Machine",
    description: "Máquina de niebla mágica para efectos atmosféricos",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-32.pdf"
  },
  {
    id: "33",
    name: "MIST 2L",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
    category: "Effect Machine",
    description: "Máquina de niebla 2L para efectos de escena",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-33.pdf"
  }
];

// Categorías actualizadas basadas en Sanyi Lights US
export const categories = [
  "Todos",
  "Beam Moving Head",
  "Wash Moving Head", 
  "LED PAR Light",
  "LED Blinder",
  "LED Display",
  "Console Series",
  "TV & Studio",
  "Effect Light",
  "Effect Machine"
]