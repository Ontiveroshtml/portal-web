import { useState } from "react";
import { useI18n } from "../../i18n/useI18n";
import { SectionHeading } from "./shared";

// Orden por objeción, no por tema: primero lo que frena una decisión (qué es,
// si funciona de verdad, qué pasa si falla, dónde quedan mis datos, cuánto
// cuesta) y recién al final lo que todavía no existe. Los textos y el icono de
// cada pregunta viven en faq.item1 … faq.itemN de los locales.
const FAQ_COUNT = 14;
const FAQ_KEYS = Array.from({ length: FAQ_COUNT }, (_, i) => `faq.item${i + 1}`);

function FaqItem({ q, a, icono }: { q: string; a: string; icono: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--line)] py-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center gap-3.5 py-3.5 text-left"
        aria-expanded={open}
      >
        {/* Placa del icono: se enciende cuando la pregunta está abierta y
            también al pasar el mouse, para que se lea como algo clickeable. */}
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-[8px] border transition duration-200 ${
            open
              ? "border-[var(--accent)]/60 bg-[var(--accent)]/12 shadow-[0_0_20px_-6px_rgba(214,250,56,.6)]"
              : "border-[var(--line)] bg-[var(--surface)]/70 group-hover:border-[var(--accent)]/45"
          }`}
        >
          <img src={icono} alt="" aria-hidden="true" className="size-[18px]" />
        </span>

        <span
          className={`flex-1 [font-family:'Montserrat',sans-serif] text-sm font-black italic tracking-[-.01em] transition duration-200 ${
            open ? "text-[var(--accent)]" : "text-[var(--text)] group-hover:text-[var(--accent)]"
          }`}
        >
          {q}
        </span>

        <span
          className={`shrink-0 text-lg text-[var(--accent)] transition duration-200 ${open ? "rotate-45" : ""}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && (
        <p className="mb-4 ml-[50px] max-w-[640px] text-sm leading-relaxed text-[var(--muted)]">{a}</p>
      )}
    </div>
  );
}

export function FAQ() {
  const { t } = useI18n();

  return (
    <section id="faq" className="mx-auto w-[min(900px,calc(100%-40px))] py-[52px]">
      <SectionHeading eyebrow={t("nav.faq")} title={t("faq.title")} />
      <div className="mt-10">
        {FAQ_KEYS.map((key) => (
          <FaqItem key={key} q={t(`${key}.question`)} a={t(`${key}.answer`)} icono={t(`${key}.icon`)} />
        ))}
      </div>
    </section>
  );
}
