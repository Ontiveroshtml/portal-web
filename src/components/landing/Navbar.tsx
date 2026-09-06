const APP_URL = import.meta.env.VITE_APP_URL as string;

const NAV_LINKS = [
  { href: "#funciones", label: "Funciones" },
  { href: "#showcase", label: "Showcase" },
  { href: "#planes", label: "Planes" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="mx-auto flex w-[min(1200px,calc(100%-40px))] items-center justify-between gap-6 py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <img src="/brand/brand-logo-gc.png" alt="Guild Core" className="h-8 w-auto" />
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="[font-family:'JetBrains_Mono',monospace] text-[11px] font-semibold uppercase tracking-[.12em] text-[var(--muted)] transition duration-150 hover:text-[var(--text)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`${APP_URL}/login`}
            className="hidden text-[11px] font-semibold uppercase tracking-[.1em] text-[var(--muted)] transition duration-150 hover:text-[var(--text)] sm:inline"
          >
            Iniciar sesión
          </a>
          <a
            href={`${APP_URL}/login`}
            className="rounded-full bg-[var(--accent)] px-4 py-2 [font-family:'Montserrat',sans-serif] text-[11px] font-extrabold italic uppercase tracking-[.04em] text-[#17201e] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_-6px_rgba(214,250,56,.5)]"
          >
            Probar demo
          </a>
        </div>
      </div>
    </header>
  );
}
