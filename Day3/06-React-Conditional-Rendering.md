
# 06 — React Conditional Rendering

> In React, you can **conditionally render** components — show or hide UI based on conditions (just like an `if` statement in JavaScript).

---

## 📋 3 Common Methods for Conditional Rendering

| Method | Syntax | Best Used When |
|--------|--------|----------------|
| **1. `if` Statement** | Regular `if / else` before return | Two large, different components to show/hide |
| **2. `&&` Operator** | `{condition && <Content/>}` | Show something **only if true** (no else needed) |
| **3. Ternary `? :`** | `{condition ? <Yes/> : <No/>}` | Show **either A or B** (small, inline) |

---

## 1️⃣ Method 1 — `if` Statement

Use the regular JavaScript `if` operator **before** the `return` to decide what to render.

### Example Components:
```jsx
function MissedGoal() {
  return <h1>MISSED!</h1>;
}

function MadeGoal() {
  return <h1>Goal!</h1>;
}
```

### Using `if` Statement:
```jsx
function Goal(props) {
  const isGoal = props.isGoal;

  // Decide what to return based on condition
  if (isGoal) {
    return <MadeGoal />;
  }
  return <MissedGoal />;
}

// Render with isGoal = false → shows "MISSED!"
createRoot(document.getElementById('root')).render(
  <Goal isGoal={false} />
);

// Try changing to true → shows "Goal!"
createRoot(document.getElementById('root')).render(
  <Goal isGoal={true} />
);
```

### Output:
| `isGoal={true}` | `isGoal={false}` |
|-----------------|------------------|
| 🎉 **Goal!** | ❌ **MISSED!** |

> 💡 **Best for:** When the two options are **very different** (large blocks of JSX). Keep it clean by returning early.

---

## 2️⃣ Method 2 — Logical `&&` Operator

Use **`&&`** to show content **only when the condition is true**. If false, **nothing is rendered**.

```
{ condition && <WhatToShowIfTrue /> }
```

**How it works:**
- If **left side is true** → JS renders the **right side**
- If **left side is false** → JS returns `false` → React renders **nothing**

### Example: Show Heading Only If Brand Exists
```jsx
function Car(props) {
  return (
    <>
      {/* Only show heading if props.brand is NOT empty */}
      {props.brand && <h1>My car is a {props.brand}!</h1>}
    </>
  );
}

// With brand → heading shows:
createRoot(document.getElementById('root')).render(
  <Car brand="Ford" />
);
// Output: My car is a Ford! ✅

// Without brand → nothing shows:
createRoot(document.getElementById('root')).render(
  <Car />
);
// Output: (blank) ❌ — heading hidden
```

### More `&&` Examples (JFS Use Cases):
```jsx
function StudentDashboard({ student, isAdmin }) {
  return (
    <div>
      <h1>{student.name}'s Dashboard</h1>

      {/* Show delete button ONLY for admins */}
      {isAdmin && <button>Delete Student</button>}

      {/* Show badge ONLY if CGPA >= 9.0 */}
      {student.cgpa >= 9.0 && <span className="badge">⭐ Topper</span>}

      {/* Show warning if attendance low */}
      {student.attendance < 75 && (
        <div className="alert">
          ⚠️ Low attendance! Contact HOD.
        </div>
      )}
    </div>
  );
}
```

> 💡 **Best for:** Show something **only if true** — no "else" needed. Very common in React!

---

## 3️⃣ Method 3 — Ternary Operator (`? :`)

Use the **ternary operator** for **inline if-else**. It returns one of two values.

```
{ condition ? <ShowIfTrue /> : <ShowIfFalse /> }
```

Same as:
```jsx
if (condition) {
  return <ShowIfTrue />;
} else {
  return <ShowIfFalse />;
}
```

### Example — Goal/Missed (Ternary Version):
```jsx
function Goal(props) {
  const isGoal = props.isGoal;

  return (
    <>
      {/* Inline: if true → MadeGoal, else → MissedGoal */}
      {isGoal ? <MadeGoal /> : <MissedGoal />}
    </>
  );
}

// Render with false:
createRoot(document.getElementById('root')).render(
  <Goal isGoal={false} />
);
```

### More Ternary Examples:
```jsx
function UserGreeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn
        ? <button>Logout</button>
        : <button>Login</button>
      }

      <p>
        Status: {isLoggedIn ? "✅ Welcome back!" : "🔐 Please login"}
      </p>
    </div>
  );
}

function StudentStatus({ student }) {
  return (
    <p>
      Result: {student.marks >= 40
        ? <span style={{color: 'green'}}>PASS</span>
        : <span style={{color: 'red'}}>FAIL</span>
      }
    </p>
  );
}
```

> 💡 **Best for:** Quick **either/or** decisions inline with JSX. Short and clean.

---

## 🆚 Comparison — All 3 Methods Side-by-Side

| Method | Example Output | Use Case |
|--------|----------------|----------|
| **`if` Statement** | `if (x) return <A/>; return <B/>;` | Large return blocks, complex logic |
| **`&&` Operator** | `{x && <ShowOnlyIfX/>}` | Show **only if true**, no else |
| **Ternary `? :`** | `{x ? <A/> : <B/>}` | Inline **either A or B** |

### Same Logic, 3 Different Ways:

```jsx
// Option 1: if/else (before return)
function Button({ loading }) {
  if (loading) {
    return <button>⏳ Loading...</button>;
  }
  return <button>Save</button>;
}

// Option 2: ternary (inline)
function Button({ loading }) {
  return (
    <button>
      {loading ? "⏳ Loading..." : "Save"}
    </button>
  );
}

// Option 3: && (if only needed for one case)
function UserBadge({ isVerified }) {
  return (
    <div>
      Profile
      {isVerified && <span>✅ Verified</span>}
    </div>
  );
}
```

---

## 🎯 JFS Practical Examples — Student Management System

### 1. Show/ Hide Admin Buttons (`&&`)
```jsx
function StudentRow({ student, isAdmin, onDelete }) {
  return (
    <tr>
      <td>{student.id}</td>
      <td>{student.name}</td>
      <td>{student.course}</td>
      <td>
        <button>Edit</button>

        {/* Delete button only for admins */}
        {isAdmin && (
          <button onClick={() => onDelete(student.id)}>
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}
```

### 2. Empty State — No Students Found (Ternary)
```jsx
function StudentList({ students }) {
  return (
    <div>
      <h2>Students</h2>

      {students.length > 0 ? (
        // If students exist → show table
        <table>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
            </tr>
          ))}
        </table>
      ) : (
        // If empty → show message
        <p>No students found. Add one!</p>
      )}
    </div>
  );
}
```

### 3. Loading State While Fetching API (`if`)
```jsx
function StudentsPage() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("/api/students")
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      });
  }, []);

  // EARLY RETURN if loading
  if (loading) {
    return <h2>⏳ Loading students data...</h2>;
  }

  // Normal render once loaded
  return (
    <div>
      <h1>Students ({students.length})</h1>
      {students.length > 0 ? (
        <StudentTable data={students} />
      ) : (
        <p>No students in database.</p>
      )}
    </div>
  );
}
```

---

## ❌ 4 Common Mistakes to Avoid

| Mistake | What's Wrong | Fix |
|---------|--------------|-----|
| `{if(x) <A/>}` | `if` can't go **inside** JSX `{}` | Use `&&` or ternary inside `{}`. Use `if` **before** return |
| `{condition && a, b}` | Comma won't work for multiple elements | Wrap in Fragment: `{x && <><A/><B/></>}` |
| `{null && <A/>}` & `{0 && <A/>}` | `null` and `0` are **falsy** but `0` will render! | Convert to boolean: `{!!x && <A/>}` or `{x ? <A/> : null}` |
| Nested ternaries 3+ levels | Very hard to read! | Split into variables or use `if` statements |

**Bad — Hard to read:**
```jsx
{loading
  ? <Loading/>
  : error
    ? <Error msg={error}/>
    : data.length > 0
      ? <Table data={data}/>
      : <Empty/>
}
```

**Good — Use variables + `if`:**
```jsx
function Page({ loading, error, data }) {
  let content;

  if (loading)        content = <Loading/>;
  else if (error)     content = <Error msg={error}/>;
  else if (data.length > 0) content = <Table data={data}/>;
  else                content = <Empty/>;

  return <div>{content}</div>;
}
```

---

## 🧠 Interview & Memory Points

| Question | Answer |
|----------|--------|
| **3 conditional render methods?** | `if/else` (before return), `&&` (only if true), ternary `? :` (inline either/or) |
| **Can you use `if` inside JSX `{}`?** | ❌ No. Use `&&` or `?:` instead |
| **`condition && <A/>` renders what if false?** | **Nothing** — React ignores `false`, `null`, `undefined`, `true` |
| **Best for show/hide admin buttons?** | ✅ `&&` operator |
| **Best for loading vs loaded?** | ✅ `if` early return OR ternary |
| **Best for Pass/Fail text?** | ✅ Ternary `? :` |

> 📌 **Key Memory Point:** `if` goes **outside** return. `&&` and `?:` go **inside** `{}`.

---

## 🎯 Quick Cheat Sheet

```jsx
// ================================================
//  1. if / else — BEFORE return
// ================================================
if (loading) {
  return <h2>Loading...</h2>;
}
return <h2>Data loaded!</h2>;

// ================================================
//  2. && — Only show IF TRUE (no else)
// ================================================
{isAdmin && <button>Delete</button>}
{user.verified && <span>✅ Verified</span>}
{list.length > 0 && <Table data={list}/>}

// ================================================
//  3. Ternary — EITHER / OR
// ================================================
{isLoggedIn ? <LogoutBtn/> : <LoginBtn/>}
{marks >= 40 ? <Pass/> : <Fail/>}
{students.length > 0 ? <Table/> : <EmptyMsg/>}
```

---

## 📝 Summary

| Method | Where it goes | If True | If False |
|--------|---------------|---------|----------|
| **`if` / `else`** | **Before** `return` | Returns A | Returns B |
| **`condition &&`** | Inside `{ }` in JSX | Shows right side | Shows **nothing** |
| **`condition ? :`** | Inside `{ }` in JSX | Shows first (`?`) | Shows second (`:`) |

**In JFS projects, you'll use these daily for:**
- Loading states while fetching Spring Boot API data
- Show/hide admin actions (edit, delete buttons)
- Empty state ("No students found")
- Pass/Fail, Approved/Rejected status tags
- Login/Logout button swap
