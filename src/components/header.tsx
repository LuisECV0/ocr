import { Scan } from "lucide-react";

export function Header() {
    return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Scan className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">TextVision</h2>
            <p className="text-xs text-muted-foreground">OCR Converter</p>
          </div>
        </div>
      </div>
    </header> 
    )
}