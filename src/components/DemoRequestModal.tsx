import { useState, type FormEvent } from "react";
import { ApiError, requestDemo } from "../lib/api";
import { useI18n } from "../i18n/useI18n";

const CAMPO =
  "w-full rounded-[6px] border border-[var(--line)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]";

// Formulario de "Solicitar demo" de la landing. No crea cuentas ni guarda
// nada: manda los datos al equipo por correo, que responde con el acceso.
export function DemoRequestModal({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [clanName, setClanName] = useState("");
  const [players, setPlayers] = useState("");
  const [message, setMessage] = useState("");
  // Campo trampa: queda oculto y vacío. Si viene lleno, lo mandó un bot.
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await requestDemo({
        name: name.trim(),
        email: email.trim(),
        clanName: clanName.trim() || null,
        players: players.trim() ? Number(players) : null,
        message: message.trim() || null,
        website,
      });
      setSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("demoForm.error"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/60 px-4 py-8" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-form-title"
        className="w-full max-w-[440px] rounded-[10px] border border-[var(--line)] bg-[var(--surface)] p-[28px]"
        onClick={(event) => event.stopPropagation()}
      >
        {sent ? (
          <>
            <h2 id="demo-form-title" className="mb-2 [font-family:'Montserrat',sans-serif] text-xl font-black italic tracking-[-.01em]">
              {t("demoForm.sentTitle")}
            </h2>
            <p className="mb-6 text-sm text-[var(--muted)]">{t("demoForm.sentBody")}</p>
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-full bg-[var(--accent)] px-4 py-3 [font-family:'Montserrat',sans-serif] text-sm font-extrabold italic uppercase tracking-[.04em] text-[#17201e] transition duration-200 hover:-translate-y-0.5"
            >
              {t("demoForm.close")}
            </button>
          </>
        ) : (
          <>
            <h2 id="demo-form-title" className="mb-1 [font-family:'Montserrat',sans-serif] text-xl font-black italic tracking-[-.01em]">
              {t("demoForm.title")}
            </h2>
            <p className="mb-5 text-xs text-[var(--muted)]">{t("demoForm.note")}</p>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                required
                minLength={2}
                maxLength={80}
                placeholder={t("demoForm.namePlaceholder")}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={CAMPO}
              />
              <input
                type="email"
                required
                maxLength={120}
                placeholder={t("demoForm.emailPlaceholder")}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={CAMPO}
              />
              <input
                type="text"
                maxLength={80}
                placeholder={t("demoForm.clanPlaceholder")}
                value={clanName}
                onChange={(event) => setClanName(event.target.value)}
                className={CAMPO}
              />
              <input
                type="number"
                min={1}
                max={10000}
                placeholder={t("demoForm.playersPlaceholder")}
                value={players}
                onChange={(event) => setPlayers(event.target.value)}
                className={CAMPO}
              />
              <textarea
                rows={3}
                maxLength={1000}
                placeholder={t("demoForm.messagePlaceholder")}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className={`${CAMPO} resize-y`}
              />

              {/* Trampa para bots: fuera de la vista y del tabulador. */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              {error && <p className="text-xs text-[var(--danger)]">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-[var(--accent)] px-4 py-3 [font-family:'Montserrat',sans-serif] text-sm font-extrabold italic uppercase tracking-[.04em] text-[#17201e] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_-6px_rgba(214,250,56,.5)] disabled:cursor-wait disabled:opacity-55 disabled:shadow-none disabled:hover:translate-y-0"
              >
                {submitting ? t("demoForm.submitting") : t("demoForm.submit")}
              </button>
              <button type="button" onClick={onClose} className="text-xs text-[var(--muted)] underline">
                {t("demoForm.cancel")}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
