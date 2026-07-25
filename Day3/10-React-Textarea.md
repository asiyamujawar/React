
# 10 — React Textarea (`<textarea>`)

> The `<textarea>` element in React works a bit differently from plain HTML. In React, it uses a `value` attribute just like `<input>` — instead of putting content between the tags.

---

## 🔑 Key Difference: HTML vs React

### Plain HTML Textarea
In normal HTML, the **text between the tags** is the value:

```html
<!-- HTML way (NOT how React does it) -->
<textarea>
  Content of the textarea goes here between the tags.
</textarea>
```

### ✅ React Textarea
In React, the value is placed in the **`value` attribute** (just like `<input>`) and managed via state:

```jsx
// React way — controlled component (useState + value + onChange)
const [mytxt, setMytxt] = useState("");

<textarea
  value={mytxt}              // ← Value here (NOT between tags)
  onChange={handleChange}    // ← Update state on every keystroke
/>
```

> 🔑 **Memory Trick:** In React, `<textarea>` works **exactly like `<input type="text">`**. The only difference is the element name is `<textarea>` and it shows a multi-line box. Everything else (`value=`, `onChange=`, state binding) is identical!

---

## ✅ Complete Example — Controlled Textarea with useState

```jsx
import { createRoot } from 'react-dom/client';
import { useState } from 'react';

function MyForm() {
  // 1. State holds the textarea value
  const [mytxt, setMytxt] = useState("");

  // 2. onChange handler → updates state on every keystroke
  function handleChange(e) {
    setMytxt(e.target.value);
  }

  // 3. Wire up textarea + display live value
  return (
    <form>
      <label>Write here:

        {/* React textarea uses value= attribute (NOT tag children) */}
        <textarea
          value={mytxt}
          onChange={handleChange}
        />

      </label>

      {/* Live display — proves state tracks exactly what user types */}
      <p>Current value: {mytxt}</p>
    </form>
  );
}

createRoot(document.getElementById('root')).render(
  <MyForm />
);
```

---

## 🔍 Step-by-Step Breakdown

| # | Step | Code | What it Does |
|---|------|------|--------------|
| **1** | **Import hooks** | `import { useState } from 'react'` | Gives us state management in functional components |
| **2** | **Create state** | `const [mytxt, setMytxt] = useState("");` | State variable holds current textarea value |
| **3** | **Change handler** | `setMytxt(e.target.value)` | Reads textarea content from the event → updates state |
| **4** | **`value={mytxt}`** | On `<textarea>` element | React controls what's shown in the textarea from state |
| **5** | **`onChange={handleChange}`** | On `<textarea>` element | Keystrokes update state → 2-way binding |
| **6** | **Display it** | `<p>Current value: {mytxt}</p>` | Proves state updates match what user typed |

---

## 🎯 Initial / Pre-filled Value

Add default text by passing it into `useState(initialValue)`:

```jsx
function StudentAboutMe() {
  // 💡 Perfect for "Edit Profile" forms!
  const [about, setAbout] = useState(
    "Hi, I'm a B.Tech Computer Science student " +
    "interested in Java Full Stack Development."
  );

  return (
    <div>
      <h3>About Me</h3>
      <textarea
        rows={5}
        cols={50}
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      <p>
        <strong>Character count:</strong> {about.length}
      </p>
    </div>
  );
}
```

> 🔁 This is exactly how you build **"Edit Student"** / **"Edit Profile"** forms in JFS. Fetch the current text from your Spring Boot API, then set it as the initial `useState(initialValue)` so the user can edit it and save.

---

## 📝 Textarea Attributes (Common in JFS)

Since `<textarea>` works like `<input>`, most attributes are the same:

| Attribute | Example | What it does |
|-----------|---------|--------------|
| **`rows`** | `<textarea rows={6} />` | Number of visible text lines (height) |
| **`cols`** | `<textarea cols={60} />` | Visible width in average character widths |
| **`placeholder`** | `placeholder="Write your address..."` | Hint text shown when empty |
| **`maxLength`** | `maxLength={500}` | Max characters user can type |
| **`minLength`** | `minLength={10}` | Minimum characters for validation |
| **`required`** | `<textarea required />` | HTML5 validation — not empty |
| **`disabled`** | `disabled={isLoading}` | User can't type in (gray out while saving) |
| **`readOnly`** | `readOnly` | Display only — user cannot edit |
| **`name`** | `name="address"` | **Required for Pattern B (single object state)** |
| **`spellCheck`** | `spellCheck={true}` | Enable/disable spell-checker red underlines |

### Full Styled Example:
```jsx
<textarea
  name="address"
  rows={5}
  cols={50}
  maxLength={300}
  placeholder="Enter full mailing address..."
  required
  value={formData.address}
  onChange={handleChange}
  style={{ padding: '8px', fontFamily: 'inherit', fontSize: '14px' }}
/>
```

---

## 🎯 JFS — Pattern B: Single Object State (Recommended)

Just like text inputs, use `<textarea>` inside a Pattern B form with the **same universal `handleChange`**! Works perfectly because `e.target.name` + `e.target.value` are identical to text inputs.

```jsx
function AddStudentComplete() {
  // One state object for ALL fields including textarea!
  const [student, setStudent] = useState({
    name: "",
    course: "B.Tech",
    address: ""        // ← textarea field
  });

  // ✅ ONE handler works for <input> AND <textarea> AND <select>!
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending to Spring Boot:", student);
    // axios.post("/api/students", student);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"                    // ← matches state key
          value={student.name}
          onChange={handleChange}
        />
      </label>

      <label>
        Address:
        {/* Works exactly same as input! Just use textarea tag */}
        <textarea
          name="address"                 // ← matches state key
          rows={4}
          cols={50}
          placeholder="Full postal address"
          value={student.address}        // ← state.value
          onChange={handleChange}        // ← same universal handler
        />
      </label>

      <button type="submit">Save Student</button>
    </form>
  );
}
```

> ✨ **Beautiful!** You don't need a separate handler for textarea. Pattern B's universal `handleChange` works for textarea automatically. Just make sure the `name` attribute matches the state key.

---

## ❌ 3 Common Mistakes with React Textarea

| # | Mistake | Symptom | Fix |
|---|---------|---------|-----|
| **1** | ❌ HTML way: `<textarea>content here</textarea>` in React | Content doesn't show; React will throw a warning | Use **`value={state}` + `onChange={handler}`** pattern (controlled) |
| **2** | ❌ `name=` mismatch in Pattern B | Textarea value won't update correct state key | Ensure `name="address"` exactly matches state key `{ address: "" }` |
| **3** | ❌ Reading from DOM on submit: `document.querySelector('textarea').value` | Bug-prone, anti-pattern | Read from **state**! `student.address` is your single source of truth |

---

## 🧠 Interview Points

| Question | Answer |
|----------|--------|
| **`<textarea>` in HTML vs React?** | **HTML:** value is the **text content between tags**. **React:** value is in the **`value=` attribute**, just like `<input>` — controlled by state |
| **Is onChange the same as input?** | Yes. Works exactly same: `e.target.value` holds the full current text |
| **Can I still use `<textarea>content</textarea>`?** | Not for controlled components. If you do it uncontrolled with `defaultValue`, you lose React state control (not recommended for JFS) |
| **Works with Pattern B?** | Yes! Just use `name="fieldName"` matching your state key — same universal handler works automatically |
| **Initial / pre-filled value?** | Pass default as `useState("initial text here")` — perfect for edit/update pages |

---

## 🎯 Quick Cheat Sheet

```jsx
// ================================================
//  1. Individual state (Pattern A)
// ================================================
const [notes, setNotes] = useState("");

<textarea
  rows={4}
  placeholder="Enter notes..."
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
/>

// ================================================
//  2. Object state (Pattern B — JFS standard ✨)
// ================================================
const [form, setForm] = useState({
  name: "",
  address: ""      // ← textarea field
});

// Universal handler (works for input AND textarea)
const handleChange = (e) => {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: value }));
};

// Just change element name from <input> to <textarea>
<textarea
  name="address"            // ← name attr matches state key
  rows={5}
  value={form.address}
  onChange={handleChange}
/>

// ================================================
//  3. Initial value (Edit page)
// ================================================
const [address, setAddress] = useState(
  "Loaded from Spring Boot / MySQL..."
);

// ================================================
//  4. Submit — read from state, NOT DOM
// ================================================
const handleSubmit = (e) => {
  e.preventDefault();
  const payload = { address: form.address };  // ✅ From state
  // axios.post("/api/students", form);       // Send to Spring Boot
};
```

---

## 📝 Summary

| Concept | Rule |
|---------|------|
| **HTML vs React value location** | HTML → text **between tags**. React → `value=` **attribute on the element** |
| **Controlled textarea?** | Yes: `value={stateVariable}` + `onChange={handler}` + `useState` |
| **Same as `<input type=text>`?** | Yes! Only difference is the element name `<textarea>` vs `<input>` |
| **Initial value** | `useState("default content here")` |
| **Pattern B (object state)?** | Works perfectly! Ensure `name="..."` attribute matches state key exactly |
| **Universal `handleChange`?** | Same function handles textarea + inputs — no extra code needed! |
| **On submit** | Read from **state** (never query the DOM with `getElementById`) |
| **JFS use cases** | Student address, feedback/comments, description fields, "About Me", remarks, etc. |
