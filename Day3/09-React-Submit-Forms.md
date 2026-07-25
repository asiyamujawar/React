
# 09 — React Submit Forms

> You control the submit action by adding an **event handler** in the `onSubmit` attribute of the `<form>` element.

---

## 🔑 Core Concept

In plain HTML, clicking a submit button:
1. Sends data to `action="..."` URL
2. **Refreshes the entire page** ← ❌ Bad for React SPAs

In React, you intercept the form submission:
1. Attach an `onSubmit={handleSubmit}` handler to `<form>`
2. Call `e.preventDefault()` inside to **stop page refresh**
3. Read the data from **React state** (not from the DOM)
4. Do whatever you want with it (API call, validation, etc.)

```
<form onSubmit={handleSubmit}>
              ↓  (user clicks submit)
  handleSubmit(e) {
    e.preventDefault();   ← 1. Stop browser refresh
    const data = state;   ← 2. Read data from state
    fetch(...);           ← 3. Send to API
  }
```

---

## ✅ Complete Example — Submit Form with useState

```jsx
import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function MyForm() {
  // 1. State holds the input value
  const [name, setName] = useState("");

  // 2. onChange → Updates state on every keystroke
  function handleChange(e) {
    setName(e.target.value);
  }

  // 3. onSubmit → Runs when user submits the form
  function handleSubmit(e) {
    e.preventDefault();   // ✅ CRITICAL: Stops page refresh!
    alert(name);          // Do something with the data
  }

  // 4. Wire everything up
  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your name:
        <input
          type="text"
          value={name}           // ← State → Input display
          onChange={handleChange} // ← Keystroke → State update
        />
      </label>

      {/* Native submit triggers onSubmit */}
      <input type="submit" />
    </form>
  );
}

createRoot(document.getElementById('root')).render(
  <MyForm />
);
```

---

## 🔍 Step-by-Step Breakdown

| # | Part | Code / Line | What It Does |
|---|------|-------------|--------------|
| **1** | **State** | `const [name, setName] = useState("");` | Holds the current input value (single source of truth) |
| **2** | **Change Handler** | `handleChange(e) { setName(e.target.value); }` | Runs on every keystroke — updates state |
| **3** | **Submit Handler** | `handleSubmit(e) { e.preventDefault(); alert(name); }` | Runs **once**, when the form is submitted |
| **4** | **Bind to Form** | `<form onSubmit={handleSubmit}>` | Submit button OR pressing Enter fires this |
| **5** | **Bind to Input** | `value={name} onChange={handleChange}` | Two-way binding between state & input |
| **6** | **Submit Button** | `<input type="submit" />` OR `<button type="submit">` | Native submit trigger |

---

## 🚨 Golden Rules of Form Submit in React

### Rule 1: **Always** call `e.preventDefault()` first
```jsx
// ❌ Without this — browser refreshes, React state is lost!
function handleSubmit(e) {
  e.preventDefault();   // ✅ Step 1. Always!
  // ... rest of code
}
```

### Rule 2: Read data from **STATE**, **NOT** from DOM
```jsx
function handleSubmit(e) {
  e.preventDefault();

  // ✅ GOOD: Read from state — clean, reactive, reliable
  const studentData = {
    name: name,           // state variable
    course: course        // state variable
  };

  // ❌ BAD: Reading directly from DOM — anti-pattern in React
  // const name = document.getElementById("nameInput").value;
}
```

### Rule 3: Submit can be triggered by ANY of these:
- Clicking `<button type="submit">` or `<input type="submit">`
- Pressing **Enter** in a single-input form
- Programmatically: `formElement.requestSubmit()` (rarely used)

---

## 🆚 `<button type="submit">` vs `<input type="submit">`

Both work identically for form submission — choose based on styling need:

| Syntax | Example | Pros |
|--------|---------|------|
| **`<input type="submit">`** | `<input type="submit" value="Save" />` | Simpler, pure button text |
| **`<button type="submit">`** | `<button type="submit">💾 Save</button>` | **More common ✨** — Can contain HTML (icons, styling, elements inside) |

### Same Result — Different Buttons:
```jsx
<form onSubmit={handleSubmit}>
  <input name="name" value={name} onChange={h} />

  {/* Option 1: input type="submit" */}
  <input type="submit" value="Submit Option 1" />

  {/* Option 2: button type="submit" — MORE FLEXIBLE & USED OFTEN */}
  <button type="submit">
    💾 <strong>Submit Option 2</strong>
  </button>
</form>
```

> 💡 **JFS Tip:** Always prefer `<button type="submit">` — easier to add icons and style!

---

## 🎯 JFS — Submit to Spring Boot API (Real-World Example)

This is exactly how your student form will submit data to the backend:

```jsx
import { useState } from "react";
// import axios from "axios";   ← you'll import this later after npm install axios

function AddStudentFormSubmit() {
  const [formData, setFormData] = useState({
    name: "",
    course: "B.Tech CSE",
    email: "",
    cgpa: ""
  });

  const [status, setStatus] = useState({ loading: false, message: "", error: "" });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ================================================
  //  SUBMIT HANDLER — sends data to Spring Boot API
  // ================================================
  const handleSubmit = async (e) => {
    e.preventDefault();   // 1. Stop refresh

    setStatus({ loading: true, message: "", error: "" });

    // 2. Prepare payload (convert types if needed)
    const studentPayload = {
      ...formData,
      cgpa: Number(formData.cgpa)  // Convert string → number for backend
    };

    try {
      console.log("Sending to Spring Boot:", studentPayload);

      // ================================================
      // 3. Call Spring Boot API — (install axios first!)
      // ================================================
      // const response = await axios.post(
      //   "http://localhost:8080/api/students",   // Your Spring Boot URL
      //   studentPayload                            // JSON RequestBody
      // );
      // console.log("Saved:", response.data);

      // (For now, simulate API delay with setTimeout)
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStatus({
        loading: false,
        message: "✅ Student saved successfully!",
        error: ""
      });

      // Reset form after successful save
      setFormData({ name: "", course: "B.Tech CSE", email: "", cgpa: "" });

    } catch (err) {
      console.error(err);
      setStatus({
        loading: false,
        message: "",
        error: "❌ Failed to save: " + (err.message || "Check if Spring Boot is running.")
      });
    }
  };

  // ================================================
  //  RENDER
  // ================================================
  return (
    <div>
      <h2>Add Student — Submit to Spring Boot</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Course:
          <select name="course" value={formData.course} onChange={handleChange}>
            <option value="B.Tech CSE">B.Tech CSE</option>
            <option value="B.Tech IT">B.Tech IT</option>
            <option value="BCA">BCA</option>
          </select>
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          CGPA:
          <input
            type="number"
            step="0.01" min="0" max="10"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleChange}
          />
        </label>

        <button type="submit" disabled={status.loading}>
          {status.loading ? "⏳ Saving..." : "💾 Save Student"}
        </button>
      </form>

      {/* Status messages */}
      {status.message && (
        <div style={{ background: "#e8f8ef", padding: "10px", border: "1px solid green" }}>
          {status.message}
        </div>
      )}
      {status.error && (
        <div style={{ background: "#fdecea", padding: "10px", border: "1px solid red" }}>
          {status.error}
        </div>
      )}
    </div>
  );
}
```

---

## 🚦 Submit Flow Diagram (JFS)

```
┌──────────────────────────────────┐
│  User fills fields + clicks Save │
└─────────────┬────────────────────┘
              │   form onSubmit fires
              ▼
┌──────────────────────────────────┐
│  handleSubmit(e)                 │
│  ├─ e.preventDefault()           │  ← Stop page refresh
│  ├─ Read values from STATE       │  ← Not from DOM!
│  ├─ Transform if needed          │     (String → Number, etc)
│  └─ Loading state = true         │
└─────────────┬────────────────────┘
              │   axios.post()
              ▼
┌──────────────────────────────────┐
│  Spring Boot Backend             │
│  POST /api/students              │
│  @RequestBody Student student    │
│  └─ save to MySQL                │
└─────────────┬────────────────────┘
              │   JSON Response
              ▼
┌──────────────────────────────────┐
│  handleSubmit callback           │
│  ├─ Success → Show success msg   │
│  ├─ Error   → Show error msg     │
│  ├─ Reset form state             │
│  └─ Loading state = false        │
└──────────────────────────────────┘
```

---

## ❌ 5 Common Submit Mistakes

| # | Mistake | Symptom | Fix |
|---|---------|---------|-----|
| **1** | ❌ Forgot `e.preventDefault()` | Page refreshes, state lost! | Add it as the **first line** in handleSubmit |
| **2** | ❌ Read values from DOM | Fragile anti-pattern | Read from **state variables** only |
| **3** | ❌ `<button>` without `type="submit"` | Button click doesn't submit form! | Always write: `<button type="submit">Save</button>` |
| **4** | ❌ Submitted multiple times | Double-save to backend | Disable button + `loading` state while API call is in-flight |
| **5** | ❌ Form with no submit button | Enter key doesn't submit | Always include at least one `<button type="submit">` or `<input type="submit">` |

---

## 🧠 Interview Points

| Question | Answer |
|----------|--------|
| **Why `preventDefault()`?** | Stops browser from doing a full-page form refresh — allows React SPA to maintain state and handle submission via JS |
| **What data to submit?** | Data from **state** (controlled component) — not querying the DOM for inputs |
| **When does `onSubmit` fire?** | On any submit trigger: submit button click, or pressing `Enter` in a focused text field |
| **Button vs Input submit?** | `<button type="submit">` preferred — allows icons/styling inside |
| **Prevent double-submit?** | Set a `loading` state; disable submit button and/or ignore second submit if loading |
| **Multiple forms on one page?** | Each `<form>` has its own independent `onSubmit` handler — no conflict |
| **How to send to Spring Boot?** | Use `axios.post(backendUrl, formDataAsObject)` → matches `@RequestBody` on the Java side |

---

## 🎯 Quick Cheat Sheet

```jsx
import { useState } from "react";

// ===== STATE =====
const [data, setData] = useState({ name: "" });

// ===== CHANGE (per keystroke) =====
const handleChange = (e) =>
  setData(prev => ({ ...prev, [e.target.name]: e.target.value }));

// ===== SUBMIT (once on Save/Enter) =====
const handleSubmit = async (e) => {
  e.preventDefault();                          // ✅ 1. Always first!
  console.log("Submitting:", data);            // ✅ 2. From state
  // await axios.post("/api/students", data);  // ✅ 3. To backend
};

// ===== RENDER =====
<form onSubmit={handleSubmit}>
  <input name="name" value={data.name} onChange={handleChange} />
  <button type="submit">                       {/* ✅ type="submit" */}
    Save
  </button>
</form>
```

---

## 📝 Summary

| Concept | Rule |
|---------|------|
| **Handler location** | Attach `onSubmit={fn}` to the **`<form>` tag** (not the button!) |
| **Line #1 in handler** | **Always** `e.preventDefault()` → prevents page refresh |
| **Data source** | Read values from **state** — never query the DOM directly |
| **Trigger button** | `<button type="submit">` OR `<input type="submit">` |
| **Sending to Spring Boot** | `axios.post(url, stateObject)` → Sends as JSON `RequestBody` |
| **Prevent double submit** | Loading flag + disable button during API request |
| **After success** | Show success message, reset form state, redirect if needed |
