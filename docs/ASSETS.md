# GUILD CORE — Asset Pack

Inventario de assets extraidos de los dos disenos del proyecto, preparados para
implementacion frontend. Todos los PNG llevan **alpha channel real** (sin fondo
blanco, negro, gris ni checkerboard pintado).

- **Fuentes:** `design-01` = lamina de stickers/emotes (1536x1024), `design-02` = lamina de marca/UI/character sheet (1536x1024).
- **Total del pack:** 199 assets (147 PNG + 52 SVG) + variantes `@2x` y `.webp` en los pesados.
  De esos, 168 salen de la extracción de la fase 1 (147 PNG + 21 SVG de iconografía); 31 SVG son del sistema de ranking.
- **Design system:** ver `DESIGN.txt`. Primario `#D6FA38`, secundario `#8D59FD`, superficie `#131315`.

> **Este documento cubre la fase 1: la extracción.** El pack incluye además el sistema de
> Ranking privado del clan (31 SVG en `assets/ranking/`). Para eso ve a
> `ASSET_MAP.md` (mapa completo, marcado EXTRACTED / NEW), `RANKING_SYSTEM.md`,
> `RANKING_RESPONSIVE.md` y `FRONTEND_HANDOFF.md`.
> Previews: `preview.html` (pack completo) y `ranking-preview.html` (las dos pantallas del
> ranking: escaneo del evento y ranking del clan).

---

## 1. Estructura de carpetas

```text
public/
└── assets/
    ├── brand/          logo GC
    ├── hero/           ilustraciones principales de portada
    ├── characters/     cuerpo entero, turnaround, skins, poses
    ├── emotes/         cabezas para chat y reacciones
    ├── scenes/         ilustraciones de estado (empty, error, reward...)
    ├── items/          armas, gear y economia
    ├── icons/
    │   ├── svg/        iconografia de produccion (vector, recoloreable)
    │   └── png/        referencia rasterizada extraida del diseno
    ├── ui/             avatar frames, rank badges, loaders, cards
    ├── vfx/            efectos aditivos (slashes, rayos, portal)
    ├── decorations/    decals, grafitis, texturas sueltas
    └── backgrounds/    (vacio — ver seccion 5)
```

Cada PNG tiene una variante retina: `nombre.png` + `nombre@2x.png`.
El `@2x` es Lanczos + unsharp suave sobre RGB (el alpha no se toca).
**El archivo sin sufijo es el pixel original: usalo como referencia de fidelidad.**

Generar WebP si lo necesitas (no incluido para no anadir compresion destructiva):

```bash
find public/assets -name '*.png' -exec sh -c \
  'cwebp -q 92 -alpha_q 100 "$1" -o "${1%.png}.webp"' _ {} \;
```

---

## 2. Como se extrajo (para que puedas confiar en el alpha)

1. Modelo de fondo por lamina: difusion inpainting multi-escala con las siluetas enmascaradas → fondo limpio sin contaminacion del sujeto.
2. Segmentacion por panel/celda y recorte al bounding box real del contenido.
3. Matte por elemento:
   - fondo plano (paneles de UI) → ajuste polinomico desde el anillo del recorte;
   - fondo complejo (personajes sobre pintura/degradado) → GrabCut + refinado por residuo;
   - efectos de luz → alpha proporcional al exceso de luminancia sobre el fondo (glow aditivo real).
4. **Unpremultiply** `F = (C − (1−α)·B) / α` para recuperar el color puro del asset: por eso los glows conservan su color saturado en vez de arrastrar el morado del fondo.
5. Verificacion automatica: 147/147 PNG con canal alpha real, sin recortes del sujeto.

---

## 3. Inventario

Prioridades: **REQUIRED** 46 · **IMPORTANT** 46 · **OPTIONAL** 76

### `brand/` — Brand (1)

| Asset | Tipo | Seccion | Prioridad | Transparencia | Nativo | @2x | Uso |
|---|---|---|---|---|---|---|---|
| `brand-logo-gc.png` | PNG RGBA | Global / Navbar / Splash | REQUIRED | si (alpha real) | 199x176 | 398x352 | Logo principal de la marca. Navbar, pantalla de carga, footer, favicon base. |

### `hero/` — Hero (2)

| Asset | Tipo | Seccion | Prioridad | Transparencia | Nativo | @2x | Uso |
|---|---|---|---|---|---|---|---|
| `hero-character-main.png` | PNG RGBA | Landing / Hero | REQUIRED | si (alpha real) | 305x512 | 610x1024 | Ilustracion principal del hero. Posicionar a la derecha del titular. |
| `hero-character-throne.png` | PNG RGBA | Premium / Tier Warlord | IMPORTANT | si (alpha real) | 307x310 | 614x620 | Arte de tier maximo: paywall premium, pantalla de rango Warlord, banner de temporada. |

### `characters/` — Characters (24)

| Asset | Tipo | Seccion | Prioridad | Transparencia | Nativo | @2x | Uso |
|---|---|---|---|---|---|---|---|
| `character-dash-green.png` | PNG RGBA | Estados / Microinteracciones | OPTIONAL | si (alpha real) | 225x153 | 450x306 | Ilustracion secundaria para estados (idle, offline, vacio, 404). |
| `character-dash-purple.png` | PNG RGBA | Estados / Microinteracciones | OPTIONAL | si (alpha real) | 205x143 | 410x286 | Ilustracion secundaria para estados (idle, offline, vacio, 404). |
| `character-gamer-seated.png` | PNG RGBA | Marketing / Cards | IMPORTANT | si (alpha real) | 221x264 | 442x528 | Ilustracion chibi de cuerpo entero para cards, banners y modales. |
| `character-hero-katana.png` | PNG RGBA | Marketing / Cards | IMPORTANT | si (alpha real) | 385x353 | 770x706 | Ilustracion chibi de cuerpo entero para cards, banners y modales. |
| `character-in-box.png` | PNG RGBA | Estados / Microinteracciones | OPTIONAL | si (alpha real) | 152x133 | 304x266 | Ilustracion secundaria para estados (idle, offline, vacio, 404). |
| `character-leader-cape.png` | PNG RGBA | Marketing / Cards | IMPORTANT | si (alpha real) | 212x335 | 424x670 | Ilustracion chibi de cuerpo entero para cards, banners y modales. |
| `character-ninja-daggers.png` | PNG RGBA | Marketing / Cards | IMPORTANT | si (alpha real) | 247x245 | 494x490 | Ilustracion chibi de cuerpo entero para cards, banners y modales. |
| `character-outfit-cyber.png` | PNG RGBA | Tienda / Skins | IMPORTANT | si (alpha real) | 132x218 | 264x436 | Variantes de skin (Stealth, Cyber, Warlord) para la tienda y el preview de equipamiento. |
| `character-outfit-stealth.png` | PNG RGBA | Tienda / Skins | IMPORTANT | si (alpha real) | 126x243 | 252x486 | Variantes de skin (Stealth, Cyber, Warlord) para la tienda y el preview de equipamiento. |
| `character-outfit-warlord.png` | PNG RGBA | Tienda / Skins | IMPORTANT | si (alpha real) | 148x239 | 296x478 | Variantes de skin (Stealth, Cyber, Warlord) para la tienda y el preview de equipamiento. |
| `character-pointing-up.png` | PNG RGBA | Marketing / Cards | IMPORTANT | si (alpha real) | 209x293 | 418x586 | Ilustracion chibi de cuerpo entero para cards, banners y modales. |
| `character-pose-crouch.png` | PNG RGBA | Onboarding / Estados | IMPORTANT | si (alpha real) | 178x165 | 356x330 | Poses de accion para banners, estados vacios y transiciones. |
| `character-pose-gamer.png` | PNG RGBA | Onboarding / Estados | IMPORTANT | si (alpha real) | 132x195 | 264x390 | Poses de accion para banners, estados vacios y transiciones. |
| `character-pose-leap.png` | PNG RGBA | Onboarding / Estados | IMPORTANT | si (alpha real) | 221x127 | 442x254 | Poses de accion para banners, estados vacios y transiciones. |
| `character-pose-punch.png` | PNG RGBA | Onboarding / Estados | IMPORTANT | si (alpha real) | 164x132 | 328x264 | Poses de accion para banners, estados vacios y transiciones. |
| `character-pose-slash.png` | PNG RGBA | Onboarding / Estados | IMPORTANT | si (alpha real) | 168x168 | 336x336 | Poses de accion para banners, estados vacios y transiciones. |
| `character-sit-aura.png` | PNG RGBA | Estados / Microinteracciones | OPTIONAL | si (alpha real) | 177x133 | 354x266 | Ilustracion secundaria para estados (idle, offline, vacio, 404). |
| `character-sleeping.png` | PNG RGBA | Estados / Microinteracciones | OPTIONAL | si (alpha real) | 165x111 | 330x222 | Ilustracion secundaria para estados (idle, offline, vacio, 404). |
| `character-turnaround-back.png` | PNG RGBA | Perfil / Character sheet | IMPORTANT | si (alpha real) | 135x301 | 270x602 | Vistas del personaje (frente, lateral, espalda) para la ficha de personaje o el selector. |
| `character-turnaround-front.png` | PNG RGBA | Perfil / Character sheet | IMPORTANT | si (alpha real) | 153x312 | 306x624 | Vistas del personaje (frente, lateral, espalda) para la ficha de personaje o el selector. |
| `character-turnaround-side.png` | PNG RGBA | Perfil / Character sheet | IMPORTANT | si (alpha real) | 149x297 | 298x594 | Vistas del personaje (frente, lateral, espalda) para la ficha de personaje o el selector. |
| `character-walk-backpack.png` | PNG RGBA | Estados / Microinteracciones | OPTIONAL | si (alpha real) | 136x197 | 272x394 | Ilustracion secundaria para estados (idle, offline, vacio, 404). |
| `character-warlord-throne.png` | PNG RGBA | Marketing / Cards | IMPORTANT | si (alpha real) | 278x314 | 556x628 | Ilustracion chibi de cuerpo entero para cards, banners y modales. |
| `character-wave.png` | PNG RGBA | Estados / Microinteracciones | OPTIONAL | si (alpha real) | 162x144 | 324x288 | Ilustracion secundaria para estados (idle, offline, vacio, 404). |

### `emotes/` — Emotes (18)

| Asset | Tipo | Seccion | Prioridad | Transparencia | Nativo | @2x | Uso |
|---|---|---|---|---|---|---|---|
| `emote-chill.png` | PNG RGBA | Chat / Reacciones | IMPORTANT | si (alpha real) | 135x130 | 270x260 | Emote de chat y reacciones. Tamano recomendado 48-64px. |
| `emote-cool.png` | PNG RGBA | Chat / Reacciones | IMPORTANT | si (alpha real) | 135x131 | 270x262 | Emote de chat y reacciones. Tamano recomendado 48-64px. |
| `emote-fangs.png` | PNG RGBA | Chat / Reacciones | IMPORTANT | si (alpha real) | 138x138 | 276x276 | Emote de chat y reacciones. Tamano recomendado 48-64px. |
| `emote-gaming.png` | PNG RGBA | Chat / Reacciones | IMPORTANT | si (alpha real) | 152x142 | 304x284 | Emote de chat y reacciones. Tamano recomendado 48-64px. |
| `emote-grin.png` | PNG RGBA | Chat / Reacciones | IMPORTANT | si (alpha real) | 128x135 | 256x270 | Emote de chat y reacciones. Tamano recomendado 48-64px. |
| `emote-happy.png` | PNG RGBA | Chat / Reacciones | IMPORTANT | si (alpha real) | 139x138 | 278x276 | Emote de chat y reacciones. Tamano recomendado 48-64px. |
| `emote-hood-01.png` | PNG RGBA | Chat / Reacciones | OPTIONAL | si (alpha real) | 79x80 | 158x160 | Variante encapuchada del set de emotes. Baja resolucion: usar <=32px. |
| `emote-hood-02.png` | PNG RGBA | Chat / Reacciones | OPTIONAL | si (alpha real) | 70x78 | 140x156 | Variante encapuchada del set de emotes. Baja resolucion: usar <=32px. |
| `emote-hood-03.png` | PNG RGBA | Chat / Reacciones | OPTIONAL | si (alpha real) | 82x79 | 164x158 | Variante encapuchada del set de emotes. Baja resolucion: usar <=32px. |
| `emote-hood-04.png` | PNG RGBA | Chat / Reacciones | OPTIONAL | si (alpha real) | 78x82 | 156x164 | Variante encapuchada del set de emotes. Baja resolucion: usar <=32px. |
| `emote-hood-05.png` | PNG RGBA | Chat / Reacciones | OPTIONAL | si (alpha real) | 80x84 | 160x168 | Variante encapuchada del set de emotes. Baja resolucion: usar <=32px. |
| `emote-hood-06.png` | PNG RGBA | Chat / Reacciones | OPTIONAL | si (alpha real) | 82x85 | 164x170 | Variante encapuchada del set de emotes. Baja resolucion: usar <=32px. |
| `emote-hood-07.png` | PNG RGBA | Chat / Reacciones | OPTIONAL | si (alpha real) | 86x89 | 172x178 | Variante encapuchada del set de emotes. Baja resolucion: usar <=32px. |
| `emote-hood-08.png` | PNG RGBA | Chat / Reacciones | OPTIONAL | si (alpha real) | 75x88 | 150x176 | Variante encapuchada del set de emotes. Baja resolucion: usar <=32px. |
| `emote-laugh.png` | PNG RGBA | Chat / Reacciones | IMPORTANT | si (alpha real) | 131x136 | 262x272 | Emote de chat y reacciones. Tamano recomendado 48-64px. |
| `emote-shock.png` | PNG RGBA | Chat / Reacciones | IMPORTANT | si (alpha real) | 135x144 | 270x288 | Emote de chat y reacciones. Tamano recomendado 48-64px. |
| `emote-thinking.png` | PNG RGBA | Chat / Reacciones | IMPORTANT | si (alpha real) | 133x149 | 266x298 | Emote de chat y reacciones. Tamano recomendado 48-64px. |
| `emote-wink.png` | PNG RGBA | Chat / Reacciones | IMPORTANT | si (alpha real) | 148x133 | 296x266 | Emote de chat y reacciones. Tamano recomendado 48-64px. |

### `scenes/` — Scenes (ilustraciones de estado) (13)

| Asset | Tipo | Seccion | Prioridad | Transparencia | Nativo | @2x | Uso |
|---|---|---|---|---|---|---|---|
| `scene-announcement.png` | PNG RGBA | Estados vacios / Onboarding | OPTIONAL | si (alpha real) | 222x199 | 444x398 | Ilustracion de escena para empty states, onboarding, error, exito y recompensas. |
| `scene-error.png` | PNG RGBA | Estados vacios / Onboarding | OPTIONAL | si (alpha real) | 217x148 | 434x296 | Ilustracion de escena para empty states, onboarding, error, exito y recompensas. |
| `scene-idle-meditation.png` | PNG RGBA | Estados vacios / Onboarding | OPTIONAL | si (alpha real) | 205x175 | 410x350 | Ilustracion de escena para empty states, onboarding, error, exito y recompensas. |
| `scene-login-secure.png` | PNG RGBA | Estados vacios / Onboarding | OPTIONAL | si (alpha real) | 214x169 | 428x338 | Ilustracion de escena para empty states, onboarding, error, exito y recompensas. |
| `scene-matchmaking.png` | PNG RGBA | Estados vacios / Onboarding | OPTIONAL | si (alpha real) | 187x206 | 374x412 | Ilustracion de escena para empty states, onboarding, error, exito y recompensas. |
| `scene-reward-chest.png` | PNG RGBA | Estados vacios / Onboarding | OPTIONAL | si (alpha real) | 224x187 | 448x374 | Ilustracion de escena para empty states, onboarding, error, exito y recompensas. |
| `scene-search.png` | PNG RGBA | Estados vacios / Onboarding | OPTIONAL | si (alpha real) | 196x175 | 392x350 | Ilustracion de escena para empty states, onboarding, error, exito y recompensas. |
| `scene-stats-dashboard.png` | PNG RGBA | Estados vacios / Onboarding | OPTIONAL | si (alpha real) | 224x213 | 448x426 | Ilustracion de escena para empty states, onboarding, error, exito y recompensas. |
| `scene-streaming.png` | PNG RGBA | Estados vacios / Onboarding | OPTIONAL | si (alpha real) | 198x215 | 396x430 | Ilustracion de escena para empty states, onboarding, error, exito y recompensas. |
| `scene-success.png` | PNG RGBA | Estados vacios / Onboarding | OPTIONAL | si (alpha real) | 190x170 | 380x340 | Ilustracion de escena para empty states, onboarding, error, exito y recompensas. |
| `scene-verified.png` | PNG RGBA | Estados vacios / Onboarding | OPTIONAL | si (alpha real) | 197x212 | 394x424 | Ilustracion de escena para empty states, onboarding, error, exito y recompensas. |
| `scene-victory-podium.png` | PNG RGBA | Estados vacios / Onboarding | OPTIONAL | si (alpha real) | 219x214 | 438x428 | Ilustracion de escena para empty states, onboarding, error, exito y recompensas. |
| `scene-workstation.png` | PNG RGBA | Estados vacios / Onboarding | OPTIONAL | si (alpha real) | 170x171 | 340x342 | Ilustracion de escena para empty states, onboarding, error, exito y recompensas. |

### `items/` — Items / Gear / Economia (19)

| Asset | Tipo | Seccion | Prioridad | Transparencia | Nativo | @2x | Uso |
|---|---|---|---|---|---|---|---|
| `item-backpack.png` | PNG RGBA | Inventario / Tienda | REQUIRED | si (alpha real) | 77x94 | 154x188 | Icono de equipamiento para grid de inventario y tienda. |
| `item-cap-gc.png` | PNG RGBA | Inventario / Tienda | REQUIRED | si (alpha real) | 94x87 | 188x174 | Icono de equipamiento para grid de inventario y tienda. |
| `item-chest-gold.png` | PNG RGBA | Economia / Wallet | REQUIRED | si (alpha real) | 76x65 | 152x130 | Moneda, gema, cofre y bolsa: wallet, tienda, recompensas y pop-ups de drop. |
| `item-coin-gc.png` | PNG RGBA | Economia / Wallet | REQUIRED | si (alpha real) | 59x54 | 118x108 | Moneda, gema, cofre y bolsa: wallet, tienda, recompensas y pop-ups de drop. |
| `item-coin-stack.png` | PNG RGBA | Economia / Wallet | REQUIRED | si (alpha real) | 57x50 | 114x100 | Moneda, gema, cofre y bolsa: wallet, tienda, recompensas y pop-ups de drop. |
| `item-collar-gold.png` | PNG RGBA | Inventario / Tienda | REQUIRED | si (alpha real) | 93x52 | 186x104 | Icono de equipamiento para grid de inventario y tienda. |
| `item-collar-neon.png` | PNG RGBA | Inventario / Tienda | REQUIRED | si (alpha real) | 81x63 | 162x126 | Icono de equipamiento para grid de inventario y tienda. |
| `item-crate-gc.png` | PNG RGBA | Economia / Wallet | REQUIRED | si (alpha real) | 172x125 | 344x250 | Moneda, gema, cofre y bolsa: wallet, tienda, recompensas y pop-ups de drop. |
| `item-dagger-01.png` | PNG RGBA | Inventario / Tienda | REQUIRED | si (alpha real) | 57x103 | 114x206 | Icono de arma para grid de inventario, loadout y tienda. |
| `item-dagger-02.png` | PNG RGBA | Inventario / Tienda | REQUIRED | si (alpha real) | 55x90 | 110x180 | Icono de arma para grid de inventario, loadout y tienda. |
| `item-gem-purple.png` | PNG RGBA | Economia / Wallet | REQUIRED | si (alpha real) | 60x70 | 120x140 | Moneda, gema, cofre y bolsa: wallet, tienda, recompensas y pop-ups de drop. |
| `item-headset-cat.png` | PNG RGBA | Inventario / Tienda | REQUIRED | si (alpha real) | 81x72 | 162x144 | Icono de equipamiento para grid de inventario y tienda. |
| `item-katana-neon.png` | PNG RGBA | Inventario / Tienda | REQUIRED | si (alpha real) | 79x132 | 158x264 | Icono de arma para grid de inventario, loadout y tienda. |
| `item-katana-purple.png` | PNG RGBA | Inventario / Tienda | REQUIRED | si (alpha real) | 75x135 | 150x270 | Icono de arma para grid de inventario, loadout y tienda. |
| `item-money-bag.png` | PNG RGBA | Economia / Wallet | REQUIRED | si (alpha real) | 55x56 | 110x112 | Moneda, gema, cofre y bolsa: wallet, tienda, recompensas y pop-ups de drop. |
| `item-scabbard-01.png` | PNG RGBA | Inventario / Tienda | REQUIRED | si (alpha real) | 91x34 | 182x68 | Icono de equipamiento para grid de inventario y tienda. |
| `item-scabbard-02.png` | PNG RGBA | Inventario / Tienda | REQUIRED | si (alpha real) | 80x31 | 160x62 | Icono de equipamiento para grid de inventario y tienda. |
| `item-shuriken.png` | PNG RGBA | Inventario / Tienda | REQUIRED | si (alpha real) | 67x79 | 134x158 | Icono de arma para grid de inventario, loadout y tienda. |
| `item-shuriken-purple.png` | PNG RGBA | Inventario / Tienda | REQUIRED | si (alpha real) | 90x116 | 180x232 | Icono de arma para grid de inventario, loadout y tienda. |

### `icons/svg/` — Icons — SVG (produccion) (21)

| Asset | Tipo | Seccion | Prioridad | Transparencia | Nativo | @2x | Uso |
|---|---|---|---|---|---|---|---|
| `decal-claw.svg` | SVG | Fondos / Decoracion | IMPORTANT | vectorial | 24x24 (escalable) | — | Version vectorial nitida del decal. Escalable, recoloreable con currentColor. |
| `decal-crown-outline.svg` | SVG | Fondos / Decoracion | IMPORTANT | vectorial | 24x24 (escalable) | — | Version vectorial nitida del decal. Escalable, recoloreable con currentColor. |
| `decal-gamepad.svg` | SVG | Fondos / Decoracion | IMPORTANT | vectorial | 24x24 (escalable) | — | Version vectorial nitida del decal. Escalable, recoloreable con currentColor. |
| `decal-paw.svg` | SVG | Fondos / Decoracion | IMPORTANT | vectorial | 24x24 (escalable) | — | Version vectorial nitida del decal. Escalable, recoloreable con currentColor. |
| `decal-skull.svg` | SVG | Fondos / Decoracion | IMPORTANT | vectorial | 24x24 (escalable) | — | Version vectorial nitida del decal. Escalable, recoloreable con currentColor. |
| `decal-star-4point.svg` | SVG | Fondos / Decoracion | IMPORTANT | vectorial | 24x24 (escalable) | — | Version vectorial nitida del decal. Escalable, recoloreable con currentColor. |
| `decal-warning.svg` | SVG | Fondos / Decoracion | IMPORTANT | vectorial | 24x24 (escalable) | — | Version vectorial nitida del decal. Escalable, recoloreable con currentColor. |
| `icon-badge.svg` | SVG | Navegacion / HUD | REQUIRED | vectorial | 24x24 (escalable) | — | Icono vectorial de UI. Escalable y recoloreable con currentColor. |
| `icon-book.svg` | SVG | Navegacion / HUD | REQUIRED | vectorial | 24x24 (escalable) | — | Icono vectorial de UI. Escalable y recoloreable con currentColor. |
| `icon-chart.svg` | SVG | Navegacion / HUD | REQUIRED | vectorial | 24x24 (escalable) | — | Icono vectorial de UI. Escalable y recoloreable con currentColor. |
| `icon-coins.svg` | SVG | Navegacion / HUD | REQUIRED | vectorial | 24x24 (escalable) | — | Icono vectorial de UI. Escalable y recoloreable con currentColor. |
| `icon-crown.svg` | SVG | Navegacion / HUD | REQUIRED | vectorial | 24x24 (escalable) | — | Icono vectorial de UI. Escalable y recoloreable con currentColor. |
| `icon-gem.svg` | SVG | Navegacion / HUD | REQUIRED | vectorial | 24x24 (escalable) | — | Icono vectorial de UI. Escalable y recoloreable con currentColor. |
| `icon-mail.svg` | SVG | Navegacion / HUD | REQUIRED | vectorial | 24x24 (escalable) | — | Icono vectorial de UI. Escalable y recoloreable con currentColor. |
| `icon-settings.svg` | SVG | Navegacion / HUD | REQUIRED | vectorial | 24x24 (escalable) | — | Icono vectorial de UI. Escalable y recoloreable con currentColor. |
| `icon-shield.svg` | SVG | Navegacion / HUD | REQUIRED | vectorial | 24x24 (escalable) | — | Icono vectorial de UI. Escalable y recoloreable con currentColor. |
| `icon-shop.svg` | SVG | Navegacion / HUD | REQUIRED | vectorial | 24x24 (escalable) | — | Icono vectorial de UI. Escalable y recoloreable con currentColor. |
| `icon-skull.svg` | SVG | Navegacion / HUD | REQUIRED | vectorial | 24x24 (escalable) | — | Icono vectorial de UI. Escalable y recoloreable con currentColor. |
| `icon-sword.svg` | SVG | Navegacion / HUD | REQUIRED | vectorial | 24x24 (escalable) | — | Icono vectorial de UI. Escalable y recoloreable con currentColor. |
| `icon-trophy.svg` | SVG | Navegacion / HUD | REQUIRED | vectorial | 24x24 (escalable) | — | Icono vectorial de UI. Escalable y recoloreable con currentColor. |
| `icon-users.svg` | SVG | Navegacion / HUD | REQUIRED | vectorial | 24x24 (escalable) | — | Icono vectorial de UI. Escalable y recoloreable con currentColor. |

### `icons/png/` — Icons — PNG (referencia extraida) (17)

| Asset | Tipo | Seccion | Prioridad | Transparencia | Nativo | @2x | Uso |
|---|---|---|---|---|---|---|---|
| `icon-badge.png` | PNG RGBA | Navegacion / HUD | OPTIONAL | si (alpha real) | 24x25 | 48x50 | Referencia rasterizada del icono. Usar la version SVG en produccion. |
| `icon-book.png` | PNG RGBA | Navegacion / HUD | OPTIONAL | si (alpha real) | 25x24 | 50x48 | Referencia rasterizada del icono. Usar la version SVG en produccion. |
| `icon-chart.png` | PNG RGBA | Navegacion / HUD | OPTIONAL | si (alpha real) | 23x24 | 46x48 | Referencia rasterizada del icono. Usar la version SVG en produccion. |
| `icon-coins.png` | PNG RGBA | Navegacion / HUD | OPTIONAL | si (alpha real) | 26x25 | 52x50 | Referencia rasterizada del icono. Usar la version SVG en produccion. |
| `icon-crown.png` | PNG RGBA | Navegacion / HUD | OPTIONAL | si (alpha real) | 28x25 | 56x50 | Referencia rasterizada del icono. Usar la version SVG en produccion. |
| `icon-gem.png` | PNG RGBA | Navegacion / HUD | OPTIONAL | si (alpha real) | 28x24 | 56x48 | Referencia rasterizada del icono. Usar la version SVG en produccion. |
| `icon-mail.png` | PNG RGBA | Navegacion / HUD | OPTIONAL | si (alpha real) | 25x21 | 50x42 | Referencia rasterizada del icono. Usar la version SVG en produccion. |
| `icon-notif-crown.png` | PNG RGBA | Notificaciones | IMPORTANT | si (alpha real) | 28x23 | 56x46 | Icono de toast/notificacion. Preferir el SVG equivalente si existe. |
| `icon-notif-gem.png` | PNG RGBA | Notificaciones | IMPORTANT | si (alpha real) | 28x26 | 56x52 | Icono de toast/notificacion. Preferir el SVG equivalente si existe. |
| `icon-notif-star.png` | PNG RGBA | Notificaciones | IMPORTANT | si (alpha real) | 27x25 | 54x50 | Icono de toast/notificacion. Preferir el SVG equivalente si existe. |
| `icon-settings.png` | PNG RGBA | Navegacion / HUD | OPTIONAL | si (alpha real) | 26x27 | 52x54 | Referencia rasterizada del icono. Usar la version SVG en produccion. |
| `icon-shield.png` | PNG RGBA | Navegacion / HUD | OPTIONAL | si (alpha real) | 25x29 | 50x58 | Referencia rasterizada del icono. Usar la version SVG en produccion. |
| `icon-shop.png` | PNG RGBA | Navegacion / HUD | OPTIONAL | si (alpha real) | 27x25 | 54x50 | Referencia rasterizada del icono. Usar la version SVG en produccion. |
| `icon-skull.png` | PNG RGBA | Navegacion / HUD | OPTIONAL | si (alpha real) | 26x29 | 52x58 | Referencia rasterizada del icono. Usar la version SVG en produccion. |
| `icon-sword.png` | PNG RGBA | Navegacion / HUD | OPTIONAL | si (alpha real) | 29x30 | 58x60 | Referencia rasterizada del icono. Usar la version SVG en produccion. |
| `icon-trophy.png` | PNG RGBA | Navegacion / HUD | OPTIONAL | si (alpha real) | 26x26 | 52x52 | Referencia rasterizada del icono. Usar la version SVG en produccion. |
| `icon-users.png` | PNG RGBA | Navegacion / HUD | OPTIONAL | si (alpha real) | 25x27 | 50x54 | Referencia rasterizada del icono. Usar la version SVG en produccion. |

### `ui/` — UI (23)

| Asset | Tipo | Seccion | Prioridad | Transparencia | Nativo | @2x | Uso |
|---|---|---|---|---|---|---|---|
| `ui-avatar-frame-gold.png` | PNG RGBA | Perfil / Leaderboard | REQUIRED | si (alpha real) | 96x90 | 192x180 | Marco de avatar por tier. Superponer sobre el avatar del usuario. |
| `ui-avatar-frame-legend.png` | PNG RGBA | Perfil / Leaderboard | REQUIRED | si (alpha real) | 88x95 | 176x190 | Marco de avatar por tier. Superponer sobre el avatar del usuario. |
| `ui-avatar-frame-neon.png` | PNG RGBA | Perfil / Leaderboard | REQUIRED | si (alpha real) | 90x94 | 180x188 | Marco de avatar por tier. Superponer sobre el avatar del usuario. |
| `ui-avatar-frame-purple.png` | PNG RGBA | Perfil / Leaderboard | REQUIRED | si (alpha real) | 90x92 | 180x184 | Marco de avatar por tier. Superponer sobre el avatar del usuario. |
| `ui-avatar-frame-red.png` | PNG RGBA | Perfil / Leaderboard | REQUIRED | si (alpha real) | 90x92 | 180x184 | Marco de avatar por tier. Superponer sobre el avatar del usuario. |
| `ui-card-new-drop.png` | PNG RGBA | Modales de recompensa | IMPORTANT | si (alpha real) | 168x181 | 336x362 | Arte completo de card de notificacion (Rank Up, Victory, New Drop). |
| `ui-card-rank-up.png` | PNG RGBA | Modales de recompensa | IMPORTANT | si (alpha real) | 146x185 | 292x370 | Arte completo de card de notificacion (Rank Up, Victory, New Drop). |
| `ui-card-victory.png` | PNG RGBA | Modales de recompensa | IMPORTANT | si (alpha real) | 182x180 | 364x360 | Arte completo de card de notificacion (Rank Up, Victory, New Drop). |
| `ui-card-victory-crate.png` | PNG RGBA | Modales de recompensa | IMPORTANT | si (alpha real) | 218x185 | 436x370 | Arte completo de card de notificacion (Rank Up, Victory, New Drop). |
| `ui-frame-crown.png` | PNG RGBA | Paneles / HUD | OPTIONAL | si (alpha real) | 155x58 | 310x116 | Marco decorativo. Casi siempre reproducible con CSS (border + clip-path). |
| `ui-frame-gc.png` | PNG RGBA | Paneles / HUD | OPTIONAL | si (alpha real) | 178x60 | 356x120 | Marco decorativo. Casi siempre reproducible con CSS (border + clip-path). |
| `ui-frame-hazard.png` | PNG RGBA | Paneles / HUD | OPTIONAL | si (alpha real) | 178x56 | 356x112 | Marco decorativo. Casi siempre reproducible con CSS (border + clip-path). |
| `ui-frame-purple.png` | PNG RGBA | Paneles / HUD | OPTIONAL | si (alpha real) | 155x50 | 310x100 | Marco decorativo. Casi siempre reproducible con CSS (border + clip-path). |
| `ui-hazard-bar.png` | PNG RGBA | HUD / Banners | OPTIONAL | si (alpha real) | 95x26 | 190x52 | Banda de peligro. Reproducible con repeating-linear-gradient. |
| `ui-loader-gc-ring.png` | PNG RGBA | Loading / Transiciones | IMPORTANT | si (alpha real) | 91x101 | 182x202 | Spinner de carga y transicion de pantalla. Animar con CSS rotate. |
| `ui-loader-paw-ring.png` | PNG RGBA | Loading / Transiciones | IMPORTANT | si (alpha real) | 85x117 | 170x234 | Spinner de carga y transicion de pantalla. Animar con CSS rotate. |
| `ui-loader-portal.png` | PNG RGBA | Loading / Transiciones | IMPORTANT | si (alpha real) | 88x127 | 176x254 | Spinner de carga y transicion de pantalla. Animar con CSS rotate. |
| `ui-rank-elite.png` | PNG RGBA | Ranking / Perfil | REQUIRED | si (alpha real) | 96x79 | 192x158 | Insignia de rango (Recruit a Warlord) para perfil, leaderboard y progresion. |
| `ui-rank-legend.png` | PNG RGBA | Ranking / Perfil | REQUIRED | si (alpha real) | 98x81 | 196x162 | Insignia de rango (Recruit a Warlord) para perfil, leaderboard y progresion. |
| `ui-rank-recruit.png` | PNG RGBA | Ranking / Perfil | REQUIRED | si (alpha real) | 72x73 | 144x146 | Insignia de rango (Recruit a Warlord) para perfil, leaderboard y progresion. |
| `ui-rank-veteran.png` | PNG RGBA | Ranking / Perfil | REQUIRED | si (alpha real) | 84x77 | 168x154 | Insignia de rango (Recruit a Warlord) para perfil, leaderboard y progresion. |
| `ui-rank-warlord.png` | PNG RGBA | Ranking / Perfil | REQUIRED | si (alpha real) | 92x82 | 184x164 | Insignia de rango (Recruit a Warlord) para perfil, leaderboard y progresion. |
| `ui-rank-warrior.png` | PNG RGBA | Ranking / Perfil | REQUIRED | si (alpha real) | 70x77 | 140x154 | Insignia de rango (Recruit a Warlord) para perfil, leaderboard y progresion. |

### `vfx/` — VFX (10)

| Asset | Tipo | Seccion | Prioridad | Transparencia | Nativo | @2x | Uso |
|---|---|---|---|---|---|---|---|
| `vfx-claw-purple-01.png` | PNG RGBA | VFX / Feedback | OPTIONAL | si (alpha real) | 63x56 | 126x112 | Efecto aditivo. Componer con mix-blend-mode: screen sobre fondos oscuros. |
| `vfx-claw-purple-02.png` | PNG RGBA | VFX / Feedback | OPTIONAL | si (alpha real) | 55x50 | 110x100 | Efecto aditivo. Componer con mix-blend-mode: screen sobre fondos oscuros. |
| `vfx-flame-purple.png` | PNG RGBA | VFX / Feedback | OPTIONAL | si (alpha real) | 56x64 | 112x128 | Efecto aditivo. Componer con mix-blend-mode: screen sobre fondos oscuros. |
| `vfx-lightning-purple.png` | PNG RGBA | VFX / Feedback | OPTIONAL | si (alpha real) | 74x72 | 148x144 | Efecto aditivo. Componer con mix-blend-mode: screen sobre fondos oscuros. |
| `vfx-lightning-yellow-01.png` | PNG RGBA | VFX / Feedback | OPTIONAL | si (alpha real) | 72x71 | 144x142 | Efecto aditivo. Componer con mix-blend-mode: screen sobre fondos oscuros. |
| `vfx-lightning-yellow-02.png` | PNG RGBA | VFX / Feedback | OPTIONAL | si (alpha real) | 59x64 | 118x128 | Efecto aditivo. Componer con mix-blend-mode: screen sobre fondos oscuros. |
| `vfx-paw-glow.png` | PNG RGBA | VFX / Feedback | OPTIONAL | si (alpha real) | 47x72 | 94x144 | Efecto aditivo. Componer con mix-blend-mode: screen sobre fondos oscuros. |
| `vfx-portal.png` | PNG RGBA | Transiciones / Matchmaking | IMPORTANT | si (alpha real) | 72x134 | 144x268 | Portal de teletransporte para transiciones y matchmaking. |
| `vfx-swoosh-purple.png` | PNG RGBA | VFX / Feedback | OPTIONAL | si (alpha real) | 95x56 | 190x112 | Efecto aditivo. Componer con mix-blend-mode: screen sobre fondos oscuros. |
| `vfx-swoosh-yellow.png` | PNG RGBA | VFX / Feedback | OPTIONAL | si (alpha real) | 99x44 | 198x88 | Efecto aditivo. Componer con mix-blend-mode: screen sobre fondos oscuros. |

### `decorations/` — Decorations / Decals (20)

| Asset | Tipo | Seccion | Prioridad | Transparencia | Nativo | @2x | Uso |
|---|---|---|---|---|---|---|---|
| `decal-claw-yellow.png` | PNG RGBA | Fondos / Decoracion | OPTIONAL | si (alpha real) | 43x41 | 86x82 | Decal de grafiti. Usar al 10-20% de opacidad como textura de fondo. |
| `decal-crown-01.png` | PNG RGBA | Fondos / Decoracion | OPTIONAL | si (alpha real) | 44x37 | 88x74 | Decal de grafiti. Usar al 10-20% de opacidad como textura de fondo. |
| `decal-crown-02.png` | PNG RGBA | Fondos / Decoracion | OPTIONAL | si (alpha real) | 41x37 | 82x74 | Decal de grafiti. Usar al 10-20% de opacidad como textura de fondo. |
| `decal-dominate.png` | PNG RGBA | Fondos / Decoracion | OPTIONAL | si (alpha real) | 84x46 | 168x92 | Decal de grafiti. Usar al 10-20% de opacidad como textura de fondo. |
| `decal-exclaim.png` | PNG RGBA | Fondos / Decoracion | OPTIONAL | si (alpha real) | 16x34 | 32x68 | Decal de grafiti. Usar al 10-20% de opacidad como textura de fondo. |
| `decal-gamepad.png` | PNG RGBA | Fondos / Decoracion | OPTIONAL | si (alpha real) | 56x34 | 112x68 | Decal de grafiti. Usar al 10-20% de opacidad como textura de fondo. |
| `decal-gc-tag.png` | PNG RGBA | Fondos / Decoracion | OPTIONAL | si (alpha real) | 53x36 | 106x72 | Decal de grafiti. Usar al 10-20% de opacidad como textura de fondo. |
| `decal-legion.png` | PNG RGBA | Fondos / Decoracion | OPTIONAL | si (alpha real) | 61x39 | 122x78 | Decal de grafiti. Usar al 10-20% de opacidad como textura de fondo. |
| `decal-paw-purple.png` | PNG RGBA | Fondos / Decoracion | OPTIONAL | si (alpha real) | 40x39 | 80x78 | Decal de grafiti. Usar al 10-20% de opacidad como textura de fondo. |
| `decal-question.png` | PNG RGBA | Fondos / Decoracion | OPTIONAL | si (alpha real) | 24x33 | 48x66 | Decal de grafiti. Usar al 10-20% de opacidad como textura de fondo. |
| `decal-scratch-purple.png` | PNG RGBA | Fondos / Decoracion | OPTIONAL | si (alpha real) | 106x24 | 212x48 | Decal de grafiti. Usar al 10-20% de opacidad como textura de fondo. |
| `decal-skull-white.png` | PNG RGBA | Fondos / Decoracion | OPTIONAL | si (alpha real) | 34x39 | 68x78 | Decal de grafiti. Usar al 10-20% de opacidad como textura de fondo. |
| `decal-skull-yellow.png` | PNG RGBA | Fondos / Decoracion | OPTIONAL | si (alpha real) | 28x37 | 56x74 | Decal de grafiti. Usar al 10-20% de opacidad como textura de fondo. |
| `decal-splatter.png` | PNG RGBA | Fondos / Decoracion | OPTIONAL | si (alpha real) | 35x17 | 70x34 | Decal de grafiti. Usar al 10-20% de opacidad como textura de fondo. |
| `decal-star-4point.png` | PNG RGBA | Fondos / Decoracion | OPTIONAL | si (alpha real) | 32x32 | 64x64 | Decal de grafiti. Usar al 10-20% de opacidad como textura de fondo. |
| `decal-star-purple.png` | PNG RGBA | Fondos / Decoracion | OPTIONAL | si (alpha real) | 29x30 | 58x60 | Decal de grafiti. Usar al 10-20% de opacidad como textura de fondo. |
| `decal-warning.png` | PNG RGBA | Fondos / Decoracion | OPTIONAL | si (alpha real) | 35x30 | 70x60 | Decal de grafiti. Usar al 10-20% de opacidad como textura de fondo. |
| `decoration-paw-print.png` | PNG RGBA | Decoracion | OPTIONAL | si (alpha real) | 117x120 | 234x240 | Elemento decorativo suelto para composiciones y fondos. |
| `decoration-portal.png` | PNG RGBA | Decoracion | OPTIONAL | si (alpha real) | 77x178 | 154x356 | Elemento decorativo suelto para composiciones y fondos. |
| `decoration-tail-swoosh.png` | PNG RGBA | Decoracion | OPTIONAL | si (alpha real) | 136x133 | 272x266 | Elemento decorativo suelto para composiciones y fondos. |
---

## 4. NO extraer como imagen — implementar en codigo

Estos elementos aparecen en los disenos pero **no deben ser assets**. Todos son
reproducibles con fidelidad total mediante HTML/CSS/SVG.

| Elemento del diseno | Implementar con | Notas |
|---|---|---|
| Wordmark `GUILD CORE` y tagline `LEGION · RANK · DOMINATE` | HTML + CSS | Montserrat 900 italic, `letter-spacing:-0.02em`, skew ligero. Solo el monograma `GC` es asset. |
| Panel `COLOR PALETTE` | HTML/CSS | Es documentacion del diseno, no UI. |
| Botones `PLAY NOW` / `UPGRADE` / `JOIN GUILD` / `VIEW RANK` | HTML + CSS | `border-radius:9999px`, fondo `#D6FA38` o borde 2px `#8D59FD`. La corona es `icons/svg/icon-crown.svg`. |
| Pills de estado `ONLINE / IN BATTLE / OFFLINE / AFK / PREMIUM / MOD / ADMIN / LEGEND` | HTML + CSS | Pill + dot. Corona = `icon-crown.svg`. |
| Barras de progreso (`LVL 76`, `GUILD POWER`, `WIN RATE`) | HTML + CSS | Track 12px, filler `linear-gradient(90deg,#8D59FD,#D6FA38)`, extremos planos. |
| Filas de notificacion (`Clan War starting in 2h`, ...) | HTML + CSS | Solo los iconos son assets (`icon-notif-*`). |
| Banda de peligro / hazard tape | CSS | `repeating-linear-gradient(45deg,#D6FA38 0 12px,#131315 12px 24px)`. |
| Marcos y paneles con esquinas cortadas a 45° | CSS | `clip-path: polygon(...)` + `border`. El PNG `ui-frame-*` solo si quieres el desgaste pintado. |
| Neon underglow de estados activos/hover | CSS | `box-shadow: 0 0 12px -2px currentColor`. |
| Textura de halftone del fondo | CSS | `radial-gradient` repetido al 5% de opacidad blanca. |
| Barras de navegacion translucidas del HUD | CSS | `backdrop-filter: blur(12px)` + fondo `rgba(19,19,21,.72)`. |
| Cards, layout, grid de 12 columnas, safe areas | HTML + CSS | Sin assets. |
| Anillos de carga (`ui-loader-*`) | CSS/SVG opcional | El PNG sirve, pero un SVG animado con `stroke-dasharray` es mas nitido. |
| Textos `STEALTH / CYBER / WARLORD`, `RECRUIT…WARLORD`, `LOADING…` | HTML + CSS | Etiquetas de la lamina, no assets. |
| Los 14 iconos de UI | **SVG incluido** | Ya entregados en `icons/svg/`. Los PNG son solo referencia. |

---

## 5. Problemas de calidad — leelo antes de implementar

### 5.1 No existe material HD

Las dos fuentes son imagenes de **1536x1024 px**. No hay version en mayor
resolucion, por lo que **ningun asset es HD real**. Los tamanos nativos que
aparecen en las tablas son el maximo con fidelidad 1:1. Recomendaciones:

| Grupo | Nativo tipico | Tamano CSS maximo recomendado |
|---|---|---|
| `hero/hero-character-main` | 300x500 | ~300px de ancho (600px con `@2x`) |
| `characters/*` | 120-380 px | 120-190px |
| `scenes/*` | ~200x200 | 160-200px |
| `emotes/*` (design-01) | ~150x150 | 48-72px |
| `emotes/emote-hood-*` (design-02) | ~80x85 | 24-32px |
| `items/*` | 45-120 px | 48-96px |
| `ui/ui-avatar-frame-*`, `ui-rank-*` | 80-100 px | 64-96px |
| `icons/png/*` | ~30x30 | **no usar**: usar `icons/svg/` |

El `@2x` es interpolado, no informacion nueva. Sirve para pantallas HiDPI a
tamano pequeno; no agranda el asset mas alla de lo indicado arriba.

### 5.2 Assets con limitaciones concretas

| Asset | Problema | Recomendacion |
|---|---|---|
| `icons/png/*` (14 iconos UI) | Origen de ~30x30 px. Recortados quedan borrosos a cualquier tamano de UI real. | Usar `icons/svg/` (redibujados vectorialmente sobre la misma silueta y con los colores exactos del design system). |
| `decorations/decal-*` amarillos | En la lamina estan sobre una banda de glow amarillo-verde: el contraste amarillo-sobre-amarillo impide un recorte perfecto. Quedan restos de halo olivaceo. | Para `crown`, `skull`, `paw`, `claw`, `star`, `warning`, `?`, `!`, `gamepad` usar los SVG incluidos en `icons/svg/decal-*.svg`. |
| `decorations/decal-legion`, `decal-dominate`, `decal-gc-tag` | Lettering pintado: no vectorizable sin rediseno. Conservan algo de halo. | Usarlos al 10-20% de opacidad como textura de fondo, que es su uso previsto. |
| `ui/ui-frame-*` | El interior oscuro forma parte del arte original (no es transparente en el diseno). | Si necesitas un marco hueco, reproducirlo con CSS. |
| `ui/ui-card-*` | Son composiciones completas (marco + arte + lettering). No se pueden separar sin rediseno. | Usar como arte de modal completo, o recomponer con `items/` + `vfx/` + CSS. |
| `item-chest-drop` | **No entregado.** El cofre de la card "NEW DROP" esta fundido con un estallido de luz que lo rodea; cualquier recorte arrastra fondo. | Usar `items/item-chest-gold.png` (limpio, del panel de economia) o la card completa `ui/ui-card-new-drop.png`. |
| `vfx/*` | Son glows aditivos: sobre fondo claro se veran lavados. | Componer con `mix-blend-mode: screen` o `plus-lighter` sobre superficies oscuras. |
| `backgrounds/` | **Vacio.** En las laminas no hay ningun fondo reutilizable: lo que parece fondo es el degradado de la propia lamina y los halos de cada sticker, no una textura del producto. | El fondo del design system es `#131315` + halftone al 5% + degradados: todo CSS. No se ha inventado ninguna imagen. |

### 5.3 Duplicados y variantes

Ambas laminas contienen el mismo personaje. No se han duplicado archivos; estas
son las parejas que representan al mismo motivo en distinto estilo/tamano:

| design-01 (chibi / sticker) | design-02 (character sheet) | Cual usar |
|---|---|---|
| `characters/character-warlord-throne.png` (299x326) | `hero/hero-character-throne.png` (312x316) | `hero/` para arte grande, `characters/` para cards pequenas. |
| `characters/character-gamer-seated.png` | `characters/character-pose-gamer.png` | Equivalentes; el de design-01 tiene mas detalle util. |
| `emotes/emote-*` (10, ~150px) | `emotes/emote-hood-*` (8, ~85px) | Set principal = `emote-*`. Los `hood` son variantes encapuchadas de menor resolucion. |
| `decorations/decoration-portal.png` | `vfx/vfx-portal.png`, `ui/ui-loader-portal.png` | `vfx/` es el mas limpio y reutilizable. |
| `decorations/decoration-paw-print.png` | `vfx/vfx-paw-glow.png`, `icons/svg/decal-paw.svg` | SVG para UI, PNG para decoracion. |

---

## 6. Notas de implementacion

- Todos los PNG estan recortados al contenido: el canvas no tiene margen sobrante,
  posiciona con CSS.
- Los assets con glow incluyen el halo dentro del alpha: no anadas `filter: drop-shadow`
  encima o se duplicara.
- Los SVG usan `currentColor`: `color: var(--primary)` los recolorea. El color del
  diseno original va inline en el atributo `style` de cada archivo.
- `image-rendering: auto` (por defecto). No uses `pixelated` en estos assets.
- Nada en este pack ha sido inventado, rediseñado ni reestilizado. La unica
  excepcion declarada son los 21 SVG de `icons/svg/`, que son un **redibujo
  vectorial fiel** de siluetas que en el origen solo existen a ~30 px.
