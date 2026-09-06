import { SectionHeading } from "./shared";

const ANTES = [
  "Planillas manuales",
  "Capturas de eventos leídas a ojo",
  "Cálculos repetitivos",
  "Rangos actualizados de memoria",
  "Datos repartidos entre canales",
  "Reportes que llevan horas",
];

const CON_GUILD_CORE = [
  "Datos centralizados",
  "Capturas leídas y verificadas por OCR",
  "Rangos con reglas y límites reales (no de memoria)",
  "Donaciones verificadas",
  "Historial organizado",
  "Reportes listos para usar",
];

export function Problema() {
  return (
    <section className="mx-auto w-[min(1200px,calc(100%-40px))] py-[70px]">
      <SectionHeading align="left" title="Dejá de administrar tu clan a mano." />

      <p className="mt-6 max-w-[640px] text-sm leading-relaxed text-[var(--muted)]">
        Los datos de tu clan están repartidos entre:
      </p>
      <p className="mt-2 max-w-[640px] [font-family:'JetBrains_Mono',monospace] text-sm font-semibold text-[var(--text)]">
        Discord → capturas de pantalla → cálculos manuales → planillas → mensajes → rangos desactualizados
      </p>
      <p className="mt-4 max-w-[640px] text-sm leading-relaxed text-[var(--muted)]">
        Guild Core los reúne en un solo sistema, y verifica cada dato antes de guardarlo.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-[10px] border border-[var(--line)] bg-[var(--surface)]/70 p-6">
          <span className="[font-family:'JetBrains_Mono',monospace] text-[11px] font-bold uppercase tracking-[.15em] text-[var(--danger)]">
            Antes
          </span>
          <ul className="mt-4 flex flex-col gap-3">
            {ANTES.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--muted)]">
                <span className="mt-0.5 text-[var(--danger)]" aria-hidden="true">
                  ✕
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[10px] border border-[var(--accent)]/40 bg-[var(--accent)]/6 p-6">
          <span className="[font-family:'JetBrains_Mono',monospace] text-[11px] font-bold uppercase tracking-[.15em] text-[var(--accent)]">
            Con Guild Core
          </span>
          <ul className="mt-4 flex flex-col gap-3">
            {CON_GUILD_CORE.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--text)]">
                <span className="mt-0.5 text-[var(--accent)]" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
