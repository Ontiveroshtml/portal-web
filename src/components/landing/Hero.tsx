import { LOGIN_URL } from "../../lib/config";
import { useI18n } from "../../i18n/useI18n";
import { Highlight } from "./shared";

// Cuatro ejemplos de lo que ya funciona hoy (claves de hero.chips); el resto
// se cuenta más abajo, en Funciones y Por dentro.
const DASHBOARD_PREVIEW = ["treasury", "ocr", "warroom", "rankings"] as const;

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="relative overflow-hidden [background-image:radial-gradient(rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:6px_6px]"
    >
      <div className="mx-auto grid w-[min(1200px,calc(100%-40px))] grid-cols-1 items-center gap-8 py-[48px] lg:grid-cols-[1.4fr_.6fr] lg:py-[64px]">
        <div className="flex flex-col items-start gap-5 text-left">
          <span
            className="gc-entrada [font-family:'JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[.2em] text-[var(--muted)]"
            style={{ animationDelay: "40ms" }}
          >
            {t("hero.eyebrow")}
          </span>

          <h1
            className="gc-entrada max-w-[620px] [font-family:'Montserrat',sans-serif] text-[clamp(30px,5vw,48px)] font-black italic leading-[1.08] tracking-[-.02em]"
            style={{ animationDelay: "120ms" }}
          >
            {t("hero.clanGenerates")}{" "}
            <Highlight text={t("hero.turnsInto")} word={t("hero.brandStrong")} className="text-[var(--accent)]" />
          </h1>

          <p
            className="gc-entrada max-w-[540px] text-base font-semibold text-[var(--text)]"
            style={{ animationDelay: "210ms" }}
          >
            {t("hero.subhead")}
          </p>

          <div className="gc-entrada flex flex-wrap gap-3" style={{ animationDelay: "370ms" }}>
            <a
              href={LOGIN_URL}
              className="gc-boton gc-boton-primario rounded-full bg-[var(--accent)] px-6 py-3 [font-family:'Montserrat',sans-serif] text-sm font-black italic uppercase tracking-[.04em] text-[#17201e] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_34px_-6px_rgba(214,250,56,.5)]"
            >
              {t("hero.ctaPrimary")}
            </a>
            {/* Una sola acción secundaria: con tres botones del mismo peso no
                gana ninguno. "Ver planes" queda en el navbar y en la barra fija. */}
            <a
              href="#showcase"
              className="gc-boton rounded-full border border-[var(--line)] px-6 py-3 [font-family:'Montserrat',sans-serif] text-sm font-black italic uppercase tracking-[.04em] text-[var(--text)] transition duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>

          <div className="gc-entrada mt-2 flex flex-wrap gap-2" style={{ animationDelay: "450ms" }}>
            {DASHBOARD_PREVIEW.map((item, i) => (
              <span
                key={item}
                style={{ animationDelay: `${i * 0.45}s` }}
                className="gc-chip-glow rounded-full border border-[var(--line)] bg-[var(--surface)]/70 px-3 py-1.5 text-[11px] text-[var(--muted)] transition duration-200 hover:-translate-y-px hover:text-[var(--text)]"
              >
                {t(`hero.chips.${item}`)}
              </span>
            ))}
          </div>

        </div>

        <div className="gc-entrada relative mx-auto w-full max-w-[290px]" style={{ animationDelay: "300ms" }}>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-[var(--accent)]/12 blur-[90px]"
          />
          <img
            src="/hero/hero-character-main.avif"
            fetchPriority="high"
            alt=""
            aria-hidden="true"
            className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,.55)]"
          />
        </div>
      </div>
    </section>
  );
}
