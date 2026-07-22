// ============================================================
//  Day 1 — Components & JSX: Code Examples
// ============================================================

// ------------------------------------------------------------
//  1. Basic Functional Component
// ------------------------------------------------------------

function Welcome() {
  return <h1>Hello React</h1>;
}

// ------------------------------------------------------------
//  2. App Component (entry point)
// ------------------------------------------------------------

function App() {
  return (
    <h1>Hello React!</h1>
  );
}

export default App;

// ------------------------------------------------------------
//  3. Navbar Component
// ------------------------------------------------------------

function Navbar() {
  return (
    <h2>Navbar</h2>
  );
}

export default Navbar;

// ------------------------------------------------------------
//  4. Footer Component
// ------------------------------------------------------------

function Footer() {
  return (
    <h2>Footer</h2>
  );
}

export default Footer;

// ------------------------------------------------------------
//  5. Composing Components in App using Fragment
// ------------------------------------------------------------

import Navbar from "./Navbar";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Navbar />
      <h1>Home Page</h1>
      <Footer />
    </>
  );
}

export default App;

// Output:
//   Navbar
//   Home Page
//   Footer

// ------------------------------------------------------------
//  6. JSX Rule — JavaScript expressions inside {}
// ------------------------------------------------------------

function Greeting() {
  let name = "Asiya";
  return (
    <h1>Hello {name}</h1>
  );
}

// Output: Hello Asiya

// ------------------------------------------------------------
//  7. JSX Rule — className instead of class
// ------------------------------------------------------------

function Card() {
  return (
    <div className="card">
      <p>Student Card</p>
    </div>
  );
}

// ------------------------------------------------------------
//  8. Arrow Function Style (also valid)
// ------------------------------------------------------------

const Sidebar = () => {
  return <h2>Sidebar</h2>;
};

export default Sidebar;
