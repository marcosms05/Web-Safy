import { Github } from 'lucide-react'

const FOOTER_LINKS = {
  Producto: ['Características', 'Seguridad', 'Mapa Interactivo', 'Descargar'],
  Legal:    ['Política de Privacidad', 'Términos de Uso', 'Cookies'],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-void border-t border-gunmetal">
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand — left column */}
          <div className="md:col-span-2 space-y-5">
            <img src="/safy-logo.svg" alt="SAFY" className="h-7 w-auto" />
            <p className="text-body text-fog leading-relaxed max-w-xs">
              La primera app de navegación que prioriza tu seguridad. Datos
              del INE más reportes de incidencias en tiempo real.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer noopener"
              className="btn-utility inline-flex"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="space-y-4">
              {/* All-caps section label */}
              <p className="eyebrow">{section}</p>
              <ul className="space-y-2.5">
                 {links.map(link => {
                    let route = undefined;
                    if (link === 'Política de Privacidad') route = '/privacy';
                    else if (link === 'Términos de Uso') route = '/terms';
                    return (
                      <li key={link}>
                        {route ? (
                          <a
                            href={route}
                            className="text-body text-fog hover:text-white transition-colors duration-150"
                          >
                            {link}
                          </a>
                        ) : (
                          <a
                            href="#"
                            className="text-body text-fog hover:text-white transition-colors duration-150"
                          >
                            {link}
                          </a>
                        )}
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gunmetal flex flex-col sm:flex-row
                        items-center justify-between gap-3">
          <p className="text-body-sm text-slate">
            © {year} SAFY. Todos los derechos reservados.
          </p>
          {/* TFG credit — badge style */}
          <span className="badge-blue">TFG · DAM · 2024</span>
        </div>
      </div>
    </footer>
  )
}
