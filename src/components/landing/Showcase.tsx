import { cutClass, SectionHeading } from "./shared";

interface ShowcaseItem {
  eyebrow: string;
  title: string;
  // TODO(dev): reemplazar por una captura real de la pantalla ya construida
  // (P:\GC_GB\OCR) una vez que se pueda tomar un screenshot — este entorno no
  // tiene navegador/herramienta de captura disponible. No usar stock/placeholder
  // genérico como reemplazo definitivo, solo como marcador temporal visible.
  screenshotSrc: string;
  screenshotAlt: string;
}

const SHOWCASE: ShowcaseItem[] = [
  {
    eyebrow: "Hacienda",
    title: "Ingresos, donaciones y repartos organizados en un solo lugar.",
    screenshotSrc: "/showcase/showcase-hacienda.png",
    screenshotAlt: "Captura de la sección Hacienda de Guild Core",
  },
  {
    eyebrow: "Rangos y jugadores",
    title: "Quién lidera, quién administra, quién progresa — de un vistazo.",
    screenshotSrc: "/showcase/showcase-players.png",
    screenshotAlt: "Captura del roster de jugadores con columna de rango",
  },
  {
    eyebrow: "WarRoom",
    title: "Los datos de cada evento, filtrados a lo que necesitás ver.",
    screenshotSrc: "/showcase/showcase-warroom.png",
    screenshotAlt: "Captura de la tabla de estadísticas de guerra WarRoom",
  },
];

function ShowcaseFrame({ item }: { item: ShowcaseItem }) {
  return (
    <div className={`${cutClass} overflow-hidden border border-[var(--line)] bg-[var(--surface)]/80`}>
      <div className="flex items-center gap-1.5 border-b border-[var(--line)] bg-[var(--surface-raised)] px-4 py-2.5">
        <span className="size-2 rounded-full bg-[var(--danger)]/70" aria-hidden="true" />
        <span className="size-2 rounded-full bg-[var(--accent-gold)]/70" aria-hidden="true" />
        <span className="size-2 rounded-full bg-[var(--accent)]/70" aria-hidden="true" />
      </div>
      <img
        src={item.screenshotSrc}
        alt={item.screenshotAlt}
        className="block aspect-video w-full object-cover object-top"
        onError={(event) => {
          event.currentTarget.style.display = "none";
          event.currentTarget.nextElementSibling?.classList.remove("hidden");
        }}
      />
      <div className="hidden aspect-video flex-col items-center justify-center gap-2 border-t border-dashed border-[var(--line)] bg-[var(--surface)] p-6 text-center">
        <span className="[font-family:'JetBrains_Mono',monospace] text-[10px] uppercase tracking-[.15em] text-[var(--muted)]">
          Falta captura real
        </span>
        <p className="max-w-[260px] text-xs text-[var(--muted)]">
          Colocar en <code className="text-[var(--text)]">public{item.screenshotSrc}</code>
        </p>
      </div>
      <div className="p-5">
        <span className="[font-family:'JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[.15em] text-[var(--accent)]">
          {item.eyebrow}
        </span>
        <p className="mt-1.5 text-sm font-bold text-[var(--text)]">{item.title}</p>
      </div>
    </div>
  );
}

export function Showcase() {
  return (
    <section id="showcase" className="mx-auto w-[min(1200px,calc(100%-40px))] py-[70px]">
      <SectionHeading eyebrow="Showcase" title="Así se ve Guild Core en uso real." />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {SHOWCASE.map((item) => (
          <ShowcaseFrame key={item.eyebrow} item={item} />
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-[560px] text-center [font-family:'Montserrat',sans-serif] text-lg font-black italic tracking-[-.01em]">
        Menos tiempo calculando. <span className="text-[var(--accent)]">Más tiempo liderando.</span>
      </p>
    </section>
  );
}
