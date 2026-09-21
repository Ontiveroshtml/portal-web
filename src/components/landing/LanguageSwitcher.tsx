import { useEffect, useId, useRef, useState } from "react";
import { LANGUAGES, LANGUAGE_OPTIONS, type Lang } from "../../i18n";
import { useI18n } from "../../i18n/useI18n";

const FLAG_BOX = "h-[14px] w-[21px] shrink-0 overflow-hidden rounded-[2px] ring-1 ring-white/15";

/** Bandera de cada idioma, dibujada en SVG para que se vea igual en todos los sistemas. */
function Flag({ code }: { code: Lang }) {
  switch (code) {
    case "es":
      return (
        <svg viewBox="0 0 21 14" className={FLAG_BOX} aria-hidden="true">
          <rect width="21" height="14" fill="#AA151B" />
          <rect y="3.5" width="21" height="7" fill="#F1BF00" />
        </svg>
      );
    case "en":
      return (
        <svg viewBox="0 0 60 40" preserveAspectRatio="none" className={FLAG_BOX} aria-hidden="true">
          <rect width="60" height="40" fill="#012169" />
          <path d="M0 0 60 40M60 0 0 40" stroke="#fff" strokeWidth="8" />
          <path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" strokeWidth="3" />
          <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="13" />
          <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="8" />
        </svg>
      );
    case "ja":
      return (
        <svg viewBox="0 0 21 14" className={FLAG_BOX} aria-hidden="true">
          <rect width="21" height="14" fill="#fff" />
          <circle cx="10.5" cy="7" r="4.2" fill="#BC002D" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 21 14" className={FLAG_BOX} aria-hidden="true">
          <rect width="21" height="14" fill="#fff" />
          <rect y="4.67" width="21" height="4.67" fill="#0039A6" />
          <rect y="9.33" width="21" height="4.67" fill="#D52B1E" />
        </svg>
      );
  }
}


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
        className="flex h-10 min-w-[64px] cursor-pointer items-center justify-between gap-2 rounded-[8px] border border-[var(--line)] bg-[var(--surface)]/70 px-3 [font-family:'JetBrains_Mono',monospace] text-[11px] font-semibold uppercase tracking-[.1em] text-[var(--text)] transition duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] sm:min-w-[148px] sm:px-3.5 sm:text-[12px]"
      >
        <Flag code={lang} />
        <span className="hidden flex-1 text-left normal-case tracking-normal sm:inline">{LANGUAGE_OPTIONS[lang].name}</span>
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={`size-3 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={t("nav.language")}
          className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[190px] overflow-hidden rounded-[8px] border border-[var(--line)] bg-[var(--surface)] py-1 shadow-[0_18px_40px_-12px_rgba(0,0,0,.7)]"
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
                  className={`flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition duration-150 hover:bg-[var(--surface-raised)] ${
                    active ? "text-[var(--accent)]" : "text-[var(--text)]"
                  }`}
                >
                  {LANGUAGE_OPTIONS[code].name}
                  <Flag code={code} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
