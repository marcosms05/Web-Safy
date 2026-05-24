// import React from "react";

export default function TermsOfUse() {
  return (
    <main className="min-h-screen bg-void py-24 text-fog font-cera-pro">
      <section className="max-w-2xl mx-auto rounded-card bg-charcoal p-12 shadow-xl">
        <div className="mb-10">
          <span className="badge-green uppercase tracking-widest font-bold text-[11px] bg-signal-blue text-white px-4 py-1 rounded-badges mb-4 inline-block shadow-xl">FICCIÓN LEGAL</span>
          <h1 className="text-white font-bold text-[44px] tracking-tight leading-none" style={{letterSpacing:'-0.88px'}}>
            Términos de Uso de Safy
          </h1>
          <p className="text-[18px] leading-snug text-fog mt-4">Navega seguro, navega informado.</p>
        </div>
        <div className="space-y-8">

          <section>
            <h2 className="text-heading text-white font-bold mb-2">1. Aceptación de los términos</h2>
            <p>El uso del simulador y servicios de Safy implica la aceptación plena de estas condiciones ficticias.</p>
          </section>

          <section>
            <h2 className="text-heading text-white font-bold mb-2">2. Licencia de uso</h2>
            <ul className="pl-5 text-body list-disc space-y-1">
              <li>Acceso únicamente para demostraciones o propósitos de portafolio.</li>
              <li>No utilizar la información para tomar decisiones reales de seguridad vial.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-heading text-white font-bold mb-2">3. Limitaciones de responsabilidad</h2>
            <ul className="pl-5 text-body list-disc space-y-1">
              <li>Safy no garantiza la veracidad de datos simulados.</li>
              <li>Ningún dato aquí mostrado sustituye a información oficial.</li>
              <li>Toda navegación con Safy es responsabilidad exclusiva del usuario.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-heading text-white font-bold mb-2">4. Cambios en los Términos</h2>
            <p>
              Safy se reserva el derecho de modificar estos términos ficticios en cualquier momento.<br />
              Última versión disponible siempre en esta sección.
            </p>
          </section>
        </div>
        <div className="mt-16 text-right">
          <span className="text-caption text-ash">Última actualización: 11 de mayo de 2026 · Documento simulado para portafolio Safy · Sin validez real</span>
        </div>
      </section>
    </main>
  );
}
