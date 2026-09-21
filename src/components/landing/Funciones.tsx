import { useId, useState } from "react";
import { useI18n } from "../../i18n/useI18n";
import { useEnPantalla } from "./useAnimacion";
import { cutClass, SectionHeading } from "./shared";

type Tono = "accent" | "purple" | "gold";

interface Feature {
  number: string;
  /** Prefijo de las claves funciones.cards.<id>.{title,text,stat,detail}. */
  id: string;
  icon: string;
  tono: Tono;
}

// Cada tarjeta lleva su color: borde, placa del icono, número y cinta superior.
// Se alterna lima / violeta / dorado para que la grilla no se lea como un bloque
// gris, respetando los mismos tokens que usa la app.
const TONO: Record<Tono, { borde: string; placa: string; texto: string; cinta: string; glow: string; chip: string }> = {
  accent: {
    borde: "border-[var(--accent)]/30 hover:border-[var(--accent)]/70",
    placa: "bg-[var(--accent)]/12 shadow-[0_0_22px_-8px_rgba(214,250,56,.7)]",
    texto: "text-[var(--accent)]",
    cinta: "[background:repeating-linear-gradient(45deg,var(--accent)_0_10px,var(--bg)_10px_20px)]",
    glow: "hover:shadow-[0_10px_34px_-14px_rgba(214,250,56,.55)]",
    chip: "border-[var(--accent)]/40 bg-[var(--accent)]/8",
  },
  purple: {
    borde: "border-[var(--accent-purple)]/30 hover:border-[var(--accent-purple)]/70",
    placa: "bg-[var(--accent-purple)]/14 shadow-[0_0_22px_-8px_rgba(141,89,253,.7)]",
    texto: "text-[var(--accent-purple)]",
    cinta: "[background:repeating-linear-gradient(45deg,var(--accent-purple)_0_10px,var(--bg)_10px_20px)]",
    glow: "hover:shadow-[0_10px_34px_-14px_rgba(141,89,253,.55)]",
    chip: "border-[var(--accent-purple)]/45 bg-[var(--accent-purple)]/10",
  },
  gold: {
    borde: "border-[var(--accent-gold)]/30 hover:border-[var(--accent-gold)]/70",
    placa: "bg-[var(--accent-gold)]/12 shadow-[0_0_22px_-8px_rgba(255,184,0,.7)]",
    texto: "text-[var(--accent-gold)]",
    cinta: "[background:repeating-linear-gradient(45deg,var(--accent-gold)_0_10px,var(--bg)_10px_20px)]",
    glow: "hover:shadow-[0_10px_34px_-14px_rgba(255,184,0,.55)]",
    chip: "border-[var(--accent-gold)]/45 bg-[var(--accent-gold)]/10",
  },
};

const FEATURES: Feature[] = [
  { number: "01", id: "lectura", tono: "accent", icon: "/icons/svg/icon-badge.svg" },
  { number: "02", id: "verificacion", tono: "purple", icon: "/icons/svg/icon-shield.svg" },
  { number: "03", id: "hacienda", tono: "gold", icon: "/icons/svg/icon-coins.svg" },
  { number: "04", id: "rankings", tono: "accent", icon: "/icons/svg/icon-trophy.svg" },
];

const PASOS = [
  { key: "read", icon: "/icons/svg/icon-badge.svg" },
  { key: "verify", icon: "/icons/svg/icon-shield.svg" },
  { key: "distribute", icon: "/icons/svg/icon-coins.svg" },
] as const;

/** Tarjeta con el beneficio a la vista y el detalle técnico en un desplegable. */
function Tarjeta({ feature, orden, visible }: { feature: Feature; orden: number; visible: boolean }) {
  const { t } = useI18n();
  const [abierta, setAbierta] = useState(false);
  const panelId = useId();
  const tono = TONO[feature.tono];

  return (
    <div
      className={`${cutClass} gc-reveal gc-tarjeta ${visible ? "gc-reveal-on" : ""} relative flex flex-col overflow-hidden border ${tono.borde} ${tono.glow} bg-[var(--surface)]/80 p-6`}
      style={{ animationDelay: `${orden * 75}ms` }}
    >
      <span aria-hidden="true" className={`gc-cinta-viva absolute inset-x-0 top-0 h-1 opacity-70 ${tono.cinta}`} />

      <div className="mb-4 mt-1 flex items-center gap-3">
        <span className={`grid size-11 place-items-center rounded-[8px] ${tono.placa}`}>
          <img src={feature.icon} alt="" aria-hidden="true" className="size-5" />
        </span>
        <span className={`[font-family:'JetBrains_Mono',monospace] text-[11px] font-bold ${tono.texto}`}>
          {feature.number}
        </span>
      </div>

      <h3 className="[font-family:'Montserrat',sans-serif] text-lg font-black italic tracking-[-.01em]">
        {t(`funciones.cards.${feature.id}.title`)}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text)]/85">{t(`funciones.cards.${feature.id}.text`)}</p>

      <span
        className={`mt-4 inline-flex w-fit max-w-full items-center rounded-full border px-3 py-1 [font-family:'JetBrains_Mono',monospace] text-[11px] font-semibold leading-snug text-[var(--text)] ${tono.chip}`}
      >
        {t(`funciones.cards.${feature.id}.stat`)}
      </span>

      <button
        type="button"
        aria-expanded={abierta}
        aria-controls={panelId}
        onClick={() => setAbierta((valor) => !valor)}
        className={`mt-4 inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-[4px] [font-family:'JetBrains_Mono',monospace] text-[11px] font-semibold uppercase tracking-[.12em] underline-offset-4 transition-colors duration-150 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] ${tono.texto}`}
      >
        {abierta ? t("funciones.hideDetail") : t("funciones.viewDetail")}
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={`size-3 transition-transform duration-300 motion-reduce:transition-none ${abierta ? "rotate-180" : ""}`}
        >
          <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Desplegable: la fila de la grilla pasa de 0fr a 1fr, así el alto
          se anima sin medirlo. Cerrado, queda inerte (sin foco ni lectores). */}
      <div
        id={panelId}
        role="region"
        aria-label={t(`funciones.cards.${feature.id}.title`)}
        inert={!abierta}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
          abierta ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="mt-3 border-t border-[var(--line)] pt-3 text-[13px] leading-relaxed text-[var(--text)]/75">
            {t(`funciones.cards.${feature.id}.detail`)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Funciones() {
  const { t } = useI18n();
  // Las tarjetas entran escalonadas: todas juntas se leen como un bloque,
  // de a una guían la vista por la grilla.
  const { ref, visible } = useEnPantalla<HTMLDivElement>();

  return (
    <section id="funciones" className="mx-auto w-[min(1200px,calc(100%-40px))] py-[52px]">
      <SectionHeading eyebrow={t("funciones.eyebrow")} title={t("funciones.title")} />

      {/* Las tres cosas que hace, en el orden en que pasan. Sin números: las
          tarjetas de abajo ya van de 01 a 04 y dos numeraciones confunden. */}
      <ol className="mx-auto mt-7 flex max-w-[860px] flex-col items-center gap-1 sm:flex-row sm:items-start sm:justify-center sm:gap-0">
        {PASOS.map((paso, i) => {
          const ultimo = i === PASOS.length - 1;
          return (
            <li key={paso.key} className="flex flex-col items-center gap-1 sm:flex-row sm:items-start sm:gap-0">
              <div className="flex w-[230px] flex-col items-center text-center">
                <span
                  className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 [font-family:'Montserrat',sans-serif] text-sm font-black italic uppercase tracking-[.03em] text-[var(--text)] ${
                    ultimo
                      ? "border-[var(--accent)]/60 bg-[var(--accent)]/10 shadow-[0_0_22px_-8px_rgba(214,250,56,.7)]"
                      : "border-[var(--line)] bg-[var(--surface)]/80"
                  }`}
                >
                  <img src={paso.icon} alt="" aria-hidden="true" className="size-4" />
                  {t(`funciones.steps.${paso.key}`)}
                </span>
                <span className="mt-2 text-[13px] leading-snug text-[var(--muted)]">
                  {t(`funciones.stepsHint.${paso.key}`)}
                </span>
              </div>
              {!ultimo && (
                <>
                  {/* Conector: horizontal en escritorio, vertical corto en móvil. */}
                  <span aria-hidden="true" className="hidden h-px w-10 self-start bg-[var(--accent)]/50 sm:mt-[19px] sm:block" />
                  <span aria-hidden="true" className="block h-4 w-px bg-[var(--accent)]/50 sm:hidden" />
                </>
              )}
            </li>
          );
        })}
      </ol>

      <div ref={ref} className="mt-10 grid grid-cols-1 items-start gap-4 md:grid-cols-2">
        {FEATURES.map((feature, i) => (
          <Tarjeta key={feature.id} feature={feature} orden={i} visible={visible} />
        ))}
      </div>

      {/* Discord en una línea: además del roadmap trae información del
          presente (rankings y podio ya se publican ahí). */}
      <div
        className={`${cutClass} mt-4 flex flex-col items-start gap-3 border border-[var(--line)] bg-[var(--surface)]/60 px-5 py-4 sm:flex-row sm:items-center`}
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white">
          <svg className="size-4" viewBox="0 0 20 19" aria-hidden="true">
            <use href="/icons.svg#discord-icon" />
          </svg>
        </span>
        <span className="gc-proximamente inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--accent-gold)]/45 bg-[var(--accent-gold)]/10 px-2.5 py-1 [font-family:'JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[.14em] text-[var(--accent-gold)]">
          <span className="gc-punto size-1.5 rounded-full bg-[var(--accent-gold)]" aria-hidden="true" />
          {t("funciones.discord.badge")}
        </span>
        <p className="text-[13px] leading-relaxed text-[var(--text)]/85">{t("funciones.discord.body")}</p>
      </div>
    </section>
  );
}
