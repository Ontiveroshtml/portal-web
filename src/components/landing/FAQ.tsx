import { useState } from "react";
import { SectionHeading } from "./shared";

const FAQ_ITEMS = [
  {
    q: "¿Qué es Guild Core?",
    a: "Una app web para administrar un clan de FateWar. Reúne en un solo lugar el oro y las donaciones, los repartos del corte, los datos de cada evento y los rankings, para que no tengas que llevar todo eso en planillas y mensajes sueltos.",
  },
  {
    q: "¿Qué quiere decir que “lee las capturas solas”?",
    a: "Que en vez de copiar los números a mano, subís el screenshot del juego y nuestro sistema de lectura ubica cada dato dentro de la imagen —nombre, poder, puntos, kills y bajas— y lo carga solo. Está armado sobre el esquema de las pantallas de FateWar, así que sabe dónde buscar cada valor en vez de adivinar.",
  },
  {
    q: "¿Y si la lectura automática se equivoca?",
    a: "Lo corregís vos, y por eso el paso de revisión existe. Nada se guarda directo: la app te muestra lo que leyó para que lo confirmes, y marca sola los valores que no cierran para que los mires. Cualquier dato se puede editar a mano, y queda registrado si vino de la lectura automática o de una corrección tuya, con quién lo cambió y cuándo.",
  },
  {
    q: "¿Qué pasa con los nombres raros, con símbolos o en otro alfabeto?",
    a: "Es el caso difícil y está contemplado. Guild Core compara lo leído contra tu roster tolerando símbolos decorativos, tags del clan y acentos, y cuando una lectura queda ambigua entre dos jugadores parecidos prefiere no adivinar y dejártela para revisar. Una vez que confirmás a quién corresponde una grafía, la recuerda para las próximas capturas.",
  },
  {
    q: "¿Necesito Discord para usarlo?",
    a: "No. Hoy todo se maneja desde la app web y no hace falta configurar ningún bot. La integración con Discord está en desarrollo y va a sumarse más adelante.",
  },
  {
    q: "¿Cómo pido ayuda si algo no funciona?",
    a: "El soporte lo damos por Discord. Nos escribís por ahí y te respondemos: dudas de configuración, una captura que no se leyó bien, un corte que no cierra, lo que sea.",
  },
  {
    q: "¿Hay algo pensado para el jugador y no solo para el líder?",
    a: "Sí, y viene más. Hoy cada jugador puede ver su progreso, sus estadísticas de evento y su posición en el ranking. Estamos preparando planes con herramientas propias del jugador —Líder Supremo, Runas, Banda de guerra y más— donde vas a poder simular cómo progresa tu cuenta y probar una implementación antes de gastar recursos en el juego.",
  },
  {
    q: "¿Cómo se calcula el reparto del oro?",
    a: "Vos ponés las reglas: cada cuánto cierra el corte, qué porcentaje de cashback lleva cada donante, si hay un mínimo para cobrarlo y cuánto queda reservado en tesorería. Lo que sobra se divide en partes iguales o según el rendimiento en el evento, ponderando puntos, bajas y kills con el peso que vos elijas. El cálculo cierra exacto, sin oro perdido por redondeo.",
  },
  {
    q: "¿Quiénes pueden ver el ranking y la hacienda?",
    a: "Los dos se comparten con un link público, y quien lo recibe no necesita cuenta ni registrarse: abre el link y ve. El del ranking muestra el podio y la tabla del evento; el del corte de hacienda muestra cuánto donó cada uno y cuánto le tocó del reparto. Vos decidís cuándo generar cada link y a quién se lo pasás — mientras no lo compartas, esa información solo la ve quien tiene acceso al clan dentro de la app.",
  },
  {
    q: "¿Van a sumar algo para planificar el Valle de los Espíritus?",
    a: "Sí, es lo próximo grande del WarRoom. Hoy la app guarda cada evento; lo que viene es que esa historia te sirva para el siguiente: el promedio de victorias del clan y contra cada rival, una ficha por clan enemigo o aliado con los enfrentamientos anteriores y los horarios en que suelen jugar, y las notas que deja tu equipo después de cada Valle, para que la segunda vez que te cruces con ellos ya sepas cómo jugarles. Encima de eso, un planificador de estrategia y alertas del evento.",
  },
  {
    q: "¿Tengo que instalar algo?",
    a: "No. Guild Core corre en el navegador, en la computadora o en el celular. Solo necesitás tu cuenta y las capturas del juego.",
  },
  {
    q: "¿Puedo usarlo con mi clan aunque tenga menos de 100 jugadores?",
    a: "Sí. El plan Management está disponible para clanes de 1 a 100 jugadores.",
  },
  {
    q: "¿Qué pasa si mi clan tiene entre 101 y 200 jugadores?",
    a: "Usás el precio correspondiente a ese rango dentro del plan que elijas.",
  },
  {
    q: "¿Cuál es la diferencia entre Management e Intelligence?",
    a: "Management cubre la gestión diaria del clan: hacienda, donaciones, cortes y roster. Intelligence agrega la parte de eventos — WarRoom completo, lectura automática de las capturas de batalla con su revisión, y el análisis de rendimiento que alimenta el reparto por desempeño.",
  },
  {
    q: "¿Puedo pagar entre varios miembros?",
    a: "Clan Pool está pensado justamente para eso y va a estar disponible próximamente.",
  },
  {
    q: "¿Qué juegos son compatibles?",
    a: "Guild Core está pensado para FateWar, con foco en sistemas de clanes, eventos y gestión de recursos.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--line)] py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className="[font-family:'Montserrat',sans-serif] text-sm font-black italic tracking-[-.01em] text-[var(--text)]">
          {q}
        </span>
        <span
          className={`shrink-0 text-lg text-[var(--accent)] transition duration-200 ${open ? "rotate-45" : ""}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && <p className="mt-2.5 max-w-[640px] text-sm leading-relaxed text-[var(--muted)]">{a}</p>}
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="mx-auto w-[min(900px,calc(100%-40px))] py-[70px]">
      <SectionHeading eyebrow="FAQ" title="Preguntas frecuentes" />
      <div className="mt-10">
        {FAQ_ITEMS.map((item) => (
          <FaqItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </section>
  );
}
