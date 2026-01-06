import { useState } from "react"
import Tesseract from "tesseract.js"

import { ImageUploader } from "./image-uploader"
import { TextOutput } from "./text-output"

export function OcrConverter() {
  const [extractedText, setExtractedText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleImageProcess = async (file: File) => {
    setIsProcessing(true)
    setExtractedText("")

    try {
        const {
        data: { text },
        } = await Tesseract.recognize(file, "spa+eng", {
        logger: () => {},
        tessedit_char_whitelist:
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:-!?()'\" \n",
        tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
        } as any)

      const cleanText = text
        .replace(/[~`^_=+<>]/g, "")
        .replace(/\s{2,}/g, " ")
        .trim()

      setExtractedText(cleanText)
    } catch (error) {
      setExtractedText(
        "No se pudo extraer texto de la imagen. Intenta con una imagen más clara.",
      )
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="animate-in fade-in slide-in-from-left-4 duration-700">
        <ImageUploader
          onImageUpload={handleImageProcess}
          isProcessing={isProcessing}
        />
      </div>

      <div className="animate-in fade-in slide-in-from-right-4 duration-700">
        <TextOutput
          text={extractedText}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  )
}
