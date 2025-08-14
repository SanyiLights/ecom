import React, { useState, useRef } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Upload, X, Image as ImageIcon, FileText, Video, Link, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface EnhancedFileUploadProps {
  label: string;
  value: string;
  onChange: (value: string | File, type: 'url' | 'file', fileName?: string) => void;
  accept?: string;
  placeholder?: string;
  className?: string;
  type?: 'image' | 'video' | 'file';
  currentType?: 'url' | 'file';
  currentFileName?: string;
}

export const EnhancedFileUpload: React.FC<EnhancedFileUploadProps> = ({
  label,
  value,
  onChange,
  accept,
  placeholder = "Selecciona un archivo o pega una URL",
  className,
  type = 'image',
  currentType = 'url',
  currentFileName
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [inputMode, setInputMode] = useState<'url' | 'file'>(currentType);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Configurar accept basado en el tipo si no se proporciona
  const getAcceptType = () => {
    if (accept) return accept;
    
    switch (type) {
      case 'image':
        return "image/*";
      case 'video':
        return "video/*,.mp4,.mov,.avi,.webm";
      case 'file':
        return "*/*";
      default:
        return "image/*";
    }
  };

  const handleFileSelect = (file: File) => {
    if (file) {
      // Validar tipo de archivo
      if (type === 'video' && !file.type.startsWith('video/')) {
        toast.error('Por favor selecciona un archivo de video válido (MP4, MOV, AVI, etc.)');
        return;
      }
      
      if (type === 'image' && !file.type.startsWith('image/')) {
        toast.error('Por favor selecciona un archivo de imagen válido (PNG, JPG, GIF, etc.)');
        return;
      }
      
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
      
      onChange(file, 'file', file.name);
      setInputMode('file');
      
      toast.success(`Archivo "${file.name}" seleccionado`);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    // Llamar onChange con el tipo 'url'
    onChange(url, 'url');
    setPreview(url);
    setInputMode('url');
  };

  const handleRemoveFile = () => {
    onChange('', 'url');
    setPreview(null);
    setInputMode('url');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-8 w-8 text-gray-400" />;
      case 'video':
        return <Video className="h-8 w-8 text-gray-400" />;
      default:
        return <FileText className="h-8 w-8 text-gray-400" />;
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      
      {/* Selector de modo */}
      <div className="flex space-x-2 mb-3">
        <Button
          type="button"
          variant={inputMode === 'url' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setInputMode('url')}
          className="flex items-center space-x-2"
        >
          <Link className="h-4 w-4" />
          <span>URL</span>
        </Button>
        <Button
          type="button"
          variant={inputMode === 'file' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setInputMode('file')}
          className="flex items-center space-x-2"
        >
          <File className="h-4 w-4" />
          <span>Archivo</span>
        </Button>
      </div>

      <div className="space-y-3">
        {/* URL Input */}
        {inputMode === 'url' && (
          <Input
            placeholder="Pega la URL del archivo aquí"
            value={value}
            onChange={handleUrlChange}
            className="w-full"
          />
        )}
        
        {/* File Upload Area */}
        {inputMode === 'file' && (
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
              isDragOver
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400",
              preview ? "bg-gray-50" : "bg-white"
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {preview ? (
              <div className="space-y-3">
                <div className="relative inline-block">
                  {type === 'image' && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-32 max-w-full rounded-lg object-contain"
                    />
                  )}
                  {type === 'video' && (
                    <video
                      src={preview}
                      className="max-h-32 max-w-full rounded-lg"
                      controls
                    />
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveFile}
                    className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  Archivo seleccionado: {currentFileName || 'Archivo local'}
                </p>
                <p className="text-xs text-gray-500">
                  Tipo: {inputMode === 'file' ? 'Archivo local' : 'URL externa'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {getIcon()}
                <div>
                  <p className="text-sm text-gray-600">
                    Arrastra y suelta un archivo aquí, o
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Seleccionar archivo
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Tipos soportados: {getAcceptType()}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={getAcceptType()}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
};
