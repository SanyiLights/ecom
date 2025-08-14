import React, { useState, useEffect } from 'react'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { Textarea } from './textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Product } from '@/data/products'
import { Category } from '@/data/categories'
import { X, Plus, Upload, FileText, Image, Video, Trash2 } from 'lucide-react'

interface ProductFormProps {
  product?: Product
  onSubmit: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'> & { 
    imageFiles?: File[], 
    contentFiles?: File[], 
    videoFiles?: File[] 
  }) => Promise<void>
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
  const [formData, setFormData] = useState({
    model: product?.model || '',
    description: product?.description || '',
    category: product?.category || Category.MOVING_HEAD,
    images: product?.images || [],
    contents: product?.contents || [],
    videos: product?.videos || [],
    new: product?.new || false
  })

  // Estados para URLs
  const [newImageUrl, setNewImageUrl] = useState('')
  const [newContentUrl, setNewContentUrl] = useState('')
  const [newVideoUrl, setNewVideoUrl] = useState('')
  
  // Estados para archivos
  const [imageFiles, setImageFiles] = useState<FileItem[]>([])
  const [contentFiles, setContentFiles] = useState<FileItem[]>([])
  const [videoFiles, setVideoFiles] = useState<FileItem[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const submitData = {
      ...formData,
      imageFiles: imageFiles.map(item => item.file),
      contentFiles: contentFiles.map(item => item.file),
      videoFiles: videoFiles.map(item => item.file)
    }
    
    await onSubmit(submitData)
  }

  // Funciones para manejar URLs
  const addImageUrl = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), newImageUrl.trim()]
      }))
      setNewImageUrl('')
    }
  }

  const removeImageUrl = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }))
  }

  const addContentUrl = () => {
    if (newContentUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        contents: [...(prev.contents || []), newContentUrl.trim()]
      }))
      setNewContentUrl('')
    }
  }

  const removeContentUrl = (index: number) => {
    setFormData(prev => ({
      ...prev,
      contents: prev.contents?.filter((_, i) => i !== index) || []
    }))
  }

  const addVideoUrl = () => {
    if (newVideoUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        videos: [...(prev.videos || []), newVideoUrl.trim()]
      }))
      setNewVideoUrl('')
    }
  }

  const removeVideoUrl = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos?.filter((_, i) => i !== index) || []
    }))
  }

  // Funciones para manejar archivos
  const handleFileSelect = (
    files: FileList | null, 
    fileType: 'image' | 'content' | 'video',
    setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>
  ) => {
    if (!files) return
    
    const newFiles: FileItem[] = Array.from(files).map(file => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }))
    
    setFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (
    index: number, 
    setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>
  ) => {
    setFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index)
      // Limpiar URL temporal
      if (prev[index]) {
        URL.revokeObjectURL(prev[index].previewUrl)
      }
      return newFiles
    })
  }

  // Funciones para drag and drop
  const handleDrop = (
    e: React.DragEvent, 
    fileType: 'image' | 'content' | 'video',
    setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>
  ) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    
    let filteredFiles: File[] = []
    if (fileType === 'image') {
      filteredFiles = files.filter(file => file.type.startsWith('image/'))
    } else if (fileType === 'video') {
      filteredFiles = files.filter(file => file.type.startsWith('video/'))
    } else if (fileType === 'content') {
      filteredFiles = files.filter(file => 
        file.type.startsWith('text/') || 
        file.type.includes('pdf') || 
        file.type.includes('document') ||
        file.type.includes('application/')
      )
    }
    
    if (filteredFiles.length > 0) {
      const newFiles: FileItem[] = filteredFiles.map(file => ({
        file,
        previewUrl: URL.createObjectURL(file)
      }))
      setFiles(prev => [...prev, ...newFiles])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
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
      
      {/* Área de drag & drop */}
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
        onDrop={(e) => handleDrop(e, fileType, setFiles)}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById(`${fileType}-file-input`)?.click()}
      >
        <input
          type="file"
          accept={accept}
          multiple
          onChange={(e) => handleFileSelect(e.target.files, fileType, setFiles)}
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

      {/* Lista de archivos seleccionados */}
      {files.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Archivos seleccionados:</Label>
          {files.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              {fileType === 'image' && (
                <img 
                  src={item.previewUrl} 
                  alt="Preview" 
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              {fileType === 'video' && (
                <video 
                  src={item.previewUrl} 
                  className="w-16 h-16 object-cover rounded"
                  muted
                />
              )}
              {fileType === 'content' && (
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                  <FileText className="w-8 h-8 text-gray-500" />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {item.file.name}
                </div>
                <div className="text-xs text-gray-500">
                  {(item.file.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
              
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index, setFiles)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
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
    items: string[],
    onRemove: (index: number) => void,
    label: string
  ) => (
    items.length > 0 && (
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">{label}:</Label>
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <span className="text-sm text-gray-600 flex-1 truncate">{item}</span>
            <Button
              type="button"
              onClick={() => onRemove(index)}
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
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
          
          {/* URLs de imágenes */}
          {renderUrlInput(
            newImageUrl,
            setNewImageUrl,
            addImageUrl,
            "Pega la URL de la imagen aquí",
            "Agregar URL de imagen"
          )}
          
          {renderUrlList(formData.images || [], removeImageUrl, "URLs de imágenes")}
          
          {/* Subida de archivos de imagen */}
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
          
          {/* URLs de contenidos */}
          {renderUrlInput(
            newContentUrl,
            setNewContentUrl,
            addContentUrl,
            "Pega la URL del contenido aquí",
            "Agregar URL de contenido"
          )}
          
          {renderUrlList(formData.contents || [], removeContentUrl, "URLs de contenidos")}
          
          {/* Subida de archivos de contenido */}
          {renderFileUploadArea(
            'content',
            contentFiles,
            setContentFiles,
            '.pdf,.doc,.docx,.txt,.rtf,.xls,.xlsx',
            <FileText className="h-8 w-8 text-green-500" />,
            'Subir archivos de contenido',
            'Arrastra y suelta documentos aquí',
            'PDF, DOC, TXT, XLS hasta 10MB'
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
          
          {/* URLs de videos */}
          {renderUrlInput(
            newVideoUrl,
            setNewVideoUrl,
            addVideoUrl,
            "Pega la URL del video aquí (YouTube, Vimeo, etc.)",
            "Agregar URL de video"
          )}
          
          {renderUrlList(formData.videos || [], removeVideoUrl, "URLs de videos")}
          
          {/* Subida de archivos de video */}
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
              {imageFiles.length > 0 && (
                <div>📷 Imágenes: {imageFiles.length} archivo(s)</div>
              )}
              {contentFiles.length > 0 && (
                <div>📄 Contenidos: {contentFiles.length} archivo(s)</div>
              )}
              {videoFiles.length > 0 && (
                <div>🎥 Videos: {videoFiles.length} archivo(s)</div>
              )}
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : product ? 'Actualizar Producto' : 'Crear Producto'}
          </Button>
        </div>
      </form>
    </div>
  )
}
