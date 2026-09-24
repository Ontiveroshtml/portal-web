import { LOGIN_URL } from "../../lib/config";
import { DISCORD_DEMO_URL } from "../../lib/links";
import { useI18n } from "../../i18n/useI18n";

// Bloque de la demo. La demo se pide por Discord: el bot del canal #support-tickets
// pregunta rango, clan y servidor, y entrega una cuenta demo al momento.

const INCLUYE = ["real", "loadData", "limits"] as const;

export function DemoDestacada() {
  const { t } = useI18n();

  return (
    <section
      id="demo"
      className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--surface)]/50 [background-image:radial-gradient(rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:6px_6px]"
    >
      <div className="mx-auto flex w-[min(1100px,calc(100%-40px))] flex-col items-center justify-center gap-8 py-12 lg:flex-row lg:gap-16">
        <div className="flex flex-col items-start gap-4">
          <span className="gc-respira-lima-borde inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/45 bg-[var(--accent)]/8 px-3.5 py-1.5 [font-family:'JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[.18em] text-[var(--accent)]">
            <span className="gc-punto size-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            {t("demo.badge")}
          </span>

          <h2 className="max-w-[680px] [font-family:'Montserrat',sans-serif] text-[clamp(22px,3.4vw,34px)] font-black italic leading-[1.12] tracking-[-.02em]">
            {t("demo.title")}{" "}
            <span className="text-[var(--accent)]">{t("demo.titleAccent")}</span>
          </h2>

          <p className="max-w-[680px] text-[14.5px] leading-relaxed text-[var(--muted)]">
            {t("demo.body")}
          </p>

          <ul className="flex flex-col gap-1.5">
            {INCLUYE.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14.5px] text-[var(--text)]">
                <span className="mt-0.5 text-[var(--accent)]" aria-hidden="true">
                  ✓
                </span>
                {t(`demo.includes.${item}`)}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={DISCORD_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gc-boton gc-boton-primario rounded-full bg-[var(--accent)] px-6 py-2.5 [font-family:'Montserrat',sans-serif] text-[14.5px] font-black italic uppercase tracking-[.04em] text-[#17201e] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_34px_-6px_rgba(214,250,56,.5)]"
            >
              {t("demo.request")}
            </a>
            <span className="[font-family:'JetBrains_Mono',monospace] text-[11px] uppercase tracking-[.12em] text-[var(--muted)]">
              {t("demo.requestNote")}
            </span>
          </div>

          <p className="text-[14.5px] text-[var(--muted)]">
            {t("demo.alt")}{" "}
            <a
              href={LOGIN_URL}
              className="text-[var(--accent)] underline underline-offset-4 transition duration-150 hover:text-[var(--text)]"
            >
              {t("demo.altLink")}
            </a>{" "}
            {t("demo.altOr")}{" "}
            <a
              href="#showcase"
              className="text-[var(--accent)] underline underline-offset-4 transition duration-150 hover:text-[var(--text)]"
            >
              {t("demo.altShowcase")}
            </a>
            .
          </p>
        </div>

        <div className="relative hidden w-full max-w-[250px] shrink-0 lg:block">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-[var(--accent)]/12 blur-[80px]"
          />
          <img
            src="/characters/character-pointing-up.avif"
            alt=""
            aria-hidden="true"
            className="w-full drop-shadow-[0_24px_50px_rgba(0,0,0,.5)]"
          />
        </div>
      </div>

    </section>
  );
}
