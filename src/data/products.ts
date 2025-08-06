// Productos de Sanyi Lights basados en sanyilights.com
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  isOnSale: boolean;
  description: string;
  tags?: string[];
  specifications?: {
    power?: string;
    voltage?: string;
    dimensions?: string;
    weight?: string;
    features?: string[];
  };
}

export const products: Product[] = [
  {
    id: "1",
    name: "SPL-MHL-M251G YH",
    price: 85000,
    originalPrice: 95000,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    category: "Beam Moving Head",
    rating: 4.8,
    reviews: 24,
    isNew: true,
    isOnSale: true,
    description: "250W Beam Moving Head con tecnología avanzada para eventos profesionales",
    tags: ["beam", "moving head", "250w", "profesional"],
    specifications: {
      power: "250W",
      voltage: "AC 100-240V",
      dimensions: "420×320×580mm",
      weight: "18kg",
      features: ["CMY mixing", "Zoom 3-50°", "16-bit resolution", "IP20 protection"]
    }
  },
  {
    id: "2",
    name: "SPL-LED-M560S",
    price: 120000,
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=500&fit=crop",
    category: "LED Moving Head",
    rating: 4.9,
    reviews: 18,
    isNew: false,
    isOnSale: false,
    description: "5X120W LED Moving Light con efectos RGBW avanzados",
    tags: ["led", "moving head", "120w", "rgb"],
    specifications: {
      power: "600W",
      voltage: "AC 100-240V",
      dimensions: "450×350×620mm",
      weight: "22kg",
      features: ["RGBW mixing", "Zoom 3-60°", "24-bit resolution", "IP20 protection"]
    }
  },
  {
    id: "3",
    name: "SPL-LED-S616C IP",
    price: 45000,
    originalPrice: 52000,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
    category: "LED Series",
    rating: 4.7,
    reviews: 35,
    isNew: false,
    isOnSale: true,
    description: "IP 65 2*100W dual white LED blinder para exteriores",
    tags: ["led", "blinder", "ip65", "100w"],
    specifications: {
      power: "200W",
      voltage: "AC 100-240V",
      dimensions: "580×320×180mm",
      weight: "12kg",
      features: ["IP65 protection", "Dual white", "DMX512 control", "Waterproof"]
    }
  },
  {
    id: "4",
    name: "SPL-LED-P1815 6IN1 IP",
    price: 28000,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
    category: "LED PAR Light",
    rating: 4.6,
    reviews: 12,
    isNew: true,
    isOnSale: false,
    description: "IP 65 LED PAR LIGHT con 6 efectos integrados",
    tags: ["led", "par light", "ip65", "rgb"],
    specifications: {
      power: "180W",
      voltage: "AC 100-240V",
      dimensions: "320×320×180mm",
      weight: "8kg",
      features: ["IP65 protection", "6 effects", "RGB mixing", "Waterproof"]
    }
  },
  {
    id: "5",
    name: "SPL-LED-P1220 4IN1 IP",
    price: 22000,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop",
    category: "LED PAR Light",
    rating: 4.5,
    reviews: 28,
    isNew: false,
    isOnSale: false,
    description: "IP 65 LED PAR LIGHT con 4 efectos integrados",
    tags: ["led", "par light", "ip65", "4in1"],
    specifications: {
      power: "120W",
      voltage: "AC 100-240V",
      dimensions: "280×280×160mm",
      weight: "6kg",
      features: ["IP65 protection", "4 effects", "RGB mixing", "Waterproof"]
    }
  },
  {
    id: "6",
    name: "SPL-LED-P450 II IP",
    price: 18000,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=500&fit=crop",
    category: "LED PAR Light",
    rating: 4.4,
    reviews: 42,
    isNew: false,
    isOnSale: false,
    description: "IP 65 4 EYES PAR LIGHTS para iluminación escénica",
    tags: ["led", "par light", "ip65", "4 eyes"],
    specifications: {
      power: "450W",
      voltage: "AC 100-240V",
      dimensions: "450×450×200mm",
      weight: "15kg",
      features: ["IP65 protection", "4 eyes", "RGB mixing", "Waterproof"]
    }
  },
  {
    id: "7",
    name: "SPL-LED-M600BSWF",
    price: 95000,
    image: "https://images.unsplash.com/photo-1501281668545-0dc85e0b8e7b?w=500&h=500&fit=crop",
    category: "LED Moving Head",
    rating: 4.9,
    reviews: 15,
    isNew: true,
    isOnSale: false,
    description: "LED Beam Moving Head con tecnología de vanguardia",
    tags: ["led", "moving head", "beam", "profesional"],
    specifications: {
      power: "600W",
      voltage: "AC 100-240V",
      dimensions: "480×380×650mm",
      weight: "25kg",
      features: ["Beam effect", "Zoom 3-70°", "24-bit resolution", "IP20 protection"]
    }
  },
  {
    id: "8",
    name: "SPL-LED-M400B",
    price: 78000,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    category: "LED Moving Head",
    rating: 4.7,
    reviews: 22,
    isNew: false,
    isOnSale: false,
    description: "LED Moving Head Lights para eventos profesionales",
    tags: ["led", "moving head", "rgb", "profesional"],
    specifications: {
      power: "400W",
      voltage: "AC 100-240V",
      dimensions: "420×320×580mm",
      weight: "20kg",
      features: ["RGB mixing", "Zoom 3-50°", "16-bit resolution", "IP20 protection"]
    }
  },
  {
    id: "9",
    name: "SPL-LED-616C 6in1",
    price: 35000,
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=500&fit=crop",
    category: "LED Series",
    rating: 4.6,
    reviews: 19,
    isNew: false,
    isOnSale: true,
    description: "SOLSTICE DUO 616C con efectos especiales",
    tags: ["led", "6in1", "duo", "efectos"],
    specifications: {
      power: "616W",
      voltage: "AC 100-240V",
      dimensions: "580×320×180mm",
      weight: "14kg",
      features: ["6 effects", "Duo mode", "DMX512 control", "RGB mixing"]
    }
  },
  {
    id: "10",
    name: "SPL-LED-P2415 6IN1 IP",
    price: 32000,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
    category: "LED PAR Light",
    rating: 4.5,
    reviews: 31,
    isNew: false,
    isOnSale: false,
    description: "IP 65 LED PAR LIGHTS con 6 efectos integrados",
    tags: ["led", "par light", "ip65", "6in1"],
    specifications: {
      power: "240W",
      voltage: "AC 100-240V",
      dimensions: "380×380×200mm",
      weight: "10kg",
      features: ["IP65 protection", "6 effects", "RGB mixing", "Waterproof"]
    }
  },
  {
    id: "11",
    name: "SPL-LED-Display-1000",
    price: 150000,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
    category: "LED Display",
    rating: 4.8,
    reviews: 8,
    isNew: true,
    isOnSale: false,
    description: "LED Display Panel 1000x1000mm para eventos masivos",
    tags: ["led", "display", "panel", "1000mm"],
    specifications: {
      power: "1000W",
      voltage: "AC 100-240V",
      dimensions: "1000×1000×80mm",
      weight: "25kg",
      features: ["High resolution", "IP65 protection", "Modular design", "Waterproof"]
    }
  },
  {
    id: "12",
    name: "SPL-Console-DMX-512",
    price: 25000,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop",
    category: "Console Series",
    rating: 4.6,
    reviews: 45,
    isNew: false,
    isOnSale: false,
    description: "DMX 512 Console Controller para control profesional",
    tags: ["console", "dmx", "controller", "512"],
    specifications: {
      power: "50W",
      voltage: "AC 100-240V",
      dimensions: "400×300×100mm",
      weight: "3kg",
      features: ["512 channels", "LCD display", "USB interface", "MIDI support"]
    }
  }
];

// Categorías disponibles
export const categories = [
  "Todos",
  "Beam Moving Head",
  "LED Moving Head",
  "LED Series",
  "LED PAR Light",
  "Laser Light",
  "LED Display",
  "Console Series"
];

// Función para obtener un producto por ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Función para filtrar productos
export const filterProducts = (
  products: Product[],
  searchQuery: string = "",
  selectedCategory: string = ""
) => {
  return products.filter(product => {
    const matchesQuery = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === "" || 
      selectedCategory === "Todos" || 
      product.category === selectedCategory;
    
    return matchesQuery && matchesCategory;
  });
};

// Función para obtener productos destacados (como en sanyilights.com)
export const getFeaturedProducts = (count: number = 6) => {
  // Productos destacados basados en la página oficial
  const featuredIds = ["1", "2", "3", "4", "7", "11"]; // IDs de productos destacados
  return products
    .filter(product => featuredIds.includes(product.id))
    .slice(0, count);
};

// Función para obtener productos por categoría
export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

// Función para buscar productos
export const searchProducts = (query: string) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}; 