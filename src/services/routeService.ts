import type { FeatureCollection } from 'geojson'
import type { RouteRequest, RouteResponse } from '../types'
import { TOKEN_KEY } from '../context/AuthContext'

const API_BASE     = import.meta.env.VITE_API_BASE_URL
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

// ── Route calculation ────────────────────────────────────────────────────────

export async function calculateRoute(req: RouteRequest): Promise<RouteResponse> {
  // 1. Mapbox Directions API → real route geometry + distance + duration
  const coords = `${req.origin.lng},${req.origin.lat};${req.destination.lng},${req.destination.lat}`
  const directionsUrl =
    `https://api.mapbox.com/directions/v5/mapbox/driving/` +
    `${encodeURIComponent(coords)}` +
    `?geometries=geojson&overview=full&steps=true&access_token=${MAPBOX_TOKEN}`

  const dirRes = await fetch(directionsUrl)
  if (!dirRes.ok) throw new Error('No se pudo calcular la ruta')

  const dirData = await dirRes.json() as {
    routes: Array<{
      distance: number
      duration: number
      geometry: { type: 'LineString'; coordinates: [number, number][] }
    }>
  }

  if (!dirData.routes?.length) throw new Error('No se encontró ninguna ruta')

  const route      = dirData.routes[0]
  const distance_km       = route.distance / 1000
  const duration_minutes  = Math.round(route.duration / 60)

  const geojson: FeatureCollection = {
    type: 'FeatureCollection',
    features: [{ type: 'Feature', geometry: route.geometry, properties: {} }],
  }

  // 2. Backend /api/score → safety index at route midpoint
  const midIdx      = Math.floor(route.geometry.coordinates.length / 2)
  const [midLng, midLat] = route.geometry.coordinates[midIdx]

  const token = localStorage.getItem(TOKEN_KEY)
  let safety_index = 70

  try {
    const scoreRes = await fetch(
      `${API_BASE}/api/score?lat=${midLat}&lon=${midLng}`,
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    )
    if (scoreRes.ok) {
      const scoreData = await scoreRes.json() as { score: number }
      // backend devuelve 0-100; si devuelve 0-1 multiplica por 100
      safety_index = scoreData.score > 1
        ? Math.round(scoreData.score)
        : Math.round(scoreData.score * 100)
    }
  } catch {
    // score no crítico, continúa con el valor por defecto
  }

  return { route: geojson, distance_km, duration_minutes, safety_index }
}

// ── Geocoding ────────────────────────────────────────────────────────────────

export async function geocodeQuery(query: string): Promise<import('../types').GeocodingFeature[]> {
  if (query.trim().length < 3) return []

  const url = new URL(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`)
  url.searchParams.set('access_token', MAPBOX_TOKEN)
  url.searchParams.set('language', 'es')
  url.searchParams.set('autocomplete', 'true')
  url.searchParams.set('limit', '5')
  url.searchParams.set('types', 'poi,place,address,neighborhood,locality,district')
  url.searchParams.set('country', 'es')
  url.searchParams.set('proximity', '-3.7038,40.4168')

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Error al buscar la ubicación')

  const data = await res.json() as {
    features: Array<{ id: string; place_name: string; center: [number, number] }>
  }

  return data.features.map(f => ({
    id:         f.id,
    place_name: f.place_name,
    center:     f.center,
  }))
}
