import React, { useState } from 'react'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { Textarea } from './textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Product } from '@/data/products'
import { Category } from '@/data/categories'
import { X, Plus, Eye, Play, FileText, Image, Video } from 'lucide-react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './alert-dialog'

interface ProductFormProps {
  product?: Product
  onSubmit: (product: Omit<Product, 'created_at' | 'updated_at'> & { id?: number }) => Promise<void>
  onCancel: () => void
  loading?: boolean
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

  const [newImageUrl, setNewImageUrl] = useState('')
  const [newContentUrl, setNewContentUrl] = useState('')
  const [newVideoUrl, setNewVideoUrl] = useState('')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedContentImage, setSelectedContentImage] = useState<string | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: 'images' | 'contents' | 'videos'
    index: number
    url: string
  } | null>(null)

  React.useEffect(() => {
    setFormData({
      model: product?.model || '',
      description: product?.description || '',
      category: product?.category || Category.MOVING_HEAD,
      images: product?.images || [],
      contents: product?.contents || [],
      videos: product?.videos || [],
      new: product?.new || false
    })
    setNewImageUrl('')
    setNewContentUrl('')
    setNewVideoUrl('')
  }, [product])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, field: 'images' | 'contents' | 'videos') => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    
    files.forEach(file => {
      if (field === 'images' && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file)
        addUrl(url, field)
      } else if (field === 'videos' && file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file)
        addUrl(url, field)
      } else if (field === 'contents') {
        const url = URL.createObjectURL(file)
        addUrl(url, field)
      }
    })
  }

  const handleFileSelect = (field: 'images' | 'contents' | 'videos') => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    
    if (field === 'images') {
      input.accept = 'image/*'
    } else if (field === 'videos') {
      input.accept = 'video/*'
    } else {
      input.accept = '*/*'
    }
    
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || [])
      files.forEach(file => {
        const url = URL.createObjectURL(file)
        addUrl(url, field)
      })
    }
    
    input.click()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.model.trim()) {
      toast.error('El modelo del producto es obligatorio')
      return
    }

    try {
      const finalProductData = {
        ...formData,
        id: product?.id
      }

      await onSubmit(finalProductData)
      toast.success(product ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente')
      
    } catch (error) {
      console.error('Error al guardar el producto:', error)
      toast.error('Error al guardar el producto')
    }
  }

  const addUrl = (url: string, field: 'images' | 'contents' | 'videos') => {
    if (url.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), url.trim()]
      }))
      if (field === 'images') setNewImageUrl('')
      if (field === 'contents') setNewContentUrl('')
      if (field === 'videos') setNewVideoUrl('')
    }
  }

  const removeUrl = (index: number, field: 'images' | 'contents' | 'videos') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index) || []
    }))
  }

  const confirmDelete = (type: 'images' | 'contents' | 'videos', index: number, url: string) => {
    setDeleteConfirmation({ type, index, url })
  }

  const handleDelete = () => {
    if (deleteConfirmation) {
      removeUrl(deleteConfirmation.index, deleteConfirmation.type)
      setDeleteConfirmation(null)
    }
  }

  const cancelDelete = () => {
    setDeleteConfirmation(null)
  }

  const isVideoUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com') || 
           url.match(/\.(mp4|mov|avi|webm|mkv)$/i)
  }

  const isImageUrl = (url: string) => {
    return url.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i) || url.includes('blob:')
  }

  return (
    <div className="bg-white rounded-lg border p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {product ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </h3>
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

        {/* Sección de Imágenes */}
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <div className="flex items-center gap-2 mb-4">
            <Image className="h-5 w-5 text-blue-600" />
            <h4 className="text-lg font-semibold text-gray-900">Imágenes</h4>
          </div>
          
          <div className="space-y-4">
            {/* Área de drag and drop */}
            <div 
              className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors bg-blue-50 cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'images')}
              onClick={() => handleFileSelect('images')}
            >
              <Image className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-blue-600 font-medium">Arrastra y suelta imágenes aquí</p>
              <p className="text-xs text-blue-500">o haz click para seleccionar archivos</p>
            </div>

            <div className="space-y-2">
              <Label>Agregar URL de imagen</Label>
              <div className="flex gap-2">
                <Input
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="flex-1"
                />
                <Button type="button" onClick={() => addUrl(newImageUrl, 'images')} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {formData.images && formData.images.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Imágenes agregadas:</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {formData.images.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="w-full h-32 bg-gray-100 rounded-lg border overflow-hidden">
                        <img 
                          src={url} 
                          alt={`Imagen ${index + 1}`}
                          className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setSelectedImage(url)}
                        />
                      </div>
                      <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedImage(url)}
                          className="h-6 w-6 p-0 text-white hover:bg-white hover:text-black"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => confirmDelete('images', index, url)}
                          className="h-6 w-6 p-0 text-white hover:bg-red-500"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sección de Contenidos */}
        <div className="border border-gray-200 rounded-lg p-6 bg-green-50">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-green-600" />
            <h4 className="text-lg font-semibold text-gray-900">Contenidos</h4>
          </div>
          
          <div className="space-y-4">
            {/* Área de drag and drop */}
            <div 
              className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors bg-green-50 cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'contents')}
              onClick={() => handleFileSelect('contents')}
            >
              <FileText className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-green-600 font-medium">Arrastra y suelta archivos aquí</p>
              <p className="text-xs text-green-500">PDFs, documentos, imágenes o haz click para seleccionar</p>
            </div>

            <div className="space-y-2">
              <Label>Agregar URL de contenido</Label>
              <div className="flex gap-2">
                <Input
                  value={newContentUrl}
                  onChange={(e) => setNewContentUrl(e.target.value)}
                  placeholder="https://ejemplo.com/documento.pdf"
                  className="flex-1"
                />
                <Button type="button" onClick={() => addUrl(newContentUrl, 'contents')} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {formData.contents && formData.contents.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Contenidos agregados:</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {formData.contents.map((url, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <div className="flex-shrink-0">
                        {isImageUrl(url) ? (
                          <img 
                            src={url} 
                            alt={`Contenido ${index + 1}`}
                            className="w-12 h-12 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setSelectedContentImage(url)}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-green-100 rounded flex items-center justify-center">
                            <FileText className="h-6 w-6 text-green-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {url.includes('http') ? url.split('/').pop() || url : url}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{url}</p>
                      </div>
                      <div className="flex gap-1">
                        {isImageUrl(url) && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedContentImage(url)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Ver imagen completa"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => confirmDelete('contents', index, url)}
                          className="text-red-500 hover:text-red-700"
                          title="Eliminar contenido"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sección de Videos */}
        <div className="border border-gray-200 rounded-lg p-6 bg-purple-50">
          <div className="flex items-center gap-2 mb-4">
            <Video className="h-5 w-5 text-purple-600" />
            <h4 className="text-lg font-semibold text-gray-900">Videos</h4>
          </div>
          
          <div className="space-y-4">
            {/* Área de drag and drop */}
            <div 
              className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors bg-purple-50 cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'videos')}
              onClick={() => handleFileSelect('videos')}
            >
              <Video className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-sm text-purple-600 font-medium">Arrastra y suelta videos aquí</p>
              <p className="text-xs text-purple-500">MP4, MOV, AVI o haz click para seleccionar</p>
            </div>

            <div className="space-y-2">
              <Label>Agregar URL de video</Label>
              <div className="flex gap-2">
                <Input
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=... o https://ejemplo.com/video.mp4"
                  className="flex-1"
                />
                <Button type="button" onClick={() => addUrl(newVideoUrl, 'videos')} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {formData.videos && formData.videos.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Videos agregados:</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {formData.videos.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="w-full h-40 bg-gray-100 rounded-lg border overflow-hidden">
                        {isVideoUrl(url) ? (
                          url.includes('youtube.com') || url.includes('youtu.be') ? (
                            <div className="w-full h-full bg-red-100 flex items-center justify-center">
                              <div className="text-center">
                                <Play className="h-12 w-12 text-red-600 mx-auto mb-2" />
                                <p className="text-sm text-red-600 font-medium">YouTube Video</p>
                                <p className="text-xs text-red-500 truncate">{url}</p>
                              </div>
                            </div>
                          ) : url.includes('vimeo.com') ? (
                            <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                              <div className="text-center">
                                <Play className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                                <p className="text-sm text-blue-600 font-medium">Vimeo Video</p>
                                <p className="text-xs text-blue-500 truncate">{url}</p>
                              </div>
                            </div>
                          ) : (
                            <video 
                              src={url} 
                              className="w-full h-full object-cover"
                              controls
                              preload="metadata"
                            />
                          )
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <div className="text-center">
                              <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">URL de video</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(url, '_blank')}
                          className="h-6 w-6 p-0 text-white hover:bg-white hover:text-black"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => confirmDelete('videos', index, url)}
                          className="h-6 w-6 p-0 text-white hover:bg-red-500"
                        >
                          <X className="h-4 w-4" />
                      </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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

      {/* Modal para ver imagen en tamaño completo */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedImage} 
              alt="Vista previa completa"
              className="max-w-full max-h-full object-contain"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white hover:bg-white hover:text-black"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}

      {/* Modal para ver imagen de contenido en tamaño completo */}
      {selectedContentImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedContentImage} 
              alt="Vista previa completa del contenido"
              className="max-w-full max-h-full object-contain"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSelectedContentImage(null)}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white hover:bg-white hover:text-black"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}

      {/* Modal de confirmación de borrado */}
      {deleteConfirmation && (
        <AlertDialog open={!!deleteConfirmation} onOpenChange={() => setDeleteConfirmation(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-3">
                {deleteConfirmation.type === 'images' && <Image className="h-6 w-6 text-red-500" />}
                {deleteConfirmation.type === 'contents' && <FileText className="h-6 w-6 text-red-500" />}
                {deleteConfirmation.type === 'videos' && <Video className="h-6 w-6 text-red-500" />}
                Confirmar eliminación
              </AlertDialogTitle>
              <AlertDialogDescription>
                <p className="text-sm text-gray-700 mb-2">
                  ¿Estás seguro de que quieres eliminar este {deleteConfirmation.type === 'images' ? 'imagen' : 
                                                           deleteConfirmation.type === 'contents' ? 'contenido' : 'video'}?
                </p>
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="text-xs text-gray-600 font-medium">URL:</p>
                  <p className="text-xs text-gray-800 truncate">{deleteConfirmation.url}</p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelDelete}>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
