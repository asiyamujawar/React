
# 02 — React Props

> **Props** = **Properties**. Props are **arguments passed into React components** via HTML attributes.

---

## What are Props?

React Props are like:
- 🔹 **Function arguments** in JavaScript
- 🔹 **HTML attributes** in HTML

You pass props to a component using the same syntax as HTML attributes.

---

## ✨ Basic Example

### Sending Props (Parent Component)

Add a `brand` attribute to the Car element:

```jsx
createRoot(document.getElementById('root')).render(
  <Car brand="Ford" />
);
```

### Receiving Props (Child Component)

The component receives the argument as a **props object**:

```jsx
function Car(props) {
  return (
    <h2>I am a {props.brand}!</h2>
  );
}
```

**Output:** `I am a Ford!`

---

## 💡 Props Object Name — Can Be Anything!

The name of the object is `props` by convention, but you can call it **anything you want**.

### Example — Using `myobj` instead of `props`:

```jsx
function Car(myobj) {
  return (
    <h2>I am a {myobj.brand}!</h2>
  );
}
```

> ✅ Works exactly the same way!

---

## 📦 Pass Multiple Properties

You can send **as many properties as you want**. Every attribute is sent to the component as object properties.

### Sending Multiple Props:
```jsx
createRoot(document.getElementById('root')).render(
  <Car brand="Ford" model="Mustang" color="red" />
);
```

### Using All Props Inside Component:
```jsx
function Car(props) {
  return (
    <h2>I am a {props.color} {props.brand} {props.model}!</h2>
  );
}
```

**Output:** `I am a red Ford Mustang!`

---

## 🔢 Different Data Types in Props

React props can be of **any data type**:
- ✅ Strings
- ✅ Numbers
- ✅ Variables
- ✅ Objects
- ✅ Arrays
- ✅ Functions
- And more!

> 📌 **Rule:**
> - **Strings** → Send inside quotes: `color="red"`
> - **Numbers, Variables, Objects, Arrays** → Must send inside **curly brackets `{ }`**

---

### 1️⃣ Passing Numbers

```jsx
createRoot(document.getElementById('root')).render(
  <Car year={1969} />
);
```

> ⚠️ Without `{}`, it would be treated as a **string** instead of a number!

---

### 2️⃣ Passing Variables

```jsx
let x = "Ford";

createRoot(document.getElementById('root')).render(
  <Car brand={x} />
);
```

---

### 3️⃣ Passing Objects and Arrays

```jsx
let x = [1964, 1965, 1966];           // Array
let y = { name: "Ford", model: "Mustang" };  // Object

createRoot(document.getElementById('root')).render(
  <Car years={x} carinfo={y} />
);
```

---

## 🏷️ Object Props

The component treats objects like objects — use **dot notation** to access the properties.

### Example:

```jsx
function Car(props) {
  return (
    <>
      <h2>My {props.carinfo.name} {props.carinfo.model}!</h2>
      <p>It is {props.carinfo.color} and it is from {props.carinfo.year}!</p>
    </>
  );
}

const carInfo = {
  name: "Ford",
  model: "Mustang",
  color: "red",
  year: 1969
};

createRoot(document.getElementById('root')).render(
  <Car carinfo={carInfo} />
);
```

**Output:**
```
My Ford Mustang!
It is red and it is from 1969!
```

---

## 📋 Array Props

Array props are accessed using **indexes** (just like regular JavaScript arrays).

### Example:

```jsx
function Car(props) {
  return (
    <h2>My car is a {props.carinfo[0]} {props.carinfo[1]}!</h2>
  );
}

const carInfo = ["Ford", "Mustang"];

createRoot(document.getElementById('root')).render(
  <Car carinfo={carInfo} />
);
```

**Output:** `My car is a Ford Mustang!`

---

## 🔗 Pass Props from Component to Component

Attributes are also how you pass data **from one component to another**, as parameters.

### Example — Garage component passes `brand` to Car:

```jsx
// Child component (receives props)
function Car(props) {
  return (
    <h2>I am a {props.brand}!</h2>
  );
}

// Parent component (sends props)
function Garage() {
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <Car brand="Ford" />
    </>
  );
}

// Render the parent
createRoot(document.getElementById('root')).render(
  <Garage />
);
```

**Output:**
```
Who lives in my garage?
I am a Ford!
```

---

## 📝 Key Takeaways

| Concept | Rule |
|---------|------|
| **Props are passed** | Via HTML attributes: `<Car brand="Ford" />` |
| **Props are received** | As a props object: `function Car(props) { ... }` |
| **Accessing props** | Use dot notation: `props.brand` |
| **Strings** | Passed with quotes: `color="red"` |
| **Other types** | Passed with curly braces: `year={1969}` |
| **Props are** | **Read-only** inside the receiving component |
| **Data flow** | Always **Parent → Child** (one-way) |
