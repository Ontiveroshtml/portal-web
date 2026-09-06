# ASSET_MAP.md — Guild Core

Mapa completo del pack. Cada asset lleva su **origen** y su **formato**:

| Marca | Significado |
|---|---|
| **EXTRACTED** | Recortado pixel a pixel de `design-01` / `design-02`. No se ha redibujado nada. |
| **NEW / DESIGNED** | No existía en las láminas. Creado en fase 2 derivando forma, color y tratamiento del diseño original. |
| **CSS / HTML** | No es un archivo. Se reproduce en código (ver sección final). |
| **SVG** | Vectorial, escalable, recoloreable con `currentColor` o `fill`. |
| **PNG** | Raster RGBA con alpha real. Cada uno tiene su `@2x`; los pesados tienen además `.webp`. |

Resumen: **199 assets** — 147 PNG extraídos, 21 SVG de iconografía y 31 SVG del sistema de ranking
(26 de la fase 2 + 5 añadidos en el rediseño del ranking del clan: 3 clases, chevron y emblema de evento).
Documentación relacionada: `ASSETS.md` (extracción fase 1), `RANKING_SYSTEM.md`,
`RANKING_RESPONSIVE.md`, `FRONTEND_HANDOFF.md`.

---

## 1. Assets nuevos de la fase 2 (Ranking)

Todos son **NEW / DESIGNED** y todos son **SVG**. Ninguno inventa vocabulario visual:
cada uno hereda de un elemento concreto de las láminas originales.

| Asset nuevo | De dónde hereda en el diseño original |
|---|---|
| `avatar-frame-default` | Marco de avatar plateado del panel AVATAR FRAMES (chevrones N/E/O + rombo inferior). |
| `avatar-frame-highlight` | Marco morado del mismo panel + "angular corner accents" que describe `DESIGN.txt` para el tier Pro. |
| `avatar-frame-top1` | Medallón WARLORD: laurel de llama dorada + corona + traza neón interior. |
| `avatar-frame-top2` | Marco ELITE: facetas moradas y esquinas en corchete. |
| `avatar-frame-top3` | Marco VETERAN: oro con pestañas tipo ala. |
| `avatar-frame-featured` | Marco neón amarillo + marcas de hazard tape del sistema. |
| `icon-class-berserker` | Set de iconos UI (silueta plana, `currentColor`) + el hacha del panel WEAPONS & GEAR. |
| `icon-class-archer` | Mismo lenguaje de icono; arco y flecha en morado de estado. |
| `icon-class-cavalry` | Mismo lenguaje; cabeza de caballo angular en oro de tier. |
| `ranking-chevron` | Chevron angular derivado de las flechas de movimiento del sistema. |
| `event-valle-espiritus` | Crestas angulares del podio + llama/orbe del VFX de portal + banda de hazard tape. |
| `rank-badge-01…04` | Escudos RECRUIT / WARRIOR / VETERAN / ELITE del panel STATUS & VFX. |
| `rank-badge-05…06` | Medallones circulares LEGEND / WARLORD (laurel dorado + cresta con ojos neón + corona). |
| `rank-change-up/down/same` | Flechas angulares del sistema, con el mismo *skew* itálico que la tipografía display. |
| `rank-new-badge` | Pill con esquina cortada a 45° + rayo del set VFX. |
| `ranking-podium` | Marcos "tactical terminal" con esquina cortada + banda de hazard tape de la lámina. |
| `ranking-crown` | Corona del badge WARLORD y del decal `decal-crown-02`. |
| `ranking-header-emblem` | Silueta de escudo + galones + corona, con el relleno neón del sistema. |
| `ranking-header-underline` | Trazo de garra (`decal-claw-yellow`) convertido en subrayado. |
| `ranking-separator` | Línea + segmento de hazard tape. |
| `ranking-decoration-corner` | Corchetes de esquina de los marcos `ui-frame-*`. |
| `ranking-decoration-particles` | Estrellas de 4 puntas (`decal-star-4point`, `decal-star-purple`). |
| `ranking-decoration-halftone` | Trama de puntos al 5% descrita en `DESIGN.txt`. |
| `ranking-rank-plate` | Placa con esquinas cortadas de los paneles del HUD. |
| `ranking-reward-marker` | Gema del panel P2P / ECONOMY. |

### En uso en el ranking privado del clan

| Se usa | No se usa aquí |
|---|---|
| los 6 `avatar-frame-*`, los 3 `icon-class-*`, `ranking-chevron`, `event-valle-espiritus`, `ranking-crown`, `ranking-podium`, `rank-change-*`, `ranking-separator`, `vfx-lightning-yellow-01` | `rank-badge-01…06`, `ui-rank-*.png`, `rank-new-badge`, `ranking-header-emblem`, `ranking-header-underline`, `ranking-rank-plate`, `ranking-reward-marker`, `ranking-decoration-*` |

Lo de la derecha **no sobra**: son las piezas del perfil de jugador y del ranking global
público, que es la siguiente pantalla. `ASSETS.md` §5.3 explica los duplicados.

---

## 2. Inventario completo

### `assets/brand/` — 1 assets

| Asset | Origen | Formato | Prioridad | Tamaño | Retina | WebP |
|---|---|---|---|---|---|---|
| `brand-logo-gc.png` | EXTRACTED | PNG | REQUIRED | 199×176 | ✓ | ✓ |

### `assets/hero/` — 2 assets

| Asset | Origen | Formato | Prioridad | Tamaño | Retina | WebP |
|---|---|---|---|---|---|---|
| `hero-character-main.png` | EXTRACTED | PNG | REQUIRED | 305×512 | ✓ | ✓ |
| `hero-character-throne.png` | EXTRACTED | PNG | IMPORTANT | 307×310 | ✓ | ✓ |

### `assets/characters/` — 24 assets

| Asset | Origen | Formato | Prioridad | Tamaño | Retina | WebP |
|---|---|---|---|---|---|---|
| `character-dash-green.png` | EXTRACTED | PNG | IMPORTANT | 225×153 | ✓ | ✓ |
| `character-dash-purple.png` | EXTRACTED | PNG | IMPORTANT | 205×143 | ✓ | ✓ |
| `character-gamer-seated.png` | EXTRACTED | PNG | IMPORTANT | 221×264 | ✓ | ✓ |
| `character-hero-katana.png` | EXTRACTED | PNG | IMPORTANT | 385×353 | ✓ | ✓ |
| `character-in-box.png` | EXTRACTED | PNG | IMPORTANT | 152×133 | ✓ | ✓ |
| `character-leader-cape.png` | EXTRACTED | PNG | IMPORTANT | 212×335 | ✓ | ✓ |
| `character-ninja-daggers.png` | EXTRACTED | PNG | IMPORTANT | 247×245 | ✓ | ✓ |
| `character-outfit-cyber.png` | EXTRACTED | PNG | IMPORTANT | 132×218 | ✓ | ✓ |
| `character-outfit-stealth.png` | EXTRACTED | PNG | IMPORTANT | 126×243 | ✓ | ✓ |
| `character-outfit-warlord.png` | EXTRACTED | PNG | IMPORTANT | 148×239 | ✓ | ✓ |
| `character-pointing-up.png` | EXTRACTED | PNG | IMPORTANT | 209×293 | ✓ | ✓ |
| `character-pose-crouch.png` | EXTRACTED | PNG | IMPORTANT | 178×165 | ✓ | ✓ |
| `character-pose-gamer.png` | EXTRACTED | PNG | IMPORTANT | 132×195 | ✓ | ✓ |
| `character-pose-leap.png` | EXTRACTED | PNG | IMPORTANT | 221×127 | ✓ | ✓ |
| `character-pose-punch.png` | EXTRACTED | PNG | IMPORTANT | 164×132 | ✓ | ✓ |
| `character-pose-slash.png` | EXTRACTED | PNG | IMPORTANT | 168×168 | ✓ | ✓ |
| `character-sit-aura.png` | EXTRACTED | PNG | IMPORTANT | 177×133 | ✓ | ✓ |
| `character-sleeping.png` | EXTRACTED | PNG | IMPORTANT | 165×111 | ✓ | ✓ |
| `character-turnaround-back.png` | EXTRACTED | PNG | IMPORTANT | 135×301 | ✓ | ✓ |
| `character-turnaround-front.png` | EXTRACTED | PNG | IMPORTANT | 153×312 | ✓ | ✓ |
| `character-turnaround-side.png` | EXTRACTED | PNG | IMPORTANT | 149×297 | ✓ | ✓ |
| `character-walk-backpack.png` | EXTRACTED | PNG | IMPORTANT | 136×197 | ✓ | ✓ |
| `character-warlord-throne.png` | EXTRACTED | PNG | IMPORTANT | 278×314 | ✓ | ✓ |
| `character-wave.png` | EXTRACTED | PNG | IMPORTANT | 162×144 | ✓ | ✓ |

### `assets/emotes/` — 18 assets

| Asset | Origen | Formato | Prioridad | Tamaño | Retina | WebP |
|---|---|---|---|---|---|---|
| `emote-chill.png` | EXTRACTED | PNG | IMPORTANT | 135×130 | ✓ | ✓ |
| `emote-cool.png` | EXTRACTED | PNG | IMPORTANT | 135×131 | ✓ | ✓ |
| `emote-fangs.png` | EXTRACTED | PNG | IMPORTANT | 138×138 | ✓ | ✓ |
| `emote-gaming.png` | EXTRACTED | PNG | IMPORTANT | 152×142 | ✓ | ✓ |
| `emote-grin.png` | EXTRACTED | PNG | IMPORTANT | 128×135 | ✓ | ✓ |
| `emote-happy.png` | EXTRACTED | PNG | IMPORTANT | 139×138 | ✓ | ✓ |
| `emote-hood-01.png` | EXTRACTED | PNG | OPTIONAL | 79×80 | ✓ | — |
| `emote-hood-02.png` | EXTRACTED | PNG | OPTIONAL | 70×78 | ✓ | — |
| `emote-hood-03.png` | EXTRACTED | PNG | OPTIONAL | 82×79 | ✓ | — |
| `emote-hood-04.png` | EXTRACTED | PNG | OPTIONAL | 78×82 | ✓ | — |
| `emote-hood-05.png` | EXTRACTED | PNG | OPTIONAL | 80×84 | ✓ | — |
| `emote-hood-06.png` | EXTRACTED | PNG | OPTIONAL | 82×85 | ✓ | — |
| `emote-hood-07.png` | EXTRACTED | PNG | OPTIONAL | 86×89 | ✓ | — |
| `emote-hood-08.png` | EXTRACTED | PNG | OPTIONAL | 75×88 | ✓ | — |
| `emote-laugh.png` | EXTRACTED | PNG | IMPORTANT | 131×136 | ✓ | ✓ |
| `emote-shock.png` | EXTRACTED | PNG | IMPORTANT | 135×144 | ✓ | ✓ |
| `emote-thinking.png` | EXTRACTED | PNG | IMPORTANT | 133×149 | ✓ | ✓ |
| `emote-wink.png` | EXTRACTED | PNG | IMPORTANT | 148×133 | ✓ | ✓ |

### `assets/scenes/` — 13 assets

| Asset | Origen | Formato | Prioridad | Tamaño | Retina | WebP |
|---|---|---|---|---|---|---|
| `scene-announcement.png` | EXTRACTED | PNG | OPTIONAL | 222×199 | ✓ | ✓ |
| `scene-error.png` | EXTRACTED | PNG | OPTIONAL | 217×148 | ✓ | ✓ |
| `scene-idle-meditation.png` | EXTRACTED | PNG | OPTIONAL | 205×175 | ✓ | ✓ |
| `scene-login-secure.png` | EXTRACTED | PNG | OPTIONAL | 214×169 | ✓ | ✓ |
| `scene-matchmaking.png` | EXTRACTED | PNG | OPTIONAL | 187×206 | ✓ | ✓ |
| `scene-reward-chest.png` | EXTRACTED | PNG | OPTIONAL | 224×187 | ✓ | ✓ |
| `scene-search.png` | EXTRACTED | PNG | OPTIONAL | 196×175 | ✓ | ✓ |
| `scene-stats-dashboard.png` | EXTRACTED | PNG | OPTIONAL | 224×213 | ✓ | ✓ |
| `scene-streaming.png` | EXTRACTED | PNG | OPTIONAL | 198×215 | ✓ | ✓ |
| `scene-success.png` | EXTRACTED | PNG | OPTIONAL | 190×170 | ✓ | ✓ |
| `scene-verified.png` | EXTRACTED | PNG | OPTIONAL | 197×212 | ✓ | ✓ |
| `scene-victory-podium.png` | EXTRACTED | PNG | OPTIONAL | 219×214 | ✓ | ✓ |
| `scene-workstation.png` | EXTRACTED | PNG | OPTIONAL | 170×171 | ✓ | ✓ |

### `assets/items/` — 19 assets

| Asset | Origen | Formato | Prioridad | Tamaño | Retina | WebP |
|---|---|---|---|---|---|---|
| `item-backpack.png` | EXTRACTED | PNG | REQUIRED | 77×94 | ✓ | — |
| `item-cap-gc.png` | EXTRACTED | PNG | REQUIRED | 94×87 | ✓ | — |
| `item-chest-gold.png` | EXTRACTED | PNG | REQUIRED | 76×65 | ✓ | — |
| `item-coin-gc.png` | EXTRACTED | PNG | REQUIRED | 59×54 | ✓ | — |
| `item-coin-stack.png` | EXTRACTED | PNG | REQUIRED | 57×50 | ✓ | — |
| `item-collar-gold.png` | EXTRACTED | PNG | REQUIRED | 93×52 | ✓ | — |
| `item-collar-neon.png` | EXTRACTED | PNG | REQUIRED | 81×63 | ✓ | — |
| `item-crate-gc.png` | EXTRACTED | PNG | REQUIRED | 172×125 | ✓ | ✓ |
| `item-dagger-01.png` | EXTRACTED | PNG | REQUIRED | 57×103 | ✓ | — |
| `item-dagger-02.png` | EXTRACTED | PNG | REQUIRED | 55×90 | ✓ | — |
| `item-gem-purple.png` | EXTRACTED | PNG | REQUIRED | 60×70 | ✓ | — |
| `item-headset-cat.png` | EXTRACTED | PNG | REQUIRED | 81×72 | ✓ | — |
| `item-katana-neon.png` | EXTRACTED | PNG | REQUIRED | 79×132 | ✓ | ✓ |
| `item-katana-purple.png` | EXTRACTED | PNG | REQUIRED | 75×135 | ✓ | ✓ |
| `item-money-bag.png` | EXTRACTED | PNG | REQUIRED | 55×56 | ✓ | — |
| `item-scabbard-01.png` | EXTRACTED | PNG | REQUIRED | 91×34 | ✓ | — |
| `item-scabbard-02.png` | EXTRACTED | PNG | REQUIRED | 80×31 | ✓ | — |
| `item-shuriken-purple.png` | EXTRACTED | PNG | REQUIRED | 90×116 | ✓ | ✓ |
| `item-shuriken.png` | EXTRACTED | PNG | REQUIRED | 67×79 | ✓ | — |

### `assets/icons/svg/` — 21 assets

| Asset | Origen | Formato | Prioridad | Tamaño | Retina | WebP |
|---|---|---|---|---|---|---|
| `decal-claw.svg` | NEW / DESIGNED | SVG | OPTIONAL | 24×24 vector | — | — |
| `decal-crown-outline.svg` | NEW / DESIGNED | SVG | OPTIONAL | 24×24 vector | — | — |
| `decal-gamepad.svg` | NEW / DESIGNED | SVG | OPTIONAL | 24×24 vector | — | — |
| `decal-paw.svg` | NEW / DESIGNED | SVG | OPTIONAL | 24×24 vector | — | — |
| `decal-skull.svg` | NEW / DESIGNED | SVG | OPTIONAL | 24×24 vector | — | — |
| `decal-star-4point.svg` | NEW / DESIGNED | SVG | OPTIONAL | 24×24 vector | — | — |
| `decal-warning.svg` | NEW / DESIGNED | SVG | OPTIONAL | 24×24 vector | — | — |
| `icon-badge.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `icon-book.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `icon-chart.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `icon-coins.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `icon-crown.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `icon-gem.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `icon-mail.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `icon-settings.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `icon-shield.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `icon-shop.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `icon-skull.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `icon-sword.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `icon-trophy.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `icon-users.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |

### `assets/icons/png/` — 17 assets

| Asset | Origen | Formato | Prioridad | Tamaño | Retina | WebP |
|---|---|---|---|---|---|---|
| `icon-badge.png` | EXTRACTED | PNG | REQUIRED | 24×25 | ✓ | — |
| `icon-book.png` | EXTRACTED | PNG | REQUIRED | 25×24 | ✓ | — |
| `icon-chart.png` | EXTRACTED | PNG | REQUIRED | 23×24 | ✓ | — |
| `icon-coins.png` | EXTRACTED | PNG | REQUIRED | 26×25 | ✓ | — |
| `icon-crown.png` | EXTRACTED | PNG | REQUIRED | 28×25 | ✓ | — |
| `icon-gem.png` | EXTRACTED | PNG | REQUIRED | 28×24 | ✓ | — |
| `icon-mail.png` | EXTRACTED | PNG | REQUIRED | 25×21 | ✓ | — |
| `icon-notif-crown.png` | EXTRACTED | PNG | IMPORTANT | 28×23 | ✓ | — |
| `icon-notif-gem.png` | EXTRACTED | PNG | IMPORTANT | 28×26 | ✓ | — |
| `icon-notif-star.png` | EXTRACTED | PNG | IMPORTANT | 27×25 | ✓ | — |
| `icon-settings.png` | EXTRACTED | PNG | REQUIRED | 26×27 | ✓ | — |
| `icon-shield.png` | EXTRACTED | PNG | REQUIRED | 25×29 | ✓ | — |
| `icon-shop.png` | EXTRACTED | PNG | REQUIRED | 27×25 | ✓ | — |
| `icon-skull.png` | EXTRACTED | PNG | REQUIRED | 26×29 | ✓ | — |
| `icon-sword.png` | EXTRACTED | PNG | REQUIRED | 29×30 | ✓ | — |
| `icon-trophy.png` | EXTRACTED | PNG | REQUIRED | 26×26 | ✓ | — |
| `icon-users.png` | EXTRACTED | PNG | REQUIRED | 25×27 | ✓ | — |

### `assets/ui/` — 23 assets

| Asset | Origen | Formato | Prioridad | Tamaño | Retina | WebP |
|---|---|---|---|---|---|---|
| `ui-avatar-frame-gold.png` | EXTRACTED | PNG | REQUIRED | 96×90 | ✓ | ✓ |
| `ui-avatar-frame-legend.png` | EXTRACTED | PNG | REQUIRED | 88×95 | ✓ | ✓ |
| `ui-avatar-frame-neon.png` | EXTRACTED | PNG | REQUIRED | 90×94 | ✓ | ✓ |
| `ui-avatar-frame-purple.png` | EXTRACTED | PNG | REQUIRED | 90×92 | ✓ | ✓ |
| `ui-avatar-frame-red.png` | EXTRACTED | PNG | REQUIRED | 90×92 | ✓ | ✓ |
| `ui-card-new-drop.png` | EXTRACTED | PNG | IMPORTANT | 168×181 | ✓ | ✓ |
| `ui-card-rank-up.png` | EXTRACTED | PNG | IMPORTANT | 146×185 | ✓ | ✓ |
| `ui-card-victory-crate.png` | EXTRACTED | PNG | IMPORTANT | 218×185 | ✓ | ✓ |
| `ui-card-victory.png` | EXTRACTED | PNG | IMPORTANT | 182×180 | ✓ | ✓ |
| `ui-frame-crown.png` | EXTRACTED | PNG | OPTIONAL | 155×58 | ✓ | — |
| `ui-frame-gc.png` | EXTRACTED | PNG | OPTIONAL | 178×60 | ✓ | — |
| `ui-frame-hazard.png` | EXTRACTED | PNG | OPTIONAL | 178×56 | ✓ | ✓ |
| `ui-frame-purple.png` | EXTRACTED | PNG | OPTIONAL | 155×50 | ✓ | — |
| `ui-hazard-bar.png` | EXTRACTED | PNG | OPTIONAL | 95×26 | ✓ | — |
| `ui-loader-gc-ring.png` | EXTRACTED | PNG | IMPORTANT | 91×101 | ✓ | ✓ |
| `ui-loader-paw-ring.png` | EXTRACTED | PNG | IMPORTANT | 85×117 | ✓ | ✓ |
| `ui-loader-portal.png` | EXTRACTED | PNG | IMPORTANT | 88×127 | ✓ | ✓ |
| `ui-rank-elite.png` | EXTRACTED | PNG | REQUIRED | 96×79 | ✓ | — |
| `ui-rank-legend.png` | EXTRACTED | PNG | REQUIRED | 98×81 | ✓ | ✓ |
| `ui-rank-recruit.png` | EXTRACTED | PNG | REQUIRED | 72×73 | ✓ | — |
| `ui-rank-veteran.png` | EXTRACTED | PNG | REQUIRED | 84×77 | ✓ | — |
| `ui-rank-warlord.png` | EXTRACTED | PNG | REQUIRED | 92×82 | ✓ | ✓ |
| `ui-rank-warrior.png` | EXTRACTED | PNG | REQUIRED | 70×77 | ✓ | — |

### `assets/vfx/` — 10 assets

| Asset | Origen | Formato | Prioridad | Tamaño | Retina | WebP |
|---|---|---|---|---|---|---|
| `vfx-claw-purple-01.png` | EXTRACTED | PNG | OPTIONAL | 63×56 | ✓ | — |
| `vfx-claw-purple-02.png` | EXTRACTED | PNG | OPTIONAL | 55×50 | ✓ | — |
| `vfx-flame-purple.png` | EXTRACTED | PNG | OPTIONAL | 56×64 | ✓ | — |
| `vfx-lightning-purple.png` | EXTRACTED | PNG | OPTIONAL | 74×72 | ✓ | — |
| `vfx-lightning-yellow-01.png` | EXTRACTED | PNG | OPTIONAL | 72×71 | ✓ | — |
| `vfx-lightning-yellow-02.png` | EXTRACTED | PNG | OPTIONAL | 59×64 | ✓ | — |
| `vfx-paw-glow.png` | EXTRACTED | PNG | OPTIONAL | 47×72 | ✓ | — |
| `vfx-portal.png` | EXTRACTED | PNG | IMPORTANT | 72×134 | ✓ | ✓ |
| `vfx-swoosh-purple.png` | EXTRACTED | PNG | OPTIONAL | 95×56 | ✓ | — |
| `vfx-swoosh-yellow.png` | EXTRACTED | PNG | OPTIONAL | 99×44 | ✓ | — |

### `assets/decorations/` — 20 assets

| Asset | Origen | Formato | Prioridad | Tamaño | Retina | WebP |
|---|---|---|---|---|---|---|
| `decal-claw-yellow.png` | EXTRACTED | PNG | OPTIONAL | 43×41 | ✓ | — |
| `decal-crown-01.png` | EXTRACTED | PNG | OPTIONAL | 44×37 | ✓ | — |
| `decal-crown-02.png` | EXTRACTED | PNG | OPTIONAL | 41×37 | ✓ | — |
| `decal-dominate.png` | EXTRACTED | PNG | OPTIONAL | 73×38 | ✓ | — |
| `decal-exclaim.png` | EXTRACTED | PNG | OPTIONAL | 16×34 | ✓ | — |
| `decal-gamepad.png` | EXTRACTED | PNG | OPTIONAL | 56×34 | ✓ | — |
| `decal-gc-tag.png` | EXTRACTED | PNG | OPTIONAL | 53×36 | ✓ | — |
| `decal-legion.png` | EXTRACTED | PNG | OPTIONAL | 61×39 | ✓ | — |
| `decal-paw-purple.png` | EXTRACTED | PNG | OPTIONAL | 40×39 | ✓ | — |
| `decal-question.png` | EXTRACTED | PNG | OPTIONAL | 24×33 | ✓ | — |
| `decal-scratch-purple.png` | EXTRACTED | PNG | OPTIONAL | 106×24 | ✓ | — |
| `decal-skull-white.png` | EXTRACTED | PNG | OPTIONAL | 34×39 | ✓ | — |
| `decal-skull-yellow.png` | EXTRACTED | PNG | OPTIONAL | 28×37 | ✓ | — |
| `decal-splatter.png` | EXTRACTED | PNG | OPTIONAL | 35×17 | ✓ | — |
| `decal-star-4point.png` | EXTRACTED | PNG | OPTIONAL | 32×32 | ✓ | — |
| `decal-star-purple.png` | EXTRACTED | PNG | OPTIONAL | 29×30 | ✓ | — |
| `decal-warning.png` | EXTRACTED | PNG | OPTIONAL | 35×30 | ✓ | — |
| `decoration-paw-print.png` | EXTRACTED | PNG | OPTIONAL | 117×120 | ✓ | ✓ |
| `decoration-portal.png` | EXTRACTED | PNG | OPTIONAL | 77×178 | ✓ | ✓ |
| `decoration-tail-swoosh.png` | EXTRACTED | PNG | OPTIONAL | 136×133 | ✓ | ✓ |

### `assets/ranking/` — 31 assets

| Asset | Origen | Formato | Prioridad | Tamaño | Retina | WebP |
|---|---|---|---|---|---|---|
| `avatar-frame-default.svg` | NEW / DESIGNED | SVG | REQUIRED | 128×128 vector | — | — |
| `avatar-frame-featured.svg` | NEW / DESIGNED | SVG | IMPORTANT | 128×128 vector | — | — |
| `avatar-frame-highlight.svg` | NEW / DESIGNED | SVG | IMPORTANT | 128×128 vector | — | — |
| `avatar-frame-top1.svg` | NEW / DESIGNED | SVG | REQUIRED | 128×128 vector | — | — |
| `avatar-frame-top2.svg` | NEW / DESIGNED | SVG | REQUIRED | 128×128 vector | — | — |
| `avatar-frame-top3.svg` | NEW / DESIGNED | SVG | REQUIRED | 128×128 vector | — | — |
| `event-valle-espiritus.svg` | NEW / DESIGNED | SVG | OPTIONAL | 48×48 vector | — | — |
| `icon-class-archer.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `icon-class-berserker.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `icon-class-cavalry.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `rank-badge-01.svg` | NEW / DESIGNED | SVG | REQUIRED | 48×52 vector | — | — |
| `rank-badge-02.svg` | NEW / DESIGNED | SVG | REQUIRED | 48×52 vector | — | — |
| `rank-badge-03.svg` | NEW / DESIGNED | SVG | REQUIRED | 48×52 vector | — | — |
| `rank-badge-04.svg` | NEW / DESIGNED | SVG | REQUIRED | 48×52 vector | — | — |
| `rank-badge-05.svg` | NEW / DESIGNED | SVG | REQUIRED | 48×52 vector | — | — |
| `rank-badge-06.svg` | NEW / DESIGNED | SVG | REQUIRED | 48×52 vector | — | — |
| `rank-change-down.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `rank-change-same.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `rank-change-up.svg` | NEW / DESIGNED | SVG | REQUIRED | 24×24 vector | — | — |
| `rank-new-badge.svg` | NEW / DESIGNED | SVG | REQUIRED | 64×26 vector | — | — |
| `ranking-chevron.svg` | NEW / DESIGNED | SVG | OPTIONAL | 16×16 vector | — | — |
| `ranking-crown.svg` | NEW / DESIGNED | SVG | IMPORTANT | 72×54 vector | — | — |
| `ranking-decoration-corner.svg` | NEW / DESIGNED | SVG | OPTIONAL | 48×48 vector | — | — |
| `ranking-decoration-halftone.svg` | NEW / DESIGNED | SVG | OPTIONAL | 24×24 vector | — | — |
| `ranking-decoration-particles.svg` | NEW / DESIGNED | SVG | OPTIONAL | 240×120 vector | — | — |
| `ranking-header-emblem.svg` | NEW / DESIGNED | SVG | IMPORTANT | 96×96 vector | — | — |
| `ranking-header-underline.svg` | NEW / DESIGNED | SVG | OPTIONAL | 360×14 vector | — | — |
| `ranking-podium.svg` | NEW / DESIGNED | SVG | IMPORTANT | 960×133 vector | — | — |
| `ranking-rank-plate.svg` | NEW / DESIGNED | SVG | OPTIONAL | 64×72 vector | — | — |
| `ranking-reward-marker.svg` | NEW / DESIGNED | SVG | OPTIONAL | 28×28 vector | — | — |
| `ranking-separator.svg` | NEW / DESIGNED | SVG | OPTIONAL | 1200×10 vector | — | — |

---

## 3. CSS / HTML — no son assets

Estos elementos aparecen en el diseño y en el sistema de ranking, y **no deben** convertirse en imágenes.

| Elemento | Implementación |
|---|---|
| Títulos, nombres de operativo, IDs, poder, puntos, kills, bajas | HTML + CSS. Montserrat 900 italic (display), JetBrains Mono 700 (cifras), Inter (texto). |
| Chip de servidor (`S-1247`) | CSS. `clip-path:polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)` + mono 10px. Solo texto. |
| Chip de clase | CSS + el SVG del icono. La píldora y el texto son CSS; solo el icono es asset. |
| Acordeón (panel, celdas, línea de tiempo, rombos) | CSS. El rombo es un cuadrado de 11px con `transform:rotate(45deg)`. |
| Zona de arrastre de captura | CSS. `border:2px dashed var(--outline-variant)`. |
| Barra de precisión de extracción | CSS. Track + fill con `linear-gradient(90deg,#8D59FD,#D6FA38)`. |
| Registro de escaneos (filas del log) | HTML + CSS. Solo el emblema del evento es asset. |
| Miniatura de la captura escaneada | La imagen real subida por el usuario. En la preview es un marcador CSS. |
| Números de posición `#1 … #100` | HTML + CSS mono. `ranking-rank-plate.svg` solo si quieres placa detrás del número en el top 3. |
| Contenedor del leaderboard, filas, hover, fila propia | HTML + CSS. `border-radius:20px`, filas con `border-bottom` y barra de acento de 3px. |
| Esquinas cortadas a 45° de las tarjetas del podio | CSS `clip-path: polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)`. |
| Hazard tape (cabecera, base del podio) | CSS `repeating-linear-gradient(45deg,#D6FA38 0 12px,#131315 12px 24px)`. |
| Halftone del fondo | CSS `radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)` a `6px 6px`. |
| Underglow neón de la tarjeta #1, hover y fila propia | CSS `box-shadow: 0 0 34px -6px rgba(214,250,56,.45)`. |
| Pills `LIVE`, `SEASON 04`, `LVL 64`, chips de stats | HTML + CSS. `border-radius:999px`. |
| Barras de progreso de temporada | CSS `linear-gradient(90deg,#8D59FD,#D6FA38)`. |
| Skeletons de carga del leaderboard | CSS. Rectángulos `#1F1F21` con shimmer; no uses `ui-loader-*` para filas. |
| Paginación / scroll infinito | HTML + CSS. |
| Contador regresivo de temporada | HTML + JS + CSS mono. |
