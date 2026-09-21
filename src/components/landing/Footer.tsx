import { LOGIN_URL } from "../../lib/config";
import { useI18n } from "../../i18n/useI18n";

// Cuando tengas la invitación del servidor, pegala acá y el link se activa solo.
// Vacío = se muestra como "próximamente" en vez de quedar como link roto.
const DISCORD_URL: string = "";

// Términos y privacidad todavía no existen. En vez de mostrarlos apagados con
// un cartel de "Pronto" —que suma a la sensación de producto sin terminar— la
// columna Legal directamente no se arma hasta que haya URLs reales.
const TERMINOS_URL: string = "";
const PRIVACIDAD_URL: string = "";

interface Enlace {
  /** Clave de traducción del texto del enlace. */
  labelKey: string;
  href: string;
}

const COLUMNAS: { titleKey: string; links: Enlace[] }[] = [
  {
    titleKey: "footer.producto",
    links: [
      { labelKey: "nav.funciones", href: "#funciones" },
      { labelKey: "nav.showcase", href: "#showcase" },
      { labelKey: "nav.planes", href: "#planes" },
      { labelKey: "nav.roadmap", href: "#roadmap" },
      { labelKey: "nav.demo", href: "#demo" },
      { labelKey: "nav.login", href: LOGIN_URL },
    ],
  },
  {
    titleKey: "footer.comunidad",
    links: [
      { labelKey: "nav.discord", href: DISCORD_URL },
      { labelKey: "footer.soporte", href: "#faq" },
    ],
  },
  ...(TERMINOS_URL || PRIVACIDAD_URL
    ? [
        {
          titleKey: "footer.legal",
          links: [
            { labelKey: "footer.terminos", href: TERMINOS_URL },
            { labelKey: "footer.privacidad", href: PRIVACIDAD_URL },
          ],
        },
      ]
    : []),
];

function EnlaceFooter({ enlace }: { enlace: Enlace }) {
  const { t } = useI18n();
  if (!enlace.href) {
    return (
      <span className="inline-flex items-center gap-2 text-[13px] text-[var(--muted)]">
        {t(enlace.labelKey)}
        <span className="[font-family:'JetBrains_Mono',monospace] text-[9px] uppercase tracking-[.12em] text-[var(--muted)]/70">
          {t("footer.pronto")}
        </span>
      </span>
    );
  }
  return (
    <a
      href={enlace.href}
      className="text-[13px] text-[var(--text)] transition duration-150 hover:text-[var(--accent)]"
    >
      {t(enlace.labelKey)}
    </a>
  );
}

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-[var(--line)] py-14">
      <div className="mx-auto flex w-[min(1200px,calc(100%-40px))] flex-col gap-10 sm:flex-row sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/brand/brand-logo-gc.png" alt={t("navbar.brandAlt")} className="h-7 w-auto" />
          </div>
          <p className="mt-3 max-w-[260px] text-xs leading-relaxed text-[var(--muted)]">
            <span className="[font-family:'Montserrat',sans-serif] font-black italic text-[var(--text)]">
              {t("footer.guildCore")}
            </span>{" "}
            — {t("footer.menosHorasAdmin")} {t("footer.masHorasJuego")}
          </p>
        </div>

        <div className="flex flex-wrap gap-10">
          {COLUMNAS.map((columna) => (
            <div key={columna.titleKey}>
              <span className="[font-family:'JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[.15em] text-[var(--muted)]">
                {t(columna.titleKey)}
              </span>
              <ul className="mt-3 flex flex-col gap-2">
                {columna.links.map((link) => (
                  <li key={link.labelKey}>
                    <EnlaceFooter enlace={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-10 w-[min(1200px,calc(100%-40px))] text-[11px] text-[var(--muted)]/80">
        © {new Date().getFullYear()} {t("footer.guildCore")}. {t("footer.rightsReserved")}
      </p>
    </footer>
  );
}
