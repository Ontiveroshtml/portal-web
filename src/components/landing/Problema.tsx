import { useI18n } from "../../i18n/useI18n";
import { SectionHeading } from "./shared";

// Claves de problema.antes.* y problema.conGuildCore.*
const ANTES = ["planilla", "copiar", "repartir", "reclamos", "rehacer", "liderContador"] as const;
const CON_GUILD_CORE = [
  "unLugar",
  "lecturaAutomatica",
  "repartoReglas",
  "linkPublico",
  "capturaTarde",
  "liderJuega",
] as const;

export function Problema() {
  const { t } = useI18n();

  return (
    <section className="mx-auto w-[min(1200px,calc(100%-40px))] py-[52px]">
      <SectionHeading align="left" title={t("problema.title")} />

      <p className="mt-6 max-w-[680px] text-sm leading-relaxed text-[var(--muted)]">
        {t("problema.intro1")}
      </p>
      <p className="mt-2 max-w-[680px] [font-family:'JetBrains_Mono',monospace] text-sm font-semibold leading-relaxed text-[var(--text)]">
        {t("problema.intro2")}
      </p>
      <p className="mt-4 max-w-[680px] text-sm leading-relaxed text-[var(--muted)]">
        {t("problema.intro3")}
      </p>
      <p className="mt-3 max-w-[680px] text-sm leading-relaxed text-[var(--text)]">
        {t("problema.intro4")}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-[10px] border border-[var(--line)] bg-[var(--surface)]/70 p-6">
          <span
            aria-hidden="true"
            className="gc-linea-roja absolute inset-y-0 left-0 w-[3px]"
          />
          <span className="[font-family:'JetBrains_Mono',monospace] text-[11px] font-bold uppercase tracking-[.15em] text-[var(--danger)]">
            {t("problema.antesLabel")}
          </span>
          <p className="mt-1.5 [font-family:'Montserrat',sans-serif] text-base font-black italic tracking-[-.01em] text-[var(--text)]">
            {t("problema.antesDescripcion")}
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {ANTES.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--muted)]">
                <span className="mt-0.5 shrink-0 text-[var(--danger)]" aria-hidden="true">
                  ✕
                </span>
                {t(`problema.antes.${item}`)}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-[10px] border border-[var(--accent)]/40 bg-[var(--accent)]/6 p-6">
          <span
            aria-hidden="true"
            className="gc-linea-lima absolute inset-y-0 left-0 w-[3px]"
          />
          <span className="[font-family:'JetBrains_Mono',monospace] text-[11px] font-bold uppercase tracking-[.15em] text-[var(--accent)]">
            {t("problema.conGuildCoreLabel")}
          </span>
          <p className="mt-1.5 [font-family:'Montserrat',sans-serif] text-base font-black italic tracking-[-.01em] text-[var(--accent)]">
            {t("problema.conGuildCoreDescripcion")}
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {CON_GUILD_CORE.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--text)]">
                <span className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden="true">
                  ✓
                </span>
                {t(`problema.conGuildCore.${item}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
