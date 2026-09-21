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
  { months: 6, management: 10, intelligence: 8 },
  { months: 12, management: 15, intelligence: 12 },
] as const;

// Payment Links de Stripe (modo de prueba) del mockup: 1 mes, 3, 6 y 12.
const PLANS = [
  {
    id: -1, tier: "management", min: 1, max: 100, base: 59,
    links: {
      1: "https://buy.stripe.com/test_bJebIUfg1fxY5jQdIM4wM00",
      3: "https://buy.stripe.com/test_4gMcMYebXbhIcMi2044wM01",
      6: "https://buy.stripe.com/test_7sY28kc3P0D427EgUY4wM02",
      12: "https://buy.stripe.com/test_cNi8wI6JvfxYdQm6gk4wM03",
    },
  },
  {
    id: -2, tier: "management", min: 101, max: 200, base: 79,
    links: {
      1: "https://buy.stripe.com/test_28E8wI2tf5Xoh2y8os4wM04",
      3: "https://buy.stripe.com/test_9B614gfg1bhIaEa7ko4wM06",
      6: "https://buy.stripe.com/test_dRmeV64BnclMh2y7ko4wM07",
      12: "https://buy.stripe.com/test_3cI9AMfg10D46nU9sw4wM08",
    },
  },
  {
    id: -3, tier: "intelligence", min: 1, max: 100, base: 109,
    links: {
      1: "https://buy.stripe.com/test_8x2eV61pb0D43bI2044wM09",
      3: "https://buy.stripe.com/test_7sYaEQfg14Tk6nUcEI4wM0a",
      6: "https://buy.stripe.com/test_eVq4gsd7T85wbIebAE4wM0b",
      12: "https://buy.stripe.com/test_3cI4gsc3P0D43bI7ko4wM0c",
    },
  },
  {
    id: -4, tier: "intelligence", min: 101, max: 200, base: 139,
    links: {
      1: "https://buy.stripe.com/test_28EeV60l73Pg4fM48c4wM0d",
      3: "https://buy.stripe.com/test_eVq3co6JvdpQ4fM5cg4wM0e",
      6: "https://buy.stripe.com/test_3cIfZa1pb85w4fMfQU4wM0f",
      12: "https://buy.stripe.com/test_7sY00c4Bn3PgdQmfQU4wM0g",
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
