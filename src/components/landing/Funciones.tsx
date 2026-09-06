import { cutClass, SectionHeading } from "./shared";

interface Feature {
  number: string;
  icon: string;
  title: string;
  hook: string;
  body: string;
  discord?: boolean;
}

const FEATURES: Feature[] = [
  {
    number: "01",
    icon: "/icons/svg/icon-coins.svg",
    title: "Hacienda / Tesorería",
    hook: "Controlá el oro del clan sin hacer cuentas manualmente.",
    body: "Registrá ingresos, donaciones y repartos mientras Guild Core organiza la información y te muestra quién aportó qué, sin planilla aparte.",
  },
  {
    number: "02",
    icon: "/icons/svg/icon-crown.svg",
    title: "Rangos y rankings",
    hook: "Un sistema de rango real, no una etiqueta suelta.",
    body: "Rango R5 para el líder (único, con corona), R4 para administración con cupo limitado — validado contra la base de datos, no solo visual. Comparó jugadores, contribuciones y rendimiento para saber quién está aportando y cómo evoluciona el clan.",
  },
  {
    number: "03",
    icon: "/icons/svg/icon-shield.svg",
    title: "Reportes militares con verificación automática",
    hook: "Tus screenshots de evento, leídas solas — y verificadas.",
    body: "El bot de Discord captura las imágenes de pre y post evento, extrae poder, kill power y kills automáticamente por OCR, y confirma que coinciden con el ID que declaró cada jugador antes de guardar nada. Menos margen de error que tipearlo a mano, y sin que nadie tenga que copiar números de una captura.",
  },
  {
    number: "04",
    icon: "/icons/svg/icon-sword.svg",
    title: "WarRoom",
    hook: "Toda la data de guerra, ordenada y filtrable.",
    body: "Poder, % de puntos, kills antes/después, tropa, clase, runa y artefacto — con columnas que podés mostrar u ocultar según lo que te importa revisar.",
  },
  {
    number: "05",
    icon: "/icons/svg/icon-book.svg",
    title: "Historial",
    hook: "No pierdas los datos de tu clan.",
    body: "Conservá el historial de jugadores, donaciones, actividad y estadísticas para consultar la evolución del clan en el tiempo.",
  },
  {
    number: "06",
    icon: "",
    discord: true,
    title: "Discord",
    hook: "Guild Core también vive donde está tu clan.",
    body: "Conectá Discord para llevar la captura de datos y las herramientas del sistema directamente al entorno donde tus miembros ya trabajan.",
  },
];

export function Funciones() {
  return (
    <section id="funciones" className="mx-auto w-[min(1200px,calc(100%-40px))] py-[70px]">
      <SectionHeading eyebrow="Funciones" title="Todo lo que hoy hacés a mano, automatizado." />

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.number}
            className={`${cutClass} border border-[var(--line)] bg-[var(--surface)]/80 p-6`}
          >
            <div className="mb-4 flex items-center gap-3">
              {feature.discord ? (
                <span className="grid size-11 place-items-center rounded-full bg-white">
                  <svg className="size-5" viewBox="0 0 20 19" aria-hidden="true">
                    <use href="/icons.svg#discord-icon" />
                  </svg>
                </span>
              ) : (
                <span className="grid size-11 place-items-center rounded-[8px] bg-[var(--accent)]/10 shadow-[0_0_20px_-8px_rgba(214,250,56,.5)]">
                  <img src={feature.icon} alt="" aria-hidden="true" className="size-5" />
                </span>
              )}
              <span className="[font-family:'JetBrains_Mono',monospace] text-[11px] font-semibold text-[var(--muted)]">
                {feature.number}
              </span>
            </div>
            <h3 className="[font-family:'Montserrat',sans-serif] text-lg font-black italic tracking-[-.01em]">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm font-semibold text-[var(--text)]">{feature.hook}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
