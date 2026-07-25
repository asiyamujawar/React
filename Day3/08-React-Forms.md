
# 08 — React Forms

> Just like HTML, React uses forms to let users interact with the page. But in React, we **control form data through state** instead of letting the DOM manage it.

---

## 🔑 Key Difference: HTML Forms vs React Forms

| Feature | Plain HTML Forms | React Forms |
|---------|------------------|-------------|
| **Where is the value stored?** | In the DOM element itself (browser memory) | In React **state** (`useState`) |
| **Who controls it?** | Browser (DOM) | React component |
| **Terminology** | Uncontrolled | **Controlled Components** ✅ |
| **On submit** | Refreshes the whole page | You prevent refresh with `e.preventDefault()` |

> 💡 **Definition:** In React, form elements (`<input>`, `<textarea>`, `<select>`) whose values are **managed by React state** are called **Controlled Components**. This is the standard way in modern React.

---

## 1️⃣ Basic HTML Form (NOT What We Want)

Add a form just like HTML — but it has a problem:
```jsx
function MyForm() {
  return (
    <form>
      <label>Enter your name:
        <input type="text" />
      </label>
    </form>
  );
}

createRoot(document.getElementById('root')).render(
  <MyForm />
);
```

### 🚨 Problem With This:
When submitted, **the browser will refresh the whole page** (HTML default). In React, we want:
- No page refresh
- React state holds the values ("single source of truth")
- We control everything

**Fix: Use Controlled Components with `useState`.**

---

## 2️⃣ Controlled Components — The Correct Way ✅

In a **Controlled Component**:
1. Form data is handled by the React component (not DOM)
2. Input value is **driven by React state** via `value={state}`
3. Changes are managed via an `onChange` handler that calls the state setter
4. We use `useState` hook to keep track of each input's value

### Complete Example — Controlled Form Input
```jsx
import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function MyForm() {
  // Step 1: State to hold input value (single source of truth)
  const [name, setName] = useState("");

  // Step 2: Event handler — runs every time user types
  function handleChange(e) {
    setName(e.target.value);   // Read value from input event → update state
  }

  return (
    <form>
      <label>Enter your name:

        {/* Step 3: Bind state + handler to input */}
        <input
          type="text"
          value={name}                    // State controls what's shown
          onChange={handleChange}         // Typing updates the state
        />

      </label>

      {/* Step 4: Live display — proves React owns the data! */}
      <p>Current value: {name}</p>
    </form>
  );
}

createRoot(document.getElementById('root')).render(
  <MyForm />
);
```

---

## 🔍 Step-by-Step Explanation

| # | Step | Code | What it does |
|---|------|------|--------------|
| **1** | **Import `useState` Hook** | `import { useState } from 'react';` | Gives us state management in function components |
| **2** | **Declare state variable** | `const [name, setName] = useState("");` | Creates a state variable `name` (empty initial) + setter function `setName` |
| **3** | **Create `onChange` handler** | `function handleChange(e) { setName(e.target.value); }` | Runs on every keystroke. Reads value from the event's target element |
| **4** | **Bind state to `<input>`** | `value={name}` `onChange={handleChange}` | Two-way link: state → input display AND input → state update |
| **5** | **Show current value** | `<p>Current value: {name}</p>` | Visual proof that state updates as user types |

---

## 🎯 Initial Values (Pre-filled Forms)

To give an input a **default value**, simply pass the value into `useState(initialValue)`.

```jsx
function MyForm() {
  // Initial value is "John" — input will start filled with "John"
  const [name, setName] = useState("John");

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form>
      <label>Enter your name:
        <input
          type="text"
          value={name}
          onChange={handleChange}
        />
      </label>
      <p>Current value: {name}</p>
    </form>
  );
}
```

> 🔁 This is exactly how you build **"Edit Student"** forms in JFS! When the page loads, you fetch student data from Spring Boot API and pass each value to `useState(fetchedValue)`.

---

## 📋 Multiple Input Fields in One Form

Real JFS forms have **many fields** (name, email, course, phone...). You have two patterns:

### Pattern A — Separate State Per Input (Simple, Good for Small Forms)
```jsx
function AddStudentForm() {
  const [name,   setName]   = useState("");
  const [course, setCourse] = useState("B.Tech");
  const [phone,  setPhone]  = useState("");

  // Separate handlers (or reuse with computed keys)
  const handleNameChange   = (e) => setName(e.target.value);
  const handleCourseChange = (e) => setCourse(e.target.value);
  const handlePhoneChange  = (e) => setPhone(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();  // ✅ ALWAYS! Stops page refresh
    const student = { name, course, phone };
    console.log("Saving student:", student);
    // Later: call Spring Boot POST API with axios
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label>Course:</label>
        <select value={course} onChange={handleCourseChange}>
          <option value="B.Tech">B.Tech</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
        </select>
      </div>
      <div>
        <label>Phone:</label>
        <input type="tel" value={phone} onChange={handlePhoneChange} />
      </div>
      <button type="submit">Save Student</button>
    </form>
  );
}
```

### Pattern B — Single Object State (Better for Bigger Forms) ✨
One state object holds ALL fields. Use **computed property name** `[e.target.name]` so one `handleChange` works for every input!

```jsx
function AddStudentForm() {
  // One object state for all fields
  const [student, setStudent] = useState({
    name: "",
    course: "B.Tech",
    phone: "",
    email: ""
  });

  // Single handler for ALL inputs!
  // Uses input's "name" attribute to know which field to update.
  const handleChange = (e) => {
    const { name, value } = e.target;   // Destructure name + value from event
    setStudent(prev => ({ ...prev, [name]: value }));  // Keep other fields, update one
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving student:", student);
    // axios.post("/api/students", student) ... Spring Boot POST
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input "name" attribute must match state key exactly! */}
      <label>Name:
        <input name="name" value={student.name} onChange={handleChange} />
      </label>
      <br />
      <label>Course:
        <select name="course" value={student.course} onChange={handleChange}>
          <option>B.Tech</option>
          <option>BCA</option>
          <option>MCA</option>
        </select>
      </label>
      <br />
      <label>Phone:
        <input name="phone" value={student.phone} onChange={handleChange} />
      </label>
      <br />
      <label>Email:
        <input name="email" value={student.email} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Save Student</button>
    </form>
  );
}
```

> ✅ **Pattern B is the JFS standard for Spring Boot forms.** Just make sure each input has a `name="..."` attribute matching the state key!

---

## 📮 Form Submit in React

### Golden Rule #1:
**Always** call `e.preventDefault()` first in your `onSubmit` handler — otherwise the page refreshes and you lose all React state!

### Golden Rule #2:
After `preventDefault`, read from **state** (not from DOM). The state IS the data.

```jsx
const handleSubmit = (e) => {
  // ✅ 1. Always first — stop browser refresh
  e.preventDefault();

  // ✅ 2. Read from state — not from the DOM
  const formData = {
    name: student.name,
    course: student.course,
    email: student.email
  };

  // ✅ 3. Call Spring Boot API here (later with axios)
  // await axios.post("http://localhost:8080/api/students", formData);

  console.log("Form submitted:", formData);
  alert("✅ Student saved!\n\n" + JSON.stringify(formData, null, 2));
};
```

---

## 📝 All Form Field Types

React works the same for all standard form inputs — just remember `value={}` + `onChange={}`.

| Field Type | Example JSX | Note |
|------------|-------------|------|
| **Text input** | `<input type="text" name="name" value={s.name} onChange={h} />` | Most common |
| **Password** | `<input type="password" name="pw" value={s.pw} onChange={h} />` | Login/Signup |
| **Email** | `<input type="email" name="email" value={s.email} onChange={h} />` | Built-in HTML validation |
| **Number** | `<input type="number" name="age" value={s.age} onChange={h} />` | Value comes as string! Convert with `Number()` |
| **Textarea** | `<textarea name="address" value={s.addr} onChange={h} />` | Use `value` attribute (not children) — React quirk |
| **Select/Dropdown** | `<select name="course" value={s.course} onChange={h}>`<br /> `  <option>B.Tech</option>`<br /> `</select>` | Bind to `<select>`, not `<option>` |
| **Checkbox** | `<input type="checkbox" name="agree" checked={s.agree} onChange={h} />` | Use `checked=` (not `value=`), value is boolean |
| **Radio** | `<input type="radio" name="gender" value="M" checked={s.g==='M'} onChange={h} />` | Same `name` per group, `value=`, `checked=` for comparison |

---

## ❌ 5 Common Form Mistakes in React

| # | Mistake | Why It's Bad | Correct Fix |
|---|---------|--------------|-------------|
| **1** | ❌ `onSubmit={submit}` but **no `e.preventDefault()`** | Browser refreshes page → state gone! | Always: `const handleSubmit = (e) => { e.preventDefault(); /*...*/ }` |
| **2** | ❌ Reading values **from DOM** (`e.target.name.value`) on submit instead of state | State is the "source of truth" — ignore DOM, read state! | Use values from state: `student.name`, not DOM query |
| **3** | ❌ Forgot `value={state}` on input | Component is uncontrolled (mixed with DOM) | Always bind: `value={student.name}` + `onChange` |
| **4** | ❌ Forgot `name="fieldName"` attribute on inputs (Pattern B) | `handleChange` can't match which state key to update | Match the `name` attribute exactly with state key |
| **5** | ❌ Used `useState()` with no initial value | Input will error with "uncontrolled → controlled" warning | Always provide initial value: `useState("")` or `useState({ name:"" })` |

---

## 🎯 JFS Complete Example — Add Student Form (End-to-End)

This is the exact pattern you'll use in **Student Management System Spring Boot + React** projects:

```jsx
import { useState } from "react";

function AddStudentForm() {
  // ---- STATE: Single object for ALL fields ----
  const [formData, setFormData] = useState({
    name: "",
    course: "B.Tech CSE",
    email: "",
    phone: "",
    cgpa: "",
    active: true
  });

  const [submitted, setSubmitted] = useState(null);

  // ---- UNIVERSAL CHANGE HANDLER (works for all inputs) ----
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      // Checkbox uses 'checked' (boolean), other inputs use 'value' (string)
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // ---- SUBMIT HANDLER (call API here later) ----
  const handleSubmit = async (e) => {
    e.preventDefault();   // ✅ STEP 1: Stop page refresh

    // Convert numeric fields from string → number
    const payload = {
      ...formData,
      cgpa: Number(formData.cgpa)
    };

    console.log("Payload for Spring Boot API:", payload);

    // ✅ STEP 2: Later this will be → axios.post("/api/students", payload)
    // const res = await axios.post("http://localhost:8080/api/students", payload);

    setSubmitted(payload);   // Show result in UI for demo
    setTimeout(() => setSubmitted(null), 4000);
  };

  // ---- RENDER ----
  return (
    <div>
      <h2>Add New Student</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Student Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              required
            />
          </label>
        </div>

        <div>
          <label>Course:
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="B.Tech CSE">B.Tech CSE</option>
              <option value="B.Tech IT">B.Tech IT</option>
              <option value="B.Tech ECE">B.Tech ECE</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
            </select>
          </label>
        </div>

        <div>
          <label>Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@college.edu"
              required
            />
          </label>
        </div>

        <div>
          <label>Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit mobile"
              maxLength={10}
            />
          </label>
        </div>

        <div>
          <label>CGPA:
            <input
              type="number"
              name="cgpa"
              step="0.01"
              min="0"
              max="10"
              value={formData.cgpa}
              onChange={handleChange}
              placeholder="0.00 - 10.00"
            />
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            Student is currently active
          </label>
        </div>

        <button type="submit">💾 Save to Database</button>
      </form>

      {submitted && (
        <div style={{ background: "#e8f8ef", border: "1px solid #27ae60", padding: "15px", marginTop: "20px", borderRadius: "6px" }}>
          <h3 style={{color: "#27ae60"}}>✅ Form Submitted Successfully!</h3>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
          <p><em>This data will go to Spring Boot API (POST /api/students)</em></p>
        </div>
      )}
    </div>
  );
}
```

---

## 🧠 Interview Points

| Question | Answer |
|----------|--------|
| **Controlled vs Uncontrolled?** | **Controlled:** value managed by React state (`value={state}` + `onChange`) — **modern standard**. **Uncontrolled:** value stored in DOM, read via `useRef` — legacy |
| **Why `preventDefault()` on submit?** | Stops browser from refreshing the page → preserves React state & app experience |
| **What is "single source of truth"?** | When state is the only true location of form data — every input reads from state, every keystroke writes back to state |
| **Pattern B (one state object) works how?** | Use input's `name` attribute (matches state key) + `setState(prev => ({...prev, [e.target.name]: e.target.value}))` |
| **Checkbox uses `value` or `checked`?** | `checked={state.boolVal}` — boolean. Radio uses `checked={state === 'optionValue'}` |
| **`<textarea>` in React vs HTML?** | React uses `value={}` attribute on `<textarea>` (NOT `<textarea>content</textarea>`) for consistency |
| **Why pass to Spring Boot from state?** | Clean separation of concerns. State validates/transforms first → axios sends JSON → Spring Boot receives exact RequestBody |

---

## 🎯 Quick Cheat Sheet

```jsx
// ================================================
//  1. State for form (Pattern B: single object)
// ================================================
const [form, setForm] = useState({ name: "", email: "" });

// ================================================
//  2. One handler for ALL inputs
// ================================================
const handleChange = (e) => {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: value }));
};

// ================================================
//  3. Submit handler (always preventDefault!)
// ================================================
const handleSubmit = (e) => {
  e.preventDefault();
  // axios.post("/api/students", form) ... later
  console.log("Saved:", form);
};

// ================================================
//  4. JSX Inputs (name attribute MUST match state key!)
// ================================================
<form onSubmit={handleSubmit}>
  <input name="name"  value={form.name}  onChange={handleChange} />
  <input name="email" value={form.email} onChange={handleChange} />
  <button type="submit">Save</button>
</form>
```

---

## 📝 Summary

| Concept | Rule |
|---------|------|
| **Controlled Component** | Input's `value` bound to React state with `useState`; updated via `onChange` handler |
| **Always do on submit** | `e.preventDefault()` — stops page refresh! |
| **Read data from** | ✅ State, NOT DOM elements |
| **Single large form?** | Use Pattern B: one `formData` object + one `handleChange` for all inputs using `name` attribute |
| **Initial / Pre-filled value** | Pass it as the argument to `useState(initialValue)` — perfect for Edit pages |
| **JFS Spring Boot use** | On submit → send state object as JSON `RequestBody` to backend API via `axios.post()` |
