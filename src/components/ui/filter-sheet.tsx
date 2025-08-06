import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Filter, X } from "lucide-react";

interface FilterOptions {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  sortBy: string;
}

export const FilterSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    brands: [],
    priceRange: [0, 200000],
    rating: 0,
    sortBy: "relevance"
  });

  const categories = [
    "Luces Par",
    "Moving Lights",
    "Barras LED", 
    "Efectos Láser",
    "Controladores",
    "Cables y Conectores"
  ];

  const brands = [
    "Sanyi",
    "Chauvet",
    "Martin",
    "Clay Paky",
    "Robe",
    "Vari-Lite"
  ];

  const sortOptions = [
    { value: "relevance", label: "Relevancia" },
    { value: "price-low", label: "Precio: Menor a Mayor" },
    { value: "price-high", label: "Precio: Mayor a Menor" },
    { value: "rating", label: "Mejor Valorados" },
    { value: "newest", label: "Más Recientes" }
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }));
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      brands: checked 
        ? [...prev.brands, brand]
        : prev.brands.filter(b => b !== brand)
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 200000],
      rating: 0,
      sortBy: "relevance"
    });
  };

  const activeFiltersCount = filters.categories.length + filters.brands.length + 
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 200000 ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros Avanzados
            </span>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-destructive hover:text-destructive"
              >
                Limpiar
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4 space-y-6">
            
            {/* Sort By */}
            <div>
              <h3 className="font-semibold mb-3">Ordenar por</h3>
              <RadioGroup
                value={filters.sortBy}
                onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
              >
                {sortOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Separator />

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-3">Rango de Precio</h3>
              <div className="space-y-4">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                  max={200000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${filters.priceRange[0].toLocaleString()}</span>
                  <span>${filters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-3">Categorías</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Brands */}
            <div>
              <h3 className="font-semibold mb-3">Marcas</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                    />
                    <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Rating */}
            <div>
              <h3 className="font-semibold mb-3">Valoración Mínima</h3>
              <div className="space-y-4">
                <Slider
                  value={[filters.rating]}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value[0] }))}
                  max={5}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0 estrellas</span>
                  <span>{filters.rating} estrellas</span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="p-4 space-y-4">
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => setIsOpen(false)}>
                Aplicar Filtros
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Limpiar Todo
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}; 