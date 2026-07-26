
# Day 4 · 06 — React CSS Modules (Scoped Styles)

> **CSS Modules** let you write CSS that is **scoped locally to a specific component**.
> This prevents **CSS class name conflicts** (the "global CSS hell" problem) and makes your styles **more maintainable** across large apps.
>
> CSS Modules are **not part of React core**, but are supported **out of the box by Vite, Create React App, and Next.js**.

---

## 📌 Core Rule to Remember

> **File extension MUST be `.module.css`** (NOT plain `.css`) for the build tool to:
> 1. Treat it as a CSS Module
> 2. Auto-generate unique, scoped class names
> 3. Expose the styles as a JS `import`-able object

```
✅ Correct:   Button.module.css   →   import styles from './Button.module.css'
❌ Wrong:     Button.css          →   plain global CSS (no scoping)
```

---

## ❓ The Problem (Global CSS Hell)

Without CSS Modules, **every class name is global**:

```css
/* Button.css — team A writes this */
.button { background: red; }

/* Navbar.css — team B uses same name without knowing */
.button { background: blue; }   /* ❌ Oops! Overrides team A's .button */
```

Result: **class name collisions** → debugging nightmares → nobody dares rename classes.

### ✅ Solution: CSS Modules

Each class name is **automatically rewritten** to be **globally unique**:

```css
/* Button.module.css */
.mybutton { background: red; }
/*  ↓ At runtime, Vite actually emits something like: */
._mybutton_abc123_1 { background: red; }   /* Unique per file! */
```

Same class name `.mybutton` in 10 different files → **10 different real class names**. ✅ **ZERO collisions!**

---

## 🔧 3-Step Setup & Usage

### Step 1 — Create `Button.module.css` (plain CSS, just special extension)

```css
/* Button.module.css */
.mybutton {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

### Step 2 — Import it as a **JS object** in your `.jsx` component

```jsx
import styles from './Button.module.css';
```

The `styles` object maps each original class name → the generated unique one.

### Step 3 — Use `className={styles.className}` (NOT the string)

```jsx
function App() {
  return (
    <div>
      {/* ❌ OLD (global string):  className="mybutton"  */}
      {/* ✅ NEW (scoped object): className={styles.mybutton}  */}
      <button className={styles.mybutton}>
        My Button
      </button>
    </div>
  );
}
```

**Under the hood:** The `<button>` renders with the real unique class:
```html
<button class="_mybutton_q1obu_1">My Button</button>   <!-- Unique! No conflicts -->
```

---

## 🎨 2+ Classes: Template Literal (String Interpolation)

You can apply **multiple classes at once** just like regular CSS, using `${…}` template literal interpolation:

### `Button.module.css`

```css
.mybutton {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary {
  background-color: #007bff;
  color: white;
}

.secondary {
  background-color: #6c757d;
  color: white;
}
```

### Component usage

```jsx
import styles from './Button.module.css';

function App() {
  return (
    <div>
      {/* 2 classes: base style + primary variant */}
      <button className={`${styles.mybutton} ${styles.primary}`}>
        My Primary Button
      </button>

      {/* 2 classes: base style + secondary variant */}
      <button className={`${styles.mybutton} ${styles.secondary}`}>
        My Secondary Button
      </button>
    </div>
  );
}
```

**Pattern:** `\`${styles.classA} ${styles.classB}\`` — same as you'd write `"classA classB"` normally, just with object lookups.

---

## 🧩 `composes:` Keyword — Class Inheritance (Built-in Feature!)

CSS Modules give you **`composes:`** — a way for one class to **inherit (pull in) another class's styles** without duplicating CSS rules.

This is cleaner than composing multiple classes in JS!

### `Button.module.css` (using `composes`)

```css
/* Base class with shared styles */
.mybutton {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Primary button = mybutton styles + blue colors */
.primary {
  composes: mybutton;          /* 👈 "inherit styles from .mybutton" */
  background-color: #007bff;
  color: white;
}

/* Secondary button = mybutton styles + gray colors */
.secondary {
  composes: mybutton;          /* Same inheritance! */
  background-color: #6c757d;
  color: white;
}
```

### Now your JSX is simpler — ONE class, not two!

```jsx
import styles from './Button.module.css';

function App() {
  return (
    <div>
      {/* ✅ No more ${styles.mybutton} ${styles.primary} — just .primary */}
      <button className={styles.primary}>Primary Button</button>
      <button className={styles.secondary}>Secondary Button</button>
    </div>
  );
}
```

**Why `composes` is better:**
- ✅ DRY — no duplicated padding/border/cursor rules
- ✅ JSX cleaner — one class per variant instead of two
- ✅ All style logic lives in `.module.css` (not spread across CSS + JS)

---

## 🌍 Global Classes in CSS Modules: `:global(...)`

**By default, EVERY class in `.module.css` is LOCALLY SCOPED** (renamed to unique names). But sometimes you need a class that:
- Works with **third-party libraries** (e.g., Bootstrap)
- Should be reused **anywhere without importing the module**
- Is set by external code / server HTML

### Use `:global(.className)` syntax

```css
/* BlueHeader.module.css */

/* ✅ This class is GLOBAL — real name stays ".myheader", no prefix/hash */
:global(.myheader) {
  padding: 10px 20px;
  font-size: 50px;
  color: white;
  background-color: dodgerblue;
}

/* This one is LOCAL — renamed unique */
.myparagraph {
  font-size: 20px;
  color: white;
  background-color: purple;
}
```

### Usage in component

```jsx
import styles from './BlueHeader.module.css';

function App() {
  return (
    <div>
      {/* Global class → used as PLAIN STRING "myheader" (NOT styles.myheader) */}
      <h1 className="myheader">
        My Header
      </h1>

      {/* Local class → used as styles.myparagraph (object lookup) */}
      <p className={styles.myparagraph}>
        My Paragraph
      </p>
    </div>
  );
}
```

| Type | Syntax in `.module.css` | Usage in `className=` |
|------|------------------------|----------------------|
| **Local (default)** | `.myparagraph { ... }` | `className={styles.myparagraph}` (object) |
| **Global** | `:global(.myheader) { ... }` | `className="myheader"` (plain string) |

---

## 🎯 Common Interview Questions

| Question | Answer |
|----------|--------|
| **What are CSS Modules?** | CSS files in which **all class names are scoped locally by default** (auto-renamed to unique values). Solves global class name conflicts. |
| **File extension rule?** | **MUST** be `*.module.css` (Vite/CRA/Next detect this and enable scoping). |
| **How to import?** | `import styles from './X.module.css'` → `styles` is an object mapping original → generated class names. |
| **How to apply classes?** | `className={styles.myClass}` (object lookup), NOT `className="myClass"` (string). |
| **Multiple classes?** | Template literal: `\`${styles.a} ${styles.b}\`` |
| **What is `composes:`?** | CSS Module feature that lets one class **inherit the rules of another class** (like mixins) — keeps CSS DRY, JSX cleaner. |
| **Global classes in modules?** | Wrap in `:global(.name) { ... }`. Results in real global class `.name` (no hash). |
| **CSS Modules vs styled-components?** | CSS Modules = **zero-runtime**, **plain CSS files** + build-time renaming. styled-components = CSS-in-JS, runtime cost, styles injected dynamically. Both solve same problem: scoping. |
| **Part of React core?** | **No.** Build tool feature (Vite / webpack css-loader / Next). React doesn't know about them — they're 100% handled at build time. |

---

## ❌ Common Mistakes

| # | Mistake | Symptom | Fix |
|---|---------|---------|-----|
| 1 | ❌ Plain `.css` extension, not `.module.css` | Classes not scoped, collisions still happen | Rename to `X.module.css` |
| 2 | ❌ `className="myClass"` (string) | Styles not applied — global `.myClass` doesn't exist | Use `className={styles.myClass}` (object) |
| 3 | ❌ `composes: .myClass` (with dot) | CSS parse error | `composes: myClass` — **no dot** in `composes:` value |
| 4 | ❌ `styles["my-button"]` when kebab-case in CSS | Works but unconventional | Prefer camelCase CSS class names: `myButton` → `styles.myButton` |
| 5 | ❌ Forgetting template literal for 2 classes | `className={styles.a}${styles.b}` invalid JSX | Wrap both in backticks: `\`${styles.a} ${styles.b}\`` |
| 6 | ❌ Using `:global(.x)` then `className={styles.x}` | `styles.x` is undefined — globals don't appear on the `styles` object! | Use plain `className="x"` string for globals |

---

## 🧠 Memory Trick

```
*.module.css file
        │
        ├─── .localClass { }
        │         │
        │         ▼
        │    className={styles.localClass}   ← object lookup (SCOPED / UNIQUE)
        │
        └─── :global(.globalClass) { }
                  │
                  ▼
             className="globalClass"        ← plain string  (GLOBAL)
```

2 Class Names: `\`${styles.a} ${styles.b}\``  
DRY Inheritance: `composes: baseClass;`

---

## 📝 Quick Cheat Sheet

```jsx
// ============================================================
//  1. File MUST be named  X.module.css
// ============================================================
// Button.module.css
//
// .primary { composes: base; background: blue; }
// .danger  { composes: base; background: red;  }
// .base    { padding: 10px 20px; border-radius: 4px; }
// :global(.page-title) { font-size: 32px; }

// ============================================================
//  2. Import as OBJECT (not side-effect import!)
// ============================================================
import styles from './Button.module.css';

// ============================================================
//  3. Single scoped class
// ============================================================
<button className={styles.primary}>Save</button>

// ============================================================
//  4. Two+ classes (template literal)
// ============================================================
<button className={`${styles.base} ${styles.primary}`}>Save</button>

// ============================================================
//  5. Conditional class (ternary + template)
// ============================================================
<button className={`${styles.base} ${isDisabled ? styles.danger : styles.primary}`}>
  {isDisabled ? 'Locked' : 'Submit'}
</button>

// ============================================================
//  6. Global class (plain string!)
// ============================================================
<h1 className="page-title">Hello</h1>

// ============================================================
//  7. Mix global + local
// ============================================================
<h1 className={`page-title ${styles.special}`}>Mixed heading</h1>
```

---

## 📦 All 4 Physical `.module.css` Files (Full Reference)

> This section contains the **complete, copy-paste ready code** of all 4 CSS Module files used in Day 4 Examples #12, #13, #14, #15.

### Inventory

| # | Physical File | Used in Example # | Key classes / purpose |
|---|---------------|-------------------|----------------------|
| 1 | [Button.module.css](file:///d:/Inno%20Setup%206/LEARNING/REACT_LEARNING/src/lessons/Day4/Button.module.css) | #12 (Buttons), #13 (card footer) | `.base` + 4 variants with `composes: base`, plus `.lg/.sm` sizes |
| 2 | [Card.module.css](file:///d:/Inno%20Setup%206/LEARNING/REACT_LEARNING/src/lessons/Day4/Card.module.css) | #13 (Dashboard KPIs + feature card) | `.card → .kpi → .kpiGreen/Purple/Red` (3-level composes chain) |
| 3 | [StudentForm.module.css](file:///d:/Inno%20Setup%206/LEARNING/REACT_LEARNING/src/lessons/Day4/StudentForm.module.css) | #14 (Add Student form) | Wrapper, 2-column grid form fields, inputs, checkbox rows, actions, state preview |
| 4 | [GlobalStyles.module.css](file:///d:/Inno%20Setup%206/LEARNING/REACT_LEARNING/src/lessons/Day4/GlobalStyles.module.css) | #15 (Global + Local demo) | 3 `:global(...)` classes + 3 local classes with `composes:` |

---

### 📄 File 1 · `Button.module.css`

> Used in **Example #12** (4 button variants) & **#13** (card footer action buttons).
>
> Pattern: **`.base` (shared styles) → variants use `composes: base` → size modifiers applied in JSX via template literal.**

```css
/* Button.module.css — Example for basic class + template literal + composes */

/* Base button — shared styles for all variants */
.base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 22px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
}

.base:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.base:active {
  transform: translateY(0);
}

/* Variants using composes (inherit base styles) */
.primary {
  composes: base;
  background-color: #2980b9;
  color: white;
}

.primary:hover {
  background-color: #1f6391;
}

.success {
  composes: base;
  background-color: #27ae60;
  color: white;
}

.success:hover {
  background-color: #1e8449;
}

.danger {
  composes: base;
  background-color: #c0392b;
  color: white;
}

.danger:hover {
  background-color: #922b21;
}

.secondary {
  composes: base;
  background-color: #ecf0f1;
  color: #2c3e50;
  border: 1px solid #bdc3c7;
}

.secondary:hover {
  background-color: #d5dbdb;
}

/* Extra size classes — used via template literal (no composes) */
.lg {
  padding: 14px 30px;
  font-size: 16px;
  border-radius: 8px;
}

.sm {
  padding: 5px 12px;
  font-size: 12px;
  border-radius: 4px;
}
```

---

### 📄 File 2 · `Card.module.css`

> Used in **Example #13** (Dashboard: 4 KPI cards + 1 feature announcement card).
>
> Highlights a **3-level `composes` inheritance chain**: `.card` → `.kpi (composes: card)` → `.kpiGreen/kpiPurple/kpiRed (composes: kpi)`.

```css
/* Card.module.css — Reusable card components (JFS dashboard) */

.card {
  background: #ffffff;
  border: 1px solid #e1e8ed;
  border-radius: 10px;
  padding: 20px 22px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.card:hover {
  box-shadow: 0 6px 16px rgba(0,0,0,0.09);
  transform: translateY(-2px);
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  margin-bottom: 14px;
  border-bottom: 2px solid #f1f3f5;
}

.cardTitle {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
}

.cardBadge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background-color: #eaf2f8;
  color: #2980b9;
}

.cardBody {
  color: #4a4a4a;
  line-height: 1.6;
  font-size: 14px;
}

.cardFooter {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px dashed #e1e8ed;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

/* KPI card variant (used for stats on dashboard) */
.kpi {
  composes: card;         /* inherit full .card base */
  border-left: 5px solid #2980b9;
  padding: 18px 20px;
}

.kpiValue {
  font-size: 32px;
  font-weight: 800;
  color: #2980b9;
  margin: 6px 0 2px;
}

.kpiLabel {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #7f8c8d;
  font-weight: 600;
}

.kpiDelta {
  font-size: 12px;
  font-weight: 700;
  margin-top: 6px;
}

.up { color: #27ae60; }
.down { color: #c0392b; }

/* Color variants via composes */
.kpiGreen {
  composes: kpi;
  border-left-color: #27ae60;
}

.kpiGreen .kpiValue { color: #27ae60; }

.kpiPurple {
  composes: kpi;
  border-left-color: #8e44ad;
}

.kpiPurple .kpiValue { color: #8e44ad; }

.kpiRed {
  composes: kpi;
  border-left-color: #c0392b;
}

.kpiRed .kpiValue { color: #c0392b; }
```

---

### 📄 File 3 · `StudentForm.module.css`

> Used in **Example #14** — full JFS Add Student form (Pattern B state object).
>
> Fully-scoped classes for wrapper → grid-based field layout → label variants (required) → input/select/textarea → checkbox rows → action bar → dark JSON state preview.

```css
/* StudentForm.module.css — JFS Add Student form (Pattern B state object) */

.wrapper {
  background: linear-gradient(135deg, #ffffff 0%, #f4f7fb 100%);
  border: 1px solid #cfd8e3;
  border-radius: 12px;
  padding: 26px 30px;
  box-shadow: 0 4px 14px rgba(41, 128, 185, 0.08);
}

.heading {
  margin: 0 0 4px;
  color: #2c3e50;
  font-size: 22px;
  font-weight: 700;
}

.subheading {
  margin: 0 0 22px;
  color: #7f8c8d;
  font-size: 14px;
  font-style: italic;
}

.form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.label {
  font-size: 13px;
  font-weight: 700;
  color: #34495e;
  letter-spacing: 0.2px;
}

.required::after {
  content: " *";
  color: #c0392b;
  font-weight: 700;
}

.input,
.select,
.textarea {
  padding: 9px 12px;
  border: 1.5px solid #cbd5e0;
  border-radius: 6px;
  font-size: 14px;
  background: #ffffff;
  color: #2d3748;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  font-family: inherit;
}

.input:focus,
.select:focus,
.textarea:focus {
  outline: none;
  border-color: #2980b9;
  box-shadow: 0 0 0 3px rgba(41, 128, 185, 0.15);
}

.textarea {
  resize: vertical;
  min-height: 80px;
}

.checkboxField {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: #ffffff;
  border: 1px dashed #cfd8e3;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.checkboxField input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #2980b9;
}

.checkboxLabel {
  font-size: 14px;
  color: #2d3748;
  font-weight: 500;
}

.hint {
  font-size: 12px;
  color: #7f8c8d;
  margin-left: 2px;
}

.actions {
  grid-column: 1 / -1;
  display: flex;
  gap: 12px;
  margin-top: 6px;
  padding-top: 16px;
  border-top: 1px solid #e1e8ed;
}

.submit {
  padding: 11px 28px;
  background: #2980b9;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.submit:hover {
  background: #1f6391;
}

.reset {
  padding: 11px 20px;
  background: white;
  color: #2c3e50;
  border: 1.5px solid #cbd5e0;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.reset:hover {
  background: #f4f7fb;
}

.statePreview {
  grid-column: 1 / -1;
  margin-top: 10px;
  padding: 12px 14px;
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 6px;
  font-family: "Fira Code", Consolas, monospace;
  font-size: 12.5px;
}

.statePreview strong {
  color: #38bdf8;
}
```

---

### 📄 File 4 · `GlobalStyles.module.css`

> Used in **Example #15** (Global + Local combined demo) &
> **Example #14** (uses the global `.module-global-success` toast).
>
> Shows all 3 scoping patterns:
> 1. `:global(.name) { }` → plain global (no hash)
> 2. `.localName { }` → locally scoped (auto-hashed)
> 3. `.techTag { composes: tag; }` → local DRY inheritance

```css
/* GlobalStyles.module.css — Demo of :global() + local mixing */

/* ========================================================
   GLOBAL CLASSES (accessible everywhere without import)
   ======================================================== */
:global(.module-global-title) {
  font-size: 28px;
  font-weight: 800;
  color: #2c3e50;
  padding-bottom: 8px;
  border-bottom: 3px solid #2980b9;
  margin-bottom: 16px;
  letter-spacing: -0.3px;
}

:global(.module-global-box) {
  padding: 16px 18px;
  background: #f8f9fa;
  border-left: 5px solid #2980b9;
  border-radius: 4px;
  margin: 12px 0;
  color: #343a40;
  font-size: 14px;
  line-height: 1.6;
}

:global(.module-global-success) {
  padding: 12px 16px;
  background: #d4edda;
  border: 1px solid #28a745;
  color: #155724;
  border-radius: 5px;
  font-weight: 600;
  margin: 10px 0;
}

/* ========================================================
   LOCAL CLASSES (only available via styles.____ import)
   ======================================================== */

.scopedNote {
  margin-top: 14px;
  padding: 12px 14px;
  background: #fff3cd;
  border: 1px solid #ffc107;
  color: #856404;
  border-radius: 5px;
  font-size: 13px;
  font-weight: 500;
}

.scopedNote strong {
  color: #664d03;
}

.tagRow {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  background: #8e44ad;
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 14px;
}

/* Local inheritance example */
.techTag {
  composes: tag;
  background: #27ae60;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  font-size: 11px;
}
```

---

## 🧩 How Examples.jsx Wires Up All 4 Modules (Snippet)

```jsx
// Examples.jsx — top of file
import btnStyles        from "./Button.module.css";       // →  btnStyles.primary, etc
import cardStyles       from "./Card.module.css";         // →  cardStyles.kpiGreen, etc
import formStyles       from "./StudentForm.module.css";  // →  formStyles.wrapper, etc
import globalLocalStyles from "./GlobalStyles.module.css";// →  globalLocalStyles.scopedNote
// Note: the 3 :global(...) classes in GlobalStyles.module.css do NOT
//       appear on the `globalLocalStyles` object! Use them as plain strings:
//         className="module-global-title" (NOT globalLocalStyles.moduleGlobalTitle)
```

| Usage pattern | Example |
|---------------|---------|
| Single local class | `<button className={btnStyles.primary}>` |
| Local + local (2 classes) | ``className={`${cardStyles.kpiDelta} ${cardStyles.up}`}`` |
| Variant via `composes:` → one class | `<div className={cardStyles.kpiGreen}>` (gets card + kpi + kpiGreen all-in-one) |
| Global class → plain string | `<div className="module-global-success">` |
| Mixed global + local | ``className={`module-global-title ${globalLocalStyles.tag}`}`` |
