import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useSupabaseStorage = () => {
  const [isUploading, setIsUploading] = useState(false);

  // Función para sanitizar nombres de productos para uso en storage
  const sanitizeProductModel = (productModel: string): string => {
    return productModel.replace(/[/\\:*?"<>|]/g, '_');
  };

  // Subir archivo a Supabase Storage
  const uploadFile = async (
    file: File, 
    bucket: string, 
    path: string
  ): Promise<string | null> => {
    setIsUploading(true);
    
    console.log('🚀 Debug uploadFile:');
    console.log('  - Bucket:', bucket);
    console.log('  - Path:', path);
    console.log('  - File name:', file.name);
    
    try {
      // Subir archivo al bucket especificado
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
      console.log('✅ Archivo subido exitosamente:', publicUrl);
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
    const sanitizedModel = sanitizeProductModel(productModel);
    const path = `products/${sanitizedModel}/${fileName}`;
    
    console.log('🔍 Debug uploadProductImage:');
    console.log('  - Original productModel:', productModel);
    console.log('  - Sanitized model:', sanitizedModel);
    console.log('  - File name:', fileName);
    console.log('  - Final path:', path);
    
    return uploadFile(file, 'product-images', path);
  };

  // Subir contenido de producto
  const uploadProductContent = async (file: File, productModel: string): Promise<string | null> => {
    const fileName = `${Date.now()}_${file.name}`;
    const sanitizedModel = sanitizeProductModel(productModel);
    const path = `products/${sanitizedModel}/content/${fileName}`;
    
    console.log('🔍 Debug uploadProductContent:');
    console.log('  - Original productModel:', productModel);
    console.log('  - Sanitized model:', sanitizedModel);
    console.log('  - File name:', fileName);
    console.log('  - Final path:', path);
    
    return uploadFile(file, 'product-content', path);
  };

  // Subir video de producto
  const uploadProductVideo = async (file: File, productModel: string): Promise<string | null> => {
    const fileName = `${Date.now()}_${file.name}`;
    const sanitizedModel = sanitizeProductModel(productModel);
    const path = `products/${sanitizedModel}/videos/${fileName}`;
    
    console.log('🔍 Debug uploadProductVideo:');
    console.log('  - Original productModel:', productModel);
    console.log('  - Sanitized model:', sanitizedModel);
    console.log('  - File name:', fileName);
    console.log('  - Final path:', path);
    
    return uploadFile(file, 'product-videos', path);
  };

  // Eliminar archivo de Supabase Storage
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

      console.log('✅ Archivo eliminado exitosamente:', path);
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
