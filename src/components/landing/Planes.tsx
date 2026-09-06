import { useEffect, useMemo, useState } from "react";
import { CheckoutModal } from "../CheckoutModal";
import { listPublicPlans, type Plan, type PlanPrice } from "../../lib/api";
import { cutClass, featuredClass, SectionHeading } from "./shared";

const CYCLES = [
  { months: 1, label: "Mensual" },
  { months: 3, label: "3 meses" },
  { months: 6, label: "6 meses" },
  { months: 12, label: "12 meses" },
];

// Fallback copy only — used if a plan comes back from the API without its own
// `features` list. Real plans should carry their own list; this just keeps
// the section from looking empty if that hasn't been backfilled yet.
const FALLBACK_FEATURES: Record<string, string[]> = {
  management: [
    "Hacienda / Tesorería",
    "Sistema de rangos R1–R5",
    "Gestión de jugadores",
    "Historial",
    "Dashboard",
    "Mantenimiento",
    "Soporte",
  ],
  intelligence: [
    "Todo lo de Management",
    "Reportes militares con OCR",
    "WarRoom completo",
    "Poder, Kills & Deaths",
    "Auditoría de eventos con doble verificación",
    "Sincronización con Discord",
    "Rankings avanzados",
  ],
};

const TIER_COPY: Record<string, { title: string; hook: string }> = {
  management: {
    title: "Management",
    hook: "Tesorería, rangos y herramientas esenciales para administrar tu clan.",
  },
  intelligence: {
    title: "Intelligence",
    hook: "Todo lo que incluye Management, más herramientas avanzadas para analizar eventos y rendimiento militar con verificación automática por OCR.",
  },
};

function formatMoney(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function priceForCycle(plan: Plan, months: number): PlanPrice | undefined {
  return plan.prices.find((price) => price.commitment_months === months);
}

function TierCard({
  tier,
  brackets,
  cycleMonths,
  onChoose,
}: {
  tier: "management" | "intelligence";
  brackets: Plan[];
  cycleMonths: number;
  onChoose: (plan: Plan, price: PlanPrice) => void;
}) {
  const [selectedId, setSelectedId] = useState(brackets[0]?.id);
  const selected = brackets.find((plan) => plan.id === selectedId) ?? brackets[0];
  const selectedPrice = selected ? priceForCycle(selected, cycleMonths) : undefined;
  const basePrice = selected ? priceForCycle(selected, 1) : undefined;
  const discount =
    selectedPrice && basePrice && basePrice.monthly_price_cents > 0
      ? Math.round((1 - selectedPrice.monthly_price_cents / basePrice.monthly_price_cents) * 100)
      : 0;
  const highlighted = tier === "intelligence";
  const copy = TIER_COPY[tier];
  const features = selected?.features?.length ? selected.features : FALLBACK_FEATURES[tier];

  return (
    <div
      className={`flex flex-col gap-5 border p-8 ${highlighted ? `${featuredClass} border-[var(--accent)] bg-[var(--accent)]/6` : `${cutClass} border-[var(--line)] bg-[var(--surface)]/80`}`}
    >
      <div>
        <span className="[font-family:'JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[.15em] text-[var(--muted)]">
          {highlighted ? "Gestión + inteligencia avanzada" : "Gestión completa del clan"}
        </span>
        <h3 className="mt-1.5 [font-family:'Montserrat',sans-serif] text-2xl font-black italic tracking-[-.01em]">
          {copy.title}
        </h3>
        <p className="mt-2 text-sm text-[var(--muted)]">{copy.hook}</p>
      </div>

      {brackets.length > 1 && (
        <div className="flex flex-col gap-1.5">
          {brackets.map((plan) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelectedId(plan.id)}
              className={`flex items-center justify-between rounded-[6px] border px-3 py-2 text-left text-[12px] transition duration-150 ${
                plan.id === selectedId
                  ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text)]"
                  : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)]"
              }`}
            >
              <span>
                {plan.player_min}–{plan.player_max} jugadores
              </span>
              <span className="[font-family:'JetBrains_Mono',monospace] tabular-nums">
                {formatMoney(priceForCycle(plan, cycleMonths)?.monthly_price_cents ?? 0)}/mes
              </span>
            </button>
          ))}
        </div>
      )}

      {selectedPrice && (
        <p className="flex items-baseline gap-2 [font-family:'JetBrains_Mono',monospace] text-3xl font-bold tabular-nums tracking-[-.02em]">
          {formatMoney(selectedPrice.monthly_price_cents)}
          <span className="text-sm font-normal text-[var(--muted)]">/mes</span>
          {basePrice && discount > 0 && (
            <>
              <span className="text-sm font-normal text-[var(--muted)] line-through">
                {formatMoney(basePrice.monthly_price_cents)}
              </span>
              <span className="text-xs font-bold text-[var(--accent)]">-{discount}%</span>
            </>
          )}
        </p>
      )}
      {cycleMonths > 1 && (
        <p className="-mt-3 text-[11px] text-[var(--muted)]">
          Compromiso de {cycleMonths} meses, facturado mes a mes
        </p>
      )}

      <ul className="flex flex-1 flex-col gap-2 text-[13px] text-[var(--muted)]">
        {(features ?? []).map((feature) => (
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
        disabled={!selected || !selectedPrice}
        onClick={() => selected && selectedPrice && onChoose(selected, selectedPrice)}
        className={`rounded-full px-4 py-3 [font-family:'Montserrat',sans-serif] text-sm font-extrabold italic uppercase tracking-[.04em] transition duration-200 disabled:cursor-not-allowed disabled:opacity-55 ${
          highlighted
            ? "bg-[var(--accent)] text-[#17201e] hover:-translate-y-0.5 hover:shadow-[0_0_28px_-6px_rgba(214,250,56,.5)]"
            : "border border-[var(--line)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        }`}
      >
        Elegir {copy.title}
      </button>
    </div>
  );
}

export function Planes() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState<string | null>(null);
  const [cycleMonths, setCycleMonths] = useState(12);
  const [checkout, setCheckout] = useState<{ plan: Plan; price: PlanPrice } | null>(null);

  useEffect(() => {
    listPublicPlans()
      .then(setPlans)
      .catch(() => setPlansError("No se pudieron cargar los planes."))
      .finally(() => setPlansLoading(false));
  }, []);

  // Only plans with billing-cycle prices attached belong here — that's the
  // real Stripe-backed subscription catalog, not any legacy/free plan row.
  const subscriptionPlans = useMemo(() => plans.filter((plan) => plan.prices.length > 0), [plans]);
  const managementPlans = useMemo(
    () => subscriptionPlans.filter((plan) => plan.tier === "management"),
    [subscriptionPlans],
  );
  const intelligencePlans = useMemo(
    () => subscriptionPlans.filter((plan) => plan.tier === "intelligence"),
    [subscriptionPlans],
  );

  return (
    <section id="planes" className="mx-auto w-[min(1200px,calc(100%-40px))] py-[70px]">
      <SectionHeading eyebrow="Planes" title="Elegí el nivel de gestión que necesita tu clan." />

      {plansLoading ? (
        <p className="mt-10 text-center text-sm text-[var(--muted)]">Cargando planes…</p>
      ) : plansError ? (
        <p className="mt-10 text-center text-sm text-[var(--danger)]">{plansError}</p>
      ) : (
        <>
          <div className="mt-10 flex justify-center gap-2">
            {CYCLES.map((cycle) => (
              <button
                key={cycle.months}
                type="button"
                onClick={() => setCycleMonths(cycle.months)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[.08em] transition duration-150 ${
                  cycleMonths === cycle.months
                    ? "bg-[var(--accent)] text-[#17201e]"
                    : "border border-[var(--line)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }`}
              >
                {cycle.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {managementPlans.length > 0 && (
              <TierCard
                tier="management"
                brackets={managementPlans}
                cycleMonths={cycleMonths}
                onChoose={(plan, price) => setCheckout({ plan, price })}
              />
            )}
            {intelligencePlans.length > 0 && (
              <TierCard
                tier="intelligence"
                brackets={intelligencePlans}
                cycleMonths={cycleMonths}
                onChoose={(plan, price) => setCheckout({ plan, price })}
              />
            )}
          </div>
        </>
      )}

      <div className={`${cutClass} mt-6 flex flex-col items-start gap-3 border border-[var(--accent-purple)]/40 bg-[var(--accent-purple)]/6 p-7 sm:flex-row sm:items-center sm:justify-between`}>
        <div>
          <span className="[font-family:'JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[.15em] text-[var(--accent-purple)]">
            Clan Pool
          </span>
          <p className="mt-1.5 [font-family:'Montserrat',sans-serif] text-lg font-black italic tracking-[-.01em]">
            Próximamente: varios miembros van a poder contribuir a una misma suscripción.
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">Un clan. Una suscripción. Varios contribuyentes.</p>
        </div>
        <a
          href="#roadmap"
          className="shrink-0 rounded-full border border-[var(--accent-purple)] px-5 py-2.5 [font-family:'Montserrat',sans-serif] text-xs font-extrabold italic uppercase tracking-[.04em] text-[var(--accent-purple)] transition duration-150 hover:bg-[var(--accent-purple)]/10"
        >
          Saber más
        </a>
      </div>

      <p className="mx-auto mt-8 max-w-[560px] text-center text-[12px] text-[var(--muted)]">
        Demo con Stripe en modo de prueba — usá la tarjeta 4242 4242 4242 4242, cualquier fecha futura y
        cualquier CVC. No se realiza ningún cobro real, pero sí recibirás un correo real para activar tu
        cuenta.
      </p>

      {checkout && (
        <CheckoutModal plan={checkout.plan} price={checkout.price} onClose={() => setCheckout(null)} />
      )}
    </section>
  );
}
