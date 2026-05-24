import { Link } from 'react-router-dom'
import Button from '../ui/Button'

export default function Hero() {
  return (
    <section id="inicio" className="relative bg-void overflow-hidden">
      {/* ── Centered text stack ── */}
      <div className="page-container pt-40 pb-20 text-center">

        {/* Product Update Badge — map green, 4px radius */}
        <div className="flex justify-center mb-6 animate-slide-up">
          <span className="badge-green">Nueva generación · 2026</span>
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
           className="text-subheading text-fog mx-auto mb-7 leading-relaxed animate-slide-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]"
           style={{ maxWidth: '560px' }}
         >
           SAFY calcula la ruta más rápida priorizando tu seguridad. Powered
           por reportes comunitarios en tiempo real y estadísticas del{' '}
           <span className="text-white font-medium">INE</span>.
         </p>

         {/* Frase de impacto minimalista e integrada */}
         <div
           className="font-semibold text-white/80 text-lg italic mb-10 animate-slide-up [animation-delay:260ms] opacity-0 [animation-fill-mode:forwards]"
           style={{letterSpacing: '-0.8px'}}
         >
           Es mejor llegar tarde, que no llegar.
         </div>

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

          {/* App preview video */}
          <div className="relative overflow-hidden" style={{ height: '440px' }}>
            <video
              src="/demo.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Inset fade dissolve at bottom */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: 'rgb(14,16,18) 0px -175px 175px -75px inset' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
