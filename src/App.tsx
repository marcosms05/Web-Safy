import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LandingPage from './pages/LandingPage'

const MapPage = lazy(() => import('./pages/MapPage'))

function MapFallback() {
  return (
    <div className="flex items-center justify-center h-screen bg-safy-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-safy-border border-t-safy-cyan rounded-full animate-spin" />
        <span className="text-sm font-body text-safy-muted">Cargando mapa…</span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-safy-bg text-safy-text">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <LandingPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/map"
            element={
              <Suspense fallback={<MapFallback />}>
                <MapPage />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
