
// ============================================================
//  Day 4 — Examples: Forms (Checkbox)
// ============================================================

import { useState, lazy, Suspense } from "react";
import { createPortal } from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
// Note: MemoryRouter is a drop-in for BrowserRouter used here so each
// embedded router demo works as an isolated, in-page component. In your
// real app, use <BrowserRouter> at the top of App.jsx instead.
import {
  MemoryRouter as Router,
  Routes, Route, Link, NavLink,
  useParams, useNavigate, Outlet, Navigate
} from "react-router-dom";

// Import CSS Modules as OBJECTS (styles objects map original class → unique generated class)
import btnStyles from "./Button.module.css";
import cardStyles from "./Card.module.css";
import formStyles from "./StudentForm.module.css";
import globalLocalStyles from "./GlobalStyles.module.css";

// ===== SASS IMPORTS =====
// 1. Plain .scss — global side-effect import (classes applied globally via plain className strings)
import "./MyStyle.scss";
// 2. Sass Modules (.module.scss) — import as OBJECT (classes are scoped like .module.css)
import sassModStyles from "./JfsDashboard.module.scss";

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
//  4. Favorite Fruit — Radio (the lesson's example)
// ------------------------------------------------------------
function FavoriteFruit() {
  const [selectedFruit, setSelectedFruit] = useState('banana');

  const handleChange = (event) => {
    setSelectedFruit(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`🍎 Your favorite fruit is: ${selectedFruit}`);
  };

  const radioRow = { display: 'block', margin: '4px 0' };

  return (
    <div style={{
      border: '1px solid #f39c12',
      padding: '20px',
      borderRadius: '8px'
    }}>
      <h3 style={{ color: '#f39c12', marginTop: 0 }}>
        🍓 Favorite Fruit Radio Group
      </h3>

      <form onSubmit={handleSubmit}>
        <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>
          Select your favorite fruit:
        </p>

        <label style={radioRow}>
          <input
            type="radio"
            name="fruit"
            value="apple"
            checked={selectedFruit === 'apple'}
            onChange={handleChange}
          /> Apple
        </label>

        <label style={radioRow}>
          <input
            type="radio"
            name="fruit"
            value="banana"
            checked={selectedFruit === 'banana'}
            onChange={handleChange}
          /> Banana
          &nbsp;
          <em style={{ color: '#666' }}>(pre-selected)</em>
        </label>

        <label style={radioRow}>
          <input
            type="radio"
            name="fruit"
            value="cherry"
            checked={selectedFruit === 'cherry'}
            onChange={handleChange}
          /> Cherry
        </label>

        <button
          type="submit"
          style={{
            marginTop: '12px',
            padding: '7px 20px',
            background: '#f39c12',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>

        <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
          Selected:&nbsp;
          <strong style={{ color: '#f39c12' }}>{selectedFruit}</strong>
        </p>
      </form>
    </div>
  );
}

// ------------------------------------------------------------
//  5. JFS — Student Gender + Course Program (Radio Pattern B)
// ------------------------------------------------------------
function StudentFormRadio() {
  // Pattern B: single object form state — text + radio + checkbox together!
  const [form, setForm] = useState({
    studentName: "",
    gender: "F",          // Radio field: default = Female
    program: "BT-CSE",    // Radio field (program choice)
    active: true          // Checkbox field: Active status
  });

  // ★ Universal Pattern B handleChange works for TEXT + RADIO + CHECKBOX together!
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "✅ Submitting to Spring Boot /api/students:\n" +
      JSON.stringify(form, null, 2)
    );
  };

  const programs = [
    { id: "BT-CSE", name: "B.Tech Computer Science" },
    { id: "BT-IT",  name: "B.Tech Information Technology" },
    { id: "BT-ECE", name: "B.Tech Electronics" },
    { id: "BCA",    name: "Bachelor of Computer Applications" }
  ];

  const labelRow = { display: 'block', margin: '5px 0' };

  return (
    <div style={{
      border: '1px solid #2980b9',
      padding: '20px',
      borderRadius: '8px',
      marginTop: '15px'
    }}>
      <h3 style={{ color: '#2980b9', marginTop: 0 }}>
        🎓 JFS — Student Form (Text + Radios + Checkbox, Pattern B)
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          <strong>Student Name:</strong><br />
          <input
            type="text"
            name="studentName"
            value={form.studentName}
            onChange={handleChange}
            placeholder="Full name"
            style={{ padding: '6px 8px', minWidth: '280px', marginTop: '4px' }}
            required
          />
        </label>

        <fieldset style={{ border: '1px solid #bbb', padding: '10px 15px' }}>
          <legend><strong>Gender (pick exactly one):</strong></legend>
          <label style={labelRow}>
            <input
              type="radio"
              name="gender"
              value="M"
              checked={form.gender === 'M'}
              onChange={handleChange}
            /> Male
          </label>
          <label style={labelRow}>
            <input
              type="radio"
              name="gender"
              value="F"
              checked={form.gender === 'F'}
              onChange={handleChange}
            /> Female
            &nbsp;
            <em style={{ color: '#666' }}>(default)</em>
          </label>
          <label style={labelRow}>
            <input
              type="radio"
              name="gender"
              value="O"
              checked={form.gender === 'O'}
              onChange={handleChange}
            /> Other
          </label>
        </fieldset>

        <fieldset style={{ border: '1px solid #bbb', padding: '10px 15px' }}>
          <legend><strong>Program (dynamic from .map — like API data):</strong></legend>
          {programs.map(p => (
            <label key={p.id} style={labelRow}>
              <input
                type="radio"
                name="program"
                value={p.id}
                checked={form.program === p.id}
                onChange={handleChange}
              /> &nbsp; {p.name}
            </label>
          ))}
        </fieldset>

        <label style={{ padding: '8px', background: '#f8f9fa', borderRadius: '4px' }}>
          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
          />
          &nbsp; Student is currently <strong>Active</strong>
        </label>

        <button
          type="submit"
          style={{
            alignSelf: 'flex-start',
            padding: '8px 24px',
            background: '#2980b9',
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
        background: '#eaf2f8',
        border: '1px solid #a9cce3',
        borderRadius: '4px'
      }}>
        <strong>Live form state (Pattern B — one handleChange for everything!):</strong>
        <pre style={{ margin: '6px 0 0' }}>{JSON.stringify(form, null, 2)}</pre>
      </div>

      <p style={{ fontStyle: 'italic', marginTop: '12px' }}>
        💡 Single universal <code>handleChange</code> works for text, both radio groups, AND checkbox!
      </p>
    </div>
  );
}

// ------------------------------------------------------------
//  6. Basic Portal Hello World — Simplest example
// ------------------------------------------------------------
function PortalHelloWorld() {
  return (
    <div style={{
      border: '1px solid #27ae60',
      padding: '20px',
      borderRadius: '8px'
    }}>
      <h3 style={{ color: '#27ae60', marginTop: 0 }}>
        🚪 Basic Portal — Hello World
      </h3>
      <p>
        The heading below is rendered inside a{' '}
        <code>#portal-root</code> div (sibling of <code>#root</code>),
        not inside this card's DOM tree — even though it's a React child here!
      </p>
      <p style={{ fontStyle: 'italic', color: '#555' }}>
        💡 Open browser DevTools → Elements tab → look for{' '}
        <code>&lt;div id="portal-root"&gt;</code> to verify the teleport.
      </p>

      {createPortal(
        <h2 style={{
          background: '#27ae60',
          color: 'white',
          padding: '10px 16px',
          borderRadius: '6px',
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          margin: 0,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          ✅ Hello from Portal! (teleported 🚀)
        </h2>,
        document.getElementById('portal-root')
      )}
    </div>
  );
}

// ------------------------------------------------------------
//  7. JFS — Delete Student Confirmation Modal (via Portal)
// ------------------------------------------------------------
function DeleteStudentModal({ isOpen, onClose, onConfirm, student }) {
  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.55)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9998
  };
  const dialogStyle = {
    background: 'white',
    padding: '24px 28px',
    borderRadius: '10px',
    minWidth: '400px',
    maxWidth: '90%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  };

  return createPortal(
    <div style={overlayStyle} onClick={onClose}>
      <div style={dialogStyle} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ color: '#c0392b', marginTop: 0, marginBottom: '12px' }}>
          ⚠️ Delete Student Confirmation
        </h3>
        <p style={{ fontSize: '15px', lineHeight: 1.5 }}>
          Are you sure you want to delete{' '}
          <strong>{student ? student.name : 'this student'}</strong>
          &nbsp;(ID: <code>{student ? student.id : '---'}</code>)?
        </p>
        <p style={{ color: '#666', fontStyle: 'italic', fontSize: '14px' }}>
          This will send a <code>DELETE /api/students/{student ? student.id : '{id}'}</code> request
          to the Spring Boot backend and cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '22px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 20px',
              border: '1px solid #bbb',
              borderRadius: '5px',
              background: 'white',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '8px 20px',
              border: 'none',
              borderRadius: '5px',
              background: '#c0392b',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            🗑 Yes, Delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal-root')
  );
}

function DeleteStudentDemo() {
  const [students] = useState([
    { id: 101, name: 'Aarav Sharma', course: 'B.Tech CSE', active: true },
    { id: 102, name: 'Priya Patel',   course: 'B.Tech IT',  active: true },
    { id: 103, name: 'Rahul Verma',    course: 'BCA',        active: false },
    { id: 104, name: 'Neha Singh',    course: 'MCA',        active: true }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const onAskDelete = (s) => { setToDelete(s); setModalOpen(true); };

  const onConfirmDelete = () => {
    alert(
      `✅ Portal modal confirmed!\n\n` +
      `Sending DELETE /api/students/${toDelete.id}\n` +
      `to Spring Boot backend…\n\n` +
      `Deleted student: ${toDelete.name}`
    );
    setModalOpen(false);
  };

  return (
    <div style={{
      border: '1px solid #c0392b',
      padding: '20px',
      borderRadius: '8px',
      marginTop: '15px'
    }}>
      <h3 style={{ color: '#c0392b', marginTop: 0 }}>
        🎓 JFS — Delete Student (Modal via Portal)
      </h3>
      <p style={{ color: '#555', marginTop: 0 }}>
        The outer card below has <code>overflow: hidden</code> (a common cause of
        clipped modals). Thanks to Portal, the confirmation dialog escapes to{' '}
        <code>#portal-root</code> and renders full-screen perfectly.
      </p>

      {/* Card with overflow:hidden — classic trap for non-portal modals! */}
      <div style={{
        overflow: 'hidden',
        border: '1px solid #ddd',
        borderRadius: '6px'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#2c3e50', color: 'white' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '10px 12px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '10px 12px', textAlign: 'left' }}>Course</th>
              <th style={{ padding: '10px 12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '10px 12px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{s.id}</td>
                <td style={{ padding: '8px 12px' }}>{s.name}</td>
                <td style={{ padding: '8px 12px' }}>{s.course}</td>
                <td style={{ padding: '8px 12px' }}>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: '12px',
                    background: s.active ? '#d5f5e3' : '#fdecea',
                    color: s.active ? '#1e8449' : '#922b21',
                    fontSize: '13px',
                    fontWeight: 600
                  }}>
                    {s.active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </td>
                <td style={{ padding: '8px 12px' }}>
                  <button
                    onClick={() => onAskDelete(s)}
                    style={{
                      background: '#c0392b',
                      color: 'white',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal is React child of this component → but DOM goes to portal-root */}
      <DeleteStudentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={onConfirmDelete}
        student={toDelete}
      />
    </div>
  );
}

// ------------------------------------------------------------
//  8. Toast Notification (Portal) + JFS Save Demo
// ------------------------------------------------------------
function Toast({ messages }) {
  if (!messages || messages.length === 0) return null;

  return createPortal(
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {messages.map((msg) => {
        const colors = {
          success: { bg: '#27ae60', icon: '✅' },
          error:   { bg: '#c0392b', icon: '❌' },
          info:    { bg: '#2980b9', icon: 'ℹ️' },
          warning: { bg: '#f39c12', icon: '⚠️' }
        };
        const c = colors[msg.type] || colors.info;
        return (
          <div
            key={msg.id}
            style={{
              background: c.bg,
              color: 'white',
              padding: '12px 18px',
              borderRadius: '6px',
              minWidth: '260px',
              boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'slideIn 0.3s ease-out'
            }}
          >
            <span style={{ fontSize: '18px' }}>{c.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{msg.title}</div>
              {msg.body && <div style={{ fontSize: '13px', opacity: 0.95 }}>{msg.body}</div>}
            </div>
          </div>
        );
      })}
    </div>,
    document.getElementById('portal-root')
  );
}

function SaveStudentToastDemo() {
  const [toasts, setToasts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    course: 'B.Tech CSE',
    gender: 'M',
    active: true
  });

  const pushToast = (type, title, body) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, type, title, body }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      pushToast('error', 'Validation Failed', 'Student name is required.');
      return;
    }
    // Simulate POST to Spring Boot /api/students
    pushToast(
      'success',
      'Student Saved!',
      `POST /api/students → ${form.name} (${form.course})`
    );
    setForm(prev => ({ ...prev, name: '' }));
  };

  const labelRow = { display: 'block', margin: '8px 0' };

  return (
    <div style={{
      border: '1px solid #8e44ad',
      padding: '20px',
      borderRadius: '8px',
      marginTop: '15px'
    }}>
      <h3 style={{ color: '#8e44ad', marginTop: 0 }}>
        🔔 JFS — Save Student + Toast Notifications (Portal)
      </h3>
      <p style={{ color: '#555', marginTop: 0 }}>
        All toasts (success / error / info) are rendered through a Portal to{' '}
        <code>#portal-root</code>, guaranteeing they always appear on top.
      </p>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        maxWidth: '420px'
      }}>
        <label style={labelRow}>
          <strong>Student Name:</strong><br />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            style={{ padding: '7px 10px', minWidth: '300px', marginTop: '4px', borderRadius: '4px', border: '1px solid #bbb' }}
          />
        </label>

        <label style={labelRow}>
          <strong>Course:</strong><br />
          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            style={{ padding: '7px 10px', minWidth: '300px', marginTop: '4px', borderRadius: '4px', border: '1px solid #bbb' }}
          >
            <option value="B.Tech CSE">B.Tech CSE</option>
            <option value="B.Tech IT">B.Tech IT</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
          </select>
        </label>

        <fieldset style={{ border: '1px solid #ccc', padding: '8px 14px', margin: '4px 0' }}>
          <legend><strong>Gender:</strong></legend>
          <label style={{ marginRight: '14px' }}>
            <input type="radio" name="gender" value="M"
              checked={form.gender === 'M'} onChange={handleChange} /> Male
          </label>
          <label style={{ marginRight: '14px' }}>
            <input type="radio" name="gender" value="F"
              checked={form.gender === 'F'} onChange={handleChange} /> Female
          </label>
          <label>
            <input type="radio" name="gender" value="O"
              checked={form.gender === 'O'} onChange={handleChange} /> Other
          </label>
        </fieldset>

        <label style={{ ...labelRow, padding: '6px 10px', background: '#f4f0fa', borderRadius: '4px' }}>
          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
          />
          &nbsp; Student is <strong>Active</strong>
        </label>

        <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
          <button
            type="submit"
            style={{
              padding: '9px 22px',
              background: '#8e44ad',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            💾 Save Student
          </button>
          <button
            type="button"
            onClick={() => pushToast('info', 'Hint', 'Fill the name field before saving!')}
            style={{
              padding: '9px 16px',
              background: '#ecf0f1',
              border: '1px solid #bbb',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ℹ️ Show Info Toast
          </button>
          <button
            type="button"
            onClick={() => pushToast('warning', 'Warning', 'Demo warning toast.')}
            style={{
              padding: '9px 16px',
              background: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ⚠️ Test Warning
          </button>
        </div>
      </form>

      {/* Portal-rendered toasts */}
      <Toast messages={toasts} />

      <div style={{
        marginTop: '16px',
        padding: '10px 14px',
        background: '#f4f0fa',
        border: '1px solid #d7bde2',
        borderRadius: '5px'
      }}>
        <strong>Live form state (Pattern B):</strong>
        <pre style={{ margin: '6px 0 0', fontSize: '13px' }}>
          {JSON.stringify(form, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
//  9. Basic lazy() + Suspense — Simplest working example
// ------------------------------------------------------------
const LazyAboutPage = lazy(() => import("./LazyAboutPage"));

// Fallback UI used while lazy chunks download
function BasicLoader({ label }) {
  return (
    <div style={{
      padding: "50px 20px",
      textAlign: "center",
      color: "#555",
      background: "#f4f6f7",
      border: "2px dashed #bbb",
      borderRadius: "8px",
      margin: "12px 0"
    }}>
      <div style={{
        width: "44px", height: "44px",
        border: "5px solid #ddd",
        borderTop: "5px solid #2980b9",
        borderRadius: "50%",
        margin: "0 auto 14px",
        animation: "spin 0.9s linear infinite"
      }} />
      <div style={{ fontSize: "16px" }}>
        ⏳ <strong>{label || "Loading component…"}</strong>
      </div>
      <div style={{ fontSize: "13px", fontStyle: "italic", marginTop: "6px" }}>
        (Downloading separate JS chunk via <code>React.lazy()</code>)
      </div>
    </div>
  );
}

// Small About page component (default export — compatible with React.lazy())
// Inline as a file would be. We'll use the separate file pattern but also
// provide a fallback in-demo lazy for demonstration.
function LazyAboutDemo() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div style={{
      border: "1px solid #2980b9",
      padding: "20px",
      borderRadius: "8px"
    }}>
      <h3 style={{ color: "#2980b9", marginTop: 0 }}>
        🐣 Example 9 — Basic lazy() + Suspense
      </h3>
      <p style={{ color: "#555" }}>
        Click the button below. The About component code is
        <strong> NOT loaded until you click</strong>. Only then will
        <code> React.lazy()</code> trigger a dynamic <code>import()</code>.
        Notice the <code>&lt;Suspense&gt;</code> fallback in between!
      </p>

      <button
        onClick={() => setShowAbout(s => !s)}
        style={{
          padding: "10px 22px",
          background: showAbout ? "#7f8c8d" : "#2980b9",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: 600
        }}
      >
        {showAbout ? "❌ Hide About Page" : "🔍 Load & Show About Page"}
      </button>

      {/* Single Suspense wraps the single lazy component */}
      <Suspense fallback={<BasicLoader label="Loading About page…" />}>
        {showAbout && <LazyAboutPage />}
      </Suspense>
    </div>
  );
}

// Separate tiny About page — simulates what LazyAboutPage.jsx would export
// (also serves as a demo of the default export rule)
// We additionally write a physical file below, but to keep the example
// self-contained we use an inline lazy Promise here via a fallback:
// (In practice, the import("./LazyAboutPage") below is the real pattern.)

// ------------------------------------------------------------
//  10. JFS — Tab Navigation with 3x Lazy Pages (Dashboard / Settings / Admin)
// ------------------------------------------------------------
const LazyDashboardPage  = lazy(() => import("./LazyDashboard"));
const LazySettingsPage   = lazy(() => import("./LazyStudentSettings"));
const LazyAdminPage      = lazy(() => import("./LazyAdminPanel"));

function TabsLazyDemo() {
  const [tab, setTab] = useState("home"); // "home" | "dashboard" | "settings" | "admin"

  const tabBtn = (id, label, icon, color) => ({
    padding: "10px 16px",
    background: tab === id ? color : "white",
    color: tab === id ? "white" : "#333",
    border: `1px solid ${color}`,
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: tab === id ? 700 : 500,
    fontSize: "14px"
  });

  const TABS = [
    ["home",      "🏠 Home",     "#555"],
    ["dashboard", "📊 Dashboard", "#2980b9"],
    ["settings",  "⚙️ Settings",  "#8e44ad"],
    ["admin",     "🛡️ Admin",     "#c0392b"]
  ];

  return (
    <div style={{
      border: "1px solid #2c3e50",
      padding: "20px",
      borderRadius: "8px",
      marginTop: "15px"
    }}>
      <h3 style={{ color: "#2c3e50", marginTop: 0 }}>
        🎓 Example 10 — JFS Portal Tabs (3x lazy-loaded pages)
      </h3>
      <p style={{ color: "#555", marginTop: "-6px" }}>
        Dashboard · Settings · Admin are each loaded in
        <strong> their own JS chunk</strong>, only when you first click the tab.
        Subsequent clicks reuse the already-loaded component (no re-download).
      </p>

      {/* Tab bar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", margin: "16px 0" }}>
        {TABS.map(([id, label, color]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={tabBtn(id, label, color)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content area wrapped in ONE Suspense boundary */}
      <div style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "22px",
        background: "#fcfcfc",
        minHeight: "260px"
      }}>
        <Suspense fallback={<BasicLoader label={`Loading ${tab} page…`} />}>
          {tab === "home"      && <HomeTab />}
          {tab === "dashboard" && <LazyDashboardPage />}
          {tab === "settings"  && <LazySettingsPage />}
          {tab === "admin"     && <LazyAdminPage />}
        </Suspense>
      </div>

      <p style={{ fontStyle: "italic", color: "#555", marginTop: "14px" }}>
        💡 Open <strong>DevTools → Network tab → JS filter</strong>, then
        click each tab for the first time to observe the separate chunk
        downloads (e.g. <code>LazyDashboard.jsx</code>) happening on-demand.
      </p>
    </div>
  );
}

// Lightweight non-lazy home tab (always in the main bundle)
function HomeTab() {
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>🏠 Student Portal — Home</h2>
      <p style={{ color: "#555", lineHeight: 1.6 }}>
        Welcome to the JFS Student Portal! This <code>Home</code> tab is part
        of the main bundle (it's always shown first), so it is NOT lazy-loaded.
      </p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
        gap: "12px",
        marginTop: "18px"
      }}>
        <div style={{ padding: "14px", borderRadius: "7px", background: "#eaf2f8" }}>
          <div style={{ fontSize: "28px" }}>📊</div>
          <strong>Dashboard</strong>
          <div style={{ fontSize: "13px", color: "#555", marginTop: "4px" }}>
            Charts · stats · trends — <em>lazy</em>
          </div>
        </div>
        <div style={{ padding: "14px", borderRadius: "7px", background: "#f4f0fa" }}>
          <div style={{ fontSize: "28px" }}>⚙️</div>
          <strong>Settings</strong>
          <div style={{ fontSize: "13px", color: "#555", marginTop: "4px" }}>
            Profile · privacy · alerts — <em>lazy</em>
          </div>
        </div>
        <div style={{ padding: "14px", borderRadius: "7px", background: "#fdecea" }}>
          <div style={{ fontSize: "28px" }}>🛡️</div>
          <strong>Admin Panel</strong>
          <div style={{ fontSize: "13px", color: "#555", marginTop: "4px" }}>
            User mgmt · roles — <em>lazy + admin only</em>
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
//  11. JFS — Role-based Lazy Loading (ADMIN vs STUDENT)
// ------------------------------------------------------------
function RoleBasedLazyDemo() {
  const [role, setRole] = useState("STUDENT"); // STUDENT | FACULTY | ADMIN

  const LazyAdminPanelNow = lazy(() => import("./LazyAdminPanel"));

  return (
    <div style={{
      border: "1px solid #c0392b",
      padding: "20px",
      borderRadius: "8px",
      marginTop: "15px"
    }}>
      <h3 style={{ color: "#c0392b", marginTop: 0 }}>
        🔐 Example 11 — Role-based lazy loading (JFS security pattern)
      </h3>
      <p style={{ color: "#555", marginTop: "-6px" }}>
        The <strong>Admin Panel</strong> component is <strong>only downloaded
        if the current user has role = ADMIN</strong>.
        Regular <em>STUDENT</em> and <em>FACULTY</em> users never waste bandwidth
        on admin code — a common pattern in real Spring Boot + React apps.
      </p>

      {/* Role switcher */}
      <div style={{
        padding: "12px 14px",
        background: "#f8f9fa",
        borderRadius: "6px",
        border: "1px solid #ddd",
        margin: "14px 0",
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        alignItems: "center"
      }}>
        <span style={{ fontWeight: 700 }}>🧑 Simulated user role:</span>
        {[
          ["STUDENT", "#27ae60"],
          ["FACULTY", "#2980b9"],
          ["ADMIN",   "#c0392b"]
        ].map(([r, color]) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            style={{
              padding: "7px 14px",
              border: `1px solid ${color}`,
              background: role === r ? color : "white",
              color: role === r ? "white" : color,
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            {role === r && "✅ "}{r}
          </button>
        ))}
      </div>

      {/* Conditional: only ADMIN causes Admin chunk to download */}
      <Suspense fallback={<BasicLoader label="Loading Admin Panel (first time for ADMIN)…" />}>
        {role === "ADMIN" ? (
          <LazyAdminPanelNow />
        ) : (
          <div style={{
            padding: "28px 22px",
            border: "2px dashed #bbb",
            borderRadius: "8px",
            textAlign: "center",
            color: "#555",
            background: "#fafafa"
          }}>
            <div style={{ fontSize: "46px", marginBottom: "6px" }}>🚫</div>
            <div style={{ fontSize: "18px", fontWeight: 700 }}>
              Access Denied — {role} Area
            </div>
            <p style={{ marginTop: "8px" }}>
              This page is for <strong>ADMIN</strong> users only.
              Because your role is <strong>{role}</strong>, the
              <code> LazyAdminPanel</code> component was
              <strong> never requested or downloaded</strong>.
              <br />
              <em style={{ fontSize: "13px" }}>(Switch to ADMIN above to trigger the lazy download.)</em>
            </p>
          </div>
        )}
      </Suspense>
    </div>
  );
}

// ------------------------------------------------------------
//  12. CSS Modules — Button variants (composes + multi-class via template)
// ------------------------------------------------------------
function ButtonsCssModules() {
  return (
    <div style={{
      border: "1px solid #2980b9",
      padding: "20px",
      borderRadius: "8px"
    }}>
      <h3 style={{ color: "#2980b9", marginTop: 0 }}>
        🔘 Example 12 — Buttons via CSS Modules (composes inheritance)
      </h3>
      <p style={{ color: "#555", marginTop: "-6px" }}>
        All 4 button variants use <code>composes: base</code> in
        <code> Button.module.css</code> so each variant inherits
        padding/border-radius/hover effects — no CSS duplication.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", margin: "16px 0" }}>
        {/* Single class — uses composes internally */}
        <button className={btnStyles.primary}>Primary (composes: base)</button>
        <button className={btnStyles.success}>Success</button>
        <button className={btnStyles.danger}>Danger</button>
        <button className={btnStyles.secondary}>Secondary</button>
      </div>

      <hr style={{ margin: "16px 0", border: "none", borderTop: "1px dashed #bbb" }} />

      <p style={{ color: "#555" }}>
        <strong>Size modifiers via template literal 2-class composition</strong>
        (variant <em>composes</em>, then <code>.lg / .sm</code> stacked on top in JSX):
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
        <button className={`${btnStyles.primary} ${btnStyles.lg}`}>🐘 Large Primary</button>
        <button className={`${btnStyles.success} ${btnStyles.sm}`}>🐜 Small Success</button>
        <button className={`${btnStyles.danger}  ${btnStyles.sm}`}>🐜 Small Danger</button>
      </div>

      <p style={{ fontStyle: "italic", color: "#555", marginTop: "16px", fontSize: "13px" }}>
        💡 In DevTools → Elements: inspect any button above. The class name will NOT be
        plain <code>.primary</code> — it will look something like
        <code> _primary_1abc2_3</code>, <strong>scoped and unique to this file only</strong>.
      </p>
    </div>
  );
}

// ------------------------------------------------------------
//  13. CSS Modules — JFS Dashboard KPI Cards + Feature Card (composes variants)
// ------------------------------------------------------------
function CardsCssModules() {
  return (
    <div style={{
      border: "1px solid #2c3e50",
      padding: "20px",
      borderRadius: "8px",
      marginTop: "15px"
    }}>
      <h3 style={{ color: "#2c3e50", marginTop: 0 }}>
        📊 Example 13 — JFS Dashboard KPI Cards (CSS Modules composes)
      </h3>
      <p style={{ color: "#555", marginTop: "-6px" }}>
        <code>.kpiGreen / .kpiPurple / .kpiRed</code> all use
        <code> composes: kpi;</code> (which itself <code>composes: card</code>)
        to build a 3-level class inheritance without duplicating a single property.
      </p>

      {/* KPI Row — 4 cards with color variants via composes */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
        gap: "14px",
        margin: "18px 0"
      }}>
        <div className={cardStyles.kpi}>
          <div className={cardStyles.kpiLabel}>🎓 Total Students</div>
          <div className={cardStyles.kpiValue}>1,248</div>
          <div className={`${cardStyles.kpiDelta} ${cardStyles.up}`}>▲ +12% vs last month</div>
        </div>
        <div className={cardStyles.kpiGreen}>
          <div className={cardStyles.kpiLabel}>📚 Courses Offered</div>
          <div className={cardStyles.kpiValue}>42</div>
          <div className={`${cardStyles.kpiDelta} ${cardStyles.up}`}>▲ +3 new programs</div>
        </div>
        <div className={cardStyles.kpiPurple}>
          <div className={cardStyles.kpiLabel}>👨‍🏫 Faculty</div>
          <div className={cardStyles.kpiValue}>86</div>
          <div className={`${cardStyles.kpiDelta} ${cardStyles.up}`}>▲ +2 this quarter</div>
        </div>
        <div className={cardStyles.kpiRed}>
          <div className={cardStyles.kpiLabel}>💰 Pending Fees</div>
          <div className={cardStyles.kpiValue}>₹4.2L</div>
          <div className={`${cardStyles.kpiDelta} ${cardStyles.down}`}>▼ −8% improvement</div>
        </div>
      </div>

      {/* Regular feature card (uses .card + .cardHeader + .cardFooter directly) */}
      <div className={cardStyles.card}>
        <div className={cardStyles.cardHeader}>
          <h4 className={cardStyles.cardTitle}>🎯 Semester Registration Open</h4>
          <span className={cardStyles.cardBadge}>ACTIVE</span>
        </div>
        <div className={cardStyles.cardBody}>
          Registration for the Fall 2025 semester is now open for all B.Tech, BCA and
          MCA students. The deadline to submit course preferences is
          <strong> August 15, 2025</strong>. Late submissions will incur a
          <strong> ₹500</strong> late fee. Please visit the student portal to proceed.
        </div>
        <div className={cardStyles.cardFooter}>
          <button className={`${btnStyles.secondary} ${btnStyles.sm}`}>Dismiss</button>
          <button className={`${btnStyles.primary} ${btnStyles.sm}`}>Go to Registration →</button>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
//  14. CSS Modules — JFS Add Student Form (fully scoped Pattern B)
// ------------------------------------------------------------
function FormCssModules() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "B.Tech CSE",
    year: "1st Year",
    address: "",
    active: true,
    hostel: false,
    agree: false
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agree) {
      alert("⚠️ You must agree to the terms before submitting.");
      return;
    }
    if (!form.name.trim() || !form.email.trim()) {
      alert("⚠️ Name and Email are required.");
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className={formStyles.wrapper} style={{ marginTop: "15px" }}>
      <h2 className={formStyles.heading}>
        🎓 Example 14 — JFS Add Student Form (100% CSS Modules)
      </h2>
      <p className={formStyles.subheading}>
        Every class here comes from <code>StudentForm.module.css</code>. The form
        uses Pattern B universal handleChange for text, select, textarea, and checkboxes.
      </p>

      {saved && (
        <div className="module-global-success">
          ✅ Student saved! Sent to Spring Boot POST /api/students
        </div>
      )}

      <form className={formStyles.form} onSubmit={handleSubmit}>
        <div className={formStyles.field}>
          <label className={`${formStyles.label} ${formStyles.required}`}>
            Full Name
          </label>
          <input
            className={formStyles.input}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Aarav Sharma"
          />
        </div>

        <div className={formStyles.field}>
          <label className={`${formStyles.label} ${formStyles.required}`}>
            Email
          </label>
          <input
            className={formStyles.input}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@college.edu"
          />
        </div>

        <div className={formStyles.field}>
          <label className={formStyles.label}>Phone Number</label>
          <input
            className={formStyles.input}
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
          />
        </div>

        <div className={formStyles.field}>
          <label className={formStyles.label}>Course</label>
          <select
            className={formStyles.select}
            name="course"
            value={form.course}
            onChange={handleChange}
          >
            <option>B.Tech CSE</option>
            <option>B.Tech IT</option>
            <option>B.Tech ECE</option>
            <option>BCA</option>
            <option>MCA</option>
          </select>
        </div>

        <div className={formStyles.field}>
          <label className={formStyles.label}>Year / Semester</label>
          <select
            className={formStyles.select}
            name="year"
            value={form.year}
            onChange={handleChange}
          >
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>
        </div>

        <div className={formStyles.field}>
          <label className={formStyles.label}>
            Address <span className={formStyles.hint}>(optional)</span>
          </label>
          <textarea
            className={formStyles.textarea}
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Street, city, PIN…"
          />
        </div>

        <label className={formStyles.checkboxField}>
          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
          />
          <span className={formStyles.checkboxLabel}>
            Student is currently <strong>Active</strong>
          </span>
        </label>

        <label className={formStyles.checkboxField}>
          <input
            type="checkbox"
            name="hostel"
            checked={form.hostel}
            onChange={handleChange}
          />
          <span className={formStyles.checkboxLabel}>
            Requires <strong>Hostel</strong> accommodation
          </span>
        </label>

        <label className={formStyles.checkboxField}>
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
          />
          <span className={formStyles.checkboxLabel}>
            I agree to the <strong>college terms</strong> and fee structure
          </span>
        </label>

        <div className={formStyles.actions}>
          <button type="submit" className={formStyles.submit}>
            💾 Save Student
          </button>
          <button
            type="reset"
            className={formStyles.reset}
            onClick={() => {
              setSaved(false);
              setForm({
                name: "", email: "", phone: "",
                course: "B.Tech CSE", year: "1st Year", address: "",
                active: true, hostel: false, agree: false
              });
            }}
          >
            Reset Form
          </button>
        </div>

        <pre className={formStyles.statePreview}>
          <strong>Live form state (Pattern B):</strong>{"\n"}
          {JSON.stringify(form, null, 2)}
        </pre>
      </form>
    </div>
  );
}

// ------------------------------------------------------------
//  15. CSS Modules — Global (:global) + Local classes combined
// ------------------------------------------------------------
function GlobalLocalCssModules() {
  return (
    <div style={{
      border: "1px solid #8e44ad",
      padding: "20px",
      borderRadius: "8px",
      marginTop: "15px"
    }}>
      <h3 style={{ color: "#8e44ad", marginTop: 0 }}>
        🌍 Example 15 — Global <code>:global(…)</code> + Local scoped classes together
      </h3>

      <p style={{ color: "#555" }}>
        <code>GlobalStyles.module.css</code> contains BOTH:
        <strong style={{ color: "#2980b9" }}> :global(.module-global-*)</strong> (global,
        plain string usage) and <strong>normal local classes</strong> (object usage
        via `globalLocalStyles.___`).
      </p>

      {/* GLOBAL classes — used via plain string (no object lookup!) */}
      <h2 className="module-global-title">
        This heading uses :global(.module-global-title) → plain className string
      </h2>

      <div className="module-global-box">
        <strong>📘 Global class box (.module-global-box)</strong><br />
        This box uses the global <code>.module-global-box</code> class declared with
        <code> :global(.module-global-box)</code>. Even though it comes from a
        <code> .module.css</code> file, the class name is NOT hashed — it's a
        <strong> real global class</strong>. Any component on the page can use it
        by writing the plain string.
      </div>

      {/* LOCAL classes — used via object lookup styles.____ */}
      <div className={globalLocalStyles.scopedNote}>
        <strong>📍 This yellow note uses a LOCAL class</strong>
        (<code>{globalLocalStyles.scopedNote}</code>).
        <br />
        Notice how the real class name above is <em>hashed/unique</em> (not simply
        <code> .scopedNote</code>) — that's CSS Modules scoping at work! Other
        files can safely have their own <code>.scopedNote</code> without collision.
      </div>

      <div className={globalLocalStyles.tagRow}>
        <span className={globalLocalStyles.tag}>Plain Local Tag 1</span>
        <span className={globalLocalStyles.tag}>Plain Local Tag 2</span>
        <span className={globalLocalStyles.techTag}>composes Local</span>
        <span className={globalLocalStyles.techTag}>CSS MODULES</span>
        <span className={globalLocalStyles.techTag}>REACT</span>
      </div>

      {/* Quick comparison card */}
      <div className="module-global-box" style={{ marginTop: "20px" }}>
        <strong>📝 Quick Cheat:</strong>
        <ul style={{ margin: "8px 0 0 20px", lineHeight: 1.7 }}>
          <li>
            <strong>Local class</strong> (default):
            <code> .foo {'{ }'}</code> in CSS → <code>className={'{styles.foo}'}</code>
          </li>
          <li>
            <strong>Global class</strong>:
            <code> :global(.bar) {'{ }'}</code> in CSS → <code>className="bar"</code> (string!)
          </li>
          <li>
            <strong>2+ local classes</strong>: template literal
            <code> className={`{'${styles.a} ${styles.b}'}`}</code>
          </li>
          <li>
            <strong>DRY class inheritance</strong>:
            <code> .variant {'{ composes: base; }'}</code> in CSS → one class in JSX
          </li>
        </ul>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
//  16. CSS-in-JS — Basic styled.<tag> + hover/nesting
// ------------------------------------------------------------

// Basic styled.h1, styled.p, styled.div
const ScMyHeader = styled.h1`
  padding: 14px 22px;
  background: linear-gradient(135deg, #2980b9, #3498db);
  color: white;
  border-radius: 8px;
  margin: 0 0 14px;
  box-shadow: 0 4px 14px rgba(41, 128, 185, 0.25);
  font-size: 22px;
`;

const ScBox = styled.div`
  background: #ffffff;
  border: 1px solid #d5dbdf;
  padding: 18px 20px;
  border-radius: 8px;
  line-height: 1.6;
`;

const ScAccentP = styled.p`
  color: #2c3e50;
  margin: 0 0 10px;

  & strong {        /* nested & → targets strong inside this p */
    color: #8e44ad;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

function BasicStyled() {
  return (
    <div style={{
      border: "1px solid #2980b9",
      padding: "20px",
      borderRadius: "8px"
    }}>
      <h3 style={{ color: "#2980b9", marginTop: 0 }}>
        🐣 Example 16 — Basic <code>styled.h1</code>, <code>styled.div</code>, <code>&</code>-nesting
      </h3>
      <p style={{ color: "#555", marginTop: "-6px" }}>
        Every styled component is created via <code>styled.tagname`…`</code> (template literal with real CSS).
        Class names are auto-generated and scoped.
      </p>

      <ScMyHeader>✨ Hello from styled-components! Scoped & unique CSS classes auto-applied</ScMyHeader>

      <ScBox>
        <ScAccentP>
          <strong>100% real CSS syntax</strong> in the template literal: semicolons, dashes, units, comments all work.
        </ScAccentP>
        <ScAccentP>
          <strong>&amp;-nesting</strong> gives us <code>&amp; {'{ }'}</code> for pseudo-classes,
          <code> &amp;:hover</code>, <code>&amp; &gt; child</code>, and more.
        </ScAccentP>
        <ScAccentP>
          💡 <strong>DevTools → Elements</strong>: inspect the blue header above. The real class name is
          something like <code>sc-bSOFjJ</code> (auto-generated unique, NO conflicts possible).
        </ScAccentP>
      </ScBox>
    </div>
  );
}

// ------------------------------------------------------------
//  17. CSS-in-JS — Props-driven dynamic styles (button btntype, sizes)
// ------------------------------------------------------------
const ScDynamicBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: ${({ size }) => (size === "lg" ? "14px 30px" : size === "sm" ? "6px 14px" : "10px 22px")};
  font-size: ${({ size }) => (size === "lg" ? "16px" : size === "sm" ? "12px" : "14px")};
  border: none;
  border-radius: ${({ size }) => (size === "lg" ? "8px" : size === "sm" ? "4px" : "6px")};
  font-weight: 700;
  color: white;
  cursor: pointer;
  background-color: ${({ btntype }) =>
    btntype === "primary"   ? "#2980b9" :
    btntype === "success"   ? "#27ae60" :
    btntype === "danger"    ? "#c0392b" :
    btntype === "warning"   ? "#f39c12" : "#7f8c8d"};  /* default = secondary gray */
  transition: all 0.15s ease;

  &:hover {
    filter: brightness(0.9);
    transform: translateY(-1px);
    box-shadow: 0 5px 14px rgba(0,0,0,0.15);
  }

  &:active { transform: translateY(0); }

  &:disabled {
    background: #bdc3c7 !important;
    cursor: not-allowed;
    transform: none;
    filter: none;
    box-shadow: none;
  }
`;

function PropsStyledDemo() {
  return (
    <div style={{
      border: "1px solid #27ae60",
      padding: "20px",
      borderRadius: "8px",
      marginTop: "15px"
    }}>
      <h3 style={{ color: "#27ae60", marginTop: 0 }}>
        🎛️ Example 17 — Dynamic styles via <code>props</code> (ONE Button → 4×5 variants!)
      </h3>
      <p style={{ color: "#555", marginTop: "-6px" }}>
        Arrow functions <code>{'${({ btntype, size }) => … }'}</code> compute CSS from component props at render.
        No separate class variants — just pass props.
      </p>

      <h4 style={{ margin: "18px 0 10px", color: "#2c3e50" }}>Same size (default), 4 btntypes:</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <ScDynamicBtn btntype="primary">Primary</ScDynamicBtn>
        <ScDynamicBtn btntype="success">Success</ScDynamicBtn>
        <ScDynamicBtn btntype="danger">Danger</ScDynamicBtn>
        <ScDynamicBtn btntype="warning">Warning</ScDynamicBtn>
        <ScDynamicBtn>Default (secondary)</ScDynamicBtn>
        <ScDynamicBtn btntype="primary" disabled>Disabled</ScDynamicBtn>
      </div>

      <h4 style={{ margin: "22px 0 10px", color: "#2c3e50" }}>Same btntype, 3 sizes:</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
        <ScDynamicBtn btntype="primary" size="sm">🐜 Small Primary</ScDynamicBtn>
        <ScDynamicBtn btntype="primary">Medium Primary (default)</ScDynamicBtn>
        <ScDynamicBtn btntype="primary" size="lg">🐘 Large Primary</ScDynamicBtn>
      </div>

      <p style={{
        marginTop: "20px", padding: "10px 14px",
        background: "#f4f0fa", border: "1px dashed #8e44ad",
        borderRadius: "6px", fontSize: "13.5px", color: "#5b2c6f"
      }}>
        💾 In a JFS app you'd use this pattern to switch button colors by student status,
        or to size dashboard KPI tile cards by a <code>variant="large/small"</code> prop.
      </p>
    </div>
  );
}

// ------------------------------------------------------------
//  18. CSS-in-JS — Extending (styled(Component)) + JFS Student Card w/ props
// ------------------------------------------------------------

// Base styled component: shared padding/shape
const ScBaseCard = styled.div`
  background: white;
  padding: 18px 20px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.07);
  border-top: 4px solid #bbb;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  }
`;

// 2 color variants: EXTEND base card, only change the accent border color
const ScCseCard = styled(ScBaseCard)`
  border-top-color: #2980b9;
  background: linear-gradient(135deg, #eaf2f8 0%, #ffffff 40%);
`;

const ScMcaCard = styled(ScBaseCard)`
  border-top-color: #27ae60;
  background: linear-gradient(135deg, #d5f5e3 0%, #ffffff 40%);
`;

const ScBcaCard = styled(ScBaseCard)`
  border-top-color: #8e44ad;
  background: linear-gradient(135deg, #f4ecf7 0%, #ffffff 40%);
`;

// Smaller styled pieces inside a card
const ScCardName = styled.h3`
  margin: 0 0 6px;
  color: #2c3e50;
  font-size: 18px;
`;

const ScCardMeta = styled.div`
  font-size: 13px;
  color: #555;
  margin: 3px 0;
  font-family: "Segoe UI", Arial, sans-serif;

  & span.label {
    display: inline-block;
    min-width: 76px;
    color: #2c3e50;
    font-weight: 700;
  }
`;

const ScBadge = styled.span`
  display: inline-block;
  padding: 3px 10px;
  margin-top: 10px;
  font-size: 11px;
  font-weight: 800;
  border-radius: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: ${({ status }) => (status === "Active" ? "#d5f5e3" : "#fdecea")};
  color: ${({ status }) => (status === "Active" ? "#1e8449" : "#922b21")};
`;

// Smart card wrapper: picks variant based on student.course prop!
function JfsStudentCard({ student }) {
  const Card =
    student.course === "B.Tech CSE" ? ScCseCard :
    student.course === "MCA"        ? ScMcaCard :
    student.course === "BCA"        ? ScBcaCard : ScBaseCard;
  return (
    <Card>
      <ScCardName>{student.name}</ScCardName>
      <ScCardMeta><span className="label">Roll #:</span>{student.roll}</ScCardMeta>
      <ScCardMeta><span className="label">Course:</span>{student.course}</ScCardMeta>
      <ScCardMeta><span className="label">Email:</span>{student.email}</ScCardMeta>
      <ScCardMeta><span className="label">CGPA:</span>{student.cgpa}</ScCardMeta>
      <ScBadge status={student.status}>● {student.status}</ScBadge>
    </Card>
  );
}

function ExtendsStyledDemo() {
  const students = [
    { roll: 231, name: "Ananya Gupta",   course: "B.Tech CSE", email: "ananya@college.edu",  cgpa: "9.4", status: "Active"    },
    { roll: 415, name: "Karan Mehta",    course: "BCA",        email: "karan@college.edu",   cgpa: "8.1", status: "Active"    },
    { roll: 603, name: "Sneha Iyer",     course: "MCA",        email: "sneha@college.edu",   cgpa: "8.9", status: "Active"    },
    { roll: 112, name: "Rohit Joshi",    course: "B.Tech CSE", email: "rohit@college.edu",   cgpa: "7.2", status: "Suspended" }
  ];

  return (
    <div style={{
      border: "1px solid #8e44ad",
      padding: "20px",
      borderRadius: "8px",
      marginTop: "15px"
    }}>
      <h3 style={{ color: "#8e44ad", marginTop: 0 }}>
        🎓 Example 18 — JFS Student Cards via <code>styled(Base)</code> + Course-colored variants
      </h3>
      <p style={{ color: "#555", marginTop: "-6px" }}>
        <code>ScCseCard = styled(ScBaseCard)</code> inherits all base card rules, only
        overriding <code>border-top-color</code> &amp; gradient background (DRY!). Card variant
        chosen dynamically from <code>student.course</code>.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "14px",
        marginTop: "18px"
      }}>
        {students.map(s => <JfsStudentCard key={s.roll} student={s} />)}
      </div>
    </div>
  );
}

// ------------------------------------------------------------
//  19. CSS-in-JS — createGlobalStyle + utility classes
// ------------------------------------------------------------

// Global styles that apply to the WHOLE DEMO AREA (scoped to mount point below)
const ScDemoGlobal = createGlobalStyle`
  .cj-tip {
    padding: 10px 14px;
    margin: 10px 0;
    border-radius: 5px;
    background: #fff9e6;
    border: 1px dashed #f1c40f;
    color: #7d6608;
    font-size: 13px;
  }
  .cj-highlight {
    background: #d4edda !important;
    color: #155724;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 3px;
  }
  h2.cj-heading {
    border-bottom: 3px solid #c0392b;
    padding-bottom: 6px;
    color: #922b21;
  }
`;

const ScGridWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  margin: 16px 0;
`;

const ScTile = styled.div`
  padding: 16px 18px;
  background: #ffffff;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
  color: #2c3e50;

  .icon { font-size: 26px; display:block; margin-bottom: 6px; }
  .title { font-weight: 700; color: #2980b9; font-size: 16px; margin-bottom: 4px; }
`;

function GlobalStyledDemo() {
  return (
    <div style={{
      border: "1px solid #c0392b",
      padding: "20px",
      borderRadius: "8px",
      marginTop: "15px"
    }}>
      {/* Render createGlobalStyle ONCE at the top of the subtree it should style */}
      <ScDemoGlobal />

      <h3 style={{ color: "#c0392b", marginTop: 0 }}>
        🌍 Example 19 — <code>{'createGlobalStyle`…`'}</code> — headings &amp; utility classes
      </h3>
      <p style={{ color: "#555", marginTop: "-6px" }}>
        <code>{'<ScDemoGlobal />'}</code> injects plain global CSS rules into the document
        (not scoped). Used here to create utility classes like <code>.cj-tip</code>.
      </p>

      <h2 className="cj-heading">🎯 JFS Global Utilities (Applied Everywhere Inside This Demo)</h2>

      <div className="cj-tip">
        💡 <strong>Tip:</strong> In a real React app, render <code>{'<GlobalStyle />'}</code> exactly
        <strong> once</strong> at the <strong>root of your App</strong> so headings, resets, and utility
        classes apply everywhere. Do not re-render it per-page.
      </div>

      <p>
        Below the word <span className="cj-highlight">"correct"</span> uses the global utility
        class <code>.cj-highlight</code> — no styled-component needed, just a plain class string,
        because it was declared via <code>{'createGlobalStyle'}</code>.
        This is exactly how you'd include Bootstrap/FontAwesome classes alongside styled-components.
      </p>

      <ScGridWrap>
        <ScTile>
          <span className="icon">📦</span>
          <div className="title">Install</div>
          <div><code>npm i styled-components</code> — adds the CSS-in-JS runtime.</div>
        </ScTile>
        <ScTile>
          <span className="icon">🧩</span>
          <div className="title">styled.tag</div>
          <div>Components <span className="cj-highlight">correctly</span> scoped to unique classes.</div>
        </ScTile>
        <ScTile>
          <span className="icon">🎛️</span>
          <div className="title">Props → CSS</div>
          <div>Arrow-function interpolation computes CSS at render time.</div>
        </ScTile>
        <ScTile>
          <span className="icon">🌳</span>
          <div className="title">styled(X)</div>
          <div>Extend any existing styled component. DRY variants.</div>
        </ScTile>
      </ScGridWrap>
    </div>
  );
}

// ------------------------------------------------------------
//  20. React Router — Basic 3-page router (Home / About / Contact)
// ------------------------------------------------------------

// 3 Page components (views) — same concept as creating src/pages/*.jsx files
function RRHome() {
  return (
    <div style={{ padding: "18px 20px", background: "#eaf2f8", borderRadius: "8px" }}>
      <h2 style={{ marginTop: 0, color: "#2980b9" }}>🏠 Home Page</h2>
      <p style={{ color: "#2c3e50", lineHeight: 1.6 }}>
        Welcome to the JFS Student Portal! Use the nav links above to move between pages.
        Notice how there is <strong>no full page reload</strong> — React Router swaps content instantly
        via the browser's History API while updating the internal MemoryRouter URL.
      </p>
      <ul style={{ lineHeight: 1.9 }}>
        <li>✅ Fast initial load with Vite</li>
        <li>✅ Spring Boot backend integration coming in Day 5+</li>
        <li>✅ Student CRUD, attendance, fees, exams — all as separate routes</li>
      </ul>
    </div>
  );
}
function RRAbout() {
  return (
    <div style={{ padding: "18px 20px", background: "#f4ecf7", borderRadius: "8px" }}>
      <h2 style={{ marginTop: 0, color: "#8e44ad" }}>ℹ️ About Page</h2>
      <p style={{ color: "#2c3e50", lineHeight: 1.6 }}>
        <strong>Est. 1985</strong> — Our JFS college trains B.Tech, BCA and MCA students with
        real Java Full Stack projects. Contact us for admissions on the Contact page.
      </p>
    </div>
  );
}
function RRContact() {
  return (
    <div style={{ padding: "18px 20px", background: "#d5f5e3", borderRadius: "8px" }}>
      <h2 style={{ marginTop: 0, color: "#1e8449" }}>📞 Contact Page</h2>
      <p style={{ color: "#2c3e50", lineHeight: 1.8 }}>
        <strong>Phone:</strong> +91 98765 43210<br />
        <strong>Email:</strong> admissions@college.edu<br />
        <strong>Address:</strong> 42 University Avenue, Bengaluru — 560001
      </p>
    </div>
  );
}

function BasicRouterDemo() {
  return (
    <Router>
      <div style={{
        border: "1px solid #2980b9",
        padding: "20px",
        borderRadius: "8px"
      }}>
        <h3 style={{ color: "#2980b9", marginTop: 0 }}>
          🧭 Example 20 — Basic 3-Page React Router (Home / About / Contact)
        </h3>
        <p style={{ color: "#555", marginTop: "-6px" }}>
          Uses <code>{'<BrowserRouter> → <nav><Link></Link></nav> → <Routes><Route></Route></Routes>'}</code> pattern.
          (MemoryRouter used inside this isolated demo — same API.)
        </p>

        {/* NAVBAR: clickable links (no reload!) */}
        <nav style={{
          display: "flex", flexWrap: "wrap", gap: "10px",
          padding: "12px 14px", background: "#2c3e50",
          borderRadius: "6px", margin: "14px 0"
        }}>
          <Link to="/"        style={navLinkStyle}>🏠 Home</Link>
          <Link to="/about"   style={navLinkStyle}>ℹ️ About</Link>
          <Link to="/contact" style={navLinkStyle}>📞 Contact</Link>
        </nav>

        {/* ROUTES: pick single page to render based on URL */}
        <Routes>
          <Route path="/"        element={<RRHome />} />
          <Route path="/about"   element={<RRAbout />} />
          <Route path="/contact" element={<RRContact />} />
        </Routes>
      </div>
    </Router>
  );
}

// Shared inline nav link style (avoid external CSS for demo)
const navLinkStyle = {
  color: "#ecf0f1",
  textDecoration: "none",
  padding: "7px 13px",
  borderRadius: "5px",
  fontWeight: 600,
  transition: "background 0.15s ease",
  background: "rgba(255,255,255,0.05)"
};

// ------------------------------------------------------------
//  21. JFS — Student Router with useParams + useNavigate + 404 catch-all
// ------------------------------------------------------------

const STUDENTS_DB = [
  { id: 1, roll: "CS-001", name: "Ananya Gupta", course: "B.Tech CSE", cgpa: "9.4", year: "3rd Year", active: true,
    email: "ananya@college.edu", phone: "+91 98765 11111" },
  { id: 2, roll: "CS-015", name: "Karan Mehta",  course: "BCA",        cgpa: "8.1", year: "2nd Year", active: true,
    email: "karan@college.edu",  phone: "+91 98765 22222" },
  { id: 3, roll: "MC-003", name: "Sneha Iyer",   course: "MCA",        cgpa: "8.9", year: "1st Year", active: true,
    email: "sneha@college.edu",  phone: "+91 98765 33333" },
  { id: 4, roll: "CS-042", name: "Rohit Joshi",  course: "B.Tech CSE", cgpa: "7.2", year: "4th Year", active: false,
    email: "rohit@college.edu",  phone: "+91 98765 44444" },
  { id: 5, roll: "IT-011", name: "Priya Raman",  course: "B.Tech IT",  cgpa: "9.1", year: "3rd Year", active: true,
    email: "priya@college.edu",  phone: "+91 98765 55555" }
];

// Page 1: Student list (renders at /students)
function RRStudentList() {
  const navigate = useNavigate();
  return (
    <div>
      <h2 style={{ marginTop: 0, color: "#2c3e50" }}>🎓 Student List</h2>
      <p style={{ color: "#555", marginTop: "-8px" }}>
        Click any row to view details — demonstrates <code>{'<Link to={`/students/${id}`}>'}</code>.
        Or click <strong>Add New</strong> for <code>useNavigate()</code> redirect.
      </p>

      <div style={{ display: "flex", justifyContent: "flex-end", margin: "0 0 10px" }}>
        <button
          onClick={() => navigate("/students/new")}   // ← programmatic navigation
          className={`${btnStyles.success} ${btnStyles.sm}`}
          style={{ textDecoration: "none" }}
        >
          ➕ Add New Student
        </button>
      </div>

      <table style={{
        width: "100%", borderCollapse: "collapse",
        background: "white", borderRadius: "6px", overflow: "hidden"
      }}>
        <thead>
          <tr style={{ background: "#2c3e50", color: "white" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>Roll</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Course</th>
            <th style={{ padding: "10px", textAlign: "left" }}>CGPA</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
            <th style={{ padding: "10px", textAlign: "left" }}></th>
          </tr>
        </thead>
        <tbody>
          {STUDENTS_DB.map(s => (
            <tr
              key={s.id}
              style={{ borderBottom: "1px solid #eee", cursor: "pointer" }}
              onClick={() => navigate(`/students/${s.id}`)}
            >
              <td style={{ padding: "9px 10px", fontFamily: "monospace" }}>{s.roll}</td>
              <td style={{ padding: "9px 10px", fontWeight: 600 }}>{s.name}</td>
              <td style={{ padding: "9px 10px" }}>{s.course}</td>
              <td style={{ padding: "9px 10px" }}>{s.cgpa}</td>
              <td style={{ padding: "9px 10px" }}>
                <span style={{
                  padding: "3px 10px", borderRadius: "12px",
                  background: s.active ? "#d5f5e3" : "#fdecea",
                  color: s.active ? "#1e8449" : "#922b21",
                  fontWeight: 700, fontSize: "11px"
                }}>{s.active ? "ACTIVE" : "SUSPENDED"}</span>
              </td>
              <td style={{ padding: "9px 10px" }}>
                <Link
                  to={`/students/${s.id}`}
                  style={{ color: "#2980b9", fontWeight: 600, textDecoration: "none" }}
                  onClick={(e) => e.stopPropagation()}
                >View →</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Page 2: Student Details /:id (reads URL param via useParams)
function RRStudentDetail() {
  const { id } = useParams();          // ← read URL param
  const navigate = useNavigate();       // ← programmatic go-back
  const student = STUDENTS_DB.find(s => s.id === Number(id));

  if (!student) {
    return (
      <div style={{ padding: "18px", background: "#fdecea", borderRadius: "8px", color: "#922b21" }}>
        <strong>❌ No student with ID {id} found.</strong>
        <button
          onClick={() => navigate("/students")}
          style={{ marginLeft: "10px", padding: "5px 12px", borderRadius: "5px",
                   border: "none", background: "#922b21", color: "white",
                   fontWeight: 600, cursor: "pointer" }}
        >← Back to List</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", background: "#eaf2f8", borderRadius: "8px" }}>
      <h2 style={{ marginTop: 0, color: "#2980b9" }}>
        📄 {student.name} — Student Details
      </h2>
      <p style={{ color: "#555", marginTop: "-6px", fontStyle: "italic" }}>
        <code>useParams()</code> extracted <strong>id = {id}</strong> from the URL
        <code> /students/{id}</code>.
      </p>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "12px", marginTop: "16px"
      }}>
        {[
          ["Roll Number",   student.roll],
          ["Course",        student.course],
          ["CGPA",          student.cgpa],
          ["Year",          student.year],
          ["Email",         student.email],
          ["Phone",         student.phone]
        ].map(([k, v]) => (
          <div key={k} style={{
            padding: "12px 14px", background: "white", borderRadius: "6px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
          }}>
            <div style={{ fontSize: "11.5px", color: "#7f8c8d",
                          textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>
              {k}
            </div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#2c3e50", marginTop: "3px" }}>
              {v}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button onClick={() => navigate(-1)}
                className={`${btnStyles.secondary} ${btnStyles.sm}`}>← Back (navigate(-1))</button>
        <button onClick={() => navigate("/students", { replace: true })}
                className={`${btnStyles.primary} ${btnStyles.sm}`}>🏠 Student List (replace)</button>
      </div>
    </div>
  );
}

// Page 3: "Add Student" fake form page (uses useNavigate redirect on submit)
function RRAddStudent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", course: "B.Tech CSE", cgpa: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) { alert("Please enter a student name"); return; }
    // In real app: POST /api/students → Spring Boot
    alert(`✅ Would POST new student: ${JSON.stringify(form)}\nThen redirect to /students list.`);
    navigate("/students");   // ← redirect after save
  };

  return (
    <div style={{ padding: "20px", background: "#f4f0fa", borderRadius: "8px" }}>
      <h2 style={{ marginTop: 0, color: "#8e44ad" }}>➕ Add New Student</h2>
      <p style={{ color: "#555", marginTop: "-6px" }}>
        Submit → calls <code>navigate('/students')</code> to jump back to the list page.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontWeight: 600, color: "#2c3e50", fontSize: "13px" }}>Full Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange}
                 style={{ padding: "8px 10px", borderRadius: "5px", border: "1px solid #bbb" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontWeight: 600, color: "#2c3e50", fontSize: "13px" }}>Course:</label>
          <select name="course" value={form.course} onChange={handleChange}
                  style={{ padding: "8px 10px", borderRadius: "5px", border: "1px solid #bbb" }}>
            <option>B.Tech CSE</option><option>B.Tech IT</option>
            <option>BCA</option><option>MCA</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontWeight: 600, color: "#2c3e50", fontSize: "13px" }}>CGPA:</label>
          <input type="number" step="0.01" min="0" max="10"
                 name="cgpa" value={form.cgpa} onChange={handleChange}
                 style={{ padding: "8px 10px", borderRadius: "5px", border: "1px solid #bbb" }} />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
          <button type="submit" className={`${btnStyles.success}`}>💾 Save & Redirect</button>
          <button type="button" className={`${btnStyles.secondary}`}
                  onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

// Page 4: 404 wildcard page
function RRNotFound() {
  return (
    <div style={{ padding: "26px 22px", background: "#fff3cd",
                  border: "1px dashed #d39e00", borderRadius: "8px", textAlign: "center" }}>
      <div style={{ fontSize: "54px" }}>🔍❓</div>
      <h2 style={{ margin: "6px 0 4px", color: "#856404" }}>404 — Page Not Found</h2>
      <p style={{ color: "#664d03", lineHeight: 1.7 }}>
        The URL you followed doesn't match any route.
        (This is the <code>path="*"</code> catch-all route — always last in the list.)
      </p>
    </div>
  );
}

function JfsRouterDemo() {
  return (
    <Router>
      <div style={{
        border: "1px solid #27ae60",
        padding: "20px",
        borderRadius: "8px",
        marginTop: "15px"
      }}>
        <h3 style={{ color: "#27ae60", marginTop: 0 }}>
          🎓 Example 21 — JFS Student Router: useParams, useNavigate, 404 catch-all
        </h3>
        <p style={{ color: "#555", marginTop: "-6px" }}>
          Demonstrates 5 critical real-world Router features: list → detail link, URL <code>:id</code> param via
          <code> useParams()</code>, programmatic redirect via <code>useNavigate()</code>, form-submit save-then-redirect,
          and the <code>path="*"</code> 404 wildcard route.
        </p>

        <nav style={{
          display: "flex", flexWrap: "wrap", gap: "10px",
          padding: "12px 14px", background: "#1e8449",
          borderRadius: "6px", margin: "14px 0"
        }}>
          <NavLink to="/" end             style={navLinkStyle2}>🏠 Home</NavLink>
          <NavLink to="/students"        style={navLinkStyle2}>🎓 Student List</NavLink>
          <NavLink to="/students/new"    style={navLinkStyle2}>➕ Add Student</NavLink>
          <NavLink to="/broken-link"     style={navLinkStyle2}>⚠️ Broken (404)</NavLink>
        </nav>

        <Routes>
          <Route path="/"                 element={<RRHome />} />
          <Route path="/students"        element={<RRStudentList />} />
          <Route path="/students/new"    element={<RRAddStudent />} />
          <Route path="/students/:id"    element={<RRStudentDetail />} />
          <Route path="*"                 element={<RRNotFound />} />  {/* must be LAST */}
        </Routes>
      </div>
    </Router>
  );
}

const navLinkStyle2 = ({ isActive }) => ({
  color: "#ffffff",
  textDecoration: "none",
  padding: "7px 13px",
  borderRadius: "5px",
  fontWeight: 600,
  background: isActive ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.06)",
  boxShadow: isActive ? "inset 0 -2px 0 rgba(255,255,255,0.55)" : "none"
});

// ------------------------------------------------------------
//  22. React Router — NavLink auto-active styling + Protected Auth Route
// ------------------------------------------------------------

// A tiny auth context-like helper via localStorage (mimics JFS JWT login)
const isAuthedFn = () => Boolean(localStorage.getItem("rr_demo_jwt"));

function RRLoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState("admin@college.edu");
  const [pwd,  setPwd]  = useState("1234");

  const submit = (e) => {
    e.preventDefault();
    // In real app — POST /api/auth/login → Spring Boot returns JWT token
    localStorage.setItem("rr_demo_jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo.abc123");
    localStorage.setItem("rr_demo_user", user);
    navigate("/dash", { replace: true });    // go to dashboard, replace history so Back → /login again
  };

  return (
    <div style={{
      maxWidth: "380px", margin: "10px auto", padding: "22px 26px",
      background: "white", borderRadius: "10px",
      boxShadow: "0 4px 18px rgba(41,128,185,0.12)"
    }}>
      <h2 style={{ marginTop: 0, color: "#2980b9" }}>🔐 Login (Protected Route Demo)</h2>
      <p style={{ color: "#555", marginTop: "-8px", fontSize: "13px" }}>
        Demo credentials are prefilled. Click Login → a fake JWT token is stored in localStorage →
        <code> navigate('/dash', {'{'} replace: true {'}'})</code>.
      </p>
      <form onSubmit={submit} style={{ display: "grid", gap: "12px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ fontWeight: 700, color: "#2c3e50", fontSize: "13px" }}>Email:</span>
          <input type="email" value={user} onChange={(e) => setUser(e.target.value)}
                 style={{ padding: "8px 10px", borderRadius: "5px", border: "1px solid #bbb" }} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ fontWeight: 700, color: "#2c3e50", fontSize: "13px" }}>Password:</span>
          <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)}
                 style={{ padding: "8px 10px", borderRadius: "5px", border: "1px solid #bbb" }} />
        </label>
        <button type="submit" className={btnStyles.primary}>Login</button>
      </form>
    </div>
  );
}

// RequireAuth wrapper: shows children only if logged in; else <Navigate to="/login" replace />
function RequireAuth({ children }) {
  if (!isAuthedFn()) return <Navigate to="/login" replace />;   // not logged in → redirect
  return children;
}

// Protected page content (only renders for logged-in users)
function RRDashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem("rr_demo_user") || "User";

  const logout = () => {
    localStorage.removeItem("rr_demo_jwt");
    localStorage.removeItem("rr_demo_user");
    navigate("/login", { replace: true });
  };

  return (
    <div style={{ padding: "20px 22px", background: "#eaf2f8", borderRadius: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
        <h2 style={{ margin: 0, color: "#2980b9" }}>🛡️ Protected Dashboard</h2>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ color: "#2c3e50", fontWeight: 600 }}>👋 Welcome, <code>{user}</code></span>
          <button className={`${btnStyles.danger} ${btnStyles.sm}`} onClick={logout}>Logout</button>
        </div>
      </div>
      <p style={{ color: "#2c3e50", lineHeight: 1.7 }}>
        This page is wrapped in <code>{'<RequireAuth>'}</code> → if you try to open
        <code> /dash</code> without a token, it redirects straight to <code>/login</code>.
        Now that you're authenticated, you'd normally see:
      </p>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "12px", marginTop: "14px"
      }}>
        {[
          ["🎓", "Students", 1248, "#2980b9"],
          ["📚", "Courses",  42,   "#27ae60"],
          ["👨‍🏫", "Faculty", 86,   "#8e44ad"],
          ["💰", "Fees",   "₹4.2L","#c0392b"]
        ].map(([ic, k, v, c]) => (
          <div key={k} style={{
            padding: "14px", background: "white", borderRadius: "7px",
            borderLeft: `5px solid ${c}`
          }}>
            <div style={{ fontSize: "22px" }}>{ic}</div>
            <div style={{ fontSize: "12px", color: "#777", marginTop: "2px" }}>{k}</div>
            <div style={{ fontSize: "24px", fontWeight: 800, color: c }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NavLinkProtectedDemo() {
  return (
    <Router>
      <div style={{
        border: "1px solid #c0392b",
        padding: "20px",
        borderRadius: "8px",
        marginTop: "15px"
      }}>
        <h3 style={{ color: "#c0392b", marginTop: 0 }}>
          🔐 Example 22 — <code>{'<NavLink>'}</code> auto-active highlighting + Protected Routes
        </h3>
        <p style={{ color: "#555", marginTop: "-6px" }}>
          <strong>NavLink</strong> applies a bold/underline style when <code>to=</code> matches
          the URL. The Dashboard route uses <code>{'<RequireAuth><Dashboard/></RequireAuth>'}</code> —
          try clicking "Dashboard" when not logged in to see the redirect in action.
        </p>

        <nav style={{
          display: "flex", flexWrap: "wrap", gap: "10px",
          padding: "12px 14px", background: "#922b21",
          borderRadius: "6px", margin: "14px 0"
        }}>
          <NavLink to="/" end  style={navLinkStyle3}>🏠 Public Home</NavLink>
          <NavLink to="/about" style={navLinkStyle3}>ℹ️ Public About</NavLink>
          <NavLink to="/dash"  style={navLinkStyle3}>🛡️ Dashboard (Protected)</NavLink>
          <NavLink to="/login" style={navLinkStyle3}>🔐 Login</NavLink>
        </nav>

        <Routes>
          <Route path="/"       element={<RRHome />} />
          <Route path="/about"  element={<RRAbout />} />
          <Route path="/login"  element={<RRLoginPage />} />
          <Route path="/dash"   element={<RequireAuth><RRDashboard /></RequireAuth>} />
          <Route path="*"       element={<RRNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

const navLinkStyle3 = ({ isActive }) => ({
  color: "#ffffff",
  textDecoration: isActive ? "underline" : "none",
  textUnderlineOffset: "5px",
  textDecorationThickness: "2px",
  padding: "7px 13px",
  borderRadius: "5px",
  fontWeight: isActive ? 700 : 500,
  background: isActive ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.06)"
});

// ------------------------------------------------------------
//  23. Plain Sass (.scss global) — $variables, sass:color, @mixin, nesting
// ------------------------------------------------------------
function PlainSassDemo() {
  return (
    <div style={{
      border: "1px solid #2980b9",
      padding: "20px",
      borderRadius: "8px"
    }}>
      <h3 style={{ color: "#2980b9", marginTop: 0 }}>
        🎨 Example 23 — Plain `.scss` Global Sass (variables, sass:color, @mixin, &amp;-nesting)
      </h3>
      <p style={{ color: "#555", marginTop: "-6px" }}>
        Styles defined in <code>MyStyle.scss</code>, imported via plain side-effect
        <code> import "./MyStyle.scss"</code>. Classes are GLOBAL (applied via plain string className).
      </p>

      {/* sass:color.adjust() — 3 shades of $primary */}
      <div style={{
        padding: "14px", background: "#f8f9fa", borderRadius: "6px",
        margin: "14px 0", border: "1px dashed #bbb"
      }}>
        <strong style={{ color: "#555" }}>3 headings, 1 <code>$primary</code> base color via <code>color.adjust(±20% lightness)</code>:</strong>
        <h1 className="sass-h1">.sass-h1 — original blue $primary (#2980b9)</h1>
        <h2 className="sass-h2">.sass-h2 — darkened 20% (saturated, navy)</h2>
        <h3 className="sass-h3">.sass-h3 — lightened 20% (sky blue)</h3>
      </div>

      {/* @mixin sass-btn + @include variants */}
      <h4 style={{ color: "#2c3e50", margin: "18px 0 10px" }}>
        4 Buttons from 1 shared <code>@mixin sass-btn($bg)</code> + <code>&amp;:hover</code> nesting:
      </h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <button className="sass-btn-primary">Primary ($primary)</button>
        <button className="sass-btn-success">Success ($success)</button>
        <button className="sass-btn-danger">Danger ($danger)</button>
        <button className="sass-btn-warning">Warning ($warning)</button>
        <button className="sass-btn-primary" disabled>Primary disabled</button>
      </div>

      {/* Nested sass-card with BEM __header/__body/__footer */}
      <h4 style={{ color: "#2c3e50", margin: "22px 0 8px" }}>
        Nested <code>.sass-card</code> (BEM <code>&amp;__header / &amp;__footer</code> + hover transform):
      </h4>
      <div className="sass-card">
        <div className="sass-card__header">
          <h3>🎓 Semester Registration — Fall 2025</h3>
          <span className="sass-badge">OPEN</span>
        </div>
        <p>
          Registration is open for all B.Tech, BCA and MCA students.
          The deadline to submit preferences is <strong>August 15, 2025</strong>.
          Late submissions will incur a ₹500 late fee.
        </p>
        <p>
          Log in to the JFS Student Portal to complete the process.
          Contact your department coordinator for any assistance.
        </p>
        <div className="sass-card__footer">
          <button className="sass-btn-warning">Remind me later</button>
          <button className="sass-btn-primary">Go to Registration →</button>
        </div>
      </div>

      <p style={{
        marginTop: "14px", padding: "10px 14px",
        background: "#eaf2f8", border: "1px dashed #2980b9",
        borderRadius: "6px", fontSize: "13.5px", color: "#1f6391"
      }}>
        💡 <strong>DevTools Tip:</strong> inspect any button or heading above → you will
        see <strong>real plain CSS classes</strong> like <code>sass-btn-primary</code>
        (no hash!). Build-time Vite compiled the `.scss` into pure CSS.
      </p>
    </div>
  );
}

// ------------------------------------------------------------
//  24. Sass MODULES (.module.scss) — Full JFS Dashboard KPI grid
// ------------------------------------------------------------
function SassModulesDemo() {
  const kpis = [
    { cls: "kpiBlue",   label: "🎓 Total Students", value: "1,248", delta: "▲ +12% vs last month", dir: "up"   },
    { cls: "kpiGreen",  label: "📚 Courses Offered", value: "42",    delta: "▲ +3 new programs",      dir: "up"   },
    { cls: "kpiPurple", label: "👨‍🏫 Faculty",         value: "86",    delta: "▲ +2 this quarter",       dir: "up"   },
    { cls: "kpiRed",    label: "💰 Pending Fees",   value: "₹4.2L", delta: "▼ −8% improvement",        dir: "down" },
    { cls: "kpiOrange", label: "🏆 Placements '25",  value: "92%",   delta: "▲ +5% YoY",               dir: "up"   }
  ];

  return (
    <div style={{
      border: "1px solid #8e44ad",
      padding: "20px",
      borderRadius: "8px",
      marginTop: "15px"
    }}>
      <h3 style={{ color: "#8e44ad", marginTop: 0 }}>
        🏗️ Example 24 — Sass Modules <code>.module.scss</code>: JFS Dashboard (5 KPI tiles + announcement)
      </h3>
      <p style={{ color: "#555", marginTop: "-6px" }}>
        Imported as <code>import sassModStyles from './JfsDashboard.module.scss'</code> — classes are
        SCOPED/hash-unique AND get Sass features (<code>$variables</code>, <code>@mixin kpi-tile</code>,
        <code> sass:color</code>, <code>&amp;-nesting</code>, <code>--accent</code> CSS var for the value color).
      </p>

      <div className={sassModStyles.wrapper}>
        <h2 className={sassModStyles.heading}>📊 JFS College — Admin Dashboard</h2>
        <div className={sassModStyles.subheading}>
          Powered by <code>@mixin kpi-tile($accent)</code> — 1 mixin, 5 color variants, zero duplicated CSS
        </div>

        <div className={sassModStyles.grid}>
          {kpis.map(k => (
            <div key={k.label} className={sassModStyles[k.cls]}>
              <div className={sassModStyles.label}>{k.label}</div>
              <div className={sassModStyles.value}>{k.value}</div>
              <div className={`${sassModStyles.delta} ${sassModStyles[k.dir]}`}>{k.delta}</div>
            </div>
          ))}
        </div>

        <div className={sassModStyles.announce}>
          <div className={sassModStyles.announce__header}>
            <h3 className={sassModStyles.announce__title}>🚨 Important — Mid-Sem Exam Submission Deadline</h3>
            <span className={sassModStyles.announce__badge}>Due Aug 10</span>
          </div>
          <div className={sassModStyles.announce__body}>
            All faculty members must finalize mid-semester examination question papers and
            submit them through the department portal by <strong>August 10, 2025</strong>.
            Papers submitted after the deadline will be charged a ₹1,000 processing fee.
            Contact the Examination Controller's office for any clarifications.
          </div>
          <div className={sassModStyles.announce__footer}>
            <button className="sass-btn-secondary sass-btn-warning">Download Guidelines</button>
            <button className="sass-btn-primary">Open Portal →</button>
          </div>
        </div>
      </div>

      <p style={{
        marginTop: "14px", padding: "10px 14px",
        background: "#f4ecf7", border: "1px dashed #8e44ad",
        borderRadius: "6px", fontSize: "13.5px", color: "#6c3483"
      }}>
        🧪 <strong>Class scoping proof:</strong> inspect the green <code>Courses Offered</code> KPI tile.
        The real class name looks like <code>_kpiGreen_abc123_5</code>, <em>not</em> plain
        <code> .kpiGreen</code>. That's CSS Modules scoping + Sass combined — the best of both!
      </p>
    </div>
  );
}

// ------------------------------------------------------------
//  Main App Component — Day 4 Examples
// ------------------------------------------------------------
export default function Day4Examples() {
  return (
    <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "20px" }}>
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
      <hr />

      <section>
        <h2>4. Radio — Favorite Fruit</h2>
        <FavoriteFruit />
      </section>
      <hr />

      <section>
        <h2>5. JFS — Student Form (Text + 2 Radio Groups + Checkbox, Pattern B)</h2>
        <StudentFormRadio />
      </section>
      <hr />

      <section>
        <h2>6. 🚪 Basic Portal — Hello World</h2>
        <PortalHelloWorld />
      </section>
      <hr />

      <section>
        <h2>7. 🎓 JFS — Delete Student Confirmation (Modal via Portal)</h2>
        <DeleteStudentDemo />
      </section>
      <hr />

      <section>
        <h2>8. 🔔 JFS — Save Student + Toast Notifications (Portal)</h2>
        <SaveStudentToastDemo />
      </section>
      <hr />

      <section>
        <h2>9. 🐣 Basic lazy() + Suspense (Click to load About page)</h2>
        <LazyAboutDemo />
      </section>
      <hr />

      <section>
        <h2>10. 🎓 JFS Portal Tabs (3x lazy pages: Dashboard / Settings / Admin)</h2>
        <TabsLazyDemo />
      </section>
      <hr />

      <section>
        <h2>11. 🔐 Role-based Lazy Loading (ADMIN vs STUDENT/FACULTY)</h2>
        <RoleBasedLazyDemo />
      </section>
      <hr />

      <section>
        <h2>12. 🔘 Buttons via CSS Modules (composes inheritance + template-literal sizes)</h2>
        <ButtonsCssModules />
      </section>
      <hr />

      <section>
        <h2>13. 📊 JFS Dashboard KPI Cards (CSS Modules composes variants)</h2>
        <CardsCssModules />
      </section>
      <hr />

      <section>
        <h2>14. 🎓 JFS Add Student Form (fully scoped + Pattern B state)</h2>
        <FormCssModules />
      </section>
      <hr />

      <section>
        <h2>15. 🌍 Global (:global) + Local Scoped Classes Combined</h2>
        <GlobalLocalCssModules />
      </section>
      <hr />

      <section>
        <h2>16. 🐣 Basic styled-components (styled.h1, &amp;-nesting, scoped classes)</h2>
        <BasicStyled />
      </section>
      <hr />

      <section>
        <h2>17. 🎛️ Props-Driven Dynamic Styles (btntype + size props → 20+ variants from 1 button)</h2>
        <PropsStyledDemo />
      </section>
      <hr />

      <section>
        <h2>18. 🎓 JFS Student Cards: styled(Base) extends + Course-colored variants</h2>
        <ExtendsStyledDemo />
      </section>
      <hr />

      <section>
        <h2>19. 🌍 createGlobalStyle — Global utility classes (.cj-tip / .cj-highlight) + styled tiles</h2>
        <GlobalStyledDemo />
      </section>
      <hr />

      <section>
        <h2>20. 🧭 Basic Router: BrowserRouter + Link + Routes/Route (3 pages Home/About/Contact)</h2>
        <BasicRouterDemo />
      </section>
      <hr />

      <section>
        <h2>21. 🎓 JFS Student Router: useParams / useNavigate / Add Form / 404 catch-all</h2>
        <JfsRouterDemo />
      </section>
      <hr />

      <section>
        <h2>22. 🔐 NavLink auto-active highlighting + Protected Auth Route (RequireAuth / localStorage JWT)</h2>
        <NavLinkProtectedDemo />
      </section>
      <hr />

      <section>
        <h2>23. 🎨 Plain Sass (.scss global): $variables, sass:color.adjust(), @mixin, &amp;-nesting</h2>
        <PlainSassDemo />
      </section>
      <hr />

      <section>
        <h2>24. 🏗️ Sass Modules (.module.scss): JFS Admin Dashboard — 5 KPI mixin variants + scoped classes</h2>
        <SassModulesDemo />
      </section>
    </div>
  );
}
