const APP_URL = import.meta.env.VITE_APP_URL as string;

// Bloque de la demo. El botón principal está deliberadamente deshabilitado:
// la demo todavía no existe, así que no lo hacemos parecer funcional. Cuando
// esté lista, alcanza con poner DEMO_LISTA en true y completar DEMO_URL.
const DEMO_LISTA: boolean = false;
const DEMO_URL: string = "";

const INCLUYE = [
  "Hacienda, Roster, WarRoom y Ranking navegables de verdad, no una maqueta",
  "Cargás vos los datos — tus jugadores, una captura, un corte de prueba",
  "Con algunos límites de uso, pero sin tocar tu clan real",
];

export function DemoDestacada() {
  return (
    <section
      id="demo"
      className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--surface)]/50 [background-image:radial-gradient(rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:6px_6px]"
    >
      <div className="mx-auto grid w-[min(1200px,calc(100%-40px))] grid-cols-1 items-center gap-10 py-[80px] lg:grid-cols-[1.15fr_.85fr]">
        <div className="flex flex-col items-start gap-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/45 bg-[var(--accent)]/8 px-3.5 py-1.5 [font-family:'JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[.18em] text-[var(--accent)]">
            <span className="size-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            Demo · Próximamente
          </span>

          <h2 className="max-w-[560px] [font-family:'Montserrat',sans-serif] text-[clamp(24px,4vw,36px)] font-black italic leading-[1.12] tracking-[-.02em]">
            Vas a poder entrar y probarlo vos mismo,{" "}
            <span className="text-[var(--accent)]">antes de mover un solo dato de tu clan.</span>
          </h2>

          <p className="max-w-[520px] text-sm leading-relaxed text-[var(--muted)]">
            Estamos preparando un modo demo con acceso limitado: entrás, cargás tus propios datos —
            jugadores, una captura, un corte de prueba— y ves cómo responde cada pantalla en tiempo real.
            Nada armado de antemano: lo probás con lo tuyo y decidís vos.
          </p>

          <ul className="flex flex-col gap-2.5">
            {INCLUYE.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13px] text-[var(--text)]">
                <span className="mt-0.5 text-[var(--accent)]" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            {DEMO_LISTA ? (
              <a
                href={DEMO_URL}
                className="rounded-full bg-[var(--accent)] px-6 py-3 [font-family:'Montserrat',sans-serif] text-sm font-black italic uppercase tracking-[.04em] text-[#17201e] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_34px_-6px_rgba(214,250,56,.5)]"
              >
                Entrar a la demo
              </a>
            ) : (
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="La demo todavía no está disponible"
                className="cursor-not-allowed rounded-full bg-[var(--accent)] px-6 py-3 [font-family:'Montserrat',sans-serif] text-sm font-black italic uppercase tracking-[.04em] text-[#17201e] opacity-55"
              >
                Entrar a la demo
              </button>
            )}

            {!DEMO_LISTA && (
              <span className="[font-family:'JetBrains_Mono',monospace] text-[11px] uppercase tracking-[.12em] text-[var(--muted)]">
                Disponible pronto
              </span>
            )}
          </div>

          <p className="text-[13px] text-[var(--muted)]">
            Mientras tanto,{" "}
            <a
              href={`${APP_URL}/login`}
              className="text-[var(--accent)] underline underline-offset-4 transition duration-150 hover:text-[var(--text)]"
            >
              entrá con tu cuenta
            </a>{" "}
            o mirá{" "}
            <a
              href="#showcase"
              className="text-[var(--accent)] underline underline-offset-4 transition duration-150 hover:text-[var(--text)]"
            >
              cómo se ve por dentro
            </a>
            .
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[340px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-[var(--accent)]/12 blur-[80px]"
          />
          <img
            src="/characters/character-pointing-up.png"
            srcSet="/characters/character-pointing-up.png 1x, /characters/character-pointing-up@2x.png 2x"
            alt=""
            aria-hidden="true"
            className="w-full drop-shadow-[0_24px_50px_rgba(0,0,0,.5)]"
          />
        </div>
      </div>
    </section>
  );
}
