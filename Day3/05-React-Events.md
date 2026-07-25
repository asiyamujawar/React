
# 05 — React Events

> Just like HTML DOM events, React can **perform actions based on user events**. React has the **same events as HTML**: click, change, mouseover, key press, form submit, etc.

---

## 🔑 Key Differences from HTML Events

| Feature | HTML | React |
|---------|------|-------|
| **Event name syntax** | Lowercase: `onclick` | **camelCase**: `onClick` |
| **Event handler** | String: `onclick="shoot()"` | Function in `{ }`: `onClick={shoot}` |
| **Prevent default** | `return false` | `event.preventDefault()` |

### Quick Side-by-Side

**HTML:**
```html
<button onclick="shoot()">Take the Shot!</button>
```

**React:**
```jsx
<button onClick={shoot}>Take the Shot!</button>
```

---

## 1️⃣ Adding a Basic Event (onClick Example)

Create a function, then pass it to the event handler.

### Example — Football Shot

```jsx
function Football() {
  // Event handler function
  const shoot = () => {
    alert("Great Shot!");
  };

  return (
    <button onClick={shoot}>Take the shot!</button>
  );
}

// Render it
createRoot(document.getElementById('root')).render(
  <Football />
);
```

**What happens:**
```
User clicks button
    ↓
onClick={shoot}  fires
    ↓
shoot() function runs
    ↓
Alert shows: "Great Shot!"
```

> ⚠️ **No parentheses in handler!**
> - ✅ Correct: `onClick={shoot}` — Passes the function reference
> - ❌ Wrong: `onClick={shoot()}` — Calls the function **immediately** (before click!)

---

## 2️⃣ Passing Arguments to Event Handlers

To pass an argument, wrap it in an **arrow function**:

```jsx
onClick={() => functionName(argument)}
```

### Example — Send "Goal!" as a parameter

```jsx
function Football() {
  // Function accepts an argument
  const shoot = (a) => {
    alert(a);
  };

  return (
    // Arrow function wraps the call with an argument
    <button onClick={() => shoot("Goal!")}>Take the shot!</button>
  );
}

createRoot(document.getElementById('root')).render(
  <Football />
);
```

**Output on click:** Alert shows `"Goal!"`

---

## 3️⃣ React Event Object

Event handlers automatically get access to the **React event object** that triggered them.

The event object contains info like:
- `event.type` — What kind of event ("click", "change", etc.)
- `event.target` — Which element triggered it
- `event.preventDefault()` — Stop default browser behavior
- `event.value` — Input value (for form fields)

---

### Method A — Get Event Object Automatically

If you **don't pass custom arguments**, the event is the **first parameter** automatically:

```jsx
function MyButton() {
  // Event object is passed automatically as first arg
  const handleClick = (e) => {
    console.log("Event type:", e.type);   // "click"
    console.log("Button text:", e.target.innerText);
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

---

### Method B — Send Event Object Manually (With Custom Arguments)

When you **do pass custom arguments** using an arrow function, you must **pass `event` explicitly**:

```jsx
function Football() {
  // Two params: custom argument 'a' + event object 'b'
  const shoot = (a, b) => {
    alert(a);            // "Goal!"  (custom argument)
    alert(b.type);       // "click"  (event property)
    /*
      'b' = the React event that triggered the function
      In this case: the 'click' event
    */
  };

  return (
    // Pass both: custom value + event
    <button onClick={(event) => shoot("Goal!", event)}>
      Take the shot!
    </button>
  );
}

createRoot(document.getElementById('root')).render(
  <Football />
);
```

---

## 📋 Common React Events You'll Use in JFS

### 👆 Mouse Events (Most Common)
| Event | When it fires | JFS Use Case |
|-------|---------------|--------------|
| `onClick` | User clicks something | Buttons, links, delete actions |
| `onDoubleClick` | Double-click | Open edit dialog |
| `onMouseOver` | Mouse enters element | Show tooltip/hover info |
| `onMouseOut` | Mouse leaves element | Hide tooltip |
| `onContextMenu` | Right-click | Custom context menu |

### ⌨️ Keyboard Events
| Event | When it fires | JFS Use Case |
|-------|---------------|--------------|
| `onKeyDown` | Key pressed down | Shortcut keys (Ctrl+S) |
| `onKeyUp` | Key released | Search-as-you-type |
| `onKeyPress` | Character typed | Form field validation |

### 📝 Form Events (VERY Important for JFS!)
| Event | When it fires | JFS Use Case |
|-------|---------------|--------------|
| `onChange` | Input value changes | Textboxes, dropdowns, checkboxes |
| `onSubmit` | Form submitted | Save student form, login, signup |
| `onFocus` | Field gets focus | Highlight input |
| `onBlur` | Field loses focus | Validate field on exit |

### 📄 Document / Window Events
| Event | When it fires |
|-------|---------------|
| `onLoad` | Element finishes loading (images, iframes) |
| `onError` | Error loading element |
| `onScroll` | User scrolls element |

---

## 🎯 JFS — Practical Examples

### Example 1: Button Click (Delete Student)
```jsx
function StudentList() {
  const deleteStudent = (studentId, e) => {
    console.log("Delete student ID:", studentId);
    console.log("Event type:", e.type);
    // Later: call Spring Boot DELETE API here
  };

  return (
    <div>
      <h2>Student List</h2>

      <button onClick={(e) => deleteStudent(101, e)}>
        Delete John (ID: 101)
      </button>

      <button onClick={(e) => deleteStudent(102, e)}>
        Delete Jane (ID: 102)
      </button>
    </div>
  );
}
```

### Example 2: Input Change (Search)
```jsx
function SearchBar() {
  const handleChange = (e) => {
    const searchValue = e.target.value;
    console.log("Searching for:", searchValue);
    // Later: filter students list or call API
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search students..."
        onChange={handleChange}
      />
    </div>
  );
}
```

### Example 3: Form Submit (Add Student)
```jsx
function AddStudentForm() {
  const handleSubmit = (e) => {
    // ✅ ALWAYS do this first in onSubmit!
    e.preventDefault();  // Stops browser from refreshing page

    const formData = {
      name: e.target.name.value,
      course: e.target.course.value
    };

    console.log("Saving student:", formData);
    // Later: call Spring Boot POST API here
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Student name" />
      <input name="course" placeholder="Course" />
      <button type="submit">Save Student</button>
    </form>
  );
}
```

> 🚨 **CRITICAL for Forms:** Always call `e.preventDefault()` in `onSubmit`! Otherwise the browser will **refresh the whole page** (losing all your React state).

---

## 🆚 Event Handling — 3 Common Patterns

| Pattern | Syntax | Use When |
|---------|--------|----------|
| **Direct function reference** | `onClick={handleClick}` | No arguments needed |
| **Arrow function** | `onClick={() => handleClick(arg)}` | Pass custom arguments |
| **Arrow + event** | `onClick={(e) => handleClick(arg, e)}` | Pass arguments **and** need event object |

### All Three in One Example:

```jsx
function ButtonsDemo() {
  // 1. No args
  const simpleClick = () => {
    alert("Simple click!");
  };

  // 2. Custom arg
  const greet = (name) => {
    alert("Hello, " + name + "!");
  };

  // 3. Custom arg + event
  const fullDemo = (msg, e) => {
    alert(msg + " | Event: " + e.type);
  };

  return (
    <div>
      {/* Pattern 1 */}
      <button onClick={simpleClick}>
        Simple Click
      </button>

      {/* Pattern 2 */}
      <button onClick={() => greet("Asiya")}>
        Greet Me
      </button>

      {/* Pattern 3 */}
      <button onClick={(e) => fullDemo("Hi there!", e)}>
        Full Demo
      </button>
    </div>
  );
}
```

---

## 🧠 Memory Tricks & Interview Points

| Question | Answer |
|----------|--------|
| **Event naming?** | Always **camelCase**: `onClick`, not `onclick` |
| **Handler syntax?** | Inside `{ }`, **no quotes**: `onClick={shoot}` |
| **Pass arguments?** | Use **arrow function**: `() => fn(arg)` |
| **Event object?** | Access via `e` / `event` parameter |
| **Form submit?** | Call `e.preventDefault()` to stop page reload |
| **Pass handler or call?** | Pass reference: `{shoot}` ❌ not `{shoot()}` |

### ❌ 4 Common Mistakes to Avoid

1. ❌ **Wrong case:** `onclick` → ✅ Use **`onClick`** (camelCase)
2. ❌ **Calling immediately:** `onClick={shoot()}` → ✅ Use **`onClick={shoot}`**
3. ❌ **No preventDefault on forms:** Page refreshes → ✅ Always `e.preventDefault()` in `onSubmit`
4. ❌ **Forgetting event in arrow:** Only when you need both args + event → ✅ `(e) => fn(arg, e)`

---

## 🎯 Quick Cheat Sheet

```jsx
// 1. Basic click
<button onClick={handleClick}>Click</button>

// 2. Click with argument
<button onClick={() => deleteItem(123)}>Delete</button>

// 3. Click with argument + event
<button onClick={(e) => save(123, e)}>Save</button>

// 4. Input change (always use onChange)
<input onChange={handleChange} />

// 5. Form submit (always preventDefault!)
<form onSubmit={(e) => { e.preventDefault(); /* save */ }}>
  <button type="submit">Submit</button>
</form>

// 6. Access input value
const handleChange = (e) => {
  const value = e.target.value;
  console.log(value);
};
```

---

## 📝 Summary

| Concept | Key Point |
|---------|-----------|
| **Event names** | **camelCase**: `onClick`, `onChange`, `onSubmit` |
| **Handler syntax** | Inside `{curly braces}`, **no quotes** |
| **No args needed** | Just pass the function: `onClick={shoot}` |
| **Custom args** | Use arrow fn: `onClick={() => shoot("Goal!")}` |
| **Need event object?** | Add it: `onClick={(e) => shoot("Goal!", e)}` |
| **Forms!** | Use `onSubmit` + **always** `e.preventDefault()` |
| **JFS Use Cases** | Buttons, forms, search inputs, delete actions, save |
