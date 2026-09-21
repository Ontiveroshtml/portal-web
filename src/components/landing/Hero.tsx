import { LOGIN_URL } from "../../lib/config";
import { useI18n } from "../../i18n/useI18n";
import { Highlight } from "./shared";

// Lo que ya funciona hoy en la app web (claves de hero.chips).
const DASHBOARD_PREVIEW = [
  "treasury",
  "cashback",
  "performance",
  "ocr",
  "review",
  "warroom",
  "roster",
  "rankings",
  "public",
  "dashboard",
  "history",
] as const;

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="relative overflow-hidden [background-image:radial-gradient(rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:6px_6px]"
    >
      <div className="mx-auto grid w-[min(1200px,calc(100%-40px))] grid-cols-1 items-center gap-10 py-[70px] lg:grid-cols-[1.1fr_.9fr] lg:py-[100px]">
        <div className="flex flex-col items-start gap-6 text-left">
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

          <p
            className="gc-entrada max-w-[540px] text-sm leading-relaxed text-[var(--muted)]"
            style={{ animationDelay: "290ms" }}
          >
            {t("hero.description")}
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

          <div className="gc-entrada mt-4 flex flex-wrap gap-2" style={{ animationDelay: "450ms" }}>
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

          <p
            className="gc-entrada flex flex-wrap items-center gap-2 text-[11px] text-[var(--muted)]"
            style={{ animationDelay: "530ms" }}
          >
            <span className="[font-family:'JetBrains_Mono',monospace] font-semibold uppercase tracking-[.14em] text-[var(--accent-gold)]">
              {t("hero.comingSoon")}
            </span>
            {t("hero.comingSoonItems")}
          </p>
        </div>

        <div className="gc-entrada relative mx-auto w-full max-w-[420px]" style={{ animationDelay: "300ms" }}>
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

      <div className="relative mx-auto w-[min(1200px,calc(100%-40px))] pb-[70px] text-center">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -z-10 h-[220px] w-[min(900px,90%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/16 blur-[110px]"
        />
        <span
          aria-hidden="true"
          className="mx-auto mb-4 block h-[3px] w-[120px] opacity-80 [background:repeating-linear-gradient(90deg,var(--accent)_0_10px,transparent_10px_20px)]"
        />
        <p className="mx-auto max-w-[900px] [font-family:'Montserrat',sans-serif] text-[clamp(28px,5.5vw,56px)] font-black italic uppercase leading-[1.05] tracking-[-.02em] text-[var(--text)]">
          {t("hero.bottom")}
          <br />
          <span className="text-[var(--accent)] drop-shadow-[0_0_38px_rgba(214,250,56,.55)]">
            {t("hero.bottomAccent")}
          </span>
        </p>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-[3px] w-[120px] opacity-80 [background:repeating-linear-gradient(90deg,var(--accent)_0_10px,transparent_10px_20px)]"
        />
      </div>
    </section>
  );
}
