import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button'

const NAV_LINKS = [
  { label: 'Inicio',         href: '/#inicio'         },
  { label: 'Características', href: '/#caracteristicas' },
  { label: 'Seguridad',      href: '/#seguridad'      },
  { label: 'Descargar',      href: '/#descargar'      },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const location  = useLocation()
  const navigate  = useNavigate()
  const isMapPage = location.pathname === '/map'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  function handleNavClick(href: string) {
    setMenuOpen(false)
    const id = href.replace('/#', '')
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-void transition-shadow duration-300"
      style={scrolled ? { boxShadow: 'rgb(14, 16, 18) 0px 0px 100px 50px' } : undefined}
    >
      {/* Mapbox nav: full-bleed void bg, h-[62px], logo left, links center, CTA right */}
      <nav className="page-container flex items-center justify-between h-[62px]">

        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img src="/safy-logo.svg" alt="SAFY" className="h-7 w-auto" />
        </Link>

        {/* Desktop — center links, DM Sans 400/15px white */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-[15px] font-medium text-white hover:text-fog
                           transition-colors duration-150 cursor-pointer rounded-chip"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right: ghost "Iniciar sesión" + primary pill */}
        <div className="hidden md:flex items-center gap-4">
          {isMapPage ? (
            <Link to="/">
              <Button variant="ghost" size="sm">← Inicio</Button>
            </Link>
          ) : (
            <>
              <Link to="/map">
                <Button variant="ghost" size="sm">Iniciar sesión</Button>
              </Link>
              <Link to="/map">
                <Button variant="primary" size="sm">Probar Mapa</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white hover:text-fog transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menú"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu — graphite surface */}
      {menuOpen && (
        <div className="md:hidden bg-graphite border-t border-gunmetal px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-left px-4 py-3 text-[15px] font-medium text-white
                         hover:text-fog transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <div className="mt-3 pt-3 border-t border-gunmetal">
            <Link to="/map" className="block">
              <Button variant="primary" size="md" className="w-full justify-center">
                Probar Mapa
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
