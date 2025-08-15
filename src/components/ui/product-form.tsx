import React, { useState, useEffect } from 'react'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { Textarea } from './textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Product } from '@/data/products'
import { Category } from '@/data/categories'
import { X, Plus, Upload, FileText, Image, Video, Trash2 } from 'lucide-react'
import { useSupabaseStorage } from '@/hooks/use-supabase-storage'
import { toast } from 'sonner'

interface ProductFormProps {
  product?: Product
  onSubmit: (product: Omit<Product, 'created_at' | 'updated_at'> & { id?: number }) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

interface FileItem {
  file: File
  previewUrl: string
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
  loading = false
}) => {
  const { uploadProductImage, uploadProductContent, uploadProductVideo, isUploading } = useSupabaseStorage()
  
  const [formData, setFormData] = useState({
    model: product?.model || '',
    description: product?.description || '',
    category: product?.category || Category.MOVING_HEAD,
    images: product?.images || [],
    contents: product?.contents || [],
    videos: product?.videos || [],
    new: product?.new || false
  })

  const [newImageUrl, setNewImageUrl] = useState('')
  const [newContentUrl, setNewContentUrl] = useState('')
  const [newVideoUrl, setNewVideoUrl] = useState('')
  
  const [imageFiles, setImageFiles] = useState<FileItem[]>([])
  const [contentFiles, setContentFiles] = useState<FileItem[]>([])
  const [videoFiles, setVideoFiles] = useState<FileItem[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.model.trim()) {
      toast.error('El modelo del producto es obligatorio')
      return
    }

    try {
      // Subir archivos y obtener URLs
      const [uploadedImageUrls, uploadedContentUrls, uploadedVideoUrls] = await Promise.all([
        uploadFiles(imageFiles, uploadProductImage, 'imagen'),
        uploadFiles(contentFiles, uploadProductContent, 'contenido'),
        uploadFiles(videoFiles, uploadProductVideo, 'video')
      ])

      const finalProductData = {
        ...formData,
        images: [...(formData.images || []), ...uploadedImageUrls],
        contents: [...(formData.contents || []), ...uploadedContentUrls],
        videos: [...(formData.videos || []), ...uploadedVideoUrls],
        id: product?.id // Incluir el ID si existe
      }

      await onSubmit(finalProductData)
      toast.success(product ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente')
      
      // Limpiar archivos
      setImageFiles([])
      setContentFiles([])
      setVideoFiles([])
      
    } catch (error) {
      console.error('Error al guardar el producto:', error)
      toast.error('Error al guardar el producto')
    }
  }

  const uploadFiles = async (
    files: FileItem[], 
    uploadFn: (file: File, model: string) => Promise<string | null>,
    fileType: string
  ): Promise<string[]> => {
    if (files.length === 0) return []
    
    toast.info(`Subiendo ${files.length} ${fileType}(es)...`)
    const urls: string[] = []
    
    for (const fileItem of files) {
      try {
        const url = await uploadFn(fileItem.file, formData.model)
        if (url) urls.push(url)
        else toast.error(`Error al subir ${fileType}: ${fileItem.file.name}`)
      } catch (error) {
        toast.error(`Error al subir ${fileType}: ${fileItem.file.name}`)
      }
    }
    
    return urls
  }

  const addUrl = (url: string, setUrls: (urls: string[]) => void, currentUrls: string[]) => {
    if (url.trim()) {
      setUrls([...currentUrls, url.trim()])
    }
  }

  const removeUrl = (index: number, setUrls: (urls: string[]) => void, currentUrls: string[]) => {
    setUrls(currentUrls.filter((_, i) => i !== index))
  }

  const handleFileSelect = (
    files: FileList | null, 
    setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>
  ) => {
    if (!files) return
    
    const newFiles: FileItem[] = Array.from(files).map(file => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }))
    
    setFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (index: number, setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>) => {
    setFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index)
      if (prev[index]) URL.revokeObjectURL(prev[index].previewUrl)
      return newFiles
    })
  }

  const handleDrop = (
    e: React.DragEvent, 
    setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>
  ) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const newFiles: FileItem[] = files.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }))
    setFiles(prev => [...prev, ...newFiles])
  }

  // Cleanup de URLs temporales
  useEffect(() => {
    return () => {
      imageFiles.forEach(item => URL.revokeObjectURL(item.previewUrl))
      contentFiles.forEach(item => URL.revokeObjectURL(item.previewUrl))
      videoFiles.forEach(item => URL.revokeObjectURL(item.previewUrl))
    }
  }, [imageFiles, contentFiles, videoFiles])

  const renderFileUploadArea = (
    fileType: 'image' | 'content' | 'video',
    files: FileItem[],
    setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>,
    accept: string,
    icon: React.ReactNode,
    title: string,
    description: string,
    extensions: string
  ) => (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-gray-700">{title}</Label>
      
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
        onDrop={(e) => handleDrop(e, setFiles)}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById(`${fileType}-file-input`)?.click()}
      >
        <input
          type="file"
          accept={accept}
          multiple
          onChange={(e) => handleFileSelect(e.target.files, setFiles)}
          className="hidden"
          id={`${fileType}-file-input`}
        />
        <div className="space-y-2">
          <div className="text-3xl">{icon}</div>
          <div className="text-lg font-medium text-gray-700">
            Arrastra y suelta archivos aquí
          </div>
          <div className="text-sm text-gray-500">
            o haz clic para seleccionar
          </div>
          <div className="text-xs text-gray-400">
            {extensions}
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Archivos seleccionados:</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {files.map((item, index) => (
              <div key={index} className="relative group">
                <div className="w-full h-32 bg-gray-100 rounded-lg border overflow-hidden">
                  {item.file.type.startsWith('image/') ? (
                    <img 
                      src={item.previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : item.file.type.startsWith('video/') ? (
                    <video 
                      src={item.previewUrl} 
                      className="w-full h-full object-cover"
                      muted
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-gray-500 text-2xl mb-1">📄</div>
                        <div className="text-xs text-gray-500">Documento</div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFile(index, setFiles)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-2 space-y-1">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {item.file.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {(item.file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderUrlInput = (
    value: string,
    onChange: (value: string) => void,
    onAdd: () => void,
    placeholder: string,
    label: string
  ) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button type="button" onClick={onAdd} variant="outline" size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const renderUrlList = (
    urls: string[],
    setUrls: (urls: string[]) => void,
    title: string
  ) => (
    urls.length > 0 && (
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">{title}:</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {urls.map((url, index) => (
            <div key={index} className="relative group">
              <img 
                src={url} 
                alt={`${title} ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeUrl(index, setUrls, urls)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  )

  return (
    <div className="bg-white rounded-lg border p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {product ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </h3>
        <p className="text-sm text-gray-600">
          Completa la información del producto
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información básica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="model">Modelo *</Label>
            <Input
              id="model"
              value={formData.model}
              onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
              required
              placeholder="SPL-LED-700"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Categoría *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as Category }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Category).filter(cat => cat !== Category.ALL).map((category) => (
                  <SelectItem key={category} value={category}>
                    {String(category).replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            required
            placeholder="Descripción del producto..."
            rows={3}
          />
        </div>

        {/* Imágenes */}
        <div className="space-y-4">
          <div className="border-b pb-2">
            <h4 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Image className="h-5 w-5" />
              Imágenes
            </h4>
          </div>
          
          {renderUrlInput(
            newImageUrl,
            setNewImageUrl,
            () => addUrl(newImageUrl, (urls) => setFormData(prev => ({ ...prev, images: urls })), formData.images || []),
            "Pega la URL de la imagen aquí",
            "Agregar URL de imagen"
          )}
          
          {renderUrlList(formData.images || [], (urls) => setFormData(prev => ({ ...prev, images: urls })), "Imágenes existentes")}
          
          {renderFileUploadArea(
            'image',
            imageFiles,
            setImageFiles,
            'image/*',
            <Image className="h-8 w-8 text-blue-500" />,
            'Subir archivos de imagen',
            'Arrastra y suelta imágenes aquí',
            'PNG, JPG, GIF, WebP hasta 10MB'
          )}
        </div>

        {/* Contenidos */}
        <div className="space-y-4">
          <div className="border-b pb-2">
            <h4 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Contenidos
            </h4>
          </div>
          
          {renderUrlInput(
            newContentUrl,
            setNewContentUrl,
            () => addUrl(newContentUrl, (urls) => setFormData(prev => ({ ...prev, contents: urls })), formData.contents || []),
            "Pega la URL del contenido aquí",
            "Agregar URL de contenido"
          )}
          
          {renderUrlList(formData.contents || [], (urls) => setFormData(prev => ({ ...prev, contents: urls })), "Contenidos existentes")}
          
          {renderFileUploadArea(
            'content',
            contentFiles,
            setContentFiles,
            '.pdf,.doc,.docx,.txt,.rtf,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.webp',
            <FileText className="h-8 w-8 text-green-500" />,
            'Subir archivos de contenido',
            'Arrastra y suelta documentos e imágenes aquí',
            'PDF, DOC, TXT, XLS, PNG, JPG, GIF hasta 10MB'
          )}
        </div>

        {/* Videos */}
        <div className="space-y-4">
          <div className="border-b pb-2">
            <h4 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Video className="h-5 w-5" />
              Videos
            </h4>
          </div>
          
          {renderUrlInput(
            newVideoUrl,
            setNewVideoUrl,
            () => addUrl(newVideoUrl, (urls) => setFormData(prev => ({ ...prev, videos: urls })), formData.videos || []),
            "Pega la URL del video aquí (YouTube, Vimeo, etc.)",
            "Agregar URL de video"
          )}
          
          {renderUrlList(formData.videos || [], (urls) => setFormData(prev => ({ ...prev, videos: urls })), "Videos existentes")}
          
          {renderFileUploadArea(
            'video',
            videoFiles,
            setVideoFiles,
            'video/*',
            <Video className="h-8 w-8 text-purple-500" />,
            'Subir archivos de video',
            'Arrastra y suelta videos aquí',
            'MP4, MOV, AVI, WebM hasta 100MB'
          )}
        </div>

        {/* Checkbox para producto nuevo */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="new"
            checked={formData.new}
            onChange={(e) => setFormData(prev => ({ ...prev, new: e.target.checked }))}
            className="rounded"
          />
          <Label htmlFor="new">Producto nuevo</Label>
        </div>

        {/* Resumen de archivos */}
        {(imageFiles.length > 0 || contentFiles.length > 0 || videoFiles.length > 0) && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-3">Resumen de archivos a subir:</h4>
            <div className="space-y-2 text-sm text-blue-700">
              {imageFiles.length > 0 && <div>📷 Imágenes: {imageFiles.length} archivo(s)</div>}
              {contentFiles.length > 0 && <div>📄 Contenidos: {contentFiles.length} archivo(s)</div>}
              {videoFiles.length > 0 && <div>🎥 Videos: {videoFiles.length} archivo(s)</div>}
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading || isUploading}>
            {loading || isUploading ? 'Guardando...' : product ? 'Actualizar Producto' : 'Crear Producto'}
          </Button>
        </div>
      </form>
    </div>
  )
}
