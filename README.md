

<p align="center">
  <!-- 1. Typing / Hero -->
  <a href="#">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=28&duration=3000&pause=500&color=2980B9&center=true&vCenter=true&width=860&lines=%F0%9F%8E%93+Student+Management+System;%E2%9A%A1+React+18+%C2%B7+Vite+%C2%B7+Spring+Boot+Ready;%F0%9F%93%9A+Day+1+%E2%86%92+Day+5+%C2%B7+60%2B+Code+Examples" alt="Typing SVG">
  </a>
</p>

<p align="center">
  <!-- 2. Tech stack badges (animated shields) -->
  <img alt="React" src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black&style=for-the-badge">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=yellow&style=for-the-badge">
  <img alt="React Router" src="https://img.shields.io/badge/Router-v7-CA4245?logo=reactrouter&logoColor=white&style=for-the-badge">
  <img alt="Sass" src="https://img.shields.io/badge/Sass-1.102-CC6699?logo=sass&logoColor=white&style=for-the-badge">
  <img alt="styled-components" src="https://img.shields.io/badge/styled--components-v6-DB7093?logo=styled-components&logoColor=white&style=for-the-badge">
  <img alt="Build" src="https://img.shields.io/badge/build-passing-27AE60?style=for-the-badge&logo=vite">
</p>

<p align="center">
  <!-- 3. Activity bars -->
  <img src="https://repobeats.axiom.co/api/embed/5f5e55d5c1c3d4c1f3f5e5c1c3d4c1f3f5e5c1c3.svg" width="90%" alt="Repobeats analytics">
</p>

---

## 🔭 Project Overview

> The curriculum follows a strict **Concept → Implementation → Mini Task**
> All examples are ready to integrate with a **Spring Boot + MySQL** backend via a documented REST API.

```mermaid
flowchart LR
    A[🌱 Day 1 · Components & JSX] --> B[⚡ Day 2 · ES6 + JSX Deep Dive]
    B --> C[🧱 Day 3 · Class Components · Props · Forms · Lists]
    C --> D[🛠️  Day 4 · Advanced: Portals/Lazy/Styling/Router/Sass]
    D --> E[🪝 Day 5 · React Hooks ⏭️  
    D --> F[(💾 Spring Boot + MySQL)]
    F --> D
    style D fill:#eaf2f8,stroke:#2980b9
    style C fill:#f4ecf7,stroke:#8e44ad
    style F fill:#d5f5e3,stroke:#27ae60
```

---

## ✨ Feature Grid (animative hover cards 🌈)

> Hover / tap each tile — every concept has a runnable example.

| # | Module | Concept | Examples | Status |
|---|--------|---------|:--------:|:------:|
| 🚀 | **Day 1** | Components, JSX, reusability | 10 | ✅ Done |
| ⚡ | **Day 2** | ES6, JSX expressions, attributes, conditionals | 16 | ✅ Done |
| 🧱 | **Day 3** | Class components, Props, Destructuring, Children, Events, Conditional rendering, Lists, Forms (controlled), Textarea, Select | 38 | ✅ Done |
| 🛠️  | **Day 4** | Checkbox forms, Radio groups, Portals, `lazy()/Suspense`, CSS Modules, CSS-in-JS (`styled-components`), Router v7, Sass/SCSS Modules | 24 | ✅ Done |
| 🪝 | **Day 5** | `useState`, `useEffect`, `useRef`, `useContext`, `useReducer`, custom hooks | —  

---

## 🏗️ Folder Architecture

```
📂 REACT_LEARNING/
 📁 lessons/
 │         ├── 📁 Day1 / Examples.jsx + 3 lesson files
 │         ├── 📁 Day2 / Examples.jsx + 8 files
 │         ├── 📁 Day3 / Examples.jsx + 11 Markdown lessons (01…11.md)  — 38 runnable examples
 │         ├── 📁 Day4 / Examples.jsx + 9 Markdown lessons (01…09.md)   — 24 runnable examples
 │         │     ├── Button.module.css · Card.module.css · StudentForm.module.css · GlobalStyles.module.css
 │         │     ├── MyStyle.scss · JfsDashboard.module.scss
 │         │     ├── LazyAboutPage.jsx · LazyDashboard.jsx · LazyStudentSettings.jsx · LazyAdminPanel.jsx
 │         │     └── 10-React-Forward-Ref.png
 │         └── 📁 Day5 / React-Hooks.png  ⏭️


---

## 📚 Curriculum Tables

<details open>
<summary> <b>📗 Day 3 — Foundation (click to collapse)</b> </summary>
<div>

| # | Lesson File | What you learn |
|---|-------------|---------------|
| 01 | `01-React-Class-Components.md` | Class syntax, `setState()`, props, full lifecycle (Mount / Update / Unmount) — for interviews & legacy |
| 02 | `02-React-Props.md` | Pass any data type, strings → objects → arrays → parent→child data flow |
| 03 | `03-React-Destructuring-Props.md` | Parameter destructuring, rest spread, default props |
| 04 | `04-React-Props-Children.md` | Slots pattern with `children` + compound components |
| 05 | `05-React-Events.md` | camelCase handlers, arguments via arrows, `e.preventDefault()` |
| 06 | `06-React-Conditional-Rendering.md` | `if`, `&&`, ternary — JFS Student Dashboard case study |
| 07 | `07-React-Lists.md` | `map()`, why unique `key`s, ID-based Student Table |
| 08–11 | Forms trilogy: `Forms` / `Submit-Forms` / `Textarea` / `Select` | Controlled inputs, Pattern B (single state object), select `value` prop |

**Example count:** 38 runnable components in [`Day3/Examples.jsx`](file:///d:/Inno%20Setup%206/LEARNING/REACT_LEARNING/src/lessons/Day3/Examples.jsx)
</div>
</details>

<details open>
<summary> <b>📘 Day 4 — Advanced (click to collapse)</b> </summary>
<div>

| # | Lesson File | What you learn |
|---|-------------|---------------|
| 01 | `01-React-Forms-Checkbox.md` | Pattern B universal `handleChange` for booleans + arrays (`hobbies[]`) |
| 02 | `02-React-Forms-Radio.md` | Controlled radio groups for gender/course/role fields |
| 03 | `03-React-Portal.md` | `createPortal()` — modal/toast/delete-dialog teleport, Student Table with `overflow:hidden` escape demo |
| 04 | `04-React-Lazy-Suspense.md` | Route-level code-splitting, `Suspense fallback=…` |
| 05 | `05-React-Lazy-Loaded-Files.md` | Reference for 4 lazy physical pages: About/Dashboard/Settings/Admin |
| 06 | `06-React-CSS-Modules.md` | `.module.css`, `composes:`, `:global()`, 4 full SCSS modules |
| 07 | `07-React-CSS-in-JS.md` | `styled-components` basics + props dynamics + extends + `createGlobalStyle` |
| 08 | `08-React-Router.md` | Router v7: BrowserRouter + NavLink + useParams + useNavigate + 404 + RequireAuth protected |
| 09 | `09-React-Sass-Styling.md` | `.scss` variables + `sass:color.adjust` + `@mixin` + Sass Modules `.module.scss` |

**Example count:** 24 runnable components in [`Day4/Examples.jsx`](file:///d:/Inno%20Setup%206/LEARNING/REACT_LEARNING/src/lessons/Day4/Examples.jsx)
</div>
</details>

---

## 📈 Project Stats (animative GitHub profile cards)

<div align="center">
  <img height="160" src="https://github-readme-stats.vercel.app/api/pin/?username=DEMO-USER&repo=student-management-system&theme=nord&show_owner=true&hide_border=true">
  <img height="160" src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=DEMO-USER&theme=nord_dark">
</div>

---

<p align="center">
  <!-- 5. Ending wave / marquee -->
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=90&section=footer&text=%F0%9F%93%9A+Happy+Coding+%C2%B7+Java+Full+Stack+%E2%9C%A8&fontSize=24&fontAlignY=60&animation=fadeIn" alt="footer banner">
</p>

<div align="center">
  <sub>Built with ⚡ <b>Vite</b> · 🚀 <b>React 18</b> · 🎓 <b>JFS-focused curriculum</b></sub>
</div>
