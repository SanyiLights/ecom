import { createClient } from '@supabase/supabase-js'
import { Product } from '@/data/products'
import { Category } from '@/data/categories'

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las variables de entorno de Supabase. Verifica tu archivo .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface DatabaseProduct {
  id: number
  model: string
  description: string
  category: string
  images: string[] | null
  contents: string[] | null
  videos: string[] | null
  new: boolean
  created_at: string
  updated_at: string
}

export interface DatabaseUser {
  id: string
  username: string
  password_hash: string
  role: 'admin' | 'user'
  created_at: string
  updated_at: string
}

// Función para convertir Product a DatabaseProduct
export const productToDatabase = (product: Product): Omit<DatabaseProduct, 'id' | 'created_at' | 'updated_at'> => ({
  model: product.model,
  description: product.description,
  category: product.category,
  images: product.images || [],
  contents: product.contents || [],
  videos: product.videos || [],
  new: product.new
})

// Función para convertir DatabaseProduct a Product
export const databaseToProduct = (dbProduct: DatabaseProduct): Product => ({
  model: dbProduct.model,
  description: dbProduct.description,
  category: dbProduct.category as Category,
  images: dbProduct.images || [],
  contents: dbProduct.contents || [],
  videos: dbProduct.videos || [],
  new: dbProduct.new,
  created_at: dbProduct.created_at,
  updated_at: dbProduct.updated_at
})

// Funciones para autenticación con usuarios personalizados
export const authenticateUser = async (username: string, password: string) => {
  try {
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error('Usuario no encontrado');
      }
      throw error;
    }
    
    if (!data) {
      throw new Error('Usuario no encontrado');
    }
    
    if (data.password_hash === password) {
      return data;
    } else {
      console.log('❌ Contraseña incorrecta');
      throw new Error('Contraseña incorrecta');
    }
    
  } catch (error) {
    console.error('🚨 Error en authenticateUser:', error);
    throw error;
  }
};

export const createUser = async (username: string, password: string, role: 'admin' | 'user' = 'user') => {
  const { data, error } = await supabase
    .from('users')
    .insert({
      username,
      password_hash: password, // En producción, hashear la contraseña
      role
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getUserByUsername = async (username: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();
  
  if (error) throw error;
  return data;
};
