# RANKING_RESPONSIVE.md — Guild Core

Cómo se transforma el ranking entre breakpoints. La regla de fondo: **no se encoge todo,
se reordena la jerarquía**. Lo que siempre sobrevive es `RANK → AVATAR → NOMBRE → SCORE`.

---

## 1. Breakpoints

| Nombre | Rango | Contenedor |
|---|---|---|
| Desktop | ≥ 1200px | 1440 max, padding 24 |
| Laptop | 900–1199px | fluido, padding 24 |
| Tablet | 600–899px | fluido, padding 16 |
| Mobile | < 600px | fluido, padding 16 |

---

## 2. Fila del leaderboard

**Desktop ≥1180px — 11 columnas**

```
50px  54px    1fr        118px  86px      124px  138px    84px  122px   108px   34px
#   │ AVATAR │ OPERATIVO │ CLASE │ SERVIDOR │ PODER │ PUNTOS │ %   │ KILLS │ BAJAS │ ⌄
```

**Laptop 900–1179px** — caen `PODER` y `BAJAS`, que ya viven en el acordeón:

```css
@media (max-width:1180px){
  .gridcols{grid-template-columns:46px 50px minmax(120px,1fr) 104px 78px 118px 84px 108px 34px;gap:12px}
  .c-poder,.h-poder,.c-bajas,.h-bajas{display:none}
}
```

**Tablet y móvil <900px — 5 columnas, 2 filas**

```
40px    44px     1fr              auto   30px
#     │ AVATAR │ OPERATIVO       │      │ ⌄
                 PUNTOS
```

- Caen `CLASE`, `SERVIDOR`, `KILLS` y `%`: los cuatro están en el acordeón, a un toque.
- `PUNTOS` baja a la segunda línea bajo el nombre — sigue siendo la métrica que ordena.
- La cabecera de columnas se oculta: con dos líneas ya no hace falta.

```css
@media (max-width:900px){
  .bhead{display:none}
  .gridcols{grid-template-columns:40px 44px minmax(0,1fr) auto 30px;gap:10px;row-gap:4px}
  .c-clase,.c-server,.c-kills,.c-pctpuntos{display:none}
  .rpoints{grid-column:3;grid-row:2;text-align:left;font-size:15px}
}
```

**Nunca** ocultes el avatar, el puesto ni el chevron: los dos primeros son el anclaje para
escanear la lista y el tercero es la única pista de que hay más datos debajo.

### 2.1 El acordeón en móvil

El panel pasa de dos columnas a una:

```css
@media (max-width:900px){
  .panel .cols{grid-template-columns:1fr}      /* detalle arriba, historial debajo */
  .kv{grid-template-columns:repeat(2,minmax(0,1fr))}   /* tropa/runa · artefacto/registrado */
}
@media (max-width:600px){
  .ba .line{grid-template-columns:1fr;row-gap:6px}     /* antes→después y % apilados */
}
```

Solo una fila abierta a la vez en móvil: al abrir una, cierra la anterior. En desktop
pueden quedar varias abiertas para comparar.

---

## 3. Top 3

**Desktop / Laptop.** Tres columnas ancladas al SVG del plinto. Las tres tarjetas llevan
`grid-row:1` explícito: sin él, la #2 y la #3 caen a una segunda fila porque el
auto-placement ya pasó de largo su columna. Las columnas y los
márgenes inferiores están calculados sobre `ranking-podium.svg` (960×133):

```css
.podium{position:relative;max-width:1100px;margin:40px auto 0;padding-bottom:3.6%}
.podium-art{position:absolute;left:0;bottom:0;width:100%}
.podium-grid{display:grid;grid-template-columns:31.25% 3.125% 31.25% 3.125% 31.25%;align-items:end}
.pcard.p2{grid-column:1;grid-row:1;margin-bottom:7.3%}   /* escalón izq.,    top y=63 */
.pcard.p1{grid-column:3;grid-row:1;margin-bottom:10.2%}  /* escalón central, top y=35 */
.pcard.p3{grid-column:5;grid-row:1;margin-bottom:5.6%}   /* escalón der.,    top y=79 */
```

Los porcentajes se resuelven contra el ancho del contenedor, así que el podio escala sin
recalcular nada. Si cambias el SVG, recalcula: `margin = (133 − y_top) / 960`.

**Tablet y Mobile.** El plinto se oculta (`display:none`) y las tres tarjetas se apilan
**empezando por el #1**, no en el orden del DOM:

```css
@media (max-width: 900px){
  .podium{padding-bottom:0}
  .podium-grid{grid-template-columns:1fr}
  .podium-art{display:none}
  .pcard.p1{order:1;grid-row:auto} .pcard.p2{order:2;grid-row:auto} .pcard.p3{order:3;grid-row:auto}
  .pcard{grid-column:1;margin-bottom:16px}
}
```

La jerarquía del #1 se mantiene sin el escalón: conserva la corona, el laurel, el
underglow, el avatar más grande (112 vs 96) y los puntos más grandes (28 vs 20).

**Alternativa para móviles muy estrechos (< 380px):** convierte el top 3 en tres filas de
leaderboard "premium" (misma rejilla que una fila normal, pero con el marco de puesto,
el borde de color y el score en el color del puesto). Mantiene la lista escaneable de
arriba abajo sin scroll horizontal.

---

## 4. Cabecera

| Breakpoint | Comportamiento |
|---|---|
| ≥ 1200 | Emblema 48px, título 52px, estado y enlace a la derecha en la misma línea |
| 900–1199 | Igual, la barra de evento se ajusta con `flex-wrap` |
| 600–899 | El estado y el enlace saltan debajo de los metadatos del evento |
| < 600 | Emblema 40px, título 34px, `padding` de la barra a 16px |

La barra de evento es la misma en las dos pantallas, así que este comportamiento vale para
escaneo y para ranking.

### 4.1 Pantalla de escaneo

| Breakpoint | Comportamiento |
|---|---|
| ≥ 900 | Las dos capturas en paralelo, `1fr 1fr` |
| < 900 | Una debajo de otra: primero la inicial (confirmada), después la final |
| < 600 | El registro de escaneos pierde las columnas `capturas` y `operativos`; quedan fecha, evento y estado |

La zona de arrastre mantiene 120px de alto mínimo en móvil y acepta toque además de
arrastre: en móvil se sube desde la galería, no se arrastra.

---

## 4.2 Tarjetas de totales

`repeat(4,minmax(0,1fr))` → `repeat(2,minmax(0,1fr))` bajo 900px. El `minmax(0,1fr)` es
obligatorio: con `1fr` a secas la columna no puede encogerse por debajo del ancho del número
y la página desborda en horizontal. Además el número baja a 19px (<900) y 16px (<600).

---

## 5. Densidad y toque

- Altura mínima de fila táctil: **60px**. Toda la fila es el área de toque, no solo el nombre.
- Espacio entre objetivos táctiles ≥ 8px.
- El hover de fila se sustituye por `:active` en táctil (el `:hover` persistente ensucia la lista en móvil).
- Truncado: nombre con `text-overflow:ellipsis` en una línea. El ID en juego se mantiene siempre: es lo que identifica al operativo cuando hay nombres con caracteres raros.

---

## 6. Listas largas (#4 → #100)

- Virtualiza a partir de ~50 filas. Altura de fila fija (68 / 60) para que el cálculo sea trivial.
- Fila propia (`.me`) fijada (`position:sticky`) al fondo del contenedor cuando queda fuera de vista —
  con la barra de acento morada, que ya la identifica.
- Paginación de 25 o scroll infinito: en ambos casos usa skeletons CSS, no `ui-loader-*`,
  que están pensados para transiciones de pantalla completa.
- Los decals de fondo y las partículas se desactivan bajo 900px: en una lista larga en móvil
  solo añaden ruido y coste de pintado.

---

## 7. Comprobación rápida

| Ancho | Debe verse |
|---|---|
| 1440 | 11 columnas, podio con plinto, barra de evento en una fila |
| 1024 | 9 columnas (sin poder ni bajas), podio con plinto |
| 834 | 5 columnas en dos líneas, podio apilado con el #1 arriba |
| 390 | 5 columnas en dos líneas, totales en 2×2, acordeón a una columna |
| 320 | Sin scroll horizontal. Si lo hay, revisa el `min-width` del nombre (`minmax(0,1fr)`) |
