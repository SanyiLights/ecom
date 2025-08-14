import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, LogOut, Settings, Package, Image as ImageIcon, Video, FileText } from 'lucide-react';
import { FileUpload } from '@/components/ui/file-upload';

import { CategoryManager } from '@/components/ui/category-manager';
import { AdminStats } from '@/components/ui/admin-stats';
import { Product, products } from '@/data/products';
import { Category, categories } from '@/data/categories';
import { toast } from 'sonner';
import { authenticate, isAccountLocked, getLockoutTimeRemaining, generateSessionToken, validateSessionToken } from '../lib/auth';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [sessionToken, setSessionToken] = useState<string>('');
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);


  // Verificar token de sesión al cargar
  useEffect(() => {
    const savedToken = localStorage.getItem('admin_session_token');
    if (savedToken && validateSessionToken(savedToken)) {
      setSessionToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validar campos vacíos
      if (!username.trim() || !password.trim() || !secretKey.trim()) {
        toast.error('Por favor completa todos los campos');
        return;
      }
      
      console.log('🔐 Intentando autenticación...');
      console.log('Usuario:', username);
      console.log('Contraseña:', password ? '***' : 'VACÍO');
      console.log('Clave Secreta:', secretKey ? '***' : 'VACÍO');
      
      // Verificar si la cuenta está bloqueada
      if (isAccountLocked()) {
        const remaining = getLockoutTimeRemaining();
        toast.error(`Cuenta bloqueada. Intenta de nuevo en ${Math.floor(remaining / 60000)} minutos`);
        return;
      }
      
      // Intentar autenticación
      const authResult = authenticate(username, password, secretKey);
      console.log('✅ Resultado de autenticación:', authResult);
      
      if (authResult) {
        const token = generateSessionToken();
        setSessionToken(token);
        localStorage.setItem('admin_session_token', token);
        setIsAuthenticated(true);
        toast.success('¡Bienvenido al panel de administración!');
      } else {
        console.log('❌ Autenticación fallida');
        toast.error('Credenciales incorrectas. Verifica usuario, contraseña y clave secreta.');
      }
      
    } catch (error) {
      console.error('🚨 Error durante el login:', error);
      toast.error(`Error inesperado: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setSecretKey('');
    setSessionToken('');
    localStorage.removeItem('admin_session_token');
    toast.success('Sesión cerrada');
  };

  const handleAddProduct = () => {
    setIsAddingProduct(true);
    setEditingProduct(null);

  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsAddingProduct(false);
  };

  const handleDeleteProduct = (productToDelete: Product) => {
    if (confirm(`¿Estás seguro de que quieres eliminar el producto "${productToDelete.model}"?`)) {
      const updatedProducts = currentProducts.filter(p => p.model !== productToDelete.model);
      setCurrentProducts(updatedProducts);
      toast.success(`Producto "${productToDelete.model}" eliminado`);
    }
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (editingProduct) {
      // Actualizar producto existente
      const updatedProducts = currentProducts.map(p => 
        p.model === editingProduct.model ? { ...p, ...productData } : p
      );
      setCurrentProducts(updatedProducts);
      setEditingProduct(null);
      toast.success(`Producto "${productData.model}" actualizado`);
    } else {
      // Agregar nuevo producto
      const newProduct: Product = {
        model: productData.model || '',
        description: productData.description || '',
        category: productData.category || Category.MOVING_HEAD,
        image: productData.image || '/placeholder.svg',
        content: productData.content || '/placeholder.svg',
        content2: productData.content2,
        video: productData.video,
        new: productData.new || false
      };
      setCurrentProducts([...currentProducts, newProduct]);
      setIsAddingProduct(false);
      toast.success(`Producto "${newProduct.model}" agregado`);
    }
  };

  const filteredProducts = currentProducts.filter(product => {
    const matchesSearch = product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === Category.ALL || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Panel de Administración
            </CardTitle>
            <CardDescription>
              Accede al panel de gestión de productos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Usuario de administrador"
                  required

                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña de administrador"
                  required

                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secretKey">Clave Secreta</Label>
                <Input
                  id="secretKey"
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="Clave secreta de acceso"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Iniciar Sesión
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-500">
              <p className="text-red-600 font-medium">⚠️ Acceso Restringido</p>
              <p className="text-xs mt-2">
                Solo personal autorizado puede acceder a este panel.
                <br />
                Contacta al administrador del sistema para obtener credenciales.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Settings className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Gestión de Productos</TabsTrigger>
            <TabsTrigger value="categories">Categorías</TabsTrigger>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative">
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-80"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as Category)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <Button onClick={handleAddProduct} className="whitespace-nowrap">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Producto
              </Button>
            </div>

            {/* Product Form */}
            {(isAddingProduct || editingProduct) && (
              <ProductForm
                product={editingProduct}
                onSave={handleSaveProduct}
                onCancel={() => {
                  setIsAddingProduct(false);
                  setEditingProduct(null);
                }}

              />
            )}

            {/* Products List */}
            <div className="grid gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.model}
                  product={product}
                  onEdit={() => handleEditProduct(product)}
                  onDelete={() => handleDeleteProduct(product)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-500">
                  {searchTerm || selectedCategory !== Category.ALL
                    ? 'Intenta ajustar los filtros de búsqueda'
                    : 'No hay productos en el catálogo'}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <CategoryManager
              onCategoryChange={(newCategories) => {
                // Aquí podrías actualizar las categorías globales
                toast.success('Categorías actualizadas');
              }}
            />
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <AdminStats products={currentProducts} categories={categories} />
          </TabsContent>

        </Tabs>
      </main>

    </div>
  );
};

// Componente para mostrar cada producto
const ProductCard: React.FC<{
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ product, onEdit, onDelete }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              {product.image && product.image !== '/placeholder.svg' ? (
                <img
                  src={product.image}
                  alt={product.model}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <ImageIcon className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {product.model}
                </h3>
                {product.new && (
                  <Badge variant="secondary" className="text-xs">
                    Nuevo
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <Badge variant="outline">{product.category}</Badge>
                {product.video && (
                  <div className="flex items-center space-x-1">
                    <Video className="h-4 w-4" />
                    <span>Video</span>
                  </div>
                )}
                {product.content2 && (
                  <div className="flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span>+1 Imagen</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <Button
              onClick={onEdit}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              onClick={onDelete}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente del formulario de producto
const ProductForm: React.FC<{
  product?: Product | null;
  onSave: (product: Partial<Product>) => void;
  onCancel: () => void;
}> = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    model: product?.model || '',
    description: product?.description || '',
    category: product?.category || Category.MOVING_HEAD,
    image: product?.image || '',
    content: product?.content || '',
    content2: product?.content2 || '',
    video: product?.video || '',
    new: product?.new || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.model && formData.description && formData.category) {
      onSave(formData);
    } else {
      toast.error('Por favor completa todos los campos obligatorios');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {product ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </CardTitle>
        <CardDescription>
          Completa la información del producto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="model">Modelo *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="SPL-LED-700"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoría *</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descripción del producto"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUpload
              label="Imagen Principal"
              value={formData.image}
              onChange={(value) => setFormData({ ...formData, image: value })}
              placeholder="/images/products/image.png"
              type="image"
            />
            <FileUpload
              label="Imagen de Contenido"
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              placeholder="/images/products/content.png"
              type="image"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUpload
              label="Imagen Secundaria (opcional)"
              value={formData.content2 || ''}
              onChange={(value) => setFormData({ ...formData, content2: value })}
              placeholder="/images/products/content2.png"
              type="image"
            />
            <FileUpload
              label="Video (opcional)"
              value={formData.video || ''}
              onChange={(value) => setFormData({ ...formData, video: value })}
              placeholder="https://youtube.com/watch?v=..."
              type="video"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="new"
              checked={formData.new}
              onChange={(e) => setFormData({ ...formData, new: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Label htmlFor="new">Marcar como producto nuevo</Label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              {product ? 'Actualizar' : 'Agregar'} Producto
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Admin;
