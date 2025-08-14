import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useSupabaseStorage = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (
    file: File, 
    bucket: string, 
    path: string
  ): Promise<string | null> => {
    setIsUploading(true);
    
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Error subiendo archivo:', error);
        toast.error(`Error subiendo archivo: ${error.message}`);
        return null;
      }

      // Obtener URL pública del archivo
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);

      const publicUrl = urlData.publicUrl;
      toast.success(`Archivo "${file.name}" subido exitosamente`);
      
      return publicUrl;
    } catch (error) {
      console.error('Error inesperado subiendo archivo:', error);
      toast.error('Error inesperado subiendo archivo');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  // Subir imagen de producto
  const uploadProductImage = async (file: File, productModel: string): Promise<string | null> => {
    const fileName = `${Date.now()}_${file.name}`;
    const path = `products/${productModel}/${fileName}`;
    
    return uploadFile(file, 'product-images', path);
  };

  const uploadProductContent = async (file: File, productModel: string): Promise<string | null> => {
    const fileName = `${Date.now()}_${file.name}`;
    const path = `products/${productModel}/content/${fileName}`;
    
    return uploadFile(file, 'product-content', path);
  };

  const uploadProductVideo = async (file: File, productModel: string): Promise<string | null> => {
    const fileName = `${Date.now()}_${file.name}`;
    const path = `products/${productModel}/videos/${fileName}`;
    
    return uploadFile(file, 'product-videos', path);
  };

  const deleteFile = async (bucket: string, path: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) {
        console.error('Error eliminando archivo:', error);
        toast.error(`Error eliminando archivo: ${error.message}`);
        return false;
      }

      toast.success('Archivo eliminado exitosamente');
      return true;
    } catch (error) {
      console.error('Error inesperado eliminando archivo:', error);
      toast.error('Error inesperado eliminando archivo');
      return false;
    }
  };

  return {
    isUploading,
    uploadFile,
    uploadProductImage,
    uploadProductContent,
    uploadProductVideo,
    deleteFile
  };
};
