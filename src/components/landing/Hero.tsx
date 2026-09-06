const APP_URL = import.meta.env.VITE_APP_URL as string;

const DASHBOARD_PREVIEW = [
  "Hacienda / Tesorería",
  "Sistema de rangos R1–R5",
  "WarRoom",
  "Estadísticas",
  "Progreso del clan",
  "Integración con Discord",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden [background-image:radial-gradient(rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:6px_6px]"
    >
      <div className="mx-auto grid w-[min(1200px,calc(100%-40px))] grid-cols-1 items-center gap-10 py-[70px] lg:grid-cols-[1.1fr_.9fr] lg:py-[100px]">
        <div className="flex flex-col items-start gap-6 text-left">
          <span className="[font-family:'JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[.2em] text-[var(--muted)]">
            Para clanes de FateWar
          </span>

          <h1 className="max-w-[620px] [font-family:'Montserrat',sans-serif] text-[clamp(30px,5vw,48px)] font-black italic leading-[1.08] tracking-[-.02em]">
            Tu clan genera los datos. <span className="text-[var(--accent)]">Guild Core</span> los convierte
            en decisiones.
          </h1>

          <p className="max-w-[540px] text-base font-semibold text-[var(--text)]">
            Tesorería, rangos, rankings y reportes militares de tu clan, sin planillas ni cálculos
            manuales — validados automáticamente, no a mano.
          </p>

          <p className="max-w-[540px] text-sm leading-relaxed text-[var(--muted)]">
            Guild Core centraliza la información de tu clan, verifica cada dato de evento con OCR antes
            de guardarlo, organiza rangos y donaciones, y transforma tus capturas de pantalla en reportes
            listos para usar — todo desde una app web conectada con Discord.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={`${APP_URL}/login`}
              className="rounded-full bg-[var(--accent)] px-6 py-3 [font-family:'Montserrat',sans-serif] text-sm font-black italic uppercase tracking-[.04em] text-[#17201e] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_34px_-6px_rgba(214,250,56,.5)]"
            >
              Probar demo gratis
            </a>
            <a
              href="#planes"
              className="rounded-full border border-[var(--line)] px-6 py-3 [font-family:'Montserrat',sans-serif] text-sm font-black italic uppercase tracking-[.04em] text-[var(--text)] transition duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Ver planes
            </a>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {DASHBOARD_PREVIEW.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--line)] bg-[var(--surface)]/70 px-3 py-1.5 text-[11px] text-[var(--muted)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[420px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-[var(--accent)]/12 blur-[90px]"
          />
          <img
            src="/hero/hero-character-main.png"
            srcSet="/hero/hero-character-main.png 1x, /hero/hero-character-main@2x.png 2x"
            alt="Personaje de Guild Core"
            className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,.55)]"
          />
        </div>
      </div>

      <p className="mx-auto w-[min(1200px,calc(100%-40px))] pb-[60px] text-center [font-family:'Montserrat',sans-serif] text-lg font-black italic tracking-[-.01em] text-[var(--text)]">
        Todo tu clan. Todos tus datos. <span className="text-[var(--accent)]">Un solo lugar.</span>
      </p>
    </section>
  );
}
