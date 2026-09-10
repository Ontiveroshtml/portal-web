import { useEnPantalla } from "./animaciones";
import { cutClass, SectionHeading } from "./shared";

type Tono = "accent" | "purple" | "gold";

interface Feature {
  number: string;
  icon: string;
  title: string;
  hook: string;
  body: string;
  tono: Tono;
}

// Cada tarjeta lleva su color: borde, placa del icono, número y cinta superior.
// Se alterna lima / violeta / dorado para que la grilla no se lea como un bloque
// gris, respetando los mismos tokens que usa la app.
const TONO: Record<Tono, { borde: string; placa: string; texto: string; cinta: string; glow: string }> = {
  accent: {
    borde: "border-[var(--accent)]/30 hover:border-[var(--accent)]/70",
    placa: "bg-[var(--accent)]/12 shadow-[0_0_22px_-8px_rgba(214,250,56,.7)]",
    texto: "text-[var(--accent)]",
    cinta: "[background:repeating-linear-gradient(45deg,var(--accent)_0_10px,var(--bg)_10px_20px)]",
    glow: "hover:shadow-[0_10px_34px_-14px_rgba(214,250,56,.55)]",
  },
  purple: {
    borde: "border-[var(--accent-purple)]/30 hover:border-[var(--accent-purple)]/70",
    placa: "bg-[var(--accent-purple)]/14 shadow-[0_0_22px_-8px_rgba(141,89,253,.7)]",
    texto: "text-[var(--accent-purple)]",
    cinta: "[background:repeating-linear-gradient(45deg,var(--accent-purple)_0_10px,var(--bg)_10px_20px)]",
    glow: "hover:shadow-[0_10px_34px_-14px_rgba(141,89,253,.55)]",
  },
  gold: {
    borde: "border-[var(--accent-gold)]/30 hover:border-[var(--accent-gold)]/70",
    placa: "bg-[var(--accent-gold)]/12 shadow-[0_0_22px_-8px_rgba(255,184,0,.7)]",
    texto: "text-[var(--accent-gold)]",
    cinta: "[background:repeating-linear-gradient(45deg,var(--accent-gold)_0_10px,var(--bg)_10px_20px)]",
    glow: "hover:shadow-[0_10px_34px_-14px_rgba(255,184,0,.55)]",
  },
};

const FEATURES: Feature[] = [
  {
    number: "01",
    tono: "accent",
    icon: "/icons/svg/icon-coins.svg",
    title: "Hacienda y cortes",
    hook: "El oro del clan se reparte solo, con tus reglas.",
    body: "Tú defines cada cuánto cierra el corte, qué cashback lleva cada donante, si hay un mínimo para cobrarlo y cuánto queda en tesorería. Guild Core hace la cuenta y muestra, jugador por jugador, cuánto donó y cuánto le toca. Cada corte se comparte con un link, así nadie tiene que preguntarte lo suyo.",
  },
  {
    number: "02",
    tono: "purple",
    icon: "/icons/svg/icon-chart.svg",
    title: "Reparto equitativo o por rendimiento",
    hook: "Partes iguales, o premiar al que jugó mejor.",
    body: "El sobrante se divide en partes iguales o por rendimiento, ponderando puntos, bajas y kills con el peso que tú elijas, con tope de jugadores y bono fijo si hace falta. Con Intelligence se cruzan los datos del Valle con los de la hacienda: el oro sigue a lo que cada uno aportó en la guerra. Cada clan reparte distinto — aquí se configura, no se impone.",
  },
  {
    number: "03",
    tono: "gold",
    icon: "/icons/svg/icon-badge.svg",
    title: "Las capturas se leen solas",
    hook: "Deja de copiar números de una imagen.",
    body: "Subes el screenshot y nuestro sistema de lectura ubica cada dato dentro de la imagen: nombre, poder, puntos, kills y bajas. Está hecho a medida de las pantallas de FateWar, por eso resuelve los nombres con símbolos, tags del clan y alfabetos no latinos — justo donde falla cualquier herramienta genérica.",
  },
  {
    number: "04",
    tono: "accent",
    icon: "/icons/svg/icon-shield.svg",
    title: "Segunda verificación y corrección a mano",
    hook: "Si la lectura falla, la arreglas tú en dos clics.",
    body: "Nada se guarda sin que lo mires: la app muestra lo que leyó y marca sola lo que no cierra, como un contador que baja o un cero imposible. Todo se edita a mano, y queda registrado si el dato vino de la lectura o de una corrección tuya, con quién lo tocó y cuándo. Si reescaneas una captura ya confirmada, te avisa antes de pisarla.",
  },
  {
    number: "05",
    tono: "purple",
    icon: "/icons/svg/icon-sword.svg",
    title: "WarRoom — Valle de los Espíritus",
    hook: "Todo el evento en una sola tabla.",
    body: "El WarRoom es la pantalla del Valle: poder, puntos, kills y bajas de cada jugador antes y después, el porcentaje que aportó al total del clan, más clase, tropa, runa y artefacto. Son 16 columnas y tú eliges cuáles ver — la app se acuerda para la próxima.",
  },
  {
    number: "06",
    tono: "gold",
    icon: "/icons/svg/icon-trophy.svg",
    title: "Rankings e historial",
    hook: "El ranking que tu clan mira sin pedirte nada.",
    body: "Podio y tabla por evento o acumulado, ordenables por puntos, kills o bajas y filtrables por clase. Tanto el ranking como el corte de hacienda se comparten con un link público, sin cuentas ni registros, mientras tú sigues todo desde el dashboard administrativo. Y queda guardado evento a evento, para ver cómo evolucionó el clan y quién viene creciendo.",
  },
];

export function Funciones() {
  // Las seis tarjetas entran escalonadas: todas juntas se leen como un
  // bloque, de a una guían la vista por la grilla.
  const { ref, visible } = useEnPantalla<HTMLDivElement>();

  return (
    <section id="funciones" className="mx-auto w-[min(1200px,calc(100%-40px))] py-[70px]">
      <SectionHeading eyebrow="Funciones" title="Todo lo que hoy haces a mano, automatizado." />

      <p className="mx-auto mt-6 max-w-[620px] text-center text-sm leading-relaxed text-[var(--muted)]">
        Guild Core hace tres cosas, en este orden: lee las capturas de tu clan, te deja verificarlas y
        corregirlas, y recién con esos datos calcula repartos, rankings e historial.
      </p>

      <div ref={ref} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <div
            key={feature.number}
            className={`${cutClass} gc-reveal gc-tarjeta ${visible ? "gc-reveal-on" : ""} relative overflow-hidden border ${TONO[feature.tono].borde} ${TONO[feature.tono].glow} bg-[var(--surface)]/80 p-6`}
            style={{ animationDelay: `${i * 75}ms` }}
          >
            <span
              aria-hidden="true"
              className={`gc-cinta-viva absolute inset-x-0 top-0 h-1 opacity-70 ${TONO[feature.tono].cinta}`}
            />
            <div className="mb-4 mt-1 flex items-center gap-3">
              <span
                className={`grid size-11 place-items-center rounded-[8px] ${TONO[feature.tono].placa}`}
              >
                <img src={feature.icon} alt="" aria-hidden="true" className="size-5" />
              </span>
              <span
                className={`[font-family:'JetBrains_Mono',monospace] text-[11px] font-bold ${TONO[feature.tono].texto}`}
              >
                {feature.number}
              </span>
            </div>
            <h3 className="[font-family:'Montserrat',sans-serif] text-lg font-black italic tracking-[-.01em]">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm font-semibold text-[var(--text)]">{feature.hook}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{feature.body}</p>
          </div>
        ))}
      </div>

      {/* Un solo bloque de "lo que viene" en esta sección: el resto del futuro
          vive en el Roadmap. Discord se queda porque además del roadmap trae
          información del presente — el soporte ya se da ahí. */}
      <div
        className={`${cutClass} mt-5 flex flex-col items-start gap-4 border border-[var(--line)] bg-[var(--surface)]/60 p-6 sm:flex-row`}
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white">
          <svg className="size-5" viewBox="0 0 20 19" aria-hidden="true">
            <use href="/icons.svg#discord-icon" />
          </svg>
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="[font-family:'Montserrat',sans-serif] text-lg font-black italic tracking-[-.01em]">
              Integración con Discord
            </h3>
            <span className="gc-proximamente inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-gold)]/45 bg-[var(--accent-gold)]/10 px-2.5 py-1 [font-family:'JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[.14em] text-[var(--accent-gold)]">
              <span className="gc-punto size-1.5 rounded-full bg-[var(--accent-gold)]" aria-hidden="true" />
              Próximamente
            </span>
          </div>
          <p className="mt-2 max-w-[760px] text-[13px] leading-relaxed text-[var(--muted)]">
            Estamos armando un mini sistema dentro de Discord para cargar y consultar los datos del clan
            sin salir del chat donde ya están todos: la idea es recortar otro 30% del tiempo que hoy se
            va en administrar. Por ahora todo se maneja desde la app web, sin configurar ningún bot —
            pero el <strong className="font-semibold text-[var(--text)]">soporte ya te lo damos por
            Discord</strong>: nos escribes y te respondemos ahí.
          </p>
        </div>
      </div>

    </section>
  );
}
