
# Day 4 · 09 — React Sass Styling (.scss + Sass Modules)

> **Sass (Syntactically Awesome Style Sheets)** is the most popular **CSS pre-processor**.
>
> It **extends plain CSS** with superpowers:
> - ✅ `$variables` — one value, used everywhere
> - ✅ **Nesting** (`&:hover`, `& > .child`) — no repeated selectors
> - ✅ **Built-in modules** (`sass:color`, `sass:math`, `sass:string`) — e.g. `color.adjust()` to make colors lighter/darker
> - ✅ `@mixin` / `@include` — reusable style blocks
> - ✅ `@use` / `@forward` — modular file organization
>
> Sass files are compiled **at build time** (Vite handles this automatically) → the browser still gets **normal CSS**. No runtime cost.

---

## 1️⃣ Installation

```bash
npm install sass
```

> ✅ Already installed in this project.
>
> **Important:** You install `sass`, NOT `node-sass` (deprecated).
> Vite detects `.scss` imports and compiles them automatically — zero config needed.

---

## 2️⃣ File Extensions

| Suffix | Meaning | Compiles to |
|--------|---------|-------------|
| `.scss` | **Sass (modern)** — superset of CSS. Every valid `.css` file is a valid `.scss` file. | Plain `.css` (browser doesn't know Sass existed) |
| `.sass` | Indented Sass (older, no braces, Python-style indentation). Rare in 2025. | Same as above |
| `.module.scss` | **Sass Modules** — `.scss` + CSS Modules scoping (unique class names). Identical concept to `.module.css` but you get Sass features inside. | Scoped `.css` |

**Recommendation for JFS / real React projects:** use **`.module.scss`** everywhere — you get both Sass superpowers AND scoped-class safety.

---

## 3️⃣ Step 1: Create a `.scss` file — Use `$variables`

```scss
// MyStyle.scss

// Sass variable (declare once, use anywhere in this file)
$myColor: red;

h1 {
  color: $myColor;      // usage: $variableName
}
```

---

## 4️⃣ Step 2: Import it into React — **SIDE-EFFECT import**

Unlike CSS Modules, a **plain** `.scss` file is imported **without** assigning to a variable:

```jsx
import './MyStyle.scss';    // 👈 no `import styles from` — it's a side-effect import

function MyHeader() {
  return (
    <>
      <h1>My Header</h1>      {/* color: red */}
    </>
  );
}
```

In the root entry:
```jsx
// main.jsx (or main entry)
import { createRoot } from 'react-dom/client';
import './MyStyle.scss';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
```

---

## 5️⃣ Sass Built-in Modules — `@use 'sass:color'` + `color.adjust()`

Sass ships with **official built-in modules**. The most useful for React developers is **`sass:color`** (programmatic color manipulation — no more guessing hex codes!).

```scss
// MyStyle.scss

// 👇 MUST be at the TOP of the .scss file (before any rules)
@use 'sass:color';

$primary: #2980b9;      // base blue color for JFS portal

h1 { color: $primary; }                            // original blue

// Darken: subtract lightness → 20% darker
h2 { color: color.adjust($primary, $lightness: -20%); }

// Lighten: add lightness → 20% lighter
h3 { color: color.adjust($primary, $lightness: 20%); }
```

### Pair with a React component

```jsx
import './MyStyle.scss';

export default function MyHeader() {
  return (
    <div>
      <h1>My Header 1 — original blue $primary</h1>
      <h2>My Header 2 — darkened 20%</h2>
      <h3>My Header 3 — lightened 20%</h3>
    </div>
  );
}
```

✅ Zero CSS class explosion! You get 3 shades of a color from **1 base variable**.

### More `sass:color` helpers

```scss
@use 'sass:color';
$base: #27ae60;

color.scale($base, $lightness: 25%);       // white-mix-based lighter (better for big jumps)
color.adjust($base, $saturation: -30%);   // desaturate to gray
color.mix($base, #000, 30%);              // 30% base, 70% black mix
color.complement($base);                   // opposite on the color wheel
```

---

## 6️⃣ 4 Sass Features Every JFS Dev Must Know

### A. Variables `$name: value;` — Design System Foundation

```scss
// _variables.scss  →  imported everywhere with `@use './variables' as *;`
$color-primary:   #2980b9;
$color-success:   #27ae60;
$color-danger:    #c0392b;
$color-warning:   #f39c12;

$radius-sm: 4px;
$radius-md: 8px;
$radius-lg: 12px;

$font-stack: 'Segoe UI', Arial, sans-serif;

$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 36px;
```

### B. Nesting + `&` — DRY selector writing

**Plain CSS** (lots of repetition):
```css
.button { padding: 10px; }
.button:hover { background: #1f6391; }
.button:disabled { opacity: 0.5; }
.button .icon { margin-right: 6px; }
```

**Sass** (nest children inside; `&` means "the outer selector"):
```scss
.button {
  padding: 10px;

  &:hover    { background: #1f6391; }   // & = .button → .button:hover
  &:disabled { opacity: 0.5; }
  & .icon    { margin-right: 6px; }     // .button .icon
}
```

### C. `@mixin` + `@include` — reusable style blocks

```scss
// 👇 Declare the mixin once (like a function)
@mixin card($radius: 8px, $color: #bbb) {
  background: white;
  padding: 16px 20px;
  border-radius: $radius;
  border-left: 5px solid $color;
  box-shadow: 0 2px 6px rgba(0,0,0,0.07);
}

// 👇 Use it many places (DRY!)
.card-primary { @include card(10px, #2980b9); }
.card-success { @include card(10px, #27ae60); }
.card-danger  { @include card(10px, #c0392b); }
```

### D. `@use` — modular imports (better than old `@import`)

```
src/styles/
  ├── _variables.scss        ← leading underscore = "partial" (not compiled alone)
  ├── _mixins.scss           ← mixin library
  └── App.scss
```

```scss
// App.scss
@use './variables' as vars;   // ← scoped namespace vars.$color-primary
@use './mixins' as m;

.card {
  @include m.card(12px, vars.$color-primary);
}
```

**Pro tip:** Use `sass --load-path=src` or Vite's `resolve.alias` so imports are clean: `@use 'styles/variables'`.

---

## 7️⃣ Sass Modules (`.module.scss`) — THE GOLD STANDARD ⭐

Combine **Sass superpowers** + **CSS Modules class scoping** into one. This is how modern production React apps write styles.

### File: `JfsDashboard.module.scss`

```scss
@use 'sass:color';
@use 'sass:list';

/* ====== Design tokens as Sass $variables ====== */
$blue:    #2980b9;
$green:   #27ae60;
$purple:  #8e44ad;
$red:     #c0392b;
$slate:   #2c3e50;
$radius:  10px;

/* ====== Utility mixin ====== */
@mixin kpi-card($accent) {
  padding: 18px 20px;
  background: #fff;
  border-radius: $radius;
  border-left: 5px solid $accent;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }
}

/* ====== Scoped classes — compiled to UNIQUE names ====== */
.kpiBlue   { @include kpi-card($blue);   }
.kpiGreen  { @include kpi-card($green);  }
.kpiPurple { @include kpi-card($purple); }
.kpiRed    { @include kpi-card($red);    }

.value {
  font-size: 30px;
  font-weight: 800;
  margin: 4px 0 2px;
}
.label {
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 12px;
  color: #7f8c8d;
  font-weight: 600;
}

/* Nesting &:hover / &:nth-child() works normally */
.title {
  color: $slate;
  margin-bottom: 14px;

  &:hover {
    color: color.adjust($slate, $lightness: 15%);
  }
}
```

### Import in `.jsx` as an object — EXACTLY like `.module.css`

```jsx
import styles from './JfsDashboard.module.scss';

export default function KpiGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
      <div className={styles.kpiBlue}>
        <div className={styles.label}>Students</div>
        <div className={styles.value} style={{ color: '#2980b9' }}>1,248</div>
      </div>
      <div className={styles.kpiGreen}>
        <div className={styles.label}>Courses</div>
        <div className={styles.value} style={{ color: '#27ae60' }}>42</div>
      </div>
      {/* etc. */}
    </div>
  );
}
```

✅ **Best of both worlds:** Sass variables, nesting, mixins, built-ins **PLUS** zero class-name conflicts.

---

## 8️⃣ Plain `.scss` vs `.module.scss` — When to Use Which

| Criterion | `styles.scss` (side-effect `import './x.scss'`) | `Thing.module.scss` (object `import s from './x.module.scss'`) |
|-----------|-------------------------------------------------|----------------------------------------------------------------|
| **Class scoping?** | ❌ Global (collisions possible) | ✅ Auto-unique names (scoped) |
| **Sass features (`$`, `@mixin`, nesting)** | ✅ Yes | ✅ Yes |
| **`className=`** | Plain string: `className="button"` | Object lookup: `className={styles.button}` |
| **Use case** | Global app resets, typography, Bootstrap-like utility CSS | Component-scoped styles (buttons, cards, forms, pages) |

**Rule of Thumb (JFS):**
- ✅ 1 global `src/styles/global.scss` (reset, body font, color vars injected as CSS custom props)
- ✅ Everything else → **`ComponentName.module.scss`** (per-component, scoped)

---

## 🎓 Interview Questions

| Q | A |
|---|---|
| **What is Sass?** | CSS pre-processor that adds variables, nesting, mixins, built-in modules. Compiles to plain CSS at build time. |
| **Install command** | `npm install sass` (NOT deprecated `node-sass`) |
| **File extension** | `.scss` (modern, brace-based — CSS superset) or `.module.scss` for scoped classes |
| **Variables syntax** | `$primary: #2980b9;` → usage: `color: $primary;` |
| **Color helpers?** | `@use 'sass:color';` then `color.adjust($c, $lightness: ±N%)`, `color.scale`, `color.mix`. |
| **Nesting / `&`?** | Yes! `&` substitutes the parent selector — `&:hover`, `& .child`, `&-variant`. |
| **`@mixin` vs plain variables?** | `$variable` is for one value. `@mixin` is a reusable block of MULTIPLE declarations. |
| **Sass Modules?** | `.module.scss` = Sass + CSS Modules. Import as an object; classes are auto-unique. **Best practice for components.** |
| **Runtime cost?** | **ZERO.** Sass is 100% compiled during the Vite build; the browser sees plain CSS. |
| **vs CSS Modules (`.module.css`)?** | `.module.css` = scoped CSS with plain-CSS only. `.module.scss` = scoped classes + Sass superpowers. |

---

## ❌ Common Mistakes

| # | Mistake | Symptom | Fix |
|---|---------|---------|-----|
| 1 | ❌ `@use` after CSS rules | Sass error: `@use rules must be written before any other rules` | Move all `@use 'sass:color'` etc to the **very top** of the `.scss` file. |
| 2 | ❌ `.button { @include kpi-card(10px, $blue) }` without defining mixin first | `Undefined mixin` error | Declare `@mixin kpi-card(...)` before any `@include` call. (Or `@use` from a mixins partial.) |
| 3 | ❌ `import styles from './x.scss'` on a plain `.scss` | `styles` object is empty (`{}`) — no class names | Plain `.scss` → side-effect import: `import './x.scss'`. Want an object? Rename to `.module.scss`. |
| 4 | ❌ Writing `.scss{ }` with Sass-style selector thinking it's scoped | Styles leak globally | Only `.module.scss` does scoping. Regular `.scss` is global just like `.css`. |
| 5 | ❌ Typing `$lightness: -20%` inside a `{ }` rule instead of inside `color.adjust(...)` | Syntax error | It's a **named argument** to the function — `color.adjust($color, $lightness: -20%)`. |
| 6 | ❌ Installing `node-sass` | Deprecated, native binding crashes | Use only the pure-JS `sass` package (dart-sass). |

---

## 🧠 Memory Trick

```
npm i sass
   │
   ├───────────────────────────────────┐
   ▼                                   ▼
MyStyle.scss                  Kpi.module.scss
 (global, side-effect import)   (scoped, import as object)
   │                                   │
   ├── $variables: one source of truth│ $variables: yes
   ├── &-nesting: DRY selectors       │ &-nesting: yes
   ├── @mixin / @include: reusables   │ @mixin / @include: yes
   └── @use 'sass:color': .adjust()   │ @use 'sass:color': yes
```

---

## 📝 Quick Cheat Sheet

```scss
/* ====== Installation:  npm i sass   ====== */

/* ====== 1. Variables ====== */
$primary: #2980b9;
$radius: 8px;

/* ====== 2. Built-in modules (must be at TOP of file!) ====== */
@use 'sass:color';
@use 'sass:math';

/* ====== 3. Nesting + &  ====== */
.btn {
  padding: 10px 20px;
  background: $primary;
  border-radius: $radius;

  &:hover    { background: color.adjust($primary, $lightness: -10%); }
  &:disabled { opacity: .5; }
  & .icon    { margin-right: 6px; }
}

/* ====== 4. @mixin + @include  ====== */
@mixin card($accent, $pad: 16px) {
  background: #fff;
  padding: $pad;
  border-left: 5px solid $accent;
  border-radius: $radius;
  box-shadow: 0 2px 6px rgba(0,0,0,.06);
}
.kpiBlue   { @include card($primary); }
.kpiGreen  { @include card(#27ae60); }

/* ====== 5. Color utilities ====== */
$green: #27ae60;
.lightGreen { background: color.adjust($green, $lightness: 25%); }
.darkGreen  { background: color.adjust($green, $lightness: -20%); }
```

### Corresponding JSX side

```jsx
/* — Plain global .scss — */
import './MyStyle.scss';
<div className="kpiBlue">...</div>        // plain string class name

/* — Sass Modules .module.scss — */
import styles from './Kpi.module.scss';
<div className={styles.kpiBlue}>...</div>  // styles object lookup (SAFE scoping)
```
