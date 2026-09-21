import { useI18n } from "../../i18n/useI18n";

// Cuando tengas la invitación del servidor, pegala acá y el link se activa solo.
// Vacío = se muestra sin destino hasta que exista la invitación.
const DISCORD_URL: string = "";

// Sin columna de navegación: el menú de arriba ya lleva a cada sección y
// repetirlo acá solo alargaba el pie.

// Términos y privacidad todavía no existen. En vez de mostrarlos apagados con
// un cartel de "Pronto" —que suma a la sensación de producto sin terminar— la
// columna Legal directamente no se arma hasta que haya URLs reales.
const TERMINOS_URL: string = "";
const PRIVACIDAD_URL: string = "";

interface Enlace {
  /** Clave de traducción del texto del enlace. */
  labelKey: string;
  href: string;
  icon?: "discord" | "soporte";
}

const COLUMNAS: { titleKey: string; links: Enlace[] }[] = [
  {
    titleKey: "footer.comunidad",
    links: [
      { labelKey: "nav.discord", href: DISCORD_URL, icon: "discord" },
      // El soporte se da por Discord. Mientras no haya invitación, lleva a la FAQ
      // para que el enlace nunca quede muerto.
      { labelKey: "footer.soporte", href: DISCORD_URL || "#faq", icon: "soporte" },
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

/** Icono redondo del enlace: el logo de Discord o unos audífonos para el soporte. */
function IconoEnlace({ icon }: { icon: NonNullable<Enlace["icon"]> }) {
  if (icon === "discord") {
    return (
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white">
        <svg className="size-4" viewBox="0 0 20 19" aria-hidden="true">
          <use href="/icons.svg#discord-icon" />
        </svg>
      </span>
    );
  }
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--accent)]/12 text-[var(--accent)]">
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
        <path d="M21 16a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z" />
        <path d="M3 16a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2Z" />
        <path d="M18 18v1a3 3 0 0 1-3 3h-2" />
      </svg>
    </span>
  );
}

function EnlaceFooter({ enlace }: { enlace: Enlace }) {
  const { t } = useI18n();
  const contenido = (
    <>
      {enlace.icon && <IconoEnlace icon={enlace.icon} />}
      {t(enlace.labelKey)}
    </>
  );
  const clases = "inline-flex items-center gap-2.5 text-base font-medium text-[var(--text)]";
  // Sin dirección todavía: se ve igual que un enlace, pero sin destino.
  if (!enlace.href) return <span className={clases}>{contenido}</span>;
  return (
    <a
      href={enlace.href}
      {...(enlace.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${clases} transition duration-150 hover:text-[var(--accent)]`}
    >
      {contenido}
    </a>
  );
}

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-[var(--line)] py-5">
      {/* Logo y descripción a la izquierda; "Comunidad" centrada en la página. */}
      <div className="mx-auto grid w-[min(1200px,calc(100%-40px))] grid-cols-1 items-center gap-4 sm:grid-cols-3">
        <div>
          <img src="/brand/brand-logo-gc.avif" alt={t("navbar.brandAlt")} className="h-16 w-auto" />
          <p className="mt-2 max-w-[340px] text-sm leading-relaxed text-[var(--muted)]">
            <span className="[font-family:'Montserrat',sans-serif] font-black italic text-[var(--text)]">
              {t("footer.guildCore")}
            </span>{" "}
            — {t("footer.menosHorasAdmin")} {t("footer.masHorasJuego")}
          </p>
        </div>

        {COLUMNAS.map((columna) => (
          <div key={columna.titleKey} className="flex flex-col items-center gap-2 text-center">
            <span className="[font-family:'JetBrains_Mono',monospace] text-xs font-semibold uppercase tracking-[.16em] text-[var(--accent)]">
              {t(columna.titleKey)}
            </span>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-1.5">
              {columna.links.map((link) => (
                <li key={link.labelKey}>
                  <EnlaceFooter enlace={link} />
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className="text-[11px] text-[var(--muted)]/80 sm:self-end sm:text-right">
          © {new Date().getFullYear()} {t("footer.guildCore")}. {t("footer.rightsReserved")}
        </p>
      </div>

    </footer>
  );
}
