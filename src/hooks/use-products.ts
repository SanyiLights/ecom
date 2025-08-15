import { useState, useEffect } from 'react'
import { supabase} from '@/lib/supabase'
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
      setProducts(data)
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
        .insert(product)
        .select()
        .single()

      if (error) throw error

      setProducts(prev => [data, ...prev])
      return data
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
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setProducts(prev => prev.map(p => p.id === id ? data : p))
      return data
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

      setProducts(prev => prev.filter(p => p.id !== id))
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
