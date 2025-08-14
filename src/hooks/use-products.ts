import { useState, useEffect } from 'react'
import { supabase, DatabaseProduct, productToDatabase, databaseToProduct } from '@/lib/supabase'
import { Product } from '@/data/products'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const convertedProducts = data?.map(databaseToProduct) || []
      setProducts(convertedProducts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener productos')
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async (product: Omit<Product, 'created_at' | 'updated_at'>) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .insert(productToDatabase(product))
        .select()
        .single()

      if (error) throw error

      const newProduct = databaseToProduct(data)
      setProducts(prev => [newProduct, ...prev])
      return newProduct
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear producto')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async (id: number, updates: Partial<Product>) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .update(productToDatabase(updates as Product))
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      const updatedProduct = databaseToProduct(data)
      setProducts(prev => prev.map(p => p.model === updatedProduct.model ? updatedProduct : p))
      return updatedProduct
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar producto')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error

      setProducts(prev => prev.filter(p => p.model !== products.find(prod => prod.id === id)?.model))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar producto')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getProductsByCategory = (category: string) => {
    return products.filter(p => p.category === category)
  }

  const getNewProducts = () => {
    return products.filter(p => p.new)
  }

  const searchProducts = (query: string) => {
    const lowerQuery = query.toLowerCase()
    return products.filter(p => 
      p.model.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    )
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getNewProducts,
    searchProducts
  }
}
