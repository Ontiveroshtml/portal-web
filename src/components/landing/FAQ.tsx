import { useState } from "react";
import { SectionHeading } from "./shared";

// Orden por objeción, no por tema: primero lo que frena una decisión (qué es,
// si funciona de verdad, qué pasa si falla, dónde quedan mis datos, cuánto
// cuesta) y recién al final lo que todavía no existe.
const FAQ_ITEMS = [
  {
    icono: "/icons/svg/icon-crown.svg",
    q: "¿Qué es Guild Core?",
    a: "Una app web para administrar un clan de FateWar. Reúne en un solo lugar el oro y las donaciones, los repartos del corte, los datos de cada evento y los rankings, para que no tengas que llevar todo eso en planillas y mensajes sueltos.",
  },
  {
    icono: "/icons/svg/icon-badge.svg",
    q: "¿Qué quiere decir que “lee las capturas solas”?",
    a: "Que en vez de copiar los números a mano, subes el screenshot del juego y nuestro sistema de lectura ubica cada dato dentro de la imagen —nombre, poder, puntos, kills y bajas— y lo carga solo. Está armado sobre el esquema de las pantallas de FateWar, así que sabe dónde buscar cada valor en vez de adivinar.",
  },
  {
    icono: "/icons/svg/icon-shield.svg",
    q: "¿Y si la lectura automática se equivoca?",
    a: "La corriges tú, y por eso el paso de revisión existe. Nada se guarda directo: la app te muestra lo que leyó para que lo confirmes, y marca solo los valores que no cierran para que los mires. Cualquier dato se puede editar a mano, y queda registrado si vino de la lectura automática o de una corrección tuya, con quién lo cambió y cuándo.",
  },
  {
    icono: "/icons/svg/icon-users.svg",
    q: "¿Qué pasa con los nombres raros, con símbolos o en otro alfabeto?",
    a: "Es el caso difícil y está contemplado. Guild Core compara lo leído contra tu roster tolerando símbolos decorativos, tags del clan y acentos, y cuando una lectura queda ambigua entre dos jugadores parecidos prefiere no adivinar y la deja para revisar. Una vez que confirmas a quién corresponde una grafía, la recuerda para las próximas capturas.",
  },
  {
    icono: "/icons/svg/icon-book.svg",
    q: "¿Dónde quedan los datos de mi clan y quién puede verlos?",
    a: "Los datos viven en la cuenta de tu clan y solo los ve quien tiene acceso a ese clan dentro de la app. Nada es público hasta que tú generas un link para compartir, y ese link lo cortas cuando quieras. Las capturas se usan para extraer los números y el registro de cada cambio queda asociado a quién lo hizo.",
  },
  {
    icono: "/icons/svg/icon-coins.svg",
    q: "¿Cómo se calcula el reparto del oro?",
    a: "Tú pones las reglas: cada cuánto cierra el corte, qué porcentaje de cashback lleva cada donante, si hay un mínimo para cobrarlo y cuánto queda reservado en tesorería. Lo que sobra se divide en partes iguales o según el rendimiento en el evento, ponderando puntos, bajas y kills con el peso que tú elijas. El cálculo cierra exacto, sin oro perdido por redondeo.",
  },
  {
    icono: "/icons/svg/icon-trophy.svg",
    q: "¿Quiénes pueden ver el ranking y la hacienda?",
    a: "Los dos se comparten con un link público, y quien lo recibe no necesita cuenta ni registrarse: abre el link y ve. El del ranking muestra el podio y la tabla del evento; el del corte de hacienda muestra cuánto donó cada uno y cuánto le tocó del reparto. Tú decides cuándo generar cada link y a quién se lo pasas.",
  },
  {
    icono: "/icons/svg/icon-shop.svg",
    q: "¿Cuánto sale según el tamaño de mi clan?",
    a: "El precio va por tramos de jugadores: hay uno para clanes de 1 a 100 y otro de 101 a 200, dentro del plan que elijas. Un clan chico entra sin problema — no hay mínimo de miembros.",
  },
  {
    icono: "/icons/svg/icon-chart.svg",
    q: "¿Cuál es la diferencia entre Management e Intelligence?",
    a: "Management cubre la gestión diaria del clan: hacienda, donaciones, cortes y roster. Intelligence agrega la parte de eventos — WarRoom completo, lectura automática de las capturas de batalla con su revisión, y el análisis de rendimiento que alimenta el reparto por desempeño.",
  },
  {
    icono: "/icons/svg/decal-gamepad.svg",
    q: "¿Tengo que instalar algo?",
    a: "No. Guild Core corre en el navegador, en la computadora o en el celular. Solo necesitas tu cuenta y las capturas del juego.",
  },
  {
    icono: "/icons/svg/icon-mail.svg",
    q: "¿Cómo pido ayuda si algo no funciona?",
    a: "El soporte lo damos por Discord. Nos escribes por ahí y te respondemos: dudas de configuración, una captura que no se leyó bien, un corte que no cierra, lo que sea.",
  },
  {
    icono: "/icons/svg/icon-settings.svg",
    q: "¿Necesito Discord para usarlo?",
    a: "No. Hoy todo se maneja desde la app web y no hace falta configurar ningún bot. La integración con Discord está en desarrollo y va a sumarse más adelante.",
  },
  {
    icono: "/icons/svg/icon-gem.svg",
    q: "¿Qué viene después?",
    a: "Tres cosas, y están detalladas en el roadmap: la integración con Discord, Clan Pool para que varios miembros paguen una misma suscripción, y la inteligencia del Valle — promedio de victorias contra cada rival, ficha por clan enemigo o aliado con los enfrentamientos anteriores y sus horarios, notas del equipo después de cada evento, planificador de estrategia y alertas. Del lado del jugador vienen herramientas propias como Líder Supremo, Runas y Banda de guerra, con simulaciones para probar una implementación antes de gastar recursos.",
  },
  {
    icono: "/icons/svg/icon-sword.svg",
    q: "¿Qué juegos son compatibles?",
    a: "Guild Core está pensado para FateWar, con foco en sistemas de clanes, eventos y gestión de recursos.",
  },
];

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
  return (
    <section id="faq" className="mx-auto w-[min(900px,calc(100%-40px))] py-[70px]">
      <SectionHeading eyebrow="FAQ" title="Preguntas frecuentes" />
      <div className="mt-10">
        {FAQ_ITEMS.map((item) => (
          <FaqItem key={item.q} q={item.q} a={item.a} icono={item.icono} />
        ))}
      </div>
    </section>
  );
}
