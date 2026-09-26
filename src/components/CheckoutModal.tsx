import { useState } from "react";
import { ApiError, startCheckout, type CheckoutPaymentMethod, type Plan, type PlanPrice } from "../lib/api";
import { useI18n } from "../i18n/useI18n";
import { getStoredReferralCode } from "../lib/referral";
import { DISCORD_PAYMENTS_URL } from "../lib/links";
import { safeRedirect } from "../lib/safeRedirect";

// Apagado a pedido ("cancelo de cripto hasta nuevo aviso") — el backend
// también rechaza method:"crypto" mientras tanto (ver checkout.stripe.ts).
// Queda el botón entero comentado abajo, no borrado, para reactivar rápido.
const CRYPTO_PAYMENTS_ENABLED = false;

interface CheckoutModalProps {
  plan: Plan;
  price: PlanPrice;
  onClose: () => void;
}

export function CheckoutModal({ plan, price, onClose }: CheckoutModalProps) {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  // Precargado si vino por ?ref=codigo, pero editable: alguien que escuchó el
  // código en un video (sin haber entrado por el link) también puede pegarlo.
  const [referralCode, setReferralCode] = useState(() => getStoredReferralCode() ?? "");
  // Cuál botón está en curso — no un solo "submitting" booleano, porque hay
  // dos acciones posibles en el mismo formulario y hay que deshabilitar las
  // dos mientras cualquiera de ellas está redirigiendo.
  const [submitting, setSubmitting] = useState<CheckoutPaymentMethod | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function pay(method: CheckoutPaymentMethod) {
    if (!email.trim()) return;
    setSubmitting(method);
    setError(null);
    try {
      const { checkoutUrl } = await startCheckout(email.trim(), price.id, method, referralCode.trim() || undefined);
      // Redirect to Stripe's hosted Checkout page — card entry
      // or the crypto wallet connection both happen there, never on this site.
      safeRedirect(checkoutUrl);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("checkout.error"));
      setSubmitting(null);
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
        <form className="flex flex-col gap-3" onSubmit={(event) => event.preventDefault()}>
          <input
            type="email"
            required
            placeholder={t("checkout.emailPlaceholder")}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-[6px] border border-[var(--line)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
          />
          <input
            type="text"
            placeholder={t("checkout.referralPlaceholder")}
            value={referralCode}
            onChange={(event) => setReferralCode(event.target.value)}
            className="w-full rounded-[6px] border border-[var(--line)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
          />
          {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
          <button
            type="button"
            onClick={() => pay("card")}
            disabled={submitting !== null}
            className="w-full rounded-full bg-[var(--accent)] px-4 py-3 [font-family:'Montserrat',sans-serif] text-sm font-extrabold italic uppercase tracking-[.04em] text-[#17201e] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_-6px_rgba(214,250,56,.5)] disabled:cursor-wait disabled:opacity-55 disabled:shadow-none disabled:hover:translate-y-0"
          >
            {submitting === "card"
              ? t("checkout.submitting")
              : t("checkout.pay", {
                  price:
                    price.commitment_months > 1
                      ? `$${((price.monthly_price_cents * price.commitment_months) / 100).toFixed(2)}`
                      : `$${(price.monthly_price_cents / 100).toFixed(2)}${t("planes.perMonth")}`,
                })}
          </button>
          {CRYPTO_PAYMENTS_ENABLED && (
            <>
              <button
                type="button"
                onClick={() => pay("crypto")}
                disabled={submitting !== null}
                className="w-full rounded-full border border-[var(--accent)] bg-transparent px-4 py-3 [font-family:'Montserrat',sans-serif] text-sm font-extrabold italic uppercase tracking-[.04em] text-[var(--accent)] transition duration-200 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-55 disabled:hover:translate-y-0"
              >
                {submitting === "crypto"
                  ? t("checkout.submitting")
                  : t("checkout.payCrypto", {
                      price: `$${((price.monthly_price_cents * price.commitment_months) / 100).toFixed(2)}`,
                    })}
              </button>
              <p className="text-center text-[11px] text-[var(--muted)]">{t("checkout.cryptoNote")}</p>
            </>
          )}
          <button type="button" onClick={onClose} className="text-xs text-[var(--muted)] underline">
            {t("checkout.cancel")}
          </button>
          <a
            href={DISCORD_PAYMENTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-center text-[11px] text-[var(--muted)] underline hover:text-[var(--accent)]"
          >
            {t("checkout.otherMethod")}
          </a>
        </form>
      </div>
    </div>
  );
}
