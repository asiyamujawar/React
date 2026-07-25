
# 07 — React Lists

> In React, you'll render lists using a loop. The **JavaScript `map()` array method** is the **preferred way** to do this.

---

## 🔑 Key Concept: `map()` Method

If you need a refresher: **`map()`** loops over an array and **returns a new array** with modified items.

In React:
- Take an array of **data**
- Use `.map()` to convert each data item into a **JSX element**
- Render the resulting array of JSX elements

```
[ data1, data2, data3 ]
       ↓ map()
[ <li>data1</li>, <li>data2</li>, <li>data3</li> ]
       ↓
React renders all <li> elements
```

---

## 1️⃣ Basic List — No Keys

Let's create a simple list of cars using `map()`.

```jsx
function MyCars() {
  const cars = ['Ford', 'BMW', 'Audi'];

  return (
    <>
      <h1>My Cars:</h1>
      <ul>
        {/* Map each car string to an <li> JSX element */}
        {cars.map((car) => <li>I am a {car}</li>)}
      </ul>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <MyCars />
);
```

### What This Renders:
```
My Cars:
  • I am a Ford
  • I am a BMW
  • I am a Audi
```

> ⚠️ **WARNING:** This will work, **but React will show a warning** in console:
> ```
> Warning: Each child in a list should have a unique "key" prop.
> ```
>
> We need **keys** to fix this!

---

## 🔑 Keys in React Lists

### What Are Keys?
Keys allow React to **keep track of individual list elements**.

**Why keys matter:**
- If an item is **updated or removed**, only **that one item re-renders**
- Without keys, React might re-render the **entire list** every time (slow!)
- Prevents weird UI bugs (wrong items getting removed/updated)

### Rules for Keys:
| Rule | Details |
|------|---------|
| ✅ **Unique among siblings** | Each key must be different from other items in **the same list** |
| ❌ **Not globally unique** | OK for same key in two different lists (not same list!) |
| ✅ **Stable / consistent** | Same item gets same key every time (not random!) |
| ✅ **Use unique IDs first** | Prefer IDs from database (`student.id`, `car.id`) |
| ⚠️ **Use index as last resort** | Only when list is static and will never be reordered |

---

## 2️⃣ List With Unique ID Keys (✅ RECOMMENDED!)

This is the **correct way** to make a list.

```jsx
function MyCars() {
  // Array of OBJECTS with unique IDs
  const cars = [
    { id: 1001, brand: 'Ford' },
    { id: 1002, brand: 'BMW' },
    { id: 1003, brand: 'Audi' }
  ];

  return (
    <>
      <h1>My Cars:</h1>
      <ul>
        {/* Use unique ID from data as key: key={car.id} */}
        {cars.map((car) => (
          <li key={car.id}>
            I am a {car.brand}
          </li>
        ))}
      </ul>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <MyCars />
);
```

### Same Output, No Warning! ✅
```
My Cars:
  • I am a Ford
  • I am a BMW
  • I am a Audi
```

> 💡 **JFS Tip:** When fetching from a **Spring Boot API**, your data will almost always have `id` from database — **always use it as the key!**

---

## 3️⃣ List Using Array Index as Key (⚠️ Last Resort)

Use **array index** as key **ONLY WHEN**:
1. The list is **static** (will never add/remove items)
2. The list will **never be reordered, filtered, or sorted**
3. The items **have no unique ID**

```jsx
function MyCars() {
  // Plain strings — no IDs
  const cars = ['Ford', 'BMW', 'Audi'];

  return (
    <>
      <h1>My Cars:</h1>
      <ul>
        {/* index is the 2nd parameter of map callback */}
        {cars.map((car, index) => (
          <li key={index}>
            I am a {car}
          </li>
        ))}
      </ul>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <MyCars />
);
```

> 🚨 **WHY INDEX IS BAD for DYNAMIC LISTS:**
> If you add items to the **beginning** or **reorder**, all indexes shift → wrong items re-render → UI bugs and slow performance. **Use IDs!**

---

## 🆚 `key` Do's & Don'ts — Quick Comparison

| ✅ DO (Good Keys) | ❌ DON'T (Bad Keys) |
|-------------------|---------------------|
| ✅ `key={item.id}` — Unique database ID | ❌ `key={Math.random()}` — Random (never stable!) |
| ✅ `key={item.email}` — Unique business key | ❌ `key={index}` — If list changes dynamically |
| ✅ `key={item.studentId}` — Domain ID | ❌ `key={item.name}` — Names can be duplicated! |
| ✅ Keys unique **within the list** | ❌ Same key used twice in same list |

---

## 🎯 JFS — Student List (Real-World Example)

This is exactly how you'll use lists in a **Student Management System**.

```jsx
function StudentList() {
  // Data that you'd normally get from Spring Boot API
  const students = [
    { id: 101, name: "John Doe", course: "B.Tech CSE", cgpa: 9.32 },
    { id: 102, name: "Jane Smith", course: "B.Tech IT", cgpa: 8.75 },
    { id: 103, name: "Bob Brown", course: "BCA", cgpa: 7.90 },
    { id: 104, name: "Alice Blue", course: "B.Tech ECE", cgpa: 9.01 }
  ];

  return (
    <div>
      <h2>Students ({students.length})</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>CGPA</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* map over students array, key=student.id */}
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.course}</td>
              <td>{student.cgpa}</td>
              <td>
                <button>Edit</button>
                {' '}
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### Output:
```
Students (4)
+-----+-----------+-------------+-------+----------------+
| ID  | Name      | Course      | CGPA  | Actions        |
+-----+-----------+-------------+-------+----------------+
| 101 | John Doe  | B.Tech CSE  | 9.32  | [Edit] [Delete]|
| 102 | Jane Smith| B.Tech IT   | 8.75  | [Edit] [Delete]|
| 103 | Bob Brown | BCA         | 7.90  | [Edit] [Delete]|
| 104 | Alice Blue| B.Tech ECE  | 9.01  | [Edit] [Delete]|
+-----+-----------+-------------+-------+----------------+
```

---

## 📋 Common `map()` Patterns for JFS

### Pattern 1: `<ul>` Bullet List
```jsx
<ul>
  {items.map(item => <li key={item.id}>{item.name}</li>)}
</ul>
```

### Pattern 2: HTML Table
```jsx
<table>
  <tbody>
    {rows.map(row => (
      <tr key={row.id}>
        <td>{row.a}</td>
        <td>{row.b}</td>
      </tr>
    ))}
  </tbody>
</table>
```

### Pattern 3: Card Components
```jsx
<div className="card-grid">
  {students.map(s => (
    <StudentCard
      key={s.id}
      id={s.id}
      name={s.name}
      course={s.course}
    />
  ))}
</div>
```

### Pattern 4: Dropdown / Select Options
```jsx
<select name="course">
  {courses.map(c => (
    <option key={c.id} value={c.id}>
      {c.name}
    </option>
  ))}
</select>
```

---

## ❌ 4 Common Mistakes with Lists

| Mistake | Problem | Fix |
|---------|---------|-----|
| **1. Forgetting `key` prop** | Console warning + bad performance | Always add `key={uniqueId}` |
| **2. Using `index` key for dynamic list** | Wrong items reorder/delete → bugs | Use data IDs: `key={item.id}` |
| **3. Duplicate keys in same list** | React warning + unpredictable updates | Ensure all keys in one list are unique |
| **4. Using `forEach` instead of `map`** | `forEach` returns `undefined`, not JSX! | Always use **`.map()`** — it returns new array |

---

## 🧠 Interview Points

| Question | Answer |
|----------|--------|
| **Best method for lists in React?** | `.map()` array method |
| **Why keys?** | React tracks items — only re-render changed items, faster, fewer bugs |
| **Unique globally or just siblings?** | Unique among **siblings** (only within same list) |
| **Ideal key?** | Stable unique ID from database (`item.id`) |
| **When to use index as key?** | Only if list is **static**, no reorder, no add/remove |
| **What if key duplicates?** | React warning + potential rendering bugs |
| **`forEach` vs `map`?** | `forEach` ❌ doesn't return JSX. Use `map` ✅ |

---

## 🎯 Quick Cheat Sheet

```jsx
// ================================================
//  1. Basic map() — WITHOUT key (for learning only!)
// ================================================
const names = ["A", "B", "C"];
{names.map(n => <li>{n}</li>)}

// ================================================
//  2. BEST WAY — With ID key (use in real projects!)
// ================================================
const items = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" }
];

{items.map(item => (
  <li key={item.id}>
    {item.name}
  </li>
))}

// ================================================
//  3. LAST RESORT — Index as key
// ================================================
const staticList = ["A", "B", "C"];
{staticList.map((item, index) => (
  <li key={index}>
    {item}
  </li>
))}

// ================================================
//  4. JFS TABLE — Students from API
// ================================================
{students.map(s => (
  <tr key={s.id}>
    <td>{s.name}</td>
    <td>{s.course}</td>
    <td>
      <button onClick={() => deleteStudent(s.id)}>Delete</button>
    </td>
  </tr>
))}
```

---

## 📝 Summary

| Concept | Rule |
|---------|------|
| **How to loop?** | Use JavaScript **`.map()`** method — NOT `forEach` |
| **`map()` returns?** | A new array of JSX elements (one per data item) |
| **Keys purpose?** | React tracks items → faster renders, fewer bugs |
| **Best key?** | ✅ **Unique stable ID** from data: `key={item.id}` |
| **Fallback key?** | ⚠️ Array index: `(item, i) => key={i}` — only for static lists |
| **For JFS?** | You'll map API data into `<table>` rows, `<option>` lists, card components |
