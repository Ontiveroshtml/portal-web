const APP_URL = import.meta.env.VITE_APP_URL as string;

// Cuando tengas la invitación del servidor, pegala acá y el link se activa solo.
// Vacío = se muestra como "próximamente" en vez de quedar como link roto.
const DISCORD_URL = "";

// Términos y privacidad todavía no existen. Antes que un link muerto, se
// muestran apagados con la aclaración; cuando estén, se completan las URLs.
const TERMINOS_URL = "";
const PRIVACIDAD_URL = "";

interface Enlace {
  label: string;
  href: string;
}

const COLUMNAS: { title: string; links: Enlace[] }[] = [
  {
    title: "Producto",
    links: [
      { label: "Funciones", href: "#funciones" },
      { label: "Por dentro", href: "#showcase" },
      { label: "Planes", href: "#planes" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "Demo", href: "#demo" },
      { label: "Iniciar sesión", href: `${APP_URL}/login` },
    ],
  },
  {
    title: "Comunidad",
    links: [
      { label: "Discord", href: DISCORD_URL },
      { label: "Soporte", href: "#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos", href: TERMINOS_URL },
      { label: "Privacidad", href: PRIVACIDAD_URL },
    ],
  },
];

function EnlaceFooter({ enlace }: { enlace: Enlace }) {
  if (!enlace.href) {
    return (
      <span className="inline-flex items-center gap-2 text-[13px] text-[var(--muted)]">
        {enlace.label}
        <span className="[font-family:'JetBrains_Mono',monospace] text-[9px] uppercase tracking-[.12em] text-[var(--muted)]/70">
          Pronto
        </span>
      </span>
    );
  }
  return (
    <a
      href={enlace.href}
      className="text-[13px] text-[var(--text)] transition duration-150 hover:text-[var(--accent)]"
    >
      {enlace.label}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-14">
      <div className="mx-auto flex w-[min(1200px,calc(100%-40px))] flex-col gap-10 sm:flex-row sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/brand/brand-logo-gc.png" alt="Guild Core" className="h-7 w-auto" />
          </div>
          <p className="mt-3 max-w-[260px] text-xs leading-relaxed text-[var(--muted)]">
            <span className="[font-family:'Montserrat',sans-serif] font-black italic text-[var(--text)]">
              Guild Core
            </span>{" "}
            — Menos horas administrando, más horas jugando.
          </p>
        </div>

        <div className="flex flex-wrap gap-10">
          {COLUMNAS.map((columna) => (
            <div key={columna.title}>
              <span className="[font-family:'JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[.15em] text-[var(--muted)]">
                {columna.title}
              </span>
              <ul className="mt-3 flex flex-col gap-2">
                {columna.links.map((link) => (
                  <li key={link.label}>
                    <EnlaceFooter enlace={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
