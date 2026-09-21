import { useState, type FormEvent } from "react";
import { ApiError, startCheckout, type Plan, type PlanPrice } from "../lib/api";
import { useI18n } from "../i18n/useI18n";

interface CheckoutModalProps {
  plan: Plan;
  price: PlanPrice;
  onClose: () => void;
}

export function CheckoutModal({ plan, price, onClose }: CheckoutModalProps) {
  const { t } = useI18n();
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
      setError(err instanceof ApiError ? err.message : t("checkout.error"));
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="w-full max-w-[400px] rounded-[10px] border border-[var(--line)] bg-[var(--surface)] p-[28px]"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="checkout-title" className="mb-1 [font-family:'Montserrat',sans-serif] text-xl font-black italic tracking-[-.01em]">
          {t("checkout.title", { plan: plan.name })}
        </h2>
        <p className="mb-5 text-xs text-[var(--muted)]">
          {t("checkout.note")}
        </p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder={t("checkout.emailPlaceholder")}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-[6px] border border-[var(--line)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
          />
          {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-[var(--accent)] px-4 py-3 [font-family:'Montserrat',sans-serif] text-sm font-extrabold italic uppercase tracking-[.04em] text-[#17201e] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_-6px_rgba(214,250,56,.5)] disabled:cursor-wait disabled:opacity-55 disabled:shadow-none disabled:hover:translate-y-0"
          >
            {submitting
              ? t("checkout.submitting")
              : t("checkout.pay", { price: `$${(price.monthly_price_cents / 100).toFixed(2)}` })}
          </button>
          <button type="button" onClick={onClose} className="text-xs text-[var(--muted)] underline">
            {t("checkout.cancel")}
          </button>
        </form>
      </div>
    </div>
  );
}
