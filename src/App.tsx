import { useEffect, useState } from "react";
import { CheckoutModal } from "./components/CheckoutModal";
import { listPublicPlans, type Plan } from "./lib/api";

const APP_URL = import.meta.env.VITE_APP_URL as string;

const FEATURES = [
  {
    icon: "◈",
    title: "Hacienda automática",
    description:
      "Sube capturas del chat del clan y el OCR detecta cada donación de oro por ti — sin captura manual.",
  },
  {
    icon: "⚔",
    title: "War Room",
    description: "Registra poder, kills y bajas por evento y sigue el rendimiento de cada jugador.",
  },
  {
    icon: "♛",
    title: "Rankings",
    description: "Clasificación automática por puntos, con historial de cada corte cerrado.",
  },
  {
    icon: "◎",
    title: "Roster del clan",
    description: "Gestiona jugadores, invitaciones y roles sin depender de hojas de cálculo.",
  },
  {
    icon: "🌐",
    title: "OCR multi-idioma",
    description: "Reconoce donaciones en español, inglés, ruso, japonés y más — un solo flujo para todos.",
  },
  {
    icon: "⚙",
    title: "Reparto configurable",
    description: "Cashback, reserva de tesorería y reparto por rendimiento o en partes iguales, a tu medida.",
  },
];

function formatPrice(price: string): string {
  const value = Number(price);
  return value === 0 ? "Gratis" : `$${value.toFixed(2)}`;
}

export default function App() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState<string | null>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<Plan | null>(null);

  useEffect(() => {
    listPublicPlans()
      .then(setPlans)
      .catch(() => setPlansError("No se pudieron cargar los planes."))
      .finally(() => setPlansLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_14%_4%,rgba(213,240,79,.08),transparent_27rem),radial-gradient(circle_at_95%_70%,rgba(239,170,98,.06),transparent_24rem),var(--bg)]">
      <header className="mx-auto flex w-[min(1100px,calc(100%-48px))] items-center justify-between py-6">
        <div className="flex items-center gap-2.5">
          <span className="-rotate-[25deg] text-xl leading-none text-[var(--accent)]" aria-hidden="true">
            ◒
          </span>
          <span className="font-serif text-lg font-normal tracking-[-.03em]">Guild Core</span>
        </div>
        <a
          href={`${APP_URL}/login`}
          className="rounded-[6px] border border-[var(--line)] px-4 py-2 text-xs font-bold uppercase tracking-[.1em] text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Iniciar sesión
        </a>
      </header>

      <main className="mx-auto w-[min(1100px,calc(100%-48px))]">
        <section className="flex flex-col items-center gap-5 py-[70px] text-center">
          <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--muted)]">
            Para alianzas de Fate War
          </span>
          <h1 className="max-w-[720px] font-serif text-[clamp(32px,6vw,54px)] font-normal leading-[1.08] tracking-[-.03em]">
            Administra tu alianza sin hojas de cálculo
          </h1>
          <p className="max-w-[520px] text-[15px] text-[var(--muted)]">
            Hacienda, War Room y Rankings en un solo lugar. Sube una captura y deja que el sistema haga el
            resto.
          </p>
          <a
            href="#planes"
            className="mt-2 rounded-[7px] bg-[var(--accent)] px-6 py-3 text-sm font-bold text-[#111] transition hover:brightness-95"
          >
            Empezar gratis
          </a>
        </section>

        <section className="py-[50px]">
          <div className="mb-10 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--muted)]">
              Herramientas
            </span>
            <h2 className="mt-2 font-serif text-2xl font-normal tracking-[-.03em]">Todo lo que necesitas</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[8px] border border-[var(--line)] bg-[var(--surface)]/70 p-6"
              >
                <div className="mb-3 text-xl text-[var(--accent)]" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3 className="mb-1.5 font-serif text-base font-normal">{feature.title}</h3>
                <p className="text-[13px] leading-relaxed text-[var(--muted)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="planes" className="py-[50px]">
          <div className="mb-10 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--muted)]">
              Planes
            </span>
            <h2 className="mt-2 font-serif text-2xl font-normal tracking-[-.03em]">
              Elige el plan de tu alianza
            </h2>
            <p className="mx-auto mt-2 max-w-[480px] text-[13px] text-[var(--muted)]">
              Demo: la compra es simulada, no se realiza ningún cobro real. Sí recibirás un correo real
              para activar tu cuenta.
            </p>
          </div>

          {plansLoading ? (
            <p className="text-center text-sm text-[var(--muted)]">Cargando planes…</p>
          ) : plansError ? (
            <p className="text-center text-sm text-[var(--danger)]">{plansError}</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {plans.map((plan, index) => (
                <div
                  key={plan.id}
                  className={`flex flex-col gap-4 rounded-[10px] border p-7 ${
                    index === 1
                      ? "border-[var(--accent)] bg-[var(--accent)]/6"
                      : "border-[var(--line)] bg-[var(--surface)]/70"
                  }`}
                >
                  <div>
                    <h3 className="font-serif text-xl font-normal">{plan.name}</h3>
                    <p className="mt-2 font-serif text-3xl font-normal tracking-[-.03em]">
                      {formatPrice(plan.price)}
                      {Number(plan.price) > 0 && <span className="text-sm text-[var(--muted)]"> /mes</span>}
                    </p>
                  </div>
                  <ul className="flex flex-1 flex-col gap-2 text-[13px] text-[var(--muted)]">
                    <li>Hasta {plan.max_members} miembros</li>
                    <li>{plan.max_requests_per_day} análisis de OCR al día</li>
                    <li>Hacienda, War Room y Rankings incluidos</li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => setCheckoutPlan(plan)}
                    className={`rounded-[6px] px-4 py-2.5 text-sm font-bold transition ${
                      index === 1
                        ? "bg-[var(--accent)] text-[#111] hover:brightness-95"
                        : "border border-[var(--line)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    }`}
                  >
                    Elegir plan
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-[var(--line)] py-8 text-center text-xs text-[var(--muted)]">
        Guild Core — demo del portal público.{" "}
        <a href={`${APP_URL}/login`} className="text-[var(--accent)]">
          ¿Ya tienes cuenta? Inicia sesión
        </a>
      </footer>

      {checkoutPlan && (
        <CheckoutModal plan={checkoutPlan} onClose={() => setCheckoutPlan(null)} />
      )}
    </div>
  );
}
