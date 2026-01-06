import './App.css'
import { Header } from './components/header'
import { OcrConverter } from './components/ocr-converter'
import { ThemeProvider } from './components/theme-provider'

function App() {

  return (
    <ThemeProvider defaultTheme="system" storageKey="textvision-theme">
      <div className='min-h-screen bg-background transition-colors duration-300'>
        <Header />
        <main className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient bg-[length:200%_auto]">
              TextVision
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance mt-2">
              Extrae texto de cualquier imagen con precisión profesional
            </p>
          </div>
          <OcrConverter />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
