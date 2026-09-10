import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// Sistema de animación de la landing. Todo vive acá para tener un solo lugar
// donde subir o bajar la intensidad, y para que los @keyframes se declaren una
// sola vez en la página (van dentro de <EstilosAnimacion />, montado en App).
//
// Dos reglas que se respetan en todo el archivo:
//  1. Nada se mueve más de ~16px ni dura más de ~1.5s. La animación acompaña
//     la lectura, no la interrumpe.
//  2. Todo se apaga con `prefers-reduced-motion`, y el contenido queda visible.
//     Si el navegador no soporta IntersectionObserver, se muestra todo de una.

/**
 * Marca `visible` en true la primera vez que el elemento entra en pantalla.
 * No vuelve a false: una vez que apareció, se queda — reanimar al scrollear
 * para arriba marea y se nota como truco.
 */
export function useEnPantalla<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((entrada) => entrada.isIntersecting)) {
          setVisible(true);
          observador.disconnect();
        }
      },
      // El margen negativo abajo hace que dispare cuando la sección ya entró
      // de verdad, no apenas asoma un pixel.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  return { ref, visible };
}

/** Envoltorio que hace aparecer su contenido al entrar en pantalla. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useEnPantalla<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`gc-reveal ${visible ? "gc-reveal-on" : ""} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Cuenta de 0 al objetivo cuando `activo` se pone en true. Se usa para los
 * números del roadmap: un número que sube se mira, uno que ya está no.
 */
export function useContador(objetivo: number, activo: boolean, duracion = 1200) {
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (!activo) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce || objetivo === 0) {
      setValor(objetivo);
      return;
    }

    let frame = 0;
    const inicio = performance.now();

    const paso = (ahora: number) => {
      const t = Math.min(1, (ahora - inicio) / duracion);
      // easeOutCubic: arranca rápido y frena al final, que es como se lee bien.
      const eased = 1 - Math.pow(1 - t, 3);
      setValor(Math.round(objetivo * eased));
      if (t < 1) frame = requestAnimationFrame(paso);
    };

    frame = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(frame);
  }, [objetivo, activo, duracion]);

  return valor;
}

/**
 * Todos los @keyframes de la página. Se monta una sola vez desde App.tsx.
 * Va como <style> en el árbol y no en index.css a propósito: mantiene la
 * animación junto al código que la usa y evita tocar el CSS global.
 */
export function EstilosAnimacion() {
  return (
    <style>{`
      /* --- Aparición al entrar en pantalla ------------------------------- */
      /* Termina en "transform: none" (y no en translateY(0)) para no dejar un
         containing block que rompa los position:fixed de adentro, como el
         modal de checkout. */
      @keyframes gc-reveal-in {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: none; }
      }
      .gc-reveal { opacity: 0; }
      .gc-reveal-on { animation: gc-reveal-in .62s cubic-bezier(.22,.61,.36,1) both; }

      /* --- Entrada del hero (al cargar, no al scrollear) ----------------- */
      .gc-entrada { animation: gc-reveal-in .7s cubic-bezier(.22,.61,.36,1) both; }

      /* --- Chips de funciones del hero ---------------------------------- */
      @keyframes gc-chip-glow {
        0%, 78%, 100% {
          border-color: var(--line);
          box-shadow: 0 0 0 0 rgba(214, 250, 56, 0);
        }
        12% {
          border-color: rgba(214, 250, 56, .6);
          box-shadow: 0 0 16px -2px rgba(214, 250, 56, .55);
        }
      }
      .gc-chip-glow { animation: gc-chip-glow 6.5s ease-in-out infinite; }

      /* --- Barrido de luz que cruza una tarjeta una sola vez ------------- */
      @keyframes gc-barrido {
        0%   { transform: translateX(-140%) skewX(-18deg); opacity: 0; }
        18%  { opacity: 1; }
        100% { transform: translateX(340%) skewX(-18deg); opacity: 0; }
      }
      .gc-barrido {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 32%;
        pointer-events: none;
        background: linear-gradient(90deg, transparent, rgba(214,250,56,.16), transparent);
        animation: gc-barrido 1.7s ease-out .35s both;
      }

      /* --- Latido del número grande del roadmap ------------------------- */
      @keyframes gc-latido {
        0%, 100% { text-shadow: 0 0 24px rgba(214, 250, 56, .30); }
        50%      { text-shadow: 0 0 44px rgba(214, 250, 56, .70); }
      }
      .gc-latido { animation: gc-latido 3.4s ease-in-out infinite; }

      /* --- Cinta de peligro que se desplaza ----------------------------- */
      @keyframes gc-cinta { to { background-position: 200px 0; } }
      .gc-cinta-viva { animation: gc-cinta 6s linear infinite; }

      /* --- Barras de progreso ------------------------------------------- */
      /* El ancho lo pone React; acá solo se define cómo viaja hasta ahí. */
      .gc-barra { transition: width 1.35s cubic-bezier(.16,1,.3,1); }

      /* --- Botones: brillo al pasar el mouse + respiración del principal --- */
      .gc-boton { position: relative; overflow: hidden; }
      .gc-boton::after {
        content: "";
        position: absolute;
        inset: 0 auto 0 0;
        width: 45%;
        pointer-events: none;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.20), transparent);
        transform: translateX(-180%) skewX(-18deg);
      }
      .gc-boton:hover::after { animation: gc-brillo .8s ease-out; }
      @keyframes gc-brillo { to { transform: translateX(340%) skewX(-18deg); } }

      /* Respira con filter y no con box-shadow: así no pisa los hover:shadow
         que ya tienen los botones. */
      @keyframes gc-respira-lima {
        0%, 100% { filter: drop-shadow(0 0 0 rgba(214,250,56,0)); }
        50%      { filter: drop-shadow(0 0 11px rgba(214,250,56,.45)); }
      }
      .gc-boton-primario { animation: gc-respira-lima 4.5s ease-in-out infinite; }

      /* --- Punto "en vivo" que late (badges de próximamente, luces de ventana) --- */
      @keyframes gc-punto {
        0%, 100% { transform: scale(1);    opacity: .55; }
        50%      { transform: scale(1.45); opacity: 1; }
      }
      .gc-punto { animation: gc-punto 2.4s ease-in-out infinite; }

      /* --- Badge de próximamente: respiración dorada suave --- */
      @keyframes gc-respira-oro {
        0%, 100% {
          border-color: rgba(255,184,0,.35);
          box-shadow: 0 0 0 0 rgba(255,184,0,0);
        }
        50% {
          border-color: rgba(255,184,0,.75);
          box-shadow: 0 0 18px -4px rgba(255,184,0,.45);
        }
      }
      .gc-proximamente { animation: gc-respira-oro 3.2s ease-in-out infinite; }

      /* Igual pero en lima, para el badge de la demo. */
      @keyframes gc-respira-borde-lima {
        0%, 100% {
          border-color: rgba(214,250,56,.4);
          box-shadow: 0 0 0 0 rgba(214,250,56,0);
        }
        50% {
          border-color: rgba(214,250,56,.85);
          box-shadow: 0 0 20px -4px rgba(214,250,56,.45);
        }
      }
      .gc-respira-lima-borde { animation: gc-respira-borde-lima 3.2s ease-in-out infinite; }

      /* --- Tarjetas de funciones: levante y glow al pasar el mouse --- */
      .gc-tarjeta { transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
      .gc-tarjeta:hover { transform: translateY(-3px); }

      /* --- Las dos barras verticales de la sección Problema --------------- */
      /* Cuentan la misma historia que las listas que acompañan: la roja tiene
         una señal que baja a los tropezones y parpadea; la lima baja pareja,
         sin cortes y con un brillo constante. */
      @keyframes gc-senal { to { background-position-y: 175%; } }

      @keyframes gc-titileo {
        0%, 38%, 100% { opacity: 1; }
        44%           { opacity: .35; }
        49%           { opacity: .9; }
        55%           { opacity: .4; }
        61%           { opacity: 1; }
      }

      .gc-linea-roja {
        background:
          linear-gradient(180deg, transparent, rgba(255,190,190,.9), transparent) 0 -75% / 100% 38% no-repeat,
          var(--danger);
        animation:
          gc-senal 4.4s ease-in-out infinite,
          gc-titileo 3.3s ease-in-out infinite;
      }

      .gc-linea-lima {
        background:
          linear-gradient(180deg, transparent, rgba(255,255,255,.95), transparent) 0 -75% / 100% 38% no-repeat,
          var(--accent);
        box-shadow: 0 0 14px -2px var(--accent);
        animation: gc-senal 2.9s linear infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .gc-reveal,
        .gc-reveal-on,
        .gc-entrada {
          opacity: 1 !important;
          animation: none !important;
          transform: none !important;
        }
        .gc-chip-glow,
        .gc-latido,
        .gc-cinta-viva,
        .gc-boton-primario,
        .gc-punto,
        .gc-proximamente,
        .gc-respira-lima-borde,
        .gc-linea-roja,
        .gc-linea-lima { animation: none !important; }
        .gc-boton::after { display: none !important; }
        .gc-tarjeta { transition: none !important; }
        .gc-tarjeta:hover { transform: none !important; }
        .gc-barrido { display: none !important; }
        .gc-barra { transition: none !important; }
      }
    `}</style>
  );
}
