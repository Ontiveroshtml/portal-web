import { useContador, useEnPantalla, Reveal } from "./animaciones";
import { cutClass, featuredClass, SectionHeading } from "./shared";

interface RoadmapGroup {
  status: "listo" | "en_desarrollo";
  label: string;
  icon: string;
  items: { text: string; done?: boolean }[];
  note?: string;
  /** Ocupa las dos columnas y lista los items en dos filas: para el grupo
   *  con más items, que si no queda mucho más alto que el resto. */
  wide?: boolean;
}

const GROUPS: RoadmapGroup[] = [
  {
    status: "listo",
    label: "Gestión del clan",
    icon: "/icons/svg/icon-coins.svg",
    items: [
      { text: "Hacienda: donaciones, cortes y tesorería", done: true },
      { text: "Cashback y recompensas", done: true },
      { text: "Reparto equitativo o por rendimiento", done: true },
      { text: "Roster de jugadores", done: true },
      { text: "Dashboard con rendimiento y análisis", done: true },
      { text: "Historial mes a mes", done: true },
    ],
  },
  {
    status: "listo",
    label: "Eventos y rankings",
    icon: "/icons/svg/icon-sword.svg",
    items: [
      { text: "WarRoom — Valle de los Espíritus", done: true },
      { text: "Lectura automática de capturas", done: true },
      { text: "Revisión y corrección a mano de cada dato", done: true },
      { text: "Ranking por fecha y acumulado", done: true },
      { text: "Links públicos del ranking y de los cortes de hacienda", done: true },
    ],
  },
  {
    status: "en_desarrollo",
    label: "Discord",
    icon: "/icons/svg/icon-mail.svg",
    items: [
      { text: "Carga y consulta de datos desde el chat del clan" },
      { text: "Alertas de eventos" },
      { text: "Sincronización más rápida vía canales" },
    ],
    note: "Por ahora todo se maneja desde la app web, sin configurar ningún bot.",
  },
  {
    status: "en_desarrollo",
    label: "Próximas funciones",
    icon: "/icons/svg/icon-gem.svg",
    items: [
      { text: "Clan Pool: pago grupal entre varios miembros" },
      { text: "Ranking de victorias del Valle: winrate y derrotas" },
      { text: "Ranking global de jugadores" },
      { text: "Runas: gestión, historial y progresión" },
      { text: "Planificador de estrategia del Valle" },
      { text: "Equipamiento y talentos de héroes, códice y banda de guerra" },
    ],
  },
  {
    status: "en_desarrollo",
    label: "Inteligencia del Valle",
    icon: "/icons/svg/icon-chart.svg",
    wide: true,
    items: [
      { text: "Winrate del Valle: promedio de victorias del clan, global y contra cada rival" },
      { text: "Ficha por clan enemigo o aliado: historial de enfrentamientos y cómo terminó cada uno" },
      { text: "Horarios y patrones del rival, para elegir cuándo conviene pelear" },
      { text: "Notas y feedback del clan sobre cada rival, guardados para la próxima vez" },
      { text: "Planificador del Valle: armar la estrategia antes de que arranque el evento" },
      { text: "Alertas del Valle: inicio, cierre y capturas que todavía faltan" },
    ],
    note: "La idea es simple: que la segunda vez que te cruces con un clan, ya sepas cómo jugarle.",
  },
];

const STATUS_STYLE = {
  listo: {
    label: "Listo",
    dot: "bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]",
    text: "text-[var(--accent)]",
    border: "border-[var(--accent)]/35",
    tape: "[background:repeating-linear-gradient(45deg,var(--accent)_0_10px,var(--bg)_10px_20px)]",
    bar: "bg-[var(--accent)] shadow-[0_0_12px_-2px_var(--accent)]",
    placa: "bg-[var(--accent)]/10 shadow-[0_0_18px_-8px_rgba(214,250,56,.6)]",
  },
  en_desarrollo: {
    label: "En desarrollo",
    dot: "bg-[var(--accent-gold)] shadow-[0_0_10px_var(--accent-gold)]",
    text: "text-[var(--accent-gold)]",
    border: "border-[var(--accent-gold)]/35",
    tape: "[background:repeating-linear-gradient(45deg,var(--accent-gold)_0_10px,var(--bg)_10px_20px)]",
    bar: "bg-[var(--accent-gold)] shadow-[0_0_12px_-2px_var(--accent-gold)]",
    placa: "bg-[var(--accent-gold)]/10 shadow-[0_0_18px_-8px_rgba(255,184,0,.6)]",
  },
} as const;

const TOTAL = GROUPS.reduce((suma, group) => suma + group.items.length, 0);
const LISTAS = GROUPS.reduce(
  (suma, group) => suma + group.items.filter((item) => item.done).length,
  0,
);
const PENDIENTES = TOTAL - LISTAS;
const PORCENTAJE = Math.round((LISTAS / TOTAL) * 100);

/** Tarjeta de un grupo: anima su barra y sus ítems cuando entra en pantalla. */
function TarjetaGrupo({ group, orden }: { group: RoadmapGroup; orden: number }) {
  const style = STATUS_STYLE[group.status];
  const hechas = group.items.filter((item) => item.done).length;
  const avance = Math.round((hechas / group.items.length) * 100);
  const { ref, visible } = useEnPantalla<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${cutClass} gc-reveal ${visible ? "gc-reveal-on" : ""} relative overflow-hidden border ${style.border} bg-[var(--surface)]/85 p-6 [background-image:radial-gradient(rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:6px_6px] ${
        group.wide ? "md:col-span-2" : ""
      }`}
      style={{ animationDelay: `${orden * 90}ms` }}
    >
      <span
        aria-hidden="true"
        className={`gc-cinta-viva absolute inset-x-0 top-0 h-1.5 opacity-80 ${style.tape}`}
      />

      <div className="mt-2 flex items-start gap-3">
        <span className={`grid size-10 shrink-0 place-items-center rounded-[7px] ${style.placa}`}>
          <img src={group.icon} alt="" aria-hidden="true" className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className={`size-2 rounded-full ${style.dot}`} aria-hidden="true" />
            <span
              className={`[font-family:'JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[.15em] ${style.text}`}
            >
              {style.label}
            </span>
          </div>
          <h3 className="mt-1 [font-family:'Montserrat',sans-serif] text-lg font-black italic tracking-[-.01em]">
            {group.label}
          </h3>
        </div>
        <span className="[font-family:'JetBrains_Mono',monospace] shrink-0 text-[11px] tabular-nums text-[var(--muted)]">
          {hechas}/{group.items.length}
        </span>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--surface-raised)]">
        <div
          className={`gc-barra h-full rounded-full ${style.bar}`}
          style={{
            width: visible ? `${avance}%` : "0%",
            transitionDelay: `${orden * 90 + 200}ms`,
          }}
        />
      </div>

      <ul
        className={`mt-4 gap-2 ${
          group.wide ? "grid grid-cols-1 gap-x-8 sm:grid-cols-2" : "flex flex-col"
        }`}
      >
        {group.items.map((item, i) => (
          <li
            key={item.text}
            className={`gc-reveal ${visible ? "gc-reveal-on" : ""} flex items-start gap-2.5 text-[13px] leading-relaxed ${
              item.done ? "text-[var(--text)]" : "text-[var(--muted)]"
            }`}
            style={{ animationDelay: `${orden * 90 + 260 + i * 55}ms` }}
          >
            {/* Solo lo terminado lleva tilde: un ✓ en algo que todavía
                no existe se lee como si ya estuviera disponible. */}
            <span
              className={`mt-0.5 shrink-0 ${item.done ? "text-[var(--accent)]" : "text-[var(--accent-gold)]"}`}
              aria-hidden="true"
            >
              {item.done ? "✓" : "○"}
            </span>
            {item.text}
          </li>
        ))}
      </ul>

      {group.note && (
        <p className="mt-4 border-t border-[var(--line)] pt-3 text-[12px] leading-relaxed text-[var(--muted)]">
          {group.note}
        </p>
      )}
    </div>
  );
}

export function Roadmap() {
  // El resumen dispara los contadores y la barra grande cuando se lo ve.
  const { ref, visible } = useEnPantalla<HTMLDivElement>();
  const porcentaje = useContador(PORCENTAJE, visible, 1500);
  const listas = useContador(LISTAS, visible, 1200);
  const pendientes = useContador(PENDIENTES, visible, 1200);

  return (
    <section id="roadmap" className="mx-auto w-[min(1200px,calc(100%-40px))] py-[70px]">
      <Reveal>
        <SectionHeading eyebrow="Roadmap" title="Lo que ya está y lo que viene." />
      </Reveal>

      {/* Resumen: cuánto del roadmap ya está en la app. Es el momento fuerte
          de la sección — el número sube, la barra viaja y un barrido de luz
          cruza la tarjeta una sola vez. */}
      <div
        ref={ref}
        className={`${featuredClass} gc-reveal ${visible ? "gc-reveal-on" : ""} relative mx-auto mt-10 max-w-[720px] overflow-hidden border border-[var(--accent)]/40 bg-[var(--surface)]/80 p-6 [background-image:radial-gradient(rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:6px_6px]`}
      >
        <span
          aria-hidden="true"
          className="gc-cinta-viva absolute inset-x-0 top-0 h-1.5 opacity-85 [background:repeating-linear-gradient(45deg,var(--accent)_0_10px,var(--bg)_10px_20px)]"
        />
        {visible && <span aria-hidden="true" className="gc-barrido" />}

        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="[font-family:'JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[.16em] text-[var(--muted)]">
              Avance del roadmap
            </span>
            <div className="mt-1 flex flex-wrap items-baseline gap-3">
              <span className="gc-latido [font-family:'JetBrains_Mono',monospace] text-[clamp(44px,7vw,72px)] font-bold leading-none tabular-nums text-[var(--accent)]">
                {porcentaje}%
              </span>
              <span className="text-[13px] text-[var(--muted)]">
                {listas} de {TOTAL} funciones ya están en la app
              </span>
            </div>
          </div>
          <div className="flex gap-5">
            <div>
              <div className="[font-family:'JetBrains_Mono',monospace] text-2xl font-bold tabular-nums text-[var(--accent)]">
                {listas}
              </div>
              <div className="[font-family:'JetBrains_Mono',monospace] text-[10px] uppercase tracking-[.14em] text-[var(--muted)]">
                Listas
              </div>
            </div>
            <div>
              <div className="[font-family:'JetBrains_Mono',monospace] text-2xl font-bold tabular-nums text-[var(--accent-gold)]">
                {pendientes}
              </div>
              <div className="[font-family:'JetBrains_Mono',monospace] text-[10px] uppercase tracking-[.14em] text-[var(--muted)]">
                En camino
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface-raised)]">
          <div
            className="gc-barra h-full rounded-full bg-[var(--accent)] shadow-[0_0_14px_-2px_var(--accent)]"
            style={{ width: visible ? `${PORCENTAJE}%` : "0%", transitionDelay: "260ms" }}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {GROUPS.map((group, i) => (
          <TarjetaGrupo key={group.label} group={group} orden={i} />
        ))}
      </div>

      <Reveal>
        <p className="mx-auto mt-10 max-w-[560px] text-center text-[13px] leading-relaxed text-[var(--muted)]">
          Todo lo marcado como listo ya está funcionando en la app hoy. Lo que está en camino sale sin
          costo extra dentro del plan que tengas.
        </p>
      </Reveal>
    </section>
  );
}
