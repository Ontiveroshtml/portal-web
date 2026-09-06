const APP_URL = import.meta.env.VITE_APP_URL as string;

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#funciones" },
      { label: "Plans", href: "#planes" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "Demo", href: `${APP_URL}/login` },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: "#" },
      { label: "Support", href: "#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-14">
      <div className="mx-auto flex w-[min(1200px,calc(100%-40px))] flex-col gap-10 sm:flex-row sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/brand/brand-logo-gc.png" alt="Guild Core" className="h-7 w-auto" />
          </div>
          <p className="mt-3 max-w-[260px] text-xs text-[var(--muted)]">
            <span className="[font-family:'Montserrat',sans-serif] font-black italic text-[var(--text)]">
              Guild Core
            </span>{" "}
            — Manage better. Lead smarter.
          </p>
        </div>

        <div className="flex flex-wrap gap-10">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <span className="[font-family:'JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[.15em] text-[var(--muted)]">
                {column.title}
              </span>
              <ul className="mt-3 flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-[var(--text)] transition duration-150 hover:text-[var(--accent)]"
                    >
                      {link.label}
                    </a>
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
