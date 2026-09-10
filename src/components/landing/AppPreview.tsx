import { useState } from "react";
import { featuredClass, SectionHeading } from "./shared";
import { HaciendaScreen, JugadoresScreen, RankingScreen, WarRoomScreen } from "./previewScreens";

// Reemplaza al viejo bloque de capturas: en vez de screenshots que hay que
// mantener a mano (y que hoy no existen en /public), cada pestaña reconstruye
// la pantalla real con el mismo sistema visual de la app — mismos tokens,
// mismas tarjetas cortadas a 45°, misma tipografía. Si el sistema cambia en
// OCR, acá se cambia igual y no queda una imagen vieja mintiendo.

const TABS = [
  {
    key: "hacienda",
    label: "Hacienda",
    blurb: "El oro del clan, quién aportó y cuánto le tocó a cada uno del reparto.",
    Screen: HaciendaScreen,
  },
  {
    key: "jugadores",
    label: "Jugadores",
    blurb: "El roster completo, con el rango de cada jugador y el ID que lo cruza con todo lo demás.",
    Screen: JugadoresScreen,
  },
  {
    key: "warroom",
    label: "WarRoom",
    blurb: "Cada evento con poder, puntos, kills y bajas — leídos de la captura, no tipeados a mano.",
    Screen: WarRoomScreen,
  },
  {
    key: "ranking",
    label: "Ranking",
    blurb: "El podio y la tabla que tu clan puede ver desde un link público.",
    Screen: RankingScreen,
  },
] as const;

export function AppPreview() {
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>("hacienda");
  const current = TABS.find((tab) => tab.key === active) ?? TABS[0];
  const Screen = current.Screen;

  return (
    <section id="showcase" className="mx-auto w-[min(1200px,calc(100%-40px))] py-[70px]">
      <SectionHeading eyebrow="Por dentro" title="Así se ve Guild Core en uso real." />

      <p className="mx-auto mt-6 max-w-[620px] text-center text-sm leading-relaxed text-[var(--muted)]">
        No son maquetas genéricas: cada pestaña es la pantalla real de la app, con sus mismas tarjetas,
        tablas y colores. Los datos de ejemplo son ficticios.
      </p>

      <div
        role="tablist"
        aria-label="Secciones de Guild Core"
        className="mt-10 flex flex-wrap justify-center gap-2"
      >
        {TABS.map((tab) => {
          const selected = tab.key === active;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              id={`preview-tab-${tab.key}`}
              aria-selected={selected}
              aria-controls={`preview-panel-${tab.key}`}
              onClick={() => setActive(tab.key)}
              className={`gc-boton rounded-full px-4 py-2 [font-family:'Montserrat',sans-serif] text-[11px] font-extrabold italic uppercase tracking-[.06em] transition duration-200 ${
                selected
                  ? "bg-[var(--accent)] text-[#17201e] shadow-[0_0_28px_-8px_rgba(214,250,56,.55)]"
                  : "border border-[var(--line)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <p className="mx-auto mt-5 max-w-[520px] text-center text-[13px] leading-relaxed text-[var(--text)]">
        {current.blurb}
      </p>

      <div
        role="tabpanel"
        id={`preview-panel-${current.key}`}
        aria-labelledby={`preview-tab-${current.key}`}
        className={`${featuredClass} mt-8 overflow-hidden border border-[var(--accent)]/35 bg-[var(--surface)]/80`}
      >
        {/* Cromo de ventana — igual que el bloque anterior, para que se lea como app */}
        <div className="flex items-center gap-1.5 border-b border-[var(--line)] bg-[var(--surface-raised)] px-4 py-2.5">
          {/* Las tres luces laten en cadena, como un semáforo de ventana vivo. */}
          <span
            className="gc-punto size-2 rounded-full bg-[var(--danger)] shadow-[0_0_8px_-1px_var(--danger)]"
            style={{ animationDelay: "0ms" }}
            aria-hidden="true"
          />
          <span
            className="gc-punto size-2 rounded-full bg-[var(--accent-gold)] shadow-[0_0_8px_-1px_var(--accent-gold)]"
            style={{ animationDelay: "260ms" }}
            aria-hidden="true"
          />
          <span
            className="gc-punto size-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_-1px_var(--accent)]"
            style={{ animationDelay: "520ms" }}
            aria-hidden="true"
          />
          <span className="ml-3 [font-family:'JetBrains_Mono',monospace] text-[10px] uppercase tracking-[.14em] text-[var(--muted)]">
            guildcore.app / {current.key}
          </span>
        </div>

        <div className="[background-image:radial-gradient(rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:6px_6px]">
          <div className="overflow-x-auto p-5 sm:p-7">
            <div className="min-w-[560px]">
              <Screen />
            </div>
          </div>
        </div>
      </div>

      {/* La barra que anunciaba la demo vivía acá y repetía, tres párrafos
          antes, lo que dice la sección #demo que viene justo abajo. */}
      <p className="mx-auto mt-12 max-w-[620px] text-center [font-family:'Montserrat',sans-serif] text-[clamp(20px,2.6vw,28px)] font-black italic leading-[1.15] tracking-[-.01em]">
        Todo tu clan. Todos tus datos. <span className="text-[var(--accent)]">Un solo lugar.</span>
      </p>
    </section>
  );
}
