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

// Payment Links de Stripe (modo live), creados 2026-09-23: 1 mes, 3, 6 y 12.
const PLANS = [
  {
    id: -1, tier: "management", min: 1, max: 100, base: 59,
    links: {
      1: "https://buy.stripe.com/bJe5kEguh5Haf6p9Cb2cg0g",
      3: "https://buy.stripe.com/8x200k5PD4D64rLaGf2cg0h",
      6: "https://buy.stripe.com/dRm7sMem9glO5vP15F2cg0i",
      12: "https://buy.stripe.com/4gM3cw91P4D64rL9Cb2cg0j",
    },
  },
  {
    id: -2, tier: "management", min: 101, max: 200, base: 79,
    links: {
      1: "https://buy.stripe.com/5kQ14oce15Ha8I19Cb2cg0k",
      3: "https://buy.stripe.com/bJeeVe91PglOe2l6pZ2cg0l",
      6: "https://buy.stripe.com/3cI9AUdi51qU5vP9Cb2cg0m",
      12: "https://buy.stripe.com/9B64gAa5T1qU7DX9Cb2cg0n",
    },
  },
  {
    id: -3, tier: "intelligence", min: 1, max: 100, base: 109,
    links: {
      1: "https://buy.stripe.com/bJe9AU91P0mQ7DX4hR2cg0o",
      3: "https://buy.stripe.com/cNi4gAdi51qUf6paGf2cg0p",
      6: "https://buy.stripe.com/eVqeVe91P7Pi7DXcOn2cg0q",
      12: "https://buy.stripe.com/6oU4gAem9b1u5vP7u32cg0r",
    },
  },
  {
    id: -4, tier: "intelligence", min: 101, max: 200, base: 139,
    links: {
      1: "https://buy.stripe.com/fZucN691Pd9CbUd01B2cg0s",
      3: "https://buy.stripe.com/3cIdRa0vj0mQf6p8y72cg0t",
      6: "https://buy.stripe.com/4gMfZi91P8Tm7DX01B2cg0u",
      12: "https://buy.stripe.com/4gM8wQem90mQ3nH7u32cg0v",
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
