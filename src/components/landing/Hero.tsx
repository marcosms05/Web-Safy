import { Link } from 'react-router-dom'
import Button from '../ui/Button'

export default function Hero() {
  return (
    <section id="inicio" className="relative bg-void overflow-hidden">
      {/* ── Centered text stack ── */}
      <div className="page-container pt-40 pb-20 text-center">

        {/* Product Update Badge — map green, 4px radius */}
        <div className="flex justify-center mb-6 animate-slide-up">
          <span className="badge-green">Nueva generación · 2024</span>
        </div>

        {/* Display headline — DM Sans 700, 68px, white, -1.36px tracking */}
        <h1
          className="text-display font-bold text-white mx-auto mb-6 animate-slide-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]"
          style={{ maxWidth: '900px' }}
        >
          Rutas seguras.<br />En tiempo real.
        </h1>

        {/* Subtext — 18px, fog (#a0aaba), max-width 560px */}
        <p
          className="text-subheading text-fog mx-auto mb-10 leading-relaxed animate-slide-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]"
          style={{ maxWidth: '560px' }}
        >
          SAFY calcula la ruta más rápida priorizando tu seguridad. Powered
          por reportes comunitarios en tiempo real y estadísticas del{' '}
          <span className="text-white font-medium">INE</span>.
        </p>

        {/* Dual CTA pills */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3
                     animate-slide-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]"
        >
          <Link to="/map">
            <Button variant="primary" size="lg">Probar gratis</Button>
          </Link>
          <a href="#caracteristicas">
            <Button variant="outline" size="lg">Ver características</Button>
          </a>
        </div>
      </div>

      {/* ── Map embed block — charcoal card, 24px radius, inset map-fade shadow ── */}
      <div
        className="page-container pb-0 animate-fade-in [animation-delay:500ms] opacity-0 [animation-fill-mode:forwards]"
      >
        <div
          className="relative bg-charcoal rounded-t-card overflow-hidden mx-auto"
          style={{
            maxWidth: '820px',
            boxShadow: 'rgb(14, 16, 18) 0px -175px 175px -75px inset',
          }}
        >
          {/* Top bar of the "device frame" */}
          <div className="flex items-center gap-2 px-6 py-3 bg-gunmetal border-b border-steel/30">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-steel" />
              <div className="w-3 h-3 rounded-full bg-steel" />
              <div className="w-3 h-3 rounded-full bg-steel" />
            </div>
            <div className="flex-1 mx-4">
              <div className="h-5 rounded-input bg-graphite flex items-center px-3">
                <span className="text-caption text-slate">safy.app/map</span>
              </div>
            </div>
          </div>

          {/* App preview */}
          <AppPreview />
        </div>
      </div>
    </section>
  )
}

function AppPreview() {
  return (
    <div className="flex h-[440px]">
      {/* Sidebar panel preview */}
      <div className="w-72 shrink-0 border-r border-steel/20 flex flex-col p-5 gap-4 bg-charcoal">
        <p className="eyebrow">Ruta Segura</p>

        {/* Inputs */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 px-4 py-2.5 bg-gunmetal rounded-input border border-steel/40">
            <div className="w-2 h-2 rounded-full bg-map-green" />
            <span className="text-body-sm text-fog">Plaza Mayor, Madrid</span>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2.5 bg-gunmetal rounded-input border border-signal/50">
            <div className="w-2 h-2 rounded-full bg-signal" />
            <span className="text-body-sm text-white">Retiro Park, Madrid</span>
          </div>
        </div>

        {/* CTA */}
        <div
          className="flex items-center justify-center gap-2 py-2.5 rounded-pill text-body-sm font-medium text-white"
          style={{ backgroundColor: '#04cddd' }}
        >
          Calcular ruta segura
        </div>

        {/* Result card */}
        <div className="bg-graphite rounded-card p-4 space-y-3 mt-auto">
          <div className="flex justify-between">
            <div>
              <p className="eyebrow mb-0.5">Distancia</p>
              <p className="text-heading-sm font-bold text-white">3.2 km</p>
            </div>
            <div>
              <p className="eyebrow mb-0.5">Tiempo</p>
              <p className="text-heading-sm font-bold text-white">8 min</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1.5">
              <p className="eyebrow">Seguridad</p>
              <span className="badge-green text-[9px] px-1.5 py-0.5">Alta · 92</span>
            </div>
            <div className="h-1 bg-steel rounded-full overflow-hidden">
              <div className="h-full w-[92%] bg-map-green rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Map area */}
      <div className="flex-1 relative bg-void overflow-hidden">
        {/* Simulated map grid */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 548 440" fill="none">
          {/* Streets grid */}
          {[60, 130, 200, 270, 340, 410].map(y => (
            <line key={y} x1="0" y1={y} x2="548" y2={y} stroke="#1c1f24" strokeWidth="1" />
          ))}
          {[60, 130, 200, 270, 340, 410, 480].map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="440" stroke="#1c1f24" strokeWidth="1" />
          ))}

          {/* Route glow */}
          <path
            d="M100 380 C100 300 180 250 270 200 C360 150 420 120 460 80"
            stroke="#04cddd" strokeWidth="18" strokeLinecap="round" opacity="0.08"
            className="route-path"
          />
          {/* Route line */}
          <path
            d="M100 380 C100 300 180 250 270 200 C360 150 420 120 460 80"
            stroke="#04cddd" strokeWidth="3" strokeLinecap="round"
            className="route-path"
          />

          {/* Origin */}
          <circle cx="100" cy="380" r="10" fill="#228a56" opacity="0.2" />
          <circle cx="100" cy="380" r="6" fill="#228a56" />
          <circle cx="100" cy="380" r="2.5" fill="#ffffff" />

          {/* Destination */}
          <circle cx="460" cy="80" r="10" fill="#04cddd" opacity="0.2" />
          <circle cx="460" cy="80" r="6" fill="#04cddd" />
          <circle cx="460" cy="80" r="2.5" fill="#ffffff" />

          {/* Midpoint pulse */}
          <circle cx="270" cy="200" r="14" fill="#04cddd" opacity="0.08" />
          <circle cx="270" cy="200" r="4" fill="#04cddd" opacity="0.5" />
        </svg>

        {/* Map label overlay */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          <span className="badge-blue">2D</span>
          <span className="text-caption font-medium text-slate px-2 py-1 bg-charcoal rounded-badge">
            Mapbox
          </span>
        </div>
      </div>
    </div>
  )
}
