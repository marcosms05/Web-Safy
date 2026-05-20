import { ReactNode } from 'react';

export default function NotificationSection() {
  return (
    <section className="bg-charcoal py-20">
      <div className="page-container max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <span className="badge badge-yellow">Notificaciones</span>
          <h2 className="text-heading-lg font-bold text-white mt-3 mb-4">Incidencias notificadas cerca de ti</h2>
          <p className="text-subheading text-fog max-w-2xl mx-auto">
            SAFY te avisa de incidencias en tiempo real reportadas por otros usuarios. Así estarás informado al instante de situaciones que puedan afectar tu ruta, mejorando tu seguridad y la de tu entorno.
          </p>
        </div>
        <MockNotificationCard />
        <p className="mt-8 text-body text-map-green text-center">
          Las notificaciones son anónimas y siempre relevantes para tu localización.
        </p>
      </div>
    </section>
  );
}

function MockNotificationCard() {
  return (
    <div className="flex items-start gap-3 bg-amber-900/90 border-l-4 border-amber-400 rounded-card px-6 py-5 mx-auto max-w-xl animate-fade-in shadow-lg">
      <svg className="w-6 h-6 mt-0.5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 9v3m0 4h.01M19.83 17A10 10 0 1 0 21.85 7.49l-8.38 12.02a2 2 0 0 1-3.12-2.34l.64-1.58A10.08 10.08 0 0 0 4.17 17"/></svg>
      <div>
        <div className="font-semibold text-amber-200 mb-0.5">Incidencia reportada cerca</div>
        <div className="text-body-sm text-amber-100">
          <strong>Advertencia:</strong> Se han reportado <strong>2 incidencias</strong> en los últimos 20 minutos a menos de <strong>150 metros</strong> de tu ubicación.<br/>
          Última incidencia: "Presencia sospechosa".
        </div>
        <div className="mt-2 text-fog text-xs">Hace 8 min • Barrio de Malasaña</div>
      </div>
    </div>
  );
}
