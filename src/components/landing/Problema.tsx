import { useI18n } from "../../i18n/useI18n";
import { cutClass, SectionHeading } from "./shared";

// Sección de enfoque: un clan que premia con reglas claras y a la vista atrae
// (y retiene) a los jugadores que sí aportan. Claves de problema.pillarN.*
const PILARES = [
  { key: "pillar1", icon: "/icons/svg/icon-chart.svg", tono: "accent" },
  { key: "pillar2", icon: "/icons/svg/icon-shield.svg", tono: "purple" },
  { key: "pillar3", icon: "/icons/svg/icon-coins.svg", tono: "gold" },
] as const;

const AUDIENCIAS = [
  { tipo: "nuevo", icon: "/icons/svg/icon-gem.svg", tono: "accent" },
  { tipo: "veterano", icon: "/icons/svg/icon-trophy.svg", tono: "purple" },
] as const;

const TONO = {
  accent: {
    borde: "border-[var(--accent)]/40",
    fondo: "bg-[var(--accent)]/[.05]",
    glow: "shadow-[0_12px_40px_-22px_rgba(214,250,56,.55)] hover:shadow-[0_14px_44px_-16px_rgba(214,250,56,.6)]",
    etiqueta: "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--accent)]",
    placa: "bg-[var(--accent)]/10 shadow-[0_0_18px_-8px_rgba(214,250,56,.6)]",
    cinta: "[background:repeating-linear-gradient(45deg,var(--accent)_0_10px,var(--bg)_10px_20px)]",
  },
  purple: {
    borde: "border-[var(--accent-purple)]/40",
    fondo: "bg-[var(--accent-purple)]/[.06]",
    glow: "shadow-[0_12px_40px_-22px_rgba(141,89,253,.6)] hover:shadow-[0_14px_44px_-16px_rgba(141,89,253,.65)]",
    etiqueta: "border-[var(--accent-purple)]/50 bg-[var(--accent-purple)]/12 text-[var(--accent-purple)]",
    placa: "bg-[var(--accent-purple)]/12 shadow-[0_0_18px_-8px_rgba(141,89,253,.6)]",
    cinta: "[background:repeating-linear-gradient(45deg,var(--accent-purple)_0_10px,var(--bg)_10px_20px)]",
  },
  gold: {
    borde: "border-[var(--accent-gold)]/35",
    fondo: "",
    glow: "",
    etiqueta: "",
    placa: "bg-[var(--accent-gold)]/10 shadow-[0_0_18px_-8px_rgba(255,184,0,.6)]",
    cinta: "[background:repeating-linear-gradient(45deg,var(--accent-gold)_0_10px,var(--bg)_10px_20px)]",
  },
} as const;

export function Problema() {
  const { t } = useI18n();

  return (
    <section className="mx-auto w-[min(1200px,calc(100%-40px))] py-[52px]">
      <SectionHeading eyebrow={t("problema.eyebrow")} title={t("problema.title")} />

      <p className="mx-auto mt-6 max-w-[720px] text-center text-sm leading-relaxed text-[var(--muted)]">
        {t("problema.lede")}
      </p>

      {/* Para quién en una línea: clanes que arrancan y clanes con años. */}
      <div className="mx-auto mt-8 grid max-w-[980px] grid-cols-1 gap-5 sm:grid-cols-2">
        {AUDIENCIAS.map(({ tipo, icon, tono }) => {
          const estilo = TONO[tono];
          return (
            <div
              key={tipo}
              className={`${cutClass} gc-tarjeta relative flex items-start gap-5 overflow-hidden border ${estilo.borde} ${estilo.fondo} ${estilo.glow} p-6 [background-image:radial-gradient(rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:6px_6px]`}
            >
              <span aria-hidden="true" className={`gc-cinta-viva absolute inset-x-0 top-0 h-1.5 opacity-80 ${estilo.cinta}`} />
              <span className={`mt-1 grid size-16 shrink-0 place-items-center rounded-[12px] ${estilo.placa}`}>
                <img src={icon} alt="" aria-hidden="true" className="size-8" />
              </span>
              <div className="min-w-0">
                <span
                  className={`inline-block rounded-full border px-2.5 py-0.5 [font-family:'JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[.15em] ${estilo.etiqueta}`}
                >
                  {t(`problema.audience.${tipo}.label`)}
                </span>
                <p className="mt-2 [font-family:'Montserrat',sans-serif] text-2xl font-black italic leading-tight tracking-[-.01em]">
                  {t(`problema.audience.${tipo}.title`)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {t(`problema.audience.${tipo}.body`)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        {PILARES.map(({ key, icon, tono }) => {
          const estilo = TONO[tono];
          return (
            <div
              key={key}
              className={`${cutClass} relative overflow-hidden border ${estilo.borde} bg-[var(--surface)]/85 p-6 [background-image:radial-gradient(rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:6px_6px]`}
            >
              <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 opacity-80 ${estilo.cinta}`} />
              <span className={`mt-2 grid size-10 place-items-center rounded-[7px] ${estilo.placa}`}>
                <img src={icon} alt="" aria-hidden="true" className="size-4" />
              </span>
              <h3 className="mt-4 [font-family:'Montserrat',sans-serif] text-lg font-black italic tracking-[-.01em]">
                {t(`problema.${key}.title`)}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{t(`problema.${key}.body`)}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-1.5 rounded-[10px] border border-[var(--accent)]/40 bg-[var(--accent)]/6 px-6 py-5 text-center sm:text-left">
        <p className="[font-family:'Montserrat',sans-serif] text-base font-black italic tracking-[-.01em] text-[var(--accent)]">
          {t("problema.joinTitle")}
        </p>
        <p className="text-[13px] leading-relaxed text-[var(--text)]">{t("problema.joinBody")}</p>
      </div>
    </section>
  );
}
