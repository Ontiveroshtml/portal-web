import { useState } from "react";
import { ApiError, startOverrideCheckout } from "../lib/api";
import { useI18n } from "../i18n/useI18n";

/** Página que recibe el link de "oferta a medida" armado por un admin (ver
 * POST /admin/plan-overrides en el backend): token + email vienen en la URL,
 * nunca se muestran en el catálogo público. Sin router en el portal — se
 * monta directo cuando el pathname coincide (ver App.tsx). */
export function CheckoutAMedida() {
  const { t } = useI18n();
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const email = params.get("email");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pay() {
    if (!token || !email) return;
    setSubmitting(true);
    setError(null);
    try {
      const { checkoutUrl } = await startOverrideCheckout(email, token);
      window.location.assign(checkoutUrl);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("checkoutMedida.error"));
      setSubmitting(false);
    }
  }

  const invalid = !token || !email;

  return (
    <div className="grid min-h-screen place-items-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-[420px] rounded-[10px] border border-[var(--line)] bg-[var(--surface)] p-[28px] text-center">
        <img src="/brand/brand-logo-gc.avif" alt="Guild Core" className="mx-auto mb-5 h-12 w-auto" />

        {invalid ? (
          <>
            <h1 className="mb-2 [font-family:'Montserrat',sans-serif] text-lg font-black italic tracking-[-.01em]">
              {t("checkoutMedida.invalidTitle")}
            </h1>
            <p className="text-sm text-[var(--muted)]">{t("checkoutMedida.invalidText")}</p>
          </>
        ) : (
          <>
            <h1 className="mb-1 [font-family:'Montserrat',sans-serif] text-lg font-black italic tracking-[-.01em]">
              {t("checkoutMedida.title")}
            </h1>
            <p className="mb-5 text-sm text-[var(--muted)]">
              {t("checkoutMedida.subtitle", { email })}
            </p>
            {error && <p className="mb-3 text-xs text-[var(--danger)]">{error}</p>}
            <button
              type="button"
              onClick={pay}
              disabled={submitting}
              className="w-full rounded-full bg-[var(--accent)] px-4 py-3 [font-family:'Montserrat',sans-serif] text-sm font-extrabold italic uppercase tracking-[.04em] text-[#17201e] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_-6px_rgba(214,250,56,.5)] disabled:cursor-wait disabled:opacity-55 disabled:shadow-none disabled:hover:translate-y-0"
            >
              {submitting ? t("checkoutMedida.submitting") : t("checkoutMedida.pay")}
            </button>
          </>
        )}

        <a href="/" className="mt-5 inline-block text-xs text-[var(--muted)] underline">
          {t("checkoutMedida.backHome")}
        </a>
      </div>
    </div>
  );
}
