
# Day 4 · 08 — React Router (SPA Navigation)

> **React Router** is the **de facto standard routing library** for React applications.
>
> It enables client-side routing inside a **Single Page Application (SPA)**:
> - ✅ Multiple "pages" without a page reload
> - ✅ URL bar updates and works with back/forward buttons
> - ✅ URL parameters (`/students/42`), query strings, nested layouts
> - ✅ Protected routes (authentication gating)
> - ✅ Browser history management
>
> Installed package: **`react-router-dom`** (DOM version — for web browsers, not React Native).

---

## 1️⃣ Installation

```bash
npm install react-router-dom
```

> ✅ Already installed in this project. Re-run the command in fresh clones.

---

## 2️⃣ 3 Core Concepts (Memorize These!)

| Name | Imported from `react-router-dom` | Purpose |
|------|----------------------------------|---------|
| 🔗 **`Link`** | Default import | SPA navigation link — like `<a href>` but **no page reload** (uses HTML5 History API). |
| 🗂️ **`<Routes>`** | Default import | Container that holds all your `<Route>` definitions. Picks the **single best matching route** from the children and renders its `element`. |
| 🚏 **`<Route>`** | Default import | **1 mapping = 1 rule**: `path="/about"` → render `element={<About />}` when URL matches. |
| 🧭 **`<BrowserRouter>`** | Default import | **Parent provider that enables all routing features** in its subtree. Every `Route`, `Link`, `useNavigate`, etc., must live *inside* this component. |

### Memory Trick

```
<BrowserRouter>          ← wraps EVERYTHING once, at the top
  …
     <Link to="/about">About</Link>    ← user clicks → URL changes
  …
     <Routes>                          ← watches URL, picks 1 match
        <Route path="/about" element={<About />} />
     </Routes>
</BrowserRouter>
```

---

## 3️⃣ Step-by-Step: Minimum Working Router

### Step 0: Install (done already)

```bash
npm install react-router-dom
```

### Step 1: Wrap your App in `<BrowserRouter>`

`App.jsx` (or your root component):

```jsx
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* All <Link> / <Routes> / <Route> components inside 👇 */}
      <YourAppContent />
    </BrowserRouter>
  );
}
```

### Step 2: Create your page/view components

```jsx
function Home()    { return <h1>🏠 Home Page</h1>; }
function About()   { return <h1>ℹ️ About Page</h1>; }
function Contact() { return <h1>📞 Contact Page</h1>; }
```

### Step 3: Add `<nav>` with `<Link to="…">` components (no refresh!)

```jsx
<nav>
  <Link to="/">Home</Link>
  {' | '}
  <Link to="/about">About</Link>
  {' | '}
  <Link to="/contact">Contact</Link>
</nav>
```

### Step 4: Define the `<Routes>` mapping

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

<BrowserRouter>
  <nav>
    <Link to="/">Home</Link> |{" "}
    <Link to="/about">About</Link> |{" "}
    <Link to="/contact">Contact</Link>
  </nav>

  <Routes>
    <Route path="/"        element={<Home />} />
    <Route path="/about"   element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</BrowserRouter>
```

✅ That's the **hello world** of React Router — 3 pages, 3 links, works with back button.

---

## 4️⃣ Link vs `<a href>` — The Critical Difference

| Feature | `<a href="/about">About</a>` | `<Link to="/about">About</Link>` |
|---------|------------------------------|-----------------------------------|
| Page reloads? | ❌ **Full page reload** — downloads index.html + JS + CSS all over again | ✅ **No reload** — History API swaps content in place, instant navigation |
| React state kept? | ❌ All state wiped | ✅ App state preserved |
| Browser back/forward? | Works, but full refresh | Works perfectly, **no reload** |
| Use case? | External URLs only | **All internal SPA navigation** |
| "Active" styling? | No built-in feature | Use `<NavLink>` (see below) for automatic `active` class |

**Rule of Thumb:** For links **inside** your SPA → `<Link to=…>`. For links **outside** your SPA → `<a href=…>`.

---

## 5️⃣ JFS Real-World File Structure

In a real Spring Boot + React student-management app, **every page becomes its own file + route**:

```
src/
 ├── App.jsx                       ← wraps with <BrowserRouter>, defines <Routes>
 ├── pages/
 │    ├── Home.jsx                 ← /
 │    ├── StudentList.jsx          ← /students
 │    ├── AddStudent.jsx           ← /students/new
 │    ├── StudentDetails.jsx       ← /students/:id   (URL param)
 │    ├── EditStudent.jsx          ← /students/:id/edit
 │    ├── Dashboard.jsx            ← /dashboard
 │    └── Login.jsx                ← /login
 └── components/
      ├── Navbar.jsx               ← has <Link to=…> nav
      └── Footer.jsx
```

### JFS `App.jsx` skeleton

```jsx
// App.jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// ✅ Combine lazy() + Router for maximum performance (code split per page!)
const Home           = lazy(() => import('./pages/Home'));
const StudentList    = lazy(() => import('./pages/StudentList'));
const AddStudent     = lazy(() => import('./pages/AddStudent'));
const StudentDetails = lazy(() => import('./pages/StudentDetails'));
const Dashboard      = lazy(() => import('./pages/Dashboard'));
const Login          = lazy(() => import('./pages/Login'));

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">🏠 Home</Link> {" | "}
        <Link to="/students">🎓 Students</Link> {" | "}
        <Link to="/students/new">➕ Add Student</Link> {" | "}
        <Link to="/dashboard">📊 Dashboard</Link> {" | "}
        <Link to="/login">🔐 Login</Link>
      </nav>

      <main style={{ padding: '20px' }}>
        <Suspense fallback={<p>⏳ Loading page…</p>}>
          <Routes>
            <Route path="/"                 element={<Home />} />
            <Route path="/students"        element={<StudentList />} />
            <Route path="/students/new"    element={<AddStudent />} />
            <Route path="/students/:id"    element={<StudentDetails />} />
            <Route path="/dashboard"       element={<Dashboard />} />
            <Route path="/login"           element={<Login />} />
            <Route path="*"                element={<h2>404 — Page Not Found 😢</h2>} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}
```

Notice the bonus lines:
- 🚀 `lazy()` + `<Suspense>` combined with Router → **each route = its own JS chunk** (this is the #1 real-world use of lazy loading!)
- ❓ `path="*"` wildcard → **404 Not Found** route (catches all unmatched URL paths)

---

## 6️⃣ 5 More Router Features You Must Know for Interviews

### A. `<NavLink>` — automatic `active` class on current link

Drop-in replacement for `<Link>` that adds an `active` CSS class when its `to=` matches the current URL. Great for navbars!

```jsx
import { NavLink } from 'react-router-dom';

// Usage — identical to Link, but active/aria-current added automatically:
<NavLink
  to="/students"
  style={({ isActive }) => ({
    fontWeight: isActive ? 700 : 400,
    color: isActive ? '#2980b9' : '#333',
    borderBottom: isActive ? '2px solid #2980b9' : 'none'
  })}
>
  🎓 Students
</NavLink>
```

### B. URL parameters — `path="/students/:id"` + `useParams()`

```jsx
// 1. Define param in Route path with :paramName
<Route path="/students/:id" element={<StudentDetails />} />
```

```jsx
// 2. Inside the page component, read it with useParams() hook
import { useParams } from 'react-router-dom';

function StudentDetails() {
  const { id } = useParams();   // ✅ destructured from URL
  // Now call: GET /api/students/{id}  to Spring Boot backend
  return <h1>Viewing Student ID: {id}</h1>;
}
```

Visit: `http://localhost:5173/students/42` → `id = "42"`

### C. Programmatic navigation — `useNavigate()` hook

Used for: after-form-submit redirects, back button logic, after-login redirect:

```jsx
import { useNavigate } from 'react-router-dom';

function AddStudentForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // POST to Spring Boot:  await axios.post('/api/students', form);
    navigate('/students');            // ✅ Go to Student List page (push history)
    // navigate('/students', { replace: true });  ← don't add to history
    // navigate(-1);  ← equivalent to browser Back button
  };
}
```

### D. Nested routes + `<Outlet>` — shared layouts (navbar/footer)

```jsx
<BrowserRouter>
  <Routes>
    {/* Shared layout: Navbar + Footer wrap every child page via <Outlet /> */}
    <Route element={<AppLayout />}>
      <Route path="/"          element={<Home />} />
      <Route path="/about"     element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>

    {/* Login page has its own layout (NO navbar/footer) */}
    <Route path="/login" element={<Login />} />
  </Routes>
</BrowserRouter>
```

```jsx
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div>
      <Navbar />      {/* ✅ renders on every child route */}
      <main>
        <Outlet />    {/* ⭐ placeholder where the matched child route's element renders */}
      </main>
      <Footer />      {/* ✅ renders on every child route */}
    </div>
  );
}
```

### E. 404 / catch-all with `path="*"`

```jsx
<Routes>
  <Route path="/"      element={<Home />} />
  {/* …more routes… */}
  <Route path="*"      element={<h1>404 — Page Not Found</h1>} />  {/* LAST */}
</Routes>
```

Order matters: **put `*` last** — it matches only when nothing else does.

---

## 7️⃣ Protected Routes (Authentication Gate) — JFS Interview Favorite

```jsx
import { Navigate } from 'react-router-dom';

// Wrapper component — renders children if logged in, else redirects to /login
function RequireAuth({ children }) {
  const isLoggedIn = Boolean(localStorage.getItem('jwt_token')); // or context store
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

// Wrap protected routes with it:
<Routes>
  <Route path="/login"     element={<Login />} />

  {/* Everything below this requires auth! */}
  <Route path="/students"  element={<RequireAuth><StudentList /></RequireAuth>} />
  <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
</Routes>
```

> 💡 For Spring Boot JWT apps: Read the JWT from `localStorage` → if missing (or invalid), `<Navigate>` sends to `/login`. The `replace` prop prevents the back button from returning to the protected page.

---

## 🎓 Interview Questions

| Q | A |
|---|---|
| **What is React Router?** | Declarative client-side routing library for React SPAs. Lets you create the illusion of "multiple pages" without full reloads. |
| **Install command** | `npm install react-router-dom` |
| **4 main components?** | `BrowserRouter` (provider wrapper) · `Link` / `NavLink` (navigation) · `Routes` (match-picker container) · `Route` (URL → component mapping) |
| **`<Link>` vs `<a>`?** | `<Link>` = no page reload, SPA navigation, uses History API. `<a href>` = full browser reload. Use Link for internal, `<a>` for external. |
| **`<NavLink>` vs `<Link>`?** | `NavLink` adds `isActive` state / `active` CSS class to the currently-matched link. Perfect for highlighting current nav item. |
| **Read URL param?** | Route uses `path="/students/:id"` + component calls `useParams()` hook to destructure `{ id }`. |
| **Navigate programmatically?** | `const navigate = useNavigate(); navigate('/path');`. Can use negative numbers (`-1`) for history back. |
| **`<Outlet />` purpose?** | Placeholder inside a parent layout Route where **nested child route elements render**. Enables shared navbar/footer layouts. |
| **404 catch-all?** | Last `<Route path="*" element={<NotFound />} />` — catches any unmatched URL. |
| **Protected routes?** | Wrap element in an auth-check component; use `<Navigate to="/login" replace />` if not authenticated. |
| **Combine with lazy loading?** | YES. **Best practice** — lazy-load every route page for code splitting per route. Wrap `<Routes>` in `<Suspense fallback=…>`. |

---

## ❌ Common Mistakes

| # | Mistake | Symptom | Fix |
|---|---------|---------|-----|
| 1 | ❌ Forgetting to wrap app in `<BrowserRouter>` | Runtime error: **"useHref() may be used only in the context of a `<Router>`"** | Wrap your App or root content in `<BrowserRouter>`. |
| 2 | ❌ `<a href="/students">` for internal links | Full page reloads, state wiped | Replace with `<Link to="/students">Students</Link>`. |
| 3 | ❌ Multiple routes match → all render | Old v5 behavior; in v6 `<Routes>` always picks the **single best match**. | Use nested routes + `<Outlet />` intentionally, not multiple overlapping Routes parents. |
| 4 | ❌ `path="*"` wildcard first | 404 renders for every URL | Put catch-all `*` route **as the last child** inside `<Routes>`. |
| 5 | ❌ `useParams()` / `useNavigate()` called outside `<BrowserRouter>` | Hook crashes with "used only in context of Router" | Ensure the component tree calling hooks is a descendant of `<BrowserRouter>`. |
| 6 | ❌ `to="students"` (relative, no leading slash) | Appends to current URL. Current = `/students` → click → `/students/students` 😱 | Use absolute paths: `to="/students"` (leading slash). |

---

## 📝 Quick Cheat Sheet

```jsx
// ============================================================
//  INSTALL (already done)
// ============================================================
// npm install react-router-dom

// ============================================================
//  1. IMPORTS
// ============================================================
import { lazy, Suspense } from 'react';
import {
  BrowserRouter, Routes, Route, Link, NavLink,
  useParams, useNavigate, useLocation, Outlet, Navigate
} from 'react-router-dom';

// ============================================================
//  2. Lazy page components (route-level code splitting)
// ============================================================
const Home       = lazy(() => import('./pages/Home'));
const About      = lazy(() => import('./pages/About'));
const StudList   = lazy(() => import('./pages/StudentList'));
const StudDetail = lazy(() => import('./pages/StudentDetails'));
const NotFound   = lazy(() => import('./pages/NotFound'));

// ============================================================
//  3. BrowserRouter at root + NavBar + Routes with Suspense
// ============================================================
function App() {
  return (
    <BrowserRouter>                           {/* provider wrapper */}
      <nav style={{ display: 'flex', gap: 14, padding: 12, background: '#eee' }}>
        <Link to="/">🏠 Home</Link>           {/* basic SPA link */}
        <NavLink to="/about"                 {/* auto active styling */}
          style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400 })}>
          ℹ️ About
        </NavLink>
        <Link to="/students">🎓 Students</Link>
      </nav>

      <Suspense fallback={<p>⏳ Loading page…</p>}>
        <Routes>                              {/* picks single match */}
          <Route path="/"             element={<Home />} />
          <Route path="/about"        element={<About />} />
          <Route path="/students"     element={<StudList />} />
          <Route path="/students/:id" element={<StudDetail />} />  {/* URL param */}
          <Route path="*"             element={<NotFound />} />     {/* 404 — LAST */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// ============================================================
//  4. Inside a page — read URL param
// ============================================================
function StudDetail() {
  const { id } = useParams();              // destructured from :id
  return <h1>Student #{id}</h1>;
}

// ============================================================
//  5. Inside a page — redirect after save (programmatic nav)
// ============================================================
function SaveStudent() {
  const navigate = useNavigate();
  const onSubmit = async () => {
    // POST /api/students → Spring Boot
    navigate('/students');                 // → redirect to list
    // navigate(-1);                        // → Back button
    // navigate('/login', { replace: true });
  };
}

// ============================================================
//  6. Protected (auth-gated) route wrapper
// ============================================================
function RequireAuth({ children }) {
  const ok = Boolean(localStorage.getItem('jwt_token'));
  return ok ? children : <Navigate to="/login" replace />;
}
// Usage: <Route path="/dashboard" element={<RequireAuth><Dash /></RequireAuth>} />
```
