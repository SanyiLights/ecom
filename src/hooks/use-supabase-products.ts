import { useState, useEffect } from 'react'
import { supabase, productToDatabase, databaseToProduct } from '@/lib/supabase'
import { Product } from '@/data/products'
import { Category } from '@/data/categories'
import { toast } from 'sonner'
import { useSupabaseStorage } from './use-supabase-storage'

export const useSupabaseProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const { uploadProductImage, uploadProductContent, uploadProductVideo } = useSupabaseStorage()

  // Asegurar que products siempre sea un array
  const safeProducts = Array.isArray(products) ? products : []

  // Cargar productos desde Supabase
  const loadProducts = async () => {
    try {
      setIsLoaded(false)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error cargando productos:', error)
        toast.error('Error cargando productos desde la base de datos')
        return []
      }

      const loadedProducts = data?.map(databaseToProduct) || []
      console.log(`📁 Productos cargados desde Supabase: ${loadedProducts.length}`)
      return loadedProducts
    } catch (error) {
      console.error('Error cargando productos:', error)
      return []
    } finally {
      setIsLoaded(true)
    }
  }

  // Cargar productos al inicializar
  useEffect(() => {
    loadProducts().then(setProducts).catch(() => {
      // Fallback: si falla Supabase, usar array vacío
      console.warn('Fallback: usando array vacío de productos');
      setProducts([]);
      setIsLoaded(true);
    });
  }, [])

  // Guardar productos en Supabase
  const saveProducts = async (newProducts: Product[]) => {
    setIsSaving(true)
    try {
      // Convertir productos al formato de la base de datos
      const dbProducts = newProducts.map(productToDatabase)

      // Primero eliminar todos los productos existentes
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .neq('id', 0) // Eliminar todos

      if (deleteError) {
        console.error('Error eliminando productos:', deleteError)
        throw new Error('No se pudieron eliminar los productos existentes')
      }

      // Luego insertar los nuevos productos
      const { data, error: insertError } = await supabase
        .from('products')
        .insert(dbProducts)
        .select()

      if (insertError) {
        console.error('Error insertando productos:', insertError)
        throw new Error('No se pudieron insertar los nuevos productos')
      }

      setProducts(newProducts)
      setLastSaved(new Date())
      console.log('✅ Productos guardados exitosamente en Supabase:', newProducts.length)
      return true
    } catch (error) {
      console.error('❌ Error guardando productos:', error)
      return false
    } finally {
      setIsSaving(false)
    }
  }

  // Agregar producto
  const addProduct = async (product: Product, files?: {
    image?: File;
    content?: File;
    content2?: File;
    video?: File;
  }) => {
    try {
      let finalProduct = { ...product };
      
      // Subir archivos si existen
      if (files) {
        if (files.image) {
          const imageUrl = await uploadProductImage(files.image, product.model);
          if (imageUrl) {
            finalProduct.image = imageUrl;
            finalProduct.image_type = 'file';
            finalProduct.image_file_name = files.image.name;
          }
        }
        
        if (files.content) {
          const contentUrl = await uploadProductContent(files.content, product.model);
          if (contentUrl) {
            finalProduct.content = contentUrl;
            finalProduct.content_type = 'file';
            finalProduct.content_file_name = files.content.name;
          }
        }
        
        if (files.content2) {
          const content2Url = await uploadProductContent(files.content2, product.model);
          if (content2Url) {
            finalProduct.content2 = content2Url;
            finalProduct.content2_type = 'file';
            finalProduct.content_file_name = files.content2.name;
          }
        }
        
        if (files.video) {
          const videoUrl = await uploadProductVideo(files.video, product.model);
          if (videoUrl) {
            finalProduct.video = videoUrl;
            finalProduct.video_type = 'file';
            finalProduct.video_file_name = files.video.name;
          }
        }
      }

      const dbProduct = productToDatabase(finalProduct)
      
      const { data, error } = await supabase
        .from('products')
        .insert([dbProduct])
        .select()

      if (error) {
        console.error('Error agregando producto:', error)
        throw new Error('No se pudo agregar el producto')
      }

      const newProducts = [...products, finalProduct]
      setProducts(newProducts)
      setLastSaved(new Date())
      
      console.log('✅ Producto agregado exitosamente:', finalProduct.model)
      toast.success(`Producto "${finalProduct.model}" agregado exitosamente`)
      return finalProduct
    } catch (error) {
      console.error('Error agregando producto:', error)
      toast.error(`Error agregando producto: ${error instanceof Error ? error.message : 'Error desconocido'}`)
      throw error
    }
  }

  // Actualizar producto
  const updateProduct = async (model: string, updates: Partial<Product>) => {
    try {
      const dbUpdates = productToDatabase(updates as Product)
      
      const { error } = await supabase
        .from('products')
        .update(dbUpdates)
        .eq('model', model)

      if (error) {
        console.error('Error actualizando producto:', error)
        throw new Error('No se pudo actualizar el producto')
      }

      const updatedProducts = products.map(p => 
        p.model === model ? { ...p, ...updates } : p
      )
      setProducts(updatedProducts)
      setLastSaved(new Date())
      
      console.log('✅ Producto actualizado exitosamente:', model)
    } catch (error) {
      console.error('Error actualizando producto:', error)
      throw error
    }
  }

  // Eliminar producto
  const deleteProduct = async (model: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('model', model)

      if (error) {
        console.error('Error eliminando producto:', error)
        throw new Error('No se pudo eliminar el producto')
      }

      const updatedProducts = products.filter(p => p.model !== model)
      setProducts(updatedProducts)
      setLastSaved(new Date())
      
      console.log('✅ Producto eliminado exitosamente:', model)
    } catch (error) {
      console.error('Error eliminando producto:', error)
      throw error
    }
  }

  // Buscar productos
  const searchProducts = (searchTerm: string, category?: string) => {
    return products.filter(product => {
      const matchesSearch = product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !category || product.category === category
      return matchesSearch && matchesCategory
    })
  }

  // Obtener producto por modelo
  const getProductByModel = (model: string) => {
    return products.find(p => p.model === model)
  }

  // Restablecer a productos originales
  const resetToOriginal = async () => {
    try {
      // Aquí podrías cargar productos desde un archivo de respaldo
      // Por ahora, recargamos desde Supabase
      const originalProducts = await loadProducts()
      await saveProducts(originalProducts)
      return true
    } catch (error) {
      console.error('Error restableciendo productos:', error)
      return false
    }
  }

  // Exportar productos
  const exportProducts = () => {
    try {
      const dataStr = JSON.stringify(products, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'products.json'
      link.click()
      URL.revokeObjectURL(url)
      console.log('📤 Productos exportados exitosamente')
    } catch (error) {
      console.error('Error exportando productos:', error)
    }
  }

  // Importar productos
  const importProducts = async (file: File): Promise<boolean> => {
    try {
      const text = await file.text()
      const importedProducts = JSON.parse(text)
      
      if (Array.isArray(importedProducts)) {
        await saveProducts(importedProducts)
        return true
      } else {
        throw new Error('Formato de archivo inválido')
      }
    } catch (error) {
      console.error('Error importando productos:', error)
      return false
    }
  }

  // Migrar productos existentes a Supabase
  const migrateProducts = async (existingProducts: Product[]) => {
    try {
      console.log('🚀 Iniciando migración a Supabase...')
      const success = await saveProducts(existingProducts)
      if (success) {
        console.log('✅ Migración completada exitosamente')
        toast.success('Migración a Supabase completada')
      } else {
        console.error('❌ Error en la migración')
        toast.error('Error en la migración a Supabase')
      }
      return success
    } catch (error) {
      console.error('Error en migración:', error)
      return false
    }
  }

  return {
    products: safeProducts,
    isLoaded,
    isSaving,
    lastSaved,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductByModel,
    resetToOriginal,
    exportProducts,
    importProducts,
    migrateProducts,
    loadProducts
  }
}
