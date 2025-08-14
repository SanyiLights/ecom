import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { Category } from '@/data/categories';

interface ProductControlsProps {
  searchTerm: string;
  selectedCategory: Category;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: Category) => void;
  onAddProduct: () => void;
}

export const ProductControls: React.FC<ProductControlsProps> = ({
  searchTerm,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  onAddProduct
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        <div className="relative">
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:w-80"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value as Category)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.values(Category).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={onAddProduct} className="whitespace-nowrap">
        <Plus className="h-4 w-4 mr-2" />
        Agregar Producto
      </Button>
    </div>
  );
};
