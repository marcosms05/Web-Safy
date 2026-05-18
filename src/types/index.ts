import type { FeatureCollection } from 'geojson'

export interface Coordinates {
  lat: number
  lng: number
}

export interface GeocodingFeature {
  id: string
  place_name: string
  center: [number, number]
}

export interface RouteRequest {
  origin: Coordinates
  destination: Coordinates
}

export interface RouteResponse {
  route: FeatureCollection
  distance_km: number
  duration_minutes: number
  safety_index: number // 0–100
}

export type SafetyLevel = 'alta' | 'media' | 'baja'

export function getSafetyLevel(index: number): SafetyLevel {
  if (index >= 70) return 'alta'
  if (index >= 40) return 'media'
  return 'baja'
}

export const SAFETY_COLORS: Record<SafetyLevel, string> = {
  alta: '#10B981',
  media: '#F59E0B',
  baja: '#EF4444',
}

export const SAFETY_LABELS: Record<SafetyLevel, string> = {
  alta: 'Alta',
  media: 'Media',
  baja: 'Baja',
}
