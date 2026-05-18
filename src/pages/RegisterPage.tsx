import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { registerUser } from '../services/authService'
import Button from '../components/ui/Button'

export default function RegisterPage() {
  const [name,      setName]      = useState('')
  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [error,     setError]     = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const navigate  = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      const { token } = await registerUser({ name, email, password })
      login(token)
      navigate('/map', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la cuenta')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-4">
      <div className="w-full" style={{ maxWidth: '400px' }}>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/">
            <img src="/safy-logo.svg" alt="SAFY" className="h-8 w-auto" />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-charcoal rounded-card p-8 border border-gunmetal">

          <div className="mb-6">
            <h1 className="text-heading-sm font-bold text-white mb-1">Crea tu cuenta</h1>
            <p className="text-body-sm text-fog">
              Únete a SAFY y navega siempre por las rutas más seguras.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="eyebrow">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Tu nombre"
                required
                className="w-full px-4 py-2.5 rounded-input bg-gunmetal border border-steel
                           text-white text-body-sm placeholder:text-slate outline-none
                           focus:border-signal transition-colors"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="eyebrow">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-2.5 rounded-input bg-gunmetal border border-steel
                           text-white text-body-sm placeholder:text-slate outline-none
                           focus:border-signal transition-colors"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="eyebrow">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
                className="w-full px-4 py-2.5 rounded-input bg-gunmetal border border-steel
                           text-white text-body-sm placeholder:text-slate outline-none
                           focus:border-signal transition-colors"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2.5 p-3 rounded-chip
                              border border-red-900/50 bg-red-950/30 text-red-400 text-body-sm">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full justify-center mt-2"
            >
              Crear cuenta
            </Button>
          </form>

          <p className="mt-5 text-center text-body-sm text-fog">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-signal hover:underline font-medium transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
