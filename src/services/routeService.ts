import type { RouteRequest, RouteResponse } from '../types'

const API_BASE = import.meta.env.VITE_API_BASE_URL

export async function calculateRoute(req: RouteRequest): Promise<RouteResponse> {
  const res = await fetch(`${API_BASE}/api/v1/routes/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(`Error ${res.status}: ${text}`)
  }

  return res.json() as Promise<RouteResponse>
}

export async function geocodeQuery(query: string): Promise<import('../types').GeocodingFeature[]> {
  if (query.trim().length < 3) return []

  const token = import.meta.env.VITE_MAPBOX_TOKEN
  const url = new URL(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`)
  url.searchParams.set('access_token', token)
  url.searchParams.set('language', 'es')
  url.searchParams.set('autocomplete', 'true')
  url.searchParams.set('limit', '5')

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Error al buscar la ubicación')

  const data = await res.json() as {
    features: Array<{ id: string; place_name: string; center: [number, number] }>
  }

  return data.features.map(f => ({
    id: f.id,
    place_name: f.place_name,
    center: f.center,
  }))
}
