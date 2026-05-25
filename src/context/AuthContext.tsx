import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { getMe, logoutUser } from '../services/authService'

interface AuthContextValue {
  isAuthenticated: boolean
  loading: boolean           // true mientras se verifica la cookie al arrancar
  login: () => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading]                 = useState(true)

  // Al montar la app: comprueba si la cookie HttpOnly sigue siendo válida
  useEffect(() => {
    getMe()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setLoading(false))
  }, [])

  // Se llama tras login/register exitoso — el backend ya ha seteado la cookie
  const login = useCallback(() => {
    setIsAuthenticated(true)
  }, [])

  // Llama al backend para borrar la cookie y limpia el estado local
  const logout = useCallback(async () => {
    try {
      await logoutUser()
    } catch {
      // aunque falle el backend, limpiamos el estado igualmente
    }
    setIsAuthenticated(false)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
