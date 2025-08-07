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
  {
    id: "1",
    name: "SPL-MHL-M251G YH",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    category: "Beam Moving Head",
    description: "250W Beam Moving Head con tecnología avanzada para eventos profesionales",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-1.pdf"
  },
  {
    id: "2",
    name: "SPL-LED-M560S",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=500&fit=crop",
    category: "LED Moving Head",
    description: "5X120W LED Moving Light con efectos RGBW avanzados",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-2.pdf"
  },
  {
    id: "3",
    name: "SPL-LED-S616C IP",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
    category: "LED Series",
    description: "IP 65 2*100W dual white LED blinder para exteriores",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-3.pdf"
  },
  {
    id: "4",
    name: "SPL-LED-P1815 6IN1 IP",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
    category: "LED PAR Light",
    description: "IP 65 LED PAR LIGHT con 6 efectos integrados",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-4.pdf"
  },
  {
    id: "5",
    name: "SPL-LED-P1220 4IN1 IP",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop",
    category: "LED PAR Light",
    description: "IP 65 LED PAR LIGHT con 4 efectos integrados",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-5.pdf"
  },
  {
    id: "6",
    name: "SPL-LED-P450 II IP",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=500&fit=crop",
    category: "LED PAR Light",
    description: "IP 65 4 EYES PAR LIGHTS para iluminación escénica",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-6.pdf"
  },
  {
    id: "7",
    name: "SPL-LED-M600BSWF",
    image: "https://images.unsplash.com/photo-1501281668545-0dc85e0b8e7b?w=500&h=500&fit=crop",
    category: "LED Moving Head",
    description: "LED Beam Moving Head con tecnología de vanguardia",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-7.pdf"
  },
  {
    id: "8",
    name: "SPL-LED-M400B",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    category: "LED Moving Head",
    description: "LED Moving Head Lights para eventos profesionales",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-8.pdf"
  },
  {
    id: "9",
    name: "SPL-LED-616C 6in1",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=500&fit=crop",
    category: "LED Series",
    description: "SOLSTICE DUO 616C con efectos especiales",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-9.pdf"
  },
  {
    id: "10",
    name: "SPL-LED-P2415 6IN1 IP",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
    category: "LED PAR Light",
    description: "IP 65 LED PAR LIGHTS con 6 efectos integrados",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-10.pdf"
  },
  {
    id: "11",
    name: "SPL-LED-Display-1000",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
    category: "LED Display",
    description: "LED Display Panel 1000x1000mm para eventos masivos",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-11.pdf"
  },
  {
    id: "12",
    name: "SPL-Console-DMX-512",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop",
    category: "Console Series",
    description: "DMX 512 Console Controller para control profesional",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    manual: "https://example.com/manual-12.pdf"
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
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
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
    product.description.toLowerCase().includes(searchTerm)
  );
}; 