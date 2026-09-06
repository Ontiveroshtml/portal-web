const APP_URL = import.meta.env.VITE_APP_URL as string;

export function CTAFinal() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--surface)]/60 [background-image:radial-gradient(rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:6px_6px]">
      <div className="mx-auto flex w-[min(900px,calc(100%-40px))] flex-col items-center gap-5 py-[80px] text-center">
        <h2 className="[font-family:'Montserrat',sans-serif] text-[clamp(24px,4vw,36px)] font-black italic leading-[1.15] tracking-[-.02em]">
          Tu clan ya genera los datos.
          <br />
          <span className="text-[var(--accent)]">Dejá que Guild Core los ordene y los verifique.</span>
        </h2>
        <p className="max-w-[480px] text-sm text-[var(--muted)]">
          Dejá de leer capturas a ojo y de armar rankings a mano.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
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
      </div>
    </section>
  );
}
