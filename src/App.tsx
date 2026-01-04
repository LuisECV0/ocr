import './App.css'
import { Header } from './components/header'
import { OcrConverter } from './components/ocr-converter'

function App() {

  return (
    <>
    <div className='min-h-screen bg-background'>
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
            TextVision
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Extrae texto de cualquier imagen con precisión profesional
          </p>
        </div>
        <OcrConverter />
      </main>
     
    </div>
    </>
  )
}

export default App
