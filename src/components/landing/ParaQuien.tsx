import type { ReactNode } from "react";
import { useI18n } from "../../i18n/useI18n";
import { cutClass, SectionHeading } from "./shared";

interface Capacidad {
  icon: string;
  /** Prefijo de las claves paraQuien.<grupo>.<clave> y <clave>Detalle. */
  clave: string;
  /** Solo se incluye en el plan Intelligence: se marca con una etiqueta. */
  intelligence?: boolean;
}

const LIDERES: Capacidad[] = [
  { icon: "/icons/svg/icon-coins.svg", clave: "hacienda" },
  { icon: "/icons/svg/icon-chart.svg", clave: "reparto" },
  { icon: "/icons/svg/icon-badge.svg", clave: "lectura" },
  { icon: "/icons/svg/icon-shield.svg", clave: "verificacion" },
  { icon: "/icons/svg/icon-sword.svg", clave: "valle", intelligence: true },
  { icon: "/icons/svg/icon-trophy.svg", clave: "ranking" },
  { icon: "/icons/svg/icon-book.svg", clave: "historial" },
  { icon: "/icons/svg/icon-users.svg", clave: "roster" },
  { icon: "/icons/svg/icon-gem.svg", clave: "rivales", intelligence: true },
  { icon: "/icons/svg/icon-mail.svg", clave: "discord", intelligence: true },
];

const JUGADORES: Capacidad[] = [
  { icon: "/icons/svg/icon-chart.svg", clave: "progreso" },
  { icon: "/icons/svg/icon-gem.svg", clave: "corte" },
  { icon: "/icons/svg/icon-trophy.svg", clave: "ranking" },
  { icon: "/icons/svg/icon-users.svg", clave: "peso" },
];

const JUGADORES_PROXIMAMENTE = ["liderSupremo", "runas", "bandaDeGuerra", "simulaciones", "coach"] as const;

/** Fila de capacidad: icono en su placa de color + título y detalle. */
function CapacidadItem({
  item,
  grupo,
  tono,
}: {
  item: Capacidad;
  grupo: "lideres" | "jugadores";
  tono: "accent" | "purple";
}) {
  const { t } = useI18n();
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
        <div className="flex flex-wrap items-center gap-2 text-[13px] font-bold text-[var(--text)]">
          {t(`paraQuien.${grupo}.${item.clave}`)}
          {item.intelligence && (
            <span className="rounded-full border border-[var(--accent-purple)]/50 bg-[var(--accent-purple)]/12 px-2 py-0.5 [font-family:'JetBrains_Mono',monospace] text-[9px] font-bold uppercase tracking-[.12em] text-[var(--accent-purple)]">
              Intelligence
            </span>
          )}
        </div>
        <div className="mt-0.5 text-[12px] leading-relaxed text-[var(--muted)]">{t(`paraQuien.${grupo}.${item.clave}Detalle`)}</div>
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
  const { t } = useI18n();

  return (
    <section className="mx-auto w-[min(1200px,calc(100%-40px))] py-[52px]">
      <SectionHeading eyebrow={t("paraQuien.eyebrow")} title={t("paraQuien.title")} />

      <div className="mt-12 grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        <Tarjeta eyebrow={t("paraQuien.lideres.eyebrow")} titulo={t("paraQuien.lideres.titulo")} tono="accent">
          <p className="mt-2 max-w-[46ch] text-[13px] leading-relaxed text-[var(--muted)]">
            {t("paraQuien.lideres.descripcion")}
          </p>

          <div className="mt-6 mb-6 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
            {LIDERES.map((item) => (
              <CapacidadItem key={item.clave} item={item} grupo="lideres" tono="accent" />
            ))}
          </div>

          <div className="flex items-center gap-3 border-t border-[var(--line)] pt-5">
            <img
              src="/icons/svg/icon-crown.svg"
              alt=""
              aria-hidden="true"
              className="size-5 shrink-0"
            />
            <p className="[font-family:'Montserrat',sans-serif] text-base font-black italic tracking-[-.01em] text-[var(--accent)]">
              {t("paraQuien.lideres.conclusion")}
            </p>
          </div>
        </Tarjeta>

        <Tarjeta eyebrow={t("paraQuien.jugadores.eyebrow")} titulo={t("paraQuien.jugadores.titulo")} tono="purple">
          {/* Todo el bloque es el modo individual: una persona o un grupo
              pequeño de amigos, sin depender de que el clan contrate un plan. */}
          <span className="gc-proximamente mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--accent-gold)]/45 bg-[var(--accent-gold)]/10 px-2.5 py-1 [font-family:'JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[.15em] text-[var(--accent-gold)]">
            <span className="gc-punto size-1.5 rounded-full bg-[var(--accent-gold)]" aria-hidden="true" />
            {t("paraQuien.jugadores.proximamente")}
          </span>

          <p className="mt-3 max-w-[50ch] text-[13px] leading-relaxed text-[var(--text)]/80">
            {t("paraQuien.jugadores.descripcion")}
          </p>

          <p className="mt-5 [font-family:'JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[.15em] text-[var(--accent-purple)]">
            {t("paraQuien.jugadores.conPodras")}
          </p>
          <div className="mt-3 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
            {JUGADORES.map((item) => (
              <CapacidadItem key={item.clave} item={item} grupo="jugadores" tono="purple" />
            ))}
          </div>

          <div className="mt-6 border-t border-[var(--line)] pt-5">
            <p className="text-[13px] leading-relaxed text-[var(--muted)]">
              {t("paraQuien.jugadores.descripcionProximamente")}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {JUGADORES_PROXIMAMENTE.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/8 px-3 py-1.5 text-[12px] text-[var(--accent-gold)]"
                >
                  {t(`paraQuien.jugadores.${item}`)}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-[var(--line)] pt-5">
            <img src="/icons/svg/icon-gem.svg" alt="" aria-hidden="true" className="size-5 shrink-0" />
            <p className="[font-family:'Montserrat',sans-serif] text-base font-black italic tracking-[-.01em] text-[var(--accent-purple)]">
              {t("paraQuien.jugadores.conclusion")}
            </p>
          </div>
        </Tarjeta>
      </div>
    </section>
  );
}
