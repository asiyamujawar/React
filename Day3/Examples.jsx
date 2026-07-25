
// ============================================================
//  Day 3 — Examples: Class Components, Props, Destructuring, Children, Events, Lists, Forms
// ============================================================

import React, { Component, useState } from "react";

// ------------------------------------------------------------
//  1. Class Component with State
// ------------------------------------------------------------
class CarWithState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      color: "Red"
    };
  }

  changeColor = () => {
    this.setState({ color: "Blue" });
  };

  render() {
    return (
      <div>
        <h2>I am a {this.state.color} {this.state.brand}!</h2>
        <button onClick={this.changeColor}>Change Color to Blue</button>
      </div>
    );
  }
}

// ------------------------------------------------------------
//  2. Class Component with Props
// ------------------------------------------------------------
class CarWithProps extends Component {
  render() {
    return <h2>I am a {this.props.color} {this.props.brand}!</h2>;
  }
}

// ------------------------------------------------------------
//  3. Class Component Lifecycle — componentDidMount
// ------------------------------------------------------------
class LifecycleDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "Loading..." };
  }

  componentDidMount() {
    // Simulate API call with setTimeout
    setTimeout(() => {
      this.setState({ message: "Data loaded successfully!" });
    }, 2000);
  }

  componentWillUnmount() {
    console.log("Component is being removed - cleanup here!");
  }

  render() {
    return <h2>{this.state.message}</h2>;
  }
}

// ------------------------------------------------------------
//  4. Function Component with Props (Basic)
// ------------------------------------------------------------
function BasicCar(props) {
  return <h2>I am a {props.brand}!</h2>;
}

// ------------------------------------------------------------
//  5. Multiple Props Example
// ------------------------------------------------------------
function CarFullDetails(props) {
  return (
    <h2>
      I am a {props.color} {props.brand} {props.model} ({props.year})!
    </h2>
  );
}

// ------------------------------------------------------------
//  6. Different Data Types as Props
// ------------------------------------------------------------
function DataTypesDemo(props) {
  return (
    <div>
      <p>Brand (String): {props.brand}</p>
      <p>Year (Number): {props.year}</p>
      <p>Years (Array): {props.years.join(", ")}</p>
      <p>Car Info (Object): {props.carinfo.name} {props.carinfo.model}</p>
    </div>
  );
}

// ------------------------------------------------------------
//  7. Object Props with Dot Notation
// ------------------------------------------------------------
function CarObjectProps(props) {
  return (
    <div>
      <h2>
        My {props.carinfo.name} {props.carinfo.model}!
      </h2>
      <p>
        It is {props.carinfo.color} and it is from {props.carinfo.year}!
      </p>
    </div>
  );
}

// ------------------------------------------------------------
//  8. Array Props with Index Access
// ------------------------------------------------------------
function CarArrayProps(props) {
  return (
    <h2>
      My car is a {props.carinfo[0]} {props.carinfo[1]}!
    </h2>
  );
}

// ------------------------------------------------------------
//  9. Props Passed Between Components (Garage → Car)
// ------------------------------------------------------------
function GarageCar(props) {
  return <h2>I am a {props.brand}!</h2>;
}

function Garage() {
  return (
    <div>
      <h1>Who lives in my garage?</h1>
      <GarageCar brand="Ford" />
      <GarageCar brand="Tesla" />
      <GarageCar brand="BMW" />
    </div>
  );
}

// ------------------------------------------------------------
//  10. Destructuring Props — Method 1: In Function Parameters
// ------------------------------------------------------------
function DestructureParams({ color }) {
  return <h2>My car is {color}!</h2>;
}

// ------------------------------------------------------------
//  11. Destructuring Props — Method 2: Inside Component Body
// ------------------------------------------------------------
function DestructureBody(props) {
  const { brand, model } = props;
  return <h2>I love my {brand} {model}!</h2>;
}

// ------------------------------------------------------------
//  12. Destructuring with ...rest Operator
// ------------------------------------------------------------
function DestructureRest({ color, brand, ...rest }) {
  return (
    <h2>
      My {brand} {rest.model} ({rest.year}) is {color}!
    </h2>
  );
}

// ------------------------------------------------------------
//  13. Destructuring with Default Values
// ------------------------------------------------------------
function DestructureDefaults({ color = "blue", brand = "Unknown" }) {
  return <h2>My {color} {brand}!</h2>;
}

// ------------------------------------------------------------
//  14. Props Children — Son Component
// ------------------------------------------------------------
function Son(props) {
  return (
    <div style={{ background: 'lightgreen', padding: '15px', margin: '10px 0', borderRadius: '8px' }}>
      <h2>Son</h2>
      <div>{props.children}</div>
    </div>
  );
}

// ------------------------------------------------------------
//  15. Props Children — Daughter Component (with Destructuring)
// ------------------------------------------------------------
function Daughter(props) {
  const { brand, model } = props;
  return (
    <div style={{ background: 'lightblue', padding: '15px', margin: '10px 0', borderRadius: '8px' }}>
      <h2>Daughter</h2>
      {brand && model && <p>Car: {brand} {model}</p>}
      <div>{props.children}</div>
    </div>
  );
}

// ------------------------------------------------------------
//  16. Props Children — Parent Component (wraps Son & Daughter)
// ------------------------------------------------------------
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
      <Daughter brand="Tesla" model="Model 3">
        <p>
          This was written in the Parent component,
          but displayed as a part of the Daughter component
        </p>
      </Daughter>
    </div>
  );
}

// ------------------------------------------------------------
//  17. Props Children — Reusable Card Component (JFS Example)
// ------------------------------------------------------------
function StudentCard({ title, children }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '20px',
      borderRadius: '8px',
      margin: '15px 0',
      boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginBottom: '10px', color: '#333' }}>{title}</h3>
      <hr style={{ margin: '10px 0' }} />
      {children}
    </div>
  );
}

// ------------------------------------------------------------
//  18. React Events — Basic onClick (Football Shot)
// ------------------------------------------------------------
function Football() {
  const shoot = () => {
    alert("Great Shot!");
  };

  return (
    <button
      onClick={shoot}
      style={{ padding: '8px 16px', margin: '5px' }}
    >
      Take the shot!
    </button>
  );
}

// ------------------------------------------------------------
//  19. React Events — Passing Arguments
// ------------------------------------------------------------
function FootballWithArg() {
  const shoot = (a) => {
    alert(a);
  };

  return (
    <button
      onClick={() => shoot("Goal!")}
      style={{ padding: '8px 16px', margin: '5px' }}
    >
      Take the shot! (with arg)
    </button>
  );
}

// ------------------------------------------------------------
//  20. React Events — Event Object (manual pass)
// ------------------------------------------------------------
function FootballWithEvent() {
  const shoot = (a, b) => {
    alert(a + " | Event type: " + b.type);
    /*
      'b' = React event that triggered the function
      In this case: 'click' event
    */
  };

  return (
    <button
      onClick={(event) => shoot("Goal!", event)}
      style={{ padding: '8px 16px', margin: '5px' }}
    >
      Take the shot! (with event)
    </button>
  );
}

// ------------------------------------------------------------
//  21. React Events — All 3 Patterns in One
// ------------------------------------------------------------
function EventPatterns() {
  // Pattern 1: No args
  const simpleClick = () => {
    alert("Simple click!");
  };

  // Pattern 2: Custom arg
  const greet = (name) => {
    alert("Hello, " + name + "!");
  };

  // Pattern 3: Custom arg + event object
  const fullDemo = (msg, e) => {
    alert(msg + " | Event: " + e.type);
  };

  return (
    <div>
      <p><strong>Pattern 1:</strong> Direct reference (no args)</p>
      <button onClick={simpleClick} style={{ padding: '6px 12px', margin: '5px' }}>
        Simple Click
      </button>

      <p><strong>Pattern 2:</strong> Arrow function with custom arg</p>
      <button onClick={() => greet("Asiya")} style={{ padding: '6px 12px', margin: '5px' }}>
        Greet Me
      </button>

      <p><strong>Pattern 3:</strong> Arrow with arg + event object</p>
      <button onClick={(e) => fullDemo("Hi there!", e)} style={{ padding: '6px 12px', margin: '5px' }}>
        Full Demo
      </button>
    </div>
  );
}

// ------------------------------------------------------------
//  22. React Events — JFS Use Cases (Delete + Search + Form)
// ------------------------------------------------------------
function JFSEvents() {
  const deleteStudent = (studentId, e) => {
    console.log("Delete student ID:", studentId, "| Event:", e.type);
    alert("⚠️ Deleting student with ID: " + studentId);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    console.log("Searching for:", searchValue);
    document.getElementById("searchOutput").innerText = "You typed: " + searchValue;
  };

  const handleFormSubmit = (e) => {
    // CRITICAL! Always do this first in onSubmit
    e.preventDefault();

    const formData = {
      name: e.target.studentName.value,
      course: e.target.course.value
    };

    console.log("Saving student:", formData);
    alert("✅ Saving student:\nName: " + formData.name + "\nCourse: " + formData.course);

    // Clear form after submit
    e.target.reset();
  };

  return (
    <div>
      <h4>A) Delete Buttons (onClick with args + event)</h4>
      <button
        onClick={(e) => deleteStudent(101, e)}
        style={{ padding: '6px 12px', margin: '5px', background: '#ff5757', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Delete John (ID: 101)
      </button>
      <button
        onClick={(e) => deleteStudent(102, e)}
        style={{ padding: '6px 12px', margin: '5px', background: '#ff5757', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Delete Jane (ID: 102)
      </button>

      <hr style={{ margin: '20px 0' }} />

      <h4>B) Search Input (onChange with event.target.value)</h4>
      <input
        type="text"
        placeholder="Search students..."
        onChange={handleSearchChange}
        style={{ padding: '6px 10px', width: '250px' }}
      />
      <p id="searchOutput" style={{ fontStyle: 'italic', marginTop: '5px' }}>
        You typed:
      </p>

      <hr style={{ margin: '20px 0' }} />

      <h4>C) Add Student Form (onSubmit with preventDefault)</h4>
      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '300px' }}>
        <input
          name="studentName"
          placeholder="Student name"
          style={{ padding: '6px 10px' }}
          required
        />
        <input
          name="course"
          placeholder="Course (e.g. B.Tech)"
          style={{ padding: '6px 10px' }}
          required
        />
        <button
          type="submit"
          style={{ padding: '8px 16px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Save Student
        </button>
      </form>
    </div>
  );
}

// ------------------------------------------------------------
//  23. Conditional Rendering — Sub-Components (MadeGoal / MissedGoal)
// ------------------------------------------------------------
function MissedGoal() {
  return <h1 style={{ color: '#e74c3c' }}>❌ MISSED!</h1>;
}

function MadeGoal() {
  return <h1 style={{ color: '#2ecc71' }}>🎉 Goal!</h1>;
}

// ------------------------------------------------------------
//  24. Conditional Rendering — Method 1: if Statement
// ------------------------------------------------------------
function GoalIf(props) {
  const isGoal = props.isGoal;
  if (isGoal) {
    return <MadeGoal />;
  }
  return <MissedGoal />;
}

// ------------------------------------------------------------
//  25. Conditional Rendering — Method 2: Logical && Operator
// ------------------------------------------------------------
function CarBrand(props) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
      {/* Only show heading if brand exists */}
      {props.brand && <h1>My car is a {props.brand}!</h1>}
      {!props.brand && <p><em>(no brand provided — heading hidden via &&)</em></p>}
    </div>
  );
}

// ------------------------------------------------------------
//  26. Conditional Rendering — Method 3: Ternary Operator
// ------------------------------------------------------------
function GoalTernary(props) {
  const isGoal = props.isGoal;
  return (
    <>
      {isGoal ? <MadeGoal /> : <MissedGoal />}
    </>
  );
}

// ------------------------------------------------------------
//  27. Conditional Rendering — JFS Student Dashboard (ALL 3 Methods)
// ------------------------------------------------------------
function StudentDashboardConditional() {
  // Sample student data + state flags
  const student = {
    name: "John Doe",
    cgpa: 9.32,
    attendance: 68,
    marks: 45
  };
  const isAdmin = true;

  // Method 1: if (early return example)
  const loading = false;
  if (loading) {
    return (
      <div style={{ padding: '20px', border: '1px dashed #ccc' }}>
        <h3>⏳ Loading dashboard...</h3>
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
      <h2>{student.name}'s Dashboard</h2>

      {/* Method 2: && — Show only IF TRUE (no else) */}
      {isAdmin && (
        <button style={{ background: '#ff5757', color: 'white', padding: '6px 12px', margin: '5px', border: 'none', borderRadius: '4px' }}>
          🗑️ Delete Student (Admin Only)
        </button>
      )}

      {student.cgpa >= 9.0 && (
        <span style={{ background: '#f1c40f', padding: '3px 10px', borderRadius: '12px', marginLeft: '5px' }}>
          ⭐ Topper
        </span>
      )}

      {student.attendance < 75 && (
        <div style={{ background: '#ffeaea', color: '#c0392b', padding: '10px', margin: '10px 0', borderRadius: '4px' }}>
          ⚠️ <strong>Low attendance ({student.attendance}%)!</strong> Contact HOD.
        </div>
      )}

      <p style={{ marginTop: '15px' }}>
        <strong>Result:</strong>{' '}

        {/* Method 3: Ternary — Either / Or */}
        {student.marks >= 40
          ? <span style={{ color: '#27ae60', fontWeight: 'bold' }}>✅ PASS</span>
          : <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>❌ FAIL</span>
        }
      </p>

      <p>
        <strong>CGPA:</strong> {student.cgpa}
        <span style={{ marginLeft: '10px' }}>
          {student.cgpa >= 9.0 ? '🏆 Excellent!' : student.cgpa >= 7.0 ? '👍 Good' : '📚 Needs improvement'}
        </span>
      </p>
    </div>
  );
}

// ------------------------------------------------------------
//  28. Conditional Rendering — Empty State vs Data (Ternary)
// ------------------------------------------------------------
function StudentListConditional() {
  // Try switching these:
  const students = [
    { id: 101, name: "John Doe" },
    { id: 102, name: "Jane Smith" }
  ];
  // const students = [];  // ← uncomment to test empty state!

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
      <h2>Students List</h2>

      {students.length > 0 ? (
        // If data exists — show table
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ccc' }}>ID</th>
              <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ccc' }}>Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>{s.id}</td>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>{s.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // If empty — show message
        <p style={{ fontStyle: 'italic', color: '#666', padding: '20px', textAlign: 'center' }}>
          📭 No students found. Add one!
        </p>
      )}
    </div>
  );
}

// ------------------------------------------------------------
//  29. React Lists — Method 1: Basic map() (NO KEY — learning only)
// ------------------------------------------------------------
function MyCarsBasic() {
  const cars = ['Ford', 'BMW', 'Audi'];
  return (
    <>
      <h3>Basic map() — Strings to &lt;li&gt;</h3>
      <ul>
        {cars.map((car) => (
          <li>I am a {car}</li>
        ))}
      </ul>
      <p style={{ fontStyle: 'italic', color: '#c0392b' }}>
        ⚠️ No key — React shows warning in console! (for learning only)
      </p>
    </>
  );
}

// ------------------------------------------------------------
//  30. React Lists — Method 2: With UNIQUE ID KEY (BEST PRACTICE ✅)
// ------------------------------------------------------------
function MyCarsWithId() {
  const cars = [
    { id: 1001, brand: 'Ford' },
    { id: 1002, brand: 'BMW' },
    { id: 1003, brand: 'Audi' }
  ];
  return (
    <>
      <h3>With Unique ID Keys — ✅ RECOMMENDED</h3>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            [ID:{car.id}] I am a {car.brand}
          </li>
        ))}
      </ul>
      <p style={{ fontStyle: 'italic', color: '#27ae60' }}>
        ✅ No warning — keys are unique IDs from data
      </p>
    </>
  );
}

// ------------------------------------------------------------
//  31. React Lists — Method 3: Index as Key (⚠️ Last Resort)
// ------------------------------------------------------------
function MyCarsWithIndex() {
  const cars = ['Ford', 'BMW', 'Audi'];
  return (
    <>
      <h3>With Array Index as Key — ⚠️ Last Resort only</h3>
      <ul>
        {cars.map((car, index) => (
          <li key={index}>
            [{index}] I am a {car}
          </li>
        ))}
      </ul>
      <p style={{ fontStyle: 'italic', color: '#8e44ad' }}>
        ⚠️ Use only for STATIC lists — no add/remove/reorder
      </p>
    </>
  );
}

// ------------------------------------------------------------
//  32. React Lists — JFS Student Management Table (REAL WORLD)
// ------------------------------------------------------------
function StudentListTable() {
  // Data you'd normally get from Spring Boot API
  const students = [
    { id: 101, name: "John Doe",   course: "B.Tech CSE", cgpa: 9.32 },
    { id: 102, name: "Jane Smith", course: "B.Tech IT",  cgpa: 8.75 },
    { id: 103, name: "Bob Brown",  course: "BCA",        cgpa: 7.90 },
    { id: 104, name: "Alice Blue", course: "B.Tech ECE", cgpa: 9.01 }
  ];

  const handleEdit = (id) => alert(`✏️ Editing student ID: ${id}`);
  const handleDelete = (id) => alert(`🗑️ Deleting student ID: ${id}`);

  return (
    <div>
      <h3>JFS — Students Table (key=student.id from DB)</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#2c3e50', color: 'white' }}>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Course</th>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>CGPA</th>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{student.id}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{student.name}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{student.course}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{student.cgpa}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <button
                  onClick={() => handleEdit(student.id)}
                  style={{ padding: '4px 10px', marginRight: '5px', background: '#3498db', color: 'white', border: 'none', borderRadius: '3px' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  style={{ padding: '4px 10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '3px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
        💡 Each row uses <code>key=&#123;student.id&#125;</code> — from database IDs!
      </p>
    </div>
  );
}

// ------------------------------------------------------------
//  33. React Forms — Basic Controlled Component (Pattern A)
// ------------------------------------------------------------
function BasicControlledForm() {
  const [name, setName] = useState("");   // Initial value: empty

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', margin: '10px 0' }}>
      <h4>Basic Controlled Input</h4>
      <form onSubmit={(e) => { e.preventDefault(); alert("Hello, " + name); }}>
        <label>
          Enter your name:&nbsp;
          <input
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="Type here..."
          />
        </label>
        <p style={{ fontStyle: 'italic' }}>
          Current value in state: <strong>{name || "(empty)"}</strong>
        </p>
        <button type="submit" style={{ padding: '4px 12px' }}>Greet Me</button>
      </form>
    </div>
  );
}

// ------------------------------------------------------------
//  34. React Forms — Initial Value (Pre-filled / Edit page)
// ------------------------------------------------------------
function FormWithInitialValue() {
  const [name, setName] = useState("John Doe");  // Initial value = "John Doe"

  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', margin: '10px 0' }}>
      <h4>With Initial Value (like Edit page)</h4>
      <label>
        Student name:&nbsp;
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <p style={{ fontStyle: 'italic' }}>
        💡 Started with <code>useState("John Doe")</code> — pre-filled input!
      </p>
    </div>
  );
}

// ------------------------------------------------------------
//  35. React Forms — JFS Add Student Form (Pattern B: Object State)
// ------------------------------------------------------------
function AddStudentFormExample() {
  // All fields in ONE state object (Pattern B)
  const [formData, setFormData] = useState({
    name: "",
    course: "B.Tech CSE",
    email: "",
    phone: "",
    cgpa: "",
    active: true
  });

  const [submitted, setSubmitted] = useState(null);

  // ONE handler for ALL inputs using name attribute + computed keys
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      // Checkboxes use 'checked' (boolean), others use 'value'
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();   // ✅ CRITICAL: Prevents page refresh!

    const payload = {
      ...formData,
      cgpa: formData.cgpa ? Number(formData.cgpa) : null
    };

    console.log("Spring Boot API payload:", payload);
    setSubmitted(payload);

    // Reset fields after submit
    setFormData({
      name: "", course: "B.Tech CSE", email: "", phone: "", cgpa: "", active: true
    });

    setTimeout(() => setSubmitted(null), 5000);
  };

  const inputStyle = { padding: '5px 8px', margin: '4px 0' };
  const labelBlock = { display: 'block', margin: '8px 0' };

  return (
    <div style={{ border: '1px solid #2c3e50', padding: '20px', borderRadius: '8px', margin: '10px 0' }}>
      <h3 style={{ margin: '0 0 15px', color: '#2c3e50' }}>JFS — Add Student Form (Pattern B)</h3>

      <form onSubmit={handleSubmit}>
        <label style={labelBlock}>
          Name:&nbsp;
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
            required
            style={inputStyle}
          />
        </label>

        <label style={labelBlock}>
          Course:&nbsp;
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="B.Tech CSE">B.Tech CSE</option>
            <option value="B.Tech IT">B.Tech IT</option>
            <option value="B.Tech ECE">B.Tech ECE</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
          </select>
        </label>

        <label style={labelBlock}>
          Email:&nbsp;
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@college.edu"
            required
            style={inputStyle}
          />
        </label>

        <label style={labelBlock}>
          Phone:&nbsp;
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit mobile"
            maxLength={10}
            style={inputStyle}
          />
        </label>

        <label style={labelBlock}>
          CGPA:&nbsp;
          <input
            type="number"
            name="cgpa"
            step="0.01"
            min="0"
            max="10"
            value={formData.cgpa}
            onChange={handleChange}
            placeholder="0.00 - 10.00"
            style={{ ...inputStyle, width: '120px' }}
          />
        </label>

        <label style={labelBlock}>
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
          />
          &nbsp; Student is currently active
        </label>

        <button
          type="submit"
          style={{
            padding: '8px 20px',
            background: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginTop: '10px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          💾 Save to Database (POST /api/students)
        </button>
      </form>

      {submitted && (
        <div style={{ background: "#e8f8ef", border: "1px solid #27ae60", padding: "15px", marginTop: "20px", borderRadius: "6px" }}>
          <h3 style={{ color: "#27ae60", margin: '0 0 10px' }}>✅ Saved Successfully!</h3>
          <pre style={{ background: 'white', padding: '10px', margin: 0, borderRadius: '4px' }}>
{JSON.stringify(submitted, null, 2)}
          </pre>
          <p style={{ fontStyle: 'italic', marginTop: '8px' }}>
            This exact JSON payload goes to the Spring Boot backend via Axios!
          </p>
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------
//  36. React Submit Forms — Explicit onSubmit handler
// ------------------------------------------------------------
function SubmitFormDemo() {
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState(null);

  const handleChange = (e) => setName(e.target.value);

  // EXPLICIT submit handler — attached to <form>, NOT the button
  const handleSubmit = (e) => {
    e.preventDefault();   // ✅ CRITICAL: Step 1 always!
    setSubmittedName(name);
    // Later: axios.post(...) to Spring Boot here
    setTimeout(() => setSubmittedName(null), 3500);
  };

  return (
    <div style={{ border: '1px solid #2980b9', padding: '20px', borderRadius: '8px' }}>
      <h3 style={{ color: '#2980b9', marginTop: 0 }}>
        Submit Form — onSubmit handler on &lt;form&gt;
      </h3>

      {/* ✅ onSubmit goes on the <form>, not the button! */}
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:&nbsp;
          <input
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="Type + press Enter or click Submit"
            style={{ padding: '5px 8px', minWidth: '220px' }}
          />
        </label>

        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
          {/* Two equivalent submit triggers — both fire form onSubmit */}
          <input type="submit" value="Submit (input type=submit)" style={{ padding: '6px 14px' }} />
          <button type="submit" style={{ padding: '6px 14px' }}>
            💾 Submit (button type=submit)
          </button>
        </div>
      </form>

      {submittedName !== null && (
        <div style={{
          background: '#eaf4fb', border: '1px solid #2980b9',
          padding: '12px', marginTop: '15px', borderRadius: '5px'
        }}>
          <strong>✅ Submitted!</strong> Name received in handleSubmit:&nbsp;
          <code>{submittedName}</code>
        </div>
      )}

      <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
        💡 <code>handleSubmit</code> is attached to <code>&lt;form onSubmit=...&gt;</code> — either
        submit button OR pressing Enter triggers it!
      </p>
    </div>
  );
}

// ------------------------------------------------------------
//  37. React Textarea — Controlled with useState
// ------------------------------------------------------------
function TextareaDemo() {
  const [mytxt, setMytxt] = useState("");

  function handleChange(e) {
    setMytxt(e.target.value);
  }

  return (
    <div style={{ border: '1px solid #8e44ad', padding: '20px', borderRadius: '8px' }}>
      <h3 style={{ color: '#8e44ad', marginTop: 0 }}>
        React Textarea (value= attribute, NOT content between tags!)
      </h3>

      <form>
        <label>
          <strong>Write here:</strong><br />
          <textarea
            rows={6}
            cols={60}
            placeholder="Type multi-line text here..."
            value={mytxt}
            onChange={handleChange}
            style={{ padding: '8px', fontSize: '14px', marginTop: '5px' }}
          />
        </label>

        <p style={{ marginTop: '12px' }}>
          <strong>Current value in state:</strong>
        </p>
        <div style={{
          background: '#f4f0fa', border: '1px dashed #8e44ad',
          padding: '10px', whiteSpace: 'pre-wrap', borderRadius: '4px',
          minHeight: '40px'
        }}>
          {mytxt || <em style={{ color: '#888' }}>(textarea is empty — type above)</em>}
        </div>

        <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
          💡 Character count:&nbsp;
          <strong>{mytxt.length}</strong>
        </p>
      </form>
    </div>
  );
}

// ------------------------------------------------------------
//  38. React Textarea — Initial Value + Pattern B (Address Form)
// ------------------------------------------------------------
function TextareaAddressDemo() {
  // Pattern B: Single object state for multiple fields
  const [form, setForm] = useState({
    name: "John Doe",
    address: "123 Main Street\nHITEC City, Hyderabad\nTelangana, India - 500081"
  });

  // Universal handleChange works for BOTH input AND textarea!
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Submitted to Spring Boot:\n" + JSON.stringify(form, null, 2));
  };

  return (
    <div style={{
      border: '1px solid #16a085',
      padding: '20px',
      borderRadius: '8px',
      marginTop: '15px'
    }}>
      <h3 style={{ color: '#16a085', marginTop: 0 }}>
        Textarea with Initial Value + Pattern B (Address Form)
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          <strong>Name:</strong><br />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{ padding: '6px 8px', width: '280px', marginTop: '4px' }}
          />
        </label>

        <label>
          <strong>Address (textarea):</strong><br />
          <textarea
            name="address"                // ← matches state key exactly!
            rows={5}
            cols={60}
            value={form.address}          // ← value from state
            onChange={handleChange}       // ← same handleChange as <input>
            style={{ padding: '8px', fontSize: '14px', marginTop: '4px' }}
          />
        </label>

        <button
          type="submit"
          style={{
            alignSelf: 'flex-start',
            padding: '8px 20px',
            background: '#16a085',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          💾 Submit
        </button>
      </form>

      <p style={{ fontStyle: 'italic', marginTop: '15px' }}>
        💡 Uses same <code>handleChange</code> for both <code>&lt;input&gt;</code> and <code>&lt;textarea&gt;</code>!
        Pattern B with name attribute — works automatically.
      </p>
    </div>
  );
}

// ------------------------------------------------------------
//  39. React Select — Hardcoded Options
// ------------------------------------------------------------
function SelectDemo() {
  const [myCar, setMyCar] = useState("Volvo");  // Initial value="Volvo" → Volvo pre-selected

  const handleChange = (event) => {
    setMyCar(event.target.value);
  };

  return (
    <div style={{ border: '1px solid #e67e22', padding: '20px', borderRadius: '8px' }}>
      <h3 style={{ color: '#e67e22', marginTop: 0 }}>
        React Select (value= on &lt;select&gt;, NOT selected= on &lt;option&gt;)
      </h3>

      <form>
        <label>
          <strong>Pick your car:</strong>&nbsp;
          <select
            value={myCar}
            onChange={handleChange}
            style={{ padding: '6px 10px', fontSize: '14px' }}
          >
            <option value="Ford">Ford</option>
            <option value="Volvo">Volvo</option>
            <option value="Fiat">Fiat</option>
          </select>
        </label>

        <p style={{ marginTop: '12px' }}>
          You selected:&nbsp;
          <span style={{ fontWeight: 'bold', color: '#e67e22' }}>{myCar}</span>
        </p>
      </form>

      <p style={{ fontStyle: 'italic' }}>
        💡 Initial state is <code>"Volvo"</code> → automatically selected without any{' '}
        <code>selected</code> attribute on {'<option>'}s!
      </p>
    </div>
  );
}

// ------------------------------------------------------------
//  40. React Select — Dynamic Options (.map) + Placeholder + Pattern B
// ------------------------------------------------------------
function SelectDynamicDemo() {
  // This would normally come from axios.get("/api/courses")
  const courses = [
    { id: 1, code: "CSE", name: "B.Tech Computer Science" },
    { id: 2, code: "IT",  name: "B.Tech Information Tech" },
    { id: 3, code: "ECE", name: "B.Tech Electronics" },
    { id: 4, code: "BCA", name: "Bachelor of Comp Apps" },
  ];

  // Pattern B: Single object state (includes fields from text + select together!)
  const [form, setForm] = useState({
    studentName: "",
    courseCode: ""     // initially empty → shows placeholder
  });

  // Universal handleChange — works for <input> AND <select> automatically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "✅ Submitted to Spring Boot:\n" +
      JSON.stringify(form, null, 2)
    );
  };

  return (
    <div style={{
      border: '1px solid #2c3e50', padding: '20px', borderRadius: '8px', marginTop: '15px'
    }}>
      <h3 style={{ color: '#2c3e50', marginTop: 0 }}>
        Select — Dynamic .map() Options + Placeholder + Pattern B (Real JFS)
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label>
          <strong>Student Name:</strong><br />
          <input
            type="text"
            name="studentName"
            value={form.studentName}
            onChange={handleChange}
            placeholder="Enter name"
            style={{ padding: '6px 8px', minWidth: '280px', marginTop: '4px' }}
            required
          />
        </label>

        <label>
          <strong>Course (dynamic + placeholder + required):</strong><br />
          <select
            name="courseCode"                // ← matches state key exactly!
            value={form.courseCode}
            onChange={handleChange}
            style={{ padding: '6px 10px', minWidth: '300px', marginTop: '4px' }}
            required
          >
            {/* Placeholder — disabled + empty value */}
            <option value="" disabled>
              -- Please select a course --
            </option>

            {/* .map() over courses array → options generated dynamically */}
            {courses.map(c => (
              <option key={c.id} value={c.code}>
                {c.name}  [{c.code}]
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          style={{
            alignSelf: 'flex-start',
            padding: '8px 22px',
            background: '#2c3e50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          💾 Submit (POST /api/students)
        </button>
      </form>

      <div style={{
        background: '#f4f6f7',
        padding: '10px 14px',
        marginTop: '15px',
        borderRadius: '4px',
        border: '1px solid #d5dbdf'
      }}>
        <strong>Live form state (Pattern B — universal handleChange):</strong>
        <pre style={{ margin: '6px 0 0' }}>{JSON.stringify(form, null, 2)}</pre>
      </div>

      <p style={{ fontStyle: 'italic', marginTop: '12px' }}>
        💡 Same <code>handleChange</code> works for <em>both</em> text input and select!<br />
        Dropdown uses <code>.map()</code> over courses array + placeholder.
      </p>
    </div>
  );
}

// ------------------------------------------------------------
//  Main App Component — Demonstrates Everything
// ------------------------------------------------------------
export default function Day3Examples() {
  // Sample data for props
  const carInfoObject = {
    name: "Ford",
    model: "Mustang",
    color: "red",
    year: 1969
  };

  const carInfoArray = ["Ford", "Mustang"];
  const yearsArray = [1964, 1965, 1966];
  const brandVariable = "Ford";

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Day 3 — All Examples</h1>
      <hr />

      <section>
        <h2>1. Class Component with State</h2>
        <CarWithState />
      </section>
      <hr />

      <section>
        <h2>2. Class Component with Props</h2>
        <CarWithProps color="Blue" brand="Toyota" />
      </section>
      <hr />

      <section>
        <h2>3. Class Component Lifecycle (componentDidMount)</h2>
        <LifecycleDemo />
        <p><em>Wait 2 seconds for message to update...</em></p>
      </section>
      <hr />

      <section>
        <h2>4. Basic Function Component with Props</h2>
        <BasicCar brand="Ford" />
      </section>
      <hr />

      <section>
        <h2>5. Multiple Props</h2>
        <CarFullDetails brand="Ford" model="Mustang" color="red" year={1969} />
      </section>
      <hr />

      <section>
        <h2>6. Different Data Types as Props</h2>
        <DataTypesDemo
          brand={brandVariable}
          year={1969}
          years={yearsArray}
          carinfo={carInfoObject}
        />
      </section>
      <hr />

      <section>
        <h2>7. Object Props</h2>
        <CarObjectProps carinfo={carInfoObject} />
      </section>
      <hr />

      <section>
        <h2>8. Array Props</h2>
        <CarArrayProps carinfo={carInfoArray} />
      </section>
      <hr />

      <section>
        <h2>9. Props Between Components (Garage & Cars)</h2>
        <Garage />
      </section>
      <hr />

      <section>
        <h2>10. Destructuring in Function Parameters</h2>
        <DestructureParams brand="Ford" model="Mustang" color="red" year={1969} />
      </section>
      <hr />

      <section>
        <h2>11. Destructuring Inside Body</h2>
        <DestructureBody brand="Ford" model="Mustang" color="red" year={1969} />
      </section>
      <hr />

      <section>
        <h2>12. Destructuring with ...rest</h2>
        <DestructureRest brand="Ford" model="Mustang" color="red" year={1969} />
      </section>
      <hr />

      <section>
        <h2>13. Destructuring with Default Values</h2>
        <DestructureDefaults brand="Ford" />
        <p><em>Only brand provided — color defaults to "blue"</em></p>
        <DestructureDefaults />
        <p><em>No props provided — both use defaults</em></p>
      </section>
      <hr />

      <section>
        <h2>14. Props Children — Son Component</h2>
        <Son>
          <p>
            This content is written OUTSIDE the Son component,
            but appears INSIDE it via props.children!
          </p>
        </Son>
      </section>
      <hr />

      <section>
        <h2>15. Props Children — Parent → Son + Daughter</h2>
        <Parent />
      </section>
      <hr />

      <section>
        <h2>16. Props Children — Reusable Student Card (JFS Use Case)</h2>

        <StudentCard title="Student #1 — John Doe">
          <p><strong>Roll No:</strong> 101</p>
          <p><strong>Course:</strong> B.Tech CSE</p>
          <p><strong>CGPA:</strong> 9.32</p>
          <button style={{ marginTop: '10px', padding: '5px 15px' }}>View Details</button>
        </StudentCard>

        <StudentCard title="Student #2 — Jane Smith">
          <p><strong>Roll No:</strong> 102</p>
          <p><strong>Course:</strong> B.Tech IT</p>
          <p><strong>CGPA:</strong> 8.75</p>
          <button style={{ marginTop: '10px', padding: '5px 15px' }}>View Details</button>
        </StudentCard>

        <p style={{ fontStyle: 'italic' }}>
          Same StudentCard component used with different title + children content!
        </p>
      </section>
      <hr />

      <section>
        <h2>17. React Events — Basic onClick (Football)</h2>
        <Football />
      </section>
      <hr />

      <section>
        <h2>18. React Events — Passing Arguments</h2>
        <FootballWithArg />
        <p><em>Arrow function passes "Goal!" as argument.</em></p>
      </section>
      <hr />

      <section>
        <h2>19. React Events — Event Object (manual pass)</h2>
        <FootballWithEvent />
        <p><em>Shows custom argument + event.type (click)</em></p>
      </section>
      <hr />

      <section>
        <h2>20. React Events — All 3 Patterns</h2>
        <EventPatterns />
      </section>
      <hr />

      <section>
        <h2>21. React Events — JFS Use Cases (Delete + Search + Form)</h2>
        <JFSEvents />
        <p style={{ fontStyle: 'italic', marginTop: '15px' }}>
          💡 Open browser console to see logs!
        </p>
      </section>
      <hr />

      <section>
        <h2>22. Conditional Rendering — Method 1: if Statement</h2>
        <p><strong>isGoal={true}:</strong></p>
        <GoalIf isGoal={true} />
        <p><strong>isGoal={false}:</strong></p>
        <GoalIf isGoal={false} />
      </section>
      <hr />

      <section>
        <h2>23. Conditional Rendering — Method 2: &amp;&amp; Operator</h2>
        <p><strong>With brand ("Ford") — heading shows:</strong></p>
        <CarBrand brand="Ford" />
        <p><strong>Without brand — heading hidden (nothing renders):</strong></p>
        <CarBrand />
      </section>
      <hr />

      <section>
        <h2>24. Conditional Rendering — Method 3: Ternary Operator</h2>
        <p><strong>isGoal={true} (ternary):</strong></p>
        <GoalTernary isGoal={true} />
        <p><strong>isGoal={false} (ternary):</strong></p>
        <GoalTernary isGoal={false} />
      </section>
      <hr />

      <section>
        <h2>25. Conditional Rendering — JFS Student Dashboard (ALL 3 Methods)</h2>
        <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>
          Uses: if (loading early return) + &amp;&amp; (admin button, badges, warnings) + ternary (Pass/Fail, CGPA rating)
        </p>
        <StudentDashboardConditional />
      </section>
      <hr />

      <section>
        <h2>26. Conditional Rendering — Empty State vs Data (Ternary)</h2>
        <StudentListConditional />
        <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
          💡 In Examples.jsx, try changing to const students = [] to see empty state!
        </p>
      </section>
      <hr />

      <section>
        <h2>27. React Lists — Basic map() (NO KEY, for learning only)</h2>
        <MyCarsBasic />
      </section>
      <hr />

      <section>
        <h2>28. React Lists — With Unique ID Key (✅ RECOMMENDED)</h2>
        <MyCarsWithId />
      </section>
      <hr />

      <section>
        <h2>29. React Lists — Index as Key (⚠️ Last Resort)</h2>
        <MyCarsWithIndex />
      </section>
      <hr />

      <section>
        <h2>30. React Lists — JFS Student Table (REAL WORLD)</h2>
        <StudentListTable />
        <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
          💡 Click Edit/Delete buttons to see student ID passed via onClick!
        </p>
      </section>
      <hr />

      <section>
        <h2>31. React Forms — Basic Controlled Input</h2>
        <BasicControlledForm />
      </section>
      <hr />

      <section>
        <h2>32. React Forms — Initial / Pre-filled Value</h2>
        <FormWithInitialValue />
      </section>
      <hr />

      <section>
        <h2>33. React Forms — JFS Add Student (Pattern B: Object State)</h2>
        <AddStudentFormExample />
        <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
          💡 Single <code>handleChange</code> handles ALL inputs using <code>name=</code> attribute!
        </p>
      </section>
      <hr />

      <section>
        <h2>34. React Submit Forms — onSubmit on &lt;form&gt;</h2>
        <SubmitFormDemo />
      </section>
      <hr />

      <section>
        <h2>35. React Textarea — Controlled with useState</h2>
        <TextareaDemo />
      </section>
      <hr />

      <section>
        <h2>36. React Textarea — Initial Value + Pattern B (Address Form)</h2>
        <TextareaAddressDemo />
      </section>
      <hr />

      <section>
        <h2>37. React Select — Hardcoded Options Dropdown</h2>
        <SelectDemo />
      </section>
      <hr />

      <section>
        <h2>38. React Select — Dynamic Options + Placeholder + Pattern B (Real JFS)</h2>
        <SelectDynamicDemo />
      </section>
    </div>
  );
}
