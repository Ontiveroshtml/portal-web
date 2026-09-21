import { useState } from "react";
import { LOGIN_URL } from "../../lib/config";
import { useI18n } from "../../i18n/useI18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV_LINKS = [
  { href: "#funciones", key: "nav.funciones" },
  { href: "#showcase", key: "nav.showcase" },
  { href: "#planes", key: "nav.planes" },
  { href: "#demo", key: "nav.demo" },
  { href: "#roadmap", key: "nav.roadmap" },
  { href: "#faq", key: "nav.faq" },
];

export function Navbar() {
  const { t } = useI18n();
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="mx-auto flex w-[min(1200px,calc(100%-40px))] items-center justify-between gap-4 py-4 lg:gap-6">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" onClick={() => setAbierto(false)}>
          <img src="/brand/brand-logo-gc.avif" alt={t("navbar.brandAlt")} className="h-8 w-auto" />
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="[font-family:'JetBrains_Mono',monospace] text-[11px] font-semibold uppercase tracking-[.12em] text-[var(--muted)] transition duration-150 hover:text-[var(--text)]"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <LanguageSwitcher />
          {/* El acceso siempre visible: es lo primero que busca quien ya tiene cuenta. */}
          <a
            href={LOGIN_URL}
            className="whitespace-nowrap rounded-full border border-[var(--line)] px-3.5 py-2 [font-family:'Montserrat',sans-serif] text-[11px] font-extrabold italic uppercase tracking-[.04em] text-[var(--text)] transition duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] sm:px-4"
          >
            {t("nav.login")}
          </a>
          <a
            href="#demo"
            className="gc-boton gc-boton-primario hidden whitespace-nowrap rounded-full bg-[var(--accent)] px-4 py-2 [font-family:'Montserrat',sans-serif] text-[11px] font-extrabold italic uppercase tracking-[.04em] text-[#17201e] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_-6px_rgba(214,250,56,.5)] sm:inline-block"
          >
            {t("nav.viewDemo")}
          </a>

          {/* Menú de mano: abajo de lg la navegación no entra en la barra */}
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? t("navbar.closeMenu") : t("navbar.openMenu")}
            className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-[7px] border border-[var(--line)] text-[var(--text)] transition duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] lg:hidden"
          >
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
              {abierto ? (
                <path
                  d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {abierto && (
        <nav id="menu-movil" className="border-t border-[var(--line)] bg-[var(--bg)] lg:hidden">
          <div className="mx-auto flex w-[min(1200px,calc(100%-40px))] flex-col py-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setAbierto(false)}
                className="border-b border-[var(--line)] py-3 [font-family:'JetBrains_Mono',monospace] text-[11px] font-semibold uppercase tracking-[.12em] text-[var(--muted)] transition duration-150 hover:text-[var(--accent)]"
              >
                {t(link.key)}
              </a>
            ))}
            <a
              href={LOGIN_URL}
              onClick={() => setAbierto(false)}
              className="py-3 [font-family:'JetBrains_Mono',monospace] text-[11px] font-semibold uppercase tracking-[.12em] text-[var(--accent)]"
            >
              {t("nav.login")}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
