import { useState, type FormEvent } from "react";
import { ApiError, simulateCheckout, type Plan } from "../lib/api";

interface CheckoutModalProps {
  plan: Plan;
  onClose: () => void;
}

export function CheckoutModal({ plan, onClose }: CheckoutModalProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await simulateCheckout(email.trim(), plan.id);
      setSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo procesar la compra.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[400px] rounded-[10px] border border-[var(--line)] bg-[var(--surface)] p-[28px]"
        onClick={(event) => event.stopPropagation()}
      >
        {sent ? (
          <>
            <div className="mb-1 text-2xl text-[var(--accent)]">✓</div>
            <h2 className="mb-2 font-serif text-xl font-normal">¡Listo!</h2>
            <p className="text-sm text-[var(--muted)]">
              Simulamos tu compra del plan <strong className="text-[var(--text)]">{plan.name}</strong>.
              Revisa <strong className="text-[var(--text)]">{email}</strong> — te enviamos un enlace real
              para activar tu cuenta.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full rounded-[6px] bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-[#111] transition hover:brightness-95"
            >
              Cerrar
            </button>
          </>
        ) : (
          <>
            <h2 className="mb-1 font-serif text-xl font-normal">Comprar {plan.name}</h2>
            <p className="mb-5 text-xs text-[var(--muted)]">
              Esto es una demo — no se realiza ningún cobro real. Simula el pago y te enviamos un correo
              de verdad para activar la cuenta.
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
                {submitting ? "Procesando…" : `Simular compra — $${plan.price}/mes`}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-[var(--muted)] underline"
              >
                Cancelar
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
