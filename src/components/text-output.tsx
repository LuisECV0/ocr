import { Copy, Download, FileText } from "lucide-react"

import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Textarea } from "./ui/textarea"

interface TextOutputProps {
  text: string
  isProcessing: boolean
}

export function TextOutput({ text, isProcessing }: TextOutputProps) {
  const copyToClipboard = async () => {
    if (!text) return
    await navigator.clipboard.writeText(text)
  }

  const downloadText = () => {
    if (!text) return

    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "texto-extraido.txt"
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <Card className="bg-card/50 border-border/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Texto Extraído
          </h3>

          {text && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                disabled={isProcessing}
                className="transition-all hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:shadow-md"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copiar
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={downloadText}
                disabled={isProcessing}
                className="transition-all hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:shadow-md"
              >
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </Button>
            </div>
          )}
        </div>

        {isProcessing ? (
          <div className="border border-border/50 rounded-xl p-12 text-center bg-gradient-to-br from-secondary/50 to-secondary/30 shadow-inner">
            <div className="flex flex-col items-center gap-4">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-primary border-r-transparent shadow-lg" />
              <p className="text-sm font-medium text-foreground">Extrayendo texto...</p>
              <p className="text-xs text-muted-foreground">Analizando la imagen</p>
            </div>
          </div>
        ) : !text ? (
          <div className="border-2 border-dashed border-border/50 rounded-xl p-12 text-center bg-gradient-to-br from-secondary/30 to-secondary/10 hover:border-primary/30 transition-all duration-300">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full shadow-md">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium mb-1 text-foreground">
                  El texto aparecerá aquí
                </p>
                <p className="text-sm text-muted-foreground">
                  Sube una imagen para comenzar
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <Textarea
              value={text}
              readOnly
              className="min-h-[400px] font-mono text-sm bg-gradient-to-br from-secondary/50 to-secondary/30 border-border/50 resize-none rounded-xl shadow-inner transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/20"
              placeholder="El texto extraído aparecerá aquí..."
            />
            <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded-md backdrop-blur-sm">
              {text.length} caracteres
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
