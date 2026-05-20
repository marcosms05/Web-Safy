import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import HowItWorks from './pages/HowItWorks';

const MapPage = lazy(() => import('./pages/MapPage'))

function MapFallback() {
  return (
    <div className="flex items-center justify-center h-screen bg-void">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-steel border-t-signal rounded-full animate-spin" />
        <span className="text-body-sm text-fog">Cargando mapa…</span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
         <Routes>
            {/* Auth pages — full screen, no navbar/footer */}
            <Route path="/login"    element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Map page — protected, no footer */}
            <Route
              path="/map"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-void">
                    <Navbar />
                    <Suspense fallback={<MapFallback />}>
                      <MapPage />
                    </Suspense>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Política de Privacidad */}
            <Route
              path="/privacy"
              element={
                <div className="min-h-screen bg-void text-fog">
                  <Navbar />
                  <PrivacyPolicy />
                  <Footer />
                </div>
              }
            />
            {/* Términos de Uso */}
            <Route
              path="/terms"
              element={
                <div className="min-h-screen bg-void text-fog">
                  <Navbar />
                  <TermsOfUse />
                  <Footer />
                </div>
              }
            />

            {/* Página cómo funciona safy */}
            <Route
              path="/how-it-works"
              element={
                <div className="min-h-screen bg-void text-fog">
                  <Navbar />
                  <HowItWorks />
                  <Footer />
                </div>
              }
            />
            {/* Landing page */}
            <Route
              path="/"
              element={
                <div className="min-h-screen bg-void text-fog">
                  <Navbar />
                  <LandingPage />
                  <Footer />
                </div>
              }
            />
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
