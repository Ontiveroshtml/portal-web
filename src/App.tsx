import { useEffect, useMemo, useState } from "react";
import { CheckoutModal } from "./components/CheckoutModal";
import { listPublicPlans, type Plan, type PlanPrice } from "./lib/api";

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

const CYCLES = [
  { months: 1, label: "Mensual" },
  { months: 3, label: "3 meses" },
  { months: 6, label: "6 meses" },
  { months: 12, label: "12 meses" },
];

function formatMoney(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function priceForCycle(plan: Plan, months: number): PlanPrice | undefined {
  return plan.prices.find((price) => price.commitment_months === months);
}

export default function App() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState<string | null>(null);
  const [cycleMonths, setCycleMonths] = useState(12);
  const [checkout, setCheckout] = useState<{ plan: Plan; price: PlanPrice } | null>(null);
  const [checkoutResult] = useState<"success" | "cancel" | null>(() => {
    const result = new URLSearchParams(window.location.search).get("checkout");
    return result === "success" || result === "cancel" ? result : null;
  });

  useEffect(() => {
    listPublicPlans()
      .then(setPlans)
      .catch(() => setPlansError("No se pudieron cargar los planes."))
      .finally(() => setPlansLoading(false));
  }, []);

  useEffect(() => {
    if (checkoutResult) window.history.replaceState(null, "", window.location.pathname);
  }, [checkoutResult]);

  // Only plans with billing-cycle prices attached belong on the pricing page
  // — that's exactly the subscription catalog, as opposed to any legacy/free
  // plan rows that don't have a Stripe checkout flow behind them.
  const subscriptionPlans = useMemo(() => plans.filter((plan) => plan.prices.length > 0), [plans]);

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

      {checkoutResult && (
        <div
          className={`mx-auto mt-2 w-[min(1100px,calc(100%-48px))] rounded-[8px] border p-4 text-sm ${
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
            Ver planes
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
          <div className="mb-8 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--muted)]">
              Planes
            </span>
            <h2 className="mt-2 font-serif text-2xl font-normal tracking-[-.03em]">
              Elige el plan de tu alianza
            </h2>
            <p className="mx-auto mt-2 max-w-[520px] text-[13px] text-[var(--muted)]">
              Demo con Stripe en modo de prueba — usa la tarjeta 4242 4242 4242 4242, cualquier fecha
              futura y cualquier CVC. No se realiza ningún cobro real, pero sí recibirás un correo real
              para activar tu cuenta.
            </p>
          </div>

          {plansLoading ? (
            <p className="text-center text-sm text-[var(--muted)]">Cargando planes…</p>
          ) : plansError ? (
            <p className="text-center text-sm text-[var(--danger)]">{plansError}</p>
          ) : (
            <>
              <div className="mb-8 flex justify-center gap-2">
                {CYCLES.map((cycle) => (
                  <button
                    key={cycle.months}
                    type="button"
                    onClick={() => setCycleMonths(cycle.months)}
                    className={`rounded-[6px] px-4 py-2 text-xs font-bold uppercase tracking-[.08em] transition ${
                      cycleMonths === cycle.months
                        ? "bg-[var(--accent)] text-[#111]"
                        : "border border-[var(--line)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    }`}
                  >
                    {cycle.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {subscriptionPlans.map((plan) => {
                  const selectedPrice = priceForCycle(plan, cycleMonths);
                  const basePrice = priceForCycle(plan, 1);
                  const discount =
                    selectedPrice && basePrice && basePrice.monthly_price_cents > 0
                      ? Math.round(
                          (1 - selectedPrice.monthly_price_cents / basePrice.monthly_price_cents) * 100,
                        )
                      : 0;
                  const highlighted = plan.tier === "intelligence";

                  return (
                    <div
                      key={plan.id}
                      className={`flex flex-col gap-4 rounded-[10px] border p-7 ${
                        highlighted
                          ? "border-[var(--accent)] bg-[var(--accent)]/6"
                          : "border-[var(--line)] bg-[var(--surface)]/70"
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[.15em] text-[var(--muted)]">
                          {plan.player_min}–{plan.player_max} jugadores
                        </span>
                        <h3 className="mt-1 font-serif text-xl font-normal">{plan.name}</h3>
                        {selectedPrice && (
                          <p className="mt-2 flex items-baseline gap-2 font-serif text-3xl font-normal tracking-[-.03em]">
                            {formatMoney(selectedPrice.monthly_price_cents)}
                            <span className="text-sm text-[var(--muted)]">/mes</span>
                            {basePrice && discount > 0 && (
                              <>
                                <span className="text-sm text-[var(--muted)] line-through">
                                  {formatMoney(basePrice.monthly_price_cents)}
                                </span>
                                <span className="text-xs font-bold text-[var(--accent)]">-{discount}%</span>
                              </>
                            )}
                          </p>
                        )}
                        {cycleMonths > 1 && (
                          <p className="mt-1 text-[11px] text-[var(--muted)]">
                            Compromiso de {cycleMonths} meses, facturado mes a mes
                          </p>
                        )}
                      </div>
                      <ul className="flex flex-1 flex-col gap-2 text-[13px] text-[var(--muted)]">
                        {(plan.features ?? []).map((feature) => (
                          <li key={feature} className="flex gap-2">
                            <span className="text-[var(--accent)]" aria-hidden="true">
                              ✓
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        disabled={!selectedPrice}
                        onClick={() => selectedPrice && setCheckout({ plan, price: selectedPrice })}
                        className={`rounded-[6px] px-4 py-2.5 text-sm font-bold transition disabled:opacity-50 ${
                          highlighted
                            ? "bg-[var(--accent)] text-[#111] hover:brightness-95"
                            : "border border-[var(--line)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        }`}
                      >
                        Elegir plan
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </main>

      <footer className="border-t border-[var(--line)] py-8 text-center text-xs text-[var(--muted)]">
        Guild Core — demo del portal público.{" "}
        <a href={`${APP_URL}/login`} className="text-[var(--accent)]">
          ¿Ya tienes cuenta? Inicia sesión
        </a>
      </footer>

      {checkout && (
        <CheckoutModal plan={checkout.plan} price={checkout.price} onClose={() => setCheckout(null)} />
      )}
    </div>
  );
}
