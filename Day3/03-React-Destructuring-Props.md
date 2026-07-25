
# 03 — React Destructuring Props

> **Destructuring** lets you **extract only the properties you need** from the props object. It's a cleaner way to work with props!

---

## ✨ Method 1 — Destructure Directly in Function Parameters

The component knows it only needs specific properties, so specify them **directly in the function definition**.

### Example:

```jsx
function Car({ color }) {
  return (
    <h2>My car is {color}!</h2>
  );
}

// Sending ALL properties (but only color is used)
createRoot(document.getElementById('root')).render(
  <Car brand="Ford" model="Mustang" color="red" year={1969} />
);
```

> 📌 React uses **curly brackets `{ }`** to destructure props directly in parameters: `({ color })`

**Output:** `My car is red!`

---

## 🔧 Method 2 — Destructure Inside the Component

The component receives **all properties** in `props`, then destructures only what it needs **inside the function body**.

### Example:

```jsx
function Car(props) {
  // Destructure only the properties you need
  const { brand, model } = props;

  return (
    <h2>I love my {brand} {model}!</h2>
  );
}

createRoot(document.getElementById('root')).render(
  <Car brand="Ford" model="Mustang" color="red" year={1969} />
);
```

**Output:** `I love my Ford Mustang!`

> 💡 This approach is useful when you need to access the full `props` object for other purposes.

---

## 📦 Destructuring with `...rest` Operator

When you **don't know how many properties** you will receive, use the **`...rest`** operator.

**Meaning:** Specify the properties you need by name, and **everything else gets stored in an object**.

### Example:

```jsx
function Car({ color, brand, ...rest }) {
  return (
    <h2>My {brand} {rest.model} is {color}!</h2>
  );
}

createRoot(document.getElementById('root')).render(
  <Car brand="Ford" model="Mustang" color="red" year={1969} />
);
```

**What happens:**
- `color` → `"red"`
- `brand` → `"Ford"`
- `rest` → `{ model: "Mustang", year: 1969 }` (everything else!)

**Output:** `My Ford Mustang is red!`

---

## 🎯 Default Values with Destructuring

With destructuring, you can set **default values** for props. If a property has **no value**, the default value will be used instead.

### Example:

```jsx
// Set default color = "blue" if not provided
function Car({ color = "blue", brand }) {
  return (
    <h2>My {color} {brand}!</h2>
  );
}

// Only brand is provided, no color
createRoot(document.getElementById('root')).render(
  <Car brand="Ford" />
);
```

**What happens:**
- `brand` → `"Ford"` (from props)
- `color` → `"blue"` (from default value, since not provided)

**Output:** `My blue Ford!`

---

## 📊 All Destructuring Methods — Quick Reference

| Method | Syntax | Best Used When |
|--------|--------|----------------|
| **In function params** | `function Car({ color }) { ... }` | You know exactly which props you need |
| **Inside component** | `const { brand, model } = props;` | You need full props object + specific values |
| **With `...rest`** | `function Car({ color, ...rest }) { ... }` | You need some props + want to capture all others |
| **With defaults** | `function Car({ color = "blue" }) { ... }` | Props might be missing and need fallback values |

---

## ✅ Quick Cheat Sheet

### 1️⃣ Basic Destructuring (Params)
```jsx
function User({ name, age }) {
  return <h1>{name} is {age} years old</h1>;
}
```

### 2️⃣ Destructuring Inside Body
```jsx
function User(props) {
  const { name, age } = props;
  return <h1>{name} is {age} years old</h1>;
}
```

### 3️⃣ With `...rest`
```jsx
function User({ name, ...otherData }) {
  return <h1>{name} — {otherData.email}</h1>;
}
```

### 4️⃣ With Default Values
```jsx
function User({ name = "Guest", role = "User" }) {
  return <h1>Welcome, {name}! Role: {role}</h1>;
}
```

---

## 📝 Why Use Destructuring?

| Before (Without Destructuring) ❌ | After (With Destructuring) ✅ |
|-----------------------------------|-------------------------------|
| `props.name` | `name` |
| `props.age` | `age` |
| `props.email` | `email` |
| `props.address.city` | `city` (with nested destructuring) |

**Benefits:**
- ✅ Less typing — cleaner code!
- ✅ Easier to read
- ✅ See exactly which props a component needs at a glance
- ✅ Can set default values easily
