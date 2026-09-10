import { useEffect, useMemo, useState } from "react";
import { CheckoutModal } from "../CheckoutModal";
import { listPublicPlans, type Plan, type PlanPrice } from "../../lib/api";

// Solo el VISUAL viene del mockup `guildcoreplanes.html`: corte de 16px en las
// tarjetas, una tarjeta por tramo de jugadores, cabeceras de familia con línea
// punteada y capa decorativa de VFX detrás de la grilla. Los textos y los datos
// son los que ya tenía esta sección.

const CUT_16 =
  "[clip-path:polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)]";

const CYCLES = [
  { months: 1, label: "Mensual" },
  { months: 3, label: "3 meses" },
  { months: 6, label: "6 meses" },
  { months: 12, label: "12 meses", badge: "Mejor valor" },
];

// La nota de Stripe en modo de prueba solo tiene sentido mientras la demo de
// pago esté abierta. Ponelo en false antes de abrir a público real.
const MOSTRAR_NOTA_STRIPE = true;

// Plan con corona destacada. null = ninguno lleva corona.
// Para activarla: { tier: "intelligence", playerMin: 1 }.
const DESTACADO: { tier: "management" | "intelligence"; playerMin: number } | null = null;

// Copia de respaldo, solo si un plan vuelve del API sin su propia lista.
const FALLBACK_FEATURES: Record<string, string[]> = {
  management: [
    "Hacienda, donaciones y cortes",
    "Cashback con tus propias reglas",
    "Reparto equitativo del sobrante",
    "Roster del clan",
    "Historial de cada corte",
    "Dashboard",
    "Soporte",
  ],
  intelligence: [
    "Todo lo de Management",
    "WarRoom completo (16 columnas)",
    "Lectura automática de capturas de evento",
    "Revisión y corrección a mano de cada dato",
    "Poder, puntos, kills y bajas",
    "Reparto por rendimiento",
    "Rankings y links públicos",
  ],
};

const TIER_COPY = {
  management: {
    title: "Management",
    hook: "Tesorería, donaciones y cortes: lo esencial para administrar el día a día del clan.",
  },
  intelligence: {
    title: "Intelligence",
    hook: "Todo lo de Management, más los eventos: las capturas se leen solas, las revisas en pantalla y con eso salen el WarRoom, los rankings y el reparto por rendimiento.",
  },
} as const;

const TIER_STYLE = {
  management: {
    icon: "/icons/svg/icon-coins.svg",
    text: "text-[var(--accent)]",
    border: "border-[var(--accent)]/35",
    dot: "border-[var(--accent)] bg-[var(--accent)]/16",
    chip: "bg-[var(--accent)]/14 text-[var(--accent)]",
    cta: "border-2 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10",
  },
  intelligence: {
    icon: "/icons/svg/icon-chart.svg",
    text: "text-[var(--accent-purple)]",
    border: "border-[var(--accent-purple)]/35",
    dot: "border-[var(--accent-purple)] bg-[var(--accent-purple)]/18",
    chip: "bg-[var(--accent-purple)]/16 text-[var(--accent-purple)]",
    cta: "border-2 border-[var(--accent-purple)] text-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/10",
  },
} as const;

type Tier = keyof typeof TIER_STYLE;

function formatMoney(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function priceForCycle(plan: Plan, months: number): PlanPrice | undefined {
  return plan.prices.find((price) => price.commitment_months === months);
}

function PlanCard({
  plan,
  cycleMonths,
  onChoose,
}: {
  plan: Plan;
  cycleMonths: number;
  onChoose: (plan: Plan, price: PlanPrice) => void;
}) {
  const tier: Tier = plan.tier === "intelligence" ? "intelligence" : "management";
  const style = TIER_STYLE[tier];
  const copy = TIER_COPY[tier];
  const price = priceForCycle(plan, cycleMonths);
  const basePrice = priceForCycle(plan, 1);
  const discount =
    price && basePrice && basePrice.monthly_price_cents > 0
      ? Math.round((1 - price.monthly_price_cents / basePrice.monthly_price_cents) * 100)
      : 0;
  const features = plan.features?.length ? plan.features : FALLBACK_FEATURES[tier];
  const destacado =
    DESTACADO !== null && DESTACADO.tier === tier && DESTACADO.playerMin === plan.player_min;

  return (
    <div className="relative h-full">
      {destacado && (
        <img
          src="/ranking/ranking-crown.svg"
          alt=""
          aria-hidden="true"
          // Fuera de la tarjeta recortada: adentro, el clip-path le cortaría las puntas.
          className="absolute -top-6 left-1/2 z-10 w-12 -translate-x-1/2 [filter:drop-shadow(0_6px_10px_rgba(0,0,0,.6))_drop-shadow(0_0_10px_rgba(214,250,56,.55))]"
        />
      )}

      <article
        className={`${CUT_16} relative flex h-full flex-col border bg-[var(--surface)] px-6 pb-6 pt-7 ${
          destacado
            ? "border-2 border-[var(--accent)] shadow-[0_0_34px_-8px_rgba(214,250,56,.5)]"
            : style.border
        }`}
      >
        {/* En una sola columna no hay cabecera de familia arriba, así que la
            tarjeta la lleva adentro. */}
        <div className="mb-3 lg:hidden">
          <span
            className={`[font-family:'JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[.14em] ${style.text}`}
          >
            {copy.title}
          </span>
          <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{copy.hook}</p>
        </div>

        <div className="mb-[18px] [font-family:'Montserrat',sans-serif] text-xl font-extrabold italic uppercase leading-[1.15] tracking-[-.01em]">
          {plan.player_min}–{plan.player_max}
          <span className="block text-[13px] font-semibold not-italic tracking-[.04em] text-[var(--muted)]">
            jugadores
          </span>
        </div>

        <div className="mb-1.5 flex min-h-[52px] flex-wrap items-baseline gap-2">
          <span className="whitespace-nowrap [font-family:'JetBrains_Mono',monospace] text-[clamp(26px,2.6vw,36px)] font-bold leading-none tracking-[-.01em]">
            {price ? formatMoney(price.monthly_price_cents) : "—"}
            <small className="text-sm font-medium text-[var(--muted)]">/mes</small>
          </span>
          {basePrice && discount > 0 && (
            <span className="whitespace-nowrap [font-family:'JetBrains_Mono',monospace] text-sm font-semibold text-[var(--muted)] line-through">
              {formatMoney(basePrice.monthly_price_cents)}
            </span>
          )}
          {discount > 0 && (
            <span
              className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1.5 [font-family:'Montserrat',sans-serif] text-[10px] font-extrabold italic uppercase tracking-[.05em] ${style.chip}`}
            >
              <img
                src="/vfx/vfx-lightning-yellow-02.png"
                alt=""
                aria-hidden="true"
                className="size-2.5"
              />
              -{discount}%
            </span>
          )}
        </div>

        {cycleMonths > 1 && (
          <p className="mb-[22px] text-[11px] text-[var(--muted)]">
            Compromiso de {cycleMonths} meses, facturado mes a mes
          </p>
        )}

        <ul className="mb-6 flex flex-1 flex-col gap-3">
          {(features ?? []).map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-[13.5px] text-[var(--muted)]">
              <span
                className={`mt-0.5 size-3.5 shrink-0 rounded-[3px] border-[1.5px] ${style.dot}`}
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>

        <button
          type="button"
          disabled={!price}
          onClick={() => price && onChoose(plan, price)}
          className={`gc-boton w-full cursor-pointer rounded-full px-5 py-3.5 [font-family:'Montserrat',sans-serif] text-[12.5px] font-extrabold italic uppercase tracking-[.04em] transition duration-150 active:scale-[.97] disabled:cursor-not-allowed disabled:opacity-55 ${
            destacado
              ? "bg-[var(--accent)] text-[#1c2200] hover:brightness-110"
              : `bg-transparent ${style.cta}`
          }`}
        >
          Elegir {copy.title}
        </button>
      </article>
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

  // Solo los planes con ciclos de precio son el catálogo real de suscripción.
  // Management primero y, dentro de cada familia, por tramo de jugadores.
  const ordered = useMemo(() => {
    const withPrices = plans.filter((plan) => plan.prices.length > 0);
    const byBracket = (a: Plan, b: Plan) => (a.player_min ?? 0) - (b.player_min ?? 0);
    return [
      ...withPrices.filter((plan) => plan.tier === "management").sort(byBracket),
      ...withPrices.filter((plan) => plan.tier === "intelligence").sort(byBracket),
    ];
  }, [plans]);

  return (
    <section id="planes" className="mx-auto w-[min(1280px,calc(100%-40px))] py-[70px]">
      <div className="mb-2 flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="size-2 bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"
        />
        <span className="[font-family:'JetBrains_Mono',monospace] text-xs font-semibold uppercase tracking-[.12em] text-[var(--muted)]">
          Planes
        </span>
      </div>
      <h2 className="[font-family:'Montserrat',sans-serif] text-[clamp(30px,4.4vw,48px)] font-black italic leading-[1.05] tracking-[-.02em]">
        Elige el nivel de gestión que necesita tu clan.
      </h2>

      {plansLoading ? (
        <p className="mt-10 text-sm text-[var(--muted)]">Cargando planes…</p>
      ) : plansError ? (
        <p className="mt-10 text-sm text-[var(--danger)]">{plansError}</p>
      ) : (
        <>
          {/* Selector de ciclo — centrado. Sin overflow ni scroll: en pantallas
              angostas los botones bajan de línea, así el badge nunca se recorta. */}
          <div className="mb-12 mt-12 flex justify-center">
            <div
              role="tablist"
              aria-label="Ciclo de facturación"
              className="flex max-w-full flex-wrap justify-center gap-1.5 rounded-[999px] border border-[var(--line)] bg-[var(--surface)] p-1.5"
            >
              {CYCLES.map((cycle) => {
                const active = cycleMonths === cycle.months;
                return (
                  <button
                    key={cycle.months}
                    type="button"
                    role="tab"
                    aria-pressed={active}
                    onClick={() => setCycleMonths(cycle.months)}
                    // Sin gc-boton a propósito: esa clase lleva overflow:hidden y acá el
                    // badge "Mejor valor" vive adentro del botón con -top-3.
                    className={`relative cursor-pointer whitespace-nowrap rounded-full px-5 py-2.5 [font-family:'Montserrat',sans-serif] text-xs font-extrabold italic uppercase tracking-[.04em] transition duration-200 active:scale-[.97] ${
                      active
                        ? "bg-[var(--accent)] text-[#1c2200] shadow-[0_0_24px_-6px_rgba(214,250,56,.65)]"
                        : "bg-transparent text-[var(--muted)] hover:text-[var(--text)]"
                    } ${cycle.badge ? "mt-2.5 sm:mt-0" : ""}`}
                  >
                    {cycle.label}
                    {cycle.badge && (
                      <span className="pointer-events-none absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-[var(--accent-gold)] px-2 py-[3px] [font-family:'Montserrat',sans-serif] text-[9px] font-black italic uppercase leading-none tracking-[.06em] text-[#3a2400] shadow-[0_0_12px_-2px_rgba(255,184,0,.7)]">
                        <img
                          src="/vfx/vfx-lightning-yellow-01.png"
                          alt=""
                          aria-hidden="true"
                          className="size-2.5"
                        />
                        {cycle.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Capa decorativa detrás de la grilla */}
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-8 -top-10 z-0 hidden size-[150px] -rotate-6 bg-[url('/decorations/decal-claw-yellow.png')] bg-contain bg-no-repeat opacity-[.16] mix-blend-screen lg:block"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-8 -right-5 z-0 hidden size-[150px] rotate-6 bg-[url('/vfx/vfx-lightning-purple.png')] bg-contain bg-no-repeat opacity-[.16] mix-blend-screen lg:block"
            />

            <div className="relative z-[1]">
              {/* Cabeceras de familia — solo en la grilla de 4 columnas */}
              <div className="mb-3.5 hidden grid-cols-4 gap-4 lg:grid">
                {(["management", "intelligence"] as const).map((tier) => (
                  <div key={tier} className="col-span-2">
                    <div
                      className={`flex items-center gap-2.5 [font-family:'Montserrat',sans-serif] text-[22px] font-black italic uppercase leading-none tracking-[-.01em] ${TIER_STYLE[tier].text}`}
                    >
                      <img
                        src={TIER_STYLE[tier].icon}
                        alt=""
                        aria-hidden="true"
                        className="w-7 shrink-0 mix-blend-screen [filter:drop-shadow(0_0_6px_currentColor)]"
                      />
                      {TIER_COPY[tier].title}
                      <span
                        aria-hidden="true"
                        className="h-0.5 flex-1 opacity-50 [background:repeating-linear-gradient(90deg,currentColor_0_8px,transparent_8px_14px)]"
                      />
                    </div>
                    <p className="mt-2 max-w-[52ch] text-[13px] leading-relaxed text-[var(--muted)]">
                      {TIER_COPY[tier].hook}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {ordered.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    cycleMonths={cycleMonths}
                    onChoose={(chosenPlan, price) => setCheckout({ plan: chosenPlan, price })}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Clan Pool */}
      <div
        className={`${CUT_16} relative mt-10 overflow-hidden border border-[var(--accent-purple)]/40 bg-[var(--accent-purple)]/6 p-7 pt-8`}
      >
        <span
          aria-hidden="true"
          className="gc-cinta-viva absolute inset-x-0 top-0 h-1.5 opacity-85 [background:repeating-linear-gradient(45deg,var(--accent)_0_10px,var(--bg)_10px_20px)]"
        />
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="[font-family:'JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[.15em] text-[var(--accent-purple)]">
              Clan Pool
            </span>
            <p className="mt-1.5 [font-family:'Montserrat',sans-serif] text-lg font-black italic tracking-[-.01em]">
              Próximamente: varios miembros van a poder contribuir a una misma suscripción.
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Un clan. Una suscripción. Varios contribuyentes.
            </p>
          </div>
          <a
            href="#roadmap"
            className="shrink-0 rounded-full border border-[var(--accent-purple)] px-5 py-2.5 [font-family:'Montserrat',sans-serif] text-xs font-extrabold italic uppercase tracking-[.04em] text-[var(--accent-purple)] transition duration-150 hover:bg-[var(--accent-purple)]/10"
          >
            Saber más
          </a>
        </div>
      </div>

      {MOSTRAR_NOTA_STRIPE && (
      <p className="mx-auto mt-8 max-w-[560px] text-center text-[12px] text-[var(--muted)]">
        Demo con Stripe en modo de prueba — usa la tarjeta 4242 4242 4242 4242, cualquier fecha futura y
        cualquier CVC. No se realiza ningún cobro real, pero sí recibirás un correo real para activar tu
        cuenta.
      </p>
      )}

      {checkout && (
        <CheckoutModal plan={checkout.plan} price={checkout.price} onClose={() => setCheckout(null)} />
      )}
    </section>
  );
}
