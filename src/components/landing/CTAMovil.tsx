import { useEffect, useState } from "react";
import { LOGIN_URL } from "../../lib/config";
import { useI18n } from "../../i18n/useI18n";

// Barra fija de acción para celular. En desktop no existe (el Navbar ya deja
// el CTA siempre a la vista), y en mobile aparece recién cuando el visitante
// pasó el hero: antes de eso el botón del hero está en pantalla y taparlo con
// otro igual solo resta.
export function CTAMovil() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alScrollear = () => setVisible(window.scrollY > 620);
    alScrollear();
    window.addEventListener("scroll", alScrollear, { passive: true });
    return () => window.removeEventListener("scroll", alScrollear);
  }, []);

  return (
    <div
      // inert: oculta, la barra no debe recibir foco ni lectores de pantalla.
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[var(--bg)]/95 px-4 py-3 backdrop-blur transition duration-300 lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <a
          href={LOGIN_URL}
          className="gc-boton gc-boton-primario flex-1 rounded-full bg-[var(--accent)] px-5 py-3 text-center [font-family:'Montserrat',sans-serif] text-[13px] font-black italic uppercase tracking-[.04em] text-[#17201e]"
        >
          {t("hero.ctaPrimary")}
        </a>
        <a
          href="#planes"
          className="gc-boton shrink-0 rounded-full border border-[var(--line)] px-5 py-3 [font-family:'Montserrat',sans-serif] text-[13px] font-black italic uppercase tracking-[.04em] text-[var(--text)]"
        >
          {t("nav.planes")}
        </a>
      </div>
    </div>
  );
}
