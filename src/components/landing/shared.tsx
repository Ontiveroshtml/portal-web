import type { PropsWithChildren, ReactNode } from "react";

// Matches OCR's `Card` `cut`/`featured` clip-path values exactly — see
// .claude/skills/urban-neon-design/SKILL.md §4 in the OCR app for the source of truth.
export const cutClass =
  "[clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]";
export const featuredClass =
  "[clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)] shadow-[0_0_34px_-6px_rgba(214,250,56,.45)]";

/** Etiqueta de sección: cuadrado lima + texto lima, igual en todas las secciones. */
export function SectionEyebrow({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="size-2 bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
      <span className="[font-family:'JetBrains_Mono',monospace] text-xs font-semibold uppercase tracking-[.16em] text-[var(--accent)]">
        {children}
      </span>
    </span>
  );
}

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, align = "center", className = "" }: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <h2
        className={`mt-2 [font-family:'Montserrat',sans-serif] text-[clamp(24px,4vw,36px)] font-black italic tracking-[-.02em] ${align === "center" ? "mx-auto" : ""}`}
      >
        {title}
      </h2>
      <div
        aria-hidden="true"
        className={`gc-cinta-viva mt-3 h-[6px] w-[130px] [background:repeating-linear-gradient(45deg,var(--accent)_0_10px,var(--bg)_10px_20px)] ${align === "center" ? "mx-auto" : ""}`}
      />
    </div>
  );
}

/** Pinta `word` con `className` dentro de `text` (si aparece), sin romper el resto de la frase. */
export function Highlight({ text, word, className }: { text: string; word: string; className: string }) {
  const index = text.indexOf(word);
  if (index < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <span className={className}>{word}</span>
      {text.slice(index + word.length)}
    </>
  );
}

/**
 * Texto con marcas mínimas: **negrita** y `mono` (cifras/fórmulas). Permite
 * traducir frases con énfasis sin meter HTML en los archivos de idioma.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**")) {
          return (
            <b key={i} className="font-semibold text-[var(--text)]">
              {part.slice(2, -2)}
            </b>
          );
        }
        if (part.startsWith("`")) {
          return (
            <span key={i} className="[font-family:'JetBrains_Mono',monospace] text-[var(--text)]">
              {part.slice(1, -1)}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}

export function Pill({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3.5 py-1.5 [font-family:'JetBrains_Mono',monospace] text-[11px] font-semibold uppercase tracking-[.1em] text-[var(--muted)] ${className}`}
    >
      {children}
    </span>
  );
}
