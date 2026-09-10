const APP_URL = import.meta.env.VITE_APP_URL as string;

// Lo que ya funciona hoy en la app web.
const DASHBOARD_PREVIEW = [
  "Hacienda y cortes",
  "Cashback y repartos",
  "Lectura automática de capturas",
  "WarRoom",
  "Links públicos de ranking y hacienda",
  "Dashboard administrativo",
  "Historial del clan",
];

// Lo que todavía no está. Se muestra aparte para no mezclarlo con lo anterior.
const PROXIMAMENTE = ["Integración con Discord", "Inteligencia del Valle", "Clan Pool"];

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
            Tesorería, repartos, rankings y reportes de evento de tu clan, sin planillas ni cálculos
            manuales.
          </p>

          <p className="max-w-[540px] text-sm leading-relaxed text-[var(--muted)]">
            Subís las capturas de pantalla del juego y Guild Core lee los números solos: nombre, poder,
            puntos, kills y bajas. Después los revisás en pantalla, corregís lo que haga falta y recién
            ahí se guardan. Las horas que hoy se te van en planillas y cuentas vuelven a donde tienen que
            estar: jugando y haciendo crecer tu cuenta.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={`${APP_URL}/login`}
              className="rounded-full bg-[var(--accent)] px-6 py-3 [font-family:'Montserrat',sans-serif] text-sm font-black italic uppercase tracking-[.04em] text-[#17201e] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_34px_-6px_rgba(214,250,56,.5)]"
            >
              Empezar gratis
            </a>
            <a
              href="#showcase"
              className="rounded-full border border-[var(--line)] px-6 py-3 [font-family:'Montserrat',sans-serif] text-sm font-black italic uppercase tracking-[.04em] text-[var(--text)] transition duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Ver por dentro
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

          <p className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--muted)]">
            <span className="[font-family:'JetBrains_Mono',monospace] font-semibold uppercase tracking-[.14em] text-[var(--accent-gold)]">
              Próximamente
            </span>
            {PROXIMAMENTE.join(" · ")}
          </p>
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

      <div className="relative mx-auto w-[min(1200px,calc(100%-40px))] pb-[70px] text-center">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -z-10 h-[220px] w-[min(900px,90%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/16 blur-[110px]"
        />
        <span
          aria-hidden="true"
          className="mx-auto mb-4 block h-[3px] w-[120px] opacity-80 [background:repeating-linear-gradient(90deg,var(--accent)_0_10px,transparent_10px_20px)]"
        />
        <p className="mx-auto max-w-[900px] [font-family:'Montserrat',sans-serif] text-[clamp(28px,5.5vw,56px)] font-black italic uppercase leading-[1.05] tracking-[-.02em] text-[var(--text)]">
          Menos horas administrando.
          <br />
          <span className="text-[var(--accent)] drop-shadow-[0_0_38px_rgba(214,250,56,.55)]">
            Más horas jugando.
          </span>
        </p>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-[3px] w-[120px] opacity-80 [background:repeating-linear-gradient(90deg,var(--accent)_0_10px,transparent_10px_20px)]"
        />
      </div>
    </section>
  );
}
