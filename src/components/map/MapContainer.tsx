import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { FeatureCollection, LineString } from 'geojson'

interface MapContainerProps {
  route: FeatureCollection | null
  is3D: boolean
  onMapReady?: () => void
}

const MADRID_CENTER: [number, number] = [-3.7038, 40.4168]
const DARK_STYLE = 'mapbox://styles/marcosms05/cmpblvuoc000y01s85dx24oz9'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

export default function MapContainer({ route, is3D, onMapReady }: MapContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const originMarkerRef = useRef<mapboxgl.Marker | null>(null)
  const destMarkerRef = useRef<mapboxgl.Marker | null>(null)

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    try {
      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: DARK_STYLE,
        center: MADRID_CENTER,
        zoom: 12,
        pitch: 0,
        bearing: 0,
      })

      map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), 'top-right')
      map.addControl(new mapboxgl.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true }), 'top-right')

      map.on('load', () => {
        // Route source
        map.addSource('route', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] },
        })

        // Glow layer (wide, blurred)
        map.addLayer({
          id: 'route-glow',
          type: 'line',
          source: 'route',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: {
            'line-color': '#06B6D4',
            'line-width': 16,
            'line-opacity': 0.15,
            'line-blur': 6,
          },
        })

        // Main route line
        map.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: {
            'line-color': '#06B6D4',
            'line-width': 4,
            'line-opacity': 0.95,
          },
        })

        onMapReady?.()
      })

      mapRef.current = map
    } catch (error) {
      console.error('Error initializing map:', error)
    }

    return () => {
      originMarkerRef.current?.remove()
      destMarkerRef.current?.remove()
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update route geometry
  useEffect(() => {
    const map = mapRef.current
    if (!map || !map.isStyleLoaded()) return

    const source = map.getSource('route') as mapboxgl.GeoJSONSource | undefined
    if (!source) return

    if (route) {
      source.setData(route)

      // Fit map to route bounds
      const bounds = new mapboxgl.LngLatBounds()
      route.features.forEach(f => {
        if (f.geometry.type === 'LineString') {
          ;(f.geometry as LineString).coordinates.forEach(c =>
            bounds.extend(c as [number, number])
          )
        }
      })
      if (!bounds.isEmpty()) {
        map.fitBounds(bounds, { padding: { top: 80, bottom: 80, left: 80, right: 80 }, duration: 1500 })
      }
    } else {
      source.setData({ type: 'FeatureCollection', features: [] })
      originMarkerRef.current?.remove()
      destMarkerRef.current?.remove()
    }
  }, [route])

  // Toggle 3D pitch/buildings
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    map.easeTo({ pitch: is3D ? 55 : 0, bearing: is3D ? -15 : 0, duration: 900 })

    if (!map.isStyleLoaded()) return

    const LAYER_ID = '3d-buildings'
    if (is3D && !map.getLayer(LAYER_ID)) {
      map.addLayer(
        {
          id: LAYER_ID,
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          paint: {
            'fill-extrusion-color': '#1a2744',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.65,
          },
        },
        'waterway-label'
      )
    } else if (!is3D && map.getLayer(LAYER_ID)) {
      map.removeLayer(LAYER_ID)
    }
  }, [is3D])

  return (
    <div ref={containerRef} className="w-full h-full">
      {/* Map renders here */}
    </div>
  )
}

/** Helper to add a styled marker dot */
export function createMarker(color: string): mapboxgl.Marker {
  const el = document.createElement('div')
  el.style.cssText = `
    width: 16px; height: 16px; border-radius: 50%;
    background: ${color}; border: 3px solid white;
    box-shadow: 0 0 12px ${color}88;
  `
  return new mapboxgl.Marker({ element: el })
}
