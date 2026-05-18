import { useState, useCallback } from 'react'
import type { FeatureCollection } from 'geojson'
import MapContainer from '../components/map/MapContainer'
import Sidebar from '../components/map/Sidebar'
import { calculateRoute } from '../services/routeService'
import type { GeocodingFeature, RouteResponse } from '../types'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'

export default function MapPage() {
  const [routeResult,  setRouteResult]  = useState<RouteResponse | null>(null)
  const [routeGeoJSON, setRouteGeoJSON] = useState<FeatureCollection | null>(null)
  const [isLoading,    setIsLoading]    = useState(false)
  const [error,        setError]        = useState<string | null>(null)
  const [is3D,         setIs3D]         = useState(false)
  const [sidebarOpen,  setSidebarOpen]  = useState(true)

  const handleCalculate = useCallback(
    async (origin: GeocodingFeature, destination: GeocodingFeature) => {
      setIsLoading(true)
      setError(null)
      setRouteResult(null)
      setRouteGeoJSON(null)
      try {
        const result = await calculateRoute({
          origin:      { lat: origin.center[1],      lng: origin.center[0]      },
          destination: { lat: destination.center[1], lng: destination.center[0] },
        })
        setRouteResult(result)
        setRouteGeoJSON(result.route)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al conectar con el servidor.')
      } finally {
        setIsLoading(false)
      }
    }, []
  )

  function handleClear() { setRouteResult(null); setRouteGeoJSON(null); setError(null) }

  return (
    <div className="flex h-screen pt-[62px] bg-void overflow-hidden">

      {/* Sidebar — charcoal surface */}
      <div
        className={[
          'shrink-0 transition-all duration-300 overflow-hidden',
          sidebarOpen ? 'w-[360px]' : 'w-0',
        ].join(' ')}
      >
        <div className="w-[360px] h-full">
          <Sidebar
            onCalculate={handleCalculate}
            routeResult={routeResult}
            isLoading={isLoading}
            error={error}
            is3D={is3D}
            onToggle3D={() => setIs3D(v => !v)}
            onClear={handleClear}
          />
        </div>
      </div>

      {/* Map area */}
      <div className="relative flex-1 min-w-0">
        <MapContainer route={routeGeoJSON} is3D={is3D} />

        {/* Toggle — utility button style (6px radius, pewter border) */}
        <button
          onClick={() => setSidebarOpen(v => !v)}
          className="btn-utility absolute top-4 left-4 z-10 text-body-sm"
        >
          {sidebarOpen
            ? <><PanelLeftClose className="w-4 h-4" /> Ocultar</>
            : <><PanelLeftOpen  className="w-4 h-4" /> Panel</>
          }
        </button>
      </div>
    </div>
  )
}
