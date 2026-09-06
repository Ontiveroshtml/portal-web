import { useState } from "react";
import { SectionHeading } from "./shared";

const FAQ_ITEMS = [
  {
    q: "¿Qué es Guild Core?",
    a: "Una plataforma para gestionar clanes, centralizar sus datos y automatizar tareas como tesorería, rangos, WarRoom y reportes de evento.",
  },
  {
    q: "¿Necesito usar Discord?",
    a: "No necesariamente. Guild Core funciona como app web y ofrece integración con Discord para ampliar las herramientas disponibles.",
  },
  {
    q: "¿Cómo verifica Guild Core los datos de evento?",
    a: "El bot lee las screenshots por OCR y confirma que el ID de jugador extraído coincide con el que cada jugador declaró, antes de guardar nada en la base.",
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
    a: "Management cubre la gestión diaria del clan. Intelligence agrega reportes militares con verificación automática por OCR, WarRoom completo y análisis de rendimiento.",
  },
  {
    q: "¿Los jugadores pueden usar Guild Core?",
    a: "Sí. Guild Core también tiene herramientas enfocadas en progreso individual y rankings.",
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
