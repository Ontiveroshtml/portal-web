import { useState, type ReactNode } from "react";
import { cutClass, featuredClass } from "./shared";

// Reconstrucción fiel (y estática) de las pantallas de la app, usando el mismo
// sistema Urban Neon que vive en P:\GC_GB\OCR\.claude\skills\urban-neon-design.
// Reglas que se respetan acá: cifras siempre en JetBrains Mono + tabular-nums,
// títulos en Montserrat black italic, tarjetas de stat con corte de 10px y como
// mucho UNA `featured` (14px + glow) por pantalla.
//
// Los datos son inventados a propósito — no son de ningún clan real.

const MONO = "[font-family:'JetBrains_Mono',monospace]";
const DISP = "[font-family:'Montserrat',sans-serif] font-black italic";

/** Encabezado estándar de página: cinta de peligro + eyebrow + título + subrayado. */
function ScreenHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6">
      <div
        aria-hidden="true"
        className="gc-cinta-viva mb-2.5 h-[10px] max-w-[300px] [background:repeating-linear-gradient(45deg,var(--accent)_0_12px,var(--bg)_12px_24px)]"
      />
      <span className={`${MONO} text-[10px] font-semibold uppercase tracking-[.17em] text-[var(--muted)]`}>
        {eyebrow}
      </span>
      <h3 className={`${DISP} mt-1.5 text-xl tracking-[-.02em] sm:text-2xl`}>{title}</h3>
      <img
        aria-hidden="true"
        alt=""
        src="/ranking/ranking-header-underline.svg"
        className="mt-2 h-auto max-w-[260px]"
      />
    </div>
  );
}

type Tone = "accent" | "purple" | "gold" | "blood" | "text";

const TONE_CLASS: Record<Tone, string> = {
  accent: "text-[var(--accent)]",
  purple: "text-[var(--accent-purple)]",
  gold: "text-[var(--accent-gold)]",
  // Rojo sangre literal: "nuestras bajas", distinto de --danger (error de UI).
  blood: "text-[#B91C1C]",
  text: "text-[var(--text)]",
};

function StatCard({
  label,
  value,
  hint,
  icon,
  iconTone,
  tone = "text",
  featured = false,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: string;
  iconTone?: Tone;
  tone?: Tone;
  featured?: boolean;
}) {
  return (
    <div
      className={`border border-[var(--line)] bg-[var(--surface)]/92 p-4 ${
        featured ? `${featuredClass} border-[var(--accent)]/50` : cutClass
      }`}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className={`mb-2 size-4 ${TONE_CLASS[iconTone ?? tone]}`}
        />
      )}
      <div className={`${MONO} text-[10px] font-semibold uppercase tracking-[.15em] text-[var(--muted)]`}>
        {label}
      </div>
      <div className={`${MONO} mt-1 text-xl font-bold tabular-nums sm:text-2xl ${TONE_CLASS[tone]}`}>
        {value}
      </div>
      {hint && <div className="mt-1 text-[11px] text-[var(--muted)]">{hint}</div>}
    </div>
  );
}

function TableShell({ head, children }: { head: ReactNode; children: ReactNode }) {
  return (
    <div className="mt-5 overflow-hidden rounded-[7px] border border-[var(--line)] bg-[var(--surface)]/92">
      <table className="w-full border-collapse text-left">
        <thead className="bg-[var(--surface-raised)]">{head}</thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Th({ children, align = "left" }: { children: ReactNode; align?: "left" | "right" }) {
  return (
    <th
      scope="col"
      className={`${MONO} whitespace-nowrap px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[.14em] text-[var(--muted)] ${
        align === "right" ? "text-right" : ""
      }`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  num = false,
  tone = "text",
}: {
  children: ReactNode;
  num?: boolean;
  tone?: Tone;
}) {
  return (
    <td
      className={`whitespace-nowrap px-3 py-2.5 text-[13px] ${
        num ? `${MONO} text-right tabular-nums ${TONE_CLASS[tone]}` : "text-[var(--text)]"
      }`}
    >
      {children}
    </td>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <tr className="border-t border-[var(--line)] transition duration-150 hover:bg-[var(--surface-raised)]">{children}</tr>;
}

/* ------------------------------- Hacienda ------------------------------- */

/** Casilla "pagado", igual que el Checkbox de la app: 18px, esquina cortada. */
function PagadoBox({ checked }: { checked: boolean }) {
  return (
    <span
      role="img"
      aria-label={checked ? "Pagado" : "Sin pagar"}
      className={`inline-grid size-[18px] place-items-center border [clip-path:polygon(4px_0,100%_0,100%_calc(100%-4px),calc(100%-4px)_100%,0_100%,0_4px)] ${
        checked
          ? "border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_10px_-2px_var(--accent)]"
          : "border-[var(--line)] bg-[var(--surface-raised)]"
      }`}
    >
      {checked && (
        <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
          <path
            d="M2 6.2 4.6 8.8 10 3.4"
            fill="none"
            stroke="var(--bg)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3 text-[var(--muted)]" aria-hidden="true">
      <rect x="4.5" y="1.5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" />
      <path d="M9.5 12.5h-8v-8" fill="none" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

const CRITERIOS = [
  { label: "Puntos", peso: "50%" },
  { label: "Bajas", peso: "20%" },
  { label: "Kills", peso: "30%" },
];

// Reparto de ejemplo. Los nombres son inventados y distintos de los del
// ranking, a propósito: son dos pantallas distintas de la misma demo.
const REPARTO = [
  { jugador: "VORTEX", donado: 62400, cashback: 43680, reparto: 7900, bono: 0, pagado: false, total: 51580 },
  { jugador: "AKIRA_V", donado: 41200, cashback: 28840, reparto: 6450, bono: 2500, pagado: true, total: 37790 },
  { jugador: "RENKO", donado: 33750, cashback: 23620, reparto: 5900, bono: 0, pagado: true, total: 29520 },
  { jugador: "SOLARA", donado: 24100, cashback: 16870, reparto: 5240, bono: 2500, pagado: true, total: 24610 },
  { jugador: "HEXEN", donado: 18600, cashback: 13020, reparto: 4480, bono: 0, pagado: true, total: 17500 },
];

function miles(value: number): string {
  return value.toLocaleString("es-ES");
}

export function HaciendaScreen() {
  return (
    <div>
      <span className={`${MONO} text-[10px] text-[var(--accent)] underline underline-offset-4`}>
        ← Volver al historial
      </span>

      <div className="mb-5 mt-3">
        <div
          aria-hidden="true"
          className="gc-cinta-viva mb-2.5 h-[10px] max-w-[340px] [background:repeating-linear-gradient(45deg,var(--accent)_0_12px,var(--bg)_12px_24px)]"
        />
        <h3 className={`${DISP} text-lg tracking-[-.02em] sm:text-xl`}>
          27 ago 2026, 0:21 — 9 sept 2026, 1:29
        </h3>
        <img
          aria-hidden="true"
          alt=""
          src="/ranking/ranking-header-underline.svg"
          className="mt-2 h-auto max-w-[240px]"
        />
        <p className="mt-2 text-[12px] text-[var(--muted)]">
          Cashback 70% · Reparto por rendimiento
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className={`${MONO} text-[10px] font-semibold uppercase tracking-[.16em] text-[var(--text)]`}>
          Criterios
        </span>
        {CRITERIOS.map((criterio) => (
          <span
            key={criterio.label}
            className={`${MONO} rounded-[5px] border border-[var(--line)] bg-[var(--surface-raised)] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[.1em] text-[var(--muted)]`}
          >
            {criterio.label} <span className="text-[var(--accent)]">{criterio.peso}</span>
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-[6px] border border-[var(--line)] px-4 py-2 text-[12px] text-[var(--text)]">
          Compartir
        </span>
        <span className="rounded-[6px] border border-[var(--line)] px-4 py-2 text-[12px] text-[var(--muted)]">
          Dejar de compartir
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard label="Donado" value={miles(248500)} icon="/icons/svg/icon-coins.svg" tone="text" />
        <StatCard label="Cashback" value={miles(173950)} icon="/icons/svg/icon-gem.svg" tone="text" />
        <StatCard label="Reservado" value={miles(20000)} icon="/icons/svg/icon-badge.svg" tone="text" />
        <StatCard
          label="Donantes activos"
          value="87"
          hint="de 184 jugadores"
          icon="/icons/svg/icon-users.svg"
          tone="purple"
        />
        <StatCard
          label="Repartido"
          value={miles(54550)}
          icon="/icons/svg/icon-trophy.svg"
          tone="accent"
          featured
        />
      </div>

      <div className="mt-4 max-w-[280px] rounded-[6px] border border-[var(--line)] bg-[var(--surface)]/92 px-3 py-2 text-[12px] text-[var(--muted)]">
        Buscar jugador…
      </div>

      <TableShell
        head={
          <tr>
            <Th>Jugador</Th>
            <Th align="right">Donado</Th>
            <Th align="right">Cashback</Th>
            <Th align="right">Reparto</Th>
            <Th align="right">Bono fijo</Th>
            <Th>Pagado</Th>
            <Th align="right">Total</Th>
          </tr>
        }
      >
        {REPARTO.map((row) => (
          <Row key={row.jugador}>
            <Td>
              <span className={`${DISP} text-[13px] tracking-[-.01em]`}>{row.jugador}</span>
            </Td>
            <Td num tone="text">
              {miles(row.donado)}
            </Td>
            <Td num tone="text">
              {miles(row.cashback)}
            </Td>
            <Td num tone="text">
              {miles(row.reparto)}
            </Td>
            <Td num tone={row.bono > 0 ? "purple" : "text"}>
              {miles(row.bono)}
            </Td>
            <Td>
              <PagadoBox checked={row.pagado} />
            </Td>
            <Td num tone="accent">
              <span className="inline-flex items-center gap-1.5">
                {miles(row.total)} oro
                <CopyIcon />
              </span>
            </Td>
          </Row>
        ))}
      </TableShell>

      <p className="mt-3 text-[11px] leading-relaxed text-[var(--muted)]">
        Top 5 de 87 donantes del corte. Cada fila se marca como pagada cuando entregas el oro, y el total
        se copia de un clic para pegarlo en el chat del clan.
      </p>
    </div>
  );
}

/* ------------------------------- Jugadores ------------------------------ */

/** Chip de rango del roster: R5…R1, o guión cuando no tiene asignado. */
function RangoChip({ rango }: { rango: string | null }) {
  if (!rango) return <span className="text-[var(--muted)]">—</span>;
  return (
    <span
      className={`${MONO} inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-raised)] px-2.5 py-1 text-[10px] font-bold tracking-[.08em] text-[var(--text)]`}
    >
      {rango}
    </span>
  );
}

const ROSTER = [
  { id: "9000000101", nombre: "Omen", rango: "R5", poder: "352.155.344" },
  { id: "9000000102", nombre: "Drakken", rango: "R4", poder: "310.714.417" },
  { id: "9000000103", nombre: "Seira", rango: "R3", poder: "294.581.643" },
  { id: "9000000104", nombre: "Orbyt", rango: "R3", poder: "232.465.313" },
  { id: "9000000105", nombre: "Muro_77", rango: null, poder: "305.424.501" },
];

export function JugadoresScreen() {
  return (
    <div>
      <ScreenHeader eyebrow="Roster" title="Jugadores del clan" />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total del roster" value="184" tone="accent" featured hint="límite del plan: 200" />
        <StatCard label="Agregados hoy" value="6" tone="accent" />
        <StatCard label="Este mes" value="41" tone="purple" />
        <StatCard label="Sin ID declarado" value="3" tone="text" />
      </div>

      <TableShell
        head={
          <tr>
            <Th>ID de juego</Th>
            <Th>Jugador</Th>
            <Th>Rango</Th>
            <Th align="right">Poder</Th>
          </tr>
        }
      >
        {ROSTER.map((row) => (
          <Row key={row.id}>
            <Td num tone="text">
              {row.id}
            </Td>
            <Td>{row.nombre}</Td>
            <Td>
              <RangoChip rango={row.rango} />
            </Td>
            <Td num tone="accent">
              {row.poder}
            </Td>
          </Row>
        ))}
      </TableShell>

      <p className="mt-3 text-[11px] leading-relaxed text-[var(--muted)]">
        El ID de juego es lo que permite cruzar a cada jugador con sus donaciones y sus estadísticas de
        evento, aunque cambie de nombre.
      </p>
    </div>
  );
}

/* -------------------------------- WarRoom ------------------------------- */

const WARROOM = [
  { id: "9000000101", nombre: "Omen", poder: "352.155.344", pts: "15,9%", ka: "335.914.694", kd: "388.204.117", bajas: "11.284.903" },
  { id: "9000000102", nombre: "Drakken", poder: "310.714.417", pts: "8,1%", ka: "465.743.406", kd: "492.426.094", bajas: "14.860.843" },
  { id: "9000000103", nombre: "Seira", poder: "294.581.643", pts: "6,1%", ka: "332.313.655", kd: "352.510.254", bajas: "6.902.551" },
  { id: "9000000104", nombre: "Orbyt", poder: "232.465.313", pts: "5,4%", ka: "353.491.570", kd: "372.005.501", bajas: "9.755.631" },
];

export function WarRoomScreen() {
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div
            aria-hidden="true"
            className="gc-cinta-viva mb-2.5 h-[10px] max-w-[300px] [background:repeating-linear-gradient(45deg,var(--accent)_0_12px,var(--bg)_12px_24px)]"
          />
          <h3 className={`${DISP} text-xl tracking-[-.02em] sm:text-2xl`}>Estadísticas de guerra</h3>
          <img
            aria-hidden="true"
            alt=""
            src="/ranking/ranking-header-underline.svg"
            className="mt-2 h-auto max-w-[240px]"
          />
          <p className="mt-2 text-[12px] text-[var(--muted)]">
            Seleccioná un evento y pulsá Iniciar evento para comenzar las capturas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`${DISP} rounded-[6px] bg-[var(--accent)] px-4 py-2.5 text-[11px] uppercase tracking-[.04em] text-[#1c2200]`}
          >
            Iniciar evento
          </span>
          <span
            className={`${DISP} px-2 py-2.5 text-[11px] uppercase tracking-[.04em] text-[var(--muted)]`}
          >
            Escanear puntos
          </span>
          <span
            className={`${DISP} rounded-[6px] bg-[var(--accent-dim)] px-4 py-2.5 text-[11px] uppercase tracking-[.04em] text-[#1c2200]`}
          >
            Registrar jugador
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Puntos totales"
          value="7.836.139.872"
          icon="/icons/svg/icon-trophy.svg"
          iconTone="gold"
          tone="text"
        />
        <StatCard
          label="Bajas totales"
          value="15.218.171"
          icon="/icons/svg/icon-skull.svg"
          iconTone="blood"
          tone="text"
        />
        <StatCard
          label="Kills totales"
          value="338.102.720"
          icon="/icons/svg/icon-sword.svg"
          iconTone="accent"
          tone="text"
        />

        {/* Marcador de victorias y derrotas del evento */}
        <div className={`${cutClass} border border-[var(--line)] bg-[var(--surface)]/92 p-4`}>
          <div className={`${MONO} text-[10px] font-semibold uppercase tracking-[.15em] text-[var(--muted)]`}>
            Victorias / Derrotas
          </div>
          <div className={`${MONO} mt-1 flex items-baseline gap-2 text-2xl font-bold tabular-nums`}>
            <span className="text-[var(--accent)]">10</span>
            <span className="text-[var(--muted)]">–</span>
            <span className="text-[var(--danger)]">2</span>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <span
              className={`${MONO} rounded-[5px] border border-[var(--line)] px-2 py-1 text-[9px] uppercase tracking-[.1em] text-[var(--muted)]`}
            >
              + Victoria
            </span>
            <span
              className={`${MONO} rounded-[5px] border border-[var(--line)] px-2 py-1 text-[9px] uppercase tracking-[.1em] text-[var(--muted)]`}
            >
              + Derrota
            </span>
          </div>
          <span
            className={`${MONO} mt-2 inline-block text-[9px] uppercase tracking-[.12em] text-[var(--accent)] underline underline-offset-4`}
          >
            Ver historial
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="min-w-[200px] flex-1 rounded-[6px] border border-[var(--line)] bg-[var(--surface)]/92 px-3 py-2 text-[12px] text-[var(--muted)]">
          Buscar jugador…
        </span>
        <span className={`${MONO} text-[10px] font-semibold uppercase tracking-[.14em] text-[var(--text)]`}>
          Mostrar columnas
        </span>
      </div>

      <TableShell
        head={
          <tr>
            <Th>ID</Th>
            <Th>Jugador</Th>
            <Th align="right">Poder</Th>
            <Th align="right">% Puntos</Th>
            <Th align="right">Kills antes</Th>
            <Th align="right">Kills después</Th>
            <Th align="right">Bajas</Th>
          </tr>
        }
      >
        {WARROOM.map((row) => (
          <Row key={row.id}>
            <Td num tone="text">
              {row.id}
            </Td>
            <Td>{row.nombre}</Td>
            <Td num tone="accent">
              {row.poder}
            </Td>
            <Td num tone="purple">
              {row.pts}
            </Td>
            <Td num tone="blood">
              {row.ka}
            </Td>
            <Td num tone="blood">
              {row.kd}
            </Td>
            <Td num tone="text">
              {row.bajas}
            </Td>
          </Row>
        ))}
      </TableShell>

      <p className="mt-3 text-[11px] leading-relaxed text-[var(--muted)]">
        La tabla completa tiene 16 columnas: con “Mostrar columnas” eliges cuáles ver y la app se acuerda
        de tu elección.
      </p>
    </div>
  );
}

/* -------------------------------- Ranking ------------------------------- */

/** Avatar del ranking: el emote del jugador dentro de su marco por puesto. */
function Avatar({ frame, emote, size = 44 }: { frame: string; emote: string; size?: number }) {
  return (
    <span
      className="relative inline-grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
    >
      <img
        src={`/emotes/${emote}.png`}
        alt=""
        aria-hidden="true"
        className="absolute size-[58%] rounded-full object-cover"
      />
      <img
        src={`/ranking/avatar-frame-${frame}.svg`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full"
      />
    </span>
  );
}

type Metrica = "puntos" | "kills" | "bajas";
type Clase = "berserker" | "arquero" | "caballeria";

const METRICAS: { key: Metrica; label: string }[] = [
  { key: "puntos", label: "Puntos" },
  { key: "kills", label: "Kills" },
  { key: "bajas", label: "Bajas" },
];

const CLASE_META: Record<Clase, { label: string; icon: string }> = {
  berserker: { label: "Berserker", icon: "/ranking/icon-class-berserker.svg" },
  arquero: { label: "Arquero", icon: "/ranking/icon-class-archer.svg" },
  caballeria: { label: "Caballería", icon: "/ranking/icon-class-cavalry.svg" },
};

const FILTROS_CLASE: { key: Clase | "todas"; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "berserker", label: "Berserker" },
  { key: "arquero", label: "Arquero" },
  { key: "caballeria", label: "Caballería" },
];

// Cada métrica pinta con su propio color, igual que en la app: puntos con el
// acento, kills en dorado y bajas en violeta.
const METRICA_TONE: Record<Metrica, Tone> = {
  puntos: "accent",
  kills: "gold",
  bajas: "purple",
};

interface JugadorDemo {
  nombre: string;
  id: string;
  clase: Clase | null;
  tropa: string;
  emote: string;
  poder: number;
  puntos: number;
  /** Acumulado histórico — es lo que va en la columna KILLS de la tabla. */
  kills: number;
  /** Acumulado histórico — es lo que va en la columna BAJAS de la tabla. */
  bajas: number;
  /** Ganancia de kills en este evento: es el valor que ordena por "Kills". */
  killsEvento: number;
  /** Ganancia de bajas en este evento: es el valor que ordena por "Bajas". */
  bajasEvento: number;
}

// La métrica elegida no siempre lee el campo homónimo: puntos usa el
// acumulado, pero kills y bajas ordenan por lo ganado en el evento.
const CAMPO_METRICA: Record<Metrica, keyof Pick<JugadorDemo, "puntos" | "killsEvento" | "bajasEvento">> = {
  puntos: "puntos",
  kills: "killsEvento",
  bajas: "bajasEvento",
};

// Datos de ejemplo, inventados, pero en la misma escala que la base real:
// puntos en cientos de millones, poder y kills en cientos de millones, bajas
// en millones. Sirven para que el filtro y las métricas funcionen de verdad.
// Valores tomados uno a uno del ranking real (solo se cambiaron los nombres y
// los IDs). Poder, puntos, kills y bajas son los de la base; la ganancia de
// kills del evento es lo único estimado, porque no hay captura con esa métrica.
// Filas tomadas del ranking real: poder, puntos, kills y bajas —tanto el
// acumulado como lo ganado en el evento— salen de las capturas de las tres
// métricas. Solo se cambiaron nombres e IDs.
const JUGADORES: JugadorDemo[] = [
  { nombre: "OMEN", id: "9000000101", clase: "berserker", tropa: "T6", emote: "emote-gaming", poder: 352155344, puntos: 1247624584, kills: 388204117, bajas: 11284903, killsEvento: 52289423, bajasEvento: 811008 },
  { nombre: "DRAKKEN", id: "9000000102", clase: "arquero", tropa: "T6", emote: "emote-cool", poder: 310714417, puntos: 634795951, kills: 492426094, bajas: 14860843, killsEvento: 26682688, bajasEvento: 689482 },
  { nombre: "SEIRA", id: "9000000103", clase: null, tropa: "T6", emote: "emote-fangs", poder: 294581643, puntos: 479544771, kills: 352510254, bajas: 6902551, killsEvento: 20196599, bajasEvento: 677735 },
  { nombre: "ORBYT", id: "9000000104", clase: "caballeria", tropa: "T6", emote: "emote-grin", poder: 232465313, puntos: 424786478, kills: 372005501, bajas: 9755631, killsEvento: 18513931, bajasEvento: 657637 },
  { nombre: "MURO_77", id: "9000000105", clase: "caballeria", tropa: "T6", emote: "emote-hood-03", poder: 305424501, puntos: 412445023, kills: 245416743, bajas: 8846404, killsEvento: 17135266, bajasEvento: 647345 },
  { nombre: "KAI", id: "9000000106", clase: "arquero", tropa: "T6", emote: "emote-happy", poder: 323844672, puntos: 406952920, kills: 442881940, bajas: 15112315, killsEvento: 16796395, bajasEvento: 788380 },
  { nombre: "LYRA", id: "9000000107", clase: "berserker", tropa: "T6", emote: "emote-wink", poder: 321074981, puntos: 381588389, kills: 574578982, bajas: 8920507, killsEvento: 15514687, bajasEvento: 638204 },
  { nombre: "TOSHI", id: "9000000108", clase: "berserker", tropa: "T6", emote: "emote-thinking", poder: 336946065, puntos: 352117640, kills: 222161839, bajas: 5210338, killsEvento: 11939297, bajasEvento: 792321 },
  { nombre: "VEX", id: "9000000109", clase: "berserker", tropa: "T6", emote: "emote-laugh", poder: 311774318, puntos: 331904882, kills: 158051384, bajas: 6444689, killsEvento: 10842115, bajasEvento: 714537 },
  { nombre: "NOX", id: "9000000110", clase: null, tropa: "T6", emote: "emote-shock", poder: 257434204, puntos: 318220155, kills: 141410946, bajas: 5952960, killsEvento: 9617430, bajasEvento: 702333 },
];

const PODIO_ESTILO = [
  { frame: "top1", borde: "border-[var(--accent)]", cifra: "text-[var(--accent)]" },
  { frame: "top2", borde: "border-[var(--accent-purple)]", cifra: "text-[var(--accent-purple)]" },
  { frame: "top3", borde: "border-[var(--accent-gold)]", cifra: "text-[var(--accent-gold)]" },
];

function n(value: number): string {
  return value.toLocaleString("es-ES");
}

function ClaseTag({ clase }: { clase: Clase | null }) {
  if (!clase) return <span className="text-[12px] text-[var(--muted)]">—</span>;
  const meta = CLASE_META[clase];
  return (
    <span className={`${MONO} inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[.08em] text-[var(--text)]`}>
      <img src={meta.icon} alt="" aria-hidden="true" className="size-3" />
      {meta.label}
    </span>
  );
}

export function RankingScreen() {
  const [metrica, setMetrica] = useState<Metrica>("puntos");
  const [clase, setClase] = useState<Clase | "todas">("todas");

  const campo = CAMPO_METRICA[metrica];
  const filtrados = JUGADORES.filter((jugador) => clase === "todas" || jugador.clase === clase);
  const ordenados = [...filtrados].sort((a, b) => b[campo] - a[campo]);
  const total = ordenados.reduce((suma, jugador) => suma + jugador[campo], 0);

  // El podio se muestra en orden 02 · 01 · 03, como en la app.
  const top = ordenados.slice(0, 3);
  const podio = [top[1], top[0], top[2]].filter(Boolean);
  const resto = ordenados.slice(3);

  const metricaLabel = METRICAS.find((entry) => entry.key === metrica)?.label ?? "";
  const tone = METRICA_TONE[metrica];

  return (
    <div>
      {/* Cabecera propia del ranking: nombre del clan + kicker con trofeo */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div
            aria-hidden="true"
            className="gc-cinta-viva mb-2.5 h-[10px] max-w-[300px] [background:repeating-linear-gradient(45deg,var(--accent)_0_12px,var(--bg)_12px_24px)]"
          />
          <h3 className={`${DISP} text-xl tracking-[-.02em] sm:text-2xl`}>
            CLAN DEMO <span className="text-[var(--accent)]">[GC]</span>
          </h3>
          <div className="mt-1 flex items-center gap-1.5">
            <img
              src="/icons/svg/icon-trophy.svg"
              alt=""
              aria-hidden="true"
              className="size-3.5 opacity-80"
            />
            <span className={`${DISP} text-[13px] tracking-[.04em] text-[var(--accent)]`}>
              RANKING · VALLE DE LOS ESPÍRITUS
            </span>
          </div>
          <img
            aria-hidden="true"
            alt=""
            src="/ranking/ranking-header-underline.svg"
            className="mt-2 h-auto max-w-[220px]"
          />
        </div>

        <span
          className={`${MONO} rounded-full border border-[var(--line)] px-3 py-1.5 text-[10px] text-[var(--muted)]`}
        >
          Actualizado hace 2 h
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard
          label="Puntos totales"
          value={n(ordenados.reduce((s, j) => s + j.puntos, 0))}
          icon="/icons/svg/icon-trophy.svg"
          tone="accent"
        />
        <StatCard
          label="Bajas totales"
          value={n(ordenados.reduce((s, j) => s + j.bajas, 0))}
          icon="/icons/svg/icon-skull.svg"
          tone="purple"
        />
        <StatCard
          label="Kills totales"
          value={n(ordenados.reduce((s, j) => s + j.kills, 0))}
          icon="/icons/svg/icon-sword.svg"
          tone="gold"
        />
      </div>

      {/* Filtros — acá sí funcionan: cambian la métrica y filtran por clase. */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="min-w-[150px] flex-1 rounded-[6px] border border-[var(--line)] bg-[var(--surface)]/92 px-3 py-2 text-[12px] text-[var(--muted)]">
          Buscar operativo o ID en juego…
        </span>
        {METRICAS.map((entry) => (
          <button
            key={entry.key}
            type="button"
            aria-pressed={metrica === entry.key}
            onClick={() => setMetrica(entry.key)}
            className={`${MONO} cursor-pointer rounded-[6px] border px-3 py-2 text-[10px] font-semibold uppercase tracking-[.12em] transition duration-150 ${
              metrica === entry.key
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className={`${MONO} text-[10px] uppercase tracking-[.14em] text-[var(--muted)]`}>
          Clase · Todas las clases
        </span>
        {FILTROS_CLASE.map((entry) => (
          <button
            key={entry.key}
            type="button"
            aria-pressed={clase === entry.key}
            onClick={() => setClase(entry.key)}
            className={`${MONO} inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.1em] transition duration-150 ${
              clase === entry.key
                ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            {entry.key !== "todas" && (
              <img
                src={CLASE_META[entry.key as Clase].icon}
                alt=""
                aria-hidden="true"
                className="size-2.5"
              />
            )}
            {entry.label}
          </button>
        ))}
      </div>

      {ordenados.length === 0 ? (
        <p className="mt-8 text-center text-sm text-[var(--muted)]">
          Ningún jugador de esa clase en este evento.
        </p>
      ) : (
        <>
          {/* Podio 02 · 01 · 03, con el primero elevado */}
          <div className="mt-6 grid grid-cols-3 items-end gap-3">
            {podio.map((entry) => {
              const puesto = ordenados.indexOf(entry) + 1;
              const estilo = PODIO_ESTILO[puesto - 1] ?? PODIO_ESTILO[2];
              const first = puesto === 1;
              return (
                <div
                  key={entry.id}
                  className={`relative flex flex-col items-center border bg-[var(--surface)]/92 px-3 pb-4 text-center ${estilo.borde} ${
                    first ? `${featuredClass} pt-7` : `${cutClass} pt-5`
                  }`}
                >
                  {first && (
                    <img
                      src="/ranking/ranking-crown.svg"
                      alt=""
                      aria-hidden="true"
                      className="absolute -top-3.5 size-7"
                    />
                  )}
                  <span className={`${DISP} absolute left-3 top-2 text-sm text-[var(--muted)]`}>
                    0{puesto}
                  </span>
                  <Avatar frame={estilo.frame} emote={entry.emote} size={first ? 62 : 50} />
                  <h4 className={`${DISP} mt-2 text-sm tracking-[-.01em] sm:text-base`}>
                    {entry.nombre}
                  </h4>
                  <div className={`${MONO} text-[10px] tabular-nums text-[var(--muted)]`}>
                    ID {entry.id}
                  </div>
                  <div className="mt-2 flex flex-wrap justify-center gap-1">
                    {entry.clase && (
                      <span
                        className={`${MONO} inline-flex items-center gap-1 rounded-full border border-[var(--line)] px-2 py-0.5 text-[9px] uppercase tracking-[.1em] text-[var(--muted)]`}
                      >
                        <img
                          src={CLASE_META[entry.clase].icon}
                          alt=""
                          aria-hidden="true"
                          className="size-2.5"
                        />
                        {CLASE_META[entry.clase].label}
                      </span>
                    )}
                    <span
                      className={`${MONO} rounded-full border border-[var(--line)] px-2 py-0.5 text-[9px] uppercase tracking-[.1em] text-[var(--muted)]`}
                    >
                      Tropa {entry.tropa}
                    </span>
                  </div>
                  <div className={`${MONO} mt-3 text-[9px] uppercase tracking-[.16em] text-[var(--muted)]`}>
                    {metricaLabel}
                  </div>
                  <div
                    className={`${MONO} text-base font-bold tabular-nums sm:text-lg ${estilo.cifra}`}
                  >
                    {n(entry[campo])}
                  </div>
                  <div className={`${MONO} mt-1 text-[10px] tabular-nums text-[var(--muted)]`}>
                    PODER {n(entry.poder)}
                  </div>
                </div>
              );
            })}
          </div>

          {resto.length > 0 && (
            <TableShell
              head={
                <tr>
                  <Th>#</Th>
                  <Th>Operativo</Th>
                  <Th>Clase</Th>
                  <Th>Tropa</Th>
                  <Th align="right">{metricaLabel}</Th>
                  <Th align="right">%</Th>
                  <Th align="right">Kills</Th>
                  <Th />
                </tr>
              }
            >
              {resto.map((entry, index) => (
                <Row key={entry.id}>
                  <Td num tone="text">
                    #{index + 4}
                  </Td>
                  <Td>
                    <span className="flex items-center gap-2.5">
                      <Avatar frame="default" emote={entry.emote} size={30} />
                      <span className="flex flex-col">
                        <span className={`${DISP} text-[13px] tracking-[-.01em]`}>{entry.nombre}</span>
                        <span className={`${MONO} text-[10px] tabular-nums text-[var(--muted)]`}>
                          ID {entry.id}
                        </span>
                      </span>
                    </span>
                  </Td>
                  <Td>
                    <ClaseTag clase={entry.clase} />
                  </Td>
                  <Td>
                    <span className={`${MONO} text-[12px] text-[var(--muted)]`}>{entry.tropa}</span>
                  </Td>
                  <Td num tone={tone}>
                    {n(entry[campo])}
                  </Td>
                  <Td num tone="accent">
                    <span className="inline-flex items-center gap-1">
                      <img
                        src="/ranking/rank-change-up.svg"
                        alt=""
                        aria-hidden="true"
                        className="size-2.5"
                      />
                      {total > 0 ? `+${((entry[campo] / total) * 100).toFixed(2)}%` : "—"}
                    </span>
                  </Td>
                  <Td num tone="text">
                    {n(entry.kills)}
                  </Td>
                  <Td>
                    <img
                      src="/ranking/ranking-chevron.svg"
                      alt=""
                      aria-hidden="true"
                      className="size-3 opacity-60"
                    />
                  </Td>
                </Row>
              ))}
            </TableShell>
          )}
        </>
      )}

      <p className="mt-3 text-[11px] leading-relaxed text-[var(--muted)]">
        Prueba los botones: el podio y la tabla se reordenan por puntos, kills o bajas, y se pueden filtrar
        por clase. Esta vista se comparte con un link público, así tu clan la mira sin crear cuenta.
      </p>
    </div>
  );
}
