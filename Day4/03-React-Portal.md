
# Day 4 · 03 — React Portals

> A **React Portal** allows a component to render its HTML in a **different place in the DOM**, while remaining a child in the **React component tree**.
>
> Think of it as a **teleportation door** 🚪. The component stays in the same React family, but its HTML is displayed somewhere else.

---

## ❓ The Problem: Why Do We Need Portals?

**Normally**, React renders components inside their parent:

```
React Tree:
  App
   │
   └── Main
        └── Modal
```

**Actual HTML produced:**

```html
<div id="root">
  <div class="main">
    <div class="modal">
      Popup
    </div>
  </div>
</div>
```

### The CSS Overflow Issue

If the parent component has CSS like:

```css
.main { overflow: hidden; }
```

…or `z-index` stacking issues, the modal/popup may be **clipped, hidden, or layered under other elements**.

### ✅ Solution: React Portal

A Portal renders the component **outside its parent** in the DOM, while keeping it in the same React tree.

```
React Tree (unchanged):
  App
   │
   └── Main
        └── Modal   ← React parent-child relationship stays intact!
```

**Actual HTML (DOM now:**

```html
<div id="root">
  <div>Main Content</div>
</div>

<div id="portal-root">          ← Modal's HTML teleported here!
  <div>Modal</div>
</div>
```

| What happens | Status |
|-----------|--------|
| React parent-child relationship | ✅ **Stays the same** |
| Props, state, context flow | ✅ **Still works normally** |
| Only DOM render location | ✅ **Changes** |

---

## 🔧 Syntax

Import `createPortal` comes from **`react-dom`**:

```jsx
import { createPortal } from "react-dom";

createPortal(
  JSX,                          // 1st argument: JSX to render
  document.getElementById("portal-root")   // 2nd argument: target DOM node
);
```

| Argument | What it is |
|----------|------------|
| **1st** | JSX (the component/elements you want to render) |
| **2nd** | Real DOM element reference (where to put it in the HTML) |

---

## ✅ Step-by-Step Example

### Step 1 — `index.html`: Add a portal root div

```html
<!-- Normal React root -->
<div id="root"></div>

<!-- Portal root (for modals, toasts, tooltips) -->
<div id="portal-root"></div>
```

### Step 2 — Create `Modal.jsx` using `createPortal`

```jsx
import { createPortal } from "react-dom";

function Modal() {
  return createPortal(
    <h2>Hello from Portal! 👋</h2>,
    document.getElementById("portal-root")
  );
}

export default Modal;
```

### Step 3 — Use it in `App.jsx` like a normal child

```jsx
function App() {
  return (
    <div>
      <h1>Home Page</h1>
      {/* Even though Modal is inside App's JSX…
          …its HTML goes to #portal-root, not #root! */}
      <Modal />
    </div>
  );
}
```

---

## 🎯 When to Use React Portals

Use Portals for UI elements that should appear **above everything else**:

| Use Case | Example |
|----------|---------|
| ✅ Modals / Popups | Delete confirmation dialog |
| ✅ Dialog Boxes | Form submission confirmation |
| ✅ Tooltips | Hover info bubbles |
| ✅ Dropdown Menus | Navigation dropdown over sidebar |
| ✅ Notifications / Toasts | "Student saved successfully!" |
| ✅ Side Drawers | Mobile hamburger menu drawer |
| ✅ Floating Menus | Context (right-click) menus |
| ✅ Full-screen Overlays | Loading spinners, image lightbox |

**JFS (Java Full Stack) common scenario:** Student delete-confirmation modal over a table inside a card with `overflow: hidden`.

---

## 🌳 React Tree vs Real DOM — Side-by-Side

| React Component Tree | Real HTML DOM |
|--------------------|---------------|
| Component **remains a child of its parent** (props, state, context flow normally) | HTML is **rendered into another DOM node** |
| `<Main><Modal /></Main>` — Modal is child of Main | `<div id="root">…Main HTML…</div>` **next to** `<div id="portal-root">…Modal HTML…</div>` |

---

## 💡 Important Points

1. Imported from **`react-dom`**, not `react`:
   ```jsx
   import { createPortal } from "react-dom";
   ```

2. The component **still receives everything normally**:
   - ✅ Props from parent
   - ✅ Its own state
   - ✅ React Context (Theme, Auth, etc.)
   - ✅ Event bubbling up the React tree (not DOM tree)

3. **Only the render location changes**, not the React hierarchy.

---

## 🎓 JFS Use Case: Delete Student Confirmation Modal

This is a realistic Student Management System scenario — a delete confirmation dialog that must escape overflow:hidden containers.

```jsx
import { useState } from "react";
import { createPortal } from "react-dom";

// ==========  Portal modal (escapes any parent overflow / z-index)  ==========
function DeleteModal({ isOpen, onClose, onConfirm, studentName }) {
  if (!isOpen) return null;   // Don't render anything if closed

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "8px",
          minWidth: "380px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.25)"
        }}
      >
        <h3 style={{ marginTop: 0, color: "#c0392b" }}>⚠️ Delete Student?</h3>
        <p>
          Are you sure you want to delete
          <strong> {studentName}</strong>?
          <br />
          <em>This action cannot be undone (will call Spring Boot DELETE /api/students/{id}).</em>
        </p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "20px" }}>
          <button
            onClick={onClose}
            style={{ padding: "8px 16px", border: "1px solid #bbb", borderRadius: "4px", background: "white", cursor: "pointer" }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{ padding: "8px 16px", border: "none", borderRadius: "4px", background: "#c0392b", color: "white", cursor: "pointer" }}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
}

// ==========  Main component (could be inside overflow:hidden!)  ==========
function StudentTable() {
  const [students] = useState([
    { id: 101, name: "Aarav Sharma", course: "B.Tech CSE" },
    { id: 102, name: "Priya Patel",   course: "B.Tech IT"  },
    { id: 103, name: "Rahul Verma",    course: "BCA"        }
  ]);

  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const askDelete = (s) => { setToDelete(s); setOpen(true); };

  const confirmDelete = () => {
    alert(`✅ Calling DELETE /api/students/" + toDelete.id + "\nSpring Boot backend!\n\nDeleted: " + toDelete.name);
    setOpen(false);
  };

  return (
    <div>
      <h3>📋 Student Table</h3>
      <div style={{ overflow: "hidden", border: "1px solid #ddd", borderRadius: "6px" }}>
        {/* ^^^ This div has overflow:hidden — without Portal, a modal rendered here would be CLIPPED! */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#2c3e50", color: "white" }}>
            <tr>
              <th style={{ padding: "10px" }}>ID</th>
              <th style={{ padding: "10px" }}>Name</th>
              <th style={{ padding: "10px" }}>Course</th>
              <th style={{ padding: "10px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>{s.id}</td>
                <td style={{ padding: "8px" }}>{s.name}</td>
                <td style={{ padding: "8px" }}>{s.course}</td>
                <td style={{ padding: "8px" }}>
                  <button
                    onClick={() => askDelete(s)}
                    style={{ background: "#c0392b", color: "white", border: "none", padding: "5px 12px", borderRadius: "4px", cursor: "pointer" }}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Portal modal — stays React child, but DOM → #portal-root */}
      <DeleteModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={confirmDelete}
        studentName={toDelete ? toDelete.name : ""}
      />
    </div>
  );
}
```

---

## 🔑 Key Interview Definition (Memorize This)

> **React Portal** is a feature that allows a React component to render its UI into a **different DOM node** while still remaining part of the **same React component tree**. It is mainly used for **modals, tooltips, dialogs, dropdowns, and overlays**.

### Follow-up interview points:
- **Props still work?** Yes — the component is still a React child.
- **State still works?** Yes — own state, hooks, all normal.
- **Event bubbling?** Events bubble through the **React tree** (parent→grandparent), NOT the real DOM tree.
- **Use `createPortal` from?** `react-dom` package.

---

## 🧠 Memory Trick

```
React Component
       │
       ▼
 🚪 Portal (Teleport)
       │
       ▼
Another DOM Location
```

**Remember:**
- ✅ **React Tree:** No change (props/state/context all normal)
- ✅ **DOM Location:** Changes (teleported to another `<div>`)

---

## ❌ Common Mistakes

| # | Mistake | Fix |
|---|---------|-----|
| 1 | ❌ Forgetting to add `<div id="portal-root">` in `index.html` | Always create the target DOM node first! |
| 2 | ❌ Importing from `"react"` instead of `"react-dom"` | `import { createPortal } from "react-dom"` |
| 3 | ❌ Passing a React ref instead of real DOM node | 2nd arg must be real `document.getElementById(...)` result |
| 4 | ❌ Thinking parent→child props break | They work perfectly — React tree is unchanged |
| 5 | ❌ Using Portal for every component | Only for overlay/escape-overflow elements! |

---

## 📝 Quick Cheat Sheet

```jsx
// ================================================
//  1. index.html — 2 roots: normal + portal
// ================================================
<div id="root"></div>
<div id="portal-root"></div>


// ================================================
//  2. Portal Component
// ================================================
import { createPortal } from "react-dom";

function MyModal() {
  return createPortal(
    <div>Hello from Portal</div>,                      // JSX
    document.getElementById("portal-root")   // DOM target
  );
}


// ================================================
//  3. Use like normal child (React tree unchanged)
// ================================================
function App() {
  return (
    <div>
      <h1>App</h1>
      <MyModal />  {/* React child — but HTML → portal-root */}
    </div>
  );
}


// ================================================
//  4. JFS: Conditional portal (most common pattern)
// ================================================
function DeleteConfirm({ open, onClose, onYes, name }) {
  if (!open) return null;   // Closed → render nothing
  return createPortal(
    <Overlay onClick={onClose}>
      <Dialog onClick={e => e.stopPropagation()}>
        Delete {name}?
        <button onClick={onClose}>Cancel</button>
        <button onClick={onYes}>Delete</button>
      </Dialog>
    </Overlay>,
    document.getElementById("portal-root")
  );
}
```
