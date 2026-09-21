import { useEffect, useId, useRef, useState } from "react";
import { LANGUAGES, LANGUAGE_OPTIONS } from "../../i18n";
import { useI18n } from "../../i18n/useI18n";

/** Selector de idioma del navbar: desplegable compacto con el idioma actual. */
export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const listId = useId();

  // Cierra con clic afuera o Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapper} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t("nav.language")}: ${LANGUAGE_OPTIONS[lang].name}`}
        className="flex h-9 cursor-pointer items-center gap-1.5 rounded-[7px] border border-[var(--line)] px-2.5 [font-family:'JetBrains_Mono',monospace] text-[11px] font-semibold uppercase tracking-[.1em] text-[var(--text)] transition duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
          <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M1.8 8h12.4M8 1.8c1.8 1.9 2.7 4 2.7 6.2S9.8 12.3 8 14.2C6.2 12.3 5.3 10.2 5.3 8S6.2 3.7 8 1.8Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
        {LANGUAGE_OPTIONS[lang].short}
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={t("nav.language")}
          className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[150px] overflow-hidden rounded-[8px] border border-[var(--line)] bg-[var(--surface)] py-1 shadow-[0_18px_40px_-12px_rgba(0,0,0,.7)]"
        >
          {LANGUAGES.map((code) => {
            const active = code === lang;
            return (
              <li key={code} role="option" aria-selected={active} lang={code}>
                <button
                  type="button"
                  onClick={() => {
                    setLang(code);
                    setOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-center justify-between gap-3 px-3.5 py-2 text-left text-[13px] transition duration-150 hover:bg-[var(--surface-raised)] ${
                    active ? "text-[var(--accent)]" : "text-[var(--text)]"
                  }`}
                >
                  {LANGUAGE_OPTIONS[code].name}
                  <span className="[font-family:'JetBrains_Mono',monospace] text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
                    {LANGUAGE_OPTIONS[code].short}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
