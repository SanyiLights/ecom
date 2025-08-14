import React, { useState, useEffect } from 'react'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { Textarea } from './textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Product } from '@/data/products'
import { Category } from '@/data/categories'
import { X, Plus } from 'lucide-react'

interface ProductFormProps {
  product?: Product
  onSubmit: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
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

  const [newImage, setNewImage] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newVideo, setNewVideo] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  const addImage = () => {
    if (newImage.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), newImage.trim()]
      }))
      setNewImage('')
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }))
  }

  const addContent = () => {
    if (newContent.trim()) {
      setFormData(prev => ({
        ...prev,
        contents: [...(prev.contents || []), newContent.trim()]
      }))
      setNewContent('')
    }
  }

  const removeContent = (index: number) => {
    setFormData(prev => ({
      ...prev,
      contents: prev.contents?.filter((_, i) => i !== index) || []
    }))
  }

  const addVideo = () => {
    if (newVideo.trim()) {
      setFormData(prev => ({
        ...prev,
        videos: [...(prev.videos || []), newVideo.trim()]
      }))
      setNewVideo('')
    }
  }

  const removeVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos?.filter((_, i) => i !== index) || []
    }))
  }

  return (
    <div className="bg-white rounded-lg border p-6">
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
        <div className="space-y-3">
          <Label>Imágenes</Label>
          <div className="flex gap-2">
            <Input
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="URL de la imagen"
              className="flex-1"
            />
            <Button type="button" onClick={addImage} variant="outline" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {formData.images && formData.images.length > 0 && (
            <div className="space-y-2">
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600 flex-1 truncate">{image}</span>
                  <Button
                    type="button"
                    onClick={() => removeImage(index)}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contenidos */}
        <div className="space-y-3">
          <Label>Contenidos</Label>
          <div className="flex gap-2">
            <Input
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="URL del contenido"
              className="flex-1"
            />
            <Button type="button" onClick={addContent} variant="outline" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {formData.contents && formData.contents.length > 0 && (
            <div className="space-y-2">
              {formData.contents.map((content, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600 flex-1 truncate">{content}</span>
                  <Button
                    type="button"
                    onClick={() => removeContent(index)}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Videos */}
        <div className="space-y-3">
          <Label>Videos</Label>
          <div className="flex gap-2">
            <Input
              value={newVideo}
              onChange={(e) => setNewVideo(e.target.value)}
              placeholder="URL del video (YouTube o archivo)"
              className="flex-1"
            />
            <Button type="button" onClick={addVideo} variant="outline" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {formData.videos && formData.videos.length > 0 && (
            <div className="space-y-2">
              {formData.videos.map((video, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600 flex-1 truncate">{video}</span>
                  <Button
                    type="button"
                    onClick={() => removeVideo(index)}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
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

        {/* Botones de acción */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : product ? 'Actualizar' : 'Crear'}
          </Button>
        </div>
      </form>
    </div>
  )
}
