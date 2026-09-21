import { useI18n } from "../../i18n/useI18n";
import { cutClass, SectionHeading } from "./shared";

// Sección de enfoque: un clan que premia con reglas claras y a la vista atrae
// (y retiene) a los jugadores que sí aportan. Claves de problema.pillarN.*
const PILARES = [
  { key: "pillar1", icon: "/icons/svg/icon-chart.svg", tono: "accent" },
  { key: "pillar2", icon: "/icons/svg/icon-shield.svg", tono: "purple" },
  { key: "pillar3", icon: "/icons/svg/icon-coins.svg", tono: "gold" },
] as const;

const TONO = {
  accent: {
    borde: "border-[var(--accent)]/35",
    placa: "bg-[var(--accent)]/10 shadow-[0_0_18px_-8px_rgba(214,250,56,.6)]",
    cinta: "[background:repeating-linear-gradient(45deg,var(--accent)_0_10px,var(--bg)_10px_20px)]",
  },
  purple: {
    borde: "border-[var(--accent-purple)]/35",
    placa: "bg-[var(--accent-purple)]/12 shadow-[0_0_18px_-8px_rgba(141,89,253,.6)]",
    cinta: "[background:repeating-linear-gradient(45deg,var(--accent-purple)_0_10px,var(--bg)_10px_20px)]",
  },
  gold: {
    borde: "border-[var(--accent-gold)]/35",
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

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
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
