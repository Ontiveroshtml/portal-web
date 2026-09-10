import { cutClass, SectionHeading } from "./shared";

interface Feature {
  number: string;
  icon: string;
  title: string;
  hook: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    number: "01",
    icon: "/icons/svg/icon-coins.svg",
    title: "Hacienda y cortes",
    hook: "El oro del clan se reparte solo, con tus reglas.",
    body: "Vos definís cada cuánto cierra el corte, qué cashback lleva cada donante, si hay un mínimo para cobrarlo y cuánto queda en tesorería. Guild Core hace la cuenta y muestra, jugador por jugador, cuánto donó y cuánto le toca. Cada corte se comparte con un link, así nadie tiene que preguntarte lo suyo.",
  },
  {
    number: "02",
    icon: "/icons/svg/icon-chart.svg",
    title: "Reparto equitativo o por rendimiento",
    hook: "Partes iguales, o premiar al que jugó mejor.",
    body: "El sobrante se divide en partes iguales o por rendimiento, ponderando puntos, bajas y kills con el peso que vos elijas, con tope de jugadores y bono fijo si hace falta. Con Intelligence se cruzan los datos del Valle con los de la hacienda: el oro sigue a lo que cada uno aportó en la guerra. Cada clan reparte distinto — acá se configura, no se impone.",
  },
  {
    number: "03",
    icon: "/icons/svg/icon-badge.svg",
    title: "Las capturas se leen solas",
    hook: "Dejá de copiar números de una imagen.",
    body: "Subís el screenshot y nuestro sistema de lectura ubica cada dato dentro de la imagen: nombre, poder, puntos, kills y bajas. Está hecho a medida de las pantallas de FateWar, por eso resuelve los nombres con símbolos, tags del clan y alfabetos no latinos — justo donde falla cualquier herramienta genérica.",
  },
  {
    number: "04",
    icon: "/icons/svg/icon-shield.svg",
    title: "Segunda verificación y corrección a mano",
    hook: "Si la lectura falla, la arreglás vos en dos clics.",
    body: "Nada se guarda sin que lo mires: la app muestra lo que leyó y marca sola lo que no cierra, como un contador que baja o un cero imposible. Todo se edita a mano, y queda registrado si el dato vino de la lectura o de una corrección tuya, con quién lo tocó y cuándo. Si reescaneás una captura ya confirmada, te avisa antes de pisarla.",
  },
  {
    number: "05",
    icon: "/icons/svg/icon-sword.svg",
    title: "WarRoom — Valle de los Espíritus",
    hook: "Todo el evento en una sola tabla.",
    body: "El WarRoom es la pantalla del Valle: poder, puntos, kills y bajas de cada jugador antes y después, el porcentaje que aportó al total del clan, más clase, tropa, runa y artefacto. Son 16 columnas y vos elegís cuáles ver — la app se acuerda para la próxima.",
  },
  {
    number: "06",
    icon: "/icons/svg/icon-trophy.svg",
    title: "Rankings e historial",
    hook: "El ranking que tu clan mira sin pedirte nada.",
    body: "Podio y tabla por evento o acumulado, ordenables por puntos, kills o bajas y filtrables por clase. Tanto el ranking como el corte de hacienda se comparten con un link público, sin cuentas ni registros, mientras vos seguís todo desde el dashboard administrativo. Y queda guardado evento a evento, para ver cómo evolucionó el clan y quién viene creciendo.",
  },
];

export function Funciones() {
  return (
    <section id="funciones" className="mx-auto w-[min(1200px,calc(100%-40px))] py-[70px]">
      <SectionHeading eyebrow="Funciones" title="Todo lo que hoy hacés a mano, automatizado." />

      <p className="mx-auto mt-6 max-w-[620px] text-center text-sm leading-relaxed text-[var(--muted)]">
        Guild Core hace tres cosas, en este orden: lee las capturas de tu clan, te deja verificarlas y
        corregirlas, y recién con esos datos calcula repartos, rankings e historial. Lo que hasta ayer te
        llevaba una tarde entera de planilla.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.number}
            className={`${cutClass} border border-[var(--line)] bg-[var(--surface)]/80 p-6`}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-[8px] bg-[var(--accent)]/10 shadow-[0_0_20px_-8px_rgba(214,250,56,.5)]">
                <img src={feature.icon} alt="" aria-hidden="true" className="size-5" />
              </span>
              <span className="[font-family:'JetBrains_Mono',monospace] text-[11px] font-semibold text-[var(--muted)]">
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

      {/* Lo que todavía no está, separado del grid de arriba para que no se
          lea como si ya funcionara. */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div
          className={`${cutClass} flex flex-col items-start gap-4 border border-[var(--line)] bg-[var(--surface)]/60 p-6 sm:flex-row`}
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
              <span className="rounded-full border border-[var(--accent-gold)]/45 bg-[var(--accent-gold)]/10 px-2.5 py-1 [font-family:'JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[.14em] text-[var(--accent-gold)]">
                Próximamente
              </span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
              Estamos armando un mini sistema dentro de Discord para cargar y consultar los datos del
              clan sin salir del chat donde ya están todos: la idea es recortar otro 30% del tiempo que
              hoy se va en administrar, y que ese tiempo vuelva al juego. Por ahora todo se maneja desde
              la app web, sin configurar ningún bot — pero el{" "}
              <strong className="font-semibold text-[var(--text)]">soporte ya te lo damos por Discord</strong>
              : nos escribís y te respondemos ahí.
            </p>
          </div>
        </div>

        <div
          className={`${cutClass} flex flex-col items-start gap-4 border border-[var(--line)] bg-[var(--surface)]/60 p-6 sm:flex-row`}
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--accent-purple)]/15 shadow-[0_0_20px_-8px_rgba(141,89,253,.7)]">
            <img src="/icons/svg/icon-chart.svg" alt="" aria-hidden="true" className="size-5" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="[font-family:'Montserrat',sans-serif] text-lg font-black italic tracking-[-.01em]">
                Inteligencia del Valle
              </h3>
              <span className="rounded-full border border-[var(--accent-gold)]/45 bg-[var(--accent-gold)]/10 px-2.5 py-1 [font-family:'JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[.14em] text-[var(--accent-gold)]">
                Próximamente
              </span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
              El WarRoom hoy guarda cada evento; lo que viene es que esa historia te sirva para el
              siguiente. Promedio de victorias del clan y contra cada rival, una ficha por clan enemigo o
              aliado con los enfrentamientos anteriores y sus horarios, y las notas que deja tu equipo
              después de cada Valle. Encima de eso, un{" "}
              <strong className="font-semibold text-[var(--text)]">planificador y alertas</strong> para
              organizar la estrategia antes de que arranque el evento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
