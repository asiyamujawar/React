
# Day 4 · 02 — React Forms: Radio Buttons

> **Radio buttons** are typically used in **groups** where only **one option can be selected at a time** (unlike checkboxes, which allow multiple).

---

## 🔑 3 Golden Rules for Radio Buttons in React

| Rule | Details |
|------|---------|
| **1. Same `name` attribute** | All radios in the same group **must** share the same `name="..."` value |
| **2. Unique `value` per option** | Each radio in the group gets its own unique value string |
| **3. `checked` via equality** | Use `checked={selectedValue === 'thisRadioValue'}` (boolean expression) |

---

## 📋 Checkbox vs Radio — Quick Comparison

| Feature | Checkboxes (✓) | Radio Buttons (●) |
|---------|----------------|-------------------|
| **Selection count** | Multiple (any number) | Only **ONE per group** |
| **State type per group** | Object/Map of booleans (`{ red:true, blue:false }`) | Single string (the chosen value: `"red"`) |
| **`checked` calculation** | `checked={stateField}` (direct boolean) | `checked={stateValue === 'optionValue'}` (equality check) |
| **Handler reads** | `e.target.checked` (boolean) | `e.target.value` (string of chosen option) |
| **Name attribute** | Different per checkbox OR grouped logic | **Same name** for all radios in one group |
| **Real-world analogy** | "Choose all that apply" | "Pick exactly one" |

---

## ✅ Complete Example — Favorite Fruit Radio

```jsx
import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function MyForm() {
  // 1. Single string state → stores currently SELECTED radio's VALUE
  const [selectedFruit, setSelectedFruit] = useState('banana');

  // 2. onChange handler (works the same as text input — reads e.target.value STRING)
  const handleChange = (event) => {
    setSelectedFruit(event.target.value);
  };

  // 3. Submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Your favorite fruit is: ${selectedFruit}`);
  };

  // 4. Render the radio group
  return (
    <form onSubmit={handleSubmit}>
      <p>Select your favorite fruit:</p>

      <label>
        <input
          type="radio"
          name="fruit"
          value="apple"
          checked={selectedFruit === 'apple'}
          onChange={handleChange}
        /> Apple
      </label>
      <br />

      <label>
        <input
          type="radio"
          name="fruit"
          value="banana"
          checked={selectedFruit === 'banana'}
          onChange={handleChange}
        /> Banana
      </label>
      <br />

      <label>
        <input
          type="radio"
          name="fruit"
          value="cherry"
          checked={selectedFruit === 'cherry'}
          onChange={handleChange}
        /> Cherry
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
}

createRoot(document.getElementById('root')).render(
  <MyForm />
);
```

---

## 🔍 How It Works — Line-by-Line Explanation

### Step 1 — State: Single String (Not Object!)

```jsx
const [selectedFruit, setSelectedFruit] = useState('banana');
```

- Initial value = `'banana'` → radio with `value="banana"` will be **auto-selected** on load.
- The state holds the **`value` attribute string of the selected radio**.

### Step 2 — handleChange: Reads .value (not .checked!)

```jsx
const handleChange = (event) => {
  // Radio handler works just like TEXT INPUT handler! → e.target.value = STRING
  setSelectedFruit(event.target.value);
};
```

**Important for radio:** You're not reading `.checked` (that was for checkbox). You read `.value` — React already knows from the `name` group that selecting this radio means setting the group's state to this option's value string.

### Step 3 — checked attribute: Comparison, NOT boolean field

```jsx
checked={selectedFruit === 'banana'}
```

- For each radio, we ask: **"Is the group's current selected value equal to this radio's value?"**
- If yes → React applies `checked={true}` (shows as selected dot).
- If no → `checked={false}` (not selected).
- Because all share the same `name="fruit"` and the same state source, clicking one will de-select the others automatically (browser behavior + React state).

### Step 4 — All share same `name="fruit"`

```jsx
name="fruit"   /* on EVERY radio in the group */
```

Without the same `name`, browsers won't know they belong to a single-pick group (you'd be able to select multiple). Always same name per radio group!

---

## 🎯 JFS — Real Student Management System Use Cases

### Example 1: Gender Radio Group (Male / Female / Other)

```jsx
function StudentFormGender() {
  // String state: selected value
  const [student, setStudent] = useState({
    name: "",
    gender: "F"          // Pre-select Female by default
  });

  // Universal handleChange works for TEXT + RADIO + SELECT together!
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "✅ Submitting to Spring Boot:\n" +
      JSON.stringify(student, null, 2)
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Student Name:
        <input
          type="text"
          name="name"                      // matches state key
          value={student.name}
          onChange={handleChange}
        />
      </label>

      <fieldset style={{ border: '1px solid #ccc', padding: '10px 15px', margin: '10px 0' }}>
        <legend>Gender (pick exactly one):</legend>

        <label>
          <input
            type="radio"
            name="gender"                    // ✅ SAME name for all in group
            value="M"                        // unique value
            checked={student.gender === 'M'} // equality check
            onChange={handleChange}
          /> Male
        </label> &nbsp;

        <label>
          <input
            type="radio"
            name="gender"
            value="F"
            checked={student.gender === 'F'}
            onChange={handleChange}
          /> Female
        </label> &nbsp;

        <label>
          <input
            type="radio"
            name="gender"
            value="O"
            checked={student.gender === 'O'}
            onChange={handleChange}
          /> Other
        </label>
      </fieldset>

      <button type="submit">Save</button>
    </form>
  );
}
```

### Example 2: Payment Method Radio (JFS Course Enrollment)

```jsx
function EnrollForm() {
  const [form, setForm] = useState({
    studentName: "",
    payment: "UPI"   // default
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const options = [
    { val: "UPI",       label: "UPI (PhonePe / GPay)" },
    { val: "CARD",      label: "Credit / Debit Card" },
    { val: "NET_BANK",  label: "Net Banking" },
    { val: "DD",        label: "Demand Draft" },
    { val: "SCHOLAR",   label: "Scholarship / Fee waiver" }
  ];

  return (
    <form>
      <h4>Choose Payment Method:</h4>

      {options.map(opt => (
        <label key={opt.val} style={{ display: 'block', margin: '6px 0' }}>
          <input
            type="radio"
            name="payment"
            value={opt.val}
            checked={form.payment === opt.val}
            onChange={handleChange}
          /> &nbsp; {opt.label}
        </label>
      ))}
    </form>
  );
}
```

### Example 3: Dynamic Radio from API Data

```jsx
function StudentProgram() {
  // This array normally comes from → axios.get("/api/programs")
  const programs = [
    { id: "BT-CSE",  name: "B.Tech Computer Science" },
    { id: "BT-IT",   name: "B.Tech Information Technology" },
    { id: "BT-ECE",  name: "B.Tech Electronics" },
    { id: "BCA",     name: "Bachelor of Computer Applications" }
  ];

  const [selected, setSelected] = useState("BT-CSE");

  return (
    <div>
      <h4>Choose Program:</h4>
      {programs.map(p => (
        <label key={p.id} style={{ display: 'block', margin: '6px 0' }}>
          <input
            type="radio"
            name="program"
            value={p.id}
            checked={selected === p.id}
            onChange={(e) => setSelected(e.target.value)}
          /> &nbsp; {p.name}
        </label>
      ))}
      <p style={{ fontStyle: 'italic' }}>
        Selected program ID: <strong>{selected}</strong>
      </p>
    </div>
  );
}
```

---

## 🔁 Pattern B: Universal handleChange Includes Radios Automatically!

The **same universal Pattern B handleChange** that works for text / textarea / select also works for radios — NO MODIFICATION NEEDED!

```jsx
const handleChange = (e) => {
  // Destructure name + value (all normal inputs and radios use .value!)
  const { name, value, type, checked } = e.target;

  setForm(prev => ({
    ...prev,
    // Only checkbox is special: everything else (text/radio/select/textarea) → just value!
    [name]: type === 'checkbox' ? checked : value
  }));
};
```

**Wow! Radios go through exactly the same code path as TEXT INPUTS: `type !== 'checkbox'` → so we write `[name]: value`.** You don't have to add anything new to Pattern B for radio buttons. They just work automatically because they also read `e.target.value` (string of selected option), and the `name` attribute matches the state key.

---

## ❌ 5 Common Radio Mistakes

| # | Mistake | Symptom | Fix |
|---|---------|---------|-----|
| **1** | ❌ Different `name` per radio | Can select multiple (not grouped) | Same `name="..."` on EVERY radio in one group |
| **2** | ❌ `checked={stateVar}` (direct boolean, like checkbox) | Either ALL selected or breaks | Use **equality check**: `checked={selected === 'thisValue'}` |
| **3** | ❌ Reading `e.target.checked` in handler | Always gets boolean `true` (the clicked radio is always checked!) | For radio → read **`e.target.value`** (the string value of the clicked option) |
| **4** | ❌ Duplicate `value=` strings in same group | Can't distinguish options; two options match state | Each radio's `value="..."` must be UNIQUE within its group |
| **5** | ❌ No initial value + `<option>` mismatch | Undefined warning, un-selectable state | Initialize state to match one of the `value="..."` strings |

---

## 🧠 Interview & Memory Points

| Question | Answer |
|----------|--------|
| **Radio selection: single or multiple?** | **Single** pick per group only |
| **3 radio rules?** | Same `name` + unique `value` per option + `checked` via equality (`state === value`) |
| **State type per group?** | Single string `const [pick, setPick] = useState("defaultValue")` |
| **Handler reads what?** | `e.target.value` (string) — NOT `.checked`! |
| **Pre-selected radio?** | Set initial state string to match desired radio's `value="..."` |
| **Universal Pattern B works?** | Yes! 100% — radios use `name=` + `.value`, identical to text input |
| **Mapping over array (dynamic)?** | `<input key={opt.id} name="..." value={opt.val} checked={selected===opt.val}/>` |
| **Checkbox vs Radio state?** | Checkbox → boolean / map of booleans. Radio → single string (the VALUE of the selected one) |

---

## 🎯 Quick Cheat Sheet

```jsx
import { useState } from "react";

// ================================================
//  1. STATE: single STRING (the selected radio VALUE)
// ================================================
const [gender, setGender] = useState("F");   // pre-selects value="F"

// ================================================
//  2. onChange — reads .value (just like TEXT input!)
// ================================================
const handleChange = (e) => setGender(e.target.value);

// ================================================
//  3. Three rules per radio:
// ================================================
<label>
  <input
    type="radio"
    name="gender"              // ✅ Rule 1: SAME name for whole group
    value="M"                  // ✅ Rule 2: UNIQUE value per option
    checked={gender === 'M'}   // ✅ Rule 3: EQUALITY check, not direct boolean
    onChange={handleChange}
  /> Male
</label>

<label>
  <input
    type="radio"
    name="gender"              // same name 👆
    value="F"                  // different value
    checked={gender === 'F'}   // equality check
    onChange={handleChange}
  /> Female
</label>

// ================================================
//  4. Pattern B: Universal handleChange (works automatically!)
// ================================================
const handleAll = (e) => {
  const { name, value, type, checked } = e.target;
  setForm(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value   // radio → uses `value`!
  }));
};

// ================================================
//  5. Dynamic radios from API (.map)
// ================================================
const options = [ {id:"A",name:"Option A"}, {id:"B",name:"Option B"} ];
const [sel, setSel] = useState(options[0].id);

{options.map(o => (
  <label key={o.id}>
    <input
      type="radio"
      name="myRadioGroup"
      value={o.id}
      checked={sel === o.id}
      onChange={(e) => setSel(e.target.value)}
    /> {o.name}
  </label>
))}
```

---

## 📝 Summary

| Concept | Rule |
|---------|------|
| **Pick count** | Exactly **one per radio group** (vs checkboxes → multi) |
| **Group marker** | All radios in one group share the **same `name="..."`** |
| **State type (per group)** | Single **string** = the VALUE of the selected radio (NOT an object of booleans!) |
| **`checked=` attribute** | **Equality check** with group state: `checked={stateVal === radioValue}` (NOT a direct boolean) |
| **onChange reads** | `e.target.value` (string of the clicked radio's value — never `.checked`!) |
| **Pre-select one** | Set initial state string = the desired radio's `value="..."` attribute |
| **Pattern B works?** | Yes, automatically! Reads `type !== 'checkbox' → use value` code path |
| **JFS use cases** | Gender, payment method, year of study, program/course choice, exam mode, marital status |
