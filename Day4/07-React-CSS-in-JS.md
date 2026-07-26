
# Day 4 · 07 — React CSS-in-JS (styled-components)

> **CSS-in-JS** is a styling technique where you write CSS **directly inside your JavaScript/JSX code** using a library.
>
> We use the most popular library: **`styled-components`** (39M+ downloads/month).
>
> Key benefits over plain CSS / CSS Modules:
> - ✅ **Dynamic styles from props** — no need for 10 class variants
> - ✅ **Component-scoped** — zero class name conflicts (auto-generated unique classes)
> - ✅ **No separate `.css` files** — component = HTML + JS logic + styles, all in one file
> - ✅ **Style inheritance via `styled(ExistingComponent)`** — very DRY
> - ❌ Slight runtime cost (styles injected at runtime via `<style>` tags)

---

## 1️⃣ Installation

```bash
npm install styled-components
```

> ✅ Already installed in this project. If cloning a fresh repo, run the command above.

Vite tip: `styled-components` works out of the box with Vite, no extra plugins required.

---

## 2️⃣ Basic Example: `styled.____`

Call **`styled.<tagname>`** + **template literal** (backticks `` ` `` `` ` `` with regular CSS inside).  
The return value is a **new React component** that already has the styles baked in.

```jsx
import styled from 'styled-components';

// styled.h1(...) returns a NEW <h1> component with your CSS
const MyHeader = styled.h1`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
`;

function App() {
  return (
    <>
      {/* Just use it like any component — no className needed! */}
      <MyHeader>Welcome!</MyHeader>
    </>
  );
}
```

| `styled.<tag>` works for | Examples |
|-------------------------|----------|
| Any HTML tag | `styled.div`, `styled.button`, `styled.span`, `styled.input`, `styled.table`, `styled.section`, `styled.form`, **100+ more** |

### 3 Things to Notice

1. Import is **`import styled from 'styled-components'`** (default export)
2. Styles live inside **template literals** (backticks), NOT objects — so you write **real CSS syntax** (kebab-case, `;` separators, `:hover`, `@media`, everything works)
3. Result is a **component** you render via JSX tags — **no `className=` boilerplate!**

---

## 3️⃣ Alternatives That styled-components Replaces

Without CSS-in-JS you'd have to do **one of these two** (both require separate files or verbose objects):

| Approach | Pain point |
|----------|------------|
| ❌ Separate `.css` / `.module.css` + `className=` | File switching, class naming tax, no prop-driven styles |
| ❌ Inline `style={{...}}` objects | CamelCase CSS, no `:hover`/`@media`/pseudo-elements, ugly to read |

✅ **styled-components** gives you: real CSS syntax + 0 className boilerplate + props-driven dynamic values — all in one place.

---

## 4️⃣ Dynamic Styles via Props — `styled`'s Superpower 💥

Inside the template literal, use **arrow functions with `${props => ...}` interpolation** to compute CSS from the component's props.

### Example: One Button component, 2 variants via `btntype` prop

```jsx
import styled from 'styled-components';

// ✅ Single Button — colors computed from a prop
const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.btntype === 'primary' ? '#007bff' : '#6c757d'};
  color: white;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    filter: brightness(0.9);
  }
`;

function App() {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button btntype="primary">Primary Button</Button>
      <Button btntype="secondary">Secondary Button</Button>
      {/* or no prop → fallback tertiary gray via else branch */}
    </div>
  );
}
```

✅ **Why this is better than CSS Modules + 3 classes:**
- No dead code (unused variants). If you never use `btntype="primary"`, no primary styles are written.
- Infinite variants = still **1 `Button` definition**, no CSS code explosion.

**Destructuring shortcut** (more readable):
```jsx
background-color: ${({ btntype }) =>
  btntype === 'primary' ? '#007bff' : '#6c757d'
};
```

---

## 5️⃣ Extending (Inheriting) Styles — `styled(ExistingComponent)`

Wrap **any existing styled component** in `styled(…)` to **add/override rules**.  
This is styled-components' equivalent of CSS Modules' `composes:` — but works on the component level.

```jsx
import styled from 'styled-components';

/* 1. Base component with shared styles */
const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-weight: 600;

  &:hover { transform: translateY(-1px); }
  &:active { transform: translateY(0); }
`;

/* 2. Variants — extend base, only override color (DRY!) */
const PrimaryButton = styled(Button)`
  background-color: #007bff;
`;

const SuccessButton = styled(Button)`
  background-color: #28a745;
`;

const DangerButton = styled(Button)`
  background-color: #dc3545;
`;

function App() {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <PrimaryButton>Primary</PrimaryButton>
      <SuccessButton>Success</SuccessButton>
      <DangerButton>Danger</DangerButton>
    </div>
  );
}
```

### Key insight

```
styled(Button)` background: red `   ≈   "Create a NEW component class inheriting Button's CSS,
                                         then layer these extra rules on top"
```

---

## 6️⃣ Component-Scoped & Unique Classes ✅

styled-components scopes styles exactly like CSS Modules.

In DevTools → Elements:
```html
<button class="sc-bSOFjJ sc-pKxvl 1">Primary</button>
```
- `sc-bSOFjJ` / `sc-pKxvl` = **unique, auto-generated class names per styled component**
- Two different styled components can both name internal classes `.foo` — **they'll never clash**
- Result: **Zero "which CSS file defined this?" debugging**

---

## 7️⃣ Global Styles — `createGlobalStyle`

Use **`createGlobalStyle`** for styles that should apply **everywhere** (reset CSS, body font, headings defaults, utility classes).

Global styles are **NOT scoped** — they render normal CSS selectors, just like plain `.css`.

```jsx
import styled, { createGlobalStyle } from 'styled-components';

// 👇 Named export from 'styled-components'
const GlobalStyle = createGlobalStyle`
  /* Applies to every <h1> in the whole app */
  h1 {
    color: #2c3e50;
    font-family: 'Segoe UI', Arial, sans-serif;
  }

  /* Plain class-based utility — use className="myparagraph" anywhere */
  .myparagraph {
    font-family: 'Courier New', monospace;
    color: #1565c0;
    line-height: 1.7;
  }

  /* Optional: CSS reset / defaults */
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background-color: #f5f7fa;
    font-family: 'Segoe UI', Arial, sans-serif;
  }
`;

function App() {
  return (
    <>
      {/* Render <GlobalStyle /> ONCE at the very top (App root) */}
      <GlobalStyle />
      <h1>Welcome! (global h1 styles)</h1>
      <p className="myparagraph">
        This paragraph uses the GLOBAL utility class .myparagraph
      </p>
    </>
  );
}
```

### Rule: Render `<GlobalStyle />` exactly once

Place it at the **top-level** of your app (inside `<App>`) so it applies to **every page/component**.

---

## 🎯 JFS Real-World Usage Example

Styled-component rendering a Student Card from data. Combines props, &-nesting, and extends.

```jsx
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  padding: 16px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  border-left: 5px solid ${({ course }) =>
    course === 'B.Tech CSE' ? '#2980b9' :
    course === 'BCA'        ? '#8e44ad' :
    course === 'MCA'        ? '#27ae60' : '#95a5a6'};
`;

const Name = styled.h3`
  margin: 0 0 4px;
  color: #2c3e50;
`;

const Meta = styled.p`
  margin: 2px 0;
  color: #555;
  font-size: 14px;
`;

function StudentCard({ student }) {
  return (
    <Card course={student.course}>
      <Name>{student.name}</Name>
      <Meta>Roll #{student.roll} · {student.course}</Meta>
      <Meta>{student.email}</Meta>
    </Card>
  );
}
```

✅ The **border-left color reacts to student.course prop** — one Card, 4 course colors automatically.

---

## 🎓 Interview Questions

| Q | A |
|---|---|
| **What is CSS-in-JS?** | Writing CSS inside JS files (as template literals) via a library like styled-components — enabling scoped styles and prop-driven dynamic CSS. |
| **How do you create a styled `<button>`?** | `styled.button\` padding: 10px; \`` → returns a React component. |
| **Props in styles?** | Interpolate a function: `${props => props.size === 'lg' ? '16px' : '14px'}`. Commonly destructured: `${({ size }) => ...}`. |
| **How to inherit styles?** | `styled(ExistingStyledComponent)\` extra: rules \`` — extends the base component's CSS. |
| **Scoped or global?** | `styled.xxx` creates **component-scoped** (unique auto classes). `createGlobalStyle` creates **global** CSS. |
| **vs CSS Modules?** | Modules = `.module.css` **separate file**, build-time only. styled-components = **CSS-in-JS same file**, runtime cost, but supports **props & JS interpolation** (Modules can't). |
| **Runtime overhead?** | Yes — styles are injected into `<style>` tags on first render. Use **SSR** (Next.js) or CSS extraction if that matters. For most SPAs it's negligible. |
| **Part of React core?** | **No.** Third-party library. Install: `npm i styled-components`. |

---

## ❌ Common Mistakes

| # | Mistake | Symptom | Fix |
|---|---------|---------|-----|
| 1 | ❌ Missing backticks (uses `"…"` or `{…}`) | `styled.button "padding:10px"` → syntax error or broken | Always use `` styled.tag`…` `` — backticks! |
| 2 | ❌ `${btntype}` instead of a function | `btntype is undefined` error | Must be `${ ({ btntype }) => … }` — **arrow function receives props** |
| 3 | ❌ Rendering `<GlobalStyle />` multiple times per app | Styles duplicated, specificity bugs | Render once at App root only |
| 4 | ❌ camelCase CSS in the literal | `backgroundColor: red` silently ignored | Write real CSS: `background-color: red;` (only inline `style={}` objects use camelCase) |
| 5 | ❌ `styled(NormalComponent)` (not a styled one) | Works, but styles only inherit if component spreads `className` onto a DOM node. | Use `styled(StyledComponent)` for extends OR forward className manually. |

---

## 🧠 Memory Trick

```
 styled.button`…`        →  new styled <button> component  (scoped)
        │
        └──  ${props => …}   →  dynamic CSS from props

 styled(Base)`…`         →  extend / inherit Base styles

 createGlobalStyle`…`    →  global CSS, render once in <App>
```

---

## 📝 Quick Cheat Sheet

```jsx
// ============================================================
//  INSTALL  (already done in this project)
// ============================================================
// npm install styled-components

// ============================================================
//  1. Import
// ============================================================
import styled, { createGlobalStyle } from 'styled-components';

// ============================================================
//  2. Basic styled.<tag> component
// ============================================================
const Title = styled.h1`
  color: #2980b9;
  font-size: 28px;
  margin: 0 0 12px;
`;
// usage: <Title>Hello</Title>

// ============================================================
//  3. Props-driven styles (2 forms: props.xxx  or  destructured)
// ============================================================
const Box = styled.div`
  padding: ${({ p = '12px' }) => p};
  background: ${({ bg = 'white' }) => bg};
  border-radius: 6px;
`;
// usage: <Box bg="#eaf2f8" p="20px">content</Box>

// ============================================================
//  4. Extend styled(Component)
// ============================================================
const Button  = styled.button`padding:10px 20px; color:white; border:none; border-radius:4px`;
const Primary = styled(Button)`background:#007bff`;
const Danger  = styled(Button)`background:#dc3545`;

// ============================================================
//  5. &-nesting for pseudo-classes, hover, media, child selectors
// ============================================================
const FancyBtn = styled.button`
  background: #27ae60;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;

  &:hover   { background: #1e8449; }        /* :hover */
  &:active  { transform: translateY(1px); }   /* :active */
  &.outline { border: 2px solid #1e8449; background: white; color: #1e8449; } /* className="outline" */
  & > span  { font-weight: 700; }             /* children */

  @media (max-width: 600px) { width: 100%; }  /* media queries work normally */
`;

// ============================================================
//  6. Global styles (render ONCE in App)
// ============================================================
const Global = createGlobalStyle`
  body { margin: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #f8f9fa; }
  * { box-sizing: border-box; }
  .util-red { color: #dc3545 !important; }
`;
// In root App:
//   <>
//     <Global />
//     <RestOfApp />
//   </>
```
