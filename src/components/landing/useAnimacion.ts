import { useEffect, useRef, useState } from "react";

/**
 * Marca `visible` en true la primera vez que el elemento entra en pantalla.
 * No vuelve a false: una vez que apareció, se queda — reanimar al scrollear
 * para arriba marea y se nota como truco.
 */
export function useEnPantalla<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  // Sin IntersectionObserver se muestra todo de una, sin esperar al scroll.
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    if (typeof IntersectionObserver === "undefined") return;

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

/**
 * Cuenta de 0 al objetivo cuando `activo` se pone en true. Se usa para los
 * números del roadmap: un número que sube se mira, uno que ya está no.
 */
export function useContador(objetivo: number, activo: boolean, duracion = 1200) {
  const [valor, setValor] = useState(0);
  const sinAnimar =
    objetivo === 0 ||
    (typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true);

  useEffect(() => {
    if (!activo || sinAnimar) return;

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
  }, [objetivo, activo, duracion, sinAnimar]);

  if (sinAnimar) return activo ? objetivo : 0;
  return valor;
}
