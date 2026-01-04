import { useState, useCallback } from "react"
import type { DragEvent, ChangeEvent } from "react"
import { Upload, ImageIcon, X } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

interface ImageUploaderProps {
  onImageUpload: (file: File) => void
  isProcessing: boolean
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export function ImageUploader({
  onImageUpload,
  isProcessing,
}: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = useCallback(
    (file: File) => {
      setError(null)

      if (!file.type.startsWith("image/")) {
        setError("El archivo seleccionado no es una imagen válida.")
        return
      }

      if (file.size > MAX_FILE_SIZE) {
        setError("El tamaño máximo permitido es 5MB.")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      onImageUpload(file)
    },
    [onImageUpload],
  )

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const clearImage = () => {
    setPreviewUrl(null)
    setError(null)
  }

  return (
    <Card className="bg-card border-border overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">
            Imagen de Entrada
          </h3>

          {previewUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearImage}
              disabled={isProcessing}
            >
              <X className="h-4 w-4 mr-2" />
              Limpiar
            </Button>
          )}
        </div>

        {!previewUrl ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`
              relative border-2 border-dashed rounded-lg p-12 text-center transition-all
              ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }
            `}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isProcessing}
            />

            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-secondary rounded-full">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>

              <div>
                <p className="text-lg font-medium mb-1">
                  Arrastra tu imagen aquí
                </p>
                <p className="text-sm text-muted-foreground">
                  o haz clic para seleccionar
                </p>
              </div>

              <Button variant="outline" size="sm" disabled={isProcessing}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Seleccionar Archivo
              </Button>

              {error && (
                <p className="text-sm text-destructive mt-2">{error}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="relative rounded-lg overflow-hidden bg-secondary">
            <img
              src={previewUrl}
              alt="Vista previa"
              className="w-full h-auto max-h-[500px] object-contain"
            />

            {isProcessing && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent mb-3" />
                  <p className="text-sm font-medium">
                    Procesando imagen...
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
