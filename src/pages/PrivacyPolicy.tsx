import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-void py-24 text-fog font-cera-pro">
      <section className="max-w-2xl mx-auto rounded-card bg-charcoal p-12 shadow-xl">
        <div className="mb-10">
          <span className="badge-green uppercase tracking-widest font-bold text-[11px] bg-map-green text-white px-4 py-1 rounded-badges mb-4 inline-block shadow-xl">VERSIÓN SIMULADA</span>
          <h1 className="text-white font-bold text-[44px] tracking-tight leading-none" style={{letterSpacing:'-0.88px'}}>
            Política de Privacidad de Safy
          </h1>
          <p className="text-[18px] leading-snug text-fog mt-4">Navega con seguridad y claridad: así cuidamos tus datos.</p>
        </div>
        <div className="space-y-8">

          <section>
            <h2 className="text-heading text-white font-bold mb-2">1. ¿Qué información recopilamos?</h2>
            <ul className="pl-5 text-body list-disc space-y-1">
              <li>Datos de ubicación (solo durante la navegación segura).</li>
              <li>Incidencias reportadas (no vinculadas a identidad personal).</li>
              <li>Datos técnicos del dispositivo para mejorar el servicio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-heading text-white font-bold mb-2">2. ¿Cómo usamos tus datos?</h2>
            <ul className="pl-5 text-body list-disc space-y-1">
              <li>Optimizamos rutas seguras en tiempo real.</li>
              <li>Mejoramos la detección de zonas de riesgo.</li>
              <li>No vendemos ni compartimos tu información personal.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-heading text-white font-bold mb-2">3. Seguridad</h2>
            <p>
              Tus datos se almacenan encriptados.<br />
              Aplicamos estándares avanzados de protección digital.
            </p>
          </section>

          <section>
            <h2 className="text-heading text-white font-bold mb-2">4. Tus derechos y contacto</h2>
            <ul className="pl-5 text-body list-disc space-y-1 mb-2">
              <li>Accede, rectifica o elimina tu información cuando lo solicites.</li>
              <li>Para consultas: <span className="text-signal-blue">privacidad@safy-mock.com</span></li>
            </ul>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="badge-green bg-signal-blue text-white rounded-badges px-3 py-1 text-[10px] tracking-[0.09em]">Transparencia</span>
              <span className="badge-green bg-map-green text-white rounded-badges px-3 py-1 text-[10px] tracking-[0.09em]">Protección</span>
            </div>
          </section>
        </div>
        <div className="mt-16 text-right">
          <span className="text-caption text-ash">Última actualización: 11 de mayo de 2026 · Documento simulado para portafolio Safy · Sin validez real</span>
        </div>
      </section>
    </main>
  );
}
