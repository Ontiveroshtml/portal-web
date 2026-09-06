# RANKING_SYSTEM.md — Guild Core

Sistema visual del **ranking privado del clan**. Deriva íntegramente del design system
existente (`DESIGN.txt` + las dos láminas). Preview funcional con las dos pantallas:
**`ranking-preview.html`**.

Son dos pantallas:

1. **Escaneo** — se elige el evento (Valle de los Espíritus), se sube la captura inicial y la
   final, y queda registrado con su fecha en el log de escaneos.
2. **Ranking del clan** — el resultado del escaneo: totales, podio, tabla y acordeón de
   historial por operativo.

El **ranking global público** reutilizará estos mismos componentes cambiando el contexto de
evento por temporada; no está cubierto en este documento.

---

## 1. Reglas heredadas (no negociables)

| Regla | Valor tomado del diseño original |
|---|---|
| Superficie | `#131315` + halftone de puntos blancos al 5% (`6px` grid) |
| Contenedores | `#1F1F21` → `#17171a`, borde 1–2px de alto contraste |
| Primario / acción / #1 | `#D6FA38` (hazard yellow) |
| Secundario / estado / #2 | `#8D59FD` (status purple) |
| Tier / #3 | `#FFB800` (tier gold) |
| Alerta (solo bajadas) | `#FC3A3A` |
| Outline / texto terciario | `#8f937a`, variante `#454934` |
| Display | Montserrat 900 **italic**, `letter-spacing:-.03em`, mayúsculas |
| Cifras | JetBrains Mono 700, `letter-spacing:.05em` |
| Texto | Inter 400/600 |
| Esquinas | Contenedores `radius 20–24px`; tarjetas "tactical" con corte a 45° arriba-izq y abajo-der |
| Profundidad | Borde de alto contraste + underglow neón `0 0 Npx -Xpx`. **Nunca** sombras suaves difusas |
| Hazard tape | Franjas a 45°, 12px, amarillo/negro |
| Densidad | Fila de 68px en desktop, 8px de ritmo base |

**No existe plata ni bronce en este design system.** La jerarquía del top 3 usa los tres
colores que ya existen, en su orden de peso: neón > morado > oro.

---

## 2. Componentes

```
<ScanScreen>                   // pantalla 01
  <EventBar event="valle-espiritus" date="2026-08-25T21:40" status="in_progress" />
  <CaptureSlot phase="initial" state="confirmed" accuracy={99.8} operatives={42} />
  <CaptureSlot phase="final"   state="pending" />
  <ScanLog />                  // fecha · evento · capturas · operativos · estado
</ScanScreen>

<ClanRanking>                  // pantalla 02
  <EventBar … compact />
  <TotalsRow />                // puntos · bajas · kills · operativos
  <RankingFilters />           // buscador + clase + servidor
  <TopThree>
    <RankedPlayer rank={1} /> <RankedPlayer rank={2} /> <RankedPlayer rank={3} />
  </TopThree>
  <Leaderboard>
    <LeaderboardRow rank={4}>  // la fila entera abre el acordeón
      <PlayerDetail />         // tropa, runa, artefacto, antes→después
      <ScanHistory />          // un registro por escaneo
    </LeaderboardRow>
    …
  </Leaderboard>
</ClanRanking>
```

### 2.1 EventBar (cabecera de evento)

Es la misma barra en las dos pantallas: identifica **qué evento** y **cuándo se escaneó**.

| Parte | Tipo | Asset / implementación |
|---|---|---|
| Banda hazard | CSS | `repeating-linear-gradient(45deg,#D6FA38 0 12px,#131315 12px 24px)`, 14px |
| Emblema del evento | SVG | `ranking/event-valle-espiritus.svg` — 48×48 |
| Nombre del evento | HTML/CSS | Montserrat 900 italic 20px, mayúsculas |
| Metadatos | HTML/CSS | mono 11px: `ESCANEADO 25 AGO 2026 · 21:40 · 42 OPERATIVOS · CÓDIGO VDE-2608-02` |
| Estado | CSS | pill `En curso` (neón, punto pulsante) o `Cerrado` (outline) |
| Enlace cruzado | HTML/CSS | `Ver escaneo →` / `Ver ranking del clan` |
| Título de pantalla | HTML/CSS | `clamp(30px,5vw,52px)` display italic; segunda palabra en `--neon` |

Un evento nuevo = un SVG de emblema nuevo de 48×48 en `ranking/`. El resto es datos.

### 2.2 TopThree

| Parte | Tipo | Asset |
|---|---|---|
| Plinto de 3 escalones | SVG | `ranking/ranking-podium.svg` (960×133) |
| Tarjeta | CSS | `clip-path` con corte 45°, borde 2px del color del puesto |
| Corona (#1) | SVG | `ranking/ranking-crown.svg`, 78px, `top:-30px` |
| Marco de avatar | SVG | `avatar-frame-top1 / top2 / top3.svg` |
| Avatar | PNG | imagen del jugador, **64% del lado del marco**, circular |
| Clase | SVG + CSS | chip con `icon-class-*.svg` 16px + nombre de la clase |
| Servidor | CSS | chip con esquina cortada, mono 10px |
| Puntos | HTML/CSS | mono 700, 34px en el #1 |
| Poder | HTML/CSS | mono 11px bajo los puntos |
| VFX (#1) | PNG | `vfx/vfx-lightning-yellow-01.png`, 76% ancho, `opacity:.24` |
| Número fantasma | HTML/CSS | display italic, `rgba(255,255,255,.09)` |

**Jerarquía del #1:** escalón más alto · corona · laurel dorado · traza neón interior ·
underglow `0 0 34px -6px` · puntos a 34px en neón. Ningún otro puesto lleva corona ni laurel.

### 2.3 LeaderboardRow

Grid desktop de 11 columnas:

```
50px  54px    1fr        118px  86px      124px  138px    84px  122px   108px   34px
#   │ AVATAR │ OPERATIVO │ CLASE │ SERVIDOR │ PODER │ PUNTOS │ %   │ KILLS │ BAJAS │ ⌄
```

| Parte | Tipo | Detalle |
|---|---|---|
| Barra de acento | CSS | 3px a la izquierda: neón en hover y abierta, morado en la fila propia |
| Puesto | HTML/CSS | mono 21px; el `#` en `--outline-variant` |
| Avatar | SVG + PNG | `avatar-frame-default.svg` (46px) + retrato al 64% |
| Operativo | HTML/CSS | Montserrat 800 italic 17px + `ID 2056060215` en mono 10px |
| Clase | SVG + CSS | `icon-class-*.svg` 18px + nombre en mono 11px |
| Servidor | CSS | chip `S-1247` con esquina cortada |
| Poder / Kills / Bajas | HTML/CSS | mono 700 15px, alineado a la derecha, `—` cuando es 0 |
| Puntos | HTML/CSS | mono 700 17px en neón — es la métrica que ordena |
| % | SVG + CSS | `rank-change-*.svg` 14px + porcentaje |
| Chevron | SVG | `ranking-chevron.svg`, rota 180° al abrir |

Toda la fila es un `<button>` que abre el acordeón. No hay columna de acciones: editar
está dentro del panel.

### 2.4 Acordeón (panel de detalle)

Dos columnas. Izquierda, los datos que no caben en la fila; derecha, el historial.

**Izquierda**

- Rejilla de 4 celdas: `Tropa` · `Runa` · `Artefacto` · `Registrado`.
  Runa y artefacto en neón cuando valen OK, `—` en `--outline-variant` cuando no.
- Tres líneas antes → después: `Bajas`, `Kills`, `Poder`.
  Formato `valor_antes → valor_después` + chip de % con su flecha.

**Derecha — historial de escaneos**

Un registro por escaneo del evento. Cada entrada:

```
◆  25 ago 2026 · 21:40 · Valle de los Espíritus
   PUNTOS +63.591.620   BAJAS +100.000   KILLS +2.000.000
```

- Línea vertical de 1px en `--outline-variant`; marcador en rombo de 11px.
- El escaneo más reciente lleva el rombo relleno en neón con glow; el resto en outline.
- Deltas: positivo en neón, negativo en `--alert`, cero en `--outline`.
- Pie del panel: `Editar operativo` · `Ver todos los escaneos`.

---

## 3. Estados de movimiento

| Estado | Asset | Color | Texto |
|---|---|---|---|
| Sube | `rank-change-up.svg` | `#D6FA38` | `+N%` |
| Baja | `rank-change-down.svg` | `#FC3A3A` | `-N%` |
| Igual | `rank-change-same.svg` | `#8f937a` | `0%` |

Las tres flechas llevan `skewX(-7)` para alinearse con la itálica del display.
El rojo se usa **solo** aquí y en errores.

---

## 4. Clases

Tres clases, cada una con su icono y su color del sistema. El icono usa `currentColor`,
así que el color va en CSS y se puede recolorear sin tocar el SVG.

| Clase | Archivo | Color | Motivo |
|---|---|---|---|
| Berserker | `ranking/icon-class-berserker.svg` | `#D6FA38` | hacha doble |
| Arquero | `ranking/icon-class-archer.svg` | `#8D59FD` | arco y flecha |
| Caballería | `ranking/icon-class-cavalry.svg` | `#FFB800` | cabeza de caballo angular |

Añadir una cuarta clase es un SVG de 24×24 más una entrada en el mapa `CLASSES`.

**No hay sistema de tiers en el ranking del clan.** Los badges `rank-badge-01…06` y los
badges pintados `ui/ui-rank-*.png` siguen en el pack para el perfil de jugador y el
ranking global público, pero no aparecen en estas dos pantallas.

---
## 5. Marcos de avatar

Todos comparten geometría: **viewBox 128×128, anillo en r=44, hueco de avatar r=41**.
El avatar es una imagen aparte al **64%** del lado del marco.

| Archivo | Uso |
|---|---|
| `avatar-frame-default.svg` | cualquier jugador |
| `avatar-frame-highlight.svg` | tú / amigos / clan |
| `avatar-frame-featured.svg` | destacado, streamer, MVP de la jornada |
| `avatar-frame-top3.svg` | puesto 3 |
| `avatar-frame-top2.svg` | puesto 2 |
| `avatar-frame-top1.svg` | puesto 1 (único con corona y laurel) |

```html
<div class="ravatar">
  <img class="face"  src="/assets/players/1234.png" alt="">
  <img class="frame" src="/assets/ranking/avatar-frame-top1.svg" alt="" aria-hidden="true">
</div>
```
```css
.ravatar{position:relative;width:52px;height:52px}
.ravatar .face{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  width:64%;height:64%;border-radius:50%;object-fit:cover;background:#0e0e10}
.ravatar .frame{position:absolute;inset:0;width:100%;height:100%}
```

---

## 6. Tamaños recomendados

| Elemento | Desktop | Tablet | Mobile |
|---|---|---|---|
| Emblema del evento | 48 | 44 | 40 |
| Título | 64 | 48 | 40 |
| Marco top 1 | 132 | 120 | 112 |
| Marco top 2 / 3 | 108 | 100 | 96 |
| Marco en fila | 46 | 46 | 40 |
| Icono de clase en podio | 16 | 16 | 15 |
| Icono de clase en fila | 18 | 18 | 13 |
| Chip de servidor | 10px texto | 10px | 10px |
| Flecha de cambio | 16 | 16 | 14 |
| Corona | 78 | 68 | 62 |
| Alto de fila | 70 | 66 | 62 (2 líneas) |
| Chevron del acordeón | 16 | 16 | 16 |

## 7. Espaciado

Escala de 8: `8 / 16 / 24 / 40 / 64`.
Padding de fila `12px 24px`. Gap del podio `16px`. Separación entre secciones `40px`.
Separación cabecera → podio `40px`; podio → leaderboard `24px`.

---

## 8. Capas (z-index)

| z | Capa |
|---|---|
| 0 | halftone del fondo, decals de fondo (`opacity ≤ .12`) |
| 1 | `ranking-podium.svg` (plinto) |
| 2 | tarjetas del podio, filas del leaderboard |
| 3 | VFX dentro de la tarjeta (`mix-blend-mode:screen`) |
| 4 | avatar (retrato) |
| 5 | marco del avatar |
| 6 | corona, icono de clase, indicador de cambio |
| 10 | tooltips, selector de evento y menús contextuales de fila |

Dentro de una fila no hace falta `z-index`: basta el orden del DOM. El único apilado real
es avatar (4) bajo marco (5) y corona (6) sobre la tarjeta.

---

## 9. Qué es cada cosa

| SVG | PNG | CSS / HTML |
|---|---|---|
| marcos de avatar, iconos de clase, flechas de cambio, chevron, corona, emblema del evento, podio, separador, decoraciones | retratos de jugador, VFX de la tarjeta #1, decals de fondo, miniatura de la captura escaneada | contenedores, filas, acordeón, tipografía, números, chips de clase y servidor, pills, hazard tape, halftone, underglow, hover, dropzone, barra de precisión, skeletons, paginación |

---

## 10. Movimiento (opcional)

Todo con CSS, coherente con el "animated pulse" que menciona `DESIGN.txt` para el tier Warlord:

- Punto de `LIVE`: `opacity` 1 → .25, 1.4s, infinito.
- Marco top 1: `filter: drop-shadow()` pulsando de 10px a 18px, 2.4s.
- Entrada de filas: `translateY(6px)` + `opacity 0→1`, 180ms, `ease-out`, escalonado 25ms.
- Acordeón: `grid-template-rows: 0fr → 1fr` sobre el panel, 200ms `ease-out`. No animes `height:auto`.
- Chevron: `transform: rotate(180deg)`, 200ms, sincronizado con el panel.
- Cambio de posición: `FLIP` sobre `transform`, 240ms. No animes `top`.
- Respeta `prefers-reduced-motion: reduce` desactivando todo lo anterior.
