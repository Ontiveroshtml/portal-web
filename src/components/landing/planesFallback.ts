import type { Plan } from "../../lib/api";

// Catálogo de respaldo de la sección Planes (guild-core-planes.html). Solo se
// usa si el API de planes no responde: así la sección nunca queda vacía. Con
// el API arriba manda siempre el API (precios reales + checkout con correo).

/** Plan de respaldo: además de sus precios trae un Payment Link de Stripe por ciclo. */
export type FallbackPlan = Plan & { links: Record<number, string> };

export function isFallbackPlan(plan: Plan): plan is FallbackPlan {
  return "links" in plan;
}

// Descuento por ciclo (%), por familia.
const CYCLES = [
  { months: 1, management: 0, intelligence: 0 },
  { months: 3, management: 5, intelligence: 5 },
  { months: 6, management: 10, intelligence: 10 },
  { months: 12, management: 17, intelligence: 17 },
] as const;

// Payment Links de Stripe (modo live): 1 mes se cobra mensual; 3, 6 y 12 meses
// se cobran por adelantado (un solo pago por el período completo).
const PLANS = [
  {
    id: -1, tier: "management", min: 1, max: 100, base: 59,
    links: {
      1: "https://buy.stripe.com/bJe5kEguh5Haf6p9Cb2cg0g",
      3: "https://buy.stripe.com/fZu6oIa5Tc5y3nH5lV2cg0w",
      6: "https://buy.stripe.com/bJebJ26THedG1fz4hR2cg0x",
      12: "https://buy.stripe.com/5kQfZi5PD2uYe2l8y72cg0I",
    },
  },
  {
    id: -2, tier: "management", min: 101, max: 200, base: 79,
    links: {
      1: "https://buy.stripe.com/5kQ14oce15Ha8I19Cb2cg0k",
      3: "https://buy.stripe.com/6oUaEY5PDd9C8I1aGf2cg0z",
      6: "https://buy.stripe.com/4gMeVe0vjfhK9M55lV2cg0A",
      12: "https://buy.stripe.com/5kQ6oI5PD6Lef6p8y72cg0J",
    },
  },
  {
    id: -3, tier: "intelligence", min: 1, max: 100, base: 109,
    links: {
      1: "https://buy.stripe.com/bJe9AU91P0mQ7DX4hR2cg0o",
      3: "https://buy.stripe.com/5kQ28s0vj2uY4rLbKj2cg0C",
      6: "https://buy.stripe.com/5kQ00kb9Xd9C1fzeWv2cg0K",
      12: "https://buy.stripe.com/7sYeVe6TH6Le5vP8y72cg0L",
    },
  },
  {
    id: -4, tier: "intelligence", min: 101, max: 200, base: 139,
    links: {
      1: "https://buy.stripe.com/fZucN691Pd9CbUd01B2cg0s",
      3: "https://buy.stripe.com/5kQ9AU1znedG7DXg0z2cg0F",
      6: "https://buy.stripe.com/dRmfZi0vj4D66zT8y72cg0M",
      12: "https://buy.stripe.com/cNibJ22Dr7Pi7DXg0z2cg0N",
    },
  },
] as const;

export const FALLBACK_PLANS: FallbackPlan[] = PLANS.map((plan) => ({
  id: plan.id,
  name: `${plan.tier === "management" ? "Management" : "Intelligence"} ${plan.min}–${plan.max}`,
  plan_key: null,
  tier: plan.tier,
  player_min: plan.min,
  player_max: plan.max,
  max_requests_per_day: 0,
  max_members: plan.max,
  price: String(plan.base),
  features: null,
  prices: CYCLES.map((cycle) => ({
    id: plan.id * 100 - cycle.months,
    plan_id: plan.id,
    commitment_months: cycle.months,
    monthly_price_cents: Math.round(plan.base * (1 - cycle[plan.tier] / 100) * 100),
  })),
  links: plan.links,
}));

// Reglas del Fondo común de clan por familia y tramo: cuántos contribuyentes
// como máximo y qué recargo (%) se aplica sobre el precio ya rebajado.
export const POOL_RULES = {
  management: { small: { contributors: 3, surcharge: 10 }, large: { contributors: 5, surcharge: 15 } },
  intelligence: { small: { contributors: 3, surcharge: 12 }, large: { contributors: 5, surcharge: 18 } },
} as const;
