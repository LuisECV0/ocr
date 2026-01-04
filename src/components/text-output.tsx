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
    <Card className="bg-card border-border overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">
            Texto Extraído
          </h3>

          {text && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                disabled={isProcessing}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copiar
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={downloadText}
                disabled={isProcessing}
              >
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </Button>
            </div>
          )}
        </div>

        {isProcessing ? (
          <div className="border border-border rounded-lg p-12 text-center bg-secondary/50">
            <div className="flex flex-col items-center gap-4">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
              <p className="text-sm font-medium">Extrayendo texto...</p>
            </div>
          </div>
        ) : !text ? (
          <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-secondary rounded-full">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-medium mb-1">
                  El texto aparecerá aquí
                </p>
                <p className="text-sm text-muted-foreground">
                  Sube una imagen para comenzar
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Textarea
            value={text}
            readOnly
            className="min-h-[400px] font-mono text-sm bg-secondary border-border resize-none"
            placeholder="El texto extraído aparecerá aquí..."
          />
        )}
      </div>
    </Card>
  )
}
