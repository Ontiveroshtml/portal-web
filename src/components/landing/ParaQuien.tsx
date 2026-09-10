import type { ReactNode } from "react";
import { cutClass, SectionHeading } from "./shared";

interface Capacidad {
  icon: string;
  titulo: string;
  detalle: string;
}

const LIDERES: Capacidad[] = [
  {
    icon: "/icons/svg/icon-coins.svg",
    titulo: "Hacienda y cortes",
    detalle: "Nadie vuelve a preguntarte cuánto le toca.",
  },
  {
    icon: "/icons/svg/icon-chart.svg",
    titulo: "Reparto configurable",
    detalle: "Una regla escrita antes de repartir, igual para todos.",
  },
  {
    icon: "/icons/svg/icon-badge.svg",
    titulo: "Lectura de capturas",
    detalle: "Se terminó copiar números de una imagen.",
  },
  {
    icon: "/icons/svg/icon-shield.svg",
    titulo: "Verificación y auditoría",
    detalle: "Si alguien discute un número, tienes el historial.",
  },
  {
    icon: "/icons/svg/icon-sword.svg",
    titulo: "WarRoom",
    detalle: "El evento entero, con las columnas que a ti te sirven.",
  },
  {
    icon: "/icons/svg/icon-users.svg",
    titulo: "Roster y rangos",
    detalle: "Cada jugador cruzado por su ID, sin confundir nombres.",
  },
  {
    icon: "/icons/svg/icon-trophy.svg",
    titulo: "Rankings y links públicos",
    detalle: "Envías un link y dejan de escribirte por privado.",
  },
  {
    icon: "/icons/svg/icon-book.svg",
    titulo: "Historial completo",
    detalle: "Comparar un mes con otro deja de ser un trabajo.",
  },
];

const JUGADORES: Capacidad[] = [
  {
    icon: "/icons/svg/icon-chart.svg",
    titulo: "Tu progreso",
    detalle: "Poder, kills y bajas, evento tras evento.",
  },
  {
    icon: "/icons/svg/icon-trophy.svg",
    titulo: "Tu puesto en el ranking",
    detalle: "Podio y tabla, por puntos, kills o bajas.",
  },
  {
    icon: "/icons/svg/icon-gem.svg",
    titulo: "Lo que te toca del corte",
    detalle: "Cuánto donaste y cuánto te vuelve.",
  },
  {
    icon: "/icons/svg/icon-users.svg",
    titulo: "Tu peso en el clan",
    detalle: "Qué porcentaje del total aportaste tú.",
  },
];

const JUGADORES_PROXIMAMENTE = [
  "Líder Supremo",
  "Runas",
  "Banda de guerra",
  "Simulaciones de progresión",
];

/** Fila de capacidad: icono en su placa de color + título y detalle. */
function CapacidadItem({ item, tono }: { item: Capacidad; tono: "accent" | "purple" }) {
  const placa =
    tono === "accent"
      ? "bg-[var(--accent)]/10 shadow-[0_0_18px_-8px_rgba(214,250,56,.6)]"
      : "bg-[var(--accent-purple)]/12 shadow-[0_0_18px_-8px_rgba(141,89,253,.6)]";
  return (
    <div className="flex items-start gap-3">
      <span className={`grid size-9 shrink-0 place-items-center rounded-[7px] ${placa}`}>
        <img src={item.icon} alt="" aria-hidden="true" className="size-4" />
      </span>
      <div>
        <div className="text-[13px] font-bold text-[var(--text)]">{item.titulo}</div>
        <div className="mt-0.5 text-[12px] leading-relaxed text-[var(--muted)]">{item.detalle}</div>
      </div>
    </div>
  );
}

function Tarjeta({
  eyebrow,
  titulo,
  tono,
  children,
}: {
  eyebrow: string;
  titulo: string;
  tono: "accent" | "purple";
  children: ReactNode;
}) {
  const borde = tono === "accent" ? "border-[var(--accent)]/35" : "border-[var(--accent-purple)]/35";
  const fondo = tono === "accent" ? "bg-[var(--accent)]/[.04]" : "bg-[var(--accent-purple)]/[.05]";
  const cinta =
    tono === "accent"
      ? "[background:repeating-linear-gradient(45deg,var(--accent)_0_10px,var(--bg)_10px_20px)]"
      : "[background:repeating-linear-gradient(45deg,var(--accent-purple)_0_10px,var(--bg)_10px_20px)]";
  const color = tono === "accent" ? "text-[var(--accent)]" : "text-[var(--accent-purple)]";

  return (
    <div
      className={`${cutClass} relative flex flex-col overflow-hidden border ${borde} ${fondo} p-7 [background-image:radial-gradient(rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:6px_6px]`}
    >
      <span aria-hidden="true" className={`gc-cinta-viva absolute inset-x-0 top-0 h-1.5 opacity-80 ${cinta}`} />
      <span
        className={`mt-1.5 [font-family:'JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[.15em] ${color}`}
      >
        {eyebrow}
      </span>
      <h3 className="mt-2 [font-family:'Montserrat',sans-serif] text-2xl font-black italic tracking-[-.01em]">
        {titulo}
      </h3>
      {children}
    </div>
  );
}

export function ParaQuien() {
  return (
    <section className="mx-auto w-[min(1200px,calc(100%-40px))] py-[70px]">
      <SectionHeading eyebrow="Para quién es" title="Hecho para líderes y para jugadores." />

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Tarjeta eyebrow="Líderes y administradores" titulo="Control total del clan." tono="accent">
          <p className="mt-2 max-w-[46ch] text-[13px] leading-relaxed text-[var(--muted)]">
            Todo el clan en una sola pantalla, y cada decisión respaldada por un dato que puedes mostrar.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
            {LIDERES.map((item) => (
              <CapacidadItem key={item.titulo} item={item} tono="accent" />
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-[var(--line)] pt-5">
            <img
              src="/icons/svg/icon-crown.svg"
              alt=""
              aria-hidden="true"
              className="size-5 shrink-0"
            />
            <p className="[font-family:'Montserrat',sans-serif] text-base font-black italic tracking-[-.01em] text-[var(--accent)]">
              Toma decisiones con datos, no con suposiciones.
            </p>
          </div>
        </Tarjeta>

        <Tarjeta eyebrow="Jugadores" titulo="Tu progreso también importa." tono="purple">
          <p className="mt-2 max-w-[46ch] text-[13px] leading-relaxed text-[var(--muted)]">
            No solo sirve para administrar el clan: cada miembro puede ver dónde está parado y cuánto
            está aportando.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
            {JUGADORES.map((item) => (
              <CapacidadItem key={item.titulo} item={item} tono="purple" />
            ))}
          </div>

          <div className="mt-6 border-t border-[var(--line)] pt-5">
            <span className="gc-proximamente inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-gold)]/45 bg-[var(--accent-gold)]/10 px-2.5 py-1 [font-family:'JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[.15em] text-[var(--accent-gold)]">
              <span className="gc-punto size-1.5 rounded-full bg-[var(--accent-gold)]" aria-hidden="true" />
              Próximamente
            </span>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]">
              Herramientas propias del jugador, para simular una implementación antes de gastar recursos
              en el juego.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {JUGADORES_PROXIMAMENTE.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/8 px-3 py-1.5 text-[12px] text-[var(--accent-gold)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-[var(--line)] pt-5">
            <img
              src="/icons/svg/icon-gem.svg"
              alt=""
              aria-hidden="true"
              className="size-5 shrink-0"
            />
            <p className="[font-family:'Montserrat',sans-serif] text-base font-black italic tracking-[-.01em] text-[var(--accent-purple)]">
              No solo administramos clanes. También ayudamos a los jugadores a mejorar.
            </p>
          </div>
        </Tarjeta>
      </div>
    </section>
  );
}
