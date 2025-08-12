import { Product } from "@/data/products";
import { products } from "@/data/products";

export const getProductByModel = (model: string): Product | undefined => {
  const decoded = decodeURIComponent(model);
  return products.find(product => product.model === decoded);
};

export const filterProducts = (
  products: Product[],
  searchQuery: string = "",
  selectedCategory: string = "",
  showOnlyNew: boolean = false
) => {
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

export const getFeaturedProducts = (count: number = 6) => {
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

export const searchProducts = (query: string) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.model.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
}; 