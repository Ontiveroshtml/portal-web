# backgrounds/ — vacio a proposito

En `design-01` y `design-02` no existe ninguna imagen de fondo reutilizable.
Lo que parece fondo es (a) el degradado de la propia lamina de presentacion y
(b) el halo de glow de cada sticker. Extraerlo produciria un asset que no
pertenece al producto.

El fondo del design system se implementa en CSS:

```css
:root { --surface: #131315; }

body {
  background-color: var(--surface);
  background-image:
    radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px);
  background-size: 6px 6px;   /* halftone al 5% */
}
```

Para los degradados morados/verdes de las composiciones usa
`radial-gradient(circle at 30% 20%, #8D59FD33, transparent 60%)` sobre la
superficie base.
