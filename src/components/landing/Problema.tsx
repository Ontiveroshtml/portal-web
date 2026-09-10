import { SectionHeading } from "./shared";

const ANTES = [
  "Una planilla de Google Sheets que solo entiende el que la armó",
  "Copiar número por número de cada captura, de madrugada y con sueño",
  "Repartir a ojo: a uno le tocó de más y a otro de menos",
  "Reclamos en el chat cada vez que las cuentas no cuadran",
  "Rehacer el corte entero porque alguien mandó la captura tarde",
  "El líder haciendo de contador en vez de jugar",
];

const CON_GUILD_CORE = [
  "Un solo lugar: se acabó la planilla que depende de una persona",
  "Las capturas se leen solas, no se copia un número a mano",
  "El reparto sigue reglas escritas, iguales para todos",
  "Cada uno abre su link y ve lo suyo — no hay nada que discutir",
  "Llega una captura tarde, la sumas y el corte se recalcula solo",
  "El líder vuelve a jugar",
];

export function Problema() {
  return (
    <section className="mx-auto w-[min(1200px,calc(100%-40px))] py-[70px]">
      <SectionHeading align="left" title="Deja de administrar tu clan a mano." />

      <p className="mt-6 max-w-[680px] text-sm leading-relaxed text-[var(--muted)]">
        Hoy la información de tu clan hace este recorrido antes de servirte para algo:
      </p>
      <p className="mt-2 max-w-[680px] [font-family:'JetBrains_Mono',monospace] text-sm font-semibold leading-relaxed text-[var(--text)]">
        Discord, WeChat o Telegram → capturas de pantalla → Google Sheets → fórmulas que entiende uno
        solo → mensajes sueltos → cifras que ya no coinciden
      </p>
      <p className="mt-4 max-w-[680px] text-sm leading-relaxed text-[var(--muted)]">
        Y no es solo el tiempo. Es la captura que llega tarde y te obliga a rehacer todo. Es el reparto
        que salió a ojo y ahora tienes que explicar por qué a uno le tocó más. Es el reclamo en el chat a
        las dos de la mañana. Administrar un clan termina sintiéndose como un segundo trabajo — uno que
        nadie te paga y que encima te saca del juego.
      </p>
      <p className="mt-3 max-w-[680px] text-sm leading-relaxed text-[var(--text)]">
        Guild Core reemplaza ese recorrido entero: lee las capturas, te deja revisar y corregir lo que
        leyó, y con eso ya calcula el corte, el reparto y el ranking.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-[10px] border border-[var(--line)] bg-[var(--surface)]/70 p-6">
          <span
            aria-hidden="true"
            className="gc-linea-roja absolute inset-y-0 left-0 w-[3px]"
          />
          <span className="[font-family:'JetBrains_Mono',monospace] text-[11px] font-bold uppercase tracking-[.15em] text-[var(--danger)]">
            A mano
          </span>
          <p className="mt-1.5 [font-family:'Montserrat',sans-serif] text-base font-black italic tracking-[-.01em] text-[var(--text)]">
            Una tarde entera, y encima alguien se queja.
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {ANTES.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--muted)]">
                <span className="mt-0.5 shrink-0 text-[var(--danger)]" aria-hidden="true">
                  ✕
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-[10px] border border-[var(--accent)]/40 bg-[var(--accent)]/6 p-6">
          <span
            aria-hidden="true"
            className="gc-linea-lima absolute inset-y-0 left-0 w-[3px]"
          />
          <span className="[font-family:'JetBrains_Mono',monospace] text-[11px] font-bold uppercase tracking-[.15em] text-[var(--accent)]">
            Con Guild Core
          </span>
          <p className="mt-1.5 [font-family:'Montserrat',sans-serif] text-base font-black italic tracking-[-.01em] text-[var(--accent)]">
            Subir las capturas, revisar, y a jugar.
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {CON_GUILD_CORE.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--text)]">
                <span className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
