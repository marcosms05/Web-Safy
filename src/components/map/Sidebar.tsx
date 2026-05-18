import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Navigation, ArrowRight, Clock, Ruler,
  AlertCircle, ChevronDown, X, Layers
} from 'lucide-react'
import Button from '../ui/Button'
import SafetyIndexBar from '../ui/SafetyIndexBar'
import { geocodeQuery } from '../../services/routeService'
import type { GeocodingFeature, RouteResponse } from '../../types'

interface SidebarProps {
  onCalculate: (origin: GeocodingFeature, destination: GeocodingFeature) => Promise<void>
  routeResult: RouteResponse | null
  isLoading: boolean
  error: string | null
  is3D: boolean
  onToggle3D: () => void
  onClear: () => void
}

function useGeocodingInput() {
  const [query,       setQuery]       = useState('')
  const [suggestions, setSuggestions] = useState<GeocodingFeature[]>([])
  const [selected,    setSelected]    = useState<GeocodingFeature | null>(null)
  const [isFocused,   setIsFocused]   = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = useCallback((value: string) => {
    setQuery(value)
    setSelected(null)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      const results = await geocodeQuery(value).catch(() => [])
      setSuggestions(results)
    }, 300)
  }, [])

  const handleSelect = useCallback((feat: GeocodingFeature) => {
    setSelected(feat)
    setQuery(feat.place_name.split(',')[0])
    setSuggestions([])
    setIsFocused(false)
  }, [])

  const clear = useCallback(() => { setQuery(''); setSelected(null); setSuggestions([]) }, [])

  return { query, suggestions, selected, isFocused, setIsFocused, handleChange, handleSelect, clear }
}

interface GeoInputProps {
  placeholder: string
  dotColor: string
  hook: ReturnType<typeof useGeocodingInput>
}

function GeoInput({ placeholder, dotColor, hook }: GeoInputProps) {
  const { query, suggestions, isFocused, setIsFocused, handleChange, handleSelect, clear } = hook
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setIsFocused(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [setIsFocused])

  return (
    <div ref={wrapRef} className="relative">
      {/* Mapbox input — 6px radius, gunmetal bg, steel border */}
      <div
        className={[
          'flex items-center gap-2.5 px-4 py-2.5 rounded-input border transition-all',
          isFocused
            ? 'border-signal bg-graphite'
            : 'border-steel bg-gunmetal hover:border-pewter',
        ].join(' ')}
      >
        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: dotColor }} />
        <input
          value={query}
          onChange={e => handleChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-body-sm font-medium text-white
                     placeholder:text-slate outline-none min-w-0"
        />
        {query && (
          <button onClick={clear} className="text-slate hover:text-fog transition-colors p-0.5">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Suggestions — graphite overlay surface */}
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute z-50 top-full left-0 right-0 mt-1 rounded-chip
                       border border-gunmetal bg-graphite overflow-hidden">
          {suggestions.map(s => (
            <li key={s.id}>
              <button
                onMouseDown={() => handleSelect(s)}
                className="w-full text-left px-4 py-2.5 text-body-sm text-fog
                           hover:bg-steel hover:text-white transition-colors truncate"
              >
                <span className="font-medium text-white">{s.place_name.split(',')[0]}</span>
                <span className="text-slate ml-1.5 text-caption">
                  {s.place_name.split(',').slice(1).join(',').trim()}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Sidebar({
  onCalculate, routeResult, isLoading, error, is3D, onToggle3D, onClear,
}: SidebarProps) {
  const origin      = useGeocodingInput()
  const destination = useGeocodingInput()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!origin.selected || !destination.selected) return
    await onCalculate(origin.selected, destination.selected)
  }

  function handleClear() { origin.clear(); destination.clear(); onClear() }

  const canCalculate = !!origin.selected && !!destination.selected

  return (
    <aside className="flex flex-col h-full bg-charcoal border-r border-gunmetal overflow-y-auto">

      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-gunmetal">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-heading-sm font-bold text-white">Ruta Segura</h2>
          {/* 2D/3D — utility button, 6px radius, pewter border */}
          <button
            onClick={onToggle3D}
            className={[
              'btn-utility text-caption font-bold uppercase tracking-[1px]',
              is3D ? 'border-signal text-signal' : '',
            ].join(' ')}
          >
            <Layers className="w-3.5 h-3.5" />
            {is3D ? '3D' : '2D'}
          </button>
        </div>
        <p className="text-body-sm text-fog">
          Introduce origen y destino para calcular tu ruta más segura.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3 border-b border-gunmetal">
        <div className="space-y-2 relative">
          <GeoInput placeholder="Punto de origen" dotColor="#228a56" hook={origin} />
          {/* Connector line */}
          <div className="absolute left-[14px] top-[42px] w-px h-4 bg-steel" />
          <GeoInput placeholder="Destino" dotColor="#04cddd" hook={destination} />
        </div>

        <div className="flex gap-2 pt-1">
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!canCalculate}
            variant="primary"
            size="md"
            className="flex-1 justify-center"
          >
            <Navigation className="w-4 h-4" />
            Calcular Ruta
          </Button>
          {routeResult && (
            <Button type="button" variant="utility" size="md" onClick={handleClear}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="mx-5 mt-4 flex items-start gap-2.5 p-3.5 rounded-chip
                        border border-red-900/50 bg-red-950/30 text-red-400 text-body-sm">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Route result */}
      {routeResult && !error && (
        <div className="px-5 py-4 space-y-4 flex-1">

          {/* Stats — two gunmetal panels, 6px radius */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Ruler className="w-3.5 h-3.5" />, label: 'Distancia', value: `${routeResult.distance_km.toFixed(1)}`, unit: 'km' },
              { icon: <Clock className="w-3.5 h-3.5" />, label: 'Tiempo',    value: `${routeResult.duration_minutes}`,        unit: 'min' },
            ].map(s => (
              <div key={s.label} className="bg-gunmetal rounded-input p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-slate">{s.icon}<span className="eyebrow">{s.label}</span></div>
                <div className="text-heading-sm font-bold text-white">
                  {s.value}
                  <span className="text-body font-regular text-fog ml-1">{s.unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Safety bar — gunmetal card */}
          <div className="bg-gunmetal rounded-input p-4">
            <SafetyIndexBar index={routeResult.safety_index} />
          </div>

          {/* Detail rows */}
          <div className="space-y-0">
            <p className="eyebrow mb-3">Detalles</p>
            {[
              { label: 'Incidencias activas',     value: '0'    },
              { label: 'Zonas de alta seguridad', value: '3'    },
              { label: 'Actualizado hace',         value: '2 min' },
            ].map(item => (
              <div key={item.label}
                className="flex justify-between py-2.5 border-b border-gunmetal last:border-0">
                <span className="text-body-sm text-fog">{item.label}</span>
                <span className="text-body-sm font-medium text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!routeResult && !error && !isLoading && (
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-10 text-center gap-5">
          {/* Signal blue icon block */}
          <div className="w-12 h-12 rounded-card flex items-center justify-center bg-signal/10 border border-signal/20">
            <ArrowRight className="w-5 h-5 text-signal" />
          </div>
          <div className="space-y-1.5">
            <p className="text-body-sm font-medium text-white">Introduce origen y destino</p>
            <p className="text-body-sm text-fog leading-relaxed">
              SAFY conectará con el backend en tiempo real para calcular la ruta más segura.
            </p>
          </div>

          {/* Info accordion */}
          <details className="w-full text-left group">
            <summary className="flex items-center justify-between px-4 py-2.5 rounded-input
                                bg-gunmetal border border-steel cursor-pointer
                                text-body-sm text-fog list-none hover:text-white transition-colors">
              ¿Cómo se calcula la seguridad?
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180 shrink-0" />
            </summary>
            <div className="mt-2 px-4 py-3 rounded-input bg-gunmetal border border-steel
                            text-body-sm text-fog leading-relaxed space-y-2">
              <p>El índice (0–100) combina tres fuentes:</p>
              <ul className="space-y-1 pl-4 list-disc text-slate">
                <li>Reportes comunitarios de incidencias</li>
                <li>Estadísticas de accidentalidad del INE</li>
                <li>Histórico de eventos por tramo</li>
              </ul>
            </div>
          </details>
        </div>
      )}
    </aside>
  )
}
