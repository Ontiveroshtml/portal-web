# FRONTEND_HANDOFF.md — Guild Core

Todo lo que necesitas para montar la web a partir de `DESIGN.txt` + `/public/assets` + esta doc.

Documentos hermanos: `ASSET_MAP.md` (qué es cada archivo), `ASSETS.md` (cómo se extrajo y
limitaciones de calidad), `RANKING_SYSTEM.md`, `RANKING_RESPONSIVE.md`.
Previews abribles en el navegador: `preview.html` (pack completo) y `ranking-preview.html`
(las dos pantallas del ranking privado del clan: escaneo y ranking).

---

## 1. Instalación

Copia `public/assets` tal cual a la raíz pública de tu proyecto. Las rutas quedan como
`/assets/<carpeta>/<nombre>.<ext>`. No renombres nada: los nombres son los que aparecen
en toda la documentación.

```
public/assets/
├── brand/  hero/  characters/  emotes/  scenes/  items/
├── icons/svg/     ← iconografía de producción
├── icons/png/     ← referencia extraída, NO usar en UI
├── ui/  vfx/  decorations/  ranking/
└── backgrounds/   ← vacío a propósito (ver ASSETS.md §5)
```

Cada PNG tiene `nombre@2x.png`; los pesados tienen además `.webp`.

```html
<img src="/assets/hero/hero-character-main.png"
     srcset="/assets/hero/hero-character-main.png 1x,
             /assets/hero/hero-character-main@2x.png 2x"
     width="305" height="512" alt="">
```

Con WebP:

```html
<picture>
  <source type="image/webp" srcset="/assets/hero/hero-character-main@2x.webp">
  <img src="/assets/hero/hero-character-main.png" alt="">
</picture>
```

---

## 2. Tokens

```css
:root{
  --surface:#131315; --surface-low:#1b1b1d; --container:#1F1F21; --container-high:#2a2a2c;
  --modal:#2A2D37; --on-surface:#e5e1e4; --on-variant:#C5C9AE;
  --outline:#8f937a; --outline-variant:#454934;
  --neon:#D6FA38; --purple:#8D59FD; --gold:#FFB800; --alert:#FC3A3A;
  --cut:14px;
  --sp-xs:8px; --sp-sm:16px; --sp-md:24px; --sp-lg:40px; --sp-xl:64px;
}
body{
  background:var(--surface);
  background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);
  background-size:6px 6px;
  color:var(--on-surface);
  font:400 16px/1.5 Inter,system-ui,sans-serif;
}
```

Tipografía: **Montserrat 900 italic** para display, **Inter** para texto, **JetBrains Mono**
para cifras. Todos los números de un ranking van en mono: es lo que hace que las columnas
se lean alineadas.

Cuatro utilidades que se repiten en todo el diseño:

```css
.cut{clip-path:polygon(var(--cut) 0,100% 0,100% calc(100% - var(--cut)),
     calc(100% - var(--cut)) 100%,0 100%,0 var(--cut))}
.hazard{height:14px;background:repeating-linear-gradient(45deg,var(--neon) 0 12px,#131315 12px 24px)}
.glow-neon{box-shadow:0 0 34px -6px rgba(214,250,56,.45)}
.pill{border-radius:999px;padding:8px 16px;font:800 12px/1 Montserrat,sans-serif;
      font-style:italic;letter-spacing:.04em;text-transform:uppercase}
```

---

## 3. Reglas de uso de assets

- **Iconos:** siempre `icons/svg/`. Los de `icons/png/` vienen de un origen de ~30px y solo
  sirven como referencia de fidelidad.
- **Glow:** los PNG con brillo ya llevan el halo dentro del alpha. No apiles
  `filter: drop-shadow()` encima o se duplica.
- **VFX:** compón con `mix-blend-mode: screen` sobre superficies oscuras. Sobre fondo claro
  se lavan: es lo esperable en un efecto aditivo.
- **Decals:** son textura de fondo, no contenido. Entre 8% y 20% de opacidad.
- **Marcos de avatar:** son anillos huecos. El retrato es una imagen aparte al 64% del lado
  del marco (ver §5).
- **Nada de `image-rendering: pixelated`.**

---

## 4. Estructura de página sugerida

```
<Navbar />        brand/brand-logo-gc.png + icons/svg
<Hero />          hero/hero-character-main.png + decorations al 10%
<Features />      scenes/* como ilustraciones de apoyo
<Shop />          items/* en grid + ui/ui-rank-*.png
<Ranking />       ← §5
<Footer />        brand + decals
```

---

## 5. Ranking privado del clan — implementación

Lee `RANKING_SYSTEM.md` para el detalle visual y `RANKING_RESPONSIVE.md` para los
breakpoints. Aquí va el contrato de componentes y datos.

Son **dos pantallas**: `ScanScreen` (subir capturas del evento) y `ClanRanking` (resultado).
El ranking global público reutilizará `TopThree` y `LeaderboardRow` cambiando el contexto de
evento por temporada.

### 5.1 Árbol

```jsx
<ScanScreen>
  <EventBar event={event} status="in_progress" />
  <CaptureSlot phase="initial" state="confirmed" accuracy={99.8} operatives={42} />
  <CaptureSlot phase="final" state="pending" onDrop={…} />
  <ScanLog scans={scans} />
</ScanScreen>

<ClanRanking>
  <EventBar event={event} compact onNavigate={goToScan} />
  <TotalsRow totals={totals} />
  <RankingFilters onSearch={…} onFilterClass={…} onFilterServer={…} />
  <TopThree>{top3.map(p => <RankedPlayer key={p.id} rank={p.rank} player={p} />)}</TopThree>
  <Leaderboard>
    {rest.map(p => <LeaderboardRow key={p.id} rank={p.rank} player={p} history={p.scans} />)}
  </Leaderboard>
</ClanRanking>
```

### 5.2 Forma de los datos

```ts
type ClassKey = 'berserker' | 'archer' | 'cavalry';

interface Operative {
  id: string;            // id interno
  gameId: string;        // "2056060215" — el ID en juego, se muestra siempre
  name: string;
  avatarUrl: string;     // retrato cuadrado, ≥128px
  cls: ClassKey;
  server: string;        // "S-1247"
  power: number;
  points: number;
  pointsPct: number;     // +100, +8.45, -12…
  troop: string | null;  // "T6" | null
  rune: boolean;
  artifact: boolean;
  killsBefore: number;  killsAfter: number;  killsPct: number;
  deathsBefore: number; deathsAfter: number; deathsPct: number;
  registeredAt: string;  // ISO
  isSelf?: boolean;
  scans: ScanEntry[];    // historial, más reciente primero
}

interface ScanEntry {
  scanId: string;
  at: string;            // ISO — fecha y hora del escaneo
  eventName: string;     // "Valle de los Espíritus"
  deltaPoints: number; deltaDeaths: number; deltaKills: number;
}

interface EventScan {
  id: string; code: string;      // "VDE-2608-02"
  eventKey: string;              // "valle-espiritus"
  eventName: string;
  startedAt: string;
  captures: { initial?: Capture; final?: Capture };
  operativesDetected: number;
  status: 'in_progress' | 'closed';
}
interface Capture { url: string; accuracy: number; capturedAt: string }
```

El ranking se ordena por `points` descendente. `pointsPct` es el delta contra el escaneo
anterior, no un porcentaje del total.

### 5.3 Los assets se resuelven por dato, nunca por jugador

```ts
const R = '/assets/ranking';

export const CLASSES: Record<ClassKey,{label:string;icon:string;color:string}> = {
  berserker:{label:'Berserker', icon:`${R}/icon-class-berserker.svg`, color:'var(--neon)'},
  archer:   {label:'Arquero',   icon:`${R}/icon-class-archer.svg`,    color:'var(--purple)'},
  cavalry:  {label:'Caballería',icon:`${R}/icon-class-cavalry.svg`,   color:'var(--gold)'},
};

export const avatarFrame = (op: Operative, rank: number) =>
  rank === 1 ? `${R}/avatar-frame-top1.svg` :
  rank === 2 ? `${R}/avatar-frame-top2.svg` :
  rank === 3 ? `${R}/avatar-frame-top3.svg` :
  op.isSelf  ? `${R}/avatar-frame-highlight.svg` :
               `${R}/avatar-frame-default.svg`;

export const changeIcon = (d: number) =>
  d > 0 ? `${R}/rank-change-up.svg` :
  d < 0 ? `${R}/rank-change-down.svg` :
          `${R}/rank-change-same.svg`;

export const eventEmblem = (key: string) => `${R}/event-${key}.svg`;
```

Un evento nuevo = un SVG de 48×48 en `ranking/` con el nombre `event-<key>.svg`.
Una clase nueva = un SVG de 24×24 más una entrada en `CLASSES`.

### 5.4 Avatar + marco

```jsx
function Avatar({src, frame, size = 46}) {
  return (
    <div className="ravatar" style={{width:size, height:size}}>
      <img className="face"  src={src} alt="" />
      <img className="frame" src={frame} alt="" aria-hidden="true" />
    </div>
  );
}
```
```css
.ravatar{position:relative}
.ravatar .face{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  width:64%;height:64%;border-radius:50%;object-fit:cover;background:#0e0e10}
.ravatar .frame{position:absolute;inset:0;width:100%;height:100%}
```

El 64% no es arbitrario: los seis marcos comparten `viewBox 128×128` con el hueco en `r=41`.
Si cambias ese porcentaje, el retrato se sale del anillo o baila entre marcos.

### 5.5 Fila + acordeón

La fila entera es un `<button>` con `aria-expanded`. El panel va **fuera** del botón, como
hermano dentro del mismo contenedor:

```jsx
<div className={cx('rowwrap', op.isSelf && 'me', open && 'open')}>
  <button className="row gridcols" aria-expanded={open} onClick={toggle}>
    <div className="rnum"><i>#</i>{rank}</div>
    <Avatar src={op.avatarUrl} frame={avatarFrame(op, rank)} />
    <div className="rname"><b>{op.name}</b><span>ID {op.gameId}</span></div>
    <div className="rclass"><img src={CLASSES[op.cls].icon} alt="" />
      <span>{CLASSES[op.cls].label}</span></div>
    <div><span className="svchip">{op.server}</span></div>
    <div className="rnumcell">{fmt(op.power)}</div>
    <div className="rpoints">{fmt(op.points)}</div>
    <div className={cx('delta', dir(op.pointsPct))}>
      <img src={changeIcon(op.pointsPct)} alt="" />{signed(op.pointsPct)}%</div>
    <div className="rnumcell">{op.killsAfter ? fmt(op.killsAfter) : <span className="dash">—</span>}</div>
    <div className="rnumcell">{op.deathsAfter ? fmt(op.deathsAfter) : <span className="dash">—</span>}</div>
    <div className="chev"><img src={`${R}/ranking-chevron.svg`} alt="" /></div>
  </button>

  <OperativePanel op={op} history={op.scans} />
</div>
```

El panel contiene la rejilla `tropa / runa / artefacto / registrado`, las tres líneas
`antes → después` y la línea de tiempo de escaneos. Renderiza el historial **siempre**, no
solo al abrir: son cuatro entradas, no compensa el estado extra, y así el `Ctrl+F` del
navegador lo encuentra.

Formatea las cifras con punto de miles (`241.980.663`) y `font-variant-numeric: tabular-nums`
en todo lo que sea número: sin eso las columnas no se alinean.

### 5.6 Pantalla de escaneo

- `CaptureSlot` acepta arrastre, `paste` (`Ctrl+V`) y toque para abrir la galería en móvil.
  Los tres caminos entran por el mismo handler.
- El estado `confirmed` muestra la miniatura, la precisión de extracción y el número de
  operativos detectados. `pending` muestra la dropzone.
- `Procesar escaneo` se habilita solo con las dos capturas. Con una sola, el CTA queda
  deshabilitado y el evento se mantiene `in_progress`.
- El log de escaneos es la única fuente de la fecha: no la dupliques en otro sitio.

### 5.7 Accesibilidad

- Marcos, corona, chevron, separador y decoraciones: `alt=""` + `aria-hidden="true"`.
- El icono de clase va con `alt=""` porque el nombre de la clase está en texto al lado.
- La flecha de cambio va con `alt=""` y el porcentaje como texto: el lector lee "+1.15%".
- La fila es un `<button>` con `aria-expanded` y `aria-controls` apuntando al panel.
- El color no es el único portador de significado: subida/bajada llevan signo, la clase
  lleva nombre y el servidor es texto.
- Contraste: `--on-variant` sobre `--container` cumple AA; `--outline` solo para metadatos
  en semibold ≥12px, nunca para contenido.
- Respeta `prefers-reduced-motion: reduce` en el acordeón y en el pulso de `En curso`.

### 5.8 Rendimiento

- Precarga solo lo del top 3: corona, tres marcos, tres iconos de clase.
- Los SVG del sistema pesan 1–4 KB: inlínalos como componente en SSR o sírvelos como sprite.
- Virtualiza a partir de ~50 filas. Con el acordeón, mide la fila cerrada (70px) y deja que
  la abierta reporte su altura real.
- Desactiva decals y partículas bajo 900px.

---

## 6. Lo que no debes convertir en imagen

Resumen; la lista completa está en `ASSET_MAP.md` §3 y `ASSETS.md` §4.

Textos y títulos · números de posición · contenedores y filas · esquinas cortadas a 45° ·
hazard tape · halftone · underglow · pills y chips · barras de progreso · skeletons ·
botones · layout · paginación.

---

## 7. Límites conocidos

- El material de origen es de 1536×1024. No hay HD real. `ASSETS.md` §5 lista el tamaño CSS
  máximo recomendado por grupo de assets. Respétalo: por encima se ve la interpolación.
- `icons/png/` y los decals amarillos son los dos puntos débiles del pack; ambos tienen
  sustituto vectorial en `icons/svg/`.
- `backgrounds/` está vacío porque en las láminas no hay ningún fondo reutilizable. El fondo
  se hace en CSS.
