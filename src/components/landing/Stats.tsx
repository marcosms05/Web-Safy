import { useEffect, useRef, useState } from 'react'

import { Link } from 'react-router-dom'
import Button from '../ui/Button'

interface Stat {
  value:   number
  suffix:  string
  label:   string
}

const STATS: Stat[] = [
  { value: 2000, suffix: '+', label: 'Usuarios registrados (1º mes)' },
  { value: 50,   suffix: '+', label: 'Barrios cubiertos' },
  { value: 3500, suffix: '+', label: 'Rutas simuladas' },
  { value: 1000, suffix: '+', label: 'Riesgos identificados' },
]

function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step  = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return count
}

export default function Stats() {
  const ref    = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect() } },
      { threshold: 0.4 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* ── Stats rail — logo-grid treatment, no card frames ── */}
      <section id="seguridad" className="bg-void py-24">
        <div className="page-container">

          {/* Eyebrow — slate, all-caps, +letter-spacing */}
          <p className="eyebrow text-center mb-12 tracking-[0.84px]">
            Métricas esperadas
          </p>

          {/* Stat grid — numbers on void, no card frames */}
          <div
            ref={ref}
            className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center"
          >
            {STATS.map((s, i) => (
              <StatItem key={i} stat={s} active={active} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Download CTA section ── */}
      <section id="descargar" className="bg-void py-24">
        <div className="page-container">
          {/* Charcoal card wrapping the CTA */}
          <div
            className="bg-charcoal rounded-card p-16 text-center space-y-8 mx-auto relative overflow-hidden"
            style={{ maxWidth: '800px' }}
          >
            {/* Subtle signal blue ambient glow — purely atmospheric, no color decoration */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(4,205,221,0.06) 0%, transparent 70%)' }}
            />

            <div className="relative space-y-6">
              <span className="badge-green">Disponible ya</span>

              {/* Headline — 44px, 700, white, -0.88px */}
              <h2 className="text-heading-lg font-bold text-white mx-auto" style={{ maxWidth: '560px' }}>
                Tu próxima ruta, más segura
              </h2>

              {/* Subtext — fog */}
              <p className="text-subheading text-fog mx-auto" style={{ maxWidth: '460px' }}>
                Descarga SAFY gratis y empieza a navegar con la confianza de saber que
                el camino que sigues es el más seguro para ti.
              </p>

              {/* CTA row — primary pill + outlined pill */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="#" className="group">
                  <Button variant="primary" size="lg" className="relative flex items-center gap-2 !pl-5 !pr-5 overflow-hidden">
                    <span className="flex items-center">
                      <AppleIcon />
                    </span>
                    <span className="relative w-[130px] flex items-center justify-start">
                      <span className="block absolute left-4 transition-opacity duration-200 group-hover:opacity-0">App Store</span>
                      <span className="block absolute left-0 font-medium text-fog opacity-0 group-hover:opacity-100 transition-opacity">próximamente&#8594;</span>
                    </span>
                  </Button>
                </a>
                <a href="#" className="group">
                  <Button variant="outline" size="lg" className="relative flex items-center gap-2 !pl-5 !pr-5 overflow-hidden">
                    <span className="flex items-center">
                      <GooglePlayIcon />
                    </span>
                    <span className="relative w-[130px] flex items-center justify-start">
                      <span className="block absolute left-4 transition-opacity duration-200 group-hover:opacity-0">Google Play</span>
                      <span className="block absolute left-0 font-medium text-fog opacity-0 group-hover:opacity-100 transition-opacity">próximamente&#8594;</span>
                    </span>
                  </Button>
                </a>
                <Link to="/map">
                  <Button variant="ghost" size="lg">
                    Probar en web →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function StatItem({ stat, active, delay }: { stat: Stat; active: boolean; delay: number }) {
  const count = useCountUp(stat.value, 1800, active)

  return (
    <div className="space-y-2" style={{ animationDelay: `${delay}ms` }}>
      {/* Number — white, 700, display-adjacent size */}
      <div className="text-heading-lg font-bold text-white leading-none tracking-[-0.88px]">
        {count.toLocaleString('es-ES')}
        <span className="text-heading">{stat.suffix}</span>
      </div>
      {/* Label — fog */}
      <p className="text-body text-fog">{stat.label}</p>
    </div>
  )
}

function AppleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

function GooglePlayIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
      <path d="M3.6 1.8a1.8 1.8 0 00-.9.84l9.54 9.54 3.18-3.18L3.6 1.8z"  fill="currentColor"/>
      <path d="M2.1 2.7C2.04 2.94 2 3.18 2 3.48v17.04c0 .3.04.54.1.78L12.54 12 2.1 2.7z" fill="currentColor" opacity=".7"/>
      <path d="M15.42 8.58l-3.18 3.18 3.18 3.18 3.72-2.1c1.06-.6 1.06-1.56 0-2.16l-3.72-2.1z" fill="currentColor" opacity=".85"/>
      <path d="M2.7 21.3c.24.36.6.6 1.02.66l12.42-9.78-3.18-3.18L2.7 21.3z" fill="currentColor" opacity=".6"/>
    </svg>
  )
}
