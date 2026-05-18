import type { ReactNode } from 'react'
import MiniMap from './MiniMap'

interface Feature {
  badge:       string
  badgeVariant: 'green' | 'blue'
  heading:     string
  body:        string
  link:        string
  visual:      ReactNode
  reverse?:    boolean
}

const FEATURES: Feature[] = [
  {
    badge:        'Mapbox GL JS',
    badgeVariant: 'green',
    heading:      'Navegación 2D y 3D con precisión cartográfica',
    body:         'SAFY utiliza Mapbox GL JS para renderizar mapas fluidos con vistas en 2D y perspectiva 3D. Cada ruta se superpone como una capa GeoJSON sobre el mapa oscuro, calculada en tiempo real por el backend.',
    link:         'Probar el mapa →',
    visual:       <MiniMap />,
    reverse:      false,
  },
  {
    badge:        'Tiempo Real',
    badgeVariant: 'blue',
    heading:      'Reportes de incidencias de tu comunidad',
    body:         'Los propios usuarios reportan accidentes, cortes de tráfico y zonas peligrosas en tiempo real. El backend pondera cada reporte para actualizar el índice de seguridad de cada tramo de forma continua.',
    link:         'Ver cómo funciona →',
    visual:       <IncidentVisual />,
    reverse:      true,
  },
  {
    badge:        'Datos INE',
    badgeVariant: 'green',
    heading:      'Estadísticas oficiales en cada ruta',
    body:         'Integramos los datos de accidentalidad del Instituto Nacional de Estadística para evaluar objetivamente la peligrosidad de cada zona. Una fuente oficial que complementa los reportes comunitarios.',
    link:         'Conocer la metodología →',
    visual:       <StatsVisual />,
    reverse:      false,
  },
]

export default function Features() {
  return (
    <section id="caracteristicas" className="bg-void">
      {/* Mapbox: no dividers — spacing only */}
      <div className="page-container space-y-24 py-24">
        {/* Section eyebrow */}
        <div className="text-center space-y-4">
          <p className="eyebrow">Cómo funciona</p>
          <h2 className="text-heading-lg font-bold text-white mx-auto" style={{ maxWidth: '640px' }}>
            Tecnología diseñada para protegerte
          </h2>
          <p className="text-subheading text-fog mx-auto" style={{ maxWidth: '520px' }}>
            Tres capas de datos que trabajan juntas para darte siempre la ruta más segura.
          </p>
        </div>

        {/* Alternating 2-col feature sections */}
        {FEATURES.map((f, i) => (
          <FeatureRow key={i} feature={f} />
        ))}
      </div>
    </section>
  )
}

function FeatureRow({ feature: f }: { feature: Feature }) {
  const textCol = (
    <div className="flex flex-col justify-center space-y-5">
      {/* Badge — 4px radius */}
      {f.badgeVariant === 'green'
        ? <span className="badge-green self-start">{f.badge}</span>
        : <span className="badge-blue self-start">{f.badge}</span>
      }

      {/* Heading — 44px, 700, white, -0.88px */}
      <h3 className="text-heading-lg font-bold text-white">{f.heading}</h3>

      {/* Body — fog */}
      <p className="text-body text-fog leading-relaxed">{f.body}</p>

      {/* Ghost link — signal blue */}
      <a
        href="#"
        className="text-body font-medium text-signal hover:underline transition-colors self-start"
      >
        {f.link}
      </a>
    </div>
  )

  const visualCol = (
    /* Charcoal card — 24px radius, inset map-fade shadow */
    <div
      className="bg-charcoal rounded-card overflow-hidden"
      style={{ boxShadow: 'rgb(14, 16, 18) 0px -175px 175px -75px inset', minHeight: '320px' }}
    >
      {f.visual}
    </div>
  )

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      {f.reverse ? <>{visualCol}{textCol}</> : <>{textCol}{visualCol}</>}
    </div>
  )
}

/* ── Visuals ── */

function IncidentVisual() {
  const incidents = [
    { type: 'Accidente',     time: 'hace 3 min', severity: 'Alta'  },
    { type: 'Corte vial',    time: 'hace 12 min', severity: 'Media' },
    { type: 'Zona peligrosa', time: 'hace 28 min', severity: 'Baja'  },
  ]
  const severityColor: Record<string, string> = {
    Alta: '#ef4444', Media: '#f59e0b', Baja: '#228a56'
  }

  return (
    <div className="p-6 space-y-3">
      <p className="eyebrow mb-4">Incidencias activas</p>
      {incidents.map((inc, i) => (
        <div key={i} className="flex items-center gap-3 p-3 bg-graphite rounded-chip">
          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: severityColor[inc.severity] }} />
          <div className="flex-1 min-w-0">
            <p className="text-body-sm font-medium text-white">{inc.type}</p>
            <p className="text-caption text-slate">{inc.time}</p>
          </div>
          <span
            className="text-caption font-bold text-white uppercase tracking-[1px] px-2 py-0.5 rounded-badge shrink-0"
            style={{ backgroundColor: severityColor[inc.severity] }}
          >
            {inc.severity}
          </span>
        </div>
      ))}
      <div className="pt-2 flex items-center gap-2 text-signal text-body-sm font-medium">
        <div className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse-slow" />
        Actualizando en tiempo real
      </div>
    </div>
  )
}

function StatsVisual() {
  const zones = [
    { name: 'Centro',    score: 88, bar: '88%' },
    { name: 'Salamanca', score: 94, bar: '94%' },
    { name: 'Lavapiés',  score: 61, bar: '61%' },
    { name: 'Argüelles', score: 79, bar: '79%' },
  ]

  return (
    <div className="p-6 space-y-4">
      <p className="eyebrow mb-4">Índice por zona · INE 2024</p>
      {zones.map((z, i) => (
        <div key={i} className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-body-sm font-medium text-fog">{z.name}</span>
            <span className="text-body-sm font-bold text-white">{z.score}</span>
          </div>
          <div className="h-1 bg-steel rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: z.bar,
                backgroundColor: z.score >= 80 ? '#228a56' : z.score >= 65 ? '#04cddd' : '#f59e0b',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
