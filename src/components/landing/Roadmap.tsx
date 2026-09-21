import { useI18n } from "../../i18n/useI18n";
import { Reveal } from "./animaciones";
import { cutClass, SectionHeading } from "./shared";

// Versión compacta: lo ya terminado se resume en una fila de etiquetas y el
// detalle solo cubre lo que sigue en camino. Así la sección vende lo que ya
// funciona sin convertirse en una lista de pendientes.

/** Grupos ya terminados: solo se muestra su nombre. */
const LISTOS = ["gestionClan", "eventosRankings"] as const;

interface Columna {
  /** Clave de roadmap.<labelKey> con el título de la columna. */
  labelKey: string;
  icon: string;
  /** Claves de roadmap.<key>; `done` marca lo que ya está en la app. */
  items: { key: string; done?: boolean }[];
  noteKey?: string;
}

const COLUMNAS: Columna[] = [
  {
    labelKey: "discord",
    icon: "/icons/svg/icon-mail.svg",
    items: [
      { key: "rankingPodioDiscord", done: true },
      { key: "cargaConsultaDatos" },
      { key: "alertasEventos" },
      { key: "sincronizacionMasRapida" },
    ],
  },
  {
    labelKey: "proximasFunciones",
    icon: "/icons/svg/icon-gem.svg",
    items: [
      { key: "clanPool" },
      { key: "rankingGlobalJugadores" },
      { key: "runas" },
      { key: "equipamientoTalentoHeroes" },
    ],
  },
  {
    labelKey: "inteligenciaValle",
    icon: "/icons/svg/icon-chart.svg",
    items: [
      { key: "winrateValle", done: true },
      { key: "fichaClanEnemigoAliado", done: true },
      { key: "planificadorValle" },
    ],
    noteKey: "notaInteligenciaValle",
  },
];

export function Roadmap() {
  const { t } = useI18n();

  return (
    <section id="roadmap" className="mx-auto w-[min(1200px,calc(100%-40px))] py-[52px]">
      <Reveal>
        <SectionHeading eyebrow={t("roadmap.eyebrow")} title={t("roadmap.title")} />
      </Reveal>

      <Reveal>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <span className="[font-family:'JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[.15em] text-[var(--accent)]">
            {t("roadmap.statusDone")}
          </span>
          {LISTOS.map((key) => (
            <span
              key={key}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/8 px-3.5 py-1.5 text-[12px] text-[var(--text)]"
            >
              <span className="text-[var(--accent)]" aria-hidden="true">
                ✓
              </span>
              {t(`roadmap.${key}`)}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div
          className={`${cutClass} relative mt-6 overflow-hidden border border-[var(--accent-gold)]/35 bg-[var(--surface)]/85 p-6 [background-image:radial-gradient(rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:6px_6px]`}
        >
          <span
            aria-hidden="true"
            className="gc-cinta-viva absolute inset-x-0 top-0 h-1.5 opacity-80 [background:repeating-linear-gradient(45deg,var(--accent-gold)_0_10px,var(--bg)_10px_20px)]"
          />
          <div className="mt-2 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
            {COLUMNAS.map((columna) => (
              <div key={columna.labelKey} className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-[7px] bg-[var(--accent-gold)]/10">
                    <img src={columna.icon} alt="" aria-hidden="true" className="size-3.5" />
                  </span>
                  <h3 className="[font-family:'Montserrat',sans-serif] text-[15px] font-black italic tracking-[-.01em]">
                    {t(`roadmap.${columna.labelKey}`)}
                  </h3>
                </div>
                <ul className="mt-3 flex flex-col gap-2">
                  {columna.items.map((item) => (
                    <li
                      key={item.key}
                      className={`flex items-start gap-2.5 text-[13px] leading-relaxed ${
                        item.done ? "text-[var(--text)]" : "text-[var(--muted)]"
                      }`}
                    >
                      <span
                        className={`mt-0.5 shrink-0 ${item.done ? "text-[var(--accent)]" : "text-[var(--accent-gold)]"}`}
                        aria-hidden="true"
                      >
                        {item.done ? "✓" : "○"}
                      </span>
                      {t(`roadmap.${item.key}`)}
                    </li>
                  ))}
                </ul>
                {columna.noteKey && (
                  <p className="mt-3 text-[12px] leading-relaxed text-[var(--muted)]">
                    {t(`roadmap.${columna.noteKey}`)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <p className="mx-auto mt-6 max-w-[560px] text-center text-[13px] leading-relaxed text-[var(--muted)]">
          {t("roadmap.note")}
        </p>
      </Reveal>
    </section>
  );
}
