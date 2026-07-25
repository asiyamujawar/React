
# 04 — React Props Children

> **`props.children`** lets you pass **content (HTML/JSX)** **between the opening and closing tags** of a component. Think of it like the content inside `<div>THIS CONTENT</div>` — but for your own custom components!

---

## 🔑 What is `props.children`?

When you use a component **with opening and closing tags**, everything between them is automatically available as:
```jsx
props.children
```

---

## ✨ Basic Syntax

### Sending Children (Parent)
Put content **between the tags** of the component:
```jsx
<Son>
  {/* This is props.children! */}
  <p>Hello from Parent!</p>
</Son>
```

### Receiving Children (Child Component)
Display the children using `{props.children}`:
```jsx
function Son(props) {
  return (
    <div>
      <h2>Son</h2>
      <div>{props.children}</div>   {/* ← Content appears here! */}
    </div>
  );
}
```

---

## 📝 Complete Example

### Son Component
```jsx
function Son(props) {
  return (
    <div style={{ background: 'lightgreen' }}>
      <h2>Son</h2>
      <div>{props.children}</div>
    </div>
  );
}
```

### Daughter Component (with Destructuring)
```jsx
function Daughter(props) {
  const { brand, model } = props;
  return (
    <div style={{ background: 'lightblue' }}>
      <h2>Daughter</h2>
      <div>{props.children}</div>
    </div>
  );
}
```

### Parent Component
The Parent writes the content — but it gets **rendered inside** Son and Daughter:
```jsx
function Parent() {
  return (
    <div>
      <h1>My two Children</h1>

      <Son>
        <p>
          This was written in the Parent component,
          but displayed as a part of the Son component
        </p>
      </Son>

      <Daughter>
        <p>
          This was written in the Parent component,
          but displayed as a part of the Daughter component
        </p>
      </Daughter>
    </div>
  );
}
```

### Render the Parent
```jsx
createRoot(document.getElementById('root')).render(
  <Parent />
);
```

---

## 🖼️ What It Looks Like

**Result:**
```
┌──────────────────────────────────────────────┐
│ My two Children                              │  ← Parent renders this
├──────────────────────────────────────────────┤
│ 🌿 Son                                       │  ← Son renders its own header
│   ┌────────────────────────────────────────┐ │
│   │ This was written in the Parent...      │ │  ← But THIS comes from Parent
│   └────────────────────────────────────────┘ │
├──────────────────────────────────────────────┤
│ 💧 Daughter                                  │  ← Daughter renders its own header
│   ┌────────────────────────────────────────┐ │
│   │ This was written in the Parent...      │ │  ← And THIS comes from Parent too
│   └────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

---

## 🤔 Why Use `props.children`?

This is **extremely useful** for creating **reusable wrapper components**!

### Real-World Examples

| Component | What `props.children` is for |
|-----------|------------------------------|
| **Modal / Popup** | The content inside the modal |
| **Card** | Anything inside the card |
| **Button** | Text or icons inside the button |
| **Sidebar** | The menu items inside |
| **Layout** | The page content inside the layout |
| **Alert Box** | The warning/info message |

### Example — Reusable Card Component
```jsx
function Card({ title, children }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h3>{title}</h3>
      <hr />
      {children}       {/* ← Whatever you put between <Card> tags! */}
    </div>
  );
}

// Use Card with ANY content inside:
function App() {
  return (
    <div>
      <Card title="Student Info">
        <p>Name: John Doe</p>
        <p>Course: B.Tech</p>
        <button>View Details</button>
      </Card>

      <Card title="Warning!">
        <p style={{ color: 'red' }}>⚠️ Please fill all fields!</p>
      </Card>
    </div>
  );
}
```

---

## 📊 Ways to Access `props.children`

### Method 1 — Direct Access (Most Common)
```jsx
function Card(props) {
  return <div>{props.children}</div>;
}
```

### Method 2 — Destructure in Function Parameters
```jsx
function Card({ children }) {
  return <div>{children}</div>;
}
```

### Method 3 — Destructure Inside Body
```jsx
function Card(props) {
  const { children } = props;
  return <div>{children}</div>;
}
```

### Method 4 — Combine Children + Other Props
```jsx
function Card({ title, children }) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

// Usage:
<Card title="Hello">
  <p>My content here</p>
</Card>
```

---

## 🧩 Types of Children

`props.children` can be **anything**:

### 1️⃣ Text / String
```jsx
<Son>Just plain text here</Son>
```

### 2️⃣ Single Element
```jsx
<Son>
  <p>One paragraph</p>
</Son>
```

### 3️⃣ Multiple Elements
```jsx
<Son>
  <h3>Hello</h3>
  <p>World</p>
  <button>Click Me</button>
</Son>
```

### 4️⃣ Other Components!
```jsx
<Card title="Nested">
  <Son>
    <p>Components inside components!</p>
  </Son>
</Card>
```

### 5️⃣ Variables / Expressions
```jsx
const message = "Hello from variable!";

<Son>
  <p>{message.toUpperCase()}</p>
</Son>
```

---

## 🆚 Regular Props vs Children Props

| | Regular Props | Children Props |
|---|---------------|----------------|
| **How to send** | `<Card title="Hello" />` | `<Card>ANY CONTENT</Card>` |
| **How to access** | `props.title` | `props.children` |
| **Use for** | Small data (strings, numbers, objects) | Big content (HTML, JSX, components) |
| **Example** | `color="red"`, `user={userObj}` | Form content, modal body, card text |

---

## 🎯 Quick Cheat Sheet

```jsx
// ✅ Pass children — between the tags
<MyComponent>
  <h1>Hello</h1>
  <p>This goes in as children</p>
</MyComponent>

// ✅ Access children
function MyComponent(props) {
  return <div>{props.children}</div>;
}

// ✅ Or with destructuring
function MyComponent({ children }) {
  return <div>{children}</div>;
}

// ✅ Combine with other props
function Card({ title, children }) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

---

## 📝 Summary

| Concept | Key Point |
|---------|-----------|
| **What is it?** | Content passed **between component tags** |
| **Access with** | `props.children` or destructure `{ children }` |
| **Can contain** | Text, elements, components, expressions — **anything!** |
| **Great for** | Wrapper components: Cards, Modals, Buttons, Layouts |
| **JFS Use Case** | Form containers, table wrappers, dashboard panels |
