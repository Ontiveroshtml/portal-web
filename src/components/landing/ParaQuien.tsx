import { cutClass, SectionHeading } from "./shared";

export function ParaQuien() {
  return (
    <section className="mx-auto w-[min(1200px,calc(100%-40px))] py-[70px]">
      <SectionHeading eyebrow="Para quién es" title="Hecho para líderes y para jugadores." />

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className={`${cutClass} border border-[var(--line)] bg-[var(--surface)]/80 p-8`}>
          <span className="[font-family:'JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[.15em] text-[var(--muted)]">
            Líderes y administradores
          </span>
          <h3 className="mt-2 [font-family:'Montserrat',sans-serif] text-2xl font-black italic tracking-[-.01em]">
            Control total del clan.
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Hacienda y tesorería",
              "Gestión de jugadores y rangos",
              "WarRoom",
              "Historial",
              "Reportes",
              "Dashboard",
              "Herramientas de administración",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[12px] text-[var(--text)]"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-6 [font-family:'Montserrat',sans-serif] text-base font-black italic tracking-[-.01em] text-[var(--accent)]">
            Tomá decisiones con datos, no con suposiciones.
          </p>
        </div>

        <div className={`${cutClass} border border-[var(--accent-purple)]/40 bg-[var(--accent-purple)]/6 p-8`}>
          <span className="[font-family:'JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[.15em] text-[var(--muted)]">
            Jugadores
          </span>
          <h3 className="mt-2 [font-family:'Montserrat',sans-serif] text-2xl font-black italic tracking-[-.01em]">
            Tu progreso también importa.
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Progreso personal", "Rankings", "Estadísticas", "Comparación de rendimiento", "Historial"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[12px] text-[var(--text)]"
                >
                  {item}
                </span>
              ),
            )}
          </div>
          <p className="mt-6 [font-family:'Montserrat',sans-serif] text-base font-black italic tracking-[-.01em] text-[var(--accent-purple)]">
            No solo administramos clanes. También ayudamos a los jugadores a mejorar.
          </p>
        </div>
      </div>
    </section>
  );
}
