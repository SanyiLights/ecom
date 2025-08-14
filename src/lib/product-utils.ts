import { Product } from "@/data/products";

export const getProductByModel = (products: Product[], model: string): Product | undefined => {
  const decoded = decodeURIComponent(model);
  return products.find(product => product.model === decoded);
};

export const filterProducts = (
  products: Product[],
  searchQuery: string = "",
  selectedCategory: string = "",
  showOnlyNew: boolean = false
) => {
  // Validar que products sea un array
  if (!Array.isArray(products)) {
    console.warn('filterProducts: products no es un array, retornando array vacío');
    return [];
  }

  return products.filter(product => {
    const matchesQuery = 
      product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "" || 
      selectedCategory === "Todos" || 
      product.category === selectedCategory;
    
    const matchesNewFilter = !showOnlyNew || product.new;
    
    return matchesQuery && matchesCategory && matchesNewFilter;
  });
};

export const getFeaturedProducts = (products: Product[], count: number = 6) => {
  // Validar que products sea un array
  if (!Array.isArray(products)) {
    console.warn('getFeaturedProducts: products no es un array, retornando array vacío');
    return [];
  }

  const featuredModels = [
    "SPL-LED-700",
    "SPL-LED-681",
    "SPL-LED-M600BSWF",
    "SPL-MHL-420 IP",
    "SPL-LED-M400B",
    "SPL-MHL-M251G YH",
  ];

  const prioritized = products.filter(product => featuredModels.includes(product.model));

  if (prioritized.length >= count) {
    return prioritized.slice(0, count);
  }

  const remaining = products.filter(product => !featuredModels.includes(product.model));
  return [...prioritized, ...remaining].slice(0, count);
};

export const searchProducts = (products: Product[], query: string) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.model.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
};

export const getProductsByCategory = (products: Product[], category: string, count: number = 3, excludeModel?: string) => {
  if (!category || category === "Todos") return [];
  
  const categoryProducts = products.filter(product => 
    product.category === category && product.model !== excludeModel
  );
  
  // Mezclar aleatoriamente y tomar los primeros 'count' productos
  const shuffled = categoryProducts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}; 