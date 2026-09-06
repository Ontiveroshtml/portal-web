import { cutClass, SectionHeading } from "./shared";

interface RoadmapGroup {
  status: "listo" | "en_desarrollo" | "en_evaluacion";
  label: string;
  items: { text: string; done?: boolean }[];
  note?: string;
}

const GROUPS: RoadmapGroup[] = [
  {
    status: "listo",
    label: "Gestión",
    items: [
      { text: "Hacienda y tesorería", done: true },
      { text: "Sistema de rangos R1–R5", done: true },
      { text: "WarRoom", done: true },
      { text: "Dashboard", done: true },
      { text: "Historial", done: true },
      { text: "Gestión de jugadores", done: true },
    ],
  },
  {
    status: "listo",
    label: "Discord",
    items: [
      { text: "OCR de screenshots de evento con doble verificación", done: true },
      { text: "Captura automática desde el bot", done: true },
    ],
  },
  {
    status: "en_desarrollo",
    label: "Clan Pool",
    items: [],
    note: "Sistema de pago grupal para que varios miembros contribuyan a una misma suscripción. Backend pendiente.",
  },
  {
    status: "en_evaluacion",
    label: "En evaluación",
    items: [],
    note: "Mapa de reino/valle con anotación de puntos de interés (battle map tracker) — bajo evaluación para integrarse a Guild Core. Sin fecha ni compromiso.",
  },
];

const STATUS_STYLE: Record<RoadmapGroup["status"], { dot: string; label: string }> = {
  listo: { dot: "bg-[var(--accent)]", label: "Listo" },
  en_desarrollo: { dot: "bg-[var(--accent-gold)]", label: "En desarrollo" },
  en_evaluacion: { dot: "bg-[var(--accent-purple)]", label: "En evaluación" },
};

export function Roadmap() {
  return (
    <section id="roadmap" className="mx-auto w-[min(1200px,calc(100%-40px))] py-[70px]">
      <SectionHeading eyebrow="Roadmap" title="Lo que ya está y lo que viene." />

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        {GROUPS.map((group) => {
          const style = STATUS_STYLE[group.status];
          return (
            <div
              key={group.label}
              className={`${cutClass} border border-[var(--line)] bg-[var(--surface)]/80 p-6`}
            >
              <div className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${style.dot}`} aria-hidden="true" />
                <span className="[font-family:'JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[.15em] text-[var(--muted)]">
                  {style.label}
                </span>
              </div>
              <h3 className="mt-2 [font-family:'Montserrat',sans-serif] text-lg font-black italic tracking-[-.01em]">
                {group.label}
              </h3>
              {group.items.length > 0 && (
                <ul className="mt-3 flex flex-col gap-1.5">
                  {group.items.map((item) => (
                    <li key={item.text} className="flex items-start gap-2 text-[13px] text-[var(--text)]">
                      <span className="mt-0.5 text-[var(--accent)]" aria-hidden="true">
                        ✓
                      </span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
              {group.note && <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">{group.note}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
