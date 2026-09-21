import { useState, type ReactNode } from "react";
import { LOCALE_TAG } from "../../i18n";
import { useI18n } from "../../i18n/useI18n";
import { cutClass, featuredClass } from "./shared";

// Reconstrucción fiel (y estática) de las pantallas de la app, usando el mismo
// sistema Urban Neon que vive en P:\GC_GB\OCR\.claude\skills\urban-neon-design.
// Reglas que se respetan acá: cifras siempre en JetBrains Mono + tabular-nums,
// títulos en Montserrat black italic, tarjetas de stat con corte de 10px y como
// mucho UNA `featured` (14px + glow) por pantalla.
//
// Las cuatro pantallas siguen a las de la app (OCR/src/pages): Hacienda es el
// detalle de un corte, Jugadores es el Roster, Eventos es War Room y Ranking
// es el ranking del clan con su salón de trofeos.
//
// Los datos son inventados a propósito — no son de ningún clan real.

const MONO = "[font-family:'JetBrains_Mono',monospace]";
const DISP = "[font-family:'Montserrat',sans-serif] font-black italic";
const UNDERLINE = "/ranking/ranking-header-underline.svg";

/** Traducción más formato de números, porcentajes y fechas según el idioma activo. */
function useFmt() {
  const { t, lang } = useI18n();
  const tag = LOCALE_TAG[lang];
  return {
    t,
    tag,
    // useGrouping "always": es-ES no agrupa los números de 4 cifras y se ve desparejo.
    num: (value: number) => value.toLocaleString(tag, { useGrouping: "always" }),
    pct: (value: number) => `${value.toLocaleString(tag, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`,
    dateTime: (date: Date) =>
      new Intl.DateTimeFormat(tag, { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }).format(date),
  };
}

/** Cinta de peligro + título + subrayado, como la cabecera de cada página de la app. */
function PageHeader({ eyebrow, title }: { eyebrow?: string; title: ReactNode }) {
  return (
    <div className="mb-5">
      <div
        aria-hidden="true"
        className="gc-cinta-viva mb-2.5 h-[10px] max-w-[300px] [background:repeating-linear-gradient(45deg,var(--accent)_0_12px,var(--bg)_12px_24px)]"
      />
      {eyebrow && (
        <span className={`${MONO} text-[10px] font-semibold uppercase tracking-[.17em] text-[var(--muted)]`}>
          {eyebrow}
        </span>
      )}
      <h3 className={`${DISP} mt-1.5 text-xl tracking-[-.02em] sm:text-2xl`}>{title}</h3>
      <img aria-hidden="true" alt="" src={UNDERLINE} className="mt-2 h-auto max-w-[260px]" />
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
  small = false,
  children,
}: {
  label: string;
  value?: string;
  hint?: string;
  icon?: string;
  iconTone?: Tone;
  tone?: Tone;
  featured?: boolean;
  small?: boolean;
  children?: ReactNode;
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
      {value !== undefined && (
        <div
          className={`${MONO} mt-1 font-bold tabular-nums ${small ? "truncate text-base sm:text-lg" : "text-xl sm:text-2xl"} ${TONE_CLASS[tone]}`}
        >
          {value}
        </div>
      )}
      {hint && <div className="mt-1 text-[11px] text-[var(--muted)]">{hint}</div>}
      {children}
    </div>
  );
}

function TableShell({ head, children, footer }: { head: ReactNode; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="mt-4 overflow-hidden rounded-[7px] border border-[var(--line)] bg-[var(--surface)]/92">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="bg-[var(--surface-raised)]">{head}</thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {footer}
    </div>
  );
}

// children es opcional: la columna del chevron lleva una cabecera vacía.
function Th({
  children,
  align = "left",
  sortable = false,
}: {
  children?: ReactNode;
  align?: "left" | "right" | "center";
  sortable?: boolean;
}) {
  return (
    <th
      scope="col"
      className={`${MONO} whitespace-nowrap px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[.14em] text-[var(--muted)] ${
        align === "right" ? "text-right" : align === "center" ? "text-center" : ""
      }`}
    >
      {children}
      {sortable && (
        <span aria-hidden="true" className="ml-1 opacity-60">
          ↕
        </span>
      )}
    </th>
  );
}

function Td({
  children,
  num = false,
  tone = "text",
  align,
  className = "",
}: {
  children?: ReactNode;
  num?: boolean;
  tone?: Tone;
  align?: "center";
  className?: string;
}) {
  return (
    <td
      className={`whitespace-nowrap px-3 py-2.5 text-[13px] ${
        num ? `${MONO} text-right tabular-nums ${TONE_CLASS[tone]}` : "text-[var(--text)]"
      } ${align === "center" ? "text-center" : ""} ${className}`}
    >
      {children}
    </td>
  );
}

function Row({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <tr className={`border-t border-[var(--line)] transition duration-150 hover:bg-[var(--surface-raised)] ${className}`}>
      {children}
    </tr>
  );
}

/** Cuadro de búsqueda (solo visual: en la landing no filtra). */
function SearchBox({ placeholder }: { placeholder: string }) {
  return (
    <div className="mt-4 max-w-[280px] rounded-[6px] border border-[var(--line)] bg-[var(--surface)]/92 px-3 py-2 text-[12px] text-[var(--muted)]">
      {placeholder}
    </div>
  );
}

/** Botón de la app dibujado como <span>: no hace nada, la pantalla es una vista previa. */
function GhostButton({
  children,
  tone = "muted",
  active = false,
}: {
  children: ReactNode;
  tone?: "muted" | "danger" | "text";
  active?: boolean;
}) {
  const color =
    tone === "danger"
      ? "border-[var(--danger)]/50 text-[var(--danger)]"
      : tone === "text"
        ? "border-[var(--line)] text-[var(--text)]"
        : "border-[var(--line)] text-[var(--muted)]";
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-[6px] border px-3 py-1.5 text-[11px] ${
        active ? "border-[var(--accent)] bg-[var(--accent)] font-bold text-[#1c2200]" : color
      }`}
    >
      {children}
    </span>
  );
}

/** Píldora con color: tags de la tabla (congelado, alter, no participa…). */
function Tag({ children, color, title }: { children: ReactNode; color: string; title?: string }) {
  return (
    <span
      title={title}
      className={`ml-2 inline-block whitespace-nowrap rounded-[3px] border px-1.5 py-px align-middle text-[10px] font-bold uppercase tracking-[.06em] ${color}`}
    >
      {children}
    </span>
  );
}

const TAG_DANGER = "border-[var(--danger)]/60 text-[var(--danger)]";
const TAG_GOLD = "border-[var(--accent-gold)]/60 text-[var(--accent-gold)]";
const TAG_ICE = "border-[#6ec1ff]/60 bg-[#6ec1ff]/10 text-[#6ec1ff]";
const TAG_PURPLE = "border-[var(--accent-purple)]/60 bg-[var(--accent-purple)]/10 text-[var(--accent-purple)]";

/** Paginador de la app (estático): la tabla de ejemplo solo muestra la primera página. */
function PaginationBar({ pages }: { pages: number }) {
  return (
    <div className={`${MONO} flex items-center justify-end gap-3 border-t border-[var(--line)] px-3 py-2 text-[11px] text-[var(--muted)]`}>
      <span aria-hidden="true">‹</span>
      <span className="tabular-nums">1 / {pages}</span>
      <span aria-hidden="true">›</span>
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 shrink-0 text-[var(--accent)]" aria-hidden="true">
      <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M1.8 8h12.4M8 1.8c1.8 1.9 2.7 4 2.7 6.2S9.8 12.3 8 14.2C6.2 12.3 5.3 10.2 5.3 8S6.2 3.7 8 1.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/** Panel de "link público" que usan Hacienda y Ranking en la app. */
function PublicLinkBar({
  title,
  live,
  url,
  actions,
}: {
  title: string;
  live?: string;
  url: string;
  actions: ReactNode;
}) {
  return (
    <div className={`${cutClass} mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border border-[var(--line)] bg-[var(--surface)]/92 px-3.5 py-2.5`}>
      <GlobeIcon />
      <span className={`${MONO} text-[10px] font-semibold uppercase tracking-[.14em] text-[var(--muted)]`}>{title}</span>
      {live && (
        <span className={`${MONO} inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[.12em] text-[var(--accent)]`}>
          <span aria-hidden="true" className="gc-punto size-1.5 rounded-full bg-[var(--accent)]" />
          {live}
        </span>
      )}
      <span className={`${MONO} min-w-0 flex-1 truncate text-[11px] text-[var(--text)]`}>{url}</span>
      <span className="flex flex-wrap gap-1.5">{actions}</span>
    </div>
  );
}

/* --------------------------------- Clases --------------------------------- */

type Clase = "berserker" | "arquero" | "caballeria";

const CLASE_META: Record<Clase, { labelKey: string; icon: string }> = {
  berserker: { labelKey: "screens.ranking.berserker", icon: "/ranking/icon-class-berserker.svg" },
  arquero: { labelKey: "screens.ranking.archer", icon: "/ranking/icon-class-archer.svg" },
  caballeria: { labelKey: "screens.ranking.cavalry", icon: "/ranking/icon-class-cavalry.svg" },
};

function ClaseTag({ clase }: { clase: Clase | null }) {
  const { t } = useI18n();
  if (!clase) return <span className="text-[12px] text-[var(--muted)]">—</span>;
  const meta = CLASE_META[clase];
  return (
    <span className={`${MONO} inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[.08em] text-[var(--text)]`}>
      <img src={meta.icon} alt="" aria-hidden="true" className="size-3" />
      {t(meta.labelKey)}
    </span>
  );
}

/* ------------------------------- Hacienda ------------------------------- */

/** Casilla "pagado", igual que el Checkbox de la app: 18px, esquina cortada. */
function PagadoBox({ checked }: { checked: boolean }) {
  const { t } = useI18n();
  return (
    <span
      role="img"
      aria-label={checked ? t("screens.hacienda.paid") : t("screens.hacienda.unpaid")}
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
  { key: "points", peso: "50%" },
  { key: "casualties", peso: "20%" },
  { key: "kills", peso: "30%" },
] as const;

type Blacklist = "cashback_only" | "blocked";

interface FilaReparto {
  jugador: string;
  donado: number;
  cashback: number;
  reparto: number;
  bono: number;
  pagado: boolean;
  frozen?: boolean;
  blacklist?: Blacklist;
}

// Reparto de ejemplo. Los nombres son inventados y distintos de los del
// ranking, a propósito: son dos pantallas distintas de la misma demo. El
// total de cada fila es cashback + reparto + bono, como en la app.
const REPARTO: FilaReparto[] = [
  { jugador: "VORTEX", donado: 62400, cashback: 43680, reparto: 7900, bono: 0, pagado: false },
  { jugador: "AKIRA_V", donado: 41200, cashback: 28840, reparto: 6450, bono: 2500, pagado: true },
  { jugador: "RENKO", donado: 33750, cashback: 23625, reparto: 5900, bono: 0, pagado: true },
  { jugador: "ǂ¥ЖΩ", donado: 9800, cashback: 6860, reparto: 0, bono: 0, pagado: false, frozen: true },
  { jugador: "SOLARA", donado: 24100, cashback: 16870, reparto: 5240, bono: 2500, pagado: true },
  { jugador: "NOX_TRADE", donado: 12500, cashback: 8750, reparto: 0, bono: 0, pagado: true, blacklist: "cashback_only" },
  { jugador: "HEXEN", donado: 18600, cashback: 13020, reparto: 4480, bono: 0, pagado: true },
];

export function HaciendaScreen() {
  const { t, num, dateTime } = useFmt();

  return (
    <div>
      <span className={`${MONO} text-[10px] text-[var(--accent)] underline underline-offset-4`}>
        {t("screens.hacienda.back")}
      </span>

      <div className="mb-4 mt-3">
        <div
          aria-hidden="true"
          className="gc-cinta-viva mb-2.5 h-[10px] max-w-[340px] [background:repeating-linear-gradient(45deg,var(--accent)_0_12px,var(--bg)_12px_24px)]"
        />
        <h3 className={`${DISP} text-lg tracking-[-.02em] sm:text-xl`}>
          {dateTime(new Date(2026, 7, 27, 0, 21))} — {dateTime(new Date(2026, 8, 9, 1, 29))}
        </h3>
        <img aria-hidden="true" alt="" src={UNDERLINE} className="mt-2 h-auto max-w-[240px]" />
        <p className="mt-2 text-[12px] text-[var(--muted)]">{t("screens.hacienda.summary", { pct: 70 })}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className={`${MONO} text-[10px] font-semibold uppercase tracking-[.16em] text-[var(--text)]`}>
          {t("screens.hacienda.criteria")}
        </span>
        {CRITERIOS.map((criterio) => (
          <span
            key={criterio.key}
            className={`${MONO} rounded-[5px] border border-[var(--line)] bg-[var(--surface-raised)] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[.1em] text-[var(--muted)]`}
          >
            {t(`screens.common.${criterio.key}`)} <span className="text-[var(--accent)]">{criterio.peso}</span>
          </span>
        ))}
        {/* Regla de bajas por tier de tropa: solo aparece si algún tier no está al 100%. */}
        <span
          className={`${MONO} rounded-[5px] border border-[var(--line)] bg-[var(--surface-raised)] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[.1em] text-[var(--muted)]`}
        >
          {t("screens.hacienda.deathsByTroop")}: <span className="text-[var(--accent)]">T6 100% · T5 80% · ≤T4 50%</span>
        </span>
      </div>

      <PublicLinkBar
        title={t("screens.hacienda.shareTitle")}
        live={t("screens.hacienda.live")}
        url="guildcore.app/s/k7Qx2mVd9R"
        actions={
          <>
            <GhostButton tone="text">{t("screens.hacienda.copy")}</GhostButton>
            <GhostButton>{t("screens.hacienda.unshare")}</GhostButton>
          </>
        }
      />

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label={t("screens.common.donated")} value={num(248500)} icon="/icons/svg/icon-coins.svg" tone="text" />
        <StatCard label={t("screens.common.cashback")} value={num(173950)} icon="/icons/svg/icon-gem.svg" tone="text" />
        <StatCard label={t("screens.hacienda.reserved")} value={num(20000)} icon="/icons/svg/icon-badge.svg" tone="text" />
        <StatCard
          label={t("screens.hacienda.distributed")}
          value={num(54550)}
          icon="/icons/svg/icon-trophy.svg"
          tone="accent"
          featured
        />
      </div>

      <SearchBox placeholder={t("screens.common.search")} />

      <TableShell
        head={
          <tr>
            <Th>{t("screens.common.player")}</Th>
            <Th align="center" sortable>{t("screens.common.donated")}</Th>
            <Th align="center" sortable>{t("screens.common.cashback")}</Th>
            <Th align="center" sortable>{t("screens.hacienda.thShare")}</Th>
            <Th align="center" sortable>{t("screens.hacienda.thBonus")}</Th>
            <Th align="center" sortable>{t("screens.hacienda.thPaid")}</Th>
            <Th align="center" sortable>{t("screens.hacienda.thTotal")}</Th>
          </tr>
        }
        footer={<PaginationBar pages={18} />}
      >
        {REPARTO.map((row) => {
          const total = row.cashback + row.reparto + row.bono;
          return (
            <Row key={row.jugador}>
              <Td>
                <span className={`${DISP} text-[13px] tracking-[-.01em]`}>{row.jugador}</span>
                {row.frozen && (
                  <Tag color={TAG_ICE} title={t("screens.hacienda.frozenHint")}>
                    ❄ {t("screens.hacienda.frozen")}
                  </Tag>
                )}
                {row.blacklist && (
                  <Tag color={row.blacklist === "blocked" ? TAG_DANGER : TAG_GOLD}>
                    {row.blacklist === "blocked"
                      ? t("screens.hacienda.blacklistBlocked")
                      : t("screens.hacienda.blacklistCashback")}
                  </Tag>
                )}
              </Td>
              <Td num tone="text">{num(row.donado)}</Td>
              <Td num tone="purple">{num(row.cashback)}</Td>
              <Td num tone="text">{num(row.reparto)}</Td>
              <Td num tone={row.bono > 0 ? "gold" : "text"}>{num(row.bono)}</Td>
              <Td align="center">
                <PagadoBox checked={row.pagado} />
              </Td>
              <Td num tone="accent">
                <span className="inline-flex items-center gap-1.5">
                  {num(total)} {t("screens.common.gold")}
                  <span title={t("screens.hacienda.copyTotal")}>
                    <CopyIcon />
                  </span>
                </span>
              </Td>
            </Row>
          );
        })}
      </TableShell>

      <p className="mt-3 text-[11px] leading-relaxed text-[var(--muted)]">{t("screens.hacienda.note")}</p>
    </div>
  );
}

/* ------------------------------- Jugadores ------------------------------ */

/** Chip de rango del roster: R5…R1, la corona del líder, o guión cuando no tiene asignado. */
function RangoChip({ rango }: { rango: "leader" | string | null }) {
  const { t } = useI18n();
  if (!rango) return <span className="text-[var(--muted)]">—</span>;
  const leader = rango === "leader";
  return (
    <span
      className={`${MONO} inline-flex items-center justify-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-[.08em] ${
        leader
          ? "border-[var(--accent-gold)]/60 bg-[var(--accent-gold)]/10 text-[var(--accent-gold)]"
          : "border-[var(--line)] bg-[var(--surface-raised)] text-[var(--text)]"
      }`}
    >
      {leader && <img src="/icons/svg/icon-crown.svg" alt="" aria-hidden="true" className="size-3" />}
      {leader ? t("screens.jugadores.leader") : rango}
    </span>
  );
}

interface FilaRoster {
  id: string;
  nombre: string;
  rango: string | null;
  poder: number;
  altOf?: string;
  leaving?: boolean;
}

const ROSTER: FilaRoster[] = [
  { id: "9000000101", nombre: "Omen", rango: "leader", poder: 352155344 },
  { id: "9000000102", nombre: "Drakken", rango: "R4", poder: 310714417 },
  { id: "9000000103", nombre: "Seira", rango: "R3", poder: 294581643 },
  { id: "9000000104", nombre: "Orbyt", rango: "R3", poder: 232465313, leaving: true },
  { id: "9000000105", nombre: "Muro_77", rango: null, poder: 305424501 },
  { id: "9000000111", nombre: "Kaito_alt", rango: "R1", poder: 118220604, altOf: "Drakken" },
];

export function JugadoresScreen() {
  const { t, num } = useFmt();

  // Poder del clan y migraciones pendientes, como en el resumen de la app.
  const currentPower = 48216774302;
  const incoming = 1204331907;
  const outgoing = 655890112;
  const net = incoming - outgoing;
  const projected = currentPower + net;

  return (
    <div>
      <PageHeader eyebrow={t("screens.jugadores.eyebrow")} title={t("screens.jugadores.title")} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard small label={t("screens.jugadores.currentPower")} value={num(currentPower)} tone="text" />
        <StatCard small label={t("screens.jugadores.incoming")} value={`+${num(incoming)}`} tone="accent" />
        <StatCard small label={t("screens.jugadores.outgoing")} value={`-${num(outgoing)}`} tone="blood" />
        <StatCard small label={t("screens.jugadores.net")} value={`${net >= 0 ? "+" : "-"}${num(Math.abs(net))}`} tone="accent" />
        <StatCard small label={t("screens.jugadores.projected")} value={num(projected)} tone="purple" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <GhostButton active>{t("screens.jugadores.viewPlayers")}</GhostButton>
        <GhostButton>{t("screens.jugadores.viewMigrations")}</GhostButton>
        <GhostButton>{t("screens.jugadores.viewHistory")}</GhostButton>
      </div>

      <div className="mt-4 grid max-w-[380px] grid-cols-2 gap-3">
        <StatCard label={t("screens.jugadores.addedToday")} value="6" tone="accent" />
        <StatCard label={t("screens.jugadores.thisMonth")} value="41" tone="purple" />
      </div>

      <SearchBox placeholder={t("screens.jugadores.searchName")} />

      <TableShell
        head={
          <tr>
            <Th>{t("screens.jugadores.thId")}</Th>
            <Th sortable>{t("screens.jugadores.thRank")}</Th>
            <Th sortable>{t("screens.jugadores.thName")}</Th>
            <Th sortable>{t("screens.common.power")}</Th>
            <Th />
          </tr>
        }
        footer={<PaginationBar pages={10} />}
      >
        {ROSTER.map((row) => (
          <Row key={row.id}>
            <Td className={`${MONO} text-[12px] tabular-nums text-[var(--muted)]`}>{row.id}</Td>
            <Td>
              <RangoChip rango={row.rango} />
            </Td>
            <Td>
              <strong className="text-sm">{row.nombre}</strong>
              {row.altOf && <Tag color={TAG_PURPLE}>{t("screens.jugadores.altOf", { name: row.altOf.toUpperCase() })}</Tag>}
              {row.leaving && (
                <span className="ml-2 rounded-full border border-[var(--danger)]/50 px-2 py-0.5 text-[11px] text-[var(--danger)]">
                  {t("screens.jugadores.leaving")}
                </span>
              )}
            </Td>
            <Td>
              <span className={`${MONO} text-[13px] font-bold tabular-nums text-[var(--accent)]`}>{num(row.poder)}</span>
            </Td>
            <Td>
              <div className="flex justify-center gap-1.5">
                <GhostButton>{t("screens.common.edit")}</GhostButton>
                <GhostButton>{t("screens.jugadores.scheduleDeparture")}</GhostButton>
                <GhostButton tone="danger">{t("screens.common.delete")}</GhostButton>
              </div>
            </Td>
          </Row>
        ))}
      </TableShell>

      <p className="mt-3 text-[11px] leading-relaxed text-[var(--muted)]">{t("screens.jugadores.note")}</p>
    </div>
  );
}

/* -------------------------------- Eventos ------------------------------- */

interface FilaWarRoom {
  id: string;
  nombre: string;
  clase: Clase;
  tropa: string;
  runa: "ok" | "bad";
  poder: number;
  pts: number;
  ka: number;
  kd: number;
  bajas: number;
  review?: boolean;
  absent?: boolean;
}

const WARROOM: FilaWarRoom[] = [
  { id: "9000000101", nombre: "Omen", clase: "berserker", tropa: "T6", runa: "ok", poder: 352155344, pts: 15.9, ka: 335914694, kd: 388204117, bajas: 11284903 },
  { id: "9000000102", nombre: "Drakken", clase: "arquero", tropa: "T6", runa: "ok", poder: 310714417, pts: 8.1, ka: 465743406, kd: 492426094, bajas: 14860843 },
  { id: "9000000103", nombre: "Seira", clase: "berserker", tropa: "T6", runa: "bad", poder: 294581643, pts: 6.1, ka: 332313655, kd: 352510254, bajas: 6902551 },
  // Contador acumulativo que bajó: la app marca la fila y no calcula su %.
  { id: "9000000104", nombre: "Orbyt", clase: "caballeria", tropa: "T5", runa: "ok", poder: 232465313, pts: 0, ka: 353491570, kd: 172005501, bajas: 9755631, review: true },
  { id: "9000000105", nombre: "Muro_77", clase: "caballeria", tropa: "T6", runa: "ok", poder: 305424501, pts: 0, ka: 0, kd: 0, bajas: 0, absent: true },
];

const FALTAN = ["Vex_Lord", "Ilyra", "Tsubasa", "Nero"];
const NO_PARTICIPAN = ["Muro_77", "Kiro"];

export function WarRoomScreen() {
  const { t, num, pct, dateTime } = useFmt();
  const total = 184;
  const registered = 172;
  const absent = 3;
  const missing = total - registered - absent;

  return (
    <div>
      <PageHeader title={t("screens.warroom.title")} />

      {/* Estado del Valle: verde = en curso con capturas finales cargadas. */}
      <div
        className={`${cutClass} flex flex-wrap items-center justify-between gap-4 border border-[var(--accent)] bg-[var(--surface)]/92 px-5 py-4`}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="gc-punto size-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
            <strong className={`${DISP} text-sm uppercase tracking-[.02em] text-[var(--accent)]`}>
              {t("screens.warroom.statusTitle")} · {t("screens.warroom.event")} #12
            </strong>
          </div>
          <p className="mt-1 text-[13px] text-[var(--muted)]">
            {t("screens.warroom.statusBody", { event: t("screens.warroom.event") })}
          </p>
          <p className={`${MONO} mt-1 text-[11px] text-[var(--muted)]`}>
            {t("screens.warroom.startedAt", { date: dateTime(new Date(2026, 8, 18, 21, 5)) })} ·{" "}
            {t("screens.warroom.counts", { initial: 172, final: 168, ranking: 172 })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className={`${DISP} rounded-[6px] bg-[var(--accent)] px-4 py-2.5 text-[11px] uppercase tracking-[.04em] text-[#1c2200]`}
          >
            {t("screens.warroom.finish")}
          </span>
          <span className={`${DISP} px-2 py-2.5 text-[11px] uppercase tracking-[.04em] text-[var(--muted)]`}>
            {t("screens.warroom.scan")}
          </span>
          <span className={`${DISP} px-2 py-2.5 text-[11px] uppercase tracking-[.04em] text-[var(--muted)]`}>
            {t("screens.warroom.rivals")}
          </span>
          <span
            className={`${DISP} rounded-[6px] bg-[var(--accent-dim)] px-4 py-2.5 text-[11px] uppercase tracking-[.04em] text-[#1c2200]`}
          >
            {t("screens.warroom.register")}
          </span>
        </div>
      </div>

      {/* Cobertura del roster: quién ya tiene medición en este Valle. */}
      <div className={`${cutClass} mt-4 flex flex-col gap-3 border border-[var(--line)] bg-[var(--surface)]/92 px-5 py-4`}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h4 className={`${DISP} text-lg uppercase tracking-[-.01em]`}>{t("screens.warroom.coverageTitle")}</h4>
            <p className="mt-0.5 text-[13px] text-[var(--muted)]">
              {t("screens.warroom.registered")}{" "}
              <strong className={`${MONO} tabular-nums text-[var(--text)]`}>
                {num(registered)} / {num(total)}
              </strong>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`${MONO} inline-flex items-center rounded-full border border-[var(--accent-gold)] px-3 py-1 text-[11px] font-bold tabular-nums text-[var(--accent-gold)]`}
            >
              {t("screens.warroom.missing", { count: missing })}
            </span>
            <span className={`${MONO} rounded-full border border-[var(--line)] px-3 py-1 text-[11px] tabular-nums text-[var(--muted)]`}>
              {t("screens.warroom.absent", { count: absent })}
            </span>
          </div>
        </div>
        <div className="flex h-2 overflow-hidden rounded-full bg-[var(--surface-raised)]" aria-hidden="true">
          <span className="h-full bg-[var(--accent)]" style={{ width: `${(registered / total) * 100}%` }} />
          <span className="h-full bg-[var(--muted)] opacity-45" style={{ width: `${(absent / total) * 100}%` }} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FALTAN.map((name) => (
            <span
              key={name}
              title={t("screens.warroom.missingTag")}
              className="rounded-full border border-[var(--accent-gold)]/50 bg-[var(--accent-gold)]/5 px-2.5 py-0.5 text-[11px] text-[var(--accent-gold)]"
            >
              {name}
            </span>
          ))}
          {NO_PARTICIPAN.map((name) => (
            <span
              key={name}
              title={t("screens.warroom.absentTag")}
              className="rounded-full border border-[var(--danger)]/50 bg-[var(--danger)]/5 px-2.5 py-0.5 text-[11px] text-[var(--danger)]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label={t("screens.common.totalPoints")}
          value={num(7836139872)}
          icon="/icons/svg/icon-trophy.svg"
          iconTone="gold"
          tone="text"
        />
        <StatCard
          label={t("screens.common.totalCasualties")}
          value={num(15218171)}
          icon="/icons/svg/icon-skull.svg"
          iconTone="blood"
          tone="text"
        />
        <StatCard
          label={t("screens.common.totalKills")}
          value={num(338102720)}
          icon="/icons/svg/icon-sword.svg"
          iconTone="accent"
          tone="text"
        />
        {/* Historial contra reinos: el winrate del clan frente a cada reino. */}
        <StatCard label={t("screens.warroom.rivalsCardTitle")} value={pct(83.3)} tone="accent">
          <span
            className={`${MONO} mt-2 inline-block text-[9px] uppercase tracking-[.12em] text-[var(--accent)] underline underline-offset-4`}
          >
            {t("screens.warroom.viewAll")}
          </span>
        </StatCard>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="min-w-[200px] flex-1 rounded-[6px] border border-[var(--line)] bg-[var(--surface)]/92 px-3 py-2 text-[12px] text-[var(--muted)]">
          {t("screens.common.search")}
        </span>
        <span className={`${MONO} text-[10px] font-semibold uppercase tracking-[.14em] text-[var(--text)]`}>
          {t("screens.warroom.showColumns")}
        </span>
      </div>

      <p
        role="status"
        className="mt-3 rounded-[6px] border border-[var(--accent-gold)]/50 bg-[var(--accent-gold)]/5 px-3 py-2 text-[12px] leading-relaxed text-[var(--accent-gold)]"
      >
        {t("screens.warroom.needsReview")}
      </p>

      <TableShell
        head={
          <tr>
            <Th>{t("screens.warroom.thId")}</Th>
            <Th>{t("screens.common.player")}</Th>
            <Th>{t("screens.common.class")}</Th>
            <Th>{t("screens.common.troop")}</Th>
            <Th align="center">{t("screens.warroom.thRune")}</Th>
            <Th align="right">{t("screens.common.power")}</Th>
            <Th align="right">{t("screens.warroom.thPct")}</Th>
            <Th align="right">{t("screens.warroom.killsBefore")}</Th>
            <Th align="right">{t("screens.warroom.killsAfter")}</Th>
            <Th align="right">{t("screens.common.casualties")}</Th>
          </tr>
        }
      >
        {WARROOM.map((row) => (
          <Row
            key={row.id}
            className={
              row.review ? "bg-[var(--accent-gold)]/8 shadow-[inset_3px_0_0_var(--accent-gold)]" : row.absent ? "opacity-60" : ""
            }
          >
            <Td className={`${MONO} text-[12px] tabular-nums text-[var(--muted)]`}>{row.id}</Td>
            <Td>
              {row.nombre}
              {row.review && <Tag color={TAG_GOLD}>⚠ {t("screens.warroom.review")}</Tag>}
              {row.absent && <Tag color={TAG_DANGER}>{t("screens.warroom.absentTag")}</Tag>}
            </Td>
            <Td>
              <ClaseTag clase={row.clase} />
            </Td>
            <Td className={`${MONO} text-[12px] text-[var(--muted)]`}>{row.tropa}</Td>
            <Td align="center">
              {row.runa === "ok" ? (
                <span className="text-[12px] font-bold text-[var(--accent)]" title={t("screens.warroom.runeOk")}>
                  ✓
                </span>
              ) : (
                <span className="text-[12px] font-bold text-[var(--danger)]" title={t("screens.warroom.runeBad")}>
                  ✕
                </span>
              )}
            </Td>
            <Td num tone="accent">{num(row.poder)}</Td>
            <Td num tone="purple">{row.absent || row.review ? "—" : pct(row.pts)}</Td>
            <Td num tone="blood">{row.absent ? "—" : num(row.ka)}</Td>
            <Td num tone="blood">{row.absent ? "—" : num(row.kd)}</Td>
            <Td num tone="text">{row.absent ? "—" : num(row.bajas)}</Td>
          </Row>
        ))}
      </TableShell>

      <p className="mt-3 text-[11px] leading-relaxed text-[var(--muted)]">{t("screens.warroom.note")}</p>
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
type Alcance = "event" | "global";

// `labelKey` es una clave de screens.common.* (las métricas comparten texto
// con las columnas de las otras pantallas).
const METRICAS: { key: Metrica; labelKey: string }[] = [
  { key: "puntos", labelKey: "screens.common.points" },
  { key: "kills", labelKey: "screens.common.kills" },
  { key: "bajas", labelKey: "screens.common.casualties" },
];

const FILTROS_CLASE: (Clase | "todas")[] = ["todas", "berserker", "arquero", "caballeria"];

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
  /** Valles finalizados en los que participó: alimenta la vista Global. */
  valles: number;
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
// Poder, puntos, kills y bajas salen de las capturas de las tres métricas;
// solo se cambiaron nombres e IDs.
const JUGADORES: JugadorDemo[] = [
  { nombre: "OMEN", id: "9000000101", clase: "berserker", tropa: "T6", emote: "emote-gaming", poder: 352155344, puntos: 1247624584, kills: 388204117, bajas: 11284903, killsEvento: 52289423, bajasEvento: 811008, valles: 12 },
  { nombre: "DRAKKEN", id: "9000000102", clase: "arquero", tropa: "T6", emote: "emote-cool", poder: 310714417, puntos: 634795951, kills: 492426094, bajas: 14860843, killsEvento: 26682688, bajasEvento: 689482, valles: 12 },
  { nombre: "SEIRA", id: "9000000103", clase: null, tropa: "T6", emote: "emote-fangs", poder: 294581643, puntos: 479544771, kills: 352510254, bajas: 6902551, killsEvento: 20196599, bajasEvento: 677735, valles: 11 },
  { nombre: "ORBYT", id: "9000000104", clase: "caballeria", tropa: "T6", emote: "emote-grin", poder: 232465313, puntos: 424786478, kills: 372005501, bajas: 9755631, killsEvento: 18513931, bajasEvento: 657637, valles: 12 },
  { nombre: "MURO_77", id: "9000000105", clase: "caballeria", tropa: "T6", emote: "emote-hood-03", poder: 305424501, puntos: 412445023, kills: 245416743, bajas: 8846404, killsEvento: 17135266, bajasEvento: 647345, valles: 9 },
  { nombre: "KAI", id: "9000000106", clase: "arquero", tropa: "T6", emote: "emote-happy", poder: 323844672, puntos: 406952920, kills: 442881940, bajas: 15112315, killsEvento: 16796395, bajasEvento: 788380, valles: 10 },
  { nombre: "LYRA", id: "9000000107", clase: "berserker", tropa: "T6", emote: "emote-wink", poder: 321074981, puntos: 381588389, kills: 574578982, bajas: 8920507, killsEvento: 15514687, bajasEvento: 638204, valles: 8 },
  { nombre: "TOSHI", id: "9000000108", clase: "berserker", tropa: "T6", emote: "emote-thinking", poder: 336946065, puntos: 352117640, kills: 222161839, bajas: 5210338, killsEvento: 11939297, bajasEvento: 792321, valles: 12 },
  { nombre: "VEX", id: "9000000109", clase: "berserker", tropa: "T6", emote: "emote-laugh", poder: 311774318, puntos: 331904882, kills: 158051384, bajas: 6444689, killsEvento: 10842115, bajasEvento: 714537, valles: 7 },
  { nombre: "NOX", id: "9000000110", clase: null, tropa: "T6", emote: "emote-shock", poder: 257434204, puntos: 318220155, kills: 141410946, bajas: 5952960, killsEvento: 9617430, bajasEvento: 702333, valles: 12 },
];

const PODIO_ESTILO = [
  { frame: "top1", borde: "border-[var(--accent)]", cifra: "text-[var(--accent)]" },
  { frame: "top2", borde: "border-[var(--accent-purple)]", cifra: "text-[var(--accent-purple)]" },
  { frame: "top3", borde: "border-[var(--accent-gold)]", cifra: "text-[var(--accent-gold)]" },
];

/* Salón de trofeos: medallas por terminar en el top 3 de cada Valle cerrado. */

type Puesto = 1 | 2 | 3;

const MEDAL_COLORS: Record<Puesto, { fill: string; shade: string }> = {
  1: { fill: "#ffb800", shade: "#a86f00" },
  2: { fill: "#d5dae2", shade: "#858c97" },
  3: { fill: "#d98a45", shade: "#8a4d1d" },
};

const MEDAL_NAME: Record<Puesto, string> = { 1: "gold", 2: "silver", 3: "bronze" };

/** Medalla con cinta, del color del puesto. */
function Medal({ place, size = 16 }: { place: Puesto; size?: number }) {
  const { fill, shade } = MEDAL_COLORS[place];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 2h4l2 6H9z" fill={shade} />
      <path d="M13 2h4l-2 6h-4z" fill={fill} opacity=".85" />
      <circle cx="12" cy="15" r="7" fill={fill} stroke={shade} strokeWidth="1.5" />
      <text x="12" y="18.2" textAnchor="middle" fontSize="8.5" fontWeight="800" fill={shade} fontFamily="JetBrains Mono, monospace">
        {place}
      </text>
    </svg>
  );
}

interface FilaTrofeo {
  nombre: string;
  medallas: [number, number, number];
  /** Racha vigente en el mismo puesto; solo se muestra si son 2 o más. */
  racha?: { count: number; place: Puesto };
}

const SALON: { key: string; labelKey: string; tone: Tone; rows: FilaTrofeo[] }[] = [
  {
    key: "points",
    labelKey: "screens.common.points",
    tone: "accent",
    rows: [
      { nombre: "OMEN", medallas: [6, 2, 1], racha: { count: 3, place: 1 } },
      { nombre: "DRAKKEN", medallas: [3, 4, 2] },
      { nombre: "SEIRA", medallas: [1, 2, 3] },
    ],
  },
  {
    key: "kills",
    labelKey: "screens.common.kills",
    tone: "gold",
    rows: [
      { nombre: "LYRA", medallas: [5, 1, 2], racha: { count: 2, place: 1 } },
      { nombre: "DRAKKEN", medallas: [4, 3, 1] },
      { nombre: "KAI", medallas: [2, 2, 2] },
    ],
  },
  {
    key: "deaths",
    labelKey: "screens.common.casualties",
    tone: "purple",
    rows: [
      { nombre: "KAI", medallas: [4, 3, 0] },
      { nombre: "DRAKKEN", medallas: [3, 2, 2], racha: { count: 2, place: 2 } },
      { nombre: "OMEN", medallas: [2, 1, 3] },
    ],
  },
];

function TrophyHall() {
  const { t } = useI18n();
  return (
    <div className="mt-8">
      <h4 className={`${DISP} text-lg tracking-[-.01em]`}>{t("screens.ranking.trophyTitle")}</h4>
      <p className="mt-1 text-[12px] text-[var(--muted)]">{t("screens.ranking.trophyDesc")}</p>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        {SALON.map((categoria) => (
          <div key={categoria.key} className={`${cutClass} border border-[var(--line)] bg-[var(--surface)]/92 p-4`}>
            <div className={`${MONO} text-[10px] font-semibold uppercase tracking-[.15em] ${TONE_CLASS[categoria.tone]}`}>
              {t(categoria.labelKey)}
            </div>
            <ul className="mt-3 flex flex-col gap-3">
              {categoria.rows.map((fila) => (
                <li key={fila.nombre}>
                  <div className={`${DISP} text-[13px] tracking-[-.01em]`}>{fila.nombre}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {([1, 2, 3] as const).map((place) => (
                      <span
                        key={place}
                        title={t(`screens.ranking.${MEDAL_NAME[place]}`)}
                        className={`inline-flex items-center gap-1 ${fila.medallas[place - 1] === 0 ? "opacity-35" : ""}`}
                      >
                        <Medal place={place} />
                        <b className={`${MONO} text-[12px] tabular-nums`}>{fila.medallas[place - 1]}</b>
                      </span>
                    ))}
                    {fila.racha && fila.racha.count >= 2 && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[var(--accent-gold)]/50 px-2 py-0.5 text-[10px] font-bold text-[var(--accent-gold)]">
                        🔥 {t("screens.ranking.streak", { count: fila.racha.count, place: fila.racha.place })}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RankingScreen() {
  const { t, num: n } = useFmt();
  const [metrica, setMetrica] = useState<Metrica>("puntos");
  const [clase, setClase] = useState<Clase | "todas">("todas");
  const [alcance, setAlcance] = useState<Alcance>("event");

  const campo = CAMPO_METRICA[metrica];
  const filtrados = JUGADORES.filter((jugador) => clase === "todas" || jugador.clase === clase);
  const ordenados = [...filtrados].sort((a, b) => b[campo] - a[campo]);
  const total = ordenados.reduce((suma, jugador) => suma + jugador[campo], 0);

  // El podio se muestra en orden 02 · 01 · 03, como en la app.
  const top = ordenados.slice(0, 3);
  const podio = [top[1], top[0], top[2]].filter(Boolean);
  const resto = ordenados.slice(3);

  const metricaLabel = t(METRICAS.find((entry) => entry.key === metrica)?.labelKey ?? "");
  const tone = METRICA_TONE[metrica];

  // Vista global: acumulado de todos los Valles finalizados de cada jugador.
  const acumulado = (jugador: JugadorDemo) => jugador[campo] * jugador.valles;
  const globales = [...filtrados].sort((a, b) => acumulado(b) - acumulado(a));

  return (
    <div>
      {/* Cabecera propia del ranking: nombre del clan + kicker con trofeo */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
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
              {t("screens.ranking.kicker")}
            </span>
          </div>
          <img aria-hidden="true" alt="" src={UNDERLINE} className="mt-2 h-auto max-w-[220px]" />
        </div>

        <span
          className={`${MONO} rounded-full border border-[var(--line)] px-3 py-1.5 text-[10px] text-[var(--muted)]`}
        >
          {t("screens.ranking.updated", { h: 2 })}
        </span>
      </div>

      <PublicLinkBar
        title={t("screens.ranking.live")}
        url="guildcore.app/r/9Hf3TqLw2A"
        actions={<GhostButton>{t("screens.hacienda.unshare")}</GhostButton>}
      />

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label={t("screens.common.totalPoints")}
          value={n(ordenados.reduce((s, j) => s + j.puntos, 0))}
          icon="/icons/svg/icon-trophy.svg"
          tone="accent"
        />
        {/* Marcador de victorias y derrotas, con su historial */}
        <StatCard label={t("screens.ranking.winsLosses")}>
          <div className={`${MONO} mt-1 flex items-baseline gap-2 text-2xl font-bold tabular-nums`}>
            <span className="text-[var(--accent)]">10</span>
            <span className="text-[var(--muted)]">–</span>
            <span className="text-[var(--danger)]">2</span>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <span
              className={`${MONO} rounded-[5px] border border-[var(--accent)]/50 px-2 py-1 text-[9px] uppercase tracking-[.1em] text-[var(--accent)]`}
            >
              {t("screens.ranking.addWin")}
            </span>
            <span
              className={`${MONO} rounded-[5px] border border-[var(--danger)]/50 px-2 py-1 text-[9px] uppercase tracking-[.1em] text-[var(--danger)]`}
            >
              {t("screens.ranking.addLoss")}
            </span>
          </div>
          <span
            className={`${MONO} mt-2 inline-block text-[9px] uppercase tracking-[.12em] text-[var(--accent)] underline underline-offset-4`}
          >
            {t("screens.ranking.history")}
          </span>
        </StatCard>
        <StatCard
          label={t("screens.common.totalKills")}
          value={n(ordenados.reduce((s, j) => s + j.kills, 0))}
          icon="/icons/svg/icon-sword.svg"
          tone="gold"
        />
        <StatCard
          label={t("screens.common.totalCasualties")}
          value={n(ordenados.reduce((s, j) => s + j.bajas, 0))}
          icon="/icons/svg/icon-skull.svg"
          tone="purple"
        />
      </div>

      {/* Filtros — acá sí funcionan: cambian la métrica, el alcance y filtran por clase. */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="min-w-[150px] flex-1 rounded-[6px] border border-[var(--line)] bg-[var(--surface)]/92 px-3 py-2 text-[12px] text-[var(--muted)]">
          {t("screens.ranking.searchPlayerId")}
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
            {t(entry.labelKey)}
          </button>
        ))}
        <span aria-hidden="true" className="mx-1 h-5 w-px bg-[var(--line)]" />
        {(["event", "global"] as const).map((valor) => (
          <button
            key={valor}
            type="button"
            aria-pressed={alcance === valor}
            onClick={() => setAlcance(valor)}
            className={`${MONO} cursor-pointer rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.1em] transition duration-150 ${
              alcance === valor
                ? "border-[var(--accent-purple)] bg-[var(--accent-purple)]/12 text-[var(--accent-purple)]"
                : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            {valor === "event" ? t("screens.ranking.byEvent") : t("screens.ranking.global")}
          </button>
        ))}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className={`${MONO} text-[10px] uppercase tracking-[.14em] text-[var(--muted)]`}>
          {t("screens.ranking.classFilter")}
        </span>
        {FILTROS_CLASE.map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={clase === key}
            onClick={() => setClase(key)}
            className={`${MONO} inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.1em] transition duration-150 ${
              clase === key
                ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            {key !== "todas" && (
              <img src={CLASE_META[key].icon} alt="" aria-hidden="true" className="size-2.5" />
            )}
            {key === "todas" ? t("screens.ranking.all") : t(CLASE_META[key].labelKey)}
          </button>
        ))}
      </div>

      {ordenados.length === 0 ? (
        <p className="mt-8 text-center text-sm text-[var(--muted)]">{t("screens.ranking.empty")}</p>
      ) : alcance === "global" ? (
        <>
          <TableShell
            head={
              <tr>
                <Th>#</Th>
                <Th>{t("screens.common.player")}</Th>
                <Th>{t("screens.ranking.thClass")}</Th>
                <Th align="right">{t("screens.ranking.thValleys")}</Th>
                <Th align="right">{metricaLabel}</Th>
              </tr>
            }
          >
            {globales.map((entry, index) => (
              <Row key={entry.id}>
                <Td num tone="text">
                  #{index + 1}
                </Td>
                <Td>
                  <span className="flex items-center gap-2.5">
                    <Avatar frame={index < 3 ? PODIO_ESTILO[index].frame : "default"} emote={entry.emote} size={30} />
                    <span className="flex flex-col">
                      <span className={`${DISP} text-[13px] tracking-[-.01em]`}>{entry.nombre}</span>
                      <span className={`${MONO} text-[10px] tabular-nums text-[var(--muted)]`}>ID {entry.id}</span>
                    </span>
                  </span>
                </Td>
                <Td>
                  <ClaseTag clase={entry.clase} />
                </Td>
                <Td num tone="text">{entry.valles}</Td>
                <Td num tone={tone}>{n(acumulado(entry))}</Td>
              </Row>
            ))}
          </TableShell>
          <p className="mt-2 text-[11px] text-[var(--muted)]">{t("screens.ranking.globalNote", { count: 12 })}</p>
        </>
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
                  <h4 className={`${DISP} mt-2 text-sm tracking-[-.01em] sm:text-base`}>{entry.nombre}</h4>
                  <div className={`${MONO} text-[10px] tabular-nums text-[var(--muted)]`}>ID {entry.id}</div>
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
                        {t(CLASE_META[entry.clase].labelKey)}
                      </span>
                    )}
                    <span
                      className={`${MONO} rounded-full border border-[var(--line)] px-2 py-0.5 text-[9px] uppercase tracking-[.1em] text-[var(--muted)]`}
                    >
                      {t("screens.ranking.troop")} {entry.tropa}
                    </span>
                  </div>
                  <div className={`${MONO} mt-3 text-[9px] uppercase tracking-[.16em] text-[var(--muted)]`}>
                    {metricaLabel}
                  </div>
                  <div className={`${MONO} text-base font-bold tabular-nums sm:text-lg ${estilo.cifra}`}>
                    {n(entry[campo])}
                  </div>
                  <div className={`${MONO} mt-1 text-[10px] uppercase tabular-nums text-[var(--muted)]`}>
                    {t("screens.common.power")} {n(entry.poder)}
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
                  <Th>{t("screens.common.player")}</Th>
                  <Th>{t("screens.ranking.thClass")}</Th>
                  <Th>{t("screens.ranking.troop")}</Th>
                  <Th align="right">{metricaLabel}</Th>
                  <Th align="right">%</Th>
                  <Th align="right">{t("screens.common.kills")}</Th>
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
                        <span className={`${MONO} text-[10px] tabular-nums text-[var(--muted)]`}>ID {entry.id}</span>
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
                      <img src="/ranking/rank-change-up.svg" alt="" aria-hidden="true" className="size-2.5" />
                      {total > 0 ? `+${((entry[campo] / total) * 100).toFixed(2)}%` : "—"}
                    </span>
                  </Td>
                  <Td num tone="text">
                    {n(entry.kills)}
                  </Td>
                  <Td>
                    <img src="/ranking/ranking-chevron.svg" alt="" aria-hidden="true" className="size-3 opacity-60" />
                  </Td>
                </Row>
              ))}
            </TableShell>
          )}
        </>
      )}

      <TrophyHall />

      <p className="mt-4 text-[11px] leading-relaxed text-[var(--muted)]">{t("screens.ranking.note")}</p>
    </div>
  );
}
