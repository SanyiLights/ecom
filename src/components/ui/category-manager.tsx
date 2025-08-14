import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Plus, Edit, Trash2, X, Check } from 'lucide-react';
import { Category, categories } from '@/data/categories';
import { toast } from 'sonner';

interface CategoryManagerProps {
  onCategoryChange: (categories: Category[]) => void;
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({ onCategoryChange }) => {
  const [currentCategories, setCurrentCategories] = useState<Category[]>(categories.slice(1)); // Excluimos "ALL"
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = newCategoryName.trim() as Category;
      if (!currentCategories.includes(newCategory)) {
        const updatedCategories = [...currentCategories, newCategory];
        setCurrentCategories(updatedCategories);
        onCategoryChange(updatedCategories);
        setNewCategoryName('');
        setIsAddingCategory(false);
        toast.success(`Categoría "${newCategory}" agregada`);
      } else {
        toast.error('Esta categoría ya existe');
      }
    }
  };

  const handleEditCategory = (oldCategory: Category, newName: string) => {
    if (newName.trim() && newName.trim() !== oldCategory) {
      const newCategory = newName.trim() as Category;
      if (!currentCategories.includes(newCategory)) {
        const updatedCategories = currentCategories.map(cat => 
          cat === oldCategory ? newCategory : cat
        );
        setCurrentCategories(updatedCategories);
        onCategoryChange(updatedCategories);
        setEditingCategory(null);
        toast.success(`Categoría "${oldCategory}" actualizada a "${newCategory}"`);
      } else {
        toast.error('Esta categoría ya existe');
      }
    }
  };

  const handleDeleteCategory = (categoryToDelete: Category) => {
    if (confirm(`¿Estás seguro de que quieres eliminar la categoría "${categoryToDelete}"?`)) {
      const updatedCategories = currentCategories.filter(cat => cat !== categoryToDelete);
      setCurrentCategories(updatedCategories);
      onCategoryChange(updatedCategories);
      toast.success(`Categoría "${categoryToDelete}" eliminada`);
    }
  };

  const startEditing = (category: Category) => {
    setEditingCategory(category);
  };

  const cancelEditing = () => {
    setEditingCategory(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Gestión de Categorías</CardTitle>
          <Button
            onClick={() => setIsAddingCategory(true)}
            size="sm"
            className="h-8"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Categoría
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Agregar nueva categoría */}
        {isAddingCategory && (
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <Input
              placeholder="Nombre de la nueva categoría"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            />
            <Button
              onClick={handleAddCategory}
              size="sm"
              className="h-8 px-3"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => {
                setIsAddingCategory(false);
                setNewCategoryName('');
              }}
              variant="outline"
              size="sm"
              className="h-8 px-3"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Lista de categorías */}
        <div className="space-y-2">
          {currentCategories.map((category) => (
            <div
              key={category}
              className="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50"
            >
              {editingCategory === category ? (
                <div className="flex items-center space-x-2 flex-1">
                  <Input
                    value={category}
                    onChange={(e) => {
                      const newName = e.target.value;
                      if (newName.trim()) {
                        handleEditCategory(category, newName);
                      }
                    }}
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleEditCategory(category, e.currentTarget.value)}
                    onBlur={() => handleEditCategory(category, category)}
                    autoFocus
                  />
                  <Button
                    onClick={() => handleEditCategory(category, category)}
                    size="sm"
                    className="h-8 px-3"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={cancelEditing}
                    variant="outline"
                    size="sm"
                    className="h-8 px-3"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <span className="font-medium text-gray-900">{category}</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => startEditing(category)}
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteCategory(category)}
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {currentCategories.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <p>No hay categorías definidas</p>
            <p className="text-sm">Agrega tu primera categoría para empezar</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
