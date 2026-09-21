import { LOGIN_URL } from "../../lib/config";
import { useI18n } from "../../i18n/useI18n";

export function CTAFinal() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--surface)]/60 [background-image:radial-gradient(rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:6px_6px]">
      <div className="mx-auto flex w-[min(900px,calc(100%-40px))] flex-col items-center gap-5 py-[80px] text-center">
        {/* El cierre habla del próximo paso, no de la promesa: el H1 del hero
            ya dice que Guild Core convierte los datos en decisiones. */}
        <h2 className="[font-family:'Montserrat',sans-serif] text-[clamp(24px,4vw,36px)] font-black italic leading-[1.15] tracking-[-.02em]">
          {t("ctaFinal.title")}
          <br />
          <span className="text-[var(--accent)]">{t("ctaFinal.titleAccent")}</span>
        </h2>
        <p className="max-w-[520px] text-sm text-[var(--muted)]">{t("ctaFinal.body")}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <a
            href={LOGIN_URL}
            className="gc-boton gc-boton-primario rounded-full bg-[var(--accent)] px-6 py-3 [font-family:'Montserrat',sans-serif] text-sm font-black italic uppercase tracking-[.04em] text-[#17201e] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_34px_-6px_rgba(214,250,56,.5)]"
          >
            {t("ctaFinal.ctaPrimary")}
          </a>
          <a
            href="#demo"
            className="gc-boton rounded-full border border-[var(--line)] px-6 py-3 [font-family:'Montserrat',sans-serif] text-sm font-black italic uppercase tracking-[.04em] text-[var(--text)] transition duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {t("ctaFinal.ctaSecondary")}
          </a>
          <a
            href="#planes"
            className="gc-boton rounded-full border border-[var(--line)] px-6 py-3 [font-family:'Montserrat',sans-serif] text-sm font-black italic uppercase tracking-[.04em] text-[var(--text)] transition duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {t("ctaFinal.ctaTertiary")}
          </a>
        </div>
      </div>
    </section>
  );
}
