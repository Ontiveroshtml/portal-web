import { useEffect, useState } from "react";
import { CTAFinal } from "./components/landing/CTAFinal";
import { FAQ } from "./components/landing/FAQ";
import { Footer } from "./components/landing/Footer";
import { Funciones } from "./components/landing/Funciones";
import { Hero } from "./components/landing/Hero";
import { Navbar } from "./components/landing/Navbar";
import { ParaQuien } from "./components/landing/ParaQuien";
import { Planes } from "./components/landing/Planes";
import { Problema } from "./components/landing/Problema";
import { Roadmap } from "./components/landing/Roadmap";
import { Showcase } from "./components/landing/Showcase";

export default function App() {
  const [checkoutResult] = useState<"success" | "cancel" | null>(() => {
    const result = new URLSearchParams(window.location.search).get("checkout");
    return result === "success" || result === "cancel" ? result : null;
  });

  useEffect(() => {
    if (checkoutResult) window.history.replaceState(null, "", window.location.pathname);
  }, [checkoutResult]);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      {checkoutResult && (
        <div
          className={`mx-auto mt-4 w-[min(1200px,calc(100%-40px))] rounded-[8px] border p-4 text-sm ${
            checkoutResult === "success"
              ? "border-[var(--accent)] bg-[var(--accent)]/8 text-[var(--text)]"
              : "border-[var(--line)] bg-[var(--surface)]/70 text-[var(--muted)]"
          }`}
        >
          {checkoutResult === "success" ? (
            <>
              <strong className="text-[var(--accent)]">¡Pago de prueba confirmado!</strong> Revisa tu
              correo — te enviamos un enlace real para activar tu cuenta.
            </>
          ) : (
            "El pago se canceló. Puedes intentarlo de nuevo cuando quieras."
          )}
        </div>
      )}

      <Hero />
      <Problema />
      <Funciones />
      <Showcase />
      <ParaQuien />
      <Planes />
      <Roadmap />
      <FAQ />
      <CTAFinal />
      <Footer />
    </div>
  );
}
