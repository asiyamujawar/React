
// ============================================================
//  Day 4 — Examples: Forms (Checkbox)
// ============================================================

import { useState } from "react";

// ------------------------------------------------------------
//  1. Burger Builder — Checkbox + Text together
// ------------------------------------------------------------
function BurgerBuilder() {
  const [inputs, setInputs] = useState({});

  // Universal handleChange: works for TEXT and CHECKBOX
  const handleChange = (e) => {
    const target = e.target;
    const value  = target.type === 'checkbox' ? target.checked : target.value;
    const name   = target.name;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let fillings = '';
    if (inputs.tomato) fillings += 'tomato';
    if (inputs.onion) {
      if (inputs.tomato) fillings += ' and ';
      fillings += 'onion';
    }
    if (fillings === '') fillings = 'no fillings';

    alert(`${inputs.firstname || 'Customer'} wants a burger with ${fillings}`);
  };

  const labelStyle = { display: 'block', margin: '6px 0' };
  const checkWrapper = { marginLeft: '12px', color: '#555' };

  return (
    <div style={{ border: '1px solid #c0392b', padding: '20px', borderRadius: '8px' }}>
      <h3 style={{ color: '#c0392b', marginTop: 0 }}>
        🍔 Burger Builder
      </h3>

      <form onSubmit={handleSubmit}>
        <label style={{ ...labelStyle, fontWeight: 'bold' }}>
          My name is:&nbsp;
          <input
            type="text"
            name="firstname"
            value={inputs.firstname || ''}
            onChange={handleChange}
            placeholder="Your name"
            style={{ padding: '4px 8px' }}
          />
        </label>

        <p style={{ marginBottom: '6px', fontWeight: 'bold' }}>
          I want a burger with:
        </p>

        <div style={checkWrapper}>
          <label style={{ display: 'block', margin: '4px 0' }}>
            <input
              type="checkbox"
              name="tomato"
              checked={!!inputs.tomato}
              onChange={handleChange}
            />
            &nbsp; Tomato
          </label>
          <label style={{ display: 'block', margin: '4px 0' }}>
            <input
              type="checkbox"
              name="onion"
              checked={!!inputs.onion}
              onChange={handleChange}
            />
            &nbsp; Onion
          </label>
        </div>

        <button
          type="submit"
          style={{
            marginTop: '14px', padding: '8px 18px',
            background: '#c0392b', color: 'white', border: 'none',
            borderRadius: '4px', cursor: 'pointer'
          }}
        >
          Submit Order
        </button>
      </form>

      <p style={{ fontStyle: 'italic', marginTop: '12px' }}>
        💡 One universal <code>handleChange</code> handles text AND checkbox fields!
      </p>
    </div>
  );
}

// ------------------------------------------------------------
//  2. JFS — Active Student Status + Terms Agreement
// ------------------------------------------------------------
function AddStudentStatus() {
  const [student, setStudent] = useState({
    name: "",
    course: "B.Tech CSE",
    active: true,        // Default checked: student is Active
    agree: false         // Terms — start unchecked
  });

  // Universal handleChange with type check
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student.agree) {
      alert("❌ You must agree to the terms to save.");
      return;
    }
    const payload = {
      name: student.name,
      course: student.course,
      active: student.active
    };
    alert(
      "✅ Submitting to Spring Boot /api/students:\n" +
      JSON.stringify(payload, null, 2)
    );
  };

  const labelRow = { display: 'block', margin: '10px 0' };

  return (
    <div style={{
      border: '1px solid #2c3e50',
      padding: '20px',
      borderRadius: '8px',
      marginTop: '15px'
    }}>
      <h3 style={{ color: '#2c3e50', marginTop: 0 }}>
        🎓 JFS — Add Student (Active Status + Terms)
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={labelRow}>
          <strong>Student Name:</strong><br />
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Full name"
            style={{ padding: '6px 8px', minWidth: '280px', marginTop: '4px' }}
            required
          />
        </label>

        <label style={labelRow}>
          <strong>Course:</strong><br />
          <select
            name="course"
            value={student.course}
            onChange={handleChange}
            style={{ padding: '6px 10px', minWidth: '280px', marginTop: '4px' }}
          >
            <option value="B.Tech CSE">B.Tech CSE</option>
            <option value="B.Tech IT">B.Tech IT</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
          </select>
        </label>

        <label style={labelRow}>
          <input
            type="checkbox"
            name="active"
            checked={student.active}
            onChange={handleChange}
          />
          &nbsp; <strong>Student is Active</strong>
          <em style={{ marginLeft: '10px', color: '#666' }}>
            (Pre-checked: initial state = true)
          </em>
        </label>

        <label style={{ ...labelRow, padding: '10px', background: '#f8f9fa', borderRadius: '4px' }}>
          <input
            type="checkbox"
            name="agree"
            checked={student.agree}
            onChange={handleChange}
          />
          &nbsp; I agree to the college Terms &amp; Conditions
        </label>

        <button
          type="submit"
          style={{
            alignSelf: 'flex-start',
            padding: '8px 22px',
            marginTop: '8px',
            background: '#2c3e50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          💾 Save Student
        </button>
      </form>

      <div style={{
        marginTop: '15px',
        padding: '10px 14px',
        background: '#f4f6f7',
        border: '1px solid #d5dbdf',
        borderRadius: '4px'
      }}>
        <strong>Live state preview:</strong>
        <pre style={{ margin: '6px 0 0' }}>{JSON.stringify(student, null, 2)}</pre>
      </div>

      <p style={{ fontStyle: 'italic', marginTop: '12px' }}>
        💡 Single <code>handleChange</code> works for &lt;input&gt; text, &lt;select&gt;, and &lt;checkbox&gt;!
      </p>
    </div>
  );
}

// ------------------------------------------------------------
//  3. JFS — Multiple Hobby Checkboxes (Nested Object)
// ------------------------------------------------------------
function StudentHobbies() {
  const [form, setForm] = useState({
    name: "",
    hobbies: {
      reading: false,
      sports: false,
      coding: true,   // Pre-checked
      music: false
    }
  });

  // Hobby change — updates the nested hobbies object
  const handleHobby = (e) => {
    const { name, checked } = e.target;
    setForm(prev => ({
      ...prev,
      hobbies: { ...prev.hobbies, [name]: checked }
    }));
  };

  const handleName = (e) => {
    setForm(prev => ({ ...prev, name: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selected = Object.entries(form.hobbies)
      .filter(([, v]) => v)
      .map(([k]) => k);

    alert(
      `✅ ${form.name || "Student"}'s hobbies: ${selected.join(", ") || "(none)"}\n\n` +
      "Full payload for Spring Boot:\n" +
      JSON.stringify(form, null, 2)
    );
  };

  const hobbyList = [
    ['reading', '📚 Reading'],
    ['sports',  '🏅 Sports'],
    ['coding',  '💻 Coding'],
    ['music',   '🎵 Music']
  ];

  return (
    <div style={{
      border: '1px solid #8e44ad',
      padding: '20px',
      borderRadius: '8px',
      marginTop: '15px'
    }}>
      <h3 style={{ color: '#8e44ad', marginTop: 0 }}>
        🧩 JFS — Multiple Hobby Checkboxes (Nested Object)
      </h3>

      <form onSubmit={handleSubmit}>
        <label>
          <strong>Student name:</strong><br />
          <input
            type="text"
            value={form.name}
            onChange={handleName}
            placeholder="Your name"
            style={{ padding: '6px 8px', minWidth: '280px', marginTop: '4px' }}
            required
          />
        </label>

        <h4 style={{ marginBottom: '6px' }}>Hobbies (multiple checkboxes):</h4>
        <div style={{ marginLeft: '10px' }}>
          {hobbyList.map(([name, label]) => (
            <label key={name} style={{
              display: 'block',
              margin: '5px 0',
              padding: '4px 8px'
            }}>
              <input
                type="checkbox"
                name={name}
                checked={form.hobbies[name]}
                onChange={handleHobby}
              />
              &nbsp; {label}
            </label>
          ))}
        </div>

        <button
          type="submit"
          style={{
            padding: '8px 22px',
            marginTop: '10px',
            background: '#8e44ad',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Save Hobbies
        </button>
      </form>

      <div style={{
        marginTop: '15px',
        padding: '10px 14px',
        background: '#f4f0fa',
        border: '1px solid #d7bde2',
        borderRadius: '4px'
      }}>
        <strong>Live nested state:</strong>
        <pre style={{ margin: '6px 0 0' }}>{JSON.stringify(form, null, 2)}</pre>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
//  Main App Component — Day 4 Examples
// ------------------------------------------------------------
export default function Day4Examples() {
  return (
    <div style={{ maxWidth: "780px", margin: "0 auto", padding: "20px" }}>
      <h1>Day 4 — All Examples</h1>
      <hr />

      <section>
        <h2>1. Burger Builder Checkbox Form</h2>
        <BurgerBuilder />
      </section>
      <hr />

      <section>
        <h2>2. JFS Add Student — Active Status + Terms</h2>
        <AddStudentStatus />
      </section>
      <hr />

      <section>
        <h2>3. JFS — Multiple Hobbies (Nested Object)</h2>
        <StudentHobbies />
      </section>
    </div>
  );
}
