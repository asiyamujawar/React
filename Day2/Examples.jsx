// ============================================================
//  Day 2 — Code Examples
// ============================================================

import { createRoot } from 'react-dom/client'

// ------------------------------------------------------------
//  1. Hello World App
// ------------------------------------------------------------

function App() {
  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
}

// ------------------------------------------------------------
//  2. createRoot — basic render
// ------------------------------------------------------------

createRoot(document.getElementById('root')).render(
  <h1>Hello React!</h1>
);

// ------------------------------------------------------------
//  3. JSX variable
// ------------------------------------------------------------

const myelement = (
  <table>
    <tr><th>Name</th></tr>
    <tr><td>John</td></tr>
    <tr><td>Elsa</td></tr>
  </table>
);

createRoot(document.getElementById('root')).render(myelement);

// ------------------------------------------------------------
//  4. JSX Expressions
// ------------------------------------------------------------

function Car() {
  const brand = "Ford";
  const model = "Mustang";
  const hp = 218 * 1.36;

  return (
    <>
      <h2>My Car</h2>
      <p>It is a {brand} {model}.</p>
      <p>It has {hp} horsepower</p>
    </>
  );
}

// ------------------------------------------------------------
//  5. JSX Attributes — className, style, events
// ------------------------------------------------------------

function StyledCard() {
  const mystyles = {
    color: "red",
    fontSize: "20px",
    backgroundColor: "lightyellow",
  };

  const handleClick = () => {
    alert('Hello World');
  };

  return (
    <>
      <h1 className="myclass" style={mystyles}>My car</h1>
      <button onClick={handleClick}>Click me</button>
      <button disabled={false}>Not disabled</button>
    </>
  );
}

// ------------------------------------------------------------
//  6. JSX If Statement — ternary
// ------------------------------------------------------------

function Fruit() {
  const x = 5;
  return (
    <h1>{x < 10 ? "Banana" : "Apple"}</h1>
  );
}

// ------------------------------------------------------------
//  7. Components with Props
// ------------------------------------------------------------

function CarCard(props) {
  return (
    <h2>I am a {props.brand}!</h2>
  );
}

function Garage() {
  return (
    <>
      <h1>Who lives in my Garage?</h1>
      <CarCard brand="Ford" />
      <CarCard brand="BMW" />
    </>
  );
}

export default Garage;
