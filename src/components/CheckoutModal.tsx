import { useState, type FormEvent } from "react";
import { ApiError, startCheckout, type Plan, type PlanPrice } from "../lib/api";

interface CheckoutModalProps {
  plan: Plan;
  price: PlanPrice;
  onClose: () => void;
}

export function CheckoutModal({ plan, price, onClose }: CheckoutModalProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const { checkoutUrl } = await startCheckout(email.trim(), price.id);
      // Redirect to Stripe's hosted Checkout page (test mode) — the actual
      // card entry happens there, never on this site.
      window.location.href = checkoutUrl;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo iniciar el pago.");
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4" onClick={onClose}>
      <div
        className="w-full max-w-[400px] rounded-[10px] border border-[var(--line)] bg-[var(--surface)] p-[28px]"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="mb-1 font-serif text-xl font-normal">Suscribirse a {plan.name}</h2>
        <p className="mb-5 text-xs text-[var(--muted)]">
          Te llevaremos a Stripe (modo de prueba) para pagar con tarjeta. Usa 4242 4242 4242 4242, cualquier
          fecha futura y cualquier CVC — no se realiza ningún cobro real.
        </p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="tu@correo.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-[6px] border border-[var(--line)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
          />
          {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-[6px] bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-[#111] transition hover:brightness-95 disabled:opacity-60"
          >
            {submitting
              ? "Redirigiendo a Stripe…"
              : `Ir a pagar — $${(price.monthly_price_cents / 100).toFixed(2)}/mes`}
          </button>
          <button type="button" onClick={onClose} className="text-xs text-[var(--muted)] underline">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
