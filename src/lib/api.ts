const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function apiFetch<T>(path: string, options: { method?: string; body?: unknown } = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers: options.body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      typeof errorBody.error === "string" ? errorBody.error : response.statusText,
    );
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export interface PlanPrice {
  id: number;
  plan_id: number;
  commitment_months: number;
  monthly_price_cents: number;
}

export interface Plan {
  id: number;
  name: string;
  plan_key: string | null;
  tier: "management" | "intelligence" | null;
  player_min: number | null;
  player_max: number | null;
  max_requests_per_day: number;
  max_members: number;
  price: string;
  features: string[] | null;
  prices: PlanPrice[];
}

export function listPublicPlans(): Promise<Plan[]> {
  return apiFetch<Plan[]>("/public/plans");
}

export function startCheckout(email: string, planPriceId: number): Promise<{ checkoutUrl: string }> {
  return apiFetch<{ checkoutUrl: string }>("/public/checkout", {
    method: "POST",
    body: { email, planPriceId },
  });
}
