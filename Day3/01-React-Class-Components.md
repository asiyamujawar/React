
# 01 — React Class Components (Quick Summary)

> **Note:** Modern React mainly uses **Function Components + Hooks**, but understanding Class Components is still useful for interviews and older projects.

---

## 1. React Components

A **Component** is a reusable piece of UI.

**Example:**
```jsx
function App() {
    return <h1>Hello</h1>;
}
```

There are two types:
- ✅ **Function Components** (Preferred)
- 📚 **Class Components** (Older)

---

## 2. Creating a Class Component

A class component:
1. Starts with an **uppercase letter**
2. Extends `React.Component`
3. **Must** have a `render()` method

**Syntax:**
```jsx
class Car extends React.Component {
    render() {
        return <h1>I am a Car</h1>;
    }
}
```

**Use it like:**
```jsx
<Car />
```

---

## 3. Constructor

The `constructor()` runs **first** when the component is created.

**Purpose:**
- Initialize state
- Initialize variables

**Syntax:**
```jsx
constructor(props) {
    super(props);
    this.state = {
        color: "Red"
    };
}
```

> ⚠️ **Always write:** `super(props);` first!

---

## 4. State

State stores **data that can change**.

**Example:**
```jsx
this.state = {
    brand: "Ford",
    color: "Red"
};
```

**Access state:**
```jsx
this.state.color   // Output: Red
```

---

## 5. Updating State

### ❌ Wrong — Never change state directly:
```jsx
this.state.color = "Blue";   // ❌ Don't do this!
```

### ✅ Correct — Use `setState()`:
```jsx
this.setState({
    color: "Blue"
});
```

**When `setState()` is called:**
```
State changes
    ↓
React re-renders
    ↓
UI updates automatically
```

---

## 6. Props in Class Components

Props are data passed from **Parent → Child**.

**Parent component:**
```jsx
<Car color="Blue" />
```

**Child (class) component:**
```jsx
class Car extends React.Component {
    render() {
        return <h1>{this.props.color}</h1>;
    }
}
```

**Output:** `Blue`

> 📌 **Props are Read-Only.** You cannot modify them inside the component.

---

## 7. Components Inside Components (Composition)

One component can use another component.

**Example:**
```jsx
<Garage>
    <Car />
</Garage>
```

---

## 8. Components in Separate Files

**Step 1 — Create `Car.jsx`:**
```jsx
class Car extends React.Component {
    render() {
        return <h2>I am a Car</h2>;
    }
}
export default Car;
```

**Step 2 — Import & use:**
```jsx
import Car from "./Car";

function App() {
    return <Car />;
}
```

---

## 9. Lifecycle of Class Components

Every class component has **3 phases**:

```
Mounting (Created)
    ↓
Updating (State/Props change)
    ↓
Unmounting (Removed from screen)
```

---

### 🅰️ Mounting (Component is Created) — Runs only ONCE

**Order of execution:**

```
constructor()
    ↓
getDerivedStateFromProps()
    ↓
render()                     ← MANDATORY
    ↓
componentDidMount()
```

| Method | Purpose |
|--------|---------|
| `constructor()` | Initialize state, call `super(props)` |
| `getDerivedStateFromProps()` | Update state using props **before** rendering |
| `render()` | Displays the UI (required method) |
| `componentDidMount()` | Runs **after** UI is displayed. Use for **API calls, timers, event listeners** |

**componentDidMount() example:**
```jsx
componentDidMount() {
    fetch("/api/students");   // Fetch data after first render
}
```

---

### 🅱️ Updating — Runs when State or Props change

**Order of execution:**

```
getDerivedStateFromProps()
    ↓
shouldComponentUpdate()
    ↓
render()
    ↓
getSnapshotBeforeUpdate()
    ↓
componentDidUpdate()
```

| Method | Purpose |
|--------|---------|
| `getDerivedStateFromProps()` | Update state from **new props** |
| `shouldComponentUpdate()` | Return `true` = update, `false` = skip update |
| `render()` | Re-renders the UI with updated data |
| `getSnapshotBeforeUpdate()` | Get previous **state/props** before update |
| `componentDidUpdate()` | Runs **after** update finishes. Use for API calls after update, logging |

**shouldComponentUpdate() example:**
```jsx
shouldComponentUpdate() {
    return false;    // Component will NOT update
}
```

---

### 🅲 Unmounting — Component is removed from screen

**Only one method:** `componentWillUnmount()`

**Use it for cleanup:**
- ✅ Remove event listeners
- ✅ Stop timers
- ✅ Close WebSocket connections
- ✅ Cancel subscriptions

---

## 📊 State vs Props — Quick Comparison

| Feature | State | Props |
|---------|-------|-------|
| What it does | Stores **component data** | Receives data from **parent** |
| Can change? | ✅ Yes, with `setState()` | ❌ No, Read-only |
| Updated by | `this.setState()` | Passed as HTML attributes |
| Owned by | The component itself | Parent component |

---

## 🎯 Interview Cheat Sheet — All Methods

| Lifecycle Method | Purpose |
|------------------|---------|
| `constructor()` | Initialize state, call `super(props)` |
| `getDerivedStateFromProps()` | Update state from props |
| `render()` | Display the UI (**only required method**) |
| `componentDidMount()` | API calls, timers, event listeners |
| `shouldComponentUpdate()` | Decide whether to re-render |
| `getSnapshotBeforeUpdate()` | Access previous state/props before update |
| `componentDidUpdate()` | Execute code after update finishes |
| `componentWillUnmount()` | Cleanup before component is removed |

---

## 🧠 One-Line Memory Trick

```
constructor()               →  Create component
getDerivedStateFromProps()  →  Update state from props
render()                    →  Display UI
componentDidMount()         →  After first render

shouldComponentUpdate()     →  Should it update?
render()                    →  Update UI
getSnapshotBeforeUpdate()   →  Check old values
componentDidUpdate()        →  After update

componentWillUnmount()      →  Cleanup before removal
```

---

## 🔑 Most Important Interview Points

1. ✅ **`render()`** is the **only required lifecycle method** in a class component
2. ✅ Use **`setState()`** to update state (never modify `this.state` directly!)
3. ✅ **Props** are passed from parent to child and are **read-only**
4. ✅ **State** belongs to the component and **can change**
5. ✅ In modern React, these are replaced by **Function Components** using Hooks:
   - `useState()` instead of `this.state`
   - `useEffect()` instead of lifecycle methods
