import { Product, products } from "@/data/products";

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

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

export const getFeaturedProducts = (count: number = 6) => {
  const featuredIds = ["1", "6", "11", "19", "23", "27"];
  return products
    .filter(product => featuredIds.includes(product.id))
    .slice(0, count);
};

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const searchProducts = (query: string) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
}; 