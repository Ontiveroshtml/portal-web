import { useI18n } from "../../i18n/useI18n";
import { useEnPantalla } from "./useAnimacion";
import { cutClass, SectionHeading } from "./shared";

type Tono = "accent" | "purple" | "gold";

interface Feature {
  number: string;
  /** Prefijo de las claves de funciones.<id>.title / hook / body. */
  id: string;
  icon: string;
  tono: Tono;
}

// Cada tarjeta lleva su color: borde, placa del icono, número y cinta superior.
// Se alterna lima / violeta / dorado para que la grilla no se lea como un bloque
// gris, respetando los mismos tokens que usa la app.
const TONO: Record<Tono, { borde: string; placa: string; texto: string; cinta: string; glow: string }> = {
  accent: {
    borde: "border-[var(--accent)]/30 hover:border-[var(--accent)]/70",
    placa: "bg-[var(--accent)]/12 shadow-[0_0_22px_-8px_rgba(214,250,56,.7)]",
    texto: "text-[var(--accent)]",
    cinta: "[background:repeating-linear-gradient(45deg,var(--accent)_0_10px,var(--bg)_10px_20px)]",
    glow: "hover:shadow-[0_10px_34px_-14px_rgba(214,250,56,.55)]",
  },
  purple: {
    borde: "border-[var(--accent-purple)]/30 hover:border-[var(--accent-purple)]/70",
    placa: "bg-[var(--accent-purple)]/14 shadow-[0_0_22px_-8px_rgba(141,89,253,.7)]",
    texto: "text-[var(--accent-purple)]",
    cinta: "[background:repeating-linear-gradient(45deg,var(--accent-purple)_0_10px,var(--bg)_10px_20px)]",
    glow: "hover:shadow-[0_10px_34px_-14px_rgba(141,89,253,.55)]",
  },
  gold: {
    borde: "border-[var(--accent-gold)]/30 hover:border-[var(--accent-gold)]/70",
    placa: "bg-[var(--accent-gold)]/12 shadow-[0_0_22px_-8px_rgba(255,184,0,.7)]",
    texto: "text-[var(--accent-gold)]",
    cinta: "[background:repeating-linear-gradient(45deg,var(--accent-gold)_0_10px,var(--bg)_10px_20px)]",
    glow: "hover:shadow-[0_10px_34px_-14px_rgba(255,184,0,.55)]",
  },
};

const FEATURES: Feature[] = [
  {
    number: "01",
    id: "feature1",
    tono: "accent",
    icon: "/icons/svg/icon-coins.svg",
  },
  {
    number: "02",
    id: "feature2",
    tono: "purple",
    icon: "/icons/svg/icon-chart.svg",
  },
  {
    number: "03",
    id: "feature3",
    tono: "gold",
    icon: "/icons/svg/icon-badge.svg",
  },
  {
    number: "04",
    id: "feature4",
    tono: "accent",
    icon: "/icons/svg/icon-shield.svg",
  },
  {
    number: "05",
    id: "feature5",
    tono: "purple",
    icon: "/icons/svg/icon-sword.svg",
  },
  {
    number: "06",
    id: "feature6",
    tono: "gold",
    icon: "/icons/svg/icon-trophy.svg",
  },
];

export function Funciones() {
  const { t } = useI18n();
  // Las seis tarjetas entran escalonadas: todas juntas se leen como un
  // bloque, de a una guían la vista por la grilla.
  const { ref, visible } = useEnPantalla<HTMLDivElement>();

  return (
    <section id="funciones" className="mx-auto w-[min(1200px,calc(100%-40px))] py-[52px]">
      <SectionHeading eyebrow={t("funciones.eyebrow")} title={t("funciones.title")} />

      <p className="mx-auto mt-6 max-w-[620px] text-center text-sm leading-relaxed text-[var(--muted)]">
        {t("funciones.intro")}
      </p>

      <div ref={ref} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <div
            key={feature.number}
            className={`${cutClass} gc-reveal gc-tarjeta ${visible ? "gc-reveal-on" : ""} relative overflow-hidden border ${TONO[feature.tono].borde} ${TONO[feature.tono].glow} bg-[var(--surface)]/80 p-6`}
            style={{ animationDelay: `${i * 75}ms` }}
          >
            <span
              aria-hidden="true"
              className={`gc-cinta-viva absolute inset-x-0 top-0 h-1 opacity-70 ${TONO[feature.tono].cinta}`}
            />
            <div className="mb-4 mt-1 flex items-center gap-3">
              <span
                className={`grid size-11 place-items-center rounded-[8px] ${TONO[feature.tono].placa}`}
              >
                <img src={feature.icon} alt="" aria-hidden="true" className="size-5" />
              </span>
              <span
                className={`[font-family:'JetBrains_Mono',monospace] text-[11px] font-bold ${TONO[feature.tono].texto}`}
              >
                {feature.number}
              </span>
            </div>
            <h3 className="[font-family:'Montserrat',sans-serif] text-lg font-black italic tracking-[-.01em]">
              {t(`funciones.${feature.id}.title`)}
            </h3>
            <p className="mt-2 text-sm font-semibold text-[var(--text)]">{t(`funciones.${feature.id}.hook`)}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{t(`funciones.${feature.id}.body`)}</p>
          </div>
        ))}
      </div>

      {/* Un solo bloque de "lo que viene" en esta sección: el resto del futuro
          vive en el Roadmap. Discord se queda porque además del roadmap trae
          información del presente — el soporte ya se da ahí. */}
      <div
        className={`${cutClass} mt-5 flex flex-col items-start gap-4 border border-[var(--line)] bg-[var(--surface)]/60 p-6 sm:flex-row`}
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white">
          <svg className="size-5" viewBox="0 0 20 19" aria-hidden="true">
            <use href="/icons.svg#discord-icon" />
          </svg>
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="[font-family:'Montserrat',sans-serif] text-lg font-black italic tracking-[-.01em]">
              {t("funciones.discord.title")}
            </h3>
            <span className="gc-proximamente inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-gold)]/45 bg-[var(--accent-gold)]/10 px-2.5 py-1 [font-family:'JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[.14em] text-[var(--accent-gold)]">
              <span className="gc-punto size-1.5 rounded-full bg-[var(--accent-gold)]" aria-hidden="true" />
              {t("funciones.discord.badge")}
            </span>
          </div>
          <p className="mt-2 max-w-[760px] text-[13px] leading-relaxed text-[var(--muted)]">
            {t("funciones.discord.body")}
          </p>
        </div>
      </div>

    </section>
  );
}
