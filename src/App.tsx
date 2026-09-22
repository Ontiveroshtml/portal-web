import { useEffect, useState } from "react";
import { EstilosAnimacion, Reveal } from "./components/landing/animaciones";
import { AppPreview } from "./components/landing/AppPreview";
import { CTAFinal } from "./components/landing/CTAFinal";
import { CTAMovil } from "./components/landing/CTAMovil";
import { DemoDestacada } from "./components/landing/DemoDestacada";
import { FAQ } from "./components/landing/FAQ";
import { Footer } from "./components/landing/Footer";
import { Funciones } from "./components/landing/Funciones";
import { Hero } from "./components/landing/Hero";
import { Navbar } from "./components/landing/Navbar";
import { ParaQuien } from "./components/landing/ParaQuien";
import { Planes } from "./components/landing/Planes";
import { Problema } from "./components/landing/Problema";
import { Roadmap } from "./components/landing/Roadmap";
import { useI18n } from "./i18n/useI18n";
import { captureReferralFromUrl } from "./lib/referral";

export default function App() {
  const { t } = useI18n();
  const [checkoutResult] = useState<"success" | "cancel" | null>(() => {
    const result = new URLSearchParams(window.location.search).get("checkout");
    return result === "success" || result === "cancel" ? result : null;
  });

  useEffect(() => {
    captureReferralFromUrl();
  }, []);

  useEffect(() => {
    if (checkoutResult) window.history.replaceState(null, "", window.location.pathname);
  }, [checkoutResult]);

  return (
    // pb-[76px] en mobile: deja lugar para la barra fija de CTAMovil, que si no
    // tapa el final del footer.
    <div className="min-h-screen bg-[var(--bg)] pb-[76px] lg:pb-0">
      <EstilosAnimacion />
      <Navbar />

      {checkoutResult && (
        <div
          role="status"
          className={`mx-auto mt-4 w-[min(1200px,calc(100%-40px))] rounded-[8px] border p-4 text-sm ${
            checkoutResult === "success"
              ? "border-[var(--accent)] bg-[var(--accent)]/8 text-[var(--text)]"
              : "border-[var(--line)] bg-[var(--surface)]/70 text-[var(--muted)]"
          }`}
        >
          {checkoutResult === "success" ? (
            <>
              <strong className="text-[var(--accent)]">{t("app.checkoutSuccessStrong")}</strong>{" "}
              {t("app.checkoutSuccessBody")}
            </>
          ) : (
            t("app.checkoutCancel")
          )}
        </div>
      )}

      {/* Cada sección aparece al entrar en pantalla. El Hero no va envuelto:
          está arriba de todo y se anima solo al cargar, desde su propio
          componente. */}
      <Hero />
      <Reveal><Problema /></Reveal>
      <Reveal><Funciones /></Reveal>
      <Reveal><AppPreview /></Reveal>
      <Reveal><Planes /></Reveal>
      <Reveal><ParaQuien /></Reveal>
      <Reveal><DemoDestacada /></Reveal>
      <Roadmap />
      <Reveal><FAQ /></Reveal>
      <Reveal><CTAFinal /></Reveal>
      <Footer />
      <CTAMovil />
    </div>
  );
}
