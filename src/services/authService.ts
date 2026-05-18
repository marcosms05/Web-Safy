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

export interface AuthResponse {
  token: string
}

async function post(endpoint: string, body: object): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(text || `Error ${res.status}`)
  }
  return res.json()
}

export const loginUser     = (req: LoginRequest)    => post('/api/auth/login',    req)
export const registerUser  = (req: RegisterRequest) => post('/api/auth/register', req)
