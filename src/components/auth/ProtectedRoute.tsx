import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import type { ReactNode } from 'react'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  // Espera a que se verifique la cookie antes de decidir redirigir
  if (loading) return null

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
