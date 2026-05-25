const API_BASE = import.meta.env.VITE_API_BASE_URL

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface UserInfo {
  id: string
  name: string
  email: string
  profileType: string
}

// POST genérico con cookie
async function post(endpoint: string, body?: object): Promise<void> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    credentials: 'include',                                      // envía y recibe cookies
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(text || `Error ${res.status}`)
  }
}

// El backend setea la cookie HttpOnly automáticamente en la respuesta
export const loginUser    = (req: LoginRequest)    => post('/api/auth/login',    req)
export const registerUser = (req: RegisterRequest) => post('/api/auth/register', req)
export const logoutUser   = ()                     => post('/api/auth/logout')

// Verifica si la cookie sigue siendo válida (se llama al arrancar la app)
export async function getMe(): Promise<UserInfo> {
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Sin sesión activa')
  return res.json() as Promise<UserInfo>
}
