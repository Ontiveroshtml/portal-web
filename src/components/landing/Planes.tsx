import { useEffect, useMemo, useState } from "react";
import { CheckoutModal } from "../CheckoutModal";
import { listPublicPlans, type Plan, type PlanPrice } from "../../lib/api";
import { useI18n } from "../../i18n/useI18n";
import { FALLBACK_PLANS, isFallbackPlan, POOL_RULES } from "./planesFallback";
import { Highlight, RichText } from "./shared";

// Diseño de `guild-core-planes.html`: selector de método de pago, ciclos
// centrados, tarjetas con corte de 16px por tramo de jugadores, cabeceras de
// familia con línea punteada y el Fondo común de clan (aún deshabilitado).
// Los planes y precios vienen del API; si el API no responde se usa el
// catálogo de respaldo del mockup (planesFallback.ts).

const CUT_16 =
  "[clip-path:polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%,0_16px)]";

const CYCLES = [
  { months: 1, labelKey: "planes.cycles.monthly" },
  { months: 3, labelKey: "planes.cycles.three" },
  { months: 6, labelKey: "planes.cycles.six" },
  { months: 12, labelKey: "planes.cycles.twelve", badgeKey: "planes.cycles.bestValue" },
] as const;

// Plan con corona destacada. null = ninguno lleva corona.
// Para activarla: { tier: "intelligence", playerMin: 1 }.
const DESTACADO: { tier: "management" | "intelligence"; playerMin: number } | null = null;

const TIER_STYLE = {
  management: {
    icon: "/icons/svg/icon-coins.svg",
    text: "text-[var(--accent)]",
    border: "border-[var(--accent)]/35",
    dot: "border-[var(--accent)] bg-[var(--accent)]/16",
    chip: "bg-[var(--accent)]/14 text-[var(--accent)]",
    cta: "border-2 border-[var(--accent-purple)] bg-transparent text-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/10",
    poolCta: "bg-[var(--accent)] text-[#1c2200]",
  },
  intelligence: {
    icon: "/icons/svg/icon-chart.svg",
    text: "text-[var(--accent-purple)]",
    border: "border-[var(--accent-purple)]/35",
    dot: "border-[var(--accent-purple)] bg-[var(--accent-purple)]/18",
    chip: "bg-[var(--accent-purple)]/16 text-[var(--accent-purple)]",
    cta: "bg-[var(--accent)] text-[#1c2200] hover:brightness-110",
    poolCta: "bg-[var(--accent-purple)] text-white",
  },
} as const;

type Tier = keyof typeof TIER_STYLE;

function formatMoney(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function priceForCycle(plan: Plan, months: number): PlanPrice | undefined {
  return plan.prices.find((price) => price.commitment_months === months);
}

function tierOf(plan: Plan): Tier {
  return plan.tier === "intelligence" ? "intelligence" : "management";
}

function PlanCard({
  plan,
  cycleMonths,
  cryptoMode,
  onChoose,
}: {
  plan: Plan;
  cycleMonths: number;
  cryptoMode: boolean;
  onChoose: (plan: Plan, price: PlanPrice) => void;
}) {
  const { t, tList } = useI18n();
  const tier = tierOf(plan);
  const style = TIER_STYLE[tier];
  const price = priceForCycle(plan, cycleMonths);
  const basePrice = priceForCycle(plan, 1);
  const discount =
    price && basePrice && basePrice.monthly_price_cents > 0
      ? Math.round((1 - price.monthly_price_cents / basePrice.monthly_price_cents) * 100)
      : 0;
  // La lista traducida manda: los textos que vienen del API están solo en
  // español. Si un plan trae features propias y falta la traducción, se usan.
  const translated = tList(`planes.features.${tier}`);
  const features = translated.length ? translated : (plan.features ?? []);
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
        className={`${CUT_16} relative flex h-full flex-col border bg-[var(--surface-raised)]/60 px-6 pb-6 pt-7 ${
          destacado
            ? "border-2 border-[var(--accent)] shadow-[0_0_34px_-8px_rgba(214,250,56,.5)]"
            : style.border
        }`}
      >
        {/* En una sola columna no hay cabecera de familia arriba, así que la
            tarjeta la lleva adentro. */}
        <span
          className={`mb-3 [font-family:'JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[.14em] lg:hidden ${style.text}`}
        >
          {t(`planes.${tier}.title`)}
        </span>

        <div className="mb-[18px] [font-family:'Montserrat',sans-serif] text-xl font-extrabold italic uppercase leading-[1.15] tracking-[-.01em]">
          {plan.player_min}–{plan.player_max}
          <span className="block text-[13px] font-semibold not-italic tracking-[.04em] text-[var(--muted)]">
            {t("planes.cycles.jugadores")}
          </span>
        </div>

        <div className="mb-1.5 flex min-h-[52px] flex-wrap items-baseline gap-2">
          <span className="whitespace-nowrap [font-family:'JetBrains_Mono',monospace] text-[clamp(26px,2.6vw,36px)] font-bold leading-none tracking-[-.01em]">
            {price ? formatMoney(price.monthly_price_cents) : "—"}
            <small className="text-sm font-medium text-[var(--muted)]">{t("planes.perMonth")}</small>
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

        <p className="mb-[22px] text-[12px] text-[var(--muted)]">
          {cycleMonths > 1 ? t("planes.commitment", { months: cycleMonths }) : t("planes.billedMonthly")}
        </p>

        <ul className="mb-6 flex flex-1 flex-col gap-3">
          {features.map((feature, index) => (
            <li
              key={feature}
              // Intelligence arranca con "Todas las funciones de Gestión": va
              // atenuada, es un enlace con el plan de abajo y no una función más.
              className={`flex items-start gap-2.5 text-[13.5px] ${
                tier === "intelligence" && index === 0 ? "text-[var(--muted)]" : "text-[var(--text)]"
              }`}
            >
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
          disabled={!price || cryptoMode}
          onClick={() => price && onChoose(plan, price)}
          className={`gc-boton w-full cursor-pointer rounded-full px-5 py-3.5 [font-family:'Montserrat',sans-serif] text-[12.5px] font-extrabold italic uppercase tracking-[.04em] transition duration-150 active:scale-[.97] disabled:cursor-not-allowed disabled:opacity-55 ${style.cta}`}
        >
          {cryptoMode ? t("hero.comingSoon") : t("planes.choose")}
        </button>
      </article>
    </div>
  );
}

/** Fondo común de clan: el monto por persona es (cuota con descuento × recargo) ÷ contribuyentes. */
function PoolCard({ plan, cycleMonths }: { plan: Plan; cycleMonths: number }) {
  const { t } = useI18n();
  const tier = tierOf(plan);
  const style = TIER_STYLE[tier];
  const price = priceForCycle(plan, cycleMonths);
  const rule = POOL_RULES[tier][(plan.player_min ?? 1) > 100 ? "large" : "small"];
  const perPerson = price ? (price.monthly_price_cents * (1 + rule.surcharge / 100)) / rule.contributors : null;

  return (
    <div className="border border-[var(--line)] bg-[#1b1b1d] px-4 py-3.5">
      <div className={`mb-1 [font-family:'JetBrains_Mono',monospace] text-[11px] font-extrabold uppercase tracking-[.06em] ${style.text}`}>
        {t(`planes.${tier}.title`)} {plan.player_min}–{plan.player_max}
      </div>
      <div className="mb-2.5 text-[12.5px] text-[var(--muted)]">
        {t("planes.pool.contributors", { n: rule.contributors })}
      </div>
      <div className="whitespace-nowrap [font-family:'JetBrains_Mono',monospace] text-[clamp(20px,2vw,26px)] font-bold leading-none">
        {perPerson === null ? "—" : formatMoney(perPerson)}
      </div>
      <div className="mb-0.5 mt-1 [font-family:'JetBrains_Mono',monospace] text-[11px] font-bold text-[var(--accent-gold)]">
        +{rule.surcharge}%
      </div>
      <div className="text-[11px] text-[var(--muted)]">{t("planes.pool.per")}</div>
      <button
        type="button"
        disabled
        className={`mt-3 w-full rounded-full px-3.5 py-2 [font-family:'Montserrat',sans-serif] text-[11.5px] font-extrabold italic uppercase tracking-[.04em] opacity-60 ${style.poolCta}`}
      >
        {t("hero.comingSoon")}
      </button>
    </div>
  );
}

export function Planes() {
  const { t, lang } = useI18n();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [cycleMonths, setCycleMonths] = useState(12);
  const [payMode, setPayMode] = useState<"card" | "crypto">("card");
  const [checkout, setCheckout] = useState<{ plan: Plan; price: PlanPrice } | null>(null);

  // Tarjeta/Stripe no opera en Rusia: al pasar a ruso se sugiere cripto (se
  // puede volver a tarjeta). Se ajusta durante el render, no en un efecto.
  const [seenLang, setSeenLang] = useState(lang);
  if (seenLang !== lang) {
    setSeenLang(lang);
    if (lang === "ru") setPayMode("crypto");
  }

  useEffect(() => {
    listPublicPlans()
      .then(setPlans)
      .catch(() => setPlans(FALLBACK_PLANS))
      .finally(() => setPlansLoading(false));
  }, []);

  // Solo los planes con ciclos de precio son el catálogo real de suscripción.
  // Management primero y, dentro de cada familia, por tramo de jugadores.
  const ordered = useMemo(() => {
    const withPrices = plans.filter((plan) => plan.prices.length > 0);
    const source = withPrices.length > 0 ? withPrices : FALLBACK_PLANS;
    const byBracket = (a: Plan, b: Plan) => (a.player_min ?? 0) - (b.player_min ?? 0);
    return [
      ...source.filter((plan) => plan.tier === "management").sort(byBracket),
      ...source.filter((plan) => plan.tier === "intelligence").sort(byBracket),
    ];
  }, [plans]);

  function choosePlan(plan: Plan, price: PlanPrice) {
    // Catálogo de respaldo: Payment Link de Stripe directo. Con el API arriba,
    // el checkout normal (correo + activación de cuenta).
    if (isFallbackPlan(plan)) {
      const link = plan.links[price.commitment_months];
      if (link) window.location.href = link;
      return;
    }
    setCheckout({ plan, price });
  }

  return (
    <section id="planes" className="mx-auto w-[min(1280px,calc(100%-40px))] py-[52px]">
      {/* Cabecera: título a la izquierda, método de pago a la derecha, a su altura. */}
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
        <div>
        <div className="mb-2 flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="size-2 bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"
          />
          <span className="[font-family:'JetBrains_Mono',monospace] text-xs font-semibold uppercase tracking-[.12em] text-[var(--muted)]">
            {t("planes.eyebrow")}
          </span>
        </div>
        <h2 className="[font-family:'Montserrat',sans-serif] text-[clamp(30px,4.4vw,48px)] font-black italic leading-[1.05] tracking-[-.02em]">
          <Highlight text={t("planes.title")} word="Guild Core" className="text-[var(--accent)]" />
        </h2>
        <p className="mb-10 mt-2 max-w-[56ch] text-[15px] text-[var(--muted)]">{t("planes.lede")}</p>
        </div>
        <div className="sm:mt-[30px]">
        <div
          role="group"
          aria-label={t("planes.payMethod")}
          className="flex gap-1 rounded-full border border-[var(--line)] bg-[var(--surface)] p-[5px]"
        >
          {(["card", "crypto"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={payMode === mode}
              onClick={() => setPayMode(mode)}
              className={`cursor-pointer rounded-full px-3.5 py-2 [font-family:'Montserrat',sans-serif] text-[11px] font-bold leading-none tracking-[.04em] transition duration-150 ${
                payMode === mode
                  ? "bg-[var(--accent)] text-[#1c2200]"
                  : "bg-transparent text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              {mode === "card" ? "💳" : "₿"} {mode === "card" ? t("planes.payCard") : t("planes.payCrypto")}
            </button>
          ))}
        </div>
        </div>
      </div>

      {payMode === "crypto" && (
        <p
          role="status"
          className="mt-2 mb-6 flex items-center gap-2 rounded-[10px] border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/12 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-[var(--accent-gold)]"
        >
          {t("planes.cryptoNote")}
        </p>
      )}

      {plansLoading ? (
        <p className="text-sm text-[var(--muted)]">{t("planes.loading")}</p>
      ) : (
        <>
          {/* Selector de ciclo — centrado, con la estela dorada detrás. Sin
              overflow ni scroll: en pantallas angostas los botones bajan de
              línea, así el badge nunca se recorta. */}
          <div className="relative mx-auto mb-10 flex w-fit max-w-full justify-center">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-[26px] top-1/2 h-11 w-24 -translate-y-1/2 -rotate-[8deg] bg-[url('/decorations/decal-claw-yellow.png')] bg-contain bg-no-repeat opacity-35 mix-blend-screen"
            />
            <div
              role="tablist"
              aria-label={t("planes.billingLabel")}
              className="relative flex max-w-full flex-wrap justify-center gap-1.5 rounded-[999px] border border-[var(--line)] bg-[var(--surface)] p-1.5"
            >
              {CYCLES.map((cycle) => {
                const active = cycleMonths === cycle.months;
                return (
                  <button
                    key={cycle.months}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCycleMonths(cycle.months)}
                    // Sin gc-boton a propósito: esa clase lleva overflow:hidden y acá el
                    // badge "Mejor valor" vive adentro del botón, fuera de su caja.
                    className={`relative cursor-pointer whitespace-nowrap rounded-full px-5 py-2.5 [font-family:'Montserrat',sans-serif] text-xs font-extrabold italic uppercase tracking-[.04em] transition duration-200 active:scale-[.97] ${
                      active
                        ? "bg-[var(--accent)] text-[#1c2200] shadow-[0_0_24px_-6px_rgba(214,250,56,.65)]"
                        : "bg-transparent text-[var(--muted)] hover:text-[var(--text)]"
                    } ${"badgeKey" in cycle ? "mt-2.5 sm:mt-0" : ""}`}
                  >
                    {t(cycle.labelKey)}
                    {"badgeKey" in cycle && (
                      <span className="pointer-events-none absolute -right-1.5 -top-[11px] flex -rotate-6 items-center gap-[3px] whitespace-nowrap rounded-full bg-[var(--accent-gold)] px-2 py-1 [font-family:'Montserrat',sans-serif] text-[9px] font-black italic uppercase leading-none tracking-[.06em] text-[#3a2400] shadow-[0_0_12px_-2px_rgba(255,184,0,.7)]">
                        <img
                          src="/vfx/vfx-lightning-yellow-01.png"
                          alt=""
                          aria-hidden="true"
                          className="size-2.5"
                        />
                        {t(cycle.badgeKey)}
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
              className="pointer-events-none absolute -bottom-8 right-0 z-0 hidden size-[150px] rotate-6 bg-[url('/vfx/vfx-lightning-purple.png')] bg-contain bg-no-repeat opacity-[.16] mix-blend-screen lg:block"
            />

            <div className="relative z-[1]">
              {/* Cabeceras de familia — solo en la grilla de 4 columnas */}
              <div className="mb-3.5 hidden grid-cols-4 gap-4 lg:grid">
                {(["management", "intelligence"] as const).map((tier) => (
                  <div
                    key={tier}
                    className={`col-span-2 flex items-center gap-2.5 [font-family:'Montserrat',sans-serif] text-[22px] font-black italic uppercase leading-none tracking-[-.01em] ${TIER_STYLE[tier].text}`}
                  >
                    <img
                      src={TIER_STYLE[tier].icon}
                      alt=""
                      aria-hidden="true"
                      className="w-7 shrink-0 mix-blend-screen [filter:drop-shadow(0_0_6px_currentColor)]"
                    />
                    {t(`planes.${tier}.title`)}
                    <span
                      aria-hidden="true"
                      className="h-0.5 flex-1 opacity-50 [background:repeating-linear-gradient(90deg,currentColor_0_8px,transparent_8px_14px)]"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {ordered.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    cycleMonths={cycleMonths}
                    cryptoMode={payMode === "crypto"}
                    onChoose={choosePlan}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Fondo común de clan — próximamente: toda la sección se ve apagada
              y lleva un tag fijo que explica por qué. */}
          <div
            className={`${CUT_16} relative mt-12 overflow-hidden border border-[var(--line)] bg-[var(--surface-raised)] px-8 pb-5 pt-6`}
          >
            <span
              aria-hidden="true"
              className="gc-cinta-viva absolute inset-x-0 top-0 h-1.5 opacity-85 [background:repeating-linear-gradient(45deg,var(--accent)_0_10px,var(--bg)_10px_20px)]"
            />
            <div className="mb-4 mt-2 flex flex-col items-start justify-between gap-6 lg:flex-row">
              <div className="pointer-events-none opacity-45 grayscale-[.7]">
                <h3 className="mb-1.5 flex items-center gap-3 [font-family:'Montserrat',sans-serif] text-[clamp(20px,2.4vw,26px)] font-black italic uppercase leading-[1.1]">
                  <img
                    src="/emotes/emote-happy.png"
                    alt=""
                    aria-hidden="true"
                    className="w-10 shrink-0 [filter:drop-shadow(0_4px_8px_rgba(0,0,0,.5))]"
                  />
                  {t("planes.pool.title")}
                </h3>
                <p className="max-w-[44ch] text-[13.5px] text-[var(--muted)]">{t("planes.pool.desc")}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-[7px] whitespace-nowrap rounded-full border border-[var(--accent-gold)]/50 bg-[var(--accent-gold)]/14 px-4 py-[9px] [font-family:'Montserrat',sans-serif] text-[11.5px] font-extrabold italic uppercase leading-none tracking-[.05em] text-[var(--accent-gold)]">
                <span aria-hidden="true">⏳</span>
                {t("planes.pool.tag")}
              </span>
            </div>

            <div className="pointer-events-none grid grid-cols-1 gap-4 opacity-45 grayscale-[.7] sm:grid-cols-2 lg:grid-cols-4">
              {ordered.map((plan) => (
                <PoolCard key={plan.id} plan={plan} cycleMonths={cycleMonths} />
              ))}
            </div>

            <p className="pointer-events-none mt-4 flex gap-2.5 border-t border-[var(--line)] pt-3.5 text-[12px] leading-[1.6] text-[var(--muted)] opacity-45 grayscale-[.7]">
              <span aria-hidden="true">ⓘ</span>
              <span>
                <RichText text={t("planes.pool.footnote")} />
              </span>
            </p>
          </div>
        </>
      )}


      {checkout && (
        <CheckoutModal plan={checkout.plan} price={checkout.price} onClose={() => setCheckout(null)} />
      )}
    </section>
  );
}
