import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { Layers } from 'lucide-react'

const MADRID_CENTER: [number, number] = [-3.7038, 40.4168]
const DARK_STYLE = 'mapbox://styles/marcosms05/cmpblvuoc000y01s85dx24oz9'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

export default function MiniMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef       = useRef<mapboxgl.Map | null>(null)
  const [is3D, setIs3D] = useState(false)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = new mapboxgl.Map({
      container:          containerRef.current,
      style:              DARK_STYLE,
      center:             MADRID_CENTER,
      zoom:               13,
      pitch:              0,
      bearing:            0,
      attributionControl: false,
    })

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'bottom-right'
    )

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  function toggle3D() {
    const map = mapRef.current
    if (!map) return
    const next = !is3D
    setIs3D(next)
    map.easeTo({ pitch: next ? 55 : 0, bearing: next ? -15 : 0, duration: 900 })

    const LAYER_ID = '3d-buildings'
    if (!map.isStyleLoaded()) return
    if (next && !map.getLayer(LAYER_ID)) {
      map.addLayer({
        id: LAYER_ID,
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        paint: {
          'fill-extrusion-color': '#1a2744',
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base':   ['get', 'min_height'],
          'fill-extrusion-opacity': 0.65,
        },
      }, 'waterway-label')
    } else if (!next && map.getLayer(LAYER_ID)) {
      map.removeLayer(LAYER_ID)
    }
  }

  return (
    <div className="relative w-full h-full" style={{ minHeight: '320px' }}>
      <div ref={containerRef} className="absolute inset-0" />

      {/* Top-left badge */}
      <div className="absolute top-3 left-3 z-10 flex gap-1.5 pointer-events-none">
        <span className={is3D ? 'badge-blue' : 'badge-green'}>{is3D ? '3D' : '2D'}</span>
        <span className="text-caption font-medium text-slate px-2 py-1 bg-charcoal/80 rounded-badge backdrop-blur-sm">
          Mapbox GL JS
        </span>
      </div>

      {/* 2D / 3D toggle — top-right */}
      <button
        onClick={toggle3D}
        className={[
          'absolute top-3 right-3 z-10 flex items-center gap-1.5',
          'px-3 py-1.5 rounded-input border text-caption font-bold uppercase tracking-[1px]',
          'transition-all duration-150 backdrop-blur-sm',
          is3D
            ? 'bg-signal/20 border-signal text-signal'
            : 'bg-charcoal/80 border-pewter text-fog hover:border-silver hover:text-white',
        ].join(' ')}
      >
        <Layers className="w-3.5 h-3.5" />
        {is3D ? '3D' : '2D'}
      </button>
    </div>
  )
}
